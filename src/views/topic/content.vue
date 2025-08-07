<script setup lang='ts'>
import { ref } from 'vue'
import TopicList from '@/components/Topic/TopicList.vue';
import { getTopicListApi } from '@/api/topic';
import { useFetchData } from '@/composables/useFetchData';
import type { GetTopicListParams } from '@/types/topic';
import LoadMore from '@/components/LoadMore/LoadMore.vue';
import { useRoute } from 'vue-router';
import { usePagination } from '@/composables/usePagination';
import type { Ref } from 'vue';
import { TopicResponse } from '@/types/topic'

const route = useRoute();
const hasMoreFlag = ref(false);




const params = ref<GetTopicListParams>({
  page: 1,
  limit: 10,
  type: route.params.type.toString(),
})


const newDataFunc = (data: Ref<TopicResponse>, res: TopicResponse) => {
  data.value.total = res.total;
  if (data.value.list.length === 0) {
    data.value = res;
  } else {
    data.value.list.push(...res.list);
  }
}


const { data, loading, fetchData } = useFetchData(getTopicListApi, [params], { total: 0, list: [] }, { newData: "add", newDataFunc })
const { page, changePage, hasMore } = usePagination(params, data);

hasMoreFlag.value = hasMore.value;


fetchData().then(() => {
  hasMoreFlag.value = hasMore.value;
})

const fetchMoreData = () => {
  if (!hasMore.value) {
    return;
  }
  changePage(page.value + 1)
  fetchData().then(() => {
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