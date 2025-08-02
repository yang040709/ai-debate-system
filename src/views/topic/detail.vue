<script setup lang='ts'>
import TopicList from '@/components/Topic/TopicList.vue';
import { watch } from 'vue'
// const props = defineProps({
//   type: {
//     type: String,
//     default: "全部"
//   }
// })

// watch(() => props.type, (newVal) => {
//   console.log("获取数据", newVal);
// })


const arr = [
  {
    id: "aa45ac484cc",
    title: "人工智能是否应该拥有法律人格？", difficulty: "difficult",
    desc: "随着人工智能技术飞速发展，强AI已展现出接近人类的自主决策能力，引发其法律地位的深刻争议。",
    created_at: "2023-05-01 12:00:00",
    participant_count: 200,
    status: "open",
    creator: { name: "张三", avatar: "https://avatars.githubusercontent.com/u/12345678?v=4" },
    tags: ["人工智能", "法律", "人格"],
    // support_count: 120,
    comment_count: 248,
  },
  {
    id: "aa45ac484cc",
    title: "人工智能是否应该拥有法律人格？", difficulty: "difficult",
    desc: "随着人工智能技术飞速发展，强AI已展现出接近人类的自主决策能力，引发其法律地位的深刻争议。",
    created_at: "2023-05-01 12:00:00",
    participant_count: 200,
    status: "open",
    creator: { name: "张三", avatar: "https://avatars.githubusercontent.com/u/12345678?v=4" },
    tags: ["人工智能", "法律", "人格"],
    support_count: 120,
    comment_count: 248,
  },
  {
    id: "aa45ac484cc",
    title: "人工智能是否应该拥有法律人格？", difficulty: "difficult",
    desc: "随着人工智能技术飞速发展，强AI已展现出接近人类的自主决策能力，引发其法律地位的深刻争议。",
    created_at: "2023-05-01 12:00:00",
    participant_count: 200,
    status: "open",
    creator: { name: "张三", avatar: "https://avatars.githubusercontent.com/u/12345678?v=4" },
    // tags: ["人工智能", "法律", "人格"],
    support_count: 120,
    comment_count: 248,
  },
  {
    id: "aa45ac484cc",
    title: "人工智能是否应该拥有法律人格？", difficulty: "difficult",
    desc: "随着人工智能技术飞速发展，强AI已展现出接近人类的自主决策能力，引发其法律地位的深刻争议。",
    created_at: "2023-05-01 12:00:00",
    participant_count: 200,
    status: "open",
    creator: { name: "张三", avatar: "https://avatars.githubusercontent.com/u/12345678?v=4" },
    tags: ["人工智能", "法律", "人格"],
    // support_count: 120,
    comment_count: 248,
  },
  {
    id: "aa45ac484cc",
    title: "人工智能是否应该拥有法律人格？", difficulty: "difficult",
    desc: "随着人工智能技术飞速发展，强AI已展现出接近人类的自主决策能力，引发其法律地位的深刻争议。",
    created_at: "2023-05-01 12:00:00",
    participant_count: 200,
    status: "open",
    creator: { name: "张三", avatar: "https://avatars.githubusercontent.com/u/12345678?v=4" },
    // tags: ["人工智能", "法律", "人格"],
    support_count: 120,
    comment_count: 248,
  },
  {
    id: "aa45ac484cc",
    title: "人工智能是否应该拥有法律人格？", difficulty: "difficult",
    desc: "随着人工智能技术飞速发展，强AI已展现出接近人类的自主决策能力，引发其法律地位的深刻争议。",
    created_at: "2023-05-01 12:00:00",
    participant_count: 200,
    status: "open",
    creator: { name: "张三", avatar: "https://avatars.githubusercontent.com/u/12345678?v=4" },
    tags: ["人工智能", "法律", "人格"],
    support_count: 120,
    // comment_count: 248,
  }
]
</script>

<template>
  <div class='topic-detail-container'>
    <topic-list :list="arr"></topic-list>
    <div>
      <!-- {{ type }} -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.topic-detail-container {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  // padding-top: 20px;
  padding: 20px;

}
</style>