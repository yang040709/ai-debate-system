<script setup lang='ts'>
import { setup, assign, enqueueActions, fromCallback } from 'xstate'
import { useMachine } from '@xstate/vue'
import { onMounted, ref } from 'vue'
// import {ref}
import debateList from './debate-list.vue'
import DebateTextArea from '@/components/Debate/DebateTextArea.vue'
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
    { side: 'positive', action: 'answer', status: 'pending', usedTime: 0 }, // 正方回答
    {
      side: 'positive',
      action: 'question',
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
const isFreeMode = (ctx: any) => getCurrentStage(ctx)?.rules.freeMode === true
const isDebateOver = (ctx: any) => ctx.stageIdx >= ctx.stages.length


interface DebateMessage {
  id: string
  avatar: string
  name: string
  datetime: string
  content: string
  role: 'assistant' | 'user' | 'opponent'
  duration?: number
}

export type DebateSide = 'positive' | 'negative'

interface DebateContext {
  stages: typeof config
  stageIdx: number
  turnIdx: number
  userSide: DebateSide
  messages: any[]
  // currentUserInput: string
  // currentAiResponse: string
  remainTiming: number
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

const debateSetup = setup({
  types: {
    context: {} as DebateContext,
    events: {} as DebateEvent,
  },
  guards: {
    isUserTurn: ({ context }) => isUserTurn(context),
    isDebateOver: ({ context }) => isDebateOver(context),
  },
  // actors: {
  //   turnTimeService: fromCallback(({ sendBack }) => {
  //     const timer = setInterval(() => {
  //       sendBack({ type: 'TICK_TURN' })
  //     }, 1000)
  //   }),
  // }
})

const debateMachine = debateSetup.createMachine({
  id: 'debate',
  context: {
    stages: config,
    stageIdx: 0,
    turnIdx: 0,
    userSide: 'positive',
    messages: [],
    remainTiming: 0,
    // currentUserInput: '',
    // currentAiResponse: '',
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: {
          target: 'prompting',
          actions: assign(({ context, event }) => ({
            userSide: event.userSide,
            messages: [],
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
          console.log(turn, "<==prompting");
          if (turn?.tip) {
            enqueue.assign({
              messages: [
                ...context.messages,
                {
                  role: "assistant",
                  msg: turn.tip.content
                }
              ]
            })
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
              const messages = [...context.messages]
              messages.unshift({
                role: "user",
                msg: event.message
              })
              enqueue.assign({
                // currentUserInput: event.message,
                messages: [
                  ...messages,
                ]
              })
            }),
          }
        ],
        "TICK_TIME": [
          {
            actions: enqueueActions(({ context, enqueue }) => {
              console.log(context.remainTiming);
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
      on: {
        "AI_STREAM_START": [
          {
            actions: enqueueActions(({ context, enqueue }) => {
              const messages = [...context.messages]
              messages.unshift({
                role: "assistant",
                msg: ""
              })
              enqueue.assign({
                messages: [
                  ...messages,
                ]
              })
            })
          }
        ],
        "AI_STREAM_CHUNK": [
          {
            actions: enqueueActions(({ context, enqueue, event }) => {
              const messages = [...context.messages]
              messages[0].msg += event.chunk
              enqueue.assign({
                messages: [
                  ...messages,
                ]
              })
            })
          }
        ],
        'SUBMIT_MESSAGE': [
          {
            target: "processing",
          },
        ]
      }
    },
    processing: {
      entry: [
        enqueueActions(({ context, enqueue }) => {
          // const currentTurn = getCurrentTurn(context);
          // /* 当前回合是否是用户回合 */
          // if (currentTurn?.side === context.userSide) {
          //   /* 
          //   如果是用户回合就加入用户输入的消息
          //   */
          //   enqueue.assign({
          //     messages: [
          //       {
          //         role: "user",
          //         msg: context.currentUserInput
          //       },
          //       ...context.messages,
          //     ]
          //   })
          // }
          // else {
          //   // enqueue.assign({
          //   //   messages: [
          //   //     ...context.messages,
          //   //     {
          //   //       role: "assistant",
          //   //       msg: context.currentAiResponse
          //   //     }
          //   //   ]
          //   // })
          // }
          const currentStage = getCurrentStage(context);
          if (context.turnIdx >= currentStage.turns.length - 1) {
            enqueue.assign({
              turnIdx: 0,
              stageIdx: context.stageIdx + 1,
            })
            // console.log(getNextStage(context)?.remainingTime, context.stageIdx, context);
            enqueue.assign({
              remainTiming: getNextStage(context)?.remainingTime || 0
            })
            // context.remainTiming = getCurrentStage(context).remainingTime
          }
          else {
            enqueue.assign({
              turnIdx: context.turnIdx + 1,
            })
            // console.log(getCurrentStage(context).remainingTime);
            // enqueue.assign({
            //   remainTiming: getCurrentStage(context).remainingTime
            // })
            // context.remainTiming = getCurrentStage(context).remainingTime
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
          enqueue.assign({
            messages: [
              ...context.messages,
              {
                role: "assistant",
                msg: "本次辩论所有环节结束，感谢双方的精彩表现。"
              }
            ]
          })
        })
      ],
    }
  }
})

const { send, snapshot } = useMachine(debateMachine)

onMounted(() => {
  timer = setInterval(() => {
    // console.log("snapshot.value.value");
    if (snapshot.value.value === 'finished') {
      /* 
      辩论结束，停止计时器
      */
      clearInterval(timer)
    }
    // console.log("send tick_time");
    send({ type: "TICK_TIME" })
  }, 1000)
})


const currentUserInput = ref("")

// // watch
</script>

<template>
  <div class='debate-test-container'>
    <pre>
       {{ snapshot }}
    </pre>
    <button @click="send({ type: 'START', userSide: 'positive' })">start</button>
    <button @click="send({ type: 'SUBMIT_MESSAGE', message: '你好' })">submit</button>
    <button @click="send({ type: 'AI_STREAM_START' })">ai 流式传输开始</button>
    <button @click="send({ type: 'AI_STREAM_CHUNK', chunk: '你好' })">ai 流式传输内容</button>
    <!-- <p>123</p> -->
    <!-- <debate-list /> -->
    <!-- <div class="text-area">
      <DebateTextArea button-active v-model:inputVal="currentUserInput" />
    </div> -->
  </div>
</template>

<style scoped>
.debate-test-container {
  width: 100vw;
  height: 100vh;
}

.text-area {
  margin: 20px;
}
</style>