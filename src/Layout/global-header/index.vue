<script setup lang="ts">
import Menu from './menu/menu.vue'
import User from './user.vue'
import logo from './logo.vue'
</script>

<template>
  <div class="header-container">
    <logo />
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

  .user {
    flex: 0 0 auto;
  }
}
</style>
