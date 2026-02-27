<script setup lang='ts'>
import RecordList from '@/components/Record/RecordList.vue'
import type { DebateHistoryList } from '@/types/history';

import { getDebateHistoryList } from '@/api/history'
import { useFetchData } from '@/composables/useFetchData';
import { usePagination } from '@/composables/usePagination';
import { computed } from 'vue';
const defaultValue: DebateHistoryList = {
  total: 0,
  list: []
};



const { page, limit, changePage, changeTotal, totalPage } = usePagination({
  page: 0,
  limit: 8,
})

const pageInfo = computed(() => ({
  page: page.value,
  limit: limit.value,
}))


const { data, loading, fetchData } = useFetchData(getDebateHistoryList,
  [pageInfo], defaultValue);



fetchData().then(() => {
  changeTotal(data.value.total)
})

const handlePageChange = (pageSize: number) => {
  changePage(pageSize)
  fetchData().then(() => {
    changeTotal(data.value.total)
  })
}

</script>

<template>
  <div class='history-container'>
    <RecordList :items="data.list" :loading="loading" class="record-list" />
    <a-pagination v-if="totalPage >= 2" :total="data.total" show-jumper :default-page-size="limit"
      @change="handlePageChange" />
  </div>
</template>

<style scoped lang="scss">
.record-list {
  padding: 10px 0;
  padding-bottom: 30px;
}
</style>
