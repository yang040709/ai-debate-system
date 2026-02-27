<script setup lang="ts">

import type { TagProps } from '@/types/tag'
import { useRouter } from 'vue-router';
import { IconTag } from '@arco-design/web-vue/es/icon'
const props = defineProps<TagProps>()
const router = useRouter();

/* 点击tag跳转到对应的页面 */
const handleClick = () => {
  if (props.id) {
    router.push({
      name: "topic",
      params: {
        type: props.id,
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
    <span>{{ name }}</span>
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
  border: 1px solid var(--color-border-light);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

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