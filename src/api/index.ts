import axios from 'axios'
import { useUserStore } from '@/stores/user'
import AppConfig from '@/config/app.config'
import { handleResponseError } from '@/utils/error'
import { logResponse } from '@/utils/log'
const require = axios.create({
  baseURL: AppConfig.BaseURL,
  timeout: 30 * 1000,
})

/* 
下面两个拦截器都是在请求失败的时候，返回Promise.error()
这需要你后续的请求函数自行处理error
*/

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
    logResponse(response, false)
    if (res.code !== 0) {
      // 处理响应错误
      handleResponseError(res, response.config.meta)
      console.log('res.msg', res.msg)
      return Promise.reject(res.msg)
    }
    return res.data || 'request success!!'
  },
  (err) => {
    handleResponseError(err)
    return Promise.reject(err)
  },
)

export default require
