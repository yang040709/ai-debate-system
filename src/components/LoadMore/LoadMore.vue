<script setup lang="ts">
import loadingSvg from '@/assets/loading.svg'
import { onMounted, ref, useTemplateRef } from 'vue'

const props = defineProps<{
  callBack: () => void
  isLoading: boolean
}>()

const intersectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    if (props.isLoading) {
      return
    }
    props.callBack()
  }
})

const load = useTemplateRef("load")

onMounted(() => {
  if (!load.value) {
    console.log('loadingImg.value is null')
  } else {
    intersectionObserver.observe(load.value as Element)
  }
})
</script>

<template>
  <div class="load-more-container">
    <img :src="loadingSvg" alt="" ref="load" />
  </div>
</template>

<style scoped>
.load-more-container {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
