<script setup lang='ts'>
import { useWebSocket } from '@/composables/useWebSocket';
import { watch, ref } from 'vue'
const { sendMessage, message, connect, isReceivingMsg } = useWebSocket('/socket.io');
connect()
const fullMessage = ref('')
watch(message, () => {
  fullMessage.value += message.value
})
</script>

<template>
  <div class='container'>
    <h2>hello</h2>
    <p>{{ message }}</p>
    <p>{{ fullMessage }}</p>
    <p>{{ isReceivingMsg }}</p>
    <button @click="sendMessage('hello')">send</button>
  </div>
</template>

<style scoped></style>