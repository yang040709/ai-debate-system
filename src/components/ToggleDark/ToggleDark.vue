<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
const appStore = useAppStore()
const { isDark, isFollowSystem } = storeToRefs(appStore)
const { handleSelect } = appStore

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
