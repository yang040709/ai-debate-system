import mockjs from 'mockjs'

import { requestFun } from '../utils'
import type { TagResponse } from '@/types/tag'

const tagObj: TagResponse = {
  tag: [
    { id: '1', name: '伦理' },
    { id: '2', name: '科技' },
    { id: '3', name: '未来' },
    { id: '4', name: '环境' },
    { id: '5', name: '经济' },
    { id: '6', name: '商业' },
    { id: '7', name: '教育' },
    { id: '8', name: '文化' },
    { id: '9', name: '艺术' },
    { id: '10', name: '社会' },
  ],

  difficulty: [
    { id: '1', name: '简单' },
    { id: '2', name: '中等' },
    { id: '3', name: '困难' },
    { id: '4', name: '专家' },
    { id: '5', name: '大师' },
  ],
}

mockjs.mock('/api/tags', 'get', requestFun(tagObj))
