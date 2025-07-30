<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
const appStore = useAppStore()
const isDark = storeToRefs(appStore).isDark
const isFollowSystem = ref<boolean>(false)
const systemThemeListener = ref<null | MediaQueryList>(null)
const handleSystemThemeChange = () => {
  // 监听系统主题变化
  isFollowSystem.value = true
  // systemDark 为 true 时，代表用户选择了暗黑模式, false为亮色模式
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  appStore.toggleDark(systemDark)
  setupSystemThemeListener()
}

const handleSelect = (value: string) => {
  if (value === 'dark' || value === 'light') {
    appStore.toggleDark()
    isFollowSystem.value = false
    removeSystemThemeListener()
  } else if (value === 'system') {
    handleSystemThemeChange()
  }
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
</script>
<template>
  <div class="toggle-dark-container">
    <a-dropdown trigger="hover" @select="handleSelect">
      <icon-sun-fill class="icon" v-if="!isDark" :size="24" />
      <icon-moon-fill class="icon" v-if="isDark" :size="24" />
      <template #content>
        <a-doption value="light" :disabled="!isDark && !isFollowSystem">亮色模式</a-doption>
        <a-doption value="dark" :disabled="isDark && !isFollowSystem">暗黑模式</a-doption>
        <a-doption value="system" :disabled="isFollowSystem">跟随系统</a-doption>
      </template>
    </a-dropdown>
  </div>
</template>
<style scoped>
.toggle-dark-container {
  color: var(--color-text-secondary);
}

.icon:hover {
  color: var(--color-text-primary);
}
</style>
