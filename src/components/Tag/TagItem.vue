<script setup lang="ts">

import type { Tag } from '@/types/tag'
import { useRouter } from 'vue-router';
const props = defineProps<Tag>()
const router = useRouter();

/* 点击tag跳转到对应的页面 */
const handleClick = () => {
  if (props.href) {
    router.push({
      name: "topic",
      params: {
        type: props.href,
        difficulty: "全部"
      }
    })
  }
}

</script>

<template>
  <div class='tag-item-container' @click="handleClick">
    <div class="tag-color-box" :style="{ background: color }">
      <icon-tag :size="25" />
    </div>
    <span>{{ text }}</span>
  </div>
</template>

<style scoped lang="scss">
.tag-item-container {

  width: 100%;
  font-size: 16px;
  background: var(--theme-gray-2);
  display: flex;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;

  .tag-color-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #DBEAFE;
    margin: 10px;
    color: var(--theme-gray-1);
  }

  &:hover {
    background: var(--theme-gray-2-hover);
  }
}
</style>