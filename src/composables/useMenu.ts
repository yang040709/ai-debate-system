import { ref, shallowRef, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import filterRoutes from '@/utils/filterRoutes'
import { useUserStore } from '@/stores/user'
/* 
这个函数是处理菜单的逻辑，用在布局的菜单上
为什么封装？
因为移动端和PC端的菜单逻辑是一样的
所以可以封装成一个函数，供不同的组件使用
减少代码重复
*/
export const useMenu = () => {
  const router = useRouter()
  const route = useRoute()
  const userStore = useUserStore()
  /* 
  经过筛选后的路由表
  */
  const routes = shallowRef(filterRoutes(router.getRoutes(), userStore.isLogin))

  /* 
  如果登录状态发生了变化，就重新筛选路由列表出来
  */
  watch(
    () => userStore.isLogin,
    () => {
      routes.value = filterRoutes(router.getRoutes(), userStore.isLogin)
    },
  )

  const handleMenuClick = (e: any) => {
    let targetRoute: any = {}
    routes.value.forEach((route: any) => {
      if (route.name === e) {
        targetRoute = route
      }
    })
    let defaultParams = {}
    if (targetRoute?.meta?.defaultParams) {
      defaultParams = { ...targetRoute.meta.defaultParams }
      router.push({
        name: e,
        params: defaultParams,
      })
    } else {
      router.push({
        name: e,
      })
    }
  }

  const selectedKey = ref([route.name])

  router.afterEach(() => {
    selectedKey.value = [route.name as string]
  })
  return {
    selectedKey,
    routes,
    handleMenuClick,
  }
}
