import { WebSocketServer } from 'ws'
import { delay } from './utils.js'
const wss = new WebSocketServer({ port: 8080 })

// const mockedData = {
//   content: `
// ### ai回答：全面推行四天工作制将损害经济发展
// **尊敬的评委、对方辩友：**
// - 我方观点是全面推行四天工作制不会影响经济发展。
// - 定义：四天工作制指每周工作四天、每日工时适度延长的弹性制度；影响经济发展指导致 GDP 增速显著下滑或生产力衰退。评判标准为是否降低整体劳动效率与社会产出。
// - 第一，缩短工时能提升员工专注度，冰岛试点显示其 productivity 提高 15%.
// - 第二，消费与服务业因闲暇时间增加而提振，日本企业数据显示周末消费额增长 23%.
// - 综上，四天工作制通过效率提升与需求拉动，不会影响经济发展。
// `,
// }

const mockedData = {
  content: `
### ai回答：全面推行四天工作制将损害经济发展  
**尊敬的评委、对方辩友：**  
`,
}

wss.on('connection', (ws) => {
  console.log('✅ 新客户端已连接')
  ws.on('message', async (message) => {
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
      console.log('send', msg)
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
