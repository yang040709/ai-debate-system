<script setup lang="ts">
import GlobalHeader from './global-header/index.vue'
import GlobalFooter from './global-footer/index.vue'
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue'


const route = useRoute();


const routerViewClass = computed(() => {
  if (route.meta && route.meta.layout) {
    return "";
  }
  else {
    return "router-view-container";
  }
})

// 有两种写法，上面和下面都可以

// const routerViewClass = ref("router-view-container")
// const setClass = (route: any) => {
//   if (route?.meta?.layout) {
//     routerViewClass.value = ""
//     console.log("!!!");
//   }
//   else {
//     routerViewClass.value = "router-view-container"
//   }
// }


// router.beforeEach((to, from) => {
//   setClass(to)
// })

// setClass(route)

</script>

<template>
  <div class="layout-container">
    <header class="header">
      <GlobalHeader />
    </header>
    <main class="main">
      <router-view :class="routerViewClass" />
    </main>
    <footer class="footer">
      <GlobalFooter />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';

.router-view-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
}



.layout-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: map.get($z-index-map, navbar);
    // background-color: $test;
  }

  .main {
    margin-top: $header-height;
    flex: 1;
    // padding: 28px;
    background: linear-gradient(to right, var(--body-bg-1), var(--body-bg-2));
    // margin-bottom: 28px;
  }

  .footer {
    flex: 0;
    // background-color: #f9f8f8;
    // padding: 16px;
    // height: 92px;
    // background-color: var(--body-bg-2);
    background: linear-gradient(to right, var(--body-bg-1), var(--body-bg-2));
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    // border-top: 1px solid rgba(5, 5, 5, 0.06);
  }
}
</style>
