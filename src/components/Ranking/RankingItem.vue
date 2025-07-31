<script setup lang='ts'>
import type { Ranking } from '@/types/ranking'

// const obj = {
//   ranking: 1,
//   name: '张三',
//   winningRate: '89%',
//   score: 2890
// }


defineProps<{ rank: Ranking }>()


</script>

<template>
  <div class='ranking-item-container'>
    <div class="left">
      <span class="ranking" :class="{ yellow: rank.ranking === 1 }">{{ rank.ranking }}</span>
      <div class="user-info">
        <img v-placeholder-img :data-src="rank.avatar || '/avatar.png'" alt="">
        <div class="user-info-text">
          <div class="name">
            {{ rank.name }}
          </div>
          <div class="winning-rate">
            胜率 {{ rank.winningRate }}
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      {{ rank.score }}分
    </div>
  </div>
</template>

<style scoped lang="scss">
.ranking-item-container {
  width: 100%;
  height: 44px;
  background: var(--theme-gray-2);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    cursor: pointer;
    display: flex;
    align-items: center;

    .ranking {
      margin-right: 15px;
      font-size: 20px;
      font-weight: 700;
      color: var(--color-text-secondary);

      &.yellow {
        color: var(--theme-yellow-1);
      }
    }

    .user-info {
      display: flex;
      // align-items: center;

      img {
        width: 40px;
        height: 40px;
        object-fit: contain;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }

  .user-info-text {
    .name {
      font-weight: 700;
      font-size: 16px;
      color: var(--color-text-primary);
    }

    .winning-rate {

      line-height: 20px;
      color: var(--theme-gray-1);
    }
  }

  .right {
    font-size: 16px;
    color: var(--theme-blue-1);
  }
}
</style>