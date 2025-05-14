export const getItem = (key: string) => {
  const item = localStorage.getItem(key)
  if (!item) return null
  if (typeof item === 'string') {
    return item
  } else {
    return JSON.parse(item)
  }
}
export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeItem = (key: string) => {
  localStorage.removeItem(key)
}
export const clearItem = () => {
  localStorage.clear()
}
