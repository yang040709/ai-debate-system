<script setup lang="ts">
import { useRouter } from 'vue-router'


interface Props {
  isFixed?: boolean
  isPhone?: boolean
  // 确认函数
  confirm?: () => Promise<any>
}

const { isFixed = true, isPhone = false, confirm } = defineProps<Props>()


const router = useRouter()
const handleReturnHome = () => {
  if (confirm) {
    confirm().then(() => {
      router.push({ name: 'home' })
    })
  } else {
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <button class="return-home-container" @click="handleReturnHome" :class="{ 'fixed': isFixed }">
    <icon-import :size="20" />
    <span v-show="!isPhone">返回首页</span>
  </button>
</template>

<style lang="scss" scoped>
.return-home-container {
  height: 50px;
  padding: 0 10px;
  border-radius: 10px;
  background-color: var(--theme-gray-2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid var(--color-border-light);
  transition: background-color 0.3s ease-in-out;
  // border:none;
  color: var(--color-text-primary);

  &:hover {
    background-color: var(--theme-gray-2-hover);
  }

  &:active {
    background-color: var(--theme-gray-2-active);
  }

  &.fixed {
    position: fixed;
    top: 10px;
    left: 10px;
  }
}
</style>
