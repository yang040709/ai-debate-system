import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { BaseURL } from '@/global.config.ts'

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
    // if (url && whiteListApi.includes(url)) {
    //   config.headers['Authorization'] = `Bearer ${token}`
    // }
    // // 这里省略加密过程
    // let _secretId = secretId + Date.now()
    // config.headers['secret'] = _secretId
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)
require.interceptors.response.use(
  (response) => {
    console.log(response.data, '<===data')
    const code = response.data.code
    const msg = response.data.msg || '未知错误'
    if (code === 401) {
      router.replace({
        path: '/login',
      })
      return Promise.reject({ msg })
    } else if (code !== 0) {
      return Promise.reject({ msg })
    }
    return response.data.data
  },
  (err) => {
    return Promise.reject(err)
  },
)

export default require
