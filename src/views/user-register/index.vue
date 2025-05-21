<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { RegisterForm } from '@/types/user'
import { Message } from '@arco-design/web-vue'
import ReturnHome from '@/components/return-home/index.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

type RegisterFromState = RegisterForm & {
  confirmPassword: string
}
const userStore = useUserStore()
const router = useRouter()
const registerForm = reactive<RegisterFromState>({
  account: '',
  password: '',
  nickname: '',
  confirmPassword: '',
})
const submitLoading = storeToRefs(userStore).submitLoading
registerForm.account = 'admin'
registerForm.nickname = 'yang'
registerForm.password = '123456'
registerForm.confirmPassword = '123456'

const handleRegisterError = (error: any) => {
  console.error('注册失败:', error)
  let errorMessage = error instanceof Error ? error.message : null
  if (!errorMessage) {
    errorMessage = error?.msg || '注册失败，请检查网络连接'
  }
  Message.error(errorMessage as string)
}

const handleSubmit = async (e: any) => {
  if (e.errors) {
    Message.error('请输入正确的账号密码')
    return
  }
  try {
    submitLoading.value = true
    await userStore.register(registerForm)
    router.push({
      name: 'home',
    })
  } catch (error) {
    handleRegisterError(error)
  } finally {
    submitLoading.value = false
  }
}

const toLogin = () => {
  router.push({
    name: 'login',
  })
}
</script>

<template>
  <div class="user-login-container">
    <ReturnHome />
    <h2 class="title">用户注册</h2>
    <a-form
      class="register-form"
      :model="registerForm"
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
        <a-input v-model="registerForm.account" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        field="nickname"
        label="昵称"
        :rules="[{ required: true, message: '名字是必填项' }]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="registerForm.nickname" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        field="password"
        tooltip="密码不小于 6 位"
        label="密码"
        :rules="[
          { required: true, message: '密码是必填项' },
          { minLength: 6, message: '密码不小于 6 位' },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input-password v-model="registerForm.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item
        field="confirmPassword"
        tooltip="密码需与上面的密码一致"
        label="确认密码"
        :rules="[
          { required: true, message: '密码是必填项' },
          {
            validator: (value: string | undefined, callback: any) => {
              if (value !== registerForm.password) {
                callback('确认密码需与上面的密码一致')
              } else {
                callback()
              }
            },
            message: '确认密码需与上面的密码一致',
          },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input-password v-model="registerForm.confirmPassword" placeholder="请再次输入密码" />
      </a-form-item>
      <a-form-item>
        <div class="login-btn">
          <a-button type="primary" :loading="submitLoading" html-type="submit" style="width: 120px">
            注册
          </a-button>
          <a-link @click="toLogin">用户登录</a-link>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.user-login-container {
  width: 100%;
  height: 100vh;
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
  .register-form {
    margin-top: 20px;
    max-width: 480px;
    width: 70%;
    min-width: 240px;
  }
  //  :style="{ width: '480px', margin: '0 auto' }"
}
</style>
