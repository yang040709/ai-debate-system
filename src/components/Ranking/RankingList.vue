<script setup lang='ts'>
import RankingItem from './RankingItem.vue';
import type { RankingList } from '@/types/ranking'
import Skeleton from '@/components/Skeleton/Skeleton.vue';
import Empty from '@/components/Empty/Empty.vue'
defineProps<{ list: RankingList, loading: boolean }>()

</script>

<template>
  <div class='ranking-list-container'>
    <skeleton v-if="loading && list.length === 0" :loading="loading" animation :rows="8" :size="30">
    </skeleton>
    <div v-if="list.length > 0" class="ranking-list">
      <ranking-item v-for="item in list" :key="item.user_id" :rank="item">
      </ranking-item>
    </div>
    <Empty v-if="!loading && list.length === 0" />
  </div>
</template>

<style scoped lang="scss">
.ranking-list-container {
  padding: 15px 15px;
  border-radius: 15px;
  background: var(--theme-gray-2);
  border: 1px solid var(--color-border-light);
}

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 15px;

}
</style>