import { request } from './request'
import type { Topic } from '@/types/topic'

// 获取话题列表
export const getTopicListApi = () => {
  return request({
    url: '/topics',
    method: 'get',
  }) as Promise<Topic[]>
}
