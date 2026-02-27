<script setup lang='ts'>
import $bus from '@/eventBus';
import { onMounted, onUnmounted, ref } from 'vue';
import { IconToTop } from '@arco-design/web-vue/es/icon'

const handleClick = () => {
  $bus.emit("scrollTop");
}


const isHide = ref(true)

const handleScrollChange = (scrollTop: number) => {
  if (scrollTop > 200) {
    isHide.value = false
  }
  else {
    isHide.value = true
  }
}

onMounted(() => {
  $bus.on("scroll", handleScrollChange)
})

onUnmounted(() => {
  $bus.off("scroll")
})



</script>

<template>
  <div class='scroll-top-container' :class="{ 'display-none': isHide }" @click="handleClick">
    <icon-to-top :size="20" />
  </div>
</template>

<style scoped lang="scss">
.scroll-top-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 50px;
  background: var(--theme-white-1);
  height: 50px;
  border-radius: 50%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &.display-none {
    display: none;
  }

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>