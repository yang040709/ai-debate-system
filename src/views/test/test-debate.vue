<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useMachine } from '@xstate/vue';
import { debateMachine, startTimer } from './debateMachine';
import { createDebateStages } from '../debate/config';

// 状态机实例
const { send, snapshot } = useMachine(debateMachine);
// 结束当前轮次
const endTurn = () => {
  console.log('send endTurn');
  send({ type: 'END_TURN' });
};

// 启动计时器
let stopTimer: () => void;
onMounted(() => {
  send({ type: 'START' });
  stopTimer = startTimer(send);
});

// 清理计时器
onUnmounted(() => {
  stopTimer();
});
</script>



<template>
  <div class="debate-container">
    <pre>{{ snapshot.context }}</pre>
    <!-- 用户发言按钮（仅当轮次为用户发言时显示）
    <button v-if="isUserTurn" @click="endTurn" :disabled="snapshot.context.remainingTime <= 0" class="debate-btn">
      {{ snapshot.context.remainingTime > 0 ? `发言 (${formatTime(snapshot.context.remainingTime)})` : '时间到' }}
    </button> -->
    <button @click="endTurn">用户发言</button>
    <button @click="endTurn">ai发言</button>

  </div>
</template>

<style scoped>
.debate-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.tip {
  display: flex;
  gap: 10px;
  margin: 15px 0;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}

.tip-content {
  flex: 1;
}

.debate-btn {
  background: #4285f4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.debate-btn:hover:not(:disabled) {
  background: #3367d6;
}

.debate-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>