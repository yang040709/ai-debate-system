const debateMachine = debateSetup.createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QTAIwIYBcwDoCWEANmAMQDKAKgIIBKFA2gAwC6ioADgPax6Z6cA7NiAAeiAIwA2cTgDM82QFZxAJkaLZjAJzyANCACeiACwacKlVpXjFkxSsnzjAX2f6UGbDnYAnTgFt2PgEoEiZWJBAuHj5BYTEEY2MAdhxVYy1JLWM1ZK185P0jBEVGRhxFAA5ZY0ZVa0Ysm1d3NCxcXwCgvBCw8QiObl5+IUiEpNT0zOzc-K1Cw0RZcXKa5JUauqS6lRc3EA92nABXWDAfCmOfAXIAVQAhAFkASQoAfUeAUTIyKgBxT7hYTRYZxMaISriWTmRjVWR2ZIrRjGWRFEzVHCMNSVSSVMrGcQrZItA5tLync6Xa4kCjPADCAGk3rSvkDIiDYqNQAlJDkKlpKloobylDlxGjEuocKZqnlGpYcUoSYcvOg8FSblRnm9KDRPlRHm86QAJW4AOQZbMGMRG8UQklh5nElWSWOSVVd1Ql4nyOEk-ukiOyK0qlRUyrJuDVGpIWp1FD1BrenzNABErVEhpy7QhIdDsfIEUiURLZBs0ipSuI8op1o5xHtWp4On4AMZwHi9DMc23ghCE9ZyRQE4wuuxYnSllSpF2lCy1rITWQR5veNsdnqhej9YFZ3vciGlCqSXaCxjyH3JBbFSFpAMOWRaWzzXGufYCTgoeCRFVgXc2sEDwQABaSQJVAzEynUbJkkfex-UqFcjgIYh-1BLlRBMFQJRSSRzCFRFazLYxpHEJCvE6QJgigNDsz7adoSkf16jLXFYJw+wcCfSpahxRQdF5FJyNwCkLiuDCe0AzCEDsGRkVxbYTzUasJVKPDYU2J9bAdSxl32X8cGjcTaP3aT63MGoaiJRg8nyUsynwqRcJddZh2EtdOHbWBOxo9k9ykhIVihOQnzyGxkiaSRryWLEcDC3kIpcytG1JVcADMejwWAAAtIBMgKJCURQ0lnKEUTxXlKnsmRhykCxYVhf1FDfZwgA */
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
              sendMessage(event.message)
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
            }),
          },
        ],
        TICK_TIME: [
          {
            actions: enqueueActions(({ context, enqueue }) => {
              // console.log(context.remainTiming);
              if (context.remainTiming && context.remainTiming - 1 > 0) {
                enqueue.assign({
                  remainTiming: context.remainTiming - 1,
                })
              } else {
                console.log('您超时了')
              }
            }),
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
