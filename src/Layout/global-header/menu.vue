<script setup lang="ts">
import { ref, watch, h } from 'vue'
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

const initRoute = route.name
const selectedKey = ref([initRoute])

router.afterEach(() => {
  selectedKey.value = [route.name as string]
})
</script>
<template>
  <div class="menu-container">
    <a-menu mode="horizontal" :selected-keys="selectedKey" @menu-item-click="handleMenuClick">
      <a-menu-item v-for="route in routes" :key="route.name">
        {{ route?.meta?.onHeader ? route.meta.onHeader : route.name }}
      </a-menu-item>
    </a-menu>
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
}
</style>
