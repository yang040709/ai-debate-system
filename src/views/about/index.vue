<script setup lang='ts'>
</script>

<template>
  <div class='about-container'>
    <div class="title">
      <img src="/logo.png" alt="">
      关于思弈阁
    </div>
    <p>思弈阁致力于为用户打造一个充满思辨乐趣的 AI 辩论交流平台。在这里，你可以与 AI 展开精彩辩论，提升辩论技巧，还能参与各类热门话题讨论，和社区伙伴分享观点、碰撞思维火花。</p>
    <p>我们聚焦多元领域话题，从科技前沿的人工智能伦理，到社会生活的各类现象，为热爱思考、热衷辩论的你提供丰富场景。无论你是想锻炼逻辑表达，还是探索不同观点视角，思弈阁都愿成为你思辨之旅的同行者。</p>
    <p>未来，我们也将持续优化功能、拓展话题，努力营造更活跃、更有价值的辩论社区，期待与你一起在思辨中成长，在交流中收获。</p>
  </div>
</template>

<style scoped lang="scss">
.about-container {
  max-width: 900px;
  min-height: 500px;
  // margin: 0 auto;
  // padding: 20px;
  background: var(--theme-gray-2);
  // border-radius: 20px;
  margin-top: 20px;
  padding: 15px 30px;

  .title {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: center;

    img {
      display: inline;
      width: 40px;
      height: 40px;
    }

    font-size: 26px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  p {

    line-height: 1.5em;
    font-size: 16px;
  }
}
</style>