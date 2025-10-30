<script setup lang='ts'>
import ToggleDark from '@/components/ToggleDark/ToggleDark.vue'
import { useRouter } from 'vue-router';
import Skeleton from '@/components/Skeleton/Skeleton.vue';
import { Modal } from '@arco-design/web-vue';
import ReturnHome from '@/components/ReturnHome/ReturnHome.vue'
import { ref, computed } from 'vue';
import { useDebateStore } from '@/stores/debate';
import { storeToRefs } from 'pinia';


const { data, dataLoading: loading, debateStages, countDown, isDebateEnd, currentStageIndex } = storeToRefs(useDebateStore());



const curFlow = computed(() => {
  return currentStageIndex.value + 1 > debateStages.value.length ?
    debateStages.value.length : currentStageIndex.value + 1
})


const visible = ref(false);

const router = useRouter();

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
}

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
  <div class='top-bar-phone-container'>
    <div class="top-bar-left">
      <icon-menu-unfold :size="30" @click="handleClick" />
      <a-drawer :width="340" :footer="false" :height="340" :mask-closable="true" :visible="visible" placement="left"
        @cancel="handleCancel">
        <template #title>
          操作和辩题信息
        </template>
        <div>
          <div class="action">
            <div class="title">
              操作
            </div>
            <div class="action-item">
              <span>返回首页</span>
              <div class="content" @click="confirmReturnHome">
                <icon-import :size="20" />
              </div>
            </div>
            <div class="action-item">
              <span>切换主题</span>
              <div class="content">
                <toggle-dark trigger="click" />
              </div>
            </div>
          </div>
          <div v-if="!loading" class="info">
            <div class="title">辩题的信息</div>
            <div class="flow-item">
              <p>辩题：</p>
              <strong>{{ data.topic.title }}</strong>
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
          <skeleton v-else :loading="loading" :rows="3" />
        </div>
      </a-drawer>
    </div>
    <div class="top-bar-right">
      <div class="top-bar-title">
        <h2 v-if="!loading">{{ data.topic.title }}</h2>
        <skeleton v-else :loading="loading" :rows="1" class="skeleton" />
      </div>
      <div class="top-bar-content" v-if="!loading">
        <div class="flow-item">
          <p>当前环节:</p>
          <strong>{{ curFlow }} /{{ debateStages.length }}</strong>
        </div>
        <div class="flow-item">
          <p>发言倒计时:</p>
          <strong>{{ countDown }} 秒</strong>
        </div>
      </div>
      <skeleton v-else :loading="loading" :rows="1" class="skeleton" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-bar-phone-container {
  display: none;
  // align-items: center;
  // justify-content: center;
  grid-template-columns: 50px 1fr;
  align-items: center;
  height: 100%;

  // justify-content: space-between;
  // padding: 10px 15px;
  // padding-top: 10px;
  .top-bar-title {
    h2 {
      // padding-left: 20px;
      color: var(--theme-gray-6);
      font-size: 20px;
      flex: 1;
    }

    margin-bottom: 5px;
  }

  .top-bar-content {
    display: grid;
    // align-items: center;
    // flex-wrap: wrap;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    align-items: flex-start;
    justify-items: flex-start;
    // padding: 10px;
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




.info {
  // border: 1px solid var(--theme-blue-3);

  .title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .flow-item {
    display: grid;
    grid-template-columns: 50px 1fr;

    p {
      font-size: 14px;
    }

    strong {
      font-size: 14px;
      color: var(--theme-blue-3);
    }
  }
}

.top-bar-left {
  padding: 8px;
}


.action {
  .title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .action-item {
    display: grid;
    grid-template-columns: 80px 1fr;
    margin-bottom: 10px;
    // justify-items: center;

    span {
      justify-self: flex-start;
      font-size: 14px;
    }

    .content {
      width: 100%;
      text-align: center;
      background: var(--theme-white-1);
      border-radius: 10px;
    }
  }
}
</style>