<script setup lang='ts'>
// import TopicItem from '@/components/Topic/TopicItem.vue'
// import RankingItem from '@/components/Ranking/RankingItem.vue'
import StartDebate from '@/components/StartDebate/StartDebate.vue'
import HomeItem from './home-item.vue'
import TopicList from '@/components/Topic/TopicList.vue'
import RankingList from '@/components/Ranking/RankingList.vue'
import createTopic from '@/components/CreateTopic/CreateTopic.vue'
import TagList from '@/components/Tag/TagList.vue'
const obj = {
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

const obj2 = {
  ranking: 1,
  name: '张三',
  winningRate: '89%',
  score: 2890
}


</script>

<template>
  <div class='home-container'>
    <home-item>
      <start-debate></start-debate>
    </home-item>

    <div class="home-content">
      <div class="content-left">
        <home-item title="热门话题" :link="{ text: '查看更多', href: '/about' }">
          <topic-list></topic-list>
        </home-item>
        <home-item title="排行榜" :link="{ text: '查看更多', href: '/about' }">
          <ranking-list></ranking-list>
        </home-item>
      </div>
      <div class="content-right">
        <home-item title="创建辩论话题">
          <create-topic></create-topic>
        </home-item>
        <home-item title="标签">
          <tag-list></tag-list>
        </home-item>
      </div>


    </div>
    <!-- <div class="test-container">
      <home-item title="热门话题" :link="{ text: '查看更多', href: '/about' }" style="width: 50%;">
        <topic-item :topic="obj"></topic-item>
        <topic-item :topic="obj"></topic-item>
        <topic-item :topic="obj"></topic-item>
        <topic-item :topic="obj"></topic-item>
      </home-item>
      <home-item title="排行榜" :link="{ text: '查看更多', href: '/about' }" style="width: 50%;">
        <ranking-item :rank="obj2"></ranking-item>
        <ranking-item :rank="obj2"></ranking-item>
        <ranking-item :rank="obj2"></ranking-item>
      </home-item>
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.home-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
}

.home-content {
  display: grid;
  grid-template-columns: 2fr 380px;

  .content-left {}

  .content-right {}
}

.ranking-container {
  width: 60%;
}

.test-container {
  display: flex;
}
</style>