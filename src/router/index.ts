import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  next()
})
// router.afterEach((to, from) => {})

export default router
