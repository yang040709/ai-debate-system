import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
// import { getItem } from '@/utils/storage.ts'
import { loginApi, registerApi, getUserInfoApi, updateUserInfoApi } from '@/api/user'
import { useLocalStorage } from '@vueuse/core'
import type { UserInfo, LoginForm, RegisterForm, CanModifyUserInfo } from '@/types/user'
import { handleResponseError } from '@/utils/error'

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
    submitLoading.value = true
    const res = await loginApi(data).catch((err) => {
      console.log(err)
      return null
    })
    if (res) {
      token.value = res.token
      userInfo.value = {
        user_id: res.user_id,
        nickname: res.nickname,
        avatar: res.avatar,
      }
    }
    submitLoading.value = false
    return res
  }

  const register = async (data: RegisterForm) => {
    const registerRes = await registerApi(data).catch((err) => {
      console.log(err)
      return null
    })
    if (registerRes) {
      await login({ account: data.account, password: data.password }).catch((err) => {
        console.log(err)
        return null
      })
    }
    submitLoading.value = false
    return registerRes
  }

  const getUserInfo = async () => {
    submitLoading.value = true
    if (token.value === '') {
      submitLoading.value = false
      console.log('没有token，请先登录')
      return
    }
    // console.log();
    const res = await getUserInfoApi().catch((err) => {
      console.log(err)
      return null
    })
    console.log(res, token.value, '<===getUserInfoApi===')
    if (res) {
      userInfo.value = {
        user_id: res.user_id,
        nickname: res.nickname,
        avatar: res.avatar,
      }
    }
    submitLoading.value = false
    return res
  }
  const updateUserInfo = async (userInfo: CanModifyUserInfo) => {
    const res = await updateUserInfoApi(userInfo).catch((err) => {
      console.log(err)
      return null
    })
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
    updateUserInfo,
  }
})
