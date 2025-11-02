<script setup lang='ts'>
import { IconEmpty } from '@arco-design/web-vue/es/icon'
interface EmptyProps {
  title?: string
  height?: string
}
//vue3.5的新写法
const { title = '暂无数据', height = "100%" } = defineProps<EmptyProps>()
</script>

<template>
  <div class='empty-container' :style="{ height }">
    <icon-empty :size="60" />
    <p>{{ title }}</p>
  </div>
</template>

<style scoped lang="scss">
.empty-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--theme-gray-4);
  gap: 10px;
}
</style>