<script setup lang='ts'>
import { ref } from 'vue'
import TopicList from '@/components/Topic/TopicList.vue';
import { getTopicListApi } from '@/api/topic';
import { useFetchData } from '@/composables/useFetchData';
import type { GetTopicListParams } from '@/types/topic';
import LoadMore from '@/components/LoadMore/LoadMore.vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const params = ref<GetTopicListParams>({
  page: 0,
  limit: 10,
  type: route.params.type.toString(),
  difficulty: route.params.difficulty.toString(),
})

const { data, loading, fetchData } = useFetchData(getTopicListApi, '获取话题失败', { total: 0, list: [] }, [params], "add")

fetchData();


const fetchMoreData = () => {
  params.value.page++;
  fetchData();
}

</script>

<template>
  <div class='topic-detail-container'>
    <topic-list :list="data.list" :loading="loading"></topic-list>
    <LoadMore :loading="loading" :call-back="fetchMoreData" />
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