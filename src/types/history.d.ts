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

/* 
下面这是辩论分析结果的接口
*/
// interface DebateResultInfo {
//   isWin: boolean /// 是否胜利
//   comprehensiveScore: number // 综合分数
// }

// interface ResultItem {
//   info: DebateResultInfo
//   highlights: string[] // 辩论亮点
//   improvementPoints: string[] // 辩论改进点
//   coachingComments: string[] // AI教练评论
// }

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
  list: DebateHistoryItem[]
}

// /*
// 下面是获取历史记录的列表
// */
// export interface DebateHistoryListItem {
//   history_id: string
//   info: Debate
//   resultInfo:DebateResultInfo,
// }

export interface DebateHistoryList {
  total: number
  list: DebateHistory[]
}

export interface GetDebateHistoryListParams {
  page: number
  limit: number
}
