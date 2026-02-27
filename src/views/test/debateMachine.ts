import { assign, log, setup, enqueueActions } from 'xstate'
import { createDebateStages } from '../debate/config'

export const debateMachine = setup({
  types: {
    events: {} as { type: 'START' } | { type: 'END_TURN' } | { type: 'TIME_TICK' },
    context: {} as {
      stages: any
      currentStageIndex: number
      currentTurnIndex: number
      remainingTime: number
      currentSide: 'positive' | 'negative'
      isTimerRunning: boolean
    },
  },
  guards: {
    isStage1Completed: ({ context }) => context.currentTurnIndex >= 2,
    isStage1NotCompleted: ({ context }) => context.currentTurnIndex < 2,
    isStage2Completed: ({ context }) => context.currentTurnIndex >= 4,
    isStage2NotCompleted: ({ context }) => context.currentTurnIndex < 4,
    isStage3Completed: ({ context }) => context.remainingTime <= 0,
    isStage3NotCompleted: ({ context }) => context.remainingTime > 0,
    isStage4Completed: ({ context }) => context.currentTurnIndex >= 2,
    isStage4NotCompleted: ({ context }) => context.currentTurnIndex < 2,
  },
  actions: {
    entryNewStage: enqueueActions(({ context, enqueue }) => {
      enqueue.assign({
        currentStageIndex: context.currentStageIndex + 1,
        currentTurnIndex: 0,
      })
    }),
    entryNewTurn: enqueueActions(({ context, enqueue }) => {
      enqueue.assign({
        currentTurnIndex: context.currentTurnIndex + 1,
      })
    }),
    resetTime: enqueueActions(({ enqueue }) => {
      enqueue.assign({
        remainingTime: 30,
      })
    }),
    timeTick: enqueueActions(({ context, enqueue }) => {
      console.log('time', context.remainingTime)
      enqueue.assign({
        remainingTime: context.remainingTime - 1,
      })
    }),
    setTimerRunning: enqueueActions(({ enqueue }) => {
      enqueue.assign({
        isTimerRunning: true,
      })
    }),
    setTimerStopped: enqueueActions(({ enqueue }) => {
      enqueue.assign({
        isTimerRunning: false,
      })
    }),
  },
}).createMachine({
  id: 'debate',
  initial: 'idle',
  context: {
    stages: createDebateStages(), // 从您的配置导入
    currentStageIndex: 0,
    currentTurnIndex: 0,
    remainingTime: 0, // 仅用户可见的剩余时间
    currentSide: 'positive', // 仅自由辩论阶段使用
    isTimerRunning: false,
  },
  states: {
    idle: {
      on: {
        START: {
          target: 'stage1',
          actions: ['entryNewStage', 'resetTime', 'setTimerRunning'],
        },
      },
    },
    stage1: {
      on: {
        END_TURN: [
          {
            target: 'stage2',
            guard: 'isStage1Completed',
            actions: ['entryNewStage', 'resetTime'],
          },
          {
            target: 'stage1',
            guard: 'isStage1NotCompleted',
            actions: ['entryNewTurn'],
          },
        ],
        TIME_TICK: {
          actions: ['timeTick'],
        },
      },
    },
    stage2: {
      on: {
        END_TURN: [
          {
            target: 'stage3',
            guard: 'isStage2Completed',
            actions: ['entryNewStage', 'resetTime'],
          },
          {
            target: 'stage2',
            guard: 'isStage2NotCompleted',
            actions: ['entryNewTurn'],
          },
        ],
        TIME_TICK: {
          actions: ['timeTick'],
        },
      },
    },
    stage3: {
      on: {
        END_TURN: [
          {
            target: 'stage4',
            guard: 'isStage3Completed',
            actions: ['entryNewStage', 'resetTime'],
          },
          {
            target: 'stage3',
            guard: 'isStage3NotCompleted',
            actions: ['entryNewTurn'],
          },
        ],
        TIME_TICK: {
          actions: ['timeTick'],
        },
      },
    },
    stage4: {
      on: {
        END_TURN: [
          {
            target: 'completed',
            guard: 'isStage4Completed',
            actions: ['entryNewStage', 'resetTime'],
          },
          {
            target: 'stage4',
            guard: 'isStage4NotCompleted',
            actions: ['entryNewTurn'],
          },
        ],
        TIME_TICK: {
          actions: ['timeTick'],
        },
      },
    },
    completed: {
      type: 'final',
    },
  },
})

// 用于在组件中启动定时器
export const startTimer = (
  send: (event: { type: 'START' } | { type: 'END_TURN' } | { type: 'TIME_TICK' }) => void,
) => {
  const timer = setInterval(() => {
    send({ type: 'TIME_TICK' })
  }, 1000)
  return () => clearInterval(timer)
}
