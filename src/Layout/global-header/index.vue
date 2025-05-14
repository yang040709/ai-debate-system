<script setup>
import logo from '@/assets/logo.png'
</script>

<template>
  <div class="header-container">
    <div class="title">
      <img class="logo-img" :src="logo" alt="" />
      <div class="title-text">AI辩论平台</div>
    </div>
    <div class="nav">
      <router-link to="/" :exact="false">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div class="user">
      <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  height: $navbar-height;
  padding-left: 16px;
  // background-color: #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // router-link-active router-link-exact-active
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  .title {
    // padding-left: 50px;
    display: flex;
    align-items: center;
    .logo-img {
      width: 32px;
      height: 32px;
    }
    .title-text {
      padding-left: 10px;
      font-size: 16px;
      font-weight: 600;
      // margin-left: 10px;
      line-height: 24px;
    }
  }
  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    margin: 0 30px;
    &.router-link-exact-active {
      color: #409eff;
    }
  }
}
</style>
