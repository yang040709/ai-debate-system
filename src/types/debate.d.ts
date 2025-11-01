import type { Tag } from './tag'
import type { Topic } from './topic'

// export type difficulty = '简单' | '中等' | '困难' | '专家' | '大师'
// export type difficulty = '简单' | '中等' | '困难' | '专家' | '大师'
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'master'
export type Position = 'positive' | 'negative'

// export type

export interface Debate {
  debate_id: string
  topic: Topic
  difficulty: Difficulty
  position: Position
  duration: number
  state: number //1 未开始 2 进行中 3 已结束
  created_at: number
}

export interface CreateDebateRequest {
  topic: {
    title: string
    desc: string
  }
  difficulty: Difficulty
  position: Position
}

export interface CreateDebateRequestParams {
  theme: string
}

export interface CreateDebateResponse {
  conversion_id: string
  ctime: number
}

export interface DebateItem {
  avatar: string
  name: string
  datetime: string
  content: string
  role: 'assistant' | 'user'
}

export type DebateList = DebateItem[]
