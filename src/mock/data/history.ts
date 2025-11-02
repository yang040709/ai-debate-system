import type { DebateHistoryItem, DebateHistory } from '@/types/history'

export const debateHistory: DebateHistoryItem[] = [
  {
    role: 'assistant',
    name: '裁判',
    avatar: '/referee.png',
    content: '本次辩论所有环节结束，感谢双方的精彩表现。',
    datetime: '2025-10-31 14:59:37',
  },
  {
    role: 'user',
    avatar: 'https://ui-avatars.com/api/?name=u&background=random',
    content:
      '综上所述，算法推荐若不受限制，将持续加剧社会撕裂与认知偏狭。我们呼吁建立透明、可问责的监管框架，保障公众的信息多样性与心理健康。谢谢！',
    name: '杨秀兰',
    datetime: '2025-10-31 14:59:37',
  },
  {
    role: 'assistant',
    avatar: '/referee.png',
    content: '请正方进行总结陈词，结合之前辩论内容展开，限时2分钟，禁止新论据。',
    name: '裁判',
    datetime: '2025-10-31 14:59:26',
  },
  {
    role: 'assistant',
    avatar: '/ai_avatar.png',
    content:
      '### 反方总结陈词：算法推荐不应被过度限制\n**尊敬的评委、对方辩友：**\n- 第一，算法推荐极大提升了信息匹配效率，让用户在海量内容中快速获取所需，这是技术进步的体现。\n- 第二，所谓“信息茧房”更多源于用户自身选择偏好，而非算法本身；限制算法反而剥夺用户自主权，阻碍创新。真正的解决之道是提升媒介素养，而非一刀切监管。',
    name: 'AI',
    datetime: '2025-10-31 14:59:19',
  },
  {
    role: 'assistant',
    avatar: '/referee.png',
    content:
      '自由辩论时间结束，接下来进入总结陈词环节，请反方首先发言，需融合反驳与立论，禁止提出新论据，限时2分钟。',
    name: '裁判',
    datetime: '2025-10-31 14:59:19',
  },
  {
    role: 'assistant',
    avatar: '/ai_avatar.png',
    content:
      '对方提到极端化，但忽略了一个事实：传统媒体同样存在议程设置和偏见。算法只是工具，关键在于如何使用。限制算法推荐，等于用行政手段干预市场与用户自由，得不偿失。',
    name: 'AI',
    datetime: '2025-10-31 14:58:29',
  },
  {
    role: 'user',
    avatar: 'https://ui-avatars.com/api/?name=u&background=random',
    content:
      '对方辩友说用户有选择权，但现实是算法通过成瘾机制不断推送极端内容，用户根本难以跳出。Meta内部文件已证实：算法会优先推送煽动性内容以提升停留时长！',
    name: '杨秀兰',
    datetime: '2025-10-31 14:58:29',
  },
  {
    role: 'assistant',
    avatar: '/ai_avatar.png',
    content:
      '正方夸大了算法的操控力。用户完全可以关闭推荐、切换平台或主动搜索多元信息。将社会问题归咎于技术，是典型的‘技术恐慌’。监管一旦介入，只会催生低效、僵化的信息分发体系。',
    name: 'AI',
    datetime: '2025-10-31 14:58:19',
  },
  {
    role: 'user',
    avatar: 'https://ui-avatars.com/api/?name=u&background=random',
    content:
      '请问反方：如果算法不加限制，如何解释欧美多国青少年抑郁率与社交媒体使用时长的高度相关？这难道不是算法推送极端、美化自残内容所致？',
    name: '杨秀兰',
    datetime: '2025-10-31 14:58:19',
  },
  {
    role: 'assistant',
    avatar: '/ai_avatar.png',
    content:
      '个性化推荐帮助小众群体找到归属，比如LGBTQ+青少年在现实中可能被孤立，但在算法推荐下能连接支持社区。一刀切限制，反而伤害弱势群体的信息获取权。',
    name: 'AI',
    datetime: '2025-10-31 14:58:10',
  },
  {
    role: 'assistant',
    avatar: '/referee.png',
    content: '现在请反方发言，自由辩论环节，双方交替进行发言，每个人的发言总时长为5分钟。',
    name: '裁判',
    datetime: '2025-10-31 14:58:10',
  },
  {
    role: 'user',
    avatar: 'https://ui-avatars.com/api/?name=u&background=random',
    content:
      '算法推荐制造‘回音室效应’，让不同立场群体彼此敌视。美国国会骚乱前，极端内容正是通过算法快速扩散。这难道不是亟需监管的信号？',
    name: '杨秀兰',
    datetime: '2025-10-31 14:58:10',
  },
  {
    role: 'assistant',
    avatar: '/referee.png',
    content: '自由辩论环节开始，正方先发言，双方交替进行，每个人的发言总时长为5分钟。',
    name: '裁判',
    datetime: '2025-10-31 14:57:56',
  },
  {
    role: 'assistant',
    avatar: '/ai_avatar.png',
    content:
      '正方提到信息茧房，但研究显示，多数用户仍会主动跨圈层浏览内容。算法只是辅助，不应为用户的选择惰性背锅。限制算法，等于否定技术进步的价值。',
    name: 'AI',
    datetime: '2025-10-31 14:57:49',
  },
  {
    role: 'user',
    avatar: 'https://ui-avatars.com/api/?name=u&background=random',
    content:
      '请问反方：当算法以‘最大化用户停留’为目标时，是否必然倾向于推送情绪化、极端化内容？这种设计逻辑本身是否就该被监管？',
    name: '杨秀兰',
    datetime: '2025-10-31 14:57:49',
  },
  {
    role: 'assistant',
    avatar: '/referee.png',
    content: '质询环节切换，现在由正方对反方进行提问，反方回答，剩余1分30秒。',
    name: '裁判',
    datetime: '2025-10-31 14:57:33',
  },
  {
    role: 'user',
    avatar: 'https://ui-avatars.com/api/?name=u&background=random',
    content:
      '我方坚持认为，算法推荐必须受到透明度与伦理审查的限制，否则将系统性损害公共 discourse 与民主根基。',
    name: '杨秀兰',
    datetime: '2025-10-31 14:57:33',
  },
  {
    role: 'assistant',
    avatar: '/ai_avatar.png',
    content:
      '算法推荐基于用户行为反馈，本质是服务用户需求。若强制干预推荐逻辑，反而会导致信息过载与低相关性，降低用户体验。监管应聚焦违法内容，而非推荐机制本身。',
    name: 'AI',
    datetime: '2025-10-31 14:57:10',
  },
  {
    role: 'assistant',
    avatar: '/referee.png',
    content:
      '质询对抗环节开始，首先由反方对正方进行提问，双方共计3分钟，当前反方提问、正方回答时间1分30秒。',
    name: '裁判',
    datetime: '2025-10-31 14:57:10',
  },
  {
    role: 'assistant',
    avatar: '/ai_avatar.png',
    content:
      '### 反方立论：算法推荐不应被限制\n**尊敬的评委、对方辩友：**\n- 第一，算法推荐显著提升信息获取效率，帮助用户在信息爆炸时代精准触达所需内容。\n- 第二，所谓‘信息茧房’被严重夸大；用户拥有关闭推荐、主动搜索、切换平台等多重选择权。限制算法等于用行政手段替代市场与用户判断，违背技术中立原则。',
    name: 'AI',
    datetime: '2025-10-31 14:57:03',
  },
  {
    role: 'assistant',
    avatar: '/referee.png',
    content: '请反方发表立论陈词，明确核心论点及论据，限时1分30秒。',
    name: '裁判',
    datetime: '2025-10-31 14:57:03',
  },
  {
    role: 'user',
    avatar: 'https://ui-avatars.com/api/?name=u&background=random',
    content:
      '我方认为，社交媒体算法推荐必须受到限制。算法为追求流量，不断推送极端、煽动性内容，导致信息茧房固化、社会极化加剧，甚至威胁民主制度。欧盟《数字服务法》已迈出监管第一步，我们应跟进！',
    name: '杨秀兰',
    datetime: '2025-10-31 14:57:03',
  },
  {
    role: 'assistant',
    avatar: '/referee.png',
    content: '请正方先发表立论陈词，围绕核心论点展开，限时1分30秒。',
    name: '裁判',
    datetime: '2025-10-31 14:56:16',
  },
]
export const historyList: DebateHistory[] = [
  {
    history_id: 'd001',
    created_at: 1754734092189,
    info: {
      debate_id: 'd001',
      state: 3,
      topic: {
        id: 't003',
        title: '全面推行四天工作制是否会影响经济发展？',
        desc: '部分国家试点四天工作制后生产力未降反升，但企业运营成本可能增加，引发对经济模式的讨论。',
        created_at: '1754460487758',
        participant_count: 250,
        creator: { name: '王五', avatar: 'https://avatars.githubusercontent.com/u/23456789?v=4' },
        type: [
          { id: '5', name: '经济' },
          { id: '10', name: '社会' },
        ],
        winningRate: 80,
      },
      difficulty: 'easy',
      position: 'negative',
      duration: 100,
      created_at: 1754734092189,
    },
    result: {
      info: {
        isWin: true,
        comprehensiveScore: 62.3,
      },
      highlights: [
        {
          title: '法律案例的及时引用',
          desc: '在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点',
        },
        {
          title: '比喻修辞的巧妙运用',
          desc: "将AI人格比喻为'会说话的锤子'获得系统额外加分，增强了论点说服力",
        },
      ],
      improvementPoints: [
        {
          title: '数据支撑不足',
          desc: "'青少年自律性不足'的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据",
        },
        {
          title: '语言重复冗余',
          desc: "'责任归属是核心问题'在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点",
        },
        {
          title: '忽视对方重要论据',
          desc: "未回应AI提出的'自动驾驶责任归属案例'，损失12%逻辑连贯性评分",
        },
      ],
      coachingComments: [
        {
          title: '情感共鸣与逻辑严谨的平衡',
          desc: "在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从'青少年自律不足'推导'AI人格危险'存在逻辑跳跃，建议加入阶梯论证",
        },
        {
          title: '论证策略优化',
          desc: '当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力',
        },
      ],
    },
    list: [],
  },
  {
    history_id: 'd002',
    created_at: 1754734092189,
    info: {
      debate_id: 'd002',
      state: 3,
      topic: {
        id: 't004',
        title: '线上教育是否会取代传统课堂教学？',
        desc: '疫情期间线上教育快速普及，但互动性和实践教学存在局限，引发教育模式变革讨论。',
        created_at: '1754546887758',
        participant_count: 320,
        creator: { name: '赵六', avatar: 'https://avatars.githubusercontent.com/u/34567890?v=4' },
        type: [
          { id: '8', name: '教育' },
          { id: '10', name: '社会' },
        ],
        winningRate: 65,
      },
      difficulty: 'medium',
      position: 'positive',
      duration: 100,
      created_at: 1754734092189,
    },
    result: {
      info: {
        isWin: true,
        comprehensiveScore: 71.5,
      },
      highlights: [
        {
          title: '数据引用精准',
          desc: '引用中国教育部 2024 年线上教育普及率数据（同比增长 37%），强化论证可信度',
        },
        {
          title: '反方论点预判',
          desc: "提前预判对方 ' 实践教学短板 ' 论点，准备虚拟实验室案例进行反驳",
        },
        {
          title: '结构清晰',
          desc: "采用 ' 现状 - 趋势 - 案例 ' 三段式结构，逻辑递进明确",
        },
      ],
      improvementPoints: [
        {
          title: '案例时效性不足',
          desc: '引用的 2021 年线上教育案例已过时，建议补充近一年行业报告数据',
        },
        {
          title: '术语使用不当',
          desc: "将 'MOOC' 错误解释为 ' 实时互动课程 '，需加强教育技术术语储备",
        },
        {
          title: '时间分配失衡',
          desc: '前两轮占用 60% 时间，导致最后总结仓促',
        },
      ],
      coachingComments: [
        {
          title: '逻辑断层',
          desc: '从去中心化优势直接跳跃到需监管，缺乏中间论证环节',
        },
        {
          title: '逻辑断层',
          desc: '从去中心化优势直接跳跃到无需监管，缺乏中间论证环节',
        },
      ],
    },
    list: [],
  },
  {
    history_id: 'd003',
    created_at: 1754734092189,
    info: {
      debate_id: 'd003',
      state: 3,
      topic: {
        id: 't005',
        title: '加密货币应被纳入正规金融监管体系吗？',
        desc: '加密货币市场波动剧烈，洗钱风险突出，但去中心化特性吸引大量投资者，监管争议持续。',
        created_at: '1754633287758',
        participant_count: 410,
        creator: { name: '孙七', avatar: 'https://avatars.githubusercontent.com/u/45678901?v=4' },
        type: [
          { id: '5', name: '经济' },
          { id: '7', name: '法律' },
        ],
        winningRate: 52,
      },
      difficulty: 'hard',
      position: 'negative',
      duration: 100,
      created_at: 1754734092189,
    },
    result: {
      info: {
        isWin: false,
        comprehensiveScore: 48.2,
      },
      highlights: [
        {
          title: '法律案例的及时引用',
          desc: '在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点',
        },
        {
          title: '比喻修辞的巧妙运用',
          desc: "将AI人格比喻为'会说话的锤子'获得系统额外加分，增强了论点说服力",
        },
      ],
      improvementPoints: [
        {
          title: '数据支撑不足',
          desc: "'青少年自律性不足'的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据",
        },
        {
          title: '语言重复冗余',
          desc: "'责任归属是核心问题'在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点",
        },
        {
          title: '忽视对方重要论据',
          desc: "未回应AI提出的'自动驾驶责任归属案例'，损失12%逻辑连贯性评分",
        },
      ],
      coachingComments: [
        {
          title: '情感共鸣与逻辑严谨的平衡',
          desc: "在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从'青少年自律不足'推导'AI人格危险'存在逻辑跳跃，建议加入阶梯论证",
        },
        {
          title: '论证策略优化',
          desc: '当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力',
        },
      ],
    },
    list: [],
  },
  {
    history_id: 'd004',
    created_at: 1754734092189,
    info: {
      debate_id: 'd004',
      state: 3,
      topic: {
        id: 't006',
        title: '基因编辑技术应用于人类胚胎是否应该被禁止？',
        desc: 'CRISPR 技术实现基因精准编辑，可能根治遗传性疾病，但伦理风险和技术滥用隐患引发全球争议。',
        created_at: '1754719687758',
        participant_count: 380,
        creator: { name: '周八', avatar: 'https://avatars.githubusercontent.com/u/56789012?v=4' },
        type: [
          { id: '3', name: '科技' },
          { id: '9', name: '伦理' },
        ],
        winningRate: 68,
      },
      difficulty: 'hard',
      position: 'positive',
      duration: 100,
      created_at: 1754734092189,
    },
    result: {
      info: {
        isWin: true,
        comprehensiveScore: 76.8,
      },
      highlights: [
        {
          title: '法律案例的及时引用',
          desc: '在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点',
        },
        {
          title: '比喻修辞的巧妙运用',
          desc: "将AI人格比喻为'会说话的锤子'获得系统额外加分，增强了论点说服力",
        },
      ],
      improvementPoints: [
        {
          title: '数据支撑不足',
          desc: "'青少年自律性不足'的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据",
        },
        {
          title: '语言重复冗余',
          desc: "'责任归属是核心问题'在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点",
        },
        {
          title: '忽视对方重要论据',
          desc: "未回应AI提出的'自动驾驶责任归属案例'，损失12%逻辑连贯性评分",
        },
      ],
      coachingComments: [
        {
          title: '情感共鸣与逻辑严谨的平衡',
          desc: "在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从'青少年自律不足'推导'AI人格危险'存在逻辑跳跃，建议加入阶梯论证",
        },
        {
          title: '论证策略优化',
          desc: '当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力',
        },
      ],
    },
    list: [],
  },
  {
    history_id: 'd005',
    created_at: 1754734092189,
    info: {
      debate_id: 'd005',
      state: 3,
      topic: {
        id: 't007',
        title: '社交媒体算法推荐是否应当受到限制？',
        desc: '算法推荐提升信息获取效率，但可能导致信息茧房和极端化情绪，监管需求日益凸显。',
        created_at: '1754806087758',
        participant_count: 520,
        creator: { name: '吴九', avatar: 'https://avatars.githubusercontent.com/u/67890123?v=4' },
        type: [
          { id: '3', name: '科技' },
          { id: '10', name: '社会' },
        ],
        winningRate: 73,
      },
      difficulty: 'medium',
      position: 'positive',
      duration: 100,
      created_at: 1754734092189,
    },
    result: {
      info: {
        isWin: true,
        comprehensiveScore: 79.4,
      },
      highlights: [
        {
          title: '法律案例的及时引用',
          desc: '在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点',
        },
        {
          title: '比喻修辞的巧妙运用',
          desc: "将AI人格比喻为'会说话的锤子'获得系统额外加分，增强了论点说服力",
        },
      ],
      improvementPoints: [
        {
          title: '数据支撑不足',
          desc: "'青少年自律性不足'的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据",
        },
        {
          title: '语言重复冗余',
          desc: "'责任归属是核心问题'在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点",
        },
        {
          title: '忽视对方重要论据',
          desc: "未回应AI提出的'自动驾驶责任归属案例'，损失12%逻辑连贯性评分",
        },
      ],
      coachingComments: [
        {
          title: '情感共鸣与逻辑严谨的平衡',
          desc: "在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从'青少年自律不足'推导'AI人格危险'存在逻辑跳跃，建议加入阶梯论证",
        },
        {
          title: '论证策略优化',
          desc: '当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力',
        },
      ],
    },
    list: [],
  },
  {
    history_id: 'd006',
    created_at: 1754734092189,
    info: {
      debate_id: 'd006',
      state: 3,
      topic: {
        id: 't008',
        title: '核能发电应成为未来能源转型的核心选择吗？',
        desc: '核能低碳特性符合碳中和目标，但核废料处理和安全风险始终存在争议。',
        created_at: '1754892487758',
        participant_count: 350,
        creator: { name: '郑十', avatar: 'https://avatars.githubusercontent.com/u/78901234?v=4' },
        type: [
          { id: '2', name: '环境' },
          { id: '5', name: '经济' },
        ],
        winningRate: 49,
      },
      difficulty: 'medium',
      position: 'negative',
      duration: 100,
      created_at: 1754734092189,
    },
    result: {
      info: {
        isWin: false,
        comprehensiveScore: 47.6,
      },
      highlights: [
        {
          title: '法律案例的及时引用',
          desc: '在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点',
        },
        {
          title: '比喻修辞的巧妙运用',
          desc: "将AI人格比喻为'会说话的锤子'获得系统额外加分，增强了论点说服力",
        },
      ],
      improvementPoints: [
        {
          title: '数据支撑不足',
          desc: "'青少年自律性不足'的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据",
        },
        {
          title: '语言重复冗余',
          desc: "'责任归属是核心问题'在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点",
        },
        {
          title: '忽视对方重要论据',
          desc: "未回应AI提出的'自动驾驶责任归属案例'，损失12%逻辑连贯性评分",
        },
      ],
      coachingComments: [
        {
          title: '情感共鸣与逻辑严谨的平衡',
          desc: "在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从'青少年自律不足'推导'AI人格危险'存在逻辑跳跃，建议加入阶梯论证",
        },
        {
          title: '论证策略优化',
          desc: '当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力',
        },
      ],
    },
    list: [],
  },
  {
    history_id: 'd007',
    created_at: 1754734092189,
    info: {
      debate_id: 'd007',
      state: 3,
      topic: {
        id: 't009',
        title: '大学专业设置应更注重市场需求还是学术传承？',
        desc: '就业市场变化加速，高校专业调整滞后问题凸显，引发教育定位的根本争议。',
        created_at: '1754978887758',
        participant_count: 480,
        creator: { name: '钱十一', avatar: 'https://avatars.githubusercontent.com/u/89012345?v=4' },
        type: [
          { id: '8', name: '教育' },
          { id: '5', name: '经济' },
        ],
        winningRate: 63,
      },
      difficulty: 'medium',
      position: 'positive',
      duration: 100,
      created_at: 1754734092189,
    },
    result: {
      info: {
        isWin: true,
        comprehensiveScore: 68.9,
      },
      highlights: [
        {
          title: '法律案例的及时引用',
          desc: '在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点',
        },
        {
          title: '比喻修辞的巧妙运用',
          desc: "将AI人格比喻为'会说话的锤子'获得系统额外加分，增强了论点说服力",
        },
      ],
      improvementPoints: [
        {
          title: '数据支撑不足',
          desc: "'青少年自律性不足'的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据",
        },
        {
          title: '语言重复冗余',
          desc: "'责任归属是核心问题'在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点",
        },
        {
          title: '忽视对方重要论据',
          desc: "未回应AI提出的'自动驾驶责任归属案例'，损失12%逻辑连贯性评分",
        },
      ],
      coachingComments: [
        {
          title: '情感共鸣与逻辑严谨的平衡',
          desc: "在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从'青少年自律不足'推导'AI人格危险'存在逻辑跳跃，建议加入阶梯论证",
        },
        {
          title: '论证策略优化',
          desc: '当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力',
        },
      ],
    },
    list: [],
  },
  {
    history_id: 'd009',
    created_at: 1754734092189,
    info: {
      debate_id: 'd009',
      state: 3,
      topic: {
        id: 't011',
        title: '人工智能创作物应享有著作权保护吗？',
        desc: 'AI 生成内容质量日益提升，版权归属争议加剧，传统著作权体系面临挑战。',
        created_at: '1755151687758',
        participant_count: 420,
        creator: { name: '李十三', avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4' },
        type: [
          { id: '3', name: '科技' },
          { id: '7', name: '法律' },
        ],
        winningRate: 61,
      },
      difficulty: 'hard',
      position: 'negative',
      duration: 100,
      created_at: 1754734092189,
    },
    result: {
      info: {
        isWin: true,
        comprehensiveScore: 67.5,
      },
      highlights: [
        {
          title: '法律案例的及时引用',
          desc: '在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点',
        },
        {
          title: '比喻修辞的巧妙运用',
          desc: "将AI人格比喻为'会说话的锤子'获得系统额外加分，增强了论点说服力",
        },
      ],
      improvementPoints: [
        {
          title: '数据支撑不足',
          desc: "'青少年自律性不足'的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据",
        },
        {
          title: '语言重复冗余',
          desc: "'责任归属是核心问题'在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点",
        },
        {
          title: '忽视对方重要论据',
          desc: "未回应AI提出的'自动驾驶责任归属案例'，损失12%逻辑连贯性评分",
        },
      ],
      coachingComments: [
        {
          title: '情感共鸣与逻辑严谨的平衡',
          desc: "在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从'青少年自律不足'推导'AI人格危险'存在逻辑跳跃，建议加入阶梯论证",
        },
        {
          title: '论证策略优化',
          desc: '当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力',
        },
      ],
    },
    list: [],
  },
  {
    history_id: 'd010',
    created_at: 1754734092189,
    info: {
      debate_id: 'd010',
      state: 3,
      topic: {
        id: 't012',
        title: '城市化进程中应优先保护历史建筑还是发展城市空间？',
        desc: '城市扩张与历史遗产保护的矛盾日益突出，如何平衡成为城市治理的关键议题。',
        created_at: '1755238087758',
        participant_count: 310,
        creator: { name: '张十四', avatar: 'https://avatars.githubusercontent.com/u/23456780?v=4' },
        type: [
          { id: '10', name: '社会' },
          { id: '6', name: '文化' },
        ],
        winningRate: 72,
      },
      difficulty: 'medium',
      position: 'positive',
      duration: 100,
      created_at: 1754734092189,
    },
    result: {
      info: {
        isWin: true,
        comprehensiveScore: 74.2,
      },
      highlights: [
        {
          title: '法律案例的及时引用',
          desc: '在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点',
        },
        {
          title: '比喻修辞的巧妙运用',
          desc: "将AI人格比喻为'会说话的锤子'获得系统额外加分，增强了论点说服力",
        },
      ],
      improvementPoints: [
        {
          title: '数据支撑不足',
          desc: "'青少年自律性不足'的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据",
        },
        {
          title: '语言重复冗余',
          desc: "'责任归属是核心问题'在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点",
        },
        {
          title: '忽视对方重要论据',
          desc: "未回应AI提出的'自动驾驶责任归属案例'，损失12%逻辑连贯性评分",
        },
      ],
      coachingComments: [
        {
          title: '情感共鸣与逻辑严谨的平衡',
          desc: "在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从'青少年自律不足'推导'AI人格危险'存在逻辑跳跃，建议加入阶梯论证",
        },
        {
          title: '论证策略优化',
          desc: '当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力',
        },
      ],
    },
    list: [],
  },
  {
    history_id: 'd011',
    created_at: 1754734092189,
    info: {
      debate_id: 'd011',
      state: 3,
      topic: {
        id: 't013',
        title: '是否应该对含糖饮料征收高额消费税？',
        desc: '全球肥胖率持续上升，含糖饮料被视为重要诱因，但税收政策的公平性和有效性存疑。',
        created_at: '1755324487758',
        participant_count: 390,
        creator: { name: '刘十五', avatar: 'https://avatars.githubusercontent.com/u/34567801?v=4' },
        type: [
          { id: '5', name: '经济' },
          { id: '4', name: '健康' },
        ],
        winningRate: 66,
      },
      difficulty: 'medium',
      position: 'positive',
      duration: 100,
      created_at: 1754734092189,
    },
    result: {
      info: {
        isWin: true,
        comprehensiveScore: 70.8,
      },
      highlights: [
        {
          title: '法律案例的及时引用',
          desc: '在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点',
        },
        {
          title: '比喻修辞的巧妙运用',
          desc: "将AI人格比喻为'会说话的锤子'获得系统额外加分，增强了论点说服力",
        },
      ],
      improvementPoints: [
        {
          title: '数据支撑不足',
          desc: "'青少年自律性不足'的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据",
        },
        {
          title: '语言重复冗余',
          desc: "'责任归属是核心问题'在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点",
        },
        {
          title: '忽视对方重要论据',
          desc: "未回应AI提出的'自动驾驶责任归属案例'，损失12%逻辑连贯性评分",
        },
      ],
      coachingComments: [
        {
          title: '情感共鸣与逻辑严谨的平衡',
          desc: "在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从'青少年自律不足'推导'AI人格危险'存在逻辑跳跃，建议加入阶梯论证",
        },
        {
          title: '论证策略优化',
          desc: '当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力',
        },
      ],
    },
    list: [],
  },
  {
    history_id: 'd012',
    created_at: 1754734092189,
    info: {
      debate_id: 'd012',
      state: 3,
      topic: {
        id: 't014',
        title: '远程办公应成为永久性工作模式吗？',
        desc: '疫情期间远程办公大规模普及，生产力变化引发争议，工作模式变革讨论持续。',
        created_at: '1755410887758',
        participant_count: 530,
        creator: { name: '陈十六', avatar: 'https://avatars.githubusercontent.com/u/45678012?v=4' },
        type: [
          { id: '5', name: '经济' },
          { id: '10', name: '社会' },
        ],
        winningRate: 78,
      },
      difficulty: 'easy',
      position: 'positive',
      duration: 100,
      created_at: 1754734092189,
    },
    result: {
      info: {
        isWin: true,
        comprehensiveScore: 82.6,
      },
      highlights: [
        {
          title: '法律案例的及时引用',
          desc: '在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点',
        },
        {
          title: '比喻修辞的巧妙运用',
          desc: "将AI人格比喻为'会说话的锤子'获得系统额外加分，增强了论点说服力",
        },
      ],
      improvementPoints: [
        {
          title: '数据支撑不足',
          desc: "'青少年自律性不足'的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据",
        },
        {
          title: '语言重复冗余',
          desc: "'责任归属是核心问题'在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点",
        },
        {
          title: '忽视对方重要论据',
          desc: "未回应AI提出的'自动驾驶责任归属案例'，损失12%逻辑连贯性评分",
        },
      ],
      coachingComments: [
        {
          title: '情感共鸣与逻辑严谨的平衡',
          desc: "在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从'青少年自律不足'推导'AI人格危险'存在逻辑跳跃，建议加入阶梯论证",
        },
        {
          title: '论证策略优化',
          desc: '当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力',
        },
      ],
    },
    list: [],
  },
  {
    history_id: 'd013',
    created_at: 1754734092189,
    info: {
      debate_id: 'd013',
      state: 3,
      topic: {
        id: 't015',
        title: '是否应该全面禁止野生动物贸易？',
        desc: '新冠疫情后野生动物保护呼声高涨，但部分地区依赖传统贸易生存，禁令争议加剧。',
        created_at: '1755497287758',
        participant_count: 470,
        creator: { name: '杨十七', avatar: 'https://avatars.githubusercontent.com/u/56780123?v=4' },
        type: [
          { id: '2', name: '环境' },
          { id: '10', name: '社会' },
        ],
        winningRate: 83,
      },
      difficulty: 'medium',
      position: 'positive',
      duration: 100,
      created_at: 1754734092189,
    },
    result: {
      info: {
        isWin: true,
        comprehensiveScore: 79.3,
      },
      highlights: [
        {
          title: '法律案例的及时引用',
          desc: '在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点',
        },
        {
          title: '比喻修辞的巧妙运用',
          desc: "将AI人格比喻为'会说话的锤子'获得系统额外加分，增强了论点说服力",
        },
      ],
      improvementPoints: [
        {
          title: '数据支撑不足',
          desc: "'青少年自律性不足'的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据",
        },
        {
          title: '语言重复冗余',
          desc: "'责任归属是核心问题'在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点",
        },
        {
          title: '忽视对方重要论据',
          desc: "未回应AI提出的'自动驾驶责任归属案例'，损失12%逻辑连贯性评分",
        },
      ],
      coachingComments: [
        {
          title: '情感共鸣与逻辑严谨的平衡',
          desc: "在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从'青少年自律不足'推导'AI人格危险'存在逻辑跳跃，建议加入阶梯论证",
        },
        {
          title: '论证策略优化',
          desc: '当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力',
        },
      ],
    },
    list: [],
  },
  {
    history_id: 'd014',
    created_at: 1754734092189,
    info: {
      debate_id: 'd014',
      state: 3,
      topic: {
        id: 't016',
        title: '中小学应全面取消家庭作业吗？',
        desc: '学生学业负担过重引发关注，取消家庭作业的呼声高涨，但学习效果保障成争议焦点。',
        created_at: '1755583687758',
        participant_count: 620,
        creator: { name: '黄十八', avatar: 'https://avatars.githubusercontent.com/u/67801234?v=4' },
        type: [
          { id: '8', name: '教育' },
          { id: '10', name: '社会' },
        ],
        winningRate: 58,
      },
      difficulty: 'easy',
      position: 'negative',
      duration: 100,
      created_at: 1754734092189,
    },
    result: {
      info: {
        isWin: true,
        comprehensiveScore: 64.7,
      },
      highlights: [
        {
          title: '法律案例的及时引用',
          desc: '在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点',
        },
        {
          title: '比喻修辞的巧妙运用',
          desc: "将AI人格比喻为'会说话的锤子'获得系统额外加分，增强了论点说服力",
        },
      ],
      improvementPoints: [
        {
          title: '数据支撑不足',
          desc: "'青少年自律性不足'的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据",
        },
        {
          title: '语言重复冗余',
          desc: "'责任归属是核心问题'在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点",
        },
        {
          title: '忽视对方重要论据',
          desc: "未回应AI提出的'自动驾驶责任归属案例'，损失12%逻辑连贯性评分",
        },
      ],
      coachingComments: [
        {
          title: '情感共鸣与逻辑严谨的平衡',
          desc: "在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从'青少年自律不足'推导'AI人格危险'存在逻辑跳跃，建议加入阶梯论证",
        },
        {
          title: '论证策略优化',
          desc: '当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力',
        },
      ],
    },
    list: [],
  },
  {
    history_id: 'd015',
    created_at: 1754734092189,
    info: {
      debate_id: 'd015',
      state: 3,
      topic: {
        id: 't017',
        title: '是否应该限制大型科技公司的数据收集行为？',
        desc: '数据成为核心生产要素，但大型科技公司的数据垄断和滥用风险引发监管需求。',
        created_at: '1755670087758',
        participant_count: 580,
        creator: { name: '周十九', avatar: 'https://avatars.githubusercontent.com/u/78012345?v=4' },
        type: [
          { id: '3', name: '科技' },
          { id: '7', name: '法律' },
        ],
        winningRate: 75,
      },
      difficulty: 'hard',
      position: 'positive',
      duration: 100,
      created_at: 1754734092189,
    },
    result: {
      info: {
        isWin: false,
        comprehensiveScore: 54.9,
      },
      highlights: [
        {
          title: '法律案例的及时引用',
          desc: '在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点',
        },
        {
          title: '比喻修辞的巧妙运用',
          desc: "将AI人格比喻为'会说话的锤子'获得系统额外加分，增强了论点说服力",
        },
      ],
      improvementPoints: [
        {
          title: '数据支撑不足',
          desc: "'青少年自律性不足'的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据",
        },
        {
          title: '语言重复冗余',
          desc: "'责任归属是核心问题'在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点",
        },
        {
          title: '忽视对方重要论据',
          desc: "未回应AI提出的'自动驾驶责任归属案例'，损失12%逻辑连贯性评分",
        },
      ],
      coachingComments: [
        {
          title: '情感共鸣与逻辑严谨的平衡',
          desc: "在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从'青少年自律不足'推导'AI人格危险'存在逻辑跳跃，建议加入阶梯论证",
        },
        {
          title: '论证策略优化',
          desc: '当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力',
        },
      ],
    },
    list: [],
  },
]
