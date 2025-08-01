import type { RouteRecord } from 'vue-router'

export default function filterRoutes(routes: RouteRecord[]) {
  // 获取layout 路由
  const layoutRoute = routes.filter((route) => route.name === 'Layout')[0]
  // 获取需要过滤的layout子路由

  function getTargetRoutes(routes: RouteRecord[]) {
    const targetArr: RouteRecord[] = []
    const targetRoutes = routes.filter(
      (route) => route.name && (route?.meta?.onHeader || route?.meta?.childHasOnHeader),
    )
    targetRoutes.forEach((e) => {
      if (e.children) {
        const res = getTargetRoutes(e.children as RouteRecord[])
        targetArr.push(...res)
      } else {
        targetArr.push(e)
      }
    })
    return targetArr
  }
  const targetRoutes = getTargetRoutes(layoutRoute.children as RouteRecord[])

  return targetRoutes
}
