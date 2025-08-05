<script setup lang='ts'>
import type { Topic } from '@/types/topic';
import Skeleton from '@/components/Skeleton/Skeleton.vue';
import { useRouter } from 'vue-router';
import type { Tag } from '@/types/tag';

defineProps<{
  item: Topic,
  loading: boolean,
}>()

const router = useRouter();

const selectType = (item: Tag, type: "type" | "difficulty") => {
  if (type === "type") {
    router.push({
      name: "topic",
      params: {
        type: item.id,
        difficulty: "-1"
      }
    })
  }
  else if (type === "difficulty") {
    router.push({
      name: "topic",
      params: {
        type: "-1",
        difficulty: item.id
      }
    })
  }
}


</script>


<template>
  <div class='content-container'>
    <div class="topic-detail-content">
      <div class="main" v-if="!loading">
        <div class="header">
          <img class="avatar" :data-src="item.creator.avatar" alt="" v-placeholder-img>
          <p class="name">
            {{ item.creator.name }}
          </p>
          <ul>
            <li v-for="type in item.type" @click="selectType(type, 'type')">{{ type.name }}</li>
            <li class="difficulty" @click="selectType(item.difficulty, 'difficulty')">{{ item.difficulty.name }}</li>
          </ul>
        </div>
        <div class="content">
          <h2>{{ item.title }}</h2>
          <p>
            {{ item.desc }}
          </p>
        </div>
      </div>
      <Skeleton v-if="loading" :loading="loading" :animation="true" :rows="6" />
      <div class="bottom">
        <div class="join-debate">参与辩论</div>
        <!-- 分享功能？ -->
      </div>
    </div>
    <div class="topic-detail-info">
      <div class="info" v-if="!loading">
        <p>
          <span>
            参与人数
          </span>
          <strong>
            {{ item.participant_count }}
          </strong>
        </p>
        <p>
          <span>
            胜率
          </span>
          <strong>
            {{ item.winningRate }}%
          </strong>
        </p>
      </div>
      <div class="time" v-if="!loading">
        <p>创建于：{{ item.created_at }}</p>
      </div>
      <Skeleton v-if="loading" :loading="loading" :animation="true" :rows="6" />
    </div>
  </div>

</template>

<style scoped lang="scss">
.content-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
}

.topic-detail-content {
  padding: 20px;
  // background: var(--theme-gray-3);
  background: var(--theme-white-2);
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);


  .header {
    display: flex;
    align-items: center;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .name {
      font-size: 20px;
      padding: 0 10px;
      border-right: 1px solid #ccc;
    }

    ul {
      display: flex;
      align-items: center;
      margin: 0 10px;
      gap: 10px;

      li {
        display: flex;
        align-items: center;
        height: 30px;
        font-size: 16px;
        padding: 0 15px;
        cursor: pointer;
        color: var(--theme-blue-7);
        flex: 0 0 auto;
        background: var(--theme-blue-2);
        border-radius: 30px;

        &.difficulty {
          background: var(--theme-yellow-3);
          // color: #a19c5d;
          color: var(--theme-yellow-2);
        }
      }
    }
  }

  .content {
    h2 {
      font-size: 22px;
      line-height: 40px;
    }

    p {
      font-size: 16px;
      line-height: 30px;
    }
  }

  .bottom {
    margin: 10px 0;
    display: flex;
    align-items: center;

    .join-debate {
      display: flex;
      padding: 15px 50px;
      align-items: center;
      // width: 100%;
      justify-content: center;
      height: 40px;
      font-size: 16px;
      // padding: 0 20px;
      cursor: pointer;
      color: #fff;
      background: var(--theme-blue-4);
      border-radius: 5px;
    }
  }
}

.topic-detail-info {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span {
        display: block;
        font-size: 16px;
        line-height: 30px;
      }

      strong {
        display: block;
        font-size: 20px;
      }
    }
  }

  .time {
    p {
      padding-top: 20px;
      font-size: 16px;
    }
  }

  background: var(--theme-white-2);
}
</style>