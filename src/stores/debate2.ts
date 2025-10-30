import { defineStore } from 'pinia'
import { CreateDebateRequest } from '@/types/debate'
import { ref } from 'vue'
export const useDebateStore = defineStore('debate', () => {
  /* 这个是开发环境试用，生成环境记得移除 */
  const conversion_id = ref('9vunqaj8f2q-hxn30ar1zxq')
  const debateData = ref<CreateDebateRequest>({
    topic: {
      title: '辩论标题',
      desc: '辩论描述',
    },
    difficulty: '中等',
    position: 'positive',
  })
  const setDebateData = (data: CreateDebateRequest) => {
    debateData.value = data
  }
  const setConversionId = (id: string) => {
    conversion_id.value = id
  }
  return {
    conversion_id,
    debateData,
    setDebateData,
    setConversionId,
  }
})
