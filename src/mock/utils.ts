export const requestFun = <T>(data: T, code = 0, msg = 'ok') => {
  return () => {
    if (data instanceof Function) {
      data = data()
    }
    return {
      code,
      msg,
      data,
    }
  }
}
