<script setup lang='ts'>
import HomeItem from './home-item.vue'
import StartDebate from '@/components/StartDebate/StartDebate.vue'
import TopicList from '@/components/Topic/TopicList.vue'
import RankingList from '@/components/Ranking/RankingList.vue'
import createTopic from '@/components/CreateTopic/CreateTopic.vue'
import TagList from '@/components/Tag/TagList.vue'
import { useFetchData } from '@/composables/useFetchData'
import { getTagListApi } from '@/api/tag'
import { getTopicListApi } from '@/api/topic';
import { getRankingListApi } from '@/api/ranking';
import { useTagsStore } from '@/stores/tags'
import { storeToRefs } from 'pinia'
const isShow = {
  comment: false,
  support: true,
  tags: true,
  desc: false,
  difficulty: true
}



// const { data: tagListData, loading: tagListLoading, fetchData: fetchTagData } = useFetchData(getTagListApi, '获取标签失败', [], [])
const { data: topicListData, loading: topicListLoading, fetchData: fetchTopicListData } = useFetchData(getTopicListApi, '获取话题失败', [], [])
const { data: rankingListData, loading: rankingListLoading, fetchData: fetchRankingListData } = useFetchData(getRankingListApi, '获取排名失败', [], [])
const { tagListData, tagListLoading } = storeToRefs(useTagsStore())

fetchTopicListData();
fetchRankingListData();

</script>

<template>
  <div class='home-container'>
    <home-item>
      <start-debate></start-debate>
    </home-item>

    <div class="home-content">
      <div class="content-left">
        <home-item title="热门辩论话题" :link="{ text: '查看更多', routerName: 'topic' }">
          <topic-list :loading="topicListLoading" :list="topicListData" :is-show="isShow"></topic-list>
        </home-item>
        <home-item title="排行榜" :link="{ text: '查看更多', routerName: 'rank' }">
          <ranking-list :loading="rankingListLoading" :list="rankingListData"></ranking-list>
        </home-item>
      </div>
      <div class="content-right">
        <home-item title="创建辩论话题" :link="{ routerName: 'creative' }">
          <create-topic></create-topic>
        </home-item>
        <home-item title="标签" :link="{ routerName: 'topic' }">
          <tag-list :loading="tagListLoading" :list="tagListData.type" />
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