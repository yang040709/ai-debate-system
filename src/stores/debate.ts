import { defineStore } from 'pinia'
import { CreateDebateRequest } from '@/types/debate'
import { computed, ref } from 'vue'
export const useDebateStore = defineStore('debate', () => {
  /* 这个是开发环境试用，生成环境记得移除 */
  const conversion_id = ref('')
  const debateData = ref<CreateDebateRequest>({
    topic: {
      title: '',
      desc: '',
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
  const resetAll = () => {
    conversion_id.value = ''
    debateData.value = {
      topic: {
        title: '',
        desc: '',
      },
      difficulty: '中等',
      position: 'positive',
    }
  }
  const hasId = computed(() => conversion_id.value !== '')
  return {
    conversion_id,
    debateData,
    hasId,
    setDebateData,
    setConversionId,
    resetAll,
  }
})
