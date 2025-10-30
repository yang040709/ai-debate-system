<script setup lang='ts'>
import DebateItem from './DebateItem.vue';
import DebateTextArea from './DebateTextArea.vue';
import type { DebateList } from './Debate.d.ts';
import { ref, computed, useTemplateRef, watch } from 'vue';
import { throttle } from '@/utils/index.ts';

interface DebateProps {
  debateList: DebateList,
  isTextAreaActive: boolean,
}

interface DebateEmits {
  submit: [msg: string]
}

const messageList = computed(() => {
  return [...props.debateList].reverse();
})

const props = defineProps<DebateProps>()
const emits = defineEmits<DebateEmits>()

const inputVal = ref('')
const placeHolderText = ref('请输入辩论论点...')
const textAreaHeight = ref(120)
// const debateList: Ref<DebateList> = ref(mockDebateList)
// const isTextAreaActive = ref(true)

const handleChangeHeight = (height: number) => {
  textAreaHeight.value = height
}

const textAreaHeightPx = computed(() => {
  return textAreaHeight.value + 'px'
})


const handleUserSubmit = (msg: string) => {
  emits('submit', msg)
  inputVal.value = ''
}


const debateContentRef = useTemplateRef("debate-content");

// 判断是否“靠近底部”（比如距离底部 < 100px）
const checkIfAtBottom = () => {
  if (!debateContentRef.value) return true
  const { scrollTop, scrollHeight, clientHeight } = debateContentRef.value
  return scrollHeight - scrollTop - clientHeight < 500
}

const _scrollToBottom = () => {
  if (!debateContentRef.value) {
    return;
  }
  if (checkIfAtBottom()) {
    debateContentRef.value.scrollTop = debateContentRef.value.scrollHeight;
  }
}

/* 
使用节流函数，避免频繁滚动导致性能问题
*/
const scrollToBottom = throttle(_scrollToBottom, 200);


watch(() => props.debateList, scrollToBottom, {
  deep: 2
})
</script>

<template>
  <div class='debate-list-container'>
    <div class="content" ref="debate-content">
      <template v-for="item in messageList" :key="item.datetime+item.role+item.avatar">
        <DebateItem :item="item" />
      </template>
    </div>
    <div class="bottom">
      <DebateTextArea @submit="handleUserSubmit" @change-height="handleChangeHeight" :is-active="isTextAreaActive"
        v-model:input-val="inputVal" :placeholder="placeHolderText" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.debate-list-container {
  // min-width: 100%;
  // height: 100vh;
  // max-width: 100vw;
  padding: 0 32px;
  overflow-x: hidden;
  position: relative;
  display: flex;
  height: calc(100vh - 90px);
  background: var(--theme-white-2);
  max-width: 1200px;
  margin: 0 auto;

  .content {
    min-width: 100%;
    padding: 10px;
    scroll-behavior: smooth;
    overflow-y: auto;
    margin-bottom: v-bind(textAreaHeightPx);
  }

  .bottom {
    background: var(--theme-white-2);
    padding: 0 20px;
    padding-bottom: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}

/* 应用滚动条样式 */
::-webkit-scrollbar-thumb {
  background-color: var(--td-scrollbar-color);
}

::-webkit-scrollbar-thumb:horizontal:hover {
  background-color: var(--td-scrollbar-hover-color);
}

::-webkit-scrollbar-track {
  background-color: var(--td-scroll-track-color);
}
</style>