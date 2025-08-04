import mockjs from 'mockjs'
import { requestFun } from '../utils.ts'
const generateRankings = () => {
  const baseTemplate = {
    'ranking|+1': 1, // 排名从1开始递增
    name: '@cname', // 随机中文姓名
    winningRate: '@integer(50, 99)%', // 50%-99%的胜率
    score: 3000, // 分数越来越低
    // 随机生成头像，约30%的概率有头像
    avatar: 'https://ui-avatars.com/api/?name=@word(1)&background=random',
  }
  const rankings = mockjs.mock({
    'list|6-20': [baseTemplate],
  }).list
  console.log('123', rankings)
  return rankings.map((item: any, index: number) => {
    item.score = 3000 - index * 100 - Math.floor(Math.random() * 100) // 分数递减
    return item
  })
}

mockjs.mock('/api/rankings', 'get', requestFun(generateRankings))
