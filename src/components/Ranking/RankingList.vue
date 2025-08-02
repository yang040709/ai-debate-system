<script setup lang='ts'>
import RankingItem from './RankingItem.vue';
// import Switch3 from '../Switch/Switch3.vue';
import type { Ranking } from '@/types/ranking'

defineProps<{ list: Ranking[] }>()

</script>

<template>
  <div class='ranking-list-container'>
    <!-- <Switch3 ></Switch3> -->
    <ranking-item v-for="item in list" :key="item.ranking" :rank="item">
    </ranking-item>
  </div>
</template>

<style scoped lang="scss">
.ranking-list-container {
  padding: 15px 15px;
  background: var(--theme-gray-2);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>