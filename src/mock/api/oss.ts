import mockjs from 'mockjs'
import { requestFun } from '../utils'

const generateAvatar = () => {
  const baseTemplate = {
    url: 'https://ui-avatars.com/api/?name=@word(2)&background=random',
  }
  const rankings = mockjs.mock(baseTemplate)
  return rankings
}

mockjs.mock('/api/oss/upload', 'post', requestFun(generateAvatar))
