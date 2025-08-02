<script setup lang="ts">
const siteInfo = {
  name: '思弈阁',
  year: new Date().getFullYear(),
  description: '智能AI辩论系统',
  icp: '粤ICP备123456号'
}
</script>

<template>
  <div class="footer-container">
    <ul>
      <li><router-link to="/">{{ siteInfo.name }}</router-link> ©{{ siteInfo.year }} |
        <router-link to="/">{{ siteInfo.description }}</router-link>
      </li>
      <li>{{ siteInfo.icp }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.footer-container {
  border-top: 1px solid var(--color-border-light);
  font-size: 12px;
  color: #b7b6b6;
  padding: 12px 0;

  ul {
    li {
      margin: 8px 0;
    }
  }
}
</style>
