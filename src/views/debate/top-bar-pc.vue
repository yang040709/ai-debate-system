<script setup lang='ts'>
import ReturnHome from '@/components/ReturnHome/ReturnHome.vue'
import ToggleDark from '@/components/ToggleDark/ToggleDark.vue'
import Skeleton from '@/components/Skeleton/Skeleton.vue';
import { ref, computed } from 'vue';
import { Modal } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';
import { useDebateStore } from '@/stores/debate';
import { storeToRefs } from 'pinia';
// interface Props {
//   data: any;
//   loading: boolean;
//   curFlow: number;
//   debateStages: any[];
//   countDown: number;
//   isDebateEnd: boolean;
// }

const { data, dataLoading: loading, debateStages, countDown, isDebateEnd, currentStageIndex } = storeToRefs(useDebateStore());



const curFlow = computed(() => {
  return currentStageIndex.value + 1 > debateStages.value.length ?
    debateStages.value.length : currentStageIndex.value + 1
})


const router = useRouter()

const visible = ref(false);



const confirmReturnHome = async () => {
  visible.value = true;
  Modal.confirm({
    title: '提示',
    content: '是否确认返回主页，当前的辩论记录将不会被保存',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      router.push({ name: 'home' })
      isDebateEnd.value = true;
    },
  })
}
</script>

<template>
  <div class='top-bar-pc-container'>
    <div class="top-bar-left">
      <div class="top-bar-title">
        <!-- <return-home :is-fixed="false" class="return-home" :confirm="confirmReturnHome"/> -->
        <div class="icon">
          <icon-import :size="20" @click="confirmReturnHome" />
        </div>
        <h2 v-if="!loading">{{ data.topic.title }}</h2>
        <skeleton v-else :loading="loading" :rows="1" class="skeleton" />
      </div>
      <div v-if="!loading" class="top-bar-content">
        <div class="flow-item">
          <p>当前环节:</p>
          <strong>{{ curFlow }} /{{ debateStages.length }}</strong>
        </div>
        <div class="flow-item">
          <p>发言倒计时:</p>
          <strong>{{ countDown }} 秒</strong>
        </div>
        <div class="flow-item">
          <p>正方：</p>
          <strong v-if="data.position.id === '1'">用户</strong>
          <strong v-else>AI</strong>
        </div>
        <div class="flow-item">
          <p>反方:</p>
          <strong v-if="data.position.id === '2'">用户</strong>
          <strong v-else>AI</strong>
        </div>
        <div class="flow-item">
          <p>难度:</p>
          <strong>{{ data.difficulty.name }}</strong>
        </div>
      </div>
      <skeleton v-else :loading="loading" :rows="1" class="skeleton" />
    </div>

    <div class="top-bar-right">
      <!-- <icon-question-circle :size="24" /> -->
      <toggle-dark />
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-bar-pc-container {
  display: grid;
  grid-template-columns: 1fr 100px;
  padding: 10px 15px;

  .top-bar-title {
    display: flex;
    align-items: center;

    .icon {
      padding: 10px;
      cursor: pointer;
      background: var(--body-bg-2);
      border-radius: 5px;
      margin-right: 10px;
    }

    h2 {
      color: var(--theme-gray-6);
      font-size: 20px;
      flex: 1;
    }
  }

  .top-bar-content {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px;
    border-radius: 10px 10px 0px 0px;

    .flow-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;

      p {
        font-size: 14px;
      }

      strong {
        font-size: 14px;
        color: var(--theme-blue-3);
      }
    }

    .item {
      padding: 20px;
      background: #fff;
      border-radius: 10px;
    }
  }
}


.top-bar-right {
  justify-self: flex-end;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 10px;
}

.skeleton {
  // margin-left: 10px;
  width: 100%;
}

.return-home {
  margin-right: 20px;
}
</style>