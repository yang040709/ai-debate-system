export const createDebateStages = () => {
  return [
    {
      id: 1,
      title: '立论陈词',
      description: '正反方首次阐述观点',
      content: '正反方各1.5分钟，仅需提出1个核心论点+1个论据（超时10秒即扣分）。',
      // 时间配置（统一字段）
      timing: {
        totalSeconds: 180, // 环节总时长(秒)
        perTurnSeconds: 90, // 每轮时长(秒)
        warningTime: 10, // 倒计时警告时间(秒)
        overtimePenalty: 10, // 超时扣分起始秒数
      },
      // 轮次配置（统一字段）
      turns: [
        { side: 'positive', action: 'speak', status: 'pending', usedTime: 0 }, // 正方发言
        { side: 'negative', action: 'speak', status: 'pending', usedTime: 0 }, // 反方发言
      ],
      // 规则约束（统一字段）
      rules: {
        freeMode: false,
        firstTurn: 'positive', // 首个发言方
      },
      // 状态控制（统一字段）
      status: 'pending', // pending, active, completed
      currentTurnIndex: 0, // 当前轮次索引
      remainingTime: 18, // 剩余时间
    },
    {
      id: 2,
      title: '质询对抗',
      description: '双方交替提问与回答',
      content:
        '单轮混合质询（共3分钟）：反方提问→正方回答（1.5分钟）→立即切换正方提问→反方回答（1.5分钟）。',
      timing: {
        totalSeconds: 180,
        perTurnSeconds: 90,
        warningTime: 15,
        overtimePenalty: 0,
      },
      turns: [
        { side: 'negative', action: 'question', status: 'pending', usedTime: 0 }, // 反方提问
        { side: 'positive', action: 'answer', status: 'pending', usedTime: 0 }, // 正方回答
        { side: 'positive', action: 'question', status: 'pending', usedTime: 0 }, // 正方提问
        { side: 'negative', action: 'answer', status: 'pending', usedTime: 0 }, // 反方回答
      ],
      rules: {
        freeMode: false,
        firstTurn: 'negative',
      },
      status: 'pending',
      currentTurnIndex: 0,
      remainingTime: 180,
    },
    {
      id: 3,
      title: '自由辩论',
      description: '双方交替攻防',
      content: '正方先发言，双方交替攻防，每次发言≤1分钟。共5分钟',
      timing: {
        totalSeconds: 300,
        perTurnSeconds: 60, // 每次发言最长时间
        warningTime: 10,
        overtimePenalty: 0,
      },
      turns: [
        { side: 'positive', action: 'debate', status: 'pending', usedTime: 0 },
        { side: 'negative', action: 'debate', status: 'pending', usedTime: 0 },
        { side: 'positive', action: 'debate', status: 'pending', usedTime: 0 },
        { side: 'negative', action: 'debate', status: 'pending', usedTime: 0 },
        { side: 'positive', action: 'debate', status: 'pending', usedTime: 0 },
        { side: 'negative', action: 'debate', status: 'pending', usedTime: 0 },
      ],
      rules: {
        freeMode: true,
        firstTurn: 'positive',
      },
      status: 'pending',
      currentTurnIndex: 0,
      remainingTime: 30,
    },
    {
      id: 4,
      title: '总结陈词',
      description: '双方总结观点',
      content: '反方→正方各2分钟，需融合反驳与立论，禁止新论据。',
      timing: {
        totalSeconds: 240,
        perTurnSeconds: 120,
        warningTime: 20,
        overtimePenalty: 0,
      },
      turns: [
        { side: 'negative', action: 'conclude', status: 'pending', usedTime: 0 }, // 反方总结
        { side: 'positive', action: 'conclude', status: 'pending', usedTime: 0 }, // 正方总结
      ],
      rules: {
        freeMode: false,
        firstTurn: 'negative',
      },
      status: 'pending',
      currentTurnIndex: 0,
      remainingTime: 240,
    },
  ]
}
