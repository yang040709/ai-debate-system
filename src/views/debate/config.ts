export const createDebateStages = () => {
  return [
    {
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
      remainingTime: 90,
    },
    {
      id: 3,
      title: '自由辩论',
      description: '双方交替攻防',
      content: '正方先发言，双方交替攻防，每次发言≤1分钟。共5分钟',
      //自由辩论的阶段可以永远循环下去，直到时间结束，其中裁判发言只有第一次会展示
      turns: [
        {
          side: 'positive',
          action: 'debate',
          tip: {
            avatar: '/referee.png',
            name: '裁判',
            datetime: '今天16:50',
            content:
              '自由辩论环节开始，正方先发言，双方交替进行，每次发言不超过1分钟，总时长5分钟。',
            role: 'assistant',
            duration: 0,
          },
        },
        {
          side: 'negative',
          action: 'debate',
        },
        {
          side: 'positive',
          action: 'debate',
        },
      ],
      rules: {
        freeMode: true,
        firstTurn: 'positive',
      },
      status: 'pending',
      currentTurnIndex: 0,
      remainingTime: 15,
    },
    {
      id: 4,
      title: '总结陈词',
      description: '双方总结观点',
      content: '反方→正方各2分钟，需融合反驳与立论，禁止新论据。',
      turns: [
        {
          side: 'negative',
          action: 'conclude',
          tip: {
            avatar: '/referee.png',
            name: '裁判',
            datetime: '今天16:55',
            content:
              '自由辩论时间结束，接下来进入总结陈词环节，请反方首先发言，需融合反驳与立论，禁止提出新论据，限时2分钟。',
            role: 'assistant',
            duration: 0,
          },
        }, // 反方总结
        {
          side: 'positive',
          action: 'conclude',
          tip: {
            avatar: '/referee.png',
            name: '裁判',
            datetime: '今天16:58',
            content: '请正方进行总结陈词，结合之前辩论内容展开，限时2分钟，禁止新论据。',
            role: 'assistant',
            duration: 0,
          },
        }, // 正方总结
      ],
      rules: {
        freeMode: false,
        firstTurn: 'negative',
      },
      status: 'pending',
      currentTurnIndex: 0,
      remainingTime: 120,
    },
  ]
}

// export const createDebateStages = () => {
//   return [
//     {
//       id: 1,
//       title: '自由辩论',
//       description: '双方交替攻防',
//       content: '正方先发言，双方交替攻防，每次发言≤1分钟。共5分钟',
//       timing: {
//         totalSeconds: 300,
//         perTurnSeconds: 60, // 每次发言最长时间
//         warningTime: 10,
//         overtimePenalty: 0,
//       },
//       turns: [
//         {
//           side: 'positive',
//           action: 'debate',
//           status: 'pending',
//           usedTime: 0,
//           tip: {
//             avatar: '/referee.png',
//             name: '裁判',
//             datetime: '今天16:50',
//             content:
//               '自由辩论环节开始，正方先发言，双方交替进行，每次发言不超过1分钟，总时长5分钟。',
//             role: 'assistant',
//             duration: 0,
//           },
//         },
//         {
//           side: 'negative',
//           action: 'debate',
//           status: 'pending',
//           usedTime: 0,
//         },
//         {
//           side: 'positive',
//           action: 'debate',
//           status: 'pending',
//           usedTime: 0,
//         },
//       ],
//       rules: {
//         freeMode: true,
//         firstTurn: 'positive',
//       },
//       status: 'pending',
//       currentTurnIndex: 0,
//       remainingTime: 15,
//     },
//     {
//       id: 2,
//       title: '总结陈词',
//       description: '双方总结观点',
//       content: '反方→正方各2分钟，需融合反驳与立论，禁止新论据。',
//       timing: {
//         totalSeconds: 240,
//         perTurnSeconds: 120,
//         warningTime: 20,
//         overtimePenalty: 0,
//       },
//       turns: [
//         {
//           side: 'negative',
//           action: 'conclude',
//           status: 'pending',
//           usedTime: 0,
//           tip: {
//             avatar: '/referee.png',
//             name: '裁判',
//             datetime: '今天16:55',
//             content:
//               '自由辩论时间结束，接下来进入总结陈词环节，请反方首先发言，需融合反驳与立论，禁止提出新论据，限时2分钟。',
//             role: 'assistant',
//             duration: 0,
//           },
//         }, // 反方总结
//         {
//           side: 'positive',
//           action: 'conclude',
//           status: 'pending',
//           usedTime: 0,
//           tip: {
//             avatar: '/referee.png',
//             name: '裁判',
//             datetime: '今天16:58',
//             content: '请正方进行总结陈词，结合之前辩论内容展开，限时2分钟，禁止新论据。',
//             role: 'assistant',
//             duration: 0,
//           },
//         }, // 正方总结
//       ],
//       rules: {
//         freeMode: false,
//         firstTurn: 'negative',
//       },
//       status: 'pending',
//       currentTurnIndex: 0,
//       remainingTime: 240,
//     },
//   ]
// }
export const debateProcess = [
  {
    avatar: '/referee.png',
    name: '裁判',
    datetime: '今天16:40',
    content: '请正方先发表立论陈词，围绕核心论点展开，限时1分30秒。',
    role: 'assistant',
    duration: 0,
  },
  {
    avatar: '/referee.png',
    name: '裁判',
    datetime: '今天16:42',
    content: '请反方发表立论陈词，明确核心论点及论据，限时1分30秒。',
    role: 'assistant',
    duration: 0,
  },
  {
    avatar: '/referee.png',
    name: '裁判',
    datetime: '今天16:45',
    content:
      '质询对抗环节开始，首先由反方对正方进行提问，双方共计3分钟，当前反方提问、正方回答时间1分30秒。',
    role: 'assistant',
    duration: 0,
  },
  {
    avatar: '/referee.png',
    name: '裁判',
    datetime: '今天16:47',
    content: '质询环节切换，现在由正方对反方进行提问，反方回答，剩余1分30秒。',
    role: 'assistant',
    duration: 0,
  },
  {
    avatar: '/referee.png',
    name: '裁判',
    datetime: '今天16:50',
    content: '自由辩论环节开始，正方先发言，双方交替进行，每次发言不超过1分钟，总时长5分钟。',
    role: 'assistant',
    duration: 0,
  },
  {
    avatar: '/referee.png',
    name: '裁判',
    datetime: '今天16:55',
    content:
      '自由辩论时间结束，接下来进入总结陈词环节，请反方首先发言，需融合反驳与立论，禁止提出新论据，限时2分钟。',
    role: 'assistant',
    duration: 0,
  },
  {
    avatar: '/referee.png',
    name: '裁判',
    datetime: '今天16:58',
    content: '请正方进行总结陈词，结合之前辩论内容展开，限时2分钟，禁止新论据。',
    role: 'assistant',
    duration: 0,
  },
  {
    avatar: '/referee.png',
    name: '裁判',
    datetime: '今天17:00',
    content: '本次辩论所有环节结束，感谢双方的精彩表现，评判结果将稍后公布。',
    role: 'assistant',
    duration: 0,
  },
]
