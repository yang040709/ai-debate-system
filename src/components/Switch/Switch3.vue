<script setup lang='ts'>
import Skeleton from '@/components/Skeleton/Skeleton.vue';
import type { Tag } from '@/types/tag'

defineProps<{
  list: Tag[],
  loading: boolean,
  currentRoute: string,
  bottomBorder?: boolean,
  promptText?: string,
  isShowAll?: boolean,
  isShowHot?: boolean,
  selectItem: (item: Tag) => void
}>()


const allType: Tag = {
  id: '-1',
  name: '全部'
}
const hotType: Tag = {
  id: '-2',
  name: '热门'
}
</script>

<template>
  <div class='switch-container' :class="{ 'bottom-border': bottomBorder }">
    <ul ref="switch">
      <li class="prompt-text" v-if="promptText">{{ promptText }}</li>
      <Skeleton v-if="loading && list.length === 0" :loading="loading" :animation="true" :rows="1"
        style="width: 80%;" />
      <template v-if="!loading || list.length !== 0">
        <li v-if="isShowAll" :class="{ active: currentRoute === allType.id }" @click="selectItem(allType)">{{
          allType.name }}</li>
        <li v-if="isShowHot" :class="{ active: currentRoute === hotType.id }" @click="selectItem(hotType)">{{
          hotType.name }}</li>
        <li v-for="item in list" :key="item.id" :class="{ active: currentRoute === item.id }" @click="selectItem(item)">
          {{ item.name }}</li>
      </template>
    </ul>
  </div>

</template>

<style scoped lang="scss">
.switch-container {
  background: var(--header-bg);

  ul {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 50px;
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: nowrap;
    flex-wrap: wrap;
    position: relative;
    padding-top: 5px;
    padding-bottom: 10px;
  }

  li {
    display: flex;
    align-items: center;

    // line-height: 30px;
    height: 30px;
    font-size: 16px;
    padding: 0 15px;
    cursor: pointer;
    color: var(--color-text-secondary);
    flex: 0 0 auto;


    &.prompt-text {
      padding-right: 0px;
    }

    &.active {
      background: var(--theme-blue-1);
      color: #fff;
      border-radius: 30px;
    }

    &.switch-more {
      text-align: center;
      position: absolute;
      top: 50%;
      width: 100px;
      // border: 1px solid red;
      transform: translateY(-50%);
      // bottom: 0;
      right: 0px;
      opacity: 1;
      background: var(--header-bg);
    }
  }
}


.bottom-border {
  border-bottom: 1px solid var(--color-border-light);
}
</style>