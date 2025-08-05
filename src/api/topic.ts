import { request } from './request'
import type { GetTopicListParams, TopicResponse, Topic } from '@/types/topic'

// 获取话题列表
export const getTopicListApi = (params: GetTopicListParams) => {
  return request({
    url: '/topics',
    method: 'get',
    params,
  }) as Promise<TopicResponse>
}

export const getTopicApi = (id: string) => {
  return request({
    url: `/topic/${id}`,
    method: 'get',
    meta: {
      isShowMessage: false,
      errMessage: '获取话题信息',
    },
  }) as Promise<Topic>
}
