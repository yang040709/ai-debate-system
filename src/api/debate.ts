import { request } from './request'
import type { Debate, CreateDebateRequest, CreateDebateResponse } from '@/types/debate'

export const createDebate = (data: CreateDebateRequest) => {
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
