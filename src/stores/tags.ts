import { defineStore } from 'pinia'
import { useFetchData } from '@/composables/useFetchData'
import { getTagListApi } from '@/api/tag'

export const useTagsStore = defineStore('tag', () => {
  const {
    data: tagListData,
    loading: tagListLoading,
    fetchData: fetchTagData,
  } = useFetchData(getTagListApi, '获取标签失败', { type: [], difficulty: [] }, [])
  fetchTagData()
  return {
    tagListData,
    tagListLoading,
    fetchTagData,
  }
})
