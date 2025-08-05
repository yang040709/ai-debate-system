import { requestFun } from '../utils'
import mockjs from 'mockjs'

mockjs.mock(
  '/api/user/register',
  'post',
  requestFun({
    user_id: '1944043643740360704',
  }),
)

const generateUser = () => {
  const baseTemplate = {
    user_id: '@id',
    nickname: '@cname',
    avatar: 'https://ui-avatars.com/api/?name=@word(1)&background=random',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxOTQ0MDQzNjQzNzQwMzYwNzA0LCJpc3MiOiJEZWJhdGUtU3lzdGVtIiwiZXhwIjoxNzUzMTg4MzY2LCJuYmYiOjE3NTMxMDE5NjZ9._bKr9ulE4HbG6iYRpls8vJDkNzZu8qLr-mvNvvzcqcg',
  }
  const rankings = mockjs.mock(baseTemplate)
  return rankings
}
const generateUserInfo = () => {
  const baseTemplate = {
    nickname: '@cname',
    avatar: 'https://ui-avatars.com/api/?name=@word(1)&background=random',
  }
  const rankings = mockjs.mock(baseTemplate)
  return rankings
}

mockjs.mock('/api/user/login', 'post', requestFun(generateUser))

mockjs.mock('/api/user/info', 'get', requestFun(generateUserInfo))

mockjs.mock('/api/user/modify', 'put', requestFun({ message: '修改成功' }))
