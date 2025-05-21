<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { LoginForm } from '@/types/user'
import ReturnHome from '@/components/return-home/index.vue'
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const loginForm = reactive<LoginForm>({ account: '', password: '' })
const submitLoading = storeToRefs(userStore).submitLoading

// ！！开发环境模拟账号密码
if (import.meta.env.DEV) {
  loginForm.account = 'admin'
  loginForm.password = '123456'
}

// 监听用户是否登录,如果登录了就跳转到首页
watch(
  () => userStore.isLogin,
  () => {
    if (userStore.isLogin) {
      router.push({
        name: 'home',
      })
    }
  },
  {
    immediate: true,
  },
)

const handleLoginError = (error: any) => {
  console.error('登录失败:', error)
  let errorMessage = error instanceof Error ? error.message : null
  if (!errorMessage) {
    errorMessage = error?.msg || '登录失败，请检查网络连接'
  }
  Message.error(errorMessage as string)
}

const handleSubmit = async (e: any) => {
  if (e.errors) {
    Message.error('请输入正确的账号密码')
    return
  }
  if (submitLoading.value) {
    Message.warning('正在登录中，请稍后...')
  }
  try {
    submitLoading.value = true
    await userStore.login(loginForm)
    router.push({
      path: route?.query?.redirect ? (route.query.redirect as string) : '/',
    })
  } catch (error) {
    handleLoginError(error)
  } finally {
    submitLoading.value = false
  }
}

const toRegister = () => {
  router.push({
    name: 'register',
  })
}
</script>

<template>
  <div class="user-login-container">
    <ReturnHome />
    <h2 class="title">用户登录</h2>
    <a-form
      :model="loginForm"
      class="login-form"
      label-align="left"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item
        field="account"
        label="账号"
        :rules="[{ required: true, message: '名字是必填项' }]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="loginForm.account" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        field="password"
        tooltip="密码不小于 8 位"
        label="密码"
        :rules="[
          { required: true, message: '密码是必填项' },
          { minLength: 6, message: '密码不小于 6 位' },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input-password v-model="loginForm.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <div class="login-btn">
          <a-button type="primary" :loading="submitLoading" html-type="submit" style="width: 120px">
            登录
          </a-button>
          <a-link @click="toRegister">新用户注册</a-link>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.user-login-container {
  width: 100%;
  height: 100vh;
  // background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .title {
    margin-bottom: 20px;
  }
  .login-btn {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  .login-form {
    margin-top: 20px;
    max-width: 480px;
    width: 70%;
    min-width: 240px;
  }
}
</style>
