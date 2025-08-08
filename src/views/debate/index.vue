<script setup lang="ts">
import { storeToRefs } from 'pinia';
import chat from './chat.vue'
import { useDebateStore } from '@/stores/debate'
import { onBeforeMount, onMounted, computed } from 'vue';
import topBarPc from './top-bar-pc.vue';
import topBarPhone from './top-bar-phone.vue';

const store = useDebateStore();
const {
  data,
  debateStages,
  currentStageIndex,
  isStreamLoad,
  countDown,
  isPause
} = storeToRefs(store);

onMounted(() => {
  setTimeout(() => {
    store.startDebate()
  }, 1000)
})

const curFlow = computed(() => {
  return currentStageIndex.value + 1 > debateStages.value.length ?
    debateStages.value.length : currentStageIndex.value + 1
})


</script>

<template>
  <div class="debate-container">
    <div class="top-bar">
      <!-- <topBarPc :data="data" :count-down="countDown" :cur-flow="curFlow" :debate-stages="debateStages" /> -->
      <top-bar-phone :data="data" :count-down="countDown" :cur-flow="curFlow" :debate-stages="debateStages" />
    </div>
    <chat />
  </div>
</template>

<style lang="scss" scoped>
.debate-container {
  height: 100vh;
  background: var(--theme-white-2);
}

.top-bar {
  height: 100px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: var(--theme-white-2);
  z-index: 10;
  // padding: 10px 15px;
  padding-bottom: 0;
  border-bottom: 1px solid var(--theme-border-1);
  box-shadow: 0 2px 10px var(--theme-border-1);
}
</style>
