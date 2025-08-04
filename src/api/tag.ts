import { request } from './request'
import type { TagResponse } from '@/types/tag'
// 获取标签列表
export const getTagListApi = () => {
  return request({
    url: '/tags',
    method: 'get',
  }) as Promise<TagResponse>
}
