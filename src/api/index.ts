import axios, { type InternalAxiosRequestConfig } from 'axios'

const BaseURL = ''

const require = axios.create({
  baseURL: BaseURL,
  timeout: 5000,
})

require.interceptors.request.use(
  (config) => {
    // config.headers.au
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)
require.interceptors.response.use(
  (response) => {
    return response.data.data
  },
  (err) => {
    return Promise.reject(err)
  },
)
