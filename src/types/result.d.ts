import type { Tag } from './tag'
import type { Topic } from './topic'

interface DebateAnalysis {
  isWin: boolean
  comprehensiveScore: number
  result: string
}

interface ResultItem {
  debateAnalysis: DebateAnalysis
  highlights: string[]
  improvementPoints: string[]
  coachingComments: string[]
}

export interface GetResultListParams {
  page: number
  limit: number
}

export interface Result {
  id: string
  topic: Topic
  difficulty: Tag
  position: Tag
  duration: number
  created_at: number
  result: ResultItem
}

export interface ResultListResponse {
  list: Result[]
  total: number
}
