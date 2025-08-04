<script setup lang='ts'>
import TopicItem from './TopicItem.vue';
import type { Topic } from '@/types/topic'
interface isShow {
  comment: boolean,
  support: boolean,
  tags: boolean,
  desc: boolean,
  difficulty: boolean
}

defineProps<{ list: Topic[], isShow?: isShow, loading: boolean }>()


</script>

<template>
  <div class='topic-list-container'>
    <a-skeleton animation :loading="loading">
      <a-skeleton-line :rows="10">123</a-skeleton-line>
    </a-skeleton>
    <template v-if="!loading">
      <topic-item v-for="(item, index) in list" :is-show="isShow" :key="index" :topic="item"
        style="margin-bottom: 20px;"></topic-item>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>