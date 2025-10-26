import { requestFun } from '../utils'
import mockjs from 'mockjs'
import { getRequestData } from '../utils'
const generateUser = (data: any) => {
  const baseTemplate = {
    user_id: '@id',
    nickname: '@cname',
    avatar: 'https://ui-avatars.com/api/?name=@word(1)&background=random',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxOTQ0MDQzNjQzNzQwMzYwNzA0LCJpc3MiOiJEZWJhdGUtU3lzdGVtIiwiZXhwIjoxNzUzMTg4MzY2LCJuYmYiOjE3NTMxMDE5NjZ9._bKr9ulE4HbG6iYRpls8vJDkNzZu8qLr-mvNvvzcqcg',
  }
  const requestData = getRequestData(data.body)
  if (requestData.account === 'admin' && requestData.password === '123456') {
    const response = mockjs.mock(baseTemplate)
    return {
      code: 0,
      msg: 'success',
      data: response,
    }
  } else {
    return {
      code: -1,
      msg: '用户名或密码错误',
    }
  }
}
const generateUserInfo = () => {
  const baseTemplate = {
    nickname: '@cname',
    avatar: 'https://ui-avatars.com/api/?name=@word(1)&background=random',
  }
  const rankings = mockjs.mock(baseTemplate)
  return rankings
}

mockjs.mock(
  '/api/user/register',
  'post',
  requestFun({
    user_id: '1944043643740360704',
  }),
)

mockjs.mock('/api/user/login', 'post', generateUser)

mockjs.mock('/api/user/info', 'get', requestFun(generateUserInfo))

mockjs.mock('/api/user/modify', 'put', requestFun({ message: '修改成功' }))
