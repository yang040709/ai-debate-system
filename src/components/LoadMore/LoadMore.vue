<script setup lang="ts">
import loadingSvg from '@/assets/loading.svg'
import { onMounted, ref, useTemplateRef, watch } from 'vue'

const props = defineProps<{
  callBack: (...args: any[]) => any
  loading: boolean
}>()

const intersectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    if (props.loading) {
      return
    }
    props.callBack()
  }
})


// watch(() => props.loading, () => {
//   console.log("props.loading", props.loading, "<===");
//   if (props.loading === false) {
//     console.log("开始监控");
//   }
// })


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
