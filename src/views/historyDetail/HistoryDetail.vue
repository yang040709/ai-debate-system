<script setup lang='ts'>
import { useFetchData } from '@/composables/useFetchData';
import { getDebateHistory } from '@/api/history';
import { computed } from 'vue'
import type { DebateHistory } from '@/types/history';
import DebateItem from '@/components/Debate/DebateItem.vue';
import HistoryRecord from './HistoryRecord.vue';
import Skeleton from '@/components/Skeleton/Skeleton.vue';
import ScrollTop from '@/components/ScrollTop/ScrollTop.vue';
const props = defineProps<{ id: string }>()
const historyId = computed(() => props.id)
const defaultValue: DebateHistory = {
  history_id: '',
  created_at: Date.now(),
  info: {
    debate_id: "",
    topic: {
      id: '',
      desc: '',
      title: '',
      created_at: "",
      participant_count: 0,
      creator: {
        name: '',
        avatar: '',
      },
      type: [],
    },
    difficulty: 'easy',
    position: 'positive',
    duration: 0,
    state: 3, //1 未开始 2 进行中 3 已结束
    created_at: 0
  },
  result: {
    info: {
      isWin: true,
      comprehensiveScore: 0,
    },
    highlights: [],
    improvementPoints: [],
    coachingComments: [],
  },
  list: [],
}

/* 
获取历史记录详情的数据
*/
const { data, loading, fetchData } = useFetchData(getDebateHistory, [historyId], defaultValue)
fetchData()

</script>

<template>
  <div class='history-detail-container'>
    <p>辩论话题信息：</p>
    <div class="record-item">
      <HistoryRecord v-if="!loading" :item="data" nav-to="debateResult" />
      <Skeleton v-else :loading="loading" />
    </div>
    <p>辩论的历史记录：</p>
    <div class="debate-list" v-if="!loading">
      <DebateItem v-for="item in data.list" :item="item" :key="item.datetime + item.content" />
    </div>
    <Skeleton v-else :loading="loading" :rows="8" />
    <ScrollTop />
  </div>
</template>

<style scoped lang="scss">
.history-detail-container {
  // display: flex;
  // height: 500px;
  padding: 20px 30px;

  &>p {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: 10px;
  }
}

.record-item {
  margin-bottom: 50px;
}

.debate-list {
  // margin-top: 50px;
  border: 1px solid var(--color-border-light);
  padding: 20px;
  background: var(--theme-gray-2);
  border-radius: 10px;
}
</style>