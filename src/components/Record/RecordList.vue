<script setup lang='ts'>
import RecordItem from './RecordItem.vue';
import type { Result } from '@/types/result';
import Skeleton from '@/components/Skeleton/Skeleton.vue';
import Empty from '@/components/Empty/Empty.vue'

defineProps<{
  items: Result[];
  loading: boolean;
}>();
</script>

<template>
  <div class='record-list-container'>
    <Skeleton v-if="loading && items.length === 0" :loading="loading" animation :rows="8" :size="30" />
    <div v-if="items.length > 0" class="record-list">
      <record-item v-for="item in items" :item="item" :key="item.debate_id" />
    </div>
    <Empty v-if="!loading && items.length === 0" />
  </div>
</template>

<style scoped lang="scss">
.record-list-container {
  margin: 30px 0;
}

.record-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
</style>