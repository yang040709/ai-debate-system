<script setup lang="ts">
import MdEditor from '@/components/MdEditor/index.vue'
import MdViewer from '@/components/MdViewer/index.vue'
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
    <!-- <div class="demo">
      <MdEditor :content="content" :handle-change="handleChange" />
      <MdViewer :content="content" />
    </div> -->
  </main>
</template>
<style scoped lang="scss"></style>
