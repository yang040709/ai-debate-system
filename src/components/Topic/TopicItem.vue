<script setup lang='ts'>
import { useRouter } from 'vue-router';
import type { Topic } from '@/types/topic'

const props = defineProps<{
  topic: Topic
  isShowDesc?: boolean
}>()


const router = useRouter();
const handleClick = () => {
  console.log("点击了XXXXXX,前往xxx", props.topic);
}

</script>

<template>
  <div class='topic-item-container'>
    <div class="topic-top">
      <h4>{{ topic.title }}</h4>
      <span>{{ topic.participant_count }}人参与</span>
    </div>
    <div class="topic-desc" v-if="isShowDesc">
      {{ topic.desc }}
    </div>
    <div class="topic-bottom">
      <div class="topic-info">
        <div v-if="topic.support_count">
          <icon-user-group :size="18" />
          <p>
            支持率 {{ topic.support_count }}%
          </p>
        </div>
        <div v-if="topic.comment_count">
          <icon-message :size="18" />
          <p>
            {{ topic.comment_count }}条评论
          </p>
        </div>
        <div v-if="topic.tags && topic.tags.length">
          <icon-tags :size="18" />
          <p v-for="(item, index) in topic.tags" :key="index">
            {{ item }}
          </p>
        </div>
      </div>
      <a @click.prevent="handleClick">参加讨论<icon-arrow-right :size="18" /></a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.topic-item-container {
  width: 100%;
  min-height: 88px;
  background: var(--theme-gray-2);
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  .topic-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h4 {
      font-size: 16px;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    span {
      color: var(--theme-blue-1);
    }
  }


  .topic-desc {
    margin: 15px 0;
    font-size: 14px;
    padding-right: 100px;
    color: var(--theme-gray-1);
  }

  .topic-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &>a {
      color: var(--theme-blue-6);
      display: flex;
      align-items: center;
    }
  }

  .topic-info {
    display: flex;
    align-items: center;
    gap: 18px;
    color: var(--theme-gray-1);

    &>div {
      display: flex;
      align-items: center;

      p {
        margin-left: 5px;
      }
    }

  }


  &:hover {
    background: var(--theme-gray-2-hover);
  }

}
</style>
