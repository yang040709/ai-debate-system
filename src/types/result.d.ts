import type { Debate } from './debate'
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

export interface Result extends Debate {
  result: ResultItem
}

export interface ResultListResponse {
  list: Result[]
  total: number
}
