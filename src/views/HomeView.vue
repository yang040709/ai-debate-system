<script setup lang="ts">
import { ref } from 'vue'

const content = ref<string>('')

const handleChange = (value: string) => {
  console.log(value)
  content.value = value
}
</script>

<template>
  <main>
    Hello World!
    <div>
      <a-button type="primary">Primary</a-button>
      <a-button>Secondary</a-button>
      <a-button type="dashed">Dashed</a-button>
      <a-button type="outline">Outline</a-button>
    </div>
  </main>
</template>
<style scoped lang="scss"></style>
