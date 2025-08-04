import { request } from './request'
import type { Ranking } from '@/types/ranking'

// 获取排行榜
export const getRankingListApi = () => {
  return request({
    url: '/rankings',
    method: 'get',
  }) as Promise<Ranking[]>
}
