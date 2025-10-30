<script setup lang='ts'>
import Skeleton from '@/components/Skeleton/Skeleton.vue';
import type { Tag } from '@/types/tag'

defineProps<{
  list: Tag[],
  loading: boolean,//是否正在加载
  currentRoute: string,
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
  <div class='switch-container'>
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
  border-bottom: 1px solid var(--color-border-light);

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
    height: 30px;
    font-size: 16px;
    padding: 0 15px;
    cursor: pointer;
    color: var(--color-text-secondary);
    flex: 0 0 auto;
    border-radius: 30px;
    transition: all 0.3s ease-in-out;

    &.prompt-text {
      padding-right: 0px;
    }

    &.active {
      background: var(--theme-blue-1);
      color: #fff;
    }

    &:hover {
      background: var(--theme-blue-3);
      color: #fff;
    }
  }
}
</style>