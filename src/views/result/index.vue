<script setup lang='ts'>
import { getDebateHistory } from '@/api/history';
import { useFetchData } from '@/composables/useFetchData';
import { useRoute, useRouter } from 'vue-router';
import { computed, watch } from 'vue'
import type { DebateHistory } from '@/types/history'
import Mask from '@/components/Mask/Mask.vue';
import Content from './Content.vue';
import { useAppStore } from '@/stores/app';
// import loadingSvg from '@/assets/loading-1.svg'
const route = useRoute()
const router = useRouter()

const id = computed(() => {
  return route.params.id as string;
})


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

const { data, loading, fetchData } = useFetchData(getDebateHistory, [id], defaultValue, {
  newData: 'reset',
  handleErr: (err) => {
    console.log(err);
    router.push({ name: '404' })
  }
})
fetchData();


const joinDebate = () => {
  console.log("参加辩论");
  router.push({
    name: 'topic',
    params: {
      type: '-1',
    }
  })
}

const shareLink = computed(() => {
  return location.href
})

const navToHistoryDetail = () => {
  router.push({
    name: "historyDetail",
    params: {
      id: id.value,
    }
  })
}


const appStore = useAppStore();
watch(() => data.value.info.topic.title, (newVal) => {
  if (newVal && newVal !== '') {
    appStore.setTitle("辩论结果-" + newVal)
  }
})

</script>

<template>
  <div class="app">
    <Mask v-if="loading" />
    <div v-else class="main-container">
      <Content :data="data" />
      <!-- 底部操作区 -->
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-info">
              辩论分析报告ID: {{ data.history_id }}
            </div>
            <div class="footer-actions">
              <button class="btn btn-primary" @click="navToHistoryDetail">查看辩论记录</button>
              <button class="btn btn-primary" @click="joinDebate">再辩一次</button>
              <button class="btn btn-secondary" v-copy="shareLink">复制链接</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app {
  min-height: calc(100vh - $header-height);
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: var(--theme-white-2);
}


// 底部区域
.footer {
  padding: 1.5rem 1rem;
  background-color: var(--theme-gray-2);
  border-top: 1px solid var(--color-border-base);
}

.footer-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.footer-info {
  font-size: 0.875rem;
  color: var(--gray-600);

  .dark-mode & {
    color: var(--gray-400);
  }
}

.footer-actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.3s;
  cursor: pointer;
  border: none;

  &.btn-secondary {
    background-color: #fff;
    border: 1px solid var(--gray-300);
    color: var(--gray-700);

    &:hover {
      background-color: var(--gray-50);

      .dark-mode & {
        background-color: var(--gray-600);
      }
    }
  }

  &.btn-primary {
    background-color: var(--blue-600);
    color: white;

    &:hover {
      background-color: var(--blue-700);
    }
  }
}

// 动画样式
.fade-in {
  opacity: 0;
  animation: fadeIn 0.8s ease-in-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.slide-up {
  transform: translateY(20px);
  opacity: 0;
  animation: slideUp 0.6s ease-out forwards;
}

@keyframes slideUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.stagger-animation>* {
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.5s ease-out forwards;
}

.stagger-animation>*:nth-child(1) {
  animation-delay: 0.1s;
}

.stagger-animation>*:nth-child(2) {
  animation-delay: 0.2s;
}

.stagger-animation>*:nth-child(3) {
  animation-delay: 0.3s;
}

.stagger-animation>*:nth-child(4) {
  animation-delay: 0.4s;
}
</style>