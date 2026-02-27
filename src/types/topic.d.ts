import type { Tag } from './tag'

export interface Topic {
  id: string
  desc: string
  title: string
  created_at: string
  participant_count: number
  creator: { name: string; avatar: string }
  type: Tag[]
  winningRate?: number
}

export interface GetTopicListParams {
  page: number
  limit: number
  type: string
}

export interface TopicResponse {
  list: Topic[]
  total: number
}

export interface CreateTopicRequest {
  id: string
}
