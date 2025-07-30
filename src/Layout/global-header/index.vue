<script setup lang="ts">
import logo from '@/assets/logo.png'
import Menu from './menu/menu.vue'
import User from './user.vue'
import mobileMenu from './menu/mobile-menu.vue'
</script>

<template>
  <div class="header-container">
    <div class="title pc-title-padding">
      <router-link to="/" class="title pc-title-padding">
        <img class="logo-img" :src="logo" alt="" />
        <h1 class="title-text pc-title">{{ $config.appName }}</h1>
      </router-link>
      <mobile-menu class="mobile-menu" />
    </div>
    <Menu></Menu>
    <User class="user"></User>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  background-color: var(--header-bg);
  height: $header-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border-light);
  .pc-title-padding {
    padding-left: 16px;
  }
  .user {
    flex: 0 0 auto;
  }
  .title {
    flex: 0 0 auto;
    margin: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    // width: 150px;

    .logo-img {
      width: 32px;
      height: 32px;
    }
    .title-text {
      color: var(--color-text-primary);
      font-weight: 500;
      // padding-left: 20px;
      margin-left: 15px;
      font-size: 18px;
      line-height: 24px;
    }
  }
}
.mobile-menu {
  display: none;
}
</style>
