import type { LoginForm, RegisterForm, UserInfo } from '@/types/user'
import { request } from './request'

export const loginApi = (data: LoginForm) => {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

export const registerApi = (data: RegisterForm) => {
  return request({
    url: '/user/register',
    method: 'post',
    data,
  })
}

export const getUserInfoApi = () => {
  return request({
    url: '/user/info',
    method: 'get',
  })
}
