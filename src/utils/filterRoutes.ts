import type { RouteRecord } from 'vue-router'

export default function filterRoutes(routes: RouteRecord[]) {
  const layoutRoute = routes.filter((route) => route.name === 'Layout')[0]
  const targetRoutes = layoutRoute.children.filter((route) => route.name && route?.meta?.onHeader)
  return targetRoutes
}
