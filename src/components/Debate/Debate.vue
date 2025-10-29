<script setup lang='ts'>
import DebateItem from './DebateItem.vue';
import DebateTextArea from './DebateTextArea.vue';
import type { DebateList } from './Debate.d.ts';
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import { mockDebateList } from './mock.data.ts';

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
}


</script>

<template>
  <div class='debate-list-container'>
    <div class="content">
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
  padding: 0 2rem;
  overflow-x: hidden;
  position: relative;
  display: flex;
  height: calc(100vh - 90px);

  .content {
    min-width: 100%;
    padding: 10px;
    overflow-y: auto;
    margin-bottom: v-bind(textAreaHeightPx);
  }

  .bottom {
    background: #fff;
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