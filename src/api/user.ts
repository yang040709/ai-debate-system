import type {
  LoginForm,
  RegisterForm,
  UserInfo,
  loginResponse,
  RegisterResponse,
  CanModifyUserInfo,
} from '@/types/user'

import { request } from './request'

// 登录
export const loginApi = (data: LoginForm) => {
  return request({
    url: '/user/login',
    method: 'post',
    data,
    meta: {
      isShowMessage: true,
      errMessage: '登录',
    },
  }) as Promise<loginResponse>
}

// 注册
export const registerApi = (data: RegisterForm) => {
  return request({
    url: '/user/register',
    method: 'post',
    data,
  }) as Promise<RegisterResponse>
}

// 获取用户信息
export const getUserInfoApi = () => {
  return request({
    url: '/user/info',
    method: 'get',
    meta: {
      isShowMessage: true,
      errMessage: '获取用户信息',
    },
  }) as Promise<UserInfo>
}

// 更改用户信息

export const updateUserInfoApi = (data: CanModifyUserInfo) => {
  return request({
    url: '/user/modify',
    method: 'put',
    data,
  })
}
