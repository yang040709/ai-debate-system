import { defineStore } from 'pinia'
import { useFetchData } from '@/composables/useFetchData'
import { getTagListApi } from '@/api/tag'

export const useTagsStore = defineStore('tag', () => {
  const {
    data: tagListData,
    loading: tagListLoading,
    fetchData: fetchTagData,
  } = useFetchData(getTagListApi, [], { tag: [], difficulty: [] })
  fetchTagData()

  return {
    tagListData,
    tagListLoading,
    fetchTagData,
  }
})
