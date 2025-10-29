<script setup lang='ts'>
import Debate from '@/components/Debate/Debate.vue';
import DebateTopBar from '@/components/Debate/DebateTopBar.vue';
</script>

<template>
  <div class='test123-container'>
    <DebateTopBar />
    <Debate />
  </div>
</template>

<style scoped>
.test123-container {
  width: 100%;
  height: 100%;
}
</style>