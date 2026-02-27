import mockjs from 'mockjs'
import { requestFun } from '../utils.ts'
const generateRankings = (response: any) => {
  const url = response.url
  const regex = /\/api\/reward\/score\/topN\/(\d+)/
  const match = url.match(regex)

  let total = 10
  if (match) {
    const numberStr = match[1] // "123"
    const number = parseInt(numberStr, 10) // 123
    // console.log(number)
    total = number
  }
  const mockData = mockjs.mock({
    [`list|${total}`]: [
      {
        score: 120,
        user_id: '@id',
        avatar: 'https://ui-avatars.com/api/?name=@word(1)&background=random',
        nickname: '@cname',
      },
    ],
  })
  mockData.list.forEach((item: any, index: number) => {
    item.score = 3000 - index * 100 - Math.floor(Math.random() * 100) // 分数递减
  })
  return mockData
}

// mockjs.mock('/api/reward/score/topN/', 'get', requestFun(generateRankings))
mockjs.mock(/\/api\/reward\/score\/topN\/\d+/, 'get', requestFun(generateRankings))

// mockjs.mock('/api/rankings', 'get', requestFun([]))
