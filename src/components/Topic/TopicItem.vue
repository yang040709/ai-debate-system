<script setup lang='ts'>
import { useRouter, useRoute } from 'vue-router';
import type { Topic } from '@/types/topic'


interface isShow {
  comment: boolean,
  support: boolean,
  tags: boolean,
  desc: boolean,
  difficulty: boolean
}


const props = withDefaults(defineProps<{
  topic: Topic
  isShow?: Partial<isShow>  // 使用 Partial 使属性可选
  mode?: "gray" | "border"
}>(), {
  isShow: () => ({
    comment: true,
    support: true,
    tags: true,
    desc: true,
    difficulty: false
  })
})


const router = useRouter();

const gotoDebatePage = () => {
  router.push({
    name: 'topicDetail',
    params: {
      id: props.topic.id,
    },
  });
}


const gotoTopicPage = (tag: string) => {
  router.push({
    name: 'topic',
    params: {
      type: tag,
    },
  });
}

</script>

<template>
  <div class='topic-item-container' :class="{ border: mode === 'border' }">
    <div class="topic-top">
      <h4 @click="gotoDebatePage">{{ topic.title }}</h4>
      <span>{{ topic.participant_count }}人参与</span>
    </div>
    <div class="topic-desc" v-if="isShow?.desc">
      {{ topic.desc }}
    </div>
    <div class="topic-bottom">
      <div class="topic-info">
        <div v-if="topic.winningRate && isShow?.support">
          <icon-user-group :size="18" />
          <p>
            胜率 {{ topic.winningRate }}%
          </p>
        </div>
        <div v-if="topic.comment_count && isShow?.comment">
          <icon-message :size="18" />
          <p>
            {{ topic.comment_count }}条评论
          </p>
        </div>
        <div v-if="topic.type && topic.type.length && isShow?.tags" class="canJumpTo">
          <icon-tags :size="18" />
          <p v-for="(item, index) in topic.type" :key="index" @click="gotoTopicPage(item.id)">
            {{ item.name }}
          </p>
        </div>
      </div>
      <a @click.prevent="gotoDebatePage">参加辩论<icon-arrow-right :size="18" /></a>
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
  // cursor: pointer;

  .topic-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h4 {
      font-size: 16px;
      font-weight: 700;
      color: var(--color-text-primary);
      cursor: pointer;

      &:hover {
        color: var(--color-text-primary-hover);
      }
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
    @include text-ellipsis(2);
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

  .canJumpTo {
    p {
      cursor: pointer;

      &:hover {
        color: var(--theme-blue-5-hover);
      }
    }
  }
}

.topic-item-container.border {
  background: transparent;
  border-radius: 0;
  border-bottom: 1px solid var(--theme-gray-5);
}
</style>
