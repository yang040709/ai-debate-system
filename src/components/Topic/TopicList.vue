<script setup lang='ts'>
import TopicItem from './TopicItem.vue';
import type { Topic } from '@/types/topic'

defineProps<{ list: Topic[] }>()


</script>

<template>
  <div class='topic-list-container'>
    <topic-item v-for="item in list" :key="item.id" :topic="item" :is-show-desc="true"
      style="margin-bottom: 20px;"></topic-item>
  </div>
</template>

<style scoped lang="scss"></style>