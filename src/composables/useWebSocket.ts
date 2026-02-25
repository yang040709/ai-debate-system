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

export const useWebSocket = (url: string, query: WebSocketQuery, options?: WebSocketOptions) => {
  const ws = ref<WebSocket | null>(null)
  const isConnected = ref(false)
  const connectionState = ref<ConnectionState>('CLOSED')
  const message = ref<string | null>(null)
  const error = ref<string | null>(null)
  const isReceivingMsg = ref(false)

  let reconnectAttempts = 0
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null
  let pongTimeout: ReturnType<typeof setTimeout> | null = null
  const manuallyClosed = ref(false)

  const MAX_RECONNECT_ATTEMPTS = options?.maxReconnectAttempts ?? 5
  const BASE_RECONNECT_INTERVAL = options?.reconnectInterval ?? 2000
  const HEARTBEAT_INTERVAL = options?.heartbeatInterval ?? 30000
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
      connectionState.value = 'CLOSED'
      return
    }

    const delay = Math.min(BASE_RECONNECT_INTERVAL * Math.pow(2, reconnectAttempts), 30000) // 指数退避，上限30秒

    connectionState.value = 'RECONNECTING'
    error.value = `连接断开，${delay / 1000}秒后尝试第${reconnectAttempts + 1}次重连...`

    reconnectTimer = setTimeout(() => {
      reconnectAttempts++
      connect()
    }, delay)
  }

  // 创建连接
  const connect = () => {
    if (connectionState.value === 'CONNECTING' || connectionState.value === 'OPEN') {
      return // 避免重复连接
    }

    connectionState.value = 'CONNECTING'
    manuallyClosed.value = false
    const fullUrl = `${url}?conversion_id=${encodeURIComponent(query.conversion_id)}`
    ws.value = new WebSocket(fullUrl, options?.protocol)

    ws.value.onopen = () => {
      console.log('WebSocket connected')
      isConnected.value = true
      connectionState.value = 'OPEN'
      error.value = null
      reconnectAttempts = 0
      startHeartbeat()
      if (options?.connectSuccessCallBack) {
        options.connectSuccessCallBack()
      }
    }

    ws.value.onmessage = (event: MessageEvent) => {
      // 如果是心跳 pong，清除超时
      if (typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'pong') {
            if (pongTimeout) {
              clearTimeout(pongTimeout)
              pongTimeout = null
            }
            return
          }
        } catch (e) {
          // 非 JSON 或非心跳消息，继续处理业务
        }
      }

      try {
        const response: WebsocketResponse = JSON.parse(event.data)
        if (response.code === 0) {
          isReceivingMsg.value = true
          message.value = response.msg
        } else if (response.code === 1) {
          isReceivingMsg.value = false
          // message.value = response.msg
          if (options?.msgEndCallBack) {
            options.msgEndCallBack()
          }
          console.log(response.msg, 'ws回答结束')
        } else if (response.code === -1) {
          console.error(response.msg, 'ws错误')
          error.value = response.msg
          ws.value?.close()
        }
      } catch (parseError) {
        console.error('Failed to parse WebSocket message:', event.data, parseError)
        error.value = '接收消息解析失败'
      }
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
        connectionState.value = 'CLOSED'
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
