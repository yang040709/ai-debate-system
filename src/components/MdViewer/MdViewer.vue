<script setup lang="ts">
import { Viewer } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'

interface Props {
  content: string
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
})

const plugins = [gfm, highlight]
</script>

<template>
  <div class="md-viewer-container">
    <Viewer :value="props.content" :plugins="plugins" />
  </div>
</template>

<style lang="scss" scoped></style>
