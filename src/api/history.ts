import { request } from './request'
import type {
  PostDebateHistoryResponse,
  DebateHistory,
  DebateHistoryItem,
  GetDebateHistoryRequest,
  GetDebateHistoryListParams,
  DebateHistoryList,
} from '@/types/history'

export const postDebateHistory = (data: DebateHistoryItem[]) => {
  return request({
    url: '/debate/history',
    method: 'POST',
    data,
  }) as Promise<PostDebateHistoryResponse>
}

export const getDebateHistory = (history_id: string) => {
  return request({
    url: `/debate/history/${history_id}`,
    method: 'GET',
  }) as Promise<DebateHistory>
}

/* 
获取历史列表
*/
export const getDebateHistoryList = (params: GetDebateHistoryListParams) => {
  return request({
    url: '/debate/historyList',
    method: 'GET',
    params,
  }) as Promise<DebateHistoryList>
}
