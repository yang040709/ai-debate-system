import { defineStore } from 'pinia'
import { useDark, useToggle, useTitle, useStorage } from '@vueuse/core'
import AppConfig from '@/config/app.config'
import { ref } from 'vue'

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
  const isFollowSystem = useStorage('isFollowSystem', false)

  const systemThemeListener = ref<null | MediaQueryList>(null)
  const handleSystemThemeChange = () => {
    // 监听系统主题变化
    isFollowSystem.value = true
    // systemDark 为 true 时，代表用户选择了暗黑模式, false为亮色模式
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    toggleDark(systemDark)
    setupSystemThemeListener()
  }

  // 开启系统主题监听器，监听系统主题变化
  const setupSystemThemeListener = () => {
    if (!systemThemeListener.value) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', handleSystemThemeChange)
      systemThemeListener.value = mediaQuery
    }
  }

  // 移除系统主题监听器，移除系统主题变化监听
  const removeSystemThemeListener = () => {
    if (systemThemeListener.value) {
      systemThemeListener.value.removeEventListener('change', handleSystemThemeChange)
      systemThemeListener.value = null
    }
  }

  if (isFollowSystem.value) {
    console.log('开启了系统主题跟随')
    handleSystemThemeChange()
  }

  const handleSelect = (value: 'dark' | 'light' | 'system') => {
    if (value === 'dark' || value === 'light') {
      toggleDark()
      isFollowSystem.value = false
      removeSystemThemeListener()
    } else if (value === 'system') {
      handleSystemThemeChange()
    }
  }

  // 使用vueUse 生成响应式的标题
  const title = useTitle(AppConfig.appName, { titleTemplate: `%s | ${AppConfig.appTitle}` })
  return {
    isDark,
    isFollowSystem,
    title,
    handleSelect,
  }
})
