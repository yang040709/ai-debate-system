import type { RouteRecord } from 'vue-router'

export default function filterRoutes(routes: RouteRecord[]) {
  // 获取layout 路由
  const layoutRoute = routes.filter((route) => route.name === 'Layout')[0]
  // 获取需要过滤的layout子路由
  const targetRoutes = layoutRoute.children.filter((route) => route.name && route?.meta?.onHeader)
  return targetRoutes
}
