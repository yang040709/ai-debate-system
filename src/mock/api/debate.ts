import type { CreateDebateRequest, CreateDebateResponse, Debate } from '@/types/debate'
import { requestFun } from '../utils'
import mockjs from 'mockjs'

const fn = () => {
  return mockjs.mock({
    conversion_id: '@guid',
    ctime: Date.now(),
  })
}

mockjs.mock('/api/chat/coze/conversation', 'post', requestFun(fn))

mockjs.mock(/\/api\/chat\/coze\/conversation\/.+/, 'get', (options) => {
  const id = options.url.split('/')[5]
  console.log(id)
  const data: Debate = {
    id,
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
      comment_count: 320,
    },
    difficulty: {
      id: '1',
      name: '简单',
    },
    position: {
      id: '1',
      name: 'positive',
    },
    content: '',
    duration: 0,
    state: 1, //1 未开始 2 进行中 3 已结束
  }
  return {
    code: 0,
    msg: 'success',
    data,
  }
})
