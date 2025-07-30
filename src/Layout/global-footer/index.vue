<script setup lang="ts">
// import { AppConfig } from '@/config/app.config';
import { inject } from 'vue'

const footerList = inject<AppConfig>('config')?.footerList
</script>

<template>
  <div class="footer-container">
    <div v-for="item in footerList" :key="item">
      {{ item }}
    </div>
    <!-- <a href="https://arco.design/vue/docs/start"></a> -->
  </div>
</template>

<style lang="scss" scoped>
.footer-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 20px;
  border-top: 1px solid var(--color-border-light);
  // padding: 36px;
  height: $footer-height;
  font-size: 12px;
  color: #b7b6b6;
}
</style>
