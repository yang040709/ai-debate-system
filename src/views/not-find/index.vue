<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const handleBack = () => {
  router.back()
}

const handleHome = () => {
  router.push({
    name: 'home',
  })
}
</script>

<template>
  <div class="not-find-container">
    <div class="right">
      <div class="title">走丢了</div>
      <p>抱歉，找不到你要的内容 可能是地址错误或内容被删除</p>
      <div class="to-home">
        <a-button type="primary" @click="handleHome">返回首页</a-button>
        <a-button @click="handleBack">上一页</a-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-find-container {
  margin: 50px 50px;
  background: var(--background-color);
  border-radius: 10px;

  .right {
    padding: 30px;

    .title {
      font-size: 22px;
    }

    p {
      font-size: 14px;
      margin: 22px 0;
    }

    .to-home {
      display: flex;
      gap: 40px;
    }
  }
}
</style>
