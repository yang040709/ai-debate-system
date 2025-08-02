<script setup lang='ts'>
import $bus from '@/eventBus';
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  $bus.on("test", (data) => {
    console.log("test===>", data);
  })
})
onUnmounted(() => {
  $bus.off("test");
})

</script>

<template>
  <div class='container'>
    <h1>test2</h1>
  </div>
</template>

<style scoped></style>