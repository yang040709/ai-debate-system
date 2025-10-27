// debounce
export function debounce(fn: (...args1: any[]) => any, delay: number) {
  let timer: any = null
  return (...args2: any[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args2)
    }, delay)
  }
}

export function delayFn(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}
