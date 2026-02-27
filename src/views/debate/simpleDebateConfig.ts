interface DebateTurn {
  /* 发言方 */
  side: 'positive' | 'negative'
  /* 名称 */
  turnName: string
  /* 
  控制 
  no-send:"用户提交后不发送"
  send-space:"发送空消息给后端"
  */
  control?: {
    positive?: 'no-send' | 'send-space'
    negative?: 'send-space' | 'no-send'
  }
  /* 
  提示：
  这个提示会加入辩论列表中
  */
  tip?: {
    avatar: string
    name: string
    datetime: string
    content: string
    role: 'assistant' | 'user'
    duration: number
  }
}
interface DebateStage {
  /* 
    阶段ID
  */
  id: number
  /* 
    阶段名称
  */
  title: string
  /* 
    阶段描述
  */
  description: string
  /* 
    阶段轮次配置
  */
  turns: DebateTurn[]
  /* 
    阶段剩余时间
  */
  remainingTime: number
  /* 
    阶段规则配置
  */
  rules: {
    freeMode: boolean
  }
}

export type DebateStageList = DebateStage[]

export const DebateConfig: DebateStageList = [
  {
    id: 1,
    title: '立论陈词',
    description: '正反方首次阐述观点',
    // 轮次配置（统一字段）
    turns: [
      {
        side: 'positive',
        turnName: 'speak',
        // control:"positive"|"negative",
        /* 
        'positive'|'negative'
        'no-send'|'send-space'
        // 'positive':'no-send',
        // 'negative':'send-space'
      */
        control: {
          negative: 'send-space',
        },
        tip: {
          avatar: '/referee.png',
          name: '裁判',
          datetime: '2025-10-30 22:12:05',
          content: '请正方先发表立论陈词，围绕核心论点展开，限时1分30秒。',
          role: 'assistant',
          duration: 0,
        },
      }, // 正方发言
      {
        side: 'negative',
        turnName: 'speak',
        control: {
          // 'positive':'send-space',
          negative: 'no-send',
        },
        tip: {
          avatar: '/referee.png',
          name: '裁判',
          datetime: '2025-10-30 22:12:05',
          content: '请反方发表立论陈词，明确核心论点及论据，限时1分30秒。',
          role: 'assistant',
          duration: 0,
        },
      }, // 反方发言
    ],
    // 规则约束（统一字段）
    rules: {
      freeMode: false,
    },
    // 状态控制（统一字段）
    // status: 'pending', // pending, active, completed
    // currentTurnIndex: 0, // 当前轮次索引
    remainingTime: 90, // 剩余时间
  },
] as const
