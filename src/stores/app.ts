import { defineStore } from 'pinia'
import { useDark, useToggle, useTitle } from '@vueuse/core'
import AppConfig from '@/config/app.config'

export const useAppStore = defineStore('app', () => {
  // 使用vueUse轻松实现亮/暗主题切换
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
  // 使用vueUse 生成响应式的标题
  const title = useTitle(AppConfig.appName, { titleTemplate: `%s | ${AppConfig.appTitle}` })
  return { isDark, toggleDark, title }
})
