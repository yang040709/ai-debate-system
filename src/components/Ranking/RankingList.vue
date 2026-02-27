<script setup lang='ts'>
import RankingItem from './RankingItem.vue';
import type { RankingList } from '@/types/ranking'
import Skeleton from '@/components/Skeleton/Skeleton.vue';
import Empty from '@/components/Empty/Empty.vue'

interface RankingListProps {
  list: RankingList,
  loading: boolean,
  isShowNumber?: boolean
}

const { list, loading, isShowNumber = true } = defineProps<RankingListProps>()

</script>

<template>
  <div class='ranking-list-container'>
    <skeleton v-if="loading && list.length === 0" :loading="loading" animation :rows="8" :size="30">
    </skeleton>
    <div v-if="list.length > 0" class="ranking-list">
      <ranking-item v-for="(item, index) in list" :is-show-number="isShowNumber" :key="item.user_id" :rank="item"
        :index="index">
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