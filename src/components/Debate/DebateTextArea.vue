<script setup lang='ts'>
import { onMounted, ref, useTemplateRef } from 'vue'
import { ArrowUp } from 'lucide-vue-next'


interface DebateTextAreaProps {
  isActive: boolean
  placeholder?: string
}

interface DebateTextAreaEmits {
  submit: [inputVal: string],
  changeHeight: [height: number]
}

const props = defineProps<DebateTextAreaProps>()
const inputVal = defineModel<string>("inputVal")
const emits = defineEmits<DebateTextAreaEmits>();

const textAreaRef = useTemplateRef('textAreaRef')

onMounted(() => {
  console.log(textAreaRef.value, "<===textAreaRef");
})
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  target.style.height = 'auto'
  const scrollHeight = target.scrollHeight
  const maxHeight = 200
  target.style.height = Math.min(scrollHeight, maxHeight) + 'px'

  if (textAreaRef.value) {
    const height = getComputedStyle(textAreaRef.value).height
    emits("changeHeight", Number(height.replace('px', '')))
  }
}

// 文本域是否激活
const isTextAreaActive = ref(false)

const handleFocus = () => {
  isTextAreaActive.value = true
}
const handleBlur = () => {
  isTextAreaActive.value = false
}

const handleSubmit = () => {
  console.log("submit")
  emits("submit", inputVal.value || '')
}


</script>

<template>
  <div class='debate-text-area-container' :class="{ 'active': isTextAreaActive }" ref="textAreaRef">
    <textarea @input="handleInput" v-model="inputVal" @focus="handleFocus" @blur="handleBlur" class="text-area"
      :placeholder="props.placeholder" @keyup.enter="handleSubmit"></textarea>
    <div class="toolbar">
      <div class="left"></div>
      <div class="right">
        <button class="submit-button" :class="{ active: props.isActive }" @click="handleSubmit">
          <span>
            <ArrowUp :size="24" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.debate-text-area-container {
  border: 1px solid gray;
  border-radius: 10px;
  padding: 0 6px;
  padding-top: 10px;
  background: #fff;
  // min-height: 100px;

  .text-area {
    width: 100%;
    padding: 10px;
    border: none;
    background-color: transparent;
    resize: none;
    min-height: 60px;
    max-height: 200px;
    overflow-y: auto; // ✅ 允许滚动
    overflow-x: hidden;
    box-sizing: border-box;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    // padding: 8px 10px; // 可选：增加 toolbar 间距
    margin-bottom: 5px;

    .right {
      .submit-button {
        border: none;
        background-color: #DDDDDD;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        padding: 2px;

        span {
          display: block;
          width: 28px;
          height: 28px;
        }

        &.active {
          // background-color: #003580;
          background-color: #2f76e6;
        }
      }
    }
  }

  &.active {
    border-color: #0046BA;
    box-shadow: 0 0 0 2px #0047ba36, 0 0 0 4px #05388b06;
  }
}
</style>