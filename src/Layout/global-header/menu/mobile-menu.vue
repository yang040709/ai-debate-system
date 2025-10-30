<script setup lang="ts">
import { useMenu } from '@/composables/useMenu';
import { useVisible } from '@/composables/useVisible'

const { visible, openModal, closeModal } = useVisible();

const { routes, selectedKey, handleMenuClick } = useMenu()

</script>

<template>
  <div class="mobile-menu-container">
    <icon-menu-unfold :size="28" v-show="!visible" @click="openModal" class="menu-icon" />
    <icon-menu-fold :size="28" v-show="visible" class="menu-icon" />
    <a-drawer placement="left" width="40%" :visible="visible" @ok="openModal" @cancel="closeModal" unmountOnClose
      hide-cancel :footer="false">
      <template #title>菜单</template>
      <a-menu :selected-keys="selectedKey" @menu-item-click="handleMenuClick">
        <a-menu-item v-for="route in routes" :key="route.name">
          {{ route?.meta?.onHeader ? route.meta.onHeader : route.name }}
        </a-menu-item>
      </a-menu>
    </a-drawer>
  </div>
</template>

<style scoped lang="scss">
.menu-icon {
  cursor: pointer;
  margin-left: 10px;
  color: var(--color-text-secondary);

  &:hover {
    color: var(--color-text-primary);
  }
}
</style>
