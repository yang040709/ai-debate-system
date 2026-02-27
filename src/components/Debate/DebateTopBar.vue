<script setup lang='ts'>
import TopBarPC from './TopBar/TopBarPC.vue';
import TopBarPhone from './TopBar/TopBarPhone.vue';
import { ref, computed } from 'vue'
import { useDebateStore } from '@/stores/debate';
import { storeToRefs } from 'pinia';
import { TopBarProps } from './Debate';
import { DIFFICULTY_MAP } from '@/constant/debate';
const props = defineProps<TopBarProps>()

const mode = ref("pc")
const debateStore = useDebateStore()
const { debateData } = storeToRefs(debateStore)

const currentStageIndex = computed(() => {
  if (props.currentStage > props.totalStage) {
    return props.totalStage
  }
  else {
    return props.currentStage
  }
})

const difficulty = computed(() => {
  return DIFFICULTY_MAP[debateData.value.difficulty]
})
</script>

<template>
  <div class='debate-top-bar-container'>
    <TopBarPC :is-timeout="props.isTimeout" :title="debateData.topic.title" :difficulty="difficulty"
      :user-side="debateData.position" :total-stage="props.totalStage" :current-stage="currentStageIndex"
      :count-down="props.countDown" />
    <TopBarPhone :is-timeout="props.isTimeout" :title="debateData.topic.title" :difficulty="difficulty"
      :user-side="debateData.position" :total-stage="props.totalStage" :current-stage="currentStageIndex"
      :count-down="props.countDown" />
  </div>
</template>

<style scoped></style>