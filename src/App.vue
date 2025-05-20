<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
userStore.getUserInfo()
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
