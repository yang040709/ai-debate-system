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
const handleClick = () => {
  console.log("点击了XXXXXX,前往xxx", props.topic);
}


const gotoDebatePage = () => {
  router.push({
    name: 'debate',
    params: {
      id: props.topic.id,
    },
  });
}


const route = useRoute();

const gotoTopicPage = (tag: string, type: "type" | "difficulty") => {
  if (type === "type") {
    router.push({
      name: 'topic',
      params: {
        type: tag,
        difficulty: route.params.difficulty || "-1",
      },
    });
  } else if (type === "difficulty") {
    router.push({
      name: 'topic',
      params: {
        type: route.params.type || "-1",
        difficulty: tag
      },
    });
  }
}

</script>

<template>
  <div class='topic-item-container'>
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
          <p v-for="(item, index) in topic.type" :key="index" @click="gotoTopicPage(item.id, 'type')">
            {{ item.name }}
          </p>
        </div>
        <div v-if="topic.difficulty && isShow?.difficulty" class="canJumpTo">
          <icon-question-circle :size="18" />
          <p @click="gotoTopicPage(topic.difficulty.id, 'difficulty')">
            {{ topic.difficulty.name }}</p>
        </div>
      </div>
      <a @click.prevent="handleClick">参加辩论<icon-arrow-right :size="18" /></a>
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

  .canJumpTo {
    p {
      cursor: pointer;

      &:hover {
        color: var(--theme-blue-5-hover);
      }
    }
  }
}
</style>
