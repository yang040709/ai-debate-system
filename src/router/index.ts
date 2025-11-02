import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.ts'
import { useUserStore } from '@/stores/user.ts'
import { Message } from '@arco-design/web-vue'
import { BLACK_LIST, WHITE_LIST } from '@/constant/router.ts'
// import {useTitle}
import { useAppStore } from '@/stores/app.ts'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    /* ​​恢复浏览器原生前进/后退行为​​后退时还原历史滚动位置，新导航时滚动到顶部： */
    return savedPosition || { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (!userStore.isLogin && !userStore.isTryGetUserInfo) {
    console.log('如果当前没有登录，就帮你获取个人信息')
    await userStore.getUserInfo()
    userStore.isTryGetUserInfo = true
  }
  if (userStore.isLogin) {
    if (to.name && WHITE_LIST.includes(to.name as string)) {
      next({
        path: to.query?.redirect ? to.query.redirect.toString() : '/',
      })
      return
    }
    next()
  } else {
    if (to.name && BLACK_LIST.includes(to.name as string)) {
      Message.error('请先登录')
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
router.afterEach((to, from) => {
  if (to.meta && to.meta.title) {
    const appStore = useAppStore()
    appStore.setTitle(to.meta.title.toString())
  }
})

export default router
