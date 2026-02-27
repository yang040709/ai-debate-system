<script setup lang='ts'>
import RankingList from '@/components/Ranking/RankingList.vue';
import { getRankingListApi } from '@/api/ranking';
import { useFetchData } from '@/composables/useFetchData';
import { ref } from 'vue';
const rankingNumber = ref(20);

const { data, loading, fetchData } = useFetchData(getRankingListApi, [rankingNumber], { list: [] })
fetchData();
</script>

<template>
  <div class='rank-container'>
    <ranking-list :loading="loading" :list="data.list" :is-show-number="true"></ranking-list>
  </div>
</template>

<style scoped lang="scss">
.ranking-list-container {
  max-width: 850px;
  width: 85%;
  margin: 0 auto;
}
</style>