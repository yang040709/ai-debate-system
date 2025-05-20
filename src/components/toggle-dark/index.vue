<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
const appStore = useAppStore()
const isDark = storeToRefs(appStore).isDark
const isFollowSystem = ref(false)
const handleSystemThemeChange = () => {
  // 监听系统主题变化
  isFollowSystem.value = true
  // systemDark 为 true 时，代表用户选择了暗黑模式, false为亮色模式
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  appStore.toggleDark(systemDark)
}

const handleSelect = (value: string) => {
  if (value === 'dark' || value === 'light') {
    appStore.toggleDark()
    isFollowSystem.value = false
  } else if (value === 'system') {
    handleSystemThemeChange()
  }
}
</script>
<template>
  <div class="toggle-dark-container">
    <a-dropdown trigger="hover" @select="handleSelect">
      <icon-sun-fill class="icon" v-if="!isDark" :size="24" />
      <icon-moon-fill class="icon" v-if="isDark" :size="24" />
      <template #content>
        <a-doption value="light" :disabled="!isDark">亮色模式</a-doption>
        <a-doption value="dark" :disabled="isDark">暗黑模式</a-doption>
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
