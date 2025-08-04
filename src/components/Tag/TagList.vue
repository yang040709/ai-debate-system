<script setup lang='ts'>
import TagItem from './TagItem.vue';
import Skeleton from '@/components/Skeleton/Skeleton.vue';
import type { Tag } from '@/types/tag'

const colors = ["var(--theme-tag-1)", "var(--theme-tag-2)", "var(--theme-tag-3)", "var(--theme-tag-4)", "var(--theme-tag-5)"]


defineProps<{
  list: Tag[]
  loading: boolean
}>()

</script>

<template>
  <div class='tag-list-container'>
    <Skeleton v-if="loading" :loading="true" :animation="true" :rows="8" />
    <div v-if="!loading" class="tag-list">
      <tag-item v-for="(item, index) in list" :color="colors[index % colors.length]" :id="item.id"
        :name="item.name"></tag-item>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tag-list {
  width: 100%;
  display: grid;
  min-height: 300px;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  // background: var(--theme-gray-2);
  // border-radius: 20px;
}
</style>
