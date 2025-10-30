<script setup lang='ts'>
import ToggleDark from '@/components/ToggleDark/ToggleDark.vue'
import Skeleton from '@/components/Skeleton/Skeleton.vue';
import { useRouter } from 'vue-router';

import type { ChildTopBarProps } from '../Debate';

const router = useRouter();
const returnHome = () => {
  router.push({ name: 'home' })
}


const props = defineProps<ChildTopBarProps>()

</script>

<template>
  <div class='top-bar-pc-container'>
    <div class="top-bar-left">
      <div class="top-bar-title">
        <div class="icon" @click="returnHome">
          <icon-import :size="20" />
        </div>
        <h2>{{ title }}</h2>
        <!-- <h2 v-if="!loading">{{ data.topic.title }}</h2> -->
        <!-- <skeleton v-else :loading="loading" :rows="1" class="skeleton" /> -->
      </div>
      <div class="top-bar-content">
        <div class="flow-item">
          <p>当前环节:</p>
          <strong>{{ currentStage }}/{{ totalStage }}</strong>
        </div>
        <div class="flow-item">
          <p>发言倒计时:</p>
          <template v-if="!isTimeout">
            <strong class="countDown" :class="{ 'warning': countDown <= 10 }">{{ countDown }} 秒</strong>
          </template>
          <template v-else>
            <strong style="color: red;">已超时</strong>
          </template>
        </div>
        <template v-if="userSide === 'positive'">
          <div class="flow-item">
            <p>正方：</p>
            <strong>用户</strong>
          </div>
          <div class="flow-item">
            <p>反方:</p>
            <strong>AI</strong>
          </div>
        </template>
        <template v-else>
          <div class="flow-item">
            <p>正方：</p>
            <strong>AI</strong>
          </div>
          <div class="flow-item">
            <p>反方:</p>
            <strong>用户</strong>
          </div>
        </template>
        <div class="flow-item">
          <p>难度:</p>
          <strong>{{ difficulty }}</strong>
        </div>
      </div>
      <!-- <skeleton v-else :loading="loading" :rows="1" class="skeleton" /> -->
    </div>

    <div class="top-bar-right">
      <toggle-dark />
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-bar-pc-container {
  display: grid;
  grid-template-columns: 1fr 100px;
  padding: 10px 15px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  height: 90px;
  background: var(--theme-white-2);
  border-bottom: 1px solid var(--color-border-base);

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

.countDown {

  // color: red;
  &.warning {
    color: var(--theme-error);
    animation: pulse 1s infinite;
  }
}

/* 动画 */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.6;
  }
}
</style>