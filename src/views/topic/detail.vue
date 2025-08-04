<script setup lang='ts'>
import { ref } from 'vue'
import TopicList from '@/components/Topic/TopicList.vue';
import { getTopicListApi } from '@/api/topic';
import { useFetchData } from '@/composables/useFetchData';



const { data, loading, fetchData } = useFetchData(getTopicListApi, '获取话题失败', [], [])
fetchData();
</script>

<template>
  <div class='topic-detail-container'>
    <topic-list :list="data" :loading="loading"></topic-list>
  </div>
</template>

<style scoped lang="scss">
.topic-detail-container {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px;
}
</style>