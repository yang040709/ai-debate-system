import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'

export const useAppStore = defineStore('app', () => {
  const isDark = useDark({
    onChanged(dark: boolean) {
      if (dark) {
        document.documentElement.classList.add('dark')
        document.body.setAttribute('arco-theme', 'dark')
        document.documentElement.setAttribute('theme-mode', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        document.body.removeAttribute('arco-theme')
        document.documentElement.removeAttribute('theme-mode')
      }
    },
  })
  const toggleDark = useToggle(isDark)
  return { isDark, toggleDark }
})
