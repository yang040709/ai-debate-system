<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAppStore } from './stores/app'
// 获取用户信息
// const userStore = useUserStore()
// userStore.getUserInfo()

// 从localStorage中获取本地主题
useAppStore()
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
