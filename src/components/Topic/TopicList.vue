<script setup lang='ts'>
import TopicItem from './TopicItem.vue';
import type { Topic } from '@/types/topic'
import Empty from '@/components/Empty/Empty.vue';
import Skeleton from '@/components/Skeleton/Skeleton.vue';
import { isShowInterface } from './type.d'


defineProps<{ list: Topic[], isShow?: Partial<isShowInterface>, loading: boolean, mode?: "no-border" }>()

</script>

<template>
  <div class='topic-list-container'>
    <Skeleton v-if="loading && list.length === 0" :loading="loading" :animation="true" :rows="8" :size="30"></skeleton>
    <template v-if="!loading || list.length !== 0">
      <topic-item v-for="(item, index) in list" :is-show="isShow" :key="index" :topic="item"
        style="margin-bottom: 20px;" :mode="mode"></topic-item>
    </template>
    <Empty v-if="!loading && list.length === 0" />
  </div>
</template>

<style scoped lang="scss"></style>