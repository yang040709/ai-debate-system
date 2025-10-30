const debateMachine = debateSetup.createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QTAIwIYBcwDoCWEANmAMQDKAKgIIBKFA2gAwC6ioADgPax6Z6cA7NiAAeiAGwAWABw4AjIwCckxtIDsSxUskAaEAE9E0uTgCsjC3LXrpAZnEAmU5IC+LvSgzYc7AE6cAW3Y+ASgSJlYkEC4ePkFhMQRxKRxpSVs1FVNxLRzdA0Rs23k1RTVTOSsK8VM3DzQsXD9A4LxQ8LlIjm5efiEoxOTZBUVbMrHTYzlxPUMEByccNQcaxSklaVNbOVs6kE9GnABXWDBfCiPfAXIAVQAhAFkASQoAfQeAUTIyKgBxD4iwhivXiA0QTjUOAs0Mqa0kFVGs0QY0kSxW4m0agUlXEewO3hOZwuVxIFCeAGEANKvMmfQFRYFxfqgRJrHD2LE1bbTCxSJEIUyjdkVZxjWxOUbSPENAmnc6Xa60j6vADyNwYLCBPSZCXBpkh0MscjhCNs-I0qPEpXKclMIqcrnc+xluHQeGJ1yoT1elBoHyoD1e5IAEjcAHKU+ndWJ9XUISQOfkORio2zZaRrZz6u21J3413uhUkL0+ih+gOvD5hgAiUei2tjYPm+qhhthUlN-NsklRC1WphW2M2uzzLp8-gAxnAeO064zGyyJDJ5NpVBpFFplPzJHJZNIcmlylIrA409KvE1J9O2mF6J0tTHQYuksuRip1JptF3lqkD5JFPuu47s456HHwARgJwRyYAAClesAzremoMg2T6iEuwyrh+G5fgUCDLCYVhlI44jSMm6hyKB3jgZB0FwZwU4ITeHRdPWj7MuhL6Ycoa6flueFWqYJTEf+1rZI6ToCJwKDwFE+YPiCHGJAAtDMeHKUJG5adp2n6lRuAEMQCk6k2A6KCukoJlaDhkfkcwKKiyw1MYjAVIwDq5vUF7ji0IRQMZC6cZsjA4IoWy2mRljLIoXaSJC4jGmkFhkcYWy4qO3mEvKVwBWhiQOaFaRprY4r7j2cX8nk7IpqRPbqIocgOGo+k4G6Hq5UpEhCYwtqON2Ti7owGRdq57IKENWI9YwmQlS1zSMYhHVxnFIXJCoyjWAsahqGaeEZOZ9gAd2WhpLa2QtTRUGwfBi0oexy0tru5Rpsm032HZEjGDgVplOY7niCVrktQAZm0eCwAAFpAS1NsFoXhZMr0njFAmlMJ20ODsYXpLmbhAA */
  id: 'debate',
  context: {
    stages: config,
    stageIdx: 0,
    turnIdx: 0,
    userSide: 'positive',
    // messages: [],
    remainTiming: 0,
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: {
          target: 'prompting',
          actions: assign(({ context, event }) => ({
            userSide: event.userSide,
            // messages: [],
            stageIdx: 0,
            turnIdx: 0,
            remainTiming: getCurrentStage(context).remainingTime,
          })),
        },
      },
    },
    prompting: {
      entry: [
        enqueueActions(({ context, enqueue }) => {
          const turn = getCurrentTurn(context)
          // console.log(turn, "<==prompting");
          if (turn?.tip) {
            // enqueue.assign({
            //   messages: [
            //     ...context.messages,
            //     {
            //       role: "assistant",
            //       avatar: turn.tip.avatar,
            //       content: turn.tip.content,
            //       name: turn.tip.name,
            //       datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            //     }
            //   ]
            // })
            messageList.value.unshift({
              role: 'assistant',
              avatar: turn.tip.avatar,
              content: turn.tip.content,
              name: turn.tip.name,
              datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            })
          }
          if (turn?.control) {
            // turn.control
            if (turn.control[context.userSide] === 'send-space') {
              // 发送空格
              sendMessage(' ')
            }
          }
        }),
      ],
      always: [
        {
          target: 'userTurn',
          guard: 'isUserTurn',
        },
        {
          target: 'aiTurn',
        },
      ],
    },
    userTurn: {
      on: {
        SUBMIT_MESSAGE: [
          {
            target: 'processing',
            actions: enqueueActions(({ context, enqueue, event }) => {
              const turn = getCurrentTurn(context)

              // const messages = [...context.messages]
              // messages.unshift({
              //   ...userMsgTemplate,
              //   datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              //   content: event.message,
              // })
              // enqueue.assign({
              //   messages: [
              //     ...messages,
              //   ]
              // })
              messageList.value.unshift({
                role: userMsgTemplate.role,
                avatar: userMsgTemplate.avatar,
                content: event.message,
                name: userMsgTemplate.name,
                datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              })
              if (turn?.control?.[context.userSide] === 'no-send') {
                // 不发送
                return
              }
              sendMessage(event.message)
            }),
          },
        ],
        TICK_TIME: [
          {
            actions: enqueueActions(({ context, enqueue }) => {
              // console.log(context.remainTiming);
              const stage = getCurrentStage(context)
              if (context.remainTiming && context.remainTiming - 1 > 0) {
                enqueue.assign({
                  remainTiming: context.remainTiming - 1,
                })
              } else {
                /* 
                如果是自由辩论模式，就强制用户加入下一轮
                */
                if (stage?.rules?.freeMode === true) {
                  // enqueue.sendParent({type:"NEXT_TURN"})
                  console.log('自由辩论时间到')
                  enqueue.raise({ type: 'TIME_OUT' })
                  return
                }
                console.log('您超时了')
              }
            }),
          },
        ],
        TIME_OUT: [
          {
            target: 'timeoutProcessing',
          },
        ],
      },
    },
    aiTurn: {
      entry: [
        enqueueActions(({ context, enqueue }) => {
          // const messages = [...context.messages]
          // messages.unshift({
          //   ...aiMsgTemplate,
          //   datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          //   content: '',
          // })
          // enqueue.assign({
          //   messages: [
          //     ...messages,
          //   ]
          // })
          messageList.value.unshift({
            role: aiMsgTemplate.role,
            avatar: aiMsgTemplate.avatar,
            content: '',
            name: aiMsgTemplate.name,
            datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          })
        }),
      ],
      on: {
        AI_STREAM_CHUNK: [
          {
            actions: enqueueActions(({ context, enqueue, event }) => {
              // const messages = [...context.messages]
              // messages[0].content += event.chunk
              // enqueue.assign({
              //   messages: [
              //     ...messages,
              //   ]
              // })
              messageList.value[0].content += event.chunk
            }),
          },
        ],
        AI_STREAM_END: [
          {
            target: 'processing',
          },
        ],
      },
    },
    processing: {
      entry: [
        enqueueActions(({ context, enqueue }) => {
          const currentStage = getCurrentStage(context)
          if (currentStage.rules.freeMode === true) {
            /* 如果当前的轮次是配置中的最后一轮就进入第二个阶段 */
            if (context.turnIdx >= currentStage.turns.length - 1) {
              enqueue.assign({
                turnIdx: 2,
              })
            } else {
              // 自由辩论模式
              enqueue.assign({
                turnIdx: context.turnIdx + 1,
              })
            }
            return
          }
          if (context.turnIdx >= currentStage.turns.length - 1) {
            enqueue.assign({
              turnIdx: 0,
              stageIdx: context.stageIdx + 1,
            })
            enqueue.assign({
              remainTiming: getNextStage(context)?.remainingTime || 0,
            })
          } else {
            enqueue.assign({
              turnIdx: context.turnIdx + 1,
            })
          }
        }),
      ],
      always: [
        {
          target: 'finished',
          guard: 'isDebateOver',
        },
        {
          target: 'prompting',
        },
      ],
    },
    timeoutProcessing: {
      entry: [
        enqueueActions(({ context, enqueue }) => {
          /* 进入下一个阶段 */
          enqueue.assign({
            turnIdx: 0,
            stageIdx: context.stageIdx + 1,
          })
          enqueue.assign({
            remainTiming: getNextStage(context)?.remainingTime || 0,
          })
        }),
      ],
      always: [
        {
          target: 'finished',
          guard: 'isDebateOver',
        },
        {
          target: 'prompting',
        },
      ],
    },
    finished: {
      type: 'final',
      entry: [
        enqueueActions(({ context, enqueue }) => {
          clearInterval(timer)
          // enqueue.assign({
          //   messages: [
          //     ...context.messages,
          //     {
          //       ...refereeMsgTemplate,
          //       content: "本次辩论所有环节结束，感谢双方的精彩表现。",
          //       datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          //     }
          //   ]
          // })
          messageList.value.unshift({
            ...refereeMsgTemplate,
            content: '本次辩论所有环节结束，感谢双方的精彩表现。',
            datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          })
        }),
      ],
    },
  },
})
