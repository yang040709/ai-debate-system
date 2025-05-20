import request from './index'

const delay = (ms = 200) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

let myRequest = (() => {
  const hasRequest: string[] = []
  return function (config: any) {
    if (hasRequest.includes(config.url)) {
      console.log('正在请求中')
      return Promise.reject({ mes: '正在请求中' })
    }
    hasRequest.push(config.url)
    return new Promise(async (resolve, reject) => {
      await delay()
      request(config)
        .then((res: any) => {
          hasRequest.splice(hasRequest.indexOf(config.url), 1)
          resolve(res)
        })
        .catch((err: any) => {
          hasRequest.splice(hasRequest.indexOf(config.url), 1)
          reject(err)
        })
    })
  }
})()

export { request as initRequest, myRequest as request }
