<script setup lang='ts'>
import HomeItem from './home-item.vue'
import StartDebate from '@/components/StartDebate/StartDebate.vue'
import TopicList from '@/components/Topic/TopicList.vue'
import RankingList from '@/components/Ranking/RankingList.vue'
import createTopic from '@/components/CreateTopic/CreateTopic.vue'
import TagList from '@/components/Tag/TagList.vue'
import { useFetchData } from '@/composables/useFetchData'
import { getTopicListApi } from '@/api/topic';
import { getRankingListApi } from '@/api/ranking';
import { useTagsStore } from '@/stores/tags'
import { storeToRefs } from 'pinia'
import type { GetTopicListParams } from '@/types/topic'
import { ref } from 'vue'
import { TOPIC_TYPE } from '@/constant/topic'

const isShow = {
  tags: true,
}

const params = ref<GetTopicListParams>({
  page: 0,
  limit: 8,
  type: TOPIC_TYPE.RECOMMEND_TYPE
});

// 获取推荐的话题
const { data: topicListData, loading: topicListLoading, fetchData: fetchTopicListData } = useFetchData(getTopicListApi, [params], { total: 0, list: [] })
// 获取排行榜
const { data: rankingListData, loading: rankingListLoading, fetchData: fetchRankingListData } = useFetchData(getRankingListApi, [], { list: [] })
// 获取标签
const { tagListData, tagListLoading } = storeToRefs(useTagsStore())

// 获取推荐的话题数据
fetchTopicListData();
// 获取排行榜数据
fetchRankingListData();


</script>

<template>
  <div class='home-container'>
    <home-item>
      <start-debate :list="topicListData.list"></start-debate>
    </home-item>
    <div class="home-content">
      <div class="content-left">
        <home-item title="热门辩论话题" :link="{ text: '查看更多', routerName: 'topic' }" :params="{ type: '-2' }">
          <topic-list :loading="topicListLoading" :list="topicListData.list" :is-show="isShow"></topic-list>
        </home-item>
        <home-item title="排行榜" :link="{ text: '查看更多', routerName: 'rank' }">
          <ranking-list :loading="rankingListLoading" :list="rankingListData.list"></ranking-list>
        </home-item>
      </div>
      <div class="content-right">
        <home-item title="创建辩论话题" :link="{ routerName: 'creative' }">
          <create-topic></create-topic>
        </home-item>
        <home-item title="标签" :link="{ routerName: 'topic' }" :params="{ type: '-1' }">
          <tag-list :loading="tagListLoading" :list="tagListData.tag" />
        </home-item>
      </div>
    </div>
    <router-link to="/debate2"> debate2</router-link>
    <!-- <Skeleton :loading="true" /> -->
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