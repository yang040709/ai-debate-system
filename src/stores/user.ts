import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getItem } from '@/utils/storage.ts'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const token = ref(getItem('token'))
  const isLogin = computed(() => !!token.value)

  // const login

  return {
    userInfo,
    token,
    isLogin,
  }
})
