<script setup lang='ts'>
import { ref } from 'vue';
import RankingItem from './RankingItem.vue';
import type { Ranking } from '@/types/ranking'
import Skeleton from '@/components/Skeleton/Skeleton.vue';

defineProps<{ list: Ranking[], loading: boolean }>()


const animation = ref(true);


</script>

<template>
  <div class='ranking-list-container'>
    <skeleton :loading="loading" :animation="animation" :rows="8" :size="30"></skeleton>
    <div v-if="!loading" class="ranking-list">
      <ranking-item v-for="item in list" :key="item.ranking" :rank="item">
      </ranking-item>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ranking-list-container {
  padding: 15px 15px;
}

.ranking-list {
  padding: 15px 15px;
  border-radius: 15px;
  background: var(--theme-gray-2);
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>