<script setup lang="ts">
import AppConfig from '@/config/app.config';
</script>

<template>
  <div class="footer-container">
    <ul>
      <li><router-link to="/">{{ AppConfig.footerInfo.name }}</router-link> ©{{ AppConfig.footerInfo.year }} |
        <router-link to="/">{{ AppConfig.footerInfo.description }}</router-link>
      </li>
      <li>{{ AppConfig.footerInfo.icp }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.footer-container {
  border-top: 1px solid var(--color-border-light);
  font-size: 12px;
  color: #b7b6b6;
  padding: 12px 0;
  background: #000;
  background-color: var(--theme-gray-7);

  ul {
    li {
      margin: 8px 0;
    }
  }
}
</style>
