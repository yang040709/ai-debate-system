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
        <div class="title-text pc-title">AI辩论平台</div>
      </router-link>
      <mobile-menu class="mobile-menu" />
    </div>

    <Menu></Menu>
    <User></User>
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
  // margin: 0 10px;
  // a {
  //   margin: 0 30px;
  //   &.router-link-exact-active {
  //     color: #409eff;
  //   }
  // }
  .pc-title-padding {
    padding-left: 16px;
  }
  .title {
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
      padding-left: 10px;
      font-size: 16px;
      line-height: 24px;
    }
  }
}
.mobile-menu {
  display: none;
}
</style>
