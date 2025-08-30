import axios from 'axios'
import { useUserStore } from '@/stores/user'
import AppConfig from '@/config/app.config'
import { handleResponseError } from '@/utils/error'

const require = axios.create({
  baseURL: AppConfig.BaseURL,
  timeout: 30 * 1000,
})

require.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.token
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
      // 处理响应错误
      handleResponseError(res, response.config.meta)
      return Promise.reject(res.msg)
    }
    /* 
    if (res.code === 401) {
      router.replace('/login')
      return Promise.reject(new Error(res.msg || '未授权'))
    } 
    */
    // console.log(res, '<==res.data')
    console.log(JSON.stringify(res.data), '<==res.data')
    return res.data || 'request success!!'
  },
  (err) => {
    handleResponseError(err)
    return Promise.reject(err)
  },
)

export default require
