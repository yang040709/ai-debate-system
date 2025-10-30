<script setup lang="ts">
import { ref } from 'vue';
import { useMachine } from '@xstate/vue';
import { debateMachine, type DebateMessage } from './debateMachine2';
// 确保您已经创建了这个文件，并导出了 createDebateStages
// import { createDebateStages } from './debateStages';

// Vue 3.4+ 的 defineModel
const userInput = ref('');
const userSide = ref<'positive' | 'negative'>('positive');

const { snapshot: state, send } = useMachine(debateMachine);

const currentStage = () => state.value.context.stages[state.value.context.stageIdx];
const isUserTurn = () => state.value.matches('userTurn');

function startDebate() {
  send({ type: 'START', userSide: userSide.value });
}

function submitMessage() {
  if (!userInput.value.trim()) return;
  send({ type: 'SUBMIT_MESSAGE', message: userInput.value });
  userInput.value = '';
}

</script>

<template>
  <div class="flex h-screen bg-gray-900 text-white font-sans">
    <!-- 左侧：阶段和规则 -->
    <div class="w-1/4 min-w-[300px] bg-gray-800 p-6 shadow-lg overflow-y-auto">
      <h2 class="text-2xl font-bold mb-6 text-indigo-400">辩论流程</h2>
      <div v-if="state.matches('idle')" class="flex flex-col gap-4">
        <label for="userSide" class="text-gray-300">请选择您的立场：</label>
        <select v-model="userSide" id="userSide"
          class="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="positive">正方</option>
          <option value="negative">反方</option>
        </select>
        <button @click="startDebate"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-md">
          开始辩论
        </button>
      </div>

      <div v-else>
        <ul class="space-y-4">
          <li v-for="(stage, index) in state.context.stages" :key="stage.id"
            class="p-4 rounded-lg transition-all duration-300" :class="{
              'bg-indigo-700 shadow-indigo-500/30 shadow-lg': state.context.stageIdx === index,
              'bg-gray-700': state.context.stageIdx !== index,
              'opacity-50': state.context.stageIdx > index,
            }">
            <h3 class="text-lg font-semibold">{{ stage.title }}</h3>
            <p class="text-sm text-gray-300">{{ stage.description }}</p>
          </li>
        </ul>

        <div v-if="!state.matches('finished')" class="mt-8 p-4 bg-gray-700 rounded-lg border border-gray-600">
          <h4 class="font-bold text-indigo-400 mb-2">当前阶段规则:</h4>
          <p class="text-sm text-gray-200">{{ currentStage()?.content }}</p>
        </div>
      </div>
    </div>

    <!-- 右侧：聊天和输入 -->
    <div class="flex-1 flex flex-col h-full">
      <!-- 计时器栏 -->
      <div v-if="!state.matches('idle') && !state.matches('finished')"
        class="flex justify-around p-4 bg-gray-800 shadow-md z-10 border-b border-gray-700">
        <div class="text-center">
          <span class="text-sm uppercase text-gray-400">回合剩余时间</span>
          <span class="block text-3xl font-bold" :class="{
            'text-red-500 animate-pulse': state.context.turnRemainingTime > 0 && state.context.turnRemainingTime <= 10,
            'text-green-400': state.context.turnRemainingTime > 10,
            'text-gray-500': state.context.turnRemainingTime === 0
          }">
            {{ state.context.turnRemainingTime }}s
          </span>
        </div>
        <div v-if="state.context.stages[state.context.stageIdx]?.rules.freeMode" class="text-center">
          <span class="text-sm uppercase text-gray-400">阶段总剩余时间</span>
          <span class="block text-3xl font-bold" :class="{
            'text-yellow-400': state.context.stageRemainingTime > 0,
            'text-gray-500': state.context.stageRemainingTime === 0
          }">
            {{ state.context.stageRemainingTime }}s
          </span>
        </div>
      </div>

      <!-- 消息列表 -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <div v-for="msg in state.context.messages" :key="msg.id" class="flex" :class="{
          'justify-end': msg.role === 'user',
          'justify-start': msg.role !== 'user',
        }">
          <div class="flex items-start gap-3 max-w-xl" :class="{ 'flex-row-reverse': msg.role === 'user' }">
            <img :src="msg.avatar || 'https://placehold.co/40x40/7f5ad5/ffffff?text=U'" alt="avatar"
              class="w-10 h-10 rounded-full shadow-md" />
            <div class="px-5 py-3 rounded-2xl shadow-lg" :class="{
              'bg-indigo-600 text-white rounded-br-none': msg.role === 'user',
              'bg-gray-700 text-gray-200 rounded-bl-none': msg.role === 'opponent',
              'bg-transparent border border-indigo-400 text-indigo-200 rounded-none w-full text-center italic': msg.role === 'assistant',
            }">
              <div class="flex items-center gap-3 mb-1" :class="{ 'justify-end': msg.role === 'user' }">
                <span class="font-bold text-sm">{{ msg.name }}</span>
                <span class="text-xs text-gray-400">{{ msg.datetime }}</span>
              </div>
              <p class="whitespace-pre-wrap">{{ msg.content }}</p>
            </div>
          </div>
        </div>
        <!-- AI 流式输出占位符 -->
        <div v-if="state.matches('aiTurn') && state.context.currentAiResponse" class="flex justify-start">
          <div class="flex items-start gap-3 max-w-xl">
            <img
              :src="state.context.userSide === 'positive' ? '/ai-con.png' : 'https://placehold.co/40x40/4a5568/ffffff?text=AI'"
              alt="avatar" class="w-10 h-10 rounded-full shadow-md" />
            <div class="px-5 py-3 rounded-2xl shadow-lg bg-gray-700 text-gray-200 rounded-bl-none">
              <div class="flex items-center gap-3 mb-1">
                <span class="font-bold text-sm">{{ state.context.userSide === 'positive' ? '反方 (AI)' : '正方 (AI)'
                }}</span>
                <span class="text-xs text-gray-400">正在输入...</span>
              </div>
              <p class="whitespace-pre-wrap">{{ state.context.currentAiResponse }}<span class="animate-pulse">|</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入框 -->
      <div class="p-6 bg-gray-800 border-t border-gray-700 shadow-inner">
        <div v-if="isUserTurn()">
          <textarea v-model="userInput" @keydown.enter.prevent="submitMessage"
            class="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition"
            rows="3" placeholder="轮到您发言... (Enter 提交)" :disabled="!isUserTurn()"></textarea>
          <button @click="submitMessage"
            class="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-md disabled:bg-gray-600"
            :disabled="!isUserTurn() || !userInput.trim()">
            提交发言 ({{ state.context.turnRemainingTime }}s)
          </button>
        </div>
        <div v-else-if="state.matches('aiTurn')" class="text-center text-gray-400 italic">
          等待 AI (对手) 发言... (计时器已暂停)
        </div>
        <div v-else-if="state.matches('prompting') || state.matches('processing')"
          class="text-center text-gray-400 italic">
          请稍候，正在进入下一环节...
        </div>
        <div v-else-if="state.matches('finished')" class="text-center text-2xl font-bold text-green-400">
          辩论结束！
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* 可以在这里添加一些全局样式，但 Tailwind 已经处理了大部分 */
body {
  background-color: #111827;
  /* bg-gray-900 */
}
</style>
