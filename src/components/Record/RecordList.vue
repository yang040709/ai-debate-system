<script setup lang='ts'>
import RecordItem from './RecordItem.vue';

import type { Record } from '@/types/record';


const items: Record[] = [
  {
    recordId: '1',
    title: '人工智能是否应该拥有法律人格？',
    status: '胜利',
    timeAgo: '2小时前',
    description: '随着人工智能技术飞速发展，强AI已展现出接近人类的自主决策能力，引发其法律地位的深刻争议。',
    tags: ['人工智能', '法律', '人格'],
    difficulty: '困难',
    scoreChange: 100
  },
  {
    recordId: '2',
    title: '人工智能是否应该拥有法律人格？',
    status: '失败',
    timeAgo: '2小时前',
    description: '随着人工智能技术飞速发展，强AI已展现出接近人类的自主决策能力，引发其法律地位的深刻争议。',
    tags: ['人工智能', '法律', '人格'],
    difficulty: '困难',
    scoreChange: -20
  },
  {
    recordId: '3',
    title: '人工智能是否应该拥有法律人格？',
    status: '胜利',
    timeAgo: '2小时前',
    description: '随着人工智能技术飞速发展，强AI已展现出接近人类的自主决策能力，引发其法律地位的深刻争议。',
    tags: ['人工智能', '法律', '人格'],
    difficulty: '困难',
    scoreChange: 100
  },
  {
    recordId: '4',
    title: '人工智能是否应该拥有法律人格？',
    status: '失败',
    timeAgo: '2小时前',
    description: '随着人工智能技术飞速发展，强AI已展现出接近人类的自主决策能力，引发其法律地位的深刻争议。',
    tags: ['人工智能', '法律', '人格'],
    difficulty: '困难',
    scoreChange: -20
  },
  {
    recordId: '5',
    title: '人工智能是否应该拥有法律人格？',
    status: '胜利',
    timeAgo: '2小时前',
    description: '随着人工智能技术飞速发展，强AI已展现出接近人类的自主决策能力，引发其法律地位的深刻争议。',
    tags: ['人工智能', '法律', '人格'],
    difficulty: '困难',
    scoreChange: 150
  }

]
</script>

<template>
  <div class='record-list-container'>
    <record-item v-for="item in items" :item="item" :key="item.recordId" />
  </div>
</template>

<style scoped lang="scss">
.record-list-container {
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
}
</style>