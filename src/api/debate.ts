import { request } from './request'
import type { Debate, CreateDebateRequestParams, CreateDebateResponse } from '@/types/debate'

export const createDebate = (data: CreateDebateRequestParams) => {
  return request({
    url: '/chat/coze/conversation',
    method: 'POST',
    data,
  }) as Promise<CreateDebateResponse>
}

export const getDebateInfo = (id: string) => {
  return request({
    url: `/chat/coze/conversation/${id}`,
    method: 'get',
  }) as Promise<Debate>
}
