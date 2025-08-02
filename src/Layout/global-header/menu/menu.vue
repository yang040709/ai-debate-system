<script setup lang="ts">
import { useMenu } from '@/composition/useMenu';



const { routes, selectedKey, handleMenuClick } = useMenu()

</script>
<template>
  <div class="menu-container pc-menu">
    <a-menu mode="horizontal" :selected-keys="selectedKey" @menu-item-click="handleMenuClick">
      <a-menu-item v-for="route in routes" :key="route.name" class="menu-item">
        {{ route?.meta?.onHeader ? route.meta.onHeader : route.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>
<style lang="scss" scoped>
.menu-container {
  box-sizing: border-box;
  width: 60%;

  .menu-item {
    font-size: 16px;
  }
}
</style>
