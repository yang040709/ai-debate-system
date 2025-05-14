<template>
  <div class="nav">
    <router-link to="/" :exact="false">主页</router-link>
    <router-link to="/about">关于</router-link>
  </div>
</template>
<style lang="scss" scoped>
a {
  margin: 0 30px;
  &.router-link-exact-active {
    color: #409eff;
  }
}
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
