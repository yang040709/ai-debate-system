<script setup lang='ts'>
import ReturnHome from '@/components/ReturnHome/ReturnHome.vue'
import ToggleDark from '@/components/ToggleDark/ToggleDark.vue'
defineProps(["data", "curFlow", "debateStages", "countDown"])

</script>

<template>
  <div class='top-bar-pc-container'>
    <div class="top-bar-left">
      <div class="top-bar-title">
        <!-- <return-home :is-fixed="false" /> -->
        <h2>{{ data.topic.title }}</h2>
      </div>
      <div class="top-bar-content">
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
        <!-- <div class="flow-item">
          <p>难度:</p>
          <strong>{{ data.difficulty.name }}</strong>
        </div> -->
      </div>
    </div>
    <!-- <div class="top-bar-right">
      <icon-question-circle :size="24" />
      <toggle-dark />
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.top-bar-pc-container {
  display: flex;
  align-items: center;
  justify-content: center;
  // justify-content: space-between;
  // padding: 10px 15px;
  padding-top: 10px;

  .top-bar-title {
    display: flex;
    align-items: center;

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


.top-bar-right {
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>