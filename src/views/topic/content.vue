<script setup lang='ts'>
import { ref } from 'vue'
import TopicList from '@/components/Topic/TopicList.vue';
import { getTopicListApi } from '@/api/topic';
import { useFetchData } from '@/composables/useFetchData';
import type { GetTopicListParams } from '@/types/topic';
import LoadMore from '@/components/LoadMore/LoadMore.vue';
import { useRoute } from 'vue-router';
import { usePaging } from '@/composables/usePaging';


const route = useRoute();
const hasMoreFlag = ref(false);


const { page, changePage, changeLimit, changeTotal, hasMore } = usePaging();


const params = ref<GetTopicListParams>({
  page: 0,
  limit: 10,
  type: route.params.type.toString(),
  difficulty: route.params.difficulty.toString(),
})

changePage(params.value.page);
changeLimit(params.value.limit);
hasMoreFlag.value = hasMore.value;


const { data, loading, fetchData } = useFetchData(getTopicListApi, [params], { total: 0, list: [] }, { newData: "add" })


fetchData().then(() => {
  changeTotal(data.value.total);
  hasMoreFlag.value = hasMore.value;
})

const fetchMoreData = () => {
  if (!hasMore.value) {
    return;
  }
  changePage(page.value + 1)
  params.value.page = page.value;
  fetchData().then(() => {
    changeTotal(data.value.total);
    hasMoreFlag.value = hasMore.value;
  });
}



</script>

<template>
  <div class='topic-detail-container'>
    <topic-list :list="data.list" :loading="loading"></topic-list>
    <LoadMore :hasMore="hasMoreFlag" :loading="loading" :call-back="fetchMoreData" />
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