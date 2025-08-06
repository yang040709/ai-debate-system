<script setup lang="ts">
import loadingSvg from '@/assets/loading.svg'
import { onMounted, ref, useTemplateRef, watch } from 'vue'

const props = defineProps<{
  callBack: (...args: any[]) => any
  loading: boolean
  hasMore: boolean
}>()

const intersectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    // if (!props.hasMore) {
    //   return
    // }
    if (props.loading) {
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
    <img :src="loadingSvg" alt="" ref="load" :class="{ 'opacity': !hasMore }" />
    <span v-show="!hasMore && !loading">
      没有更多了
    </span>
  </div>
</template>

<style scoped lang="scss">
.load-more-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 80px;

  span {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: red; */
    bottom: 10px;
    color: var(--theme-gray-4);
    z-index: 2;
  }

  .opacity {
    opacity: 0 !important;
  }
}
</style>
