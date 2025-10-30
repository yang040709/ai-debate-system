import type { Tag } from './tag'
import type { Topic } from './topic'

export type difficulty = '简单' | '中等' | '困难' | '专家' | '大师'

export interface Debate {
  debate_id: string
  topic: Topic
  difficulty: Tag
  position: Tag
  duration: number
  state: number //1 未开始 2 进行中 3 已结束
  created_at: number
}

export interface CreateDebateRequest {
  topic: {
    title: string
    desc: string
  }
  difficulty: difficulty
  position: 'positive' | 'negative'
}

export interface CreateDebateRequestParams {
  theme: string
}

export interface CreateDebateResponse {
  conversion_id: string
  ctime: number
}
