<script setup lang="ts">
import GlobalHeader from './global-header/index.vue'
import GlobalFooter from './global-footer/index.vue'
import { useRoute } from 'vue-router';
import { computed } from 'vue'

/* 
下面是处理路由元信息带来的布局问题
*/
const route = useRoute()

const routerViewClass = computed(() => {
  if (route.meta && route.meta.layout) {
    if (route.meta.layout === "full") {
      return "router-full-container"
    }
  }
  return "router-default-container"
})



</script>

<template>
  <div class="layout-container">
    <header class="header">
      <GlobalHeader />
    </header>
    <main class="main">
      <router-view :class="routerViewClass" v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </router-view>
    </main>
    <footer class="footer">
      <GlobalFooter />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';

.router-default-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.router-full-container {
  width: 100%;
  padding: 0;
}

.layout-container {
  max-width: 100vw;
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
  }

  .main {
    margin-top: $header-height;
    flex: 1;
    background-color: var(--theme-gray-7);
    // background: var(--body-bg-2);
    // padding: 28px;
    // background: linear-gradient(to right, var(--body-bg-1), var(--body-bg-2));
    // margin-bottom: 28px;
  }

  .footer {
    flex: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
  }
}
</style>
