<script setup lang="ts">
import loadingSvg from '@/assets/loading.svg'
</script>

<template>
  <div class="loading-container" data-role="loading">
    <img :src="loadingSvg" alt="" />
  </div>
</template>

<style scoped lang="scss">
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
