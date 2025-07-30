// 成功响应
export interface ApiResponse<T> {
  code: number
  data: T
  msg: string
}

// 错误响应
export interface ApiError {
  code: number
  msg: string
}
