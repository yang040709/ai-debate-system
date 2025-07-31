<script setup lang="ts">

interface TagItemProps {
  color: string;
  text: string;
}

defineProps<TagItemProps>()

</script>

<template>
  <div class='tag-item-container'>
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
}
</style>