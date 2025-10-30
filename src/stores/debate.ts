import { defineStore } from 'pinia'
import { getDebateInfo } from '@/api/debate'
import type { Debate } from '@/types/debate'
import { useFetchData } from '@/composables/useFetchData'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref, onBeforeUnmount, shallowRef, watch } from 'vue'
import { createDebateStages } from '@/views/debate/config'
import { mockData } from '@/views/debate/mockData'
import { useUserStore } from '@/stores/user'
import { Modal } from '@arco-design/web-vue'
import { useWebSocket } from '@/composables/useWebSocket'

export const useDebateStore = defineStore('debate', () => {
  const route = useRoute()
  const router = useRouter()
  let lastItem = ''
  const { connect, sendMessage, message, isReceivingMsg } = useWebSocket(
    '/socket.io',
    {
      conversion_id: '123456789',
    },
    {
      connectSuccessCallBack: () => {
        lastItem = ''
        handleDebateStage('assistant')
        isStreamLoad.value = false
      },
    },
  )

  const id = computed(() => {
    return route.params.id.toString()
  })

  /* 
  输入框的默认值
  */
  const defaultValue: Debate = {
    debate_id: '',
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
    },
    difficulty: {
      id: '',
      name: '',
    },
    position: {
      id: '',
      name: '',
    },
    duration: 0,
    created_at: 0,
    state: -1,
  }

  /* 
  获取辩论话题的数据：主要是获取id,position
  */
  const { data, loading: dataLoading, fetchData } = useFetchData(getDebateInfo, [id], defaultValue)

  watch(message, () => {
    // console.log('message', message.value)
    lastItem += message.value
    chatList.value[0].content = lastItem
    // console.log(chatList.value[0].content)
  })

  // fetchData()

  /* 当前的辩论阶段 */
  const currentStageIndex = ref(0)
  /* 工厂函数获取辩论的阶段 */
  const debateStages = shallowRef(createDebateStages())

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

  const isDebateEnd = ref(false)

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
      if (isDebateEnd.value === true) {
        break
      }
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
        const res = freeModeIndexArr.find((e) => e === currentStageIndex.value)
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

  /* 

是否跳过辩论的标记
*/
  const toResultPage = () => {
    router.push({ name: 'debateResult', params: { id: data.value.debate_id } })
  }

  const isJumpDebateFlag = ref(false)
  // isJumpDebateFlag.value = true

  const startDebate = async () => {
    connect()
    /* 处理辩论开始的逻辑 */
    reset()
    console.log('该辩论已经开始')
    await fetchData()
    /* 处理就可以处理是不是开启辩论的问题，以后再处理 */
    if (isJumpDebateFlag.value) {
      console.log('暂时跳过辩论过程，看看其他的')
      return
    }
    if (debateStages.value.length === 0 && debateStages.value[0].turns.length === 0) {
      console.log('没有阶段或者没有轮次,麻烦联系管理员')
      return
    }
    debateControl(debateStages.value[0].turns[0])
    for (const stage of debateStages.value) {
      countDown.value = stage.remainingTime
      if (isDebateEnd.value === true) {
        return
      }
      await countDownRun()
    }
    console.log('恭喜你，辩论结束')
    isDebateEnd.value = true
    Modal.confirm({
      title: '提示',
      content: '是否确认前往辩论结果页，查看您的辩论结果分析',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        toResultPage()
      },
    })
  }

  /* 
  处理子阶段的输入
  */
  const handleDebateStage = (role: string) => {
    let curStage = debateStages.value[currentStageIndex.value]
    let curTurn = curStage.turns[curStage.currentTurnIndex]
    let willBreak = false
    // if (stage != currentStageIndex.value) {
    //   return
    // }

    // console.log(curStage, curStage.currentTurnIndex, curStage.turns.length)
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
    // console.log(curStage, curTurn, '<===')
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
    console.log()

    sendMessage('发送消息')
    console.log('ai请输入:')
    const params2 = { ...assistantChatTemplate }
    chatList.value.unshift(params2)
    loading.value = true
    isStreamLoad.value = true
    // lastItem = chatList.value[0]
    // chatList.value
    loading.value = false
    // await mockData(lastItem)
    // await
    // lastItem.duration = 20
    // handleDebateStage('assistant')
    // isStreamLoad.value = false
  }

  const debateControl = (turn: any) => {
    // console.log(turn, index, '<==debate-control')
    // curStage.value = index
    if (turn.tip) {
      chatList.value.unshift(turn.tip)
    }
    // console.log(data.value.position.name, '==>', turn.side)
    if (data.value.position.name === turn.side) {
      userInput()
    } else {
      assistantInput()
    }
  }

  const reset = () => {
    // console.log('正在卸载组件')
    isStreamLoad.value = false
    isDebateEnd.value = false
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
    dataLoading,
    isDebateEnd,
    toResultPage,
  }
})
