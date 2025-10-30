<script setup lang='ts'>
import type { Topic } from '@/types/topic';
import Skeleton from '@/components/Skeleton/Skeleton.vue';
import { useRouter } from 'vue-router';
import type { Tag } from '@/types/tag';
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { useTagsStore } from '@/stores/tags';
import { storeToRefs } from 'pinia';
import { useQrcode } from '@/composables/useQrcode';
import { createDebate } from '@/api/debate'
import { useFetchData } from '@/composables/useFetchData';
import { CreateDebateRequest } from '@/types/debate';
import { Message } from '@arco-design/web-vue';
import { useDebateStore } from '@/stores/debate2';
const props = defineProps<{
  item: Topic,
  loading: boolean,
}>()

const router = useRouter();

const selectType = (item: Tag) => {
  router.push({
    name: "topic",
    params: {
      type: item.id,
    }
  })
}


const positionType = [
  { name: 'positive', id: "1", label: '正方' },
  { name: 'negative', id: "2", label: '反方' },
]

const form = ref<CreateDebateRequest>({
  topic: {
    title: '',
    desc: '',
  },
  difficulty: '中等',
  position: 'positive',
})


const formatDay = computed(() => {
  return dayjs(parseInt(props.item.created_at)).format('YYYY-MM-DD HH:mm:ss')
})


const { tagListData, tagListLoading } = storeToRefs(useTagsStore())

const submitFrom = computed(() => {
  /* 格式化为字符串或者进行其他处理 */
  return {
    theme: JSON.stringify(form.value),
  }
})

const { data, loading: submitFromLoading, fetchData } = useFetchData(createDebate, [submitFrom], {
  conversion_id: '',
  ctime: 0
})

const debateStore = useDebateStore();

const joinDebate = async () => {
  form.value.topic = {
    title: props.item.title,
    desc: props.item.desc,
  };
  if (submitFromLoading.value) {
    Message.warning('正在提交，请稍后再试');
    return;
  }
  fetchData().then(() => {
    debateStore.setConversionId(data.value.conversion_id);
    debateStore.setDebateData(form.value);
    router.push({
      name: "debate2"
    })
  })
}

const { QRcodeUrl } = useQrcode()



const debateRule = [
  {
    title: "立论陈词",
    content: "正反方各1.5分钟，仅需提出1个核心论点+1个论据（超时10秒即扣分）。",
  },
  {
    title: "质询对抗",
    content: "单轮混合质询（共3分钟）： - 反方提问→正方回答（1.5分钟）→立即切换正方提问→反方回答（1.5分钟）。",
  },
  {
    title: "自由辩论",
    content: "正方先发言，双方交替攻防，每次发言≤1 分钟。共 5分钟",
  },
  {
    title: "总结陈词",
    content: "反方→正方各2分钟，需融合反驳与立论，禁止新论据。",
  },
]


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
            <li v-for="type in item.type" @click="selectType(type)" :key="type.id">{{ type.name }}</li>
            <!-- <li class="difficulty" @click="selectType(item.difficulty, 'difficulty')">{{ item.difficulty.name }}</li> -->
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
        <div class="select">
          <div class="select-item" v-loading="tagListLoading">
            <span>难度:</span>
            <a-radio-group type="button" v-model="form.difficulty">
              <a-radio v-for="item in tagListData.difficulty" :value="item.name" :key="item.id">{{ item.name
                }}</a-radio>
            </a-radio-group>
          </div>
          <div class="select-item">
            <span>立场:</span>
            <a-radio-group type="button" v-model="form.position">
              <a-radio v-for="item in positionType" :value="item.name" :key="item.id">{{ item.label }}</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div class="very-bottom">
          <div class="join-debate" @click="joinDebate">参与辩论</div>
          <!-- 分享功能？ -->
          <div class="item">
            <a-dropdown>
              <div class="text">
                <icon-share-external :size="20" />
                <span>
                  分享
                </span>
              </div>
              <template #content>
                <div class="dropdown-content" style="padding: 10px 5px;">
                  <p style="text-align: center;" class="qrcode-dsc">扫码查看</p>
                  <img v-if="QRcodeUrl" class="qrcode" :src="QRcodeUrl" alt="二维码">
                </div>
              </template>
            </a-dropdown>
          </div>
        </div>
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
        <p>创建于：{{ formatDay }}</p>
      </div>
      <div class="rule">
        <div class="title">规则:</div>
        <p v-for="rule in debateRule" :key="rule.title">
          <strong>
            {{ rule.title }}:
          </strong>
          {{ rule.content }}
        </p>
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
    margin-top: 100px;

    .select {
      .select-item {
        // display: flex;
        font-size: 16px;
        margin-bottom: 15px;

        // flex-wrap: wrap;
        &>span {
          font-weight: 700;
          flex: 0 0 auto;
          display: block;
          color: var(--color-text-primary);
          margin-bottom: 3px;
        }
      }
    }

    .very-bottom {
      margin: 10px 0;
      display: flex;
      align-items: center;
      gap: 20px;

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

      .item {
        font-size: 16px;

        .text {
          display: flex;
          align-items: center;
          cursor: default;

          span {
            margin-left: 3px;
          }
        }

      }


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

  .rule {
    margin-top: 80px;

    .title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    p {
      line-height: 1.2em;
      margin-bottom: 8px;

      strong {
        display: block;
      }
    }
  }

  background: var(--theme-white-2);
}

:deep(.arco-radio-group-direction-horizontal) {
  width: fit-content;
}
</style>