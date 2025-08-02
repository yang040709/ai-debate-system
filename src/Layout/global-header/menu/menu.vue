<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute, RouteRecord, RouteRecordRaw } from 'vue-router'
import filterRoutes from '@/utils/filterRoutes'
// import {  HomeOutlined } from '@arco-design/web-vue'
const router = useRouter()
const route = useRoute()

const routes = filterRoutes(router.getRoutes())
console.log(routes);

console.log(route.name);


const handleMenuClick = (e: any) => {
  let targetRoute: any = {};
  routes.forEach((route: any) => {
    if (route.name === e) {
      targetRoute = route;
    }
  })
  let defaultParams = {};
  // console.log("点击了菜单", route);
  if (targetRoute?.meta?.defaultParams) {
    defaultParams = { ...targetRoute.meta.defaultParams }
    router.push({
      name: e,
      params: defaultParams
    })
  }
  else {
    router.push({
      name: e,
    })
  }
  selectedKey.value = [e]
}

const selectedKey = ref([route.name])

router.afterEach(() => {
  selectedKey.value = [route.name as string]
})

// const handleMenuKey = (e: any) => {
//   let str = ""
//   if (e?.meta?.link) {
//     str = JSON.stringify({ link: e.meta.link })
//   }
//   else {
//     str = JSON.stringify({ name: e.name })
//   }
//   return str
// }



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
