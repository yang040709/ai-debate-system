export interface Ranking {
  score: number
  user_id: string
  avatar?: string
  nickname: string
}
export type RankingList = Ranking[]

export type RankingResponse = {
  list: RankingList
}
