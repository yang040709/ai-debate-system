import type { Tag } from './tag'

export interface Topic {
  id: string
  desc?: string
  title: string
  created_at: string
  participant_count: number
  status: string // 0 未开始 1 进行中 2 已结束
  creator: { name: string; avatar: string }
  type: Tag[]
  difficulty: Tag
  winningRate?: number
  support_count?: number
  comment_count?: number
}

export interface GetTopicListParams {
  page: number
  limit: number
  type: string
  difficulty: string
}

export interface TopicResponse {
  list: Topic[]
  total: number
}
