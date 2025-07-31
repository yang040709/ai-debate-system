<script setup lang='ts'>
import RankingItem from './RankingItem.vue';
const arr = [
  {
    ranking: 1,
    name: '张三',
    winningRate: '89%',
    score: 2890
  },
  {
    ranking: 2,
    name: '张三',
    winningRate: '89%',
    score: 2890
  },
  {
    ranking: 3,
    name: '张三',
    winningRate: '89%',
    score: 2890
  }
]
</script>

<template>
  <div class='ranking-list-container'>
    <ranking-item v-for="item in arr" :key="item.ranking" :rank="item"></ranking-item>
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