<script setup lang="ts">
import GlobalHeader from './global-header/index.vue'
import GlobalFooter from './global-footer/index.vue'
</script>

<template>
  <div class="layout-container">
    <header class="header">
      <GlobalHeader />
    </header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <GlobalFooter />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
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
    // background-color: $test;
  }

  .main {
    margin-top: $navbar-height;
    flex: 1;
    padding: 28px;
    background: linear-gradient(to right, $body-bg-1, $body-bg-2);
    // margin-bottom: 28px;
  }
  .footer {
    flex: 0;
    background-color: #f9f8f8;
    padding: 16px;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    border-top: 1px solid rgba(5, 5, 5, 0.06);
  }
}
</style>
