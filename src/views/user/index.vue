<script setup lang="ts">
// import { useUserStore } from '@/stores/user'
// import EditModal from './edit-modal.vue'
import Info from './info.vue'
import RecordList from '@/components/Record/RecordList.vue'
import Head from './head.vue';
import ScrollTop from '@/components/ScrollTop/ScrollTop.vue';
import type { Result, ResultListResponse } from '@/types/result';
import { getResultListApi } from '@/api/result';
import { useFetchData } from '@/composables/useFetchData';
import { usePagination } from '@/composables/usePagination';
import { ref } from 'vue';
import LoadMore from '@/components/LoadMore/LoadMore.vue';
import type { Ref } from 'vue';
const defaultValue: ResultListResponse = {
  total: 0,
  list: []
};
const pageInfo = ref({
  page: 0,
  limit: 5,
})
const hasMoreFlag = ref(false);


const newDataFunc = (data: Ref<ResultListResponse>, res: ResultListResponse) => {
  data.value.total = res.total;
  if (data.value.list.length === 0) {
    data.value = res;
  } else {
    data.value.list.push(...res.list);
  }
}



const { data, loading, fetchData } = useFetchData(getResultListApi, [pageInfo], defaultValue, {
  newData: "add",
  newDataFunc
});
const { page, changePage, hasMore } = usePagination(pageInfo, data)


fetchData().then(() => {
  hasMoreFlag.value = hasMore.value;
});



const fetchMoreData = () => {
  if (!hasMore.value) {
    return;
  }
  changePage(page.value + 1)
  fetchData().then(() => {
    hasMoreFlag.value = hasMore.value;
  });
}


const items = [
  {
    label: "胜率",
    value: "89%"
  },
  {
    label: "场次",
    value: "128"
  },
  {
    label: "积分",
    value: "2890"
  }
]

</script>

<template>
  <div class="user-container">
    <div class="user-content">
      <div class="user-content-box">

        <Head></Head>
        <Info :items="items"></Info>
        <RecordList :items="data.list" />
        <LoadMore :hasMore="hasMoreFlag" :loading="loading" :call-back="fetchMoreData" />
        <ScrollTop />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-container {
  // width: 100%;
  background: linear-gradient(180deg, var(--user-box-bg1), var(--footer-bg));

  .user-content {
    overflow: hidden;
    width: 80%;
    max-width: 1200px;
    transition: width 0.3s ease-in-out;
    margin: 0 auto;
    min-height: calc(90vh - $header-height);
    position: relative;
  }
}

.user-content-box {
  margin-top: 100px;
  width: 100%;
  background: var(--theme-white-1);
  border-radius: 8px;
  // height: 90%;
  position: relative;
  padding: 50px 25px;
  padding-top: 60px;
}
</style>
