<script setup lang="ts">
import { ref, computed } from 'vue'
import { Editor } from '@bytemd/vue-next'
import highlight from '@bytemd/plugin-highlight'
import zhHans from 'bytemd/locales/zh_Hans.json'
import 'bytemd/dist/index.css'
import gfm from '@bytemd/plugin-gfm'
// import 'github-markdown-css/github-markdown-light.css'

interface Props {
  content: string
  height?: number
  handleChange: (value: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  height: 500,
  handleChange: (value: string) => {},
})

const height = computed(() => props.height)

const plugins = [highlight, gfm]
</script>

<template>
  <div class="md-editor-container">
    <Editor
      class="md-editor"
      :value="props.content"
      :plugins="plugins"
      :locale="zhHans"
      @change="handleChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.md-editor-container {
  .md-editor {
    :deep(.bytemd) {
      height: v-bind('props.height + "px"');
    }
  }
}
</style>
