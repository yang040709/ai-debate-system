import { request } from './request'
import type { GetTopicListParams, TopicResponse } from '@/types/topic'

// 获取话题列表
export const getTopicListApi = (params: GetTopicListParams) => {
  return request({
    url: '/topics',
    method: 'get',
    params,
  }) as Promise<TopicResponse>
}
