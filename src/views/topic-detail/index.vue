<script setup lang='ts'>
import TopicList from '@/components/Topic/TopicList.vue';
import { useFetchData } from '@/composables/useFetchData'
import { getTopicListApi } from '@/api/topic';
import type { GetTopicListParams } from '@/types/topic'
import { getTopicApi } from '@/api/topic'
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue'
import Content from './content.vue';
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';


const props = defineProps<{
  id: string
}>()

const router = useRouter();

const params = ref<GetTopicListParams>({
  page: 0,
  limit: 5,
  type: '-2',
}
);

const isShow = {
  comment: false,
  support: true,
  tags: true,
  desc: false,
  difficulty: true
}


const id = computed(() => {
  return props.id as string
})

const { data, loading, fetchData } = useFetchData(getTopicApi, [id], {
  id: "",
  title: "",
  desc: "",
  created_at: "",
  participant_count: 0,
  creator: {
    name: "",
    avatar: "",
  },
  type: [
    {
      id: "",
      name: "",
    }
  ],
  winningRate: 0,
  comment_count: 0,
}, {
  handleErr: (e) => {
    console.log(e, "<==err")
    Message.error("该话题的id无效，将跳转到404页面")
    router.replace({ name: "not-find" })
  }
})


const { data: topicListData, loading: topicListLoading, fetchData: fetchTopicListData } =
  useFetchData(getTopicListApi, [params], { total: 0, list: [] })
fetchData()
fetchTopicListData();

</script>

<template>
  <div class='topic-detail-container'>
    <div class="topic-detail-box">
      <Content :item="data" :loading="loading" />
      <div class="topic-detail-recommend">
        <p>相关推荐</p>
        <topic-list :loading="topicListLoading" mode="border" :list="topicListData.list" :is-show="isShow"></topic-list>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.topic-detail-container {
  padding: 20px 40px;
  background: var(--theme-gray-5);
}

.topic-detail-box {
  max-width: 1200px;
  margin: 0 auto;

}

.topic-detail-recommend {
  margin-top: 60px;
  padding: 20px;
  background: var(--theme-white-2);
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  p {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
  }
}
</style>