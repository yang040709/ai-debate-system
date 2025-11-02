<script setup lang='ts'>
import type { DebateHistory } from '@/types/history';
import dayjs from 'dayjs'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';


interface RecordItemProps {
  item: DebateHistory;
  navTo?: 'historyDetail' | 'debateResult'
}

const { item, navTo = 'historyDetail' } = defineProps<RecordItemProps>();

const itemDate = computed(() => {
  return dayjs(item.info.created_at).fromNow()
})

const router = useRouter()
const navToHistoryDetail = () => {
  if (navTo === 'debateResult') {
    router.push({
      name: 'debateResult',
      params: {
        id: item.history_id || defaultParamsId.value
      }
    })
    return
  }
  else {
    router.push({
      name: 'debateDetail',
      params: {
        id: item.info.debate_id
      }
    })
  }
}

const defaultParamsId = ref("123456")

</script>

<template>
  <div class='record-item-container'>
    <div class="record-top">
      <h4 @click="navToHistoryDetail">{{ item.info.topic.title }}</h4>
      <span :class="item.result.info.isWin === true ? 'win' : 'lose'">{{ item.result.info.isWin ===
        true ? '胜利' : '失败' }}</span>
    </div>
    <!-- <div class="record-who">
      您 vs AI助手 · {{ item.timeAgo }}
    </div> -->
    <div class="record-who">
      {{ itemDate }}
    </div>
    <div class="record-desc">
      {{ item.info.topic.desc }}
    </div>
    <!-- 下面是可扩展内容，这里先不写 -->
    <!-- <div class="record-bottom">
      <div class="record-info">
        <div>
          <icon-tags :size="18" />
          <p>人工智能</p>
          <p>法律</p>
          <p>人格</p>
        </div>
        <div class="canJumpTo">
          <icon-question-circle :size="18" />
          <p> 困难</p>
        </div>
      </div>
    </div> -->
    <div class="record-result">
      <span :class="item.result.info.isWin === true ? 'win' : 'lose'">得分{{
        item.result.info.comprehensiveScore }}</span>
      <!-- {{ item.info.debate_id }} -->
      <template v-if="navTo === 'historyDetail'">
        <router-link :to="{
          name: 'historyDetail',
          params: {
            id: item.history_id || defaultParamsId
          }
        }">查看记录<icon-caret-right :size="18" /></router-link>
      </template>
      <template v-else>
        <router-link :to="{
          name: 'debateResult',
          params: {
            id: item.history_id || defaultParamsId
          }
        }">查看辩论结果分析<icon-caret-right :size="18" /></router-link>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.record-item-container {
  width: 100%;
  min-height: 88px;
  background: var(--theme-gray-2);
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--color-border-light);
  // cursor: pointer;

  .record-top {
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
      font-size: 16px;
      font-weight: 700;

      &.win {
        color: var(--theme-green-1);
      }

      &.lose {
        color: var(--theme-red-1);
      }
    }
  }

  .record-who {
    margin: 5px 0 20px 0;
    font-size: 14px;
    padding-right: 100px;
    color: var(--theme-gray-1);
  }

  .record-desc {
    margin: 0 0 20px 0;
    font-size: 14px;
    padding-right: 100px;
    color: var(--theme-gray-1);
  }

  .record-bottom {
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    color: var(--theme-gray-1);
  }

  .record-result {
    margin: 5px 0 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--theme-gray-1);
    font-size: 16px;

    span {
      font-weight: 700;
      ;

      &.win {
        color: var(--theme-blue-1);
      }

      &.lose {
        color: var(--theme-red-1);
      }
    }

    &>a {
      color: var(--theme-blue-7);
      display: flex;
      align-items: center;
    }
  }

  .record-info {
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


  // &:hover {
  //   background: var(--theme-gray-2-hover);
  // }

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
