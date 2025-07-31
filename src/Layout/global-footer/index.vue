<script setup lang="ts">
import { inject } from 'vue'

const footerList = inject<AppConfig>('config')?.footerList
</script>

<template>
  <div class="footer-container">
    <div v-for="item in footerList" :key="item">
      {{ item }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-container {
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-end;
  // padding-bottom: 20px;
  // height: $footer-height;
  line-height: $footer-height;
  border-top: 1px solid var(--color-border-light);
  font-size: 12px;
  color: #b7b6b6;
}
</style>
