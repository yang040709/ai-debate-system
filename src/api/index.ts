import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { BaseURL } from '@/global.config.ts'
import { handleRegisterError } from '@/utils/error'

const require = axios.create({
  baseURL: BaseURL,
  timeout: 30 * 1000,
})

require.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    let token = userStore.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)
require.interceptors.response.use(
  (response) => {
    const res = response.data // 获取完整响应体
    if (res.code !== 0) {
      handleRegisterError(res, response.config.meta)
      return Promise.reject(res.msg)
    }
    /* 
    if (res.code === 401) {
      router.replace('/login')
      return Promise.reject(new Error(res.msg || '未授权'))
    } 
    */
    console.log(res, '<==res.data')
    return res.data || 'request success!!'
  },
  (err) => {
    // return Promise.reject('请检查网络连接')
    handleRegisterError(err)
    return Promise.reject(err)
  },
)

export default require
