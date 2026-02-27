<script setup lang='ts'>
import loadingSvg from '@/assets/loading-1.svg'

// defineProps<{
//   loading: boolean
// }>()
</script>

<template>
  <Teleport to="#mask-teleport">
    <div class="loading-mask">
      <div class="content">
        <img :src='loadingSvg' alt="">
        <p>请稍等一小会,正在加载中...</p>
      </div>
    </div>
  </Teleport>

</template>

<style scoped lang="scss">
.loading-mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: calc(100vh - $header-height);
  background: linear-gradient(105deg, #ff6b6b,
      #4ecdc4,
      #45b7d1,
      #ffda79);
  animation: gradientMove 10s ease-in-out infinite;
  background-size: 400% 400%;

  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: white;
    font-size: 16px;
  }

}

@keyframes gradientMove {
  0% {
    /* 初始位置：左下角 */
    background-position: 0% 100%;
  }

  50% {
    /* 中间位置：中心 */
    background-position: 100% 0%;
  }

  100% {
    /* 结束位置：右上角（与初始位置形成循环） */
    background-position: 0% 100%;
  }
}
</style>