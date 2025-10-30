import { WebSocketServer } from 'ws'
import { delay } from './utils.js'
import { str1, str2, str3 } from './mockData.js'
const wss = new WebSocketServer({ port: 8080 })

const mockedData = {
  content: str2,
}
let count = 0

wss.on('connection', (ws) => {
  console.log('✅ 新客户端已连接')
  ws.on('message', async (message) => {
    count++
    console.log('msg__start')
    console.log(message.toString())
    for (let i = 0; i < mockedData.content.length; ) {
      await delay(100)
      const number = Math.floor(Math.random() * 3) + 1
      const msg = mockedData.content.slice(i, i + number)
      ws.send(
        JSON.stringify({
          code: 0,
          msg,
        }),
      )
      console.log('send', msg, count)
      i += number
    }
    console.log('msg__end')
    ws.send(
      JSON.stringify({
        code: 1,
        msg: '服务端已处理完成',
      }),
    )
  })

  ws.on('close', () => {
    console.log('❌ 客户端断开连接')
  })

  ws.on('error', (err) => {
    console.error('⚠️ WebSocket 错误:', err)
    ws.send(
      JSON.stringify({
        code: -1,
        msg: '服务中断',
      }),
    )
  })
})

console.log('🚀 WebSocket 服务器运行在 ws://localhost:8080')
