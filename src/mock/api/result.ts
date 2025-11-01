// import mockjs from 'mockjs'
// import { resultList } from '../data/result'
// import type { ResultResponse } from '@/types/result'
// mockjs.mock(/\/api\/result\/.+/, 'get', (options) => {
//   const id = options.url.split('/')[3]
//   console.log(id, options)
//   const data :ResultResponse = {
//     history_id: id,
//     result: {
//       debateAnalysis: {
//         isWin: true,
//         comprehensiveScore: 62.3,
//       },
//       highlights: [
//         "情感共鸣的精准切入点：您提出的'情感共鸣是AI无法替代的核心'被判定为关键优势，在第三轮成功瓦解了AI的核心论点",
//         '法律案例的及时引用：在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点',
//         "比喻修辞的巧妙运用：将AI人格比喻为'会说话的锤子'获得系统额外加分，增强了论点说服力",
//       ],
//       improvementPoints: [
//         "数据支撑不足：'青少年自律性不足'的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据",
//         "语言重复冗余：'责任归属是核心问题'在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点",
//         "忽视对方重要论据：未回应AI提出的'自动驾驶责任归属案例'，损失12%逻辑连贯性评分",
//       ],
//       coachingComments: [
//         "在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从'青少年自律不足'推导'AI人格危险'存在逻辑跳跃，建议加入阶梯论证",
//         '优化策略：当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力',
//       ],
//     },
//   }
//   return {
//     code: 0,
//     msg: 'success',
//     data,
//   }
// })

// mockjs.mock(/\/api\/resultList\?.+/, 'get', (options) => {
//   const params = options.url.split('?')[1]
//   const paramsObj = params.split('&').reduce((pre, cur) => {
//     const [key, value] = cur.split('=')
//     pre[key] = value
//     return pre
//   }, {} as any)
//   let data = []
//   data = resultList.filter((item, index) => {
//     return index < Number(paramsObj.limit)
//   })
//   return {
//     code: 0,
//     msg: 'success',
//     data: {
//       total: resultList.length,
//       list: data,
//     },
//   }
// })
