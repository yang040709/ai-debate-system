<script setup lang='ts'>
</script>

<template>
  <div class='create-topic-container'>
    <div class="title">欢迎来到AI辩论系统</div>
    <p>和社区分享您的辩论话题</p>
    <div class="goto-creative-centre" @click="$router.push({ name: 'creative' })">
      去创作话题
    </div>
  </div>
</template>

<style scoped lang="scss">
.create-topic-container {

  width: 100%;
  background: var(--theme-gray-2);
  border-radius: 10px;
  padding: 20px;

  .title {
    font-size: 16px;
    font-weight: bold;
    height: 30px;
  }

  p {
    height: 30px;
    color: var(--theme-gray-1);
  }

  .goto-creative-centre {

    width: 70%;
    height: 50px;
    background: var(--theme-blue-3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    border-radius: 8px;
    padding: 10px;
    color: #fff;
    cursor: pointer;

    &:hover {
      background: var(--theme-blue-4);
    }
  }
}
</style>