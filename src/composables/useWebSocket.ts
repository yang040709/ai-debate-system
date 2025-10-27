import { ref, onUnmounted } from 'vue'

interface WebsocketResponse {
  msg: string
  code: -1 | 0 | 1
}

export const useWebSocket = (
  url: string,
  msgEndCallBack?: () => void,
  protocols?: string | string[],
) => {
  const ws = ref<WebSocket | null>(null)
  const isConnected = ref(false)
  const message = ref<string | null>(null)
  const error = ref<string | null>(null)
  const isReceivingMsg = ref(false)

  // 创建连接
  const connect = () => {
    ws.value = new WebSocket(url, protocols)

    ws.value.onopen = () => {
      console.log('WebSocket connected')
      isConnected.value = true
      error.value = null
    }

    ws.value.onmessage = (event: MessageEvent) => {
      const response: WebsocketResponse = JSON.parse(event.data)
      if (response.code === 0) {
        isReceivingMsg.value = true
        message.value = response.msg
      } else if (response.code === 1) {
        isReceivingMsg.value = false
        if (msgEndCallBack) {
          msgEndCallBack()
        }
        console.log(response.msg, 'ws回答结束')
        // disconnect()
      } else if (response.code === -1) {
        console.log(response.msg, 'ws错误')
        error.value = response.msg
        disconnect()
      }
    }

    ws.value.onerror = (event) => {
      console.error('WebSocket error:', event)
      error.value = 'WebSocket error occurred'
    }

    ws.value.onclose = () => {
      console.log('WebSocket disconnected')
      isConnected.value = false
      // 可选：自动重连逻辑
    }
  }
  // 发送消息
  const sendMessage = (data: string) => {
    if (ws.value?.readyState === WebSocket.OPEN) {
      ws.value.send(data)
    } else {
      console.warn('WebSocket is not open. Cannot send message.')
    }
  }
  // 关闭连接
  const disconnect = () => {
    if (ws.value) {
      ws.value.close()
    }
  }
  onUnmounted(() => {
    disconnect()
  })
  return { ws, isConnected, message, error, connect, sendMessage, disconnect, isReceivingMsg }
}
