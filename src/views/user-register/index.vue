<script setup lang="ts">
import { ref, reactive, watch, useTemplateRef } from 'vue'
import type { RegisterForm } from '@/types/user'
import { Message } from '@arco-design/web-vue'
import ReturnHome from '@/components/return-home/index.vue'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { templateRef } from '@vueuse/core'

type RegisterFromState = RegisterForm & {
  confirmPassword: string
}
const userStore = useUserStore()

const router = useRouter()
const route = useRoute()

const registerForm = reactive<RegisterFromState>({
  account: '',
  password: '',
  nickname: '',
  confirmPassword: '',
})
const submitLoading = storeToRefs(userStore).submitLoading

if (import.meta.env.DEV) {
  registerForm.account = 'admin'
  registerForm.nickname = 'yang'
  registerForm.password = '123456'
  registerForm.confirmPassword = '123456'
}

const toLogin = () => {
  router.push({
    name: 'login',
    query: {
      redirect: route?.query?.redirect,
    },
  })
}

const registerFormRef = useTemplateRef('registerFormRef')

const handleClickRegisterBtn = async () => {
  const res = await registerFormRef.value.validate()
  console.log(res)
  if (res) {
    Message.error('请输入正确的账号密码')
    return
  }
  if (submitLoading.value) {
    Message.warning('正在注册中，请稍后...')
    return
  }

  submitLoading.value = true
  const result = await userStore.register(registerForm)
  if (!result) {
    return
  }
  router.push({
    name: 'home',
  })
}
</script>

<template>
  <div class="user-login-container">
    <ReturnHome />
    <h2 class="title">用户注册</h2>
    <p class="gray">加入AI辩论平台，开启智能辩论之旅</p>
    <a-form
      class="register-form"
      :model="registerForm"
      label-align="left"
      auto-label-width
      ref="registerFormRef"
    >
      <div class="gray form-item-dsc">账号</div>
      <a-form-item
        field="account"
        :rules="[{ required: true, message: '账号是必填项' }]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="registerForm.account" placeholder="请输入账号" />
      </a-form-item>
      <div class="gray form-item-dsc">昵称</div>
      <a-form-item
        field="nickname"
        :rules="[{ required: true, message: '呢称是必填项' }]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="registerForm.nickname" placeholder="请输入账号" />
      </a-form-item>
      <div class="gray form-item-dsc">密码</div>
      <a-form-item
        field="password"
        tooltip="密码不小于 6 位"
        :rules="[
          { required: true, message: '密码是必填项' },
          { minLength: 6, message: '密码不小于 6 位' },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input-password v-model="registerForm.password" placeholder="请输入密码" />
      </a-form-item>
      <div class="gray form-item-dsc">确认密码</div>
      <a-form-item
        field="confirmPassword"
        tooltip="密码需与上面的密码一致"
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
      <!-- <a-form-item>
        <div class="login-btn">
          <a-button type="primary" :loading="submitLoading" html-type="submit" style="width: 120px">
            注册
          </a-button>
          <a-link @click="toLogin">用户登录</a-link>
        </div>
      </a-form-item> -->
      <div class="login-btn" @click="handleClickRegisterBtn">注册</div>
      <div class="prompt">已有账号？<a @click.prevent="toLogin">立即登录</a></div>
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
  background: var(--body-bg-1);
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
