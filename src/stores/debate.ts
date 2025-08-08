import { defineStore } from 'pinia'
import { getDebateInfo } from '@/api/debate'
import type { Debate } from '@/types/debate'
import { useFetchData } from '@/composables/useFetchData'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref, onBeforeUnmount, shallowRef } from 'vue'
import { createDebateStages } from '@/views/debate/config'
import { mockData } from '@/views/debate/mockData'
import { useUserStore } from '@/stores/user'
import { Message } from '@arco-design/web-vue'

export const useDebateStore = defineStore('debate', () => {
  const route = useRoute()
  const router = useRouter()
  const id = computed(() => {
    return route.params.id.toString()
  })

  /* 
  输入框的默认值
  */
  const defaultValue: Debate = {
    id: '',
    topic: {
      id: '',
      title: '',
      desc: '',
      created_at: '',
      participant_count: 0,
      creator: {
        name: '',
        avatar: '',
      },
      type: [
        {
          id: '',
          name: '',
        },
      ],
      winningRate: 0,
      comment_count: 0,
    },
    difficulty: {
      id: '',
      name: '',
    },
    position: {
      id: '',
      name: '',
    },
    content: '',
    duration: 0,
    state: -1,
  }

  /* 
  获取辩论话题的数据：主要是获取id,position
  */
  const { data, loading: dataLoading, fetchData } = useFetchData(getDebateInfo, [id], defaultValue)

  // fetchData()

  /* 当前的辩论阶段 */
  let currentStageIndex = ref(0)
  /* 工厂函数获取辩论的阶段 */
  let debateStages = shallowRef(createDebateStages())

  /* 是自由模式的环节由 */
  let freeModeIndexArr: number[] = []
  // debateStages.forEach((item, index) => {
  //   if (item.rules.freeMode === true) {
  //     freeModeIndexArr.push(index)
  //   }
  // })

  /* 是否已经开始 */
  const hasBegun = ref(false)

  // 流式数据加载中
  const isStreamLoad = ref(false)
  /* 倒计时 */
  const countDown = ref(0)

  /* 是否暂停，暂时没有用  */
  const isPause = ref(false)

  /* 输入框的发送按钮是否禁用，感觉可以去掉 */
  const loading = ref(false)

  /* 获取用户的数据，使用头像，名称  */
  const userStore = useUserStore()

  /* 用户的输入框的状态 */
  const disabled = ref(true)

  /* 辩论列表 */
  const chatList = ref<any[]>([])

  const inputVal = ref('')

  /* user模板 */
  const userChatTemplate = {
    avatar: userStore.userInfo.avatar,
    name: '你',
    datetime: new Date().toLocaleDateString(),
    content: '',
    duration: 0,
    role: 'user',
  }

  /* assistant模板 */
  const assistantChatTemplate = {
    avatar: '/ai_avatar.png',
    name: 'AI',
    datetime: new Date().toLocaleDateString(),
    content: '',
    role: 'assistant',
    duration: 0,
  }

  /* 当前的阶段 */
  // const curStage = ref(0)

  const countDownRun = async () => {
    const stages = currentStageIndex.value
    /* 
      如果倒计时不为0且当前还在这个阶段就一直倒计时
    */
    while (countDown.value >= 0 && stages === currentStageIndex.value) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (isPause.value) {
        continue
      }
      if (disabled.value === true) {
        // 说明当前用户不在发言
        continue
      }
      if (countDown.value === 0) {
        // 如果时间为0，则进入下一个阶段
        // console.log("进入下一个阶段");
        const res = freeModeIndexArr.find((e) => e === currentStageIndex.value)
        console.log(res)
        if (typeof res === 'number') {
          if (isStreamLoad.value === false) {
            handleDebateStage('timeOut')
          }
        } else {
          console.log('已经超时，警告！！！')
        }
        continue
      }
      countDown.value--
    }
  }
  /* 
开启辩论，遍历每一个阶段，开启计时
*/
  const startDebate = async () => {
    /* 处理辩论开始的逻辑 */
    reset()
    console.log('该辩论已经开始')
    await fetchData()
    /* 处理就可以处理是不是开启辩论的问题，以后再处理 */
    // console.log(data, '<==debate=>data')
    if (true) {
      console.log('暂时跳过辩论过程，看看其他的')

      return
    }
  }

  /* 
  处理子阶段的输入
  */
  const handleDebateStage = (role: string) => {
    console.log('role:', role, currentStageIndex.value)
    let curStage = debateStages.value[currentStageIndex.value]
    let curTurn = curStage.turns[curStage.currentTurnIndex]
    let willBreak = false
    // if (stage != currentStageIndex.value) {
    //   return
    // }

    console.log(curStage, curStage.currentTurnIndex, curStage.turns.length)
    if (role === 'timeOut') {
      currentStageIndex.value++
      willBreak = true
    } else {
      if (curStage.currentTurnIndex < curStage.turns.length && !curStage.rules.freeMode) {
        curStage.currentTurnIndex++
      }
      if (curStage.currentTurnIndex >= curStage.turns.length && !curStage.rules.freeMode) {
        currentStageIndex.value++
      }
      if (curStage.rules.freeMode) {
        curStage.currentTurnIndex++
        if (curStage.currentTurnIndex >= curStage.turns.length) {
          curStage.currentTurnIndex = 1
        }
      }
    }
    if (currentStageIndex.value >= debateStages.value.length) {
      return
    }
    curStage = debateStages.value[currentStageIndex.value]
    curTurn = curStage.turns[curStage.currentTurnIndex]
    console.log(curStage, curTurn, '<===')
    debateControl(curTurn)
  }

  /* 

  源子组件的东西
  */

  // const props = defineProps<{ debate: Debate }>()

  // const emit = defineEmits<{
  //   talk: [role: string, stage: number]
  // }>()

  /* 
  处理用户的输入
  */
  const handleSend = function (inputValue: string) {
    if (isStreamLoad.value) {
      return
    }
    if (!inputValue) return
    const params = { ...userChatTemplate, content: inputValue }
    chatList.value.unshift(params)
    inputVal.value = ''
    handleDebateStage('user')
  }

  const userInput = async () => {
    disabled.value = false
    console.log('用户请输入:')
  }

  const assistantInput = async () => {
    disabled.value = true
    console.log('ai请输入:')
    const params2 = { ...assistantChatTemplate }
    chatList.value.unshift(params2)
    loading.value = true
    isStreamLoad.value = true
    const lastItem = chatList.value[0]
    loading.value = false
    await mockData(lastItem)
    handleDebateStage('assistant')
    lastItem.duration = 20
    isStreamLoad.value = false
  }

  const debateControl = (turn: any) => {
    // console.log(turn, index, '<==debate-control')
    // curStage.value = index
    if (turn.tip) {
      chatList.value.unshift(turn.tip)
    }
    console.log(data.value.position.name, '==>', turn.side)
    if (data.value.position.name === turn.side) {
      userInput()
    } else {
      assistantInput()
    }
  }

  const reset = () => {
    console.log('正在卸载组件')
    isStreamLoad.value = false
    debateStages.value = createDebateStages()
    currentStageIndex.value = 0
    /* 是自由模式的环节由 */
    freeModeIndexArr = []
    debateStages.value.forEach((item, index) => {
      if (item.rules.freeMode === true) {
        freeModeIndexArr.push(index)
      }
    })
    countDown.value = 0
    isPause.value = false
    loading.value = false
    disabled.value = true
    chatList.value = []
  }

  return {
    data,
    inputVal,
    currentStageIndex,
    debateStages,
    isStreamLoad,
    countDown,
    isPause,
    handleDebateStage,
    startDebate,
    countDownRun,
    chatList,
    loading,
    disabled,
    handleSend,
    reset,
  }
})
