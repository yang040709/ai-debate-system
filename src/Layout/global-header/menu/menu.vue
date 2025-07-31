<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import filterRoutes from '@/utils/filterRoutes'
// import {  HomeOutlined } from '@arco-design/web-vue'
const router = useRouter()
const route = useRoute()

const routes = filterRoutes(router.getRoutes())

const handleMenuClick = (e: string) => {
  router.push({
    name: e,
  })
  selectedKey.value = [e]
}

const selectedKey = ref([route.name])

router.afterEach(() => {
  selectedKey.value = [route.name as string]
})
</script>
<template>
  <div class="menu-container pc-menu">
    <a-menu mode="horizontal" :selected-keys="selectedKey" @menu-item-click="handleMenuClick">
      <a-menu-item v-for="route in routes" :key="route.name">
        {{ route?.meta?.onHeader ? route.meta.onHeader : route.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>
<style lang="scss" scoped>
.menu-container {
  box-sizing: border-box;
  width: 60%;
}
</style>
