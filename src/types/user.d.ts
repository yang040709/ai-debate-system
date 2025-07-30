export interface LoginForm {
  account: string
  password: string
}

export interface loginResponse extends UserInfo {
  token: string
}

export interface RegisterForm {
  account: string
  password: string
  nickname: string
}

export interface UserInfo {
  user_id?: string
  nickname: string
  avatar: string
}

export interface CanModifyUserInfo {
  nickname: string
  avatar: string
}

export interface RegisterResponse {
  user_id: string
}
