<script setup lang='ts'>
import RankingList from '@/components/Ranking/RankingList.vue';



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
    score: 2890,
    avatar: "https://ui-avatars.com/api/?name=P&background=random"
  },
  {
    ranking: 3,
    name: '张三',
    winningRate: '89%',
    score: 2890,
    avatar: "https://ui-avatars.com/api/?name=Z&background=random"
  },
  {
    ranking: 4,
    name: '张三',
    winningRate: '89%',
    score: 2890
  },
  {
    ranking: 5,
    name: '张三',
    winningRate: '89%',
    score: 2890
  },
  {
    ranking: 6,
    name: '张三',
    winningRate: '89%',
    score: 2890
  },
  {
    ranking: 7,
    name: '张三',
    winningRate: '89%',
    score: 2890
  },
  {
    ranking: 8,
    name: '张三',
    winningRate: '89%',
    score: 2890,
    avatar: "https://ui-avatars.com/api/?name=P&background=random"
  },
  {
    ranking: 9,
    name: '张三',
    winningRate: '89%',
    score: 2890,
    avatar: "https://ui-avatars.com/api/?name=Z&background=random"
  },
  {
    ranking: 10,
    name: '张三',
    winningRate: '89%',
    score: 2890
  },
  {
    ranking: 11,
    name: '张三',
    winningRate: '89%',
    score: 2890
  },
  {
    ranking: 12,
    name: '张三',
    winningRate: '89%',
    score: 2890
  },
  {
    ranking: 13,
    name: '张三',
    winningRate: '89%',
    score: 2890
  },
  {
    ranking: 14,
    name: '张三',
    winningRate: '89%',
    score: 2890,
    avatar: "https://ui-avatars.com/api/?name=P&background=random"
  },
  {
    ranking: 15,
    name: '张三',
    winningRate: '89%',
    score: 2890,
    avatar: "https://ui-avatars.com/api/?name=Z&background=random"
  }
]
</script>

<template>
  <div class='rank-container'>
    <ranking-list :list="arr"></ranking-list>
  </div>
</template>

<style scoped lang="scss">
.ranking-list-container {
  max-width: 930px;
  margin: 0 auto;
}
</style>