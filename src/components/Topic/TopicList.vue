<script setup lang='ts'>
import TopicItem from './TopicItem.vue';
const arr = [
  {
    id: "aa45ac484cc",
    title: "人工智能是否应该拥有法律人格？",
    content: "人工智能是否应该拥有法律人格？",
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
    title: "人工智能是否应该拥有法律人格？",
    content: "人工智能是否应该拥有法律人格？",
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
    title: "人工智能是否应该拥有法律人格？",
    content: "人工智能是否应该拥有法律人格？",
    created_at: "2023-05-01 12:00:00",
    participant_count: 200,
    status: "open",
    creator: { name: "张三", avatar: "https://avatars.githubusercontent.com/u/12345678?v=4" },
    tags: ["人工智能", "法律", "人格"],
    support_count: 120,
    comment_count: 248,
  }
]
</script>

<template>
  <div class='topic-list-container'>
    <topic-item v-for="item in arr" :key="item.id" :topic="item" style="margin-bottom: 20px;"></topic-item>
  </div>
</template>

<style scoped lang="scss"></style>