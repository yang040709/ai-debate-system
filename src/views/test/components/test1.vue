<script setup lang='ts'>
import $bus from '@/eventBus';

const test = () => {
  $bus.emit("test", "hello emit");
}

</script>

<template>
  <div class='container'>
    <h1>test2</h1>
    <button @click="test">test</button>
  </div>
</template>

<style scoped></style>