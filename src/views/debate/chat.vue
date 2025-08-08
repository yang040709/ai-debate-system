<script setup lang='ts'>
import { onBeforeUnmount, ref } from 'vue'
import { mockData } from './mockData'
import { useUserStore } from '@/stores/user'
import $bus from '@/eventBus'
import type { Debate } from '@/types/debate'
const loading = ref(false)
// 流式数据加载中
const isStreamLoad = defineModel("isStreamLoad")
console.log(isStreamLoad, "<==isStreamLoad");

const chatRef = ref(null)

const userStore = useUserStore();

const disabled = ref(false)

const props = defineProps<{ debate: Debate }>()


const emit = defineEmits<{
  "talk": [role: string, stage: number]
}>()


// // 倒序渲染
// const chatList = ref([
//   {
//     avatar: 'https://p9-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/creation_agent/b9037d77f693431ca132880792810d72~tplv-a9rns2rl98-web-preview-watermark.png?rcl=20250802185706B057C467906175D5D4D4&rk3s=8e244e95&rrcfp=5057214b&x-expires=2069492251&x-signature=rzY%2FRf4V8J64rlz%2FrSYTL890wgk%3D',
//     name: 'AI',
//     datetime: '今天16:38',
//     content:
//       '哈哈，那肯定是基因的奇妙组合呀！你从家人那里继承了优秀的外貌特质，再加上独特的气质和自信，整个人就散发着魅力。而且呀，相由心生，内心的善良、有趣也为你的帅气加分不少呢！ ',
//     role: 'assistant',
//     duration: 10,
//   },
//   {
//     avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
//     name: '你',
//     datetime: '今天16:38',
//     content: 'yang为什么这么帅',
//     role: 'user',
//   },
// ])

const chatList = ref<any[]>([])



const userChatTemplate = {
  avatar: userStore.userInfo.avatar,
  name: '你',
  datetime: new Date().toLocaleDateString(),
  content: "",
  duration: 0,
  role: 'user',
}
const assistantChatTemplate = {
  avatar: '/ai_avatar.png',
  name: 'AI',
  datetime: new Date().toLocaleDateString(),
  content: '',
  role: 'assistant',
  duration: 0,
}



const curStage = ref(0);





const handleSend = function (inputValue: string) {
  if (isStreamLoad.value) {
    return
  }
  if (!inputValue) return
  const params = { ...userChatTemplate, content: inputValue }
  chatList.value.unshift(params)
  emit("talk", "user", curStage.value)
  // 空消息占位
  // const params2 = { ...assistantChatTemplate }
  // chatList.value.unshift(params2)
  // handleData()
}


const userInput = async () => {
  console.log("人类输入")
}

const assistantInput = async () => {
  const params2 = { ...assistantChatTemplate }
  chatList.value.unshift(params2)
  loading.value = true
  isStreamLoad.value = true
  const lastItem = chatList.value[0]
  loading.value = false
  await mockData(lastItem);
  lastItem.duration = 20
  isStreamLoad.value = false
}


const str = `尊敬的评委、对方辩友：
我方观点是全面推行四天工作制不会影响经济发展。
定义：四天工作制指每周工作四天、每日工时适度延长的弹性制度；影响经济发展指导致 GDP 增速显著下滑或生产力衰退。评判标准为是否降低整体劳动效率与社会产出。
第一，缩短工时能提升员工专注度，冰岛试点显示其 productivity 提高 15%.
第二，消费与服务业因闲暇时间增加而提振，日本企业数据显示周末消费额增长 23%.
综上，四天工作制通过效率提升与需求拉动，不会影响经济发展。`








$bus.on("debate-control", ([turn, index,]: any[]) => {
  // isBreak.value = willBreak;
  console.log(turn, index, "<==$bus debate-control");
  curStage.value = index;
  if (turn.tip) {
    chatList.value.unshift(turn.tip)
  }
  console.log(props.debate.position.name, "==>", turn.side);

  if (props.debate.position.name === turn.side) {
    disabled.value = false;
    userInput();
  }
  else {
    disabled.value = true;
    assistantInput();
  }
})


onBeforeUnmount(() => {
  $bus.off("debate-control")
})

</script>

<template>
  <div class="chat-box chat-container">
    <!-- <t-chat-item content="模型由 <span>hunyuan</span> 变为 <span>GPT4</span>" variant="base"
      role="model-change"></t-chat-item> -->
    <t-chat ref="chatRef" class="chat-content" :clear-history="false" :data="chatList" :text-loading="loading"
      :is-stream-load="isStreamLoad" style="height: 100%">
      <template #content="{ item, index }">
        <t-chat-content v-if="item.content.length > 0" :content="item.content" />
        <!-- <p>123123123123123123123</p> -->
      </template>
      <template #footer>
        <t-chat-sender :textarea-props="{
          placeholder: '请输入辩论论点...',
        }" :loading="loading" @send="handleSend" :disabled="disabled">
          <!-- 自定义操作区域的内容，默认支持图片上传、附件上传和发送按钮 -->
          <template #suffix="{ renderPresets }">
            <component :is="renderPresets([])" />
          </template>
        </t-chat-sender>
      </template>
    </t-chat>
  </div>
</template>

<style scoped lang="scss">
.chat-content {
  padding: 0 20px;
}

.chat-box {
  // padding: 0 50px;
  // background: ;
  // background: var(--theme-gray-5);
  // margin-top: $header-height;
  // height: calc(100% - $header-height);
  height: calc(100% - 100px);
  // background: #F3F4F6;
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

.chat-box {
  position: relative;

  .bottomBtn {
    position: absolute;
    left: 50%;
    margin-left: -20px;
    bottom: 210px;
    padding: 0;
    border: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow:
      0px 8px 10px -5px rgba(0, 0, 0, 0.08),
      0px 16px 24px 2px rgba(0, 0, 0, 0.04),
      0px 6px 30px 5px rgba(0, 0, 0, 0.05);
  }

  .to-bottom {
    width: 40px;
    height: 40px;
    border: 1px solid #dcdcdc;
    box-sizing: border-box;
    background: var(--td-bg-color-container);
    border-radius: 50%;
    font-size: 24px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    .t-icon {
      font-size: 24px;
    }
  }
}

.model-select {
  display: flex;
  align-items: center;

  .t-select {
    width: 112px;
    height: 32px;
    margin-right: 8px;

    .t-input {
      border-radius: 32px;
      padding: 0 15px;
    }
  }

  .check-box {
    width: 112px;
    height: 32px;
    border-radius: 32px;
    border: 0;
    background: #e7e7e7;
    color: rgba(0, 0, 0, 0.9);
    box-sizing: border-box;
    flex: 0 0 auto;

    .t-button__text {
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        margin-left: 4px;
      }
    }
  }

  .check-box.is-active {
    border: 1px solid #d9e1ff;
    background: #f2f3ff;
    color: var(--td-brand-color);
  }
}


:deep(.t-chat__detail) {
  // border:1px solid #
  // background: #fff;
  // background: #F3F3F3;
  // background: #5CA1FA;
  border-radius: 10px;
}

:deep(.user .t-chat__detail) {
  background: var(--theme-chat-user);
}

:deep(.assistant .t-chat__detail) {
  background: var(--theme-chat-assistant);
}
</style>