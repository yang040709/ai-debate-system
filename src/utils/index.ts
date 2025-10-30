// debounce
type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void
  cancel(): void
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
      timeoutId = null
    }, delay)
  }

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return debounced
}

type ThrottledFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void
  cancel(): void
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): ThrottledFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastExecTime = 0

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastExecTime >= delay) {
      // 立即执行
      func(...args)
      lastExecTime = now
    } else if (timeoutId === null) {
      // 延迟执行最后一次
      timeoutId = setTimeout(
        () => {
          func(...args)
          lastExecTime = Date.now()
          timeoutId = null
        },
        delay - (now - lastExecTime),
      )
    }
  }

  throttled.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return throttled
}

export function delayFn(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}
