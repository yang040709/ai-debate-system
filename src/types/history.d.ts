import type { Debate, DebateItem } from './debate'
/* 


*/
export interface PostDebateHistoryResponse {
  history_id: string
}

export type DebateHistoryItem = DebateItem

export interface GetDebateHistoryRequest {
  history_id: string
}

interface Point {
  title: string // 标题
  desc: string // 描述
}

interface DebateResultInfo {
  isWin: boolean /// 是否胜利
  comprehensiveScore: number // 综合分数
}

interface ResultItem {
  info: DebateResultInfo
  highlights: Point[] // 辩论亮点
  improvementPoints: Point[] // 辩论改进点
  coachingComments: Point[] // AI教练评论
}

/* 
这是历史记录的接口
*/

export interface DebateHistory {
  history_id: string
  created_at: number
  info: Debate
  result: ResultItem
  list: DebateItem[]
}

export interface DebateHistoryList {
  total: number
  list: DebateHistory[]
}

export interface GetDebateHistoryListParams {
  page: number
  limit: number
}
