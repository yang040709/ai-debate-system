<script setup lang="ts">
import { ref } from 'vue'
import type { LoginForm } from '@/types/login.ts'

const loginForm = ref<LoginForm>({ loginId: '', loginPwd: '' })
loginForm.value.loginId = 'admin'
loginForm.value.loginPwd = '123456'
</script>

<template>
  <div class="container">
    <input type="text" v-model="loginForm.loginId" class="login-id" />
    <input type="password" v-model="loginForm.loginPwd" class="login-pwd" />
    <button class="login-btn">登录</button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  // background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  input {
    outline: none;
    border: 1px solid #000;
  }
  .login-id {
    width: 300px;
    height: 40px;
    border-radius: 5px;
  }
  .login-pwd {
    width: 300px;
    height: 40px;
    border-radius: 5px;
  }
  .login-btn {
    width: 300px;
    height: 40px;
    border-radius: 5px;
    background: #000;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
