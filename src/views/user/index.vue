<script setup lang="ts">
// import { useUserStore } from '@/stores/user'
// import EditModal from './edit-modal.vue'
import Info from './info.vue'
import RecordList from '@/components/Record/RecordList.vue'
import Head from './head.vue';
import ScrollTop from '@/components/ScrollTop/ScrollTop.vue';
import type { Record } from '@/types/record';

// const userStore = useUserStore()


const items1: Record[] = [
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




const items = [
  {
    label: "胜率",
    value: "89%"
  },
  {
    label: "场次",
    value: "128"
  },
  {
    label: "积分",
    value: "2890"
  }
]

</script>

<template>
  <div class="user-container">
    <div class="user-content">
      <div class="user-content-box">

        <Head></Head>
        <Info :items="items"></Info>
        <RecordList :items="items1" />
        <ScrollTop />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-container {
  width: 100vw;
  background: linear-gradient(180deg, var(--user-box-bg1), var(--footer-bg));

  .user-content {
    overflow: hidden;
    width: 80%;
    max-width: 1200px;
    transition: width 0.3s ease-in-out;
    margin: 0 auto;
    min-height: calc(90vh - $header-height);
    position: relative;
  }
}

.user-content-box {
  margin-top: 100px;
  width: 100%;
  background: var(--theme-white-1);
  border-radius: 8px;
  // height: 90%;
  position: relative;
  padding: 50px 25px;
  padding-top: 60px;
}
</style>
