import type { Tag } from './tag'
import type { Topic } from './topic'
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
  topic_id: string
  difficulty_id: string
  position_id: string
}

export interface CreateDebateResponse {
  conversion_id: string
  ctime: number
}
