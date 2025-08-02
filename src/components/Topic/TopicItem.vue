<script setup lang='ts'>
import { useRouter } from 'vue-router';
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

// const props = defineProps<{
//   topic: Topic
//   isShow?: isShow
// }>()



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


const gotoTopicPage = (tag: string, type: "type" | "difficulty") => {
  if (type === "type") {
    router.push({
      name: 'topic',
      params: {
        type: tag,
        difficulty: "全部"
      },
    });
  } else if (type === "difficulty") {
    router.push({
      name: 'topic',
      params: {
        type: "全部",
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
        <div v-if="topic.support_count && isShow?.support">
          <icon-user-group :size="18" />
          <p>
            支持率 {{ topic.support_count }}%
          </p>
        </div>
        <div v-if="topic.comment_count && isShow?.comment">
          <icon-message :size="18" />
          <p>
            {{ topic.comment_count }}条评论
          </p>
        </div>
        <div v-if="topic.tags && topic.tags.length && isShow?.tags" class="canJumpTo">
          <icon-tags :size="18" />
          <p v-for="(item, index) in topic.tags" :key="index" @click="gotoTopicPage(item, 'type')">
            {{ item }}
          </p>
        </div>
        <div v-if="topic.difficulty && isShow?.difficulty" class="canJumpTo">
          <icon-question-circle :size="18" />
          <p @click="gotoTopicPage(topic.difficulty, 'difficulty')"> {{ topic.difficulty }}</p>
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
