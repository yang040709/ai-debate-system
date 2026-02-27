import { request } from './request'
import type { RankingResponse } from '@/types/ranking'

// 获取排行榜
export const getRankingListApi = (rankingNumber = 10) => {
  return request({
    url: `/reward/score/topN/${rankingNumber}`,
    method: 'get',
  }) as Promise<RankingResponse>
}
