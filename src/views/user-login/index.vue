<script setup lang="ts">
import { ref, reactive, watch, useTemplateRef } from 'vue'
import type { LoginForm } from '@/types/user'
import ReturnHome from '@/components/ReturnHome/ReturnHome.vue'
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

// const handleLoginError = (error: any) => {
//   console.error('登录失败:', error)
//   let errorMessage = error instanceof Error ? error.message : null
//   if (!errorMessage) {
//     errorMessage = error?.msg || '登录失败，请检查网络连接'
//   }
//   Message.error(errorMessage as string)
// }

const toRegister = () => {
  router.push({
    name: 'register',
    query: {
      redirect: route?.query?.redirect as string,
    },
  })
}

const loginFormRef = useTemplateRef('loginFormRef')

const handleClickLoginBtn = async () => {
  console.log('点击了登录')
  console.log(loginFormRef)
  const res = await loginFormRef.value.validate()
  if (res) {
    // 说明校验有问题
    Message.error('请输入正确的账号密码')
    return
  }
  if (submitLoading.value) {
    Message.warning('正在登录中，请稍后...')
  }

  submitLoading.value = true
  const result = await userStore.login(loginForm)
  if (!result) {
    return
  }
  router.push({
    path: (route?.query?.redirect as string) || '/',
  })
}
</script>

<template>
  <div class="user-login-container">
    <ReturnHome />
    <h2 class="title">用户登录</h2>
    <p class="gray">登录您的AI辩论账号</p>
    <a-form ref="loginFormRef" :model="loginForm" class="login-form" label-align="left" auto-label-width>
      <div class="gray form-item-dsc">账号：</div>
      <a-form-item field="account" :rules="[{ required: true, message: '账号是必填项' }]"
        :validate-trigger="['change', 'input']">
        <a-input v-model="loginForm.account" size="large" placeholder="请输入账号" />
      </a-form-item>
      <div class="gray form-item-dsc">密码：</div>
      <a-form-item field="password" tooltip="密码不小于 8 位" :rules="[
        { required: true, message: '密码是必填项' },
        { minLength: 6, message: '密码不小于 6 位' },
      ]" :validate-trigger="['change', 'input']">
        <a-input-password v-model="loginForm.password" size="large" placeholder="请输入密码" />
      </a-form-item>
      <div class="login-btn" @click="handleClickLoginBtn">登录</div>
      <div class="prompt">还没有账号？<a @click.prevent="toRegister">立即注册</a></div>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.user-login-container {
  width: 100%;
  height: 100vh;
  background: var(--body-bg-1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .title {
    margin-bottom: 8px;
  }

  p {
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
    width: 80%;
    min-width: 240px;
  }

  .gray {
    color: var(--color-text-secondary);
  }

  .form-item-dsc {
    margin-bottom: 4px;
  }

  .login-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    background: var(--btn-login-bg);
    margin-top: 10px;
    height: 45px;
    color: var(--color-text-white);
    border-radius: 8px;
    outline: none;
  }

  .login-btn:hover {
    background: var(--btn-login-bg-hover);
  }

  .prompt {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;

    a {
      color: var(--btn-login-bg);

      &:hover {
        color: var(--btn-login-bg-hover);
      }
    }
  }
}

:deep(.arco-form-item-label-col-left) {
  display: none !important;
}
</style>
