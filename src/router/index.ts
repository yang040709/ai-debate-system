import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.ts'
import { useUserStore } from '@/stores/user.ts'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const blackList = ['/user']
const whiteList = ['/login', '/register']

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  console.log(to)
  if (userStore.isLogin) {
    if (whiteList.includes(to.path)) {
      next({
        path: to.query?.redirect ? to.query.redirect.toString() : '/',
      })
      return
    }
    next()
  } else {
    if (blackList.includes(to.path)) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      })
      return
    }
    next()
  }
})
// router.afterEach((to, from) => {})

export default router
