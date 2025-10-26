<script setup lang="ts">
import loadingSvg from '@/assets/loading.svg'
import { onMounted, useTemplateRef } from 'vue'

const props = defineProps<{
  callBack: (...args: any[]) => any
  loading: boolean
  hasMore: boolean
}>()

const intersectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    //如果正在加载就不要管
    if (props.loading) {
      return
    }
    props.callBack()
  }
})


const load = useTemplateRef("load")

onMounted(() => {
  if (!load.value) {
    throw new Error('loadingImg.value is null 请你提供有效的加载图片')
  } else {
    intersectionObserver.observe(load.value as Element)
  }
})
</script>

<template>
  <div class="load-more-container">
    <img v-show="hasMore" :src="loadingSvg" ref="load" />
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
    bottom: 10px;
    color: var(--theme-gray-4);
    z-index: 2;
  }

  .opacity {
    opacity: 0 !important;
  }
}
</style>
