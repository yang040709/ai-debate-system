<script setup lang='ts'>
import Debate from '@/components/Debate/Debate.vue';
import DebateTopBar from '@/components/Debate/DebateTopBar.vue';
import { useDebateStore } from '@/stores/debate';
import { useWebSocket } from '@/composables/useWebSocket';
import { setup, assign, enqueueActions } from 'xstate'
import { useMachine } from '@xstate/vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user';
import type { DebateList, DebateItem } from '@/types/debate';
import dayjs from 'dayjs';
import { Message } from '@arco-design/web-vue';
import { useFetchData } from '@/composables/useFetchData';
import { postDebateHistory } from '@/api/history';
import { useVisible } from '@/composables/useVisible';
import { useRouter } from 'vue-router';
/* 
下面是辩论的配置文件
*/
// import { DebateConfig } from './debateConfig';
import { DebateConfig } from './simpleDebateConfig';
import type { DebateStageList } from './debateConfig'


/* 
用户与AI的消息列表
*/
const messageList = ref<DebateList>([])


/* 
用户Store
*/
const userStore = useUserStore();
/* 
辩论Store,里面的信息包括辩论的主题和描述，及辩论的难度，用户的立场
*/
const debateStore = useDebateStore();


let timer: NodeJS.Timeout;


// -----------------
// 辅助函数 (Getters) (不变)
// -----------------
const getCurrentStage = (ctx: any) => ctx.stages[ctx.stageIdx]
const getNextStage = (ctx: any) => {
  const stage = ctx.stageIdx < ctx.stages.length ? ctx.stageIdx + 1 : ctx.stageIdx
  return ctx.stages[stage]
}
const getCurrentTurn = (ctx: any) => getCurrentStage(ctx)?.turns[ctx.turnIdx]
const isUserTurn = (ctx: any) => getCurrentTurn(ctx)?.side === ctx.userSide
const isDebateOver = (ctx: any) => ctx.stageIdx >= ctx.stages.length

// -----------------
// xstate状态机的辅助 (setup) 
// -----------------

export type DebateSide = 'positive' | 'negative'

interface DebateContext {
  stages: DebateStageList
  stageIdx: number
  turnIdx: number
  userSide: DebateSide
  remainTiming: number
  isTimeout: boolean
}

export type DebateEvent =
  | { type: 'START'; userSide: DebateSide }
  | { type: 'SUBMIT_MESSAGE'; message: string }
  | { type: 'TICK_TURN' }
  | { type: 'TICK_STAGE' }
  | { type: 'AI_STREAM_START' }
  | { type: 'AI_STREAM_CHUNK'; chunk: string }
  | { type: 'AI_DONE'; message: string }
  | { type: 'FORCE_NEXT' } // 用于时间到
  | { type: "TICK_TIME" }
  | { type: "AI_STREAM_END" }
  | { type: "TIME_OUT" }

const debateSetup = setup({
  types: {
    context: {} as DebateContext,
    events: {} as DebateEvent,
  },
  guards: {
    isUserTurn: ({ context }) => isUserTurn(context),
    isDebateOver: ({ context }) => isDebateOver(context),
  },
})


type TemplateKeys = 'user' | 'assistant' | 'referee';

// 使用映射类型定义对象结构
type MsgTemplate = {
  [K in TemplateKeys]: Omit<DebateItem, 'datetime' | 'content'>
};


const msgTemplate: MsgTemplate = {
  user: {
    role: 'user',
    name: userStore.userInfo?.nickname || '用户',
    avatar: userStore.userInfo?.avatar || '/avatar.png',
  },
  assistant: {
    role: 'assistant',
    name: 'AI',
    avatar: '/ai_avatar.png',
  },
  referee: {
    role: 'assistant',
    name: '裁判',
    avatar: '/referee.png',
  },
}


/* 
下面是辩论的状态机配置
*/

const debateMachine = debateSetup.createMachine({
  id: 'debate',
  context: {
    stages: DebateConfig,
    stageIdx: 0,
    turnIdx: 0,
    userSide: 'positive',
    remainTiming: 0,
    isTimeout: true,
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: {
          target: 'prompting',
          /* 
            初始化辩论状态机，设置用户立场，当前阶段为0，当前轮次为0，剩余时间为当前阶段的剩余时间
          */
          actions: assign(({ context, event }) => ({
            userSide: event.userSide,
            stageIdx: 0,
            turnIdx: 0,
            remainTiming: getCurrentStage(context).remainingTime,
          })),
        },
      },
    },
    prompting: {
      entry: [
        enqueueActions(({ context, enqueue }) => {
          const turn = getCurrentTurn(context)
          /* 重置超时标志 */
          enqueue.assign({
            isTimeout: false,
          })
          /* 如果有提示，添加到消息列表 */
          if (turn?.tip) {
            messageList.value.unshift({
              role: "assistant",
              avatar: turn.tip.avatar,
              content: turn.tip.content,
              name: turn.tip.name,
              datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            })
          }
          /* 如果有控制指令，根据用户立场执行 */
          if (turn?.control) {
            if (turn.control[context.userSide] === 'send-space') {
              /* 
                下面的内容请你根据实际情况调整，暂时是发空格
              */
              sendMessage(' ')
            }
          }
        })
      ],
      /* 
        判断是否是用户回合
      */
      always: [
        {
          target: "userTurn",
          guard: 'isUserTurn',
        },
        {
          target: "aiTurn",
        }
      ]
    },
    userTurn: {
      on: {
        'SUBMIT_MESSAGE': [
          {
            target: "processing",
            actions: enqueueActions(({ context, event }) => {
              const currentTurn = getCurrentTurn(context)
              messageList.value.unshift({
                role: msgTemplate.user.role,
                avatar: msgTemplate.user.avatar,
                content: event.message,
                name: msgTemplate.user.name,
                datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              })
              /* 
                如果有控制指令，根据用户立场执行
                no-send就是不发送，这一句用户输入的内容
              */
              if (currentTurn?.control?.[context.userSide] === 'no-send') {
                // 不发送
                return
              }
              sendMessage(event.message)
            }),
          }
        ],
        "TICK_TIME": [
          {
            actions: enqueueActions(({ context, enqueue }) => {
              const stage = getCurrentStage(context)
              /* 如果当前未超时 */
              if (context.remainTiming - 1 >= 0) {
                enqueue.assign({
                  remainTiming: context.remainTiming - 1,
                })
              }
              /* 如果超时 */
              else {
                /* 
                如果是自由辩论模式，就强制用户加入下一轮
                */
                if (stage?.rules?.freeMode === true) {
                  enqueue.raise({ type: "TIME_OUT" })
                  return;
                }
                /* 
                  下面不是自由辩论模式，就提示用户超时
                  如果提示过，就直接返回
                */
                if (context.isTimeout === true) {
                  return;
                }
                enqueue.assign({
                  isTimeout: true,
                })
                Message.warning("当前阶段时间已超时 ～ 请注意时间，抓紧提交您的论点")
              }
            })
          }
        ],
        /* 
          这个动作，会加入一个自由辩论超时处理的事件
        */
        "TIME_OUT": [
          {
            target: "timeoutProcessing",
          }
        ]
      }
    },
    aiTurn: {
      entry: [
        enqueueActions(({ }) => {
          /* 
            加入一个空的AI消息，用于AI的回复
          */
          messageList.value.unshift({
            role: msgTemplate.assistant.role,
            avatar: msgTemplate.assistant.avatar,
            content: '',
            name: msgTemplate.assistant.name,
            datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          })
        })
      ],
      on: {
        "AI_STREAM_CHUNK": [
          {
            actions: enqueueActions(({ event }) => {
              messageList.value[0].content += event.chunk
            })
          }
        ],
        /* 
          当AI回复结束时，进入处理阶段
        */
        'AI_STREAM_END': [
          {
            target: "processing",
          },
        ]
      }
    },
    processing: {
      entry: [
        enqueueActions(({ context, enqueue }) => {
          const currentStage = getCurrentStage(context);
          if (currentStage.rules.freeMode === true) {
            /* 如果当前的轮次是配置中的最后一轮就进入循环，循环从第三个(也就是index为2) */
            if (context.turnIdx >= currentStage.turns.length - 1) {
              enqueue.assign({
                turnIdx: 2,
              })
            }
            else {
              // 自由辩论模式
              enqueue.assign({
                turnIdx: context.turnIdx + 1,
              })
            }
            return;
          }
          /* 
            如果当前的轮次是配置中当前阶段的最后一轮，就进入下一个阶段
          */
          if (context.turnIdx >= currentStage.turns.length - 1) {
            enqueue.assign({
              turnIdx: 0,
              stageIdx: context.stageIdx + 1,
            })
            /* 
              进入下一个阶段时，重置剩余时间
            */
            enqueue.assign({
              remainTiming: getNextStage(context)?.remainingTime || 0
            })
          }
          /* 
            如果当前的轮次不是配置中当前阶段的最后一轮，就进入下一个轮次
          */
          else {
            enqueue.assign({
              turnIdx: context.turnIdx + 1,
            })
          }
        })
      ],
      /* 
        如果当前的阶段是阶段数组的长度，就结束辩论
      */
      always: [
        {
          target: "finished",
          guard: 'isDebateOver',
        },
        {
          target: "prompting",
        }
      ]
    },
    /* 
      处理自由辩论中的超时情况
    */
    timeoutProcessing: {
      entry: [
        enqueueActions(({ context, enqueue }) => {
          /* 进入下一个阶段 */
          enqueue.assign({
            turnIdx: 0,
            stageIdx: context.stageIdx + 1,
          })
          /* 
            进入下一个阶段时，重置剩余时间
          */
          enqueue.assign({
            remainTiming: getNextStage(context)?.remainingTime || 0
          })
        })
      ],
      always: [
        {
          target: "finished",
          guard: 'isDebateOver',
        },
        {
          target: "prompting",
        }
      ]
    },
    finished: {
      type: "final",
      entry: [
        enqueueActions(({ }) => {
          /* 
            当辩论结束时，清除定时器
          */
          clearInterval(timer);
          /* 
            加入一个结束的消息
          */
          messageList.value.unshift({
            ...msgTemplate.referee,
            content: "本次辩论所有环节结束，感谢双方的精彩表现。",
            datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          })
          /* 
            上传本次对话的辩论记录
          */
          fetchData().then(() => {
            openModal();
          })
          /* 
            设置辩论结束
          */
          isDebateFinished.value = true;
        })
      ],
    }
  }
})

/* 
send: 可以发送消息到状态机
snapshot: 可以获取当前状态机的状态
*/
const { send, snapshot } = useMachine(debateMachine)


const { connect, sendMessage, message, disconnect } = useWebSocket(
  '/socket.io',
  {
    conversion_id: debateStore.conversion_id,
  },
  {
    msgEndCallBack: () => {
      send({ type: "AI_STREAM_END" })
      console.log("这是每句子消息结束会执行的回调")
    },
    connectSuccessCallBack: () => {
      // 
      // 如果连接成功，发送START消息
      send({ type: "START", userSide: debateStore.debateData.position })
      /* 
      开始定时器
      */
      timer = setInterval(() => {
        if (snapshot.value.value === 'finished') {
          /* 
          辩论结束，停止计时器
          */
          clearInterval(timer)
        }
        send({ type: "TICK_TIME" })
      }, 1000)
    }
  }
)

/* 
  组件挂载时，连接ws
  如果你想添加一个对话框，确认后再开始也可以
*/
onMounted(() => {
  connect();
})

/* 
  监听ws消息，消息发生变化，就会立即发送到状态机，
*/
watch(message, () => {
  if (message.value) {
    send({ type: "AI_STREAM_CHUNK", chunk: message.value })
  }
})

/* 
  用户提交消息，发送到状态机
*/

const handleUserSubmit = (event: string) => {
  send({ type: "SUBMIT_MESSAGE", message: event })
}


/* 
  进行一些清理操作
*/
onBeforeUnmount(() => {
  /* 
    断开ws连接
  */
  console.log("断开ws连接，清理定时器");
  disconnect();
  clearInterval(timer);
  debateStore.resetAll();
})

/* 
  监听状态机状态变化，当状态为userTurn时，文本框激活，可以输入内容
*/
const isTextAreaActive = computed(() => {
  return snapshot.value.value === 'userTurn';
})



const { data: uploadResponseData, fetchData } = useFetchData(postDebateHistory, [messageList], { history_id: "" })

const { visible, openModal, closeModal } = useVisible();
const router = useRouter()
const handleModelOK = () => {
  router.push({
    name: "debateResult",
    params: { id: uploadResponseData.value.history_id }
  })
  closeModal();
}

const handleToResultPage = () => {
  router.push({
    name: "debateResult",
    params: { id: uploadResponseData.value.history_id }
  })
}
const isDebateFinished = ref(false);
</script>

<template>
  <div class='debate-container'>
    <a-modal v-model:visible="visible" @ok="handleModelOK" @cancel="closeModal">
      <template #title>
        前往结果页
      </template>
      <div>
        查看这一次辩论的综合评分
      </div>
    </a-modal>
    <DebateTopBar :is-timeout="snapshot.context.isTimeout" :count-down="snapshot.context.remainTiming"
      :total-stage="snapshot.context.stages.length" :current-stage="snapshot.context.stageIdx + 1" />
    <!-- <p>
      {{ snapshot.value }}
    </p> -->
    <Debate :is-debate-finished="isDebateFinished" @to-result-page="handleToResultPage" @submit="handleUserSubmit"
      :debate-list="messageList" :is-text-area-active="isTextAreaActive" />
  </div>
</template>

<style scoped>
.debate-container {
  width: 100%;
  height: 100%;
}
</style>