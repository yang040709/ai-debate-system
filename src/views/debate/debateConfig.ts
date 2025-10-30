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
  {
    id: 2,
    title: '质询对抗',
    description: '双方交替提问与回答',
    turns: [
      {
        side: 'negative',
        turnName: 'question',
        control: {
          positive: 'send-space',
          // 'negative':'no-send'
        },
        tip: {
          avatar: '/referee.png',
          name: '裁判',
          datetime: '2025-10-30 22:12:05',
          content:
            '质询对抗环节开始，首先由反方对正方进行提问，双方共计3分钟，当前反方提问、正方回答时间1分30秒。',
          role: 'assistant',
          duration: 0,
        },
      }, // 反方提问
      {
        side: 'positive',
        turnName: 'answer',
        control: {
          positive: 'no-send',
        },
      }, // 正方回答
      {
        side: 'positive',
        turnName: 'question',
        control: {
          // 'positive': 'send-space',
          // 'negative':'no-send'
          negative: 'send-space',
        },
        tip: {
          avatar: '/referee.png',
          name: '裁判',
          datetime: '2025-10-30 22:12:05',
          content: '质询环节切换，现在由正方对反方进行提问，反方回答，剩余1分30秒。',
          role: 'assistant',
          duration: 0,
        },
      }, // 正方提问
      {
        side: 'negative',
        turnName: 'answer',
        control: {
          // 'negative': 'no-send'
        },
      }, // 反方回答
    ],
    rules: {
      freeMode: false,
    },
    remainingTime: 120,
  },
  {
    id: 3,
    title: '自由辩论',
    description: '双方交替攻防',
    //自由辩论的阶段可以永远循环下去，直到时间结束，其中裁判发言只有第一次会展示
    turns: [
      {
        side: 'positive',
        turnName: 'debate',
        control: {
          // 'positive': 'send-space',
          // 'negative':'send-space'
        },
        tip: {
          avatar: '/referee.png',
          name: '裁判',
          datetime: '2025-10-30 22:12:05',
          content: '自由辩论环节开始，正方先发言，双方交替进行，每个人的发言总时长为5分钟。',
          role: 'assistant',
          duration: 0,
        },
      },
      {
        side: 'negative',
        turnName: 'debate',
        tip: {
          avatar: '/referee.png',
          name: '裁判',
          datetime: '2025-10-30 22:12:05',
          content: '现在请反方发言，自由辩论环节，双方交替进行发言，每个人的发言总时长为5分钟。',
          role: 'assistant',
          duration: 0,
        },
      },
      {
        side: 'positive',
        turnName: 'debate',
      },
      {
        side: 'negative',
        turnName: 'debate',
      },
    ],
    rules: {
      freeMode: true,
    },
    remainingTime: 60,
  },
  {
    id: 4,
    title: '总结陈词',
    description: '双方总结观点',
    turns: [
      {
        side: 'negative',
        turnName: 'conclude',
        control: {
          positive: 'send-space',
          // 'negative':'send-space'
        },
        tip: {
          avatar: '/referee.png',
          name: '裁判',
          datetime: '2025-10-30 22:12:05',
          content:
            '自由辩论时间结束，接下来进入总结陈词环节，请反方首先发言，需融合反驳与立论，禁止提出新论据，限时2分钟。',
          role: 'assistant',
          duration: 0,
        },
      }, // 反方总结
      {
        side: 'positive',
        turnName: 'conclude',
        control: {
          positive: 'no-send',
          // 'negative':'send-space'
        },
        tip: {
          avatar: '/referee.png',
          name: '裁判',
          datetime: '2025-10-30 22:12:05',
          content: '请正方进行总结陈词，结合之前辩论内容展开，限时2分钟，禁止新论据。',
          role: 'assistant',
          duration: 0,
        },
      }, // 正方总结
    ],
    rules: {
      freeMode: false,
    },
    remainingTime: 120,
  },
] as const
