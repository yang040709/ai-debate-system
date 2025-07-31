<script setup lang='ts'>
</script>

<template>
  <div class='start-debate-container'>
    <h4>开始辩论</h4>
    <p>立即与AI进行辩论，提升您的辩论技巧</p>
    <div class="quick-match">
      快速开始
    </div>
  </div>
</template>

<style scoped lang="scss">
.start-debate-container {
  width: 100%;
  height: 168px;
  background: linear-gradient(to right, var(--theme-blue-3), var(--theme-blue-4));
  border-radius: 15px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h4 {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    color: #fff;
  }

  .quick-match {
    width: 114px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    font-weight: 700;
    font-size: 16px;
    background: #fff;
    color: var(--theme-blue-4);
    cursor: pointer;

  }
}
</style>