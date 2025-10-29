import type { Debate } from './debate'
interface DebateAnalysis {
  isWin: boolean /// 是否胜利
  comprehensiveScore: number // 综合分数
}

interface ResultItem {
  debateAnalysis: DebateAnalysis // 辩论分析
  highlights: string[] // 辩论亮点
  improvementPoints: string[] // 辩论改进点
  coachingComments: string[] // AI教练评论
}

export interface GetResultListParams {
  page: number
  limit: number
}

export interface Result extends Debate {
  result: ResultItem
}
/* 
interface DebateAnalysis {
  isWin: boolean /// 是否胜利
  comprehensiveScore: number // 综合分数
  result: string // 辩论结果
}


export interface Result {
  debate_id: string
  topic: Topic
  difficulty: Tag
  position: Tag
  duration: number
  state: number //1 未开始 2 进行中 3 已结束
  created_at: number
  result: ResultItem
}
*/

export interface ResultListResponse {
  list: Result[]
  total: number
}
