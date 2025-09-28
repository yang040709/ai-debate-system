<script setup lang='ts'>
import RecordItem from './RecordItem.vue';
import type { Result } from '@/types/result';

defineProps<{
  items: Result[];
}>();
</script>

<template>
  <div class='record-list-container'>
    <record-item v-for="item in items" :item="item" :key="item.debate_id" />
  </div>
</template>

<style scoped lang="scss">
.record-list-container {
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
}
</style>