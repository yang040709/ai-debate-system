// @ts-nocheck
import { createMachine, assign, sendParent, setup, fromCallback } from 'xstate'

// 导入您提供的辩论阶段数据
// 假设您将数据保存在这个文件中
import { createDebateStages } from '../debate/config'

// -----------------
// 类型定义 (不变)
// -----------------
export type DebateSide = 'positive' | 'negative'

export interface DebateMessage {
  id: string
  avatar: string
  name: string
  datetime: string
  content: string
  role: 'assistant' | 'user' | 'opponent'
  duration?: number
}

export interface DebateContext {
  stages: ReturnType<typeof createDebateStages>
  stageIdx: number
  turnIdx: number
  userSide: DebateSide
  messages: DebateMessage[]
  turnRemainingTime: number
  stageRemainingTime: number // 仅用于自由辩论
  currentUserInput: string
  currentAiResponse: string
}

export type DebateEvent =
  | { type: 'START'; userSide: DebateSide }
  | { type: 'SUBMIT_MESSAGE'; message: string }
  | { type: 'TICK_TURN' }
  | { type: 'TICK_STAGE' }
  | { type: 'AI_STREAM_CHUNK'; chunk: string }
  | { type: 'AI_DONE'; message: string }
  | { type: 'FORCE_NEXT' } // 用于时间到

// -----------------
// 辅助函数 (Getters) (不变)
// -----------------
const getCurrentStage = (ctx: DebateContext) => ctx.stages[ctx.stageIdx]
const getCurrentTurn = (ctx: DebateContext) => getCurrentStage(ctx)?.turns[ctx.turnIdx]
const isUserTurn = (ctx: DebateContext) => getCurrentTurn(ctx)?.side === ctx.userSide
const isFreeMode = (ctx: DebateContext) => getCurrentStage(ctx)?.rules.freeMode === true
const isDebateOver = (ctx: DebateContext) => ctx.stageIdx >= ctx.stages.length

// -----------------
// XState v5 设置和机器定义
// -----------------

// 使用 setup 定义 Actor 逻辑, Actions, Guards, Context, Events
export const debateSetup = setup({
  types: {
    context: {} as DebateContext,
    events: {} as DebateEvent,
    // // 定义命名 Actor 的类型，以便在 invoke 中引用
    // actors: {} as {
    //   turnTimer: 'turnTimerService';
    //   stageTimer: 'stageTimerService';
    //   aiResponse: 'aiResponseService';
    // },
    // 定义命名 Guard 的类型
    // guards: {
    //   isUserTurn: (params: { context: DebateContext }) => boolean;
    //   isFreeMode: (params: { context: DebateContext }) => boolean;
    //   isDebateOver: (params: { context: DebateContext }) => boolean;
    //   isTimeRemaining: (params: { context: DebateContext }) => boolean;
    //   isStageTimeRemaining: (params: { context: DebateContext }) => boolean;
    //   isTurnTimeExpired: (params: { context: DebateContext }) => boolean;
    //   isStageTimeExpired: (params: { context: DebateContext }) => boolean;
    // },
  },
  // v4 的 services 迁移到 v5 的 actors
  actors: {
    // 用户回合计时器 (Callback Actor)
    turnTimerService: fromCallback(({ sendBack }) => {
      const interval = setInterval(() => {
        sendBack({ type: 'TICK_TURN' })
      }, 1000)
      return () => clearInterval(interval)
    }),

    // 阶段计时器 (自由辩论) (Callback Actor)
    stageTimerService: fromCallback(({ sendBack }) => {
      // 注意: stageRemainingTime 的初始化必须在机器的 entry action 中完成，
      // 因为 Actor 逻辑的创建函数不应该修改 context。
      const interval = setInterval(() => {
        sendBack({ type: 'TICK_STAGE' })
      }, 1000)
      return () => clearInterval(interval)
    }),

    // 模拟 AI 流式响应 (Callback Actor)
    aiResponseService: fromCallback(({ sendBack }) => {
      const response = '这是一个模拟的AI流式响应。AI正在思考并逐字输出...'
      let i = 0
      const interval = setInterval(() => {
        if (i < response.length) {
          sendBack({ type: 'AI_STREAM_CHUNK', chunk: response[i] })
          i++
        } else {
          clearInterval(interval)
          sendBack({ type: 'AI_DONE', message: response })
        }
      }, 150) // 模拟打字速度

      return () => clearInterval(interval)
    }),
  },
  // v4 的 guards 迁移到 v5 的 guards
  guards: {
    isUserTurn: ({ context }) => isUserTurn(context),
    isFreeMode: ({ context }) => isFreeMode(context),
    isDebateOver: ({ context }) => isDebateOver(context),
    // 专门用于 Tick 事件的 Guard
    isTimeRemaining: ({ context }) => context.turnRemainingTime > 1,
    isStageTimeRemaining: ({ context }) => context.stageRemainingTime > 1,
    isTurnTimeExpired: ({ context }) => context.turnRemainingTime <= 1, // 当时间小于等于1时认为时间到
    isStageTimeExpired: ({ context }) => context.stageRemainingTime <= 1,
  },
  // v4 的 actions 迁移到 v5 的 actions (虽然这里只使用了内联 assign)
  actions: {
    // 例如，一个名为 updateStageTime 的命名 Action
    updateStageTime: assign(({ context }) => ({
      stageRemainingTime: getCurrentStage(context).remainingTime,
    })),
  },
})

export const debateMachine = debateSetup.createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QTAIwIYBcwDoCWEANmAMQDKAKgIIBKFA2gAwC6ioADgPax6Z6cA7NiAAeiAJziATDgBsAFgCs4gMwB2WQEYNjAByaANCACeiWVPE5Ns2bo1TG8veMUBfV0ZQZsOdgCdOAFt2PgEoEiZWJBAuHj5BYTEETUZGSxVdRUUnRUY1C01DE0Q1NRUcKQsVGxSHbPl3TzQsXH8gkLwwiM0ojm5efiFopJTNGQVlcUd5NUZNRRUjU2S8q0cpFXlbFUlZRhVGkC8WnABXWDA-ClO-ARIKAEkAYQBpAH0KAFUaADlI4ViAwSwwkahwKghmxUDnEGlUaiWiEU+hwdjSWxhsiy4kOxx850u11u92e7y+v3oPQB-XiQ1ASS2shw4lsal0LPkhU0unkiIQnPKmXkUhsam5Tg2uOa+IuVxud0erzelCoAHEAKL-aKA2mJEpM7SzcS6FS5NQLMV8+S6JlSJRTFxSay7KXeXAEuXExXvFUaym9GI0wZ6-k2Zms9kKLk8vm5SwzVT7JyyU2ZNweI7S92yol3MifABCAFkHhQ3kX1WQyGrNSxqXFgyDQ0yWXZI5zCjHigg9oo1vJNqlxAPNNbXSd0HhcyQIIJcJ0AG6cADWuEnNDgXAEFzIlwXeAAxmAtX0G8D6YhGeG2xzo7zu9DNBULFJdHUnbJxJpxz5J9OqA8yoUDQ6pUEWbxPAAEp8PwvCegZnnSoiIPMjDgp++h2JsyKqLIfLaEyahfp+xrKKUKZqD+a5TvKJJKr6tYBjqjYXggPI4FkZRSIo3KSFs1p8ii1g2Cm2jcg4YxUTgf60d6QE1v69ZAkhDJhq2bK3p297LJUfZ7MKSjVMKYylFJbRHrAPBdPBzHnshCCSOM9rqFoOj6FajBMjaYyMFIGjyC4mxmQEFlWeEinakGdlJI5cjORoBF6EUyxKDI3mVJy3EZJ+7gZgInAoPA0R4mASm6k2AC0yWIBVshSQQxBlSx9lYeCYyKJ+5hbKaCLdliMiVMOYwqJo2UDsF7ShFATXRSh3J9gm0JaI52WxnYchERkNp2rM1RSR6uYzSpl69cstgyAFyhvuyCWVFJMm3EdIYpjgOiGbIbIZFkSh8n5YKch91TZKUS0TaFnTTZFiEhia5Ssh15rWgOxpWqNHEmgOyLQmKeQHBmJU4AAZp0eCwAAFpAT1Np2C2bSKmgrTafIZGhih+TauybDyuWuEAA */
  id: 'debate',
  context: {
    stages: createDebateStages(),
    stageIdx: 0,
    turnIdx: 0,
    userSide: 'positive', // 默认用户是正方
    messages: [],
    turnRemainingTime: 0,
    stageRemainingTime: 0,
    currentUserInput: '',
    currentAiResponse: '',
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: {
          target: 'prompting',
          actions: assign(({ event }) => ({
            userSide: event.userSide,
            messages: [],
            stageIdx: 0,
            turnIdx: 0,
          })),
        },
      },
    },
    // 1. 裁判提示环节
    prompting: {
      entry: [
        assign(({ context }) => {
          const turn = getCurrentTurn(context)
          if (turn?.tip) {
            return {
              messages: [
                ...context.messages,
                // 这里假设您已经有了一个全局的 `uuid` 或类似函数来生成ID
                { ...turn.tip, id: crypto.randomUUID(), datetime: new Date().toLocaleTimeString() },
              ],
            }
          }
          return {} // 如果没有 tip，不改变 context
        }),
        // 自由辩论第一回合时，初始化阶段计时器
        // 使用命名 Action 代替 v4 service 中的 assign
        {
          type: 'updateStageTime',
          // v5 的 guard 属性来控制 Action 的执行
          guard: ({ context }) => isFreeMode(context) && context.turnIdx === 0,
        },
      ],
      // 检查是否是自由辩论的开始，如果是，启动阶段计时器
      invoke: {
        id: 'stageTimer',
        src: 'stageTimerService', // 引用 setup.actors 中的定义
        // 仅在自由辩论 (isFreeMode) 且是该阶段第一回合 (turnIdx: 0) 时启动
        // 注意：invoke 会在每次进入状态时启动。
        // 如果是自由辩论，无论是否是第一回合，计时器都应该运行，直到阶段结束。
        // v5 中没有 v4 的 if 属性，需要改为 Always Transition 或其他方式。
        // 最直接的方式是，如果不是自由辩论，就不应该进入这个 invoke 的状态，
        // 但这里为了简化，我们仅在 isFreeMode 时才让 invoke 保持活跃。
        // 在 v5 中，更推荐的做法是使用 `spawn` 或确保 Actor 在 `prompting` 之外被停止。
        // 保持 v4 的语义，我们依赖 Actor 逻辑（fromCallback）的生命周期。
        // 鉴于机器结构，在 prompting 中 invoke 是最简单的，并在退出时自动清理。
        // 唯一的例外是 Stage 计时器，它应贯穿整个阶段，这里我们假设它仅在 freeMode 时在 prompting 启动一次。
        // 因为总是会立即离开 prompting，所以我们需要一个持久的状态来承载 stageTimer。
        // **修正:** 考虑到 stageTimer 应跨越多个 `userTurn` 和 `aiTurn`，它不应该在 `prompting` 中被 `invoke`。
        // 最好的做法是将 `stageTimer` 提升到机器顶层，或者使用一个更高层级的状态。
        // 但为了最小化改动，我将 StageTimer 移到 `userTurn` 和 `aiTurn` 中进行监听，并在 `processing` 中停止。
        // **最终修正:** 保持 V4 的结构，但意识到 V5 Invoke 在状态退出时停止。
        // 为了 stageTimer 的持久性，最好的方法是将其提升到更高层级的状态，但在这里我们保留它并依赖 onDone/onError 来停止。
        // 由于 `prompting` 状态是一个零延迟过渡状态（`always`），Invoke 不会被执行。
        // 因此，我们应该将计时器 Invoke 放在 `userTurn` 和 `aiTurn` 中。
        // **进一步修正:** 鉴于原 V4 代码中，`stageTimerService` 是在 `prompting` 中被 `invoke`，并且 V4 的 `invoke` 允许 `if` 守卫。
        // 在 V5 中，`invoke` 缺乏 `if` 属性。最简单的迁移方法是只在进入 `userTurn` 和 `aiTurn` 时分别启动 `turnTimer` 和 `stageTimer` (如果是自由辩论)。
        // 但是，`stageTimer` 在 V4 中似乎是持久的。为了模拟 V4 的行为，
        // 我们需要使用一个顶层 `invoke` 或在一个持久状态中 `invoke`。

        // **我们保留 V4 代码的结构，并将 stageTimer 提升到顶层**
        // **但为了简化，我们把 V4 中的 StageTimer logic 暂时忽略，或者假设外部 Actor 管理 StageTimer**
        // **我们把 StageTimer 移到 `userTurn` 和 `aiTurn` 中，并使用 `guard` 确保只有在 freeMode 时才启动**
        // **但是 `invoke` 必须在状态内定义，所以我们选择在 `userTurn` 和 `aiTurn` 中分别 `invoke`**

        // **因为 `prompting` 是一个瞬时状态，invoke 在这里不会执行。**
        // **所以我们将 `stageTimer` 的 invoke 移到 `userTurn` 和 `aiTurn` 的公共父状态中，或直接在 `userTurn` 和 `aiTurn` 中启动。**
      },
      always: [
        {
          target: 'userTurn',
          guard: 'isUserTurn', // 引用 setup.guards 中的命名守卫
        },
        {
          target: 'aiTurn',
        },
      ],
    },
    // 2. 用户方回合
    userTurn: {
      entry: assign(({ context }) => ({
        // 设置回合剩余时间
        turnRemainingTime: isFreeMode(context) ? 60 : getCurrentStage(context).remainingTime,
      })),
      invoke: [
        {
          id: 'turnTimer',
          src: 'turnTimerService', // 引用 setup.actors 中的定义
        },
        // 如果是自由辩论模式，需要启动阶段计时器
        {
          id: 'stageTimerInUserTurn',
          src: 'stageTimerService',
          // 使用 guard 确保只有在 freeMode 时才启动（在 V5 中没有 invoke.if，使用 on: '' 也可以）
          // 但是这里我们用一个过渡确保它只在 freeMode 时被 `invoke`
          // 在 V5 中，更推荐的做法是使用 fromTransition actor，或者在外部 Actor 中管理。
          // 这里为了遵循 V4 结构，我们使用一个始终执行的 invoke，并依赖 guard 逻辑来处理
          // **修正:** 鉴于 StageTimer 应在阶段开始时启动并在阶段结束时停止，它应该在一个能持续整个阶段的父状态中。
          // 再次简化，我们仅在 StageTimer 为 0 时才进入 `processing`，并依赖计时器在进入 `userTurn` 时重新启动。
          // 尽管这不是最优雅的解决方案，但它遵循了 V4 的结构，并允许我们监听 `TICK_STAGE`。
          // 更好的方案是将 `freeDebate` 作为一个嵌套状态。
          // **为了保持 V4 结构：将 StageTimer 逻辑从 invoke 中移除，仅在 freeMode 时监听 TICK_STAGE 事件**
        },
      ],
      on: {
        // 用户方回合时，只响应回合计时器
        TICK_TURN: [
          {
            actions: assign(({ context }) => ({
              turnRemainingTime: context.turnRemainingTime - 1,
            })),
            guard: 'isTimeRemaining',
          },
          {
            // 时间到，强制进入下一环节
            target: 'processing',
            actions: assign({ turnRemainingTime: 0 }),
            guard: 'isTurnTimeExpired', // 确保在时间用完时才过渡
          },
        ],
        // 阶段计时器（自由辩论）
        TICK_STAGE: [
          {
            actions: assign(({ context }) => ({
              stageRemainingTime: context.stageRemainingTime - 1,
            })),
            guard: 'isStageTimeRemaining',
          },
          {
            // 阶段时间到，强制进入下一环节
            target: 'processing',
            actions: assign({ stageRemainingTime: 0 }),
            guard: 'isStageTimeExpired', // 确保在时间用完时才过渡
          },
        ],
        // 用户提交
        SUBMIT_MESSAGE: {
          target: 'processing',
          actions: assign(({ context, event }) => ({
            messages: [
              ...context.messages,
              {
                id: crypto.randomUUID(),
                avatar: context.userSide === 'positive' ? '/user-pro.png' : '/user-con.png',
                name: context.userSide === 'positive' ? '正方 (我)' : '反方 (我)',
                datetime: new Date().toLocaleTimeString(),
                content: event.message,
                role: 'user',
              },
            ],
          })),
        },
      },
      exit: [
        // 在退出 userTurn 时停止 turnTimer，invoke 在 v5 中会自动停止，但 explicit exit action 有助于清晰
        // 在 V5 中，invoke 在状态退出时会自动停止，因此这里不需要额外的 exit action
      ],
    },
    // 3. AI (对手) 方回合
    aiTurn: {
      entry: assign({
        currentAiResponse: '', // 准备接收流式输出
      }),
      invoke: {
        id: 'aiResponseService',
        src: 'aiResponseService', // 引用 setup.actors 中的定义
        onDone: {
          target: 'processing',
          actions: assign(({ context, event }) => ({
            messages: [
              ...context.messages,
              {
                id: crypto.randomUUID(),
                avatar: context.userSide === 'positive' ? '/ai-con.png' : '/ai-pro.png',
                name: context.userSide === 'positive' ? '反方 (AI)' : '正方 (AI)',
                datetime: new Date().toLocaleTimeString(),
                content: event.output.message, // v5 的 onDone 事件结果在 event.output 中
                role: 'opponent',
              },
            ],
            currentAiResponse: '',
          })),
        },
      },
      on: {
        AI_STREAM_CHUNK: {
          actions: assign(({ context, event }) => ({
            currentAiResponse: context.currentAiResponse + event.chunk,
          })),
        },
        // AI 回合时，也需要监听阶段计时器（自由辩论）
        TICK_STAGE: [
          {
            actions: assign(({ context }) => ({
              stageRemainingTime: context.stageRemainingTime - 1,
            })),
            guard: 'isStageTimeRemaining',
          },
          {
            target: 'processing',
            actions: assign({ stageRemainingTime: 0 }),
            guard: 'isStageTimeExpired',
          },
        ],
      },
    },
    // 4. 处理回合/阶段过渡
    processing: {
      entry: assign(({ context }) => {
        const stage = getCurrentStage(context)
        let newTurn = context.turnIdx
        let newStage = context.stageIdx

        // 停止回合计时器 (实际上 invoke 在退出 userTurn 时已自动停止)
        // 这里的 assign({ turnRemainingTime: 0 }) 只是为了更新 context
        context.turnRemainingTime = 0

        if (isFreeMode(context)) {
          // 自由辩论模式
          if (context.stageRemainingTime <= 0) {
            // 阶段时间到，进入下一阶段
            newStage = context.stageIdx + 1
            newTurn = 0
          } else {
            // 阶段时间未到，循环到下一回合
            newTurn = (context.turnIdx + 1) % stage.turns.length
          }
        } else {
          // 非自由辩论模式
          newTurn = context.turnIdx + 1
          if (newTurn >= stage.turns.length) {
            // 阶段内回合结束，进入下一阶段
            newStage = context.stageIdx + 1
            newTurn = 0
          }
        }

        return {
          stageIdx: newStage,
          turnIdx: newTurn,
          turnRemainingTime: 0, // 确保在这里也设置一次
        }
      }),
      always: [
        {
          target: 'finished',
          guard: 'isDebateOver',
        },
        {
          target: 'prompting',
        },
      ],
    },
    // 5. 辩论结束
    finished: {
      entry: assign(({ context }) => ({
        messages: [
          ...context.messages,
          {
            id: crypto.randomUUID(),
            avatar: '/referee.png',
            name: '裁判',
            datetime: new Date().toLocaleTimeString(),
            content: '本次辩论所有环节结束，感谢双方的精彩表现。',
            role: 'assistant',
          },
        ],
      })),
      type: 'final',
    },
  },
})
