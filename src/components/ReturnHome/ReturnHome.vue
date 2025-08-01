<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const handleReturnHome = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="return-home-container" @click="handleReturnHome">
    <icon-import :size="20" />
    <span>返回首页</span>
  </div>
</template>

<style lang="scss" scoped>
.return-home-container {
  position: fixed;
  height: 50px;
  padding: 0 10px;
  border-radius: 10px;
  // background-color: #f9f9fe;
  background-color: var(--body-bg-2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  top: 10px;
  left: 10px;
  &:hover {
    background-color: var(--btn-bg-hover);
  }
}
</style>
