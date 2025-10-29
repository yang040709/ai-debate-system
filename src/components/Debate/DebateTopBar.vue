<script setup lang='ts'>
import TopBarPC from './TopBar/TopBarPC.vue';
import TopBarPhone from './TopBar/TopBarPhone.vue';
import { ref } from 'vue'

const mode = ref("pc")

</script>

<template>
  <div class='debate-top-bar-container'>
    <TopBarPC v-if="mode === 'pc'" />
    <TopBarPhone v-else />
  </div>
</template>

<style scoped></style>