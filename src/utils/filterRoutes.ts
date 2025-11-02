import type { RouteRecord } from 'vue-router'
import { BLACK_LIST } from '@/constant/router'

export default function filterRoutes(routes: RouteRecord[], isLogin: boolean) {
  /* 
  把layout中的子路由筛选出来，项目中导航栏只有用到里面的路由
  */
  const layoutRoute = routes.filter((route) => route.name === 'Layout')[0]
  // 获取需要过滤的layout子路由

  function getTargetRoutes(routes: RouteRecord[]) {
    // const targetArr: RouteRecord[] = []
    /* 
      meta里面有onHeader就会被筛选出来
      // 同时如果子路由有onHeader，也会被筛选出来
    */
    // const targetRoutes = routes.filter(
    //   (route) => route.name && (route?.meta?.onHeader || route?.meta?.childHasOnHeader),
    // )
    // const targetRoutes = routes.filter((route) => route.name && route?.meta?.onHeader)
    // targetRoutes.forEach((e) => {
    //   if (e.children) {
    //     const res = getTargetRoutes(e.children as RouteRecord[])
    //     targetArr.push(...res)
    //   } else {
    //     targetArr.push(e)
    //   }
    // })
    // targetArr=targetRoutes;
    // return targetArr

    const targetArr = []
    const targetRoutes = routes.filter((route) => route.name && route?.meta?.onHeader)
    targetRoutes.forEach((item) => {
      if (!item.meta.headerIndex) {
        item.meta.headerIndex = 100
      }
    })
    if (!isLogin) {
      targetRoutes.filter((item) => {
        if (!BLACK_LIST.includes(item.name as string)) {
          targetArr.push(item)
        }
      })
    } else {
      targetArr.push(...targetRoutes)
    }
    console.log(targetArr, 'targetArr')

    targetArr.sort((a, b) => {
      return parseInt(a.meta.headerIndex as string) - parseInt(b.meta.headerIndex as string)
    })
    return targetArr
  }
  const targetRoutes = getTargetRoutes(layoutRoute.children as RouteRecord[])

  return targetRoutes
}
