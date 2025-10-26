import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.ts'
import { useUserStore } from '@/stores/user.ts'
import { Message } from '@arco-design/web-vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    /* ​​恢复浏览器原生前进/后退行为​​后退时还原历史滚动位置，新导航时滚动到顶部： */
    return savedPosition || { top: 0 }
  },
})

// 下面两个都是匹配的是路由名。要求拦截的路由必须带name属性
// 下面是未登录不能再访问的页面
const blackList = ['user', 'debate']

// 下面是登录后不能再访问的页面
const whiteList = ['login', 'register']
// let isTryGetUserInfo = false

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (!userStore.isLogin && !userStore.isTryGetUserInfo) {
    console.log('如果当前没有登录，就帮你获取个人信息')
    await userStore.getUserInfo()
    userStore.isTryGetUserInfo = true
  }
  if (userStore.isLogin) {
    if (to.name && whiteList.includes(to.name as string)) {
      next({
        path: to.query?.redirect ? to.query.redirect.toString() : '/',
      })
      return
    }
    next()
  } else {
    if (to.name && blackList.includes(to.name as string)) {
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
// router.afterEach((to, from) => {})

export default router
