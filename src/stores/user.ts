import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
// import { getItem } from '@/utils/storage.ts'
import { loginApi, registerApi, getUserInfoApi } from '@/api/user'
import { useLocalStorage } from '@vueuse/core'
import type {
  UserInfo,
  LoginForm,
  RegisterForm,
  loginResponse,
  RegisterResponse,
} from '@/types/user'
export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>({
    user_id: '',
    nickname: '',
    avatar: '',
  })
  const token = useLocalStorage('token', '')
  const submitLoading = ref(false)
  const isLogin = computed(
    () =>
      userInfo.value && JSON.stringify(userInfo.value) != '{}' && userInfo.value.nickname !== '',
  )

  const login = async (data: LoginForm) => {
    console.log('登录', data)
    const res = (await loginApi(data)) as loginResponse
    token.value = res.token
    console.log(res, token.value, '<===token')
    userInfo.value = {
      user_id: res.user_id,
      nickname: res.nickname,
      avatar: res.avatar,
    }
    return res
  }

  const register = async (data: RegisterForm) => {
    const registerRes = (await registerApi(data)) as RegisterResponse
    await login({ account: data.account, password: data.password })
    return registerRes
  }

  const getUserInfo = async () => {
    submitLoading.value = true
    if (token.value === '') {
      submitLoading.value = false
      return
    }
    const res = (await getUserInfoApi()) as UserInfo
    console.log(res, token.value, '<===getUserInfoApi===')
    submitLoading.value = false
    userInfo.value = {
      user_id: res.user_id,
      nickname: res.nickname,
      avatar: res.avatar,
    }
    return res
  }

  const logout = () => {
    userInfo.value = {
      user_id: '',
      nickname: '',
      avatar: '',
    }
    token.value = ''
  }

  return {
    login,
    logout,
    register,
    userInfo,
    token,
    isLogin,
    getUserInfo,
    submitLoading,
  }
})
