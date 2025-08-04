<script setup lang='ts'>
import RankingList from '@/components/Ranking/RankingList.vue';
import { getRankingListApi } from '@/api/ranking';
import { useFetchData } from '@/composables/useFetchData';


const { data, loading, fetchData } = useFetchData(getRankingListApi, '获取排名失败', [], [])
fetchData();
</script>

<template>
  <div class='rank-container'>
    <ranking-list :loading="loading" :list="data"></ranking-list>
  </div>
</template>

<style scoped lang="scss">
.ranking-list-container {
  max-width: 930px;
  margin: 0 auto;
}
</style>