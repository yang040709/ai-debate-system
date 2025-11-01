<script setup lang="ts">
import { useAppStore } from './stores/app'
import { onMounted, onUnmounted } from 'vue'
import { debounce } from '@/utils';
import $bus from '@/eventBus'
// import { RouterView } from 'vue-router'
// import { useUserStore } from '@/stores/user'
// 获取用户信息
// const userStore = useUserStore()
// userStore.getUserInfo()

// 从localStorage中获取本地主题
useAppStore()


/* 
处理滚动到顶部的事件总线的问题
*/

onMounted(() => {

  /* 处理滚动到顶部的事件 */
  $bus.on("scrollTop", () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
  document.addEventListener("scroll", debounceHandleScroll)
})

onUnmounted(() => {
  $bus.off("scrollTop")
  document.documentElement.removeEventListener("scroll", debounceHandleScroll)
})


const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop;
  $bus.emit("scroll", scrollTop)
}

const debounceHandleScroll = debounce(handleScroll, 50)


</script>
<template>
  <div id="mask-teleport"></div>
  <RouterView />
</template>

<style scoped></style>
