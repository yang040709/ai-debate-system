import { ref, onUnmounted } from 'vue'

interface WebsocketResponse {
  msg: string
  code: -1 | 0 | 1
}

interface WebSocketQuery {
  conversion_id: string
}

interface WebSocketOptions {
  msgEndCallBack?: () => void
  connectSuccessCallBack?: () => void
  protocol?: string | string[]
  maxReconnectAttempts?: number // 最大重连次数，默认5
  reconnectInterval?: number // 初始重连间隔（ms），默认2000
  heartbeatInterval?: number // 心跳间隔（ms），默认30000
  heartbeatTimeout?: number // 心跳超时时间（ms），默认5000
}

// 连接状态枚举
type ConnectionState = 'CLOSED' | 'CONNECTING' | 'OPEN' | 'RECONNECTING'

// 定义动作类型
type SocketAction = 'CONNECT' | 'OPEN' | 'ERROR' | 'CLOSE' | 'RECONNECT'

const FSM_ACTIONS: Record<string, SocketAction> = {
  CONNECT: 'CONNECT',
  OPEN: 'OPEN',
  ERROR: 'ERROR',
  CLOSE: 'CLOSE',
  RECONNECT: 'RECONNECT',
}

// 有限状态机配置：[当前状态]: { [动作]: 下一个状态 }
const FSM_CONFIG: Record<ConnectionState, Partial<Record<SocketAction, ConnectionState>>> = {
  CLOSED: {
    CONNECT: 'CONNECTING',
  },
  CONNECTING: {
    OPEN: 'OPEN',
    ERROR: 'CLOSED',
    CLOSE: 'CLOSED',
  },
  OPEN: {
    CLOSE: 'CLOSED',
    ERROR: 'RECONNECTING',
  },
  RECONNECTING: {
    OPEN: 'OPEN',
    ERROR: 'RECONNECTING', // 继续尝试重连
    CLOSE: 'CLOSED',
  },
}

export const useWebSocket = (url: string, query: WebSocketQuery, options?: WebSocketOptions) => {
  /* ws实例 */
  const ws = ref<WebSocket | null>(null)
  /* 是否连接 */
  const isConnected = ref(false)
  /* 连接状态 */
  const connectionState = ref<ConnectionState>('CLOSED')

  // 统一状态转换调度器
  const transition = (action: SocketAction) => {
    const nextState = FSM_CONFIG[connectionState.value][action]

    if (nextState) {
      console.log(`FSM: ${connectionState.value} --(${action})--> ${nextState}`)
      connectionState.value = nextState
      return true // 转换成功
    }

    console.warn(`FSM: Invalid action "${action}" in state "${connectionState.value}"`)
    return false // 转换非法（如在已连接状态下重复点连接，这里会自然拦截）
  }

  /* 接收到的消息 */
  const message = ref<string | null>(null)
  /* 错误信息 */
  const error = ref<string | null>(null)
  /* 是否正在接收消息 */
  const isReceivingMsg = ref(false)

  /* 重连尝试次数 */
  let reconnectAttempts = 0
  /* 重连的定时器 */
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null
  /* 心跳检测的定时器 */
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null
  /* 心跳超时的定时器 */
  let pongTimeout: ReturnType<typeof setTimeout> | null = null
  /* 是否手动关闭 */
  const manuallyClosed = ref(false)

  /* 最大重连次数 */
  const MAX_RECONNECT_ATTEMPTS = options?.maxReconnectAttempts ?? 5
  /* 初始重连间隔（ms） */
  const BASE_RECONNECT_INTERVAL = options?.reconnectInterval ?? 2000
  /* 心跳检测的间隔（ms） */
  const HEARTBEAT_INTERVAL = options?.heartbeatInterval ?? 30000
  /* 心跳超时时间（ms） */
  const HEARTBEAT_TIMEOUT = options?.heartbeatTimeout ?? 5000

  // 启动心跳
  const startHeartbeat = () => {
    stopHeartbeat()
    if (!ws.value || ws.value.readyState !== WebSocket.OPEN) return

    heartbeatTimer = setInterval(() => {
      if (ws.value?.readyState === WebSocket.OPEN) {
        ws.value.send(JSON.stringify({ type: 'ping' }))
        // 等待 pong 响应
        pongTimeout = setTimeout(() => {
          console.warn('Heartbeat timeout, closing connection...')
          error.value = '心跳超时，连接已断开'
          ws.value?.close()
        }, HEARTBEAT_TIMEOUT)
      }
    }, HEARTBEAT_INTERVAL)
  }

  // 停止心跳
  const stopHeartbeat = () => {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
    if (pongTimeout) {
      clearTimeout(pongTimeout)
      pongTimeout = null
    }
  }

  // 安全关闭（标记为手动关闭，不触发重连）
  const disconnect = () => {
    manuallyClosed.value = true
    stopHeartbeat()
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
    if (ws.value) {
      ws.value.close()
    }
  }

  // 重连逻辑
  const scheduleReconnect = () => {
    if (manuallyClosed.value) return
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      error.value = `已达到最大重连次数（${MAX_RECONNECT_ATTEMPTS}），停止重连`
      transition(FSM_ACTIONS.CLOSE)
      return
    }

    const delay = Math.min(BASE_RECONNECT_INTERVAL * Math.pow(2, reconnectAttempts), 30000) // 指数退避，上限30秒

    transition(FSM_ACTIONS.RECONNECT)
    error.value = `连接断开，${delay / 1000}秒后尝试第${reconnectAttempts + 1}次重连...`

    reconnectTimer = setTimeout(() => {
      reconnectAttempts++
      connect()
    }, delay)
  }

  // 创建连接
  const connect = () => {
    if (!transition(FSM_ACTIONS.CONNECT)) {
      return // 避免重复连接
    }

    manuallyClosed.value = false
    const fullUrl = `${url}?conversion_id=${encodeURIComponent(query.conversion_id)}`
    ws.value = new WebSocket(fullUrl, options?.protocol)

    ws.value.onopen = () => {
      console.log('WebSocket connected')
      isConnected.value = true
      transition(FSM_ACTIONS.OPEN)
      error.value = null
      reconnectAttempts = 0
      startHeartbeat()
      if (options?.connectSuccessCallBack) {
        options.connectSuccessCallBack()
      }
    }

    ws.value.onmessage = (event: MessageEvent) => {
      // 1. 快速处理非业务消息
      if (event.data === 'pong' || event.data === '{"type":"pong"}') {
        if (pongTimeout) {
          clearTimeout(pongTimeout)
          pongTimeout = null
        }
        return
      }

      // 2. 统一解析 JSON
      let response: WebsocketResponse
      try {
        response = JSON.parse(event.data)
      } catch (e) {
        console.warn('收到非标准JSON数据:', event.data)
        return
      }

      // 3. 业务状态机
      const statusHandlers: Record<number, () => void> = {
        0: () => {
          // 接收消息中
          isReceivingMsg.value = true
          message.value = response.msg
        },
        1: () => {
          // 消息结束
          isReceivingMsg.value = false
          options?.msgEndCallBack?.()
        },
        [-1]: () => {
          // 错误
          error.value = response.msg
          ws.value?.close()
        },
      }

      statusHandlers[response.code]?.()
    }

    ws.value.onerror = (event) => {
      console.error('WebSocket error:', event)
      error.value = 'WebSocket 连接发生错误'
      // 注意：某些浏览器不会触发 onclose，所以这里不主动 close()
    }

    ws.value.onclose = () => {
      console.log('WebSocket disconnected')
      isConnected.value = false
      stopHeartbeat()
      if (!manuallyClosed.value) {
        scheduleReconnect()
      } else {
        transition(FSM_ACTIONS.CLOSE)
      }
    }
  }

  // 清理所有资源
  const cleanup = () => {
    manuallyClosed.value = true
    disconnect()
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
    if (pongTimeout) {
      clearTimeout(pongTimeout)
      pongTimeout = null
    }
  }

  onUnmounted(() => {
    cleanup()
  })

  // 发送消息（安全封装）
  const sendMessage = (data: object) => {
    if (ws.value?.readyState === WebSocket.OPEN) {
      ws.value.send(JSON.stringify(data))
    } else {
      console.warn('WebSocket is not open. Cannot send message.')
      error.value = 'WebSocket 未连接，无法发送消息'
    }
  }

  return {
    ws,
    isConnected,
    connectionState, // 新增：更详细的状态
    message,
    error,
    isReceivingMsg,
    connect,
    sendMessage,
    disconnect,
    cleanup,
  }
}
