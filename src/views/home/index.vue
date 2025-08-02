<script setup lang='ts'>
import HomeItem from './home-item.vue'
import StartDebate from '@/components/StartDebate/StartDebate.vue'
import TopicList from '@/components/Topic/TopicList.vue'
import RankingList from '@/components/Ranking/RankingList.vue'
import createTopic from '@/components/CreateTopic/CreateTopic.vue'
import TagList from '@/components/Tag/TagList.vue'



const obj = {
  id: "aa45ac484cc",
  title: "人工智能是否应该拥有法律人格？", difficulty: "困难",
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

const arr = [
  {
    ranking: 1,
    name: '张三',
    winningRate: '89%',
    score: 2890
  },
  {
    ranking: 2,
    name: '张三',
    winningRate: '89%',
    score: 2890,
    avatar: "https://ui-avatars.com/api/?name=P&background=random"
  },
  {
    ranking: 3,
    name: '张三',
    winningRate: '89%',
    score: 2890,
    avatar: "https://ui-avatars.com/api/?name=Z&background=random"
  },
  {
    ranking: 4,
    name: '张三',
    winningRate: '89%',
    score: 2890
  },
  {
    ranking: 5,
    name: '张三',
    winningRate: '89%',
    score: 2890
  },
  {
    ranking: 6,
    name: '张三',
    winningRate: '89%',
    score: 2890
  }
]
const arr2 = [
  {
    id: "aa45ac484cc",
    title: "人工智能是否应该拥有法律人格？", difficulty: "困难",
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
    title: "人工智能是否应该拥有法律人格？", difficulty: "困难",
    desc: "随着人工智能技术飞速发展，强AI已展现出接近人类的自主决策能力，引发其法律地位的深刻争议。",
    created_at: "2023-05-01 12:00:00",
    participant_count: 200,
    status: "open",
    creator: { name: "张三", avatar: "https://avatars.githubusercontent.com/u/12345678?v=4" },
    tags: ["人工智能", "法律", "人格"],
    // support_count: 120,
    // comment_count: 248,
  },
  {
    id: "aa45ac484cc",
    title: "人工智能是否应该拥有法律人格？", difficulty: "困难",
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
    title: "人工智能是否应该拥有法律人格？", difficulty: "困难",
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
    title: "人工智能是否应该拥有法律人格？", difficulty: "困难",
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
    title: "人工智能是否应该拥有法律人格？", difficulty: "困难",
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


const isShow = {
  comment: false,
  support: true,
  tags: true,
  desc: false,
  difficulty: true
}
</script>

<template>
  <div class='home-container'>
    <home-item>
      <start-debate></start-debate>
    </home-item>

    <div class="home-content">
      <div class="content-left">
        <home-item title="热门辩论话题" :link="{ text: '查看更多', routerName: 'topicAll' }">
          <topic-list :list="arr2" :is-show="isShow"></topic-list>
        </home-item>
        <home-item title="排行榜" :link="{ text: '查看更多', routerName: 'rank' }">
          <ranking-list :list="arr"></ranking-list>
        </home-item>
      </div>
      <div class="content-right">
        <home-item title="创建辩论话题" :link="{ routerName: 'creative' }">
          <create-topic></create-topic>
        </home-item>
        <home-item title="标签" :link="{ routerName: 'topicAll' }">
          <tag-list></tag-list>
        </home-item>
      </div>
    </div>

    <div>
      <router-link to="/test1">去往测试页1</router-link>
      <br>
      <router-link to="/test2">去往测试页2</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-content {
  display: grid;
  grid-template-columns: 2fr 380px;
}

.ranking-container {
  width: 60%;
}

.test-container {
  display: flex;
}
</style>