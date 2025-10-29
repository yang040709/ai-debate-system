<script setup lang='ts'>
import Debate from '@/components/Debate/Debate.vue';
import DebateTopBar from '@/components/Debate/DebateTopBar.vue';
import { useDebateStore } from '@/stores/debate2';
import { useWebSocket } from '@/composables/useWebSocket';
import { setup, assign, enqueueActions, fromCallback } from 'xstate'
import { useMachine } from '@xstate/vue'
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user';
import type { DebateList, DebateItem } from '@/components/Debate/Debate';
import dayjs from 'dayjs';
/* 
辩论逻辑的配置
*/
const config = [{
  id: 1,
  title: '立论陈词',
  description: '正反方首次阐述观点',
  content: '正反方各1.5分钟，仅需提出1个核心论点+1个论据（超时10秒即扣分）。',
  // 轮次配置（统一字段）
  turns: [
    {
      side: 'positive',
      action: 'speak',
      // control:"positive"|"negative",
      /* 
        'positive'|'negative'
        'no-send'|'send-space'
        // 'positive':'no-send',
        // 'negative':'send-space'
      */
      control: {
        // 'positive':'no-send',
        'negative': 'send-space'
      },
      tip: {
        avatar: '/referee.png',
        name: '裁判',
        datetime: '今天16:40',
        content: '请正方先发表立论陈词，围绕核心论点展开，限时1分30秒。',
        role: 'assistant',
        duration: 0,
      },
    }, // 正方发言
    {
      side: 'negative',
      action: 'speak',
      control: {
        // 'positive':'send-space',
        'negative': 'no-send'
      },
      tip: {
        avatar: '/referee.png',
        name: '裁判',
        datetime: '今天16:42',
        content: '请反方发表立论陈词，明确核心论点及论据，限时1分30秒。',
        role: 'assistant',
        duration: 0,
      },
    }, // 反方发言
  ],
  // 规则约束（统一字段）
  rules: {
    freeMode: false,
    firstTurn: 'positive', // 首个发言方
  },
  // 状态控制（统一字段）
  status: 'pending', // pending, active, completed
  currentTurnIndex: 0, // 当前轮次索引
  remainingTime: 90, // 剩余时间
},
{
  id: 2,
  title: '质询对抗',
  description: '双方交替提问与回答',
  content:
    '单轮混合质询（共3分钟）：反方提问→正方回答（1.5分钟）→立即切换正方提问→反方回答（1.5分钟）。',
  turns: [
    {
      side: 'negative',
      action: 'question',
      control: {
        'positive': 'send-space',
        // 'negative':'no-send'
      },
      tip: {
        avatar: '/referee.png',
        name: '裁判',
        datetime: '今天16:45',
        content:
          '质询对抗环节开始，首先由反方对正方进行提问，双方共计3分钟，当前反方提问、正方回答时间1分30秒。',
        role: 'assistant',
        duration: 0,
      },
    }, // 反方提问
    {
      side: 'positive', action: 'answer', status: 'pending', usedTime: 0,
      control: {
        // 'positive': 'send-space',
        'negative': 'no-send'
      },
    }, // 正方回答
    {
      side: 'positive',
      action: 'question',
      control: {
        'positive': 'send-space',
        // 'negative':'no-send'
      },
      tip: {
        avatar: '/referee.png',
        name: '裁判',
        datetime: '今天16:47',
        content: '质询环节切换，现在由正方对反方进行提问，反方回答，剩余1分30秒。',
        role: 'assistant',
        duration: 0,
      },
    }, // 正方提问
    { side: 'negative', action: 'answer', status: 'pending', usedTime: 0 }, // 反方回答
  ],
  rules: {
    freeMode: false,
    firstTurn: 'negative',
  },
  status: 'pending',
  currentTurnIndex: 0,
  remainingTime: 120,
},]



/* 
文本框是否激活
*/
const isTextAreaActive = ref(true)

const messageList = ref<DebateList>([])




const userStore = useUserStore();

let timer: NodeJS.Timeout;


const debateStore = useDebateStore();

// const { connect, sendMessage, message, isReceivingMsg, isConnected,disconnect } = useWebSocket(
//   '/socket.io',
//   {
//     conversion_id: debateStore.conversion_id,
//   },
//   {
//     msgEndCallBack: () => {

//       console.log("这是每句子消息结束会执行的回调")
//     }
//   }
// )






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
// const isFreeMode = (ctx: any) => getCurrentStage(ctx)?.rules.freeMode === true
const isDebateOver = (ctx: any) => ctx.stageIdx >= ctx.stages.length


// interface DebateMessage {
//   id: string
//   avatar: string
//   name: string
//   datetime: string
//   content: string
//   role: 'assistant' | 'user' | 'opponent'
//   duration?: number
// }

export type DebateSide = 'positive' | 'negative'

interface DebateContext {
  stages: typeof config
  stageIdx: number
  turnIdx: number
  userSide: DebateSide
  // messages: DebateList
  remainTiming: number
  // currentUserInput: string
  // currentAiResponse: string
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



const userMsgTemplate: Omit<DebateItem, 'datetime' | 'content'> = {
  role: 'user',
  name: userStore.userInfo?.nickname || '用户',
  avatar: userStore.userInfo?.avatar || '/avatar.png',
}
const aiMsgTemplate: Omit<DebateItem, 'datetime' | 'content'> = {
  role: 'assistant',
  name: 'AI',
  avatar: '/ai_avatar.png',
}
const refereeMsgTemplate: Omit<DebateItem, 'datetime' | 'content'> = {
  role: 'assistant',
  name: '裁判',
  avatar: '/referee.png',
}


const debateMachine = debateSetup.createMachine({
  id: 'debate',
  context: {
    stages: config,
    stageIdx: 0,
    turnIdx: 0,
    userSide: 'positive',
    // messages: [],
    remainTiming: 0,
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: {
          target: 'prompting',
          actions: assign(({ context, event }) => ({
            userSide: event.userSide,
            // messages: [],
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
          // console.log(turn, "<==prompting");
          if (turn?.tip) {
            // enqueue.assign({
            //   messages: [
            //     ...context.messages,
            //     {
            //       role: "assistant",
            //       avatar: turn.tip.avatar,
            //       content: turn.tip.content,
            //       name: turn.tip.name,
            //       datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            //     }
            //   ]
            // })
            messageList.value.unshift({
              role: "assistant",
              avatar: turn.tip.avatar,
              content: turn.tip.content,
              name: turn.tip.name,
              datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            })
          }
          if (turn?.control) {
            // turn.control
            if (turn.control[context.userSide] === 'send-space') {
              // 发送空格
              sendMessage(' ')
            }
          }
        })
      ],
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
            actions: enqueueActions(({ context, enqueue, event }) => {
              const turn = getCurrentTurn(context)
              if (turn?.control?.[context.userSide] === 'no-send') {
                // 不发送
                return
              }
              sendMessage(event.message)
              // const messages = [...context.messages]
              // messages.unshift({
              //   ...userMsgTemplate,
              //   datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              //   content: event.message,
              // })
              // enqueue.assign({
              //   messages: [
              //     ...messages,
              //   ]
              // })
              messageList.value.unshift({
                role: userMsgTemplate.role,
                avatar: userMsgTemplate.avatar,
                content: event.message,
                name: userMsgTemplate.name,
                datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              })
            }),
          }
        ],
        "TICK_TIME": [
          {
            actions: enqueueActions(({ context, enqueue }) => {
              // console.log(context.remainTiming);
              if (context.remainTiming && context.remainTiming - 1 > 0) {
                enqueue.assign({
                  remainTiming: context.remainTiming - 1,
                })
              }
              else {
                console.log("您超时了");
              }
            })
          }
        ]
      }
    },
    aiTurn: {
      entry: [

        enqueueActions(({ context, enqueue }) => {
          // const messages = [...context.messages]
          // messages.unshift({
          //   ...aiMsgTemplate,
          //   datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          //   content: '',
          // })
          // enqueue.assign({
          //   messages: [
          //     ...messages,
          //   ]
          // })
          messageList.value.unshift({
            role: aiMsgTemplate.role,
            avatar: aiMsgTemplate.avatar,
            content: '',
            name: aiMsgTemplate.name,
            datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          })
        })

      ],
      on: {
        "AI_STREAM_CHUNK": [
          {
            actions: enqueueActions(({ context, enqueue, event }) => {
              // const messages = [...context.messages]
              // messages[0].content += event.chunk
              // enqueue.assign({
              //   messages: [
              //     ...messages,
              //   ]
              // })
              messageList.value[0].content += event.chunk
            })
          }
        ],
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
          if (context.turnIdx >= currentStage.turns.length - 1) {
            enqueue.assign({
              turnIdx: 0,
              stageIdx: context.stageIdx + 1,
            })
            enqueue.assign({
              remainTiming: getNextStage(context)?.remainingTime || 0
            })
          }
          else {
            enqueue.assign({
              turnIdx: context.turnIdx + 1,
            })
          }
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
        enqueueActions(({ context, enqueue }) => {
          clearInterval(timer);
          // enqueue.assign({
          //   messages: [
          //     ...context.messages,
          //     {
          //       ...refereeMsgTemplate,
          //       content: "本次辩论所有环节结束，感谢双方的精彩表现。",
          //       datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          //     }
          //   ]
          // })
          messageList.value.unshift({
            ...refereeMsgTemplate,
            content: "本次辩论所有环节结束，感谢双方的精彩表现。",
            datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          })
        })
      ],
    }
  }
})

const { send, snapshot } = useMachine(debateMachine)

// onMounted(() => {
//   timer = setInterval(() => {
//     // console.log("snapshot.value.value");
//     if (snapshot.value.value === 'finished') {
//       /* 
//       辩论结束，停止计时器
//       */
//       clearInterval(timer)
//       return;
//     }
//     // console.log("send tick_time");
//     send({ type: "TICK_TIME" })
//   }, 1000)
// })


const { connect, sendMessage, message, isReceivingMsg, isConnected, disconnect } = useWebSocket(
  '/socket.io',
  {
    conversion_id: debateStore.conversion_id,
  },
  {
    msgEndCallBack: () => {
      send({ type: "AI_STREAM_END" })
      console.log("这是每句子消息结束会执行的回调")
    }
  }
)

onMounted(() => {
  connect();
})

watch(isConnected, () => {
  if (isConnected.value) {
    /* 
    如果连接成功，发送START消息
    */
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
})

watch(message, () => {
  if (message.value) {
    console.log("message", message.value);
    send({ type: "AI_STREAM_CHUNK", chunk: message.value })
  }
})

const handleUserSubmit = (event: string) => {
  send({ type: "SUBMIT_MESSAGE", message: event })
}

</script>

<template>
  <div class='debate-container'>
    <DebateTopBar />
    <p>
      {{ snapshot.value }}
    </p>
    <Debate @submit="handleUserSubmit" :debate-list="messageList" :is-text-area-active="isTextAreaActive" />
  </div>
</template>

<style scoped>
.debate-container {
  width: 100%;
  height: 100%;
}
</style>