<script setup lang="ts">
import chat from './chat.vue'
import ReturnHome from '@/components/ReturnHome/ReturnHome.vue';
import ToggleDark from '@/components/ToggleDark/ToggleDark.vue';
import { getDebateInfo } from '@/api/debate';
import type { Debate } from '@/types/debate';
import { useFetchData } from '@/composables/useFetchData';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref, nextTick, toRef } from 'vue';
import { createDebateStages } from './config'
import $bus from '@/eventBus'
const route = useRoute();
const id = computed(() => {
  return route.params.id.toString();
})


const defaultValue: Debate = {
  id: "",
  topic: {
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
  },
  difficulty: {
    id: "",
    name: "",
  },
  position: {
    id: "",
    name: "",
  },
  content: '',
  duration: 0,
  state: -1
}


const { data, loading, fetchData } = useFetchData(getDebateInfo, [id], defaultValue)

fetchData().then(() => {
  console.log(data);
});



/* 当前的辩论阶段 */
const currentStageIndex = ref(0);


const debateStages = createDebateStages();

const isStreamLoad = ref(false)




/* 倒计时 */
const countDown = ref(0);
const isPause = ref(false);
// const isTimeOut = ref(false);

const countDownRun = async () => {
  const stages = currentStageIndex.value;
  /* 
  如果倒计时不为0且当前还在这个阶段就一直倒计时
  */
  while (countDown.value >= 0 && stages === currentStageIndex.value) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (isPause.value) {
      continue;
    }
    if (countDown.value === 0) {
      // 如果时间为0，则进入下一个阶段
      // console.log("进入下一个阶段");
      if (currentStageIndex.value === 2 && isStreamLoad.value === false) {
        // currentStageIndex.value++;
        handleDebateStage("timeOut", currentStageIndex.value)
      }
      else {
        console.log("已经超时，警告！！！");
      }
      continue;
    }
    countDown.value--;
  }
}

const router = useRouter();
/* 
开启辩论，遍历每一个阶段，开启计时
*/
const startDebate = async () => {
  $bus.emit("debate-control", [debateStages[0].turns[0], currentStageIndex.value, false])
  for (const stage of debateStages) {
    countDown.value = stage.remainingTime;
    await countDownRun()
  }
  console.log("恭喜你，辩论结束");
}

/* 
处理子阶段的输入
*/
const handleDebateStage = (role: string, stage: number) => {
  console.log("role:", role, currentStageIndex.value);
  let curStage = debateStages[currentStageIndex.value];
  let curTurn = curStage.turns[curStage.currentTurnIndex];
  let willBreak = false
  if (stage != currentStageIndex.value) {
    return;
  }

  console.log(curStage, curStage.currentTurnIndex, curStage.turns.length);
  if (role === 'timeOut') {
    currentStageIndex.value++;
    willBreak = true;
  }
  else {
    if (curStage.currentTurnIndex < curStage.turns.length && !curStage.rules.freeMode) {
      curStage.currentTurnIndex++;
    }
    if (curStage.currentTurnIndex >= curStage.turns.length && !curStage.rules.freeMode) {
      currentStageIndex.value++;
    }
    if (curStage.rules.freeMode) {
      curStage.currentTurnIndex++;
      if (curStage.currentTurnIndex >= curStage.turns.length) {
        curStage.currentTurnIndex = 1;
      }
    }
  }
  if (currentStageIndex.value >= debateStages.length) {
    return;
  }
  curStage = debateStages[currentStageIndex.value]
  curTurn = curStage.turns[curStage.currentTurnIndex];
  console.log(curStage, curTurn, "<===");
  $bus.emit("debate-control", [curTurn, currentStageIndex.value, willBreak])
}



onMounted(() => {
  setTimeout(() => {
    startDebate();
  }, 1000)
})

const toDebateResult = () => {
  router.push({
    name: "debateResult",
    params: {
      id: data.value.id
    }
  })
};



</script>

<template>
  <div class="debate-container">
    <div class="top-bar">
      <div class="top-bar-left">
        <div class="top-bar-title">
          <return-home :is-fixed="false" />
          <h2>{{ data.topic.title }}</h2>
        </div>
        <div class="top-bar-content">
          <div class="flow-item">
            <p>当前环节:</p>
            <strong>{{ currentStageIndex + 1 >= 5 ? 4 : currentStageIndex + 1 }} /4</strong>
          </div>
          <div class="flow-item">
            <p>发言倒计时:</p>
            <strong>{{ countDown }} 秒</strong>
          </div>
          <div class="flow-item">
            <p>正方：</p>
            <strong v-if="data.position.id === '1'">用户</strong>
            <strong v-else>AI</strong>
          </div>
          <div class="flow-item">
            <p>反方:</p>
            <strong v-if="data.position.id === '2'">用户</strong>
            <strong v-else>AI</strong>
          </div>
          <div class="flow-item">
            <p>难度:</p>
            <strong>{{ data.difficulty.name }}</strong>
          </div>
        </div>
      </div>
      <div class="top-bar-right">
        <icon-question-circle :size="24" />
        <toggle-dark />
      </div>
    </div>
    <chat :debate="data" @talk="handleDebateStage" v-model:isStreamLoad="isStreamLoad" />
    <!-- <button @click="toDebateResult">到结果页</button> -->
  </div>

</template>

<style lang="scss" scoped>
.debate-container {
  height: 100vh;
  background: var(--theme-white-2);
}

.top-bar {
  height: 100px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: var(--theme-white-2);
  z-index: 10;
  padding: 15px;
  padding-bottom: 0;
  border-bottom: 1px solid var(--theme-border-1);
  box-shadow: 0 2px 10px var(--theme-border-1);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .top-bar-title {
    display: flex;
    align-items: center;

    h2 {
      padding-left: 20px;
      color: var(--theme-gray-6);
      font-size: 20px;
      flex: 1;
    }
  }

  .top-bar-content {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px;
    border-radius: 10px 10px 0px 0px;

    .flow-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;

      p {
        font-size: 14px;
      }

      strong {
        font-size: 14px;
        color: var(--theme-blue-3);
      }
    }

    .item {
      padding: 20px;
      background: #fff;
      border-radius: 10px;
    }
  }
}


.top-bar-right {
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
