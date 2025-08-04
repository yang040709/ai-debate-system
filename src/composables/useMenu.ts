import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import filterRoutes from '@/utils/filterRoutes'

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
  /* 
  经过筛选后的路由表
  */
  const routes = filterRoutes(router.getRoutes())

  const handleMenuClick = (e: any) => {
    let targetRoute: any = {}
    routes.forEach((route: any) => {
      if (route.name === e) {
        targetRoute = route
      }
    })
    let defaultParams = {}
    // console.log("点击了菜单", route);
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
    selectedKey.value = [e]
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
