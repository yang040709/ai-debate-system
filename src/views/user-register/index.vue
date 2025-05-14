<script setup lang="ts">
import { reactive } from 'vue'
import type { RegisterForm } from '@/types/user'
import { Message } from '@arco-design/web-vue'
import ReturnHome from '@/components/return-home/index.vue'
const registerForm = reactive<RegisterForm>({ loginId: '', loginPwd: '', checkPwd: '' })
registerForm.loginId = 'admin'
registerForm.loginPwd = '123456'

const handleSubmit = (e: any) => {
  if (e.errors) {
    Message.error('请输入正确的账号密码')
    return
  }
  if (registerForm.loginPwd !== registerForm.checkPwd) {
    registerForm.checkPwd = ''
    Message.error('确认密码与密码不一致')
    return
  }
}
</script>

<template>
  <div class="user-login-container">
    <ReturnHome />
    <h2 class="title">用户注册</h2>
    <a-form
      :model="registerForm"
      :style="{ width: '480px', margin: '0 auto' }"
      label-align="left"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item
        field="loginId"
        label="账号"
        :rules="[{ required: true, message: '名字是必填项' }]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="registerForm.loginId" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        field="loginPwd"
        tooltip="密码不小于 6 位"
        label="密码"
        :rules="[
          { required: true, message: '密码是必填项' },
          { minLength: 6, message: '密码不小于 6 位' },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input-password v-model="registerForm.loginPwd" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item
        field="checkPwd"
        tooltip="密码需与上面的密码一致"
        label="确认密码"
        :rules="[
          { required: true, message: '密码是必填项' },
          {
            validator: (value: string | undefined, callback: any) => {
              if (value !== registerForm.loginPwd) {
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
        <a-input-password v-model="registerForm.checkPwd" placeholder="请再次输入密码" />
      </a-form-item>
      <a-form-item>
        <div class="login-btn">
          <a-button type="primary" html-type="submit" style="width: 120px"> 登录 </a-button>
          <a-link href="/login">用户登录</a-link>
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
}
</style>
