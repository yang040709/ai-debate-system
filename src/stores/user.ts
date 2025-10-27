import { defineStore } from 'pinia'
import { computed, Ref, ref } from 'vue'
import { loginApi, registerApi, getUserInfoApi, updateUserInfoApi } from '@/api/user'
import { useLocalStorage } from '@vueuse/core'
import type { UserInfo, LoginForm, RegisterForm, ModifyUserInfo } from '@/types/user'
import AppConfig from '@/config/app.config'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>({
    user_id: '',
    nickname: '',
    avatar: '',
  })
  const token: Ref<string | undefined> = useLocalStorage(AppConfig.TOKEN_KEY, undefined)
  const submitLoading = ref(false)
  const isLogin = computed(
    () =>
      userInfo.value && JSON.stringify(userInfo.value) != '{}' && userInfo.value.nickname !== '',
  )
  const isTryGetUserInfo = ref(false)

  const login = async (data: LoginForm) => {
    if (submitLoading.value) {
      return
    }
    submitLoading.value = true
    const res = await loginApi(data)
      .catch((err) => {
        console.log(err)
        return null
      })
      .finally(() => {
        submitLoading.value = false
      })
    if (res) {
      token.value = res.token
      userInfo.value = {
        user_id: res.user_id,
        nickname: res.nickname,
        avatar: res.avatar,
      }
    }
    return res
  }

  const register = async (data: RegisterForm) => {
    if (submitLoading.value) {
      return
    }
    const registerRes = await registerApi(data).catch((err) => {
      console.log(err)
      return null
    })
    if (registerRes) {
      const loginRes = await login({ account: data.account, password: data.password })
        .catch((err) => {
          console.log(err)
          return null
        })
        .finally(() => {
          submitLoading.value = false
        })
      if (!loginRes) {
        return null
      }
    }
    return registerRes
  }

  const getUserInfo = async () => {
    if (submitLoading.value) {
      return
    }
    submitLoading.value = true
    if (!token.value || token.value.trim() === '') {
      submitLoading.value = false
      console.log('没有token，请先登录')
      return
    }
    console.log('获取用户信息')
    const res = await getUserInfoApi()
      .catch((err) => {
        console.log(err)
        return null
      })
      .finally(() => {
        submitLoading.value = false
      })
    if (res) {
      userInfo.value = {
        user_id: res.user_id,
        nickname: res.nickname,
        avatar: res.avatar,
      }
    }
    return res
  }
  const updateUserInfo = async (userInfo: ModifyUserInfo) => {
    if (submitLoading.value) {
      return
    }
    submitLoading.value = true
    const res = await updateUserInfoApi(userInfo)
      .catch((err) => {
        console.log(err)
        return null
      })
      .finally(() => {
        submitLoading.value = false
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
    isTryGetUserInfo,
    userInfo,
    token,
    isLogin,
    getUserInfo,
    submitLoading,
    updateUserInfo,
  }
})
