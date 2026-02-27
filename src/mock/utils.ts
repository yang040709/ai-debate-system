export const requestFun = <T>(data: T, code = 0, msg = 'ok') => {
  return (request: any) => {
    if (data instanceof Function) {
      data = data(request)
    }
    return {
      code,
      msg,
      data,
    }
  }
}

export const getURLQuery = (url: string) => {
  const params = url.split('?')[1]
  if (!params) {
    return {}
  }
  const paramsObj = params.split('&').reduce((pre, cur) => {
    const [key, value] = cur.split('=')
    pre[key] = value
    return pre
  }, {} as any)
  return paramsObj
}

export const getRequestData = (data: string) => {
  return JSON.parse(data)
}
