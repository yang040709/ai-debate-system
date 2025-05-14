<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const handleMenuClick = (e: string) => {
  router.push({
    name: e,
  })
}
</script>
<template>
  <div class="menu-container">
    <a-menu mode="horizontal" :default-selected-keys="['home']" @menu-item-click="handleMenuClick">
      <a-menu-item key="home">主页</a-menu-item>
      <a-menu-item key="about">关于</a-menu-item>
    </a-menu>
    <!-- <router-link to="/" :exact="false">主页</router-link>
    <router-link to="/about">关于</router-link> -->
  </div>
</template>
<style lang="scss" scoped>
// a {
//   margin: 0 30px;
//   &.router-link-exact-active {
//     color: #409eff;
//   }
// }
// .nav {
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
.menu-container {
  box-sizing: border-box;
  width: 60%;
  // padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>
