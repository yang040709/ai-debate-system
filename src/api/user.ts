import type {
  LoginForm,
  RegisterForm,
  UserInfo,
  loginResponse,
  RegisterResponse,
} from '@/types/user'

import { request } from './request'

export const loginApi = (data: LoginForm) => {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  }) as Promise<loginResponse>
}

export const registerApi = (data: RegisterForm) => {
  return request({
    url: '/user/register',
    method: 'post',
    data,
  }) as Promise<RegisterResponse>
}

export const getUserInfoApi = () => {
  return request({
    url: '/user/info',
    method: 'get',
  }) as Promise<UserInfo>
}
