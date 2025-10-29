import Layout from '@/Layout/index.vue'
import Home from '@/views/home/index.vue'
import type { RouteRecordRaw } from 'vue-router'
/* 
可以看出我们的路由分为:
1.默认Layout的子路由，这个Layout有header和footer栏
2.全屏Layout的子路由，这个Layout除了全屏，没有其他内容



layout下面的子路由有下列的规则决定：
meta里面的onHeader是在header组件中显示的文字，
name属性必须书写，是决定路由的唯一标识，否则无法出现在header组件中

1、菜单栏对应路由规则
所有的路由的name都不得相同
如果路由要显示到菜单导航上面就要写meta.onHeader属性

下面这个规则待确认：
如果有子路由要显示到菜单栏上面就要写meta.childHasOnHeader属性

2、布局规则
meta.layout属性可以写你的想要的布局，但是如果不写的话，默认就是默认样式
目前只有默认样式和全屏样式
只要你往layout写full就可以让布局变成全屏样式

3. 默认参数规则
如果路由有默认参数就要写meta.defaultParams属性

childHasOnHeader
*/

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          onHeader: '主页',
        },
      },
      {
        path: '/debate/result/:id?',
        props: true,
        name: 'debateResult',
        component: () => import('@/views/result/index.vue'),
      },
      {
        path: '/topic/detail/:id?',
        name: 'topicDetail',
        props: true,
        component: () => import('@/views/topic-detail/index.vue'),
        meta: {
          layout: 'full',
        },
      },
      {
        path: '/topic/:type?',
        name: 'topic',
        component: () => import('@/views/topic/index.vue'),
        meta: {
          onHeader: '辩论话题',
          layout: 'full',
          defaultParams: {
            type: '-1',
          },
        },
      },
      {
        path: '/rank/:type?',
        name: 'rank',
        component: () => import('@/views/rank/index.vue'),
        meta: {
          onHeader: '排名',
          defaultParams: {
            type: '总榜',
          },
        },
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
        meta: {
          onHeader: '关于',
        },
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
        meta: {
          layout: 'full',
        },
      },
      {
        path: '/404',
        name: 'not-find',
        component: () => import('@/views/not-find/index.vue'),
      },
    ],
  },
  {
    path: '/creative',
    component: () => import('@/Layout/Full.vue'),
    children: [
      {
        path: '/creative',
        name: 'creative',
        component: () => import('@/views/creative/index.vue'),
      },
      {
        path: '/debate/:id?',
        name: 'debate',
        props: true,
        component: () => import('@/views/debate/index.vue'),
      },
      {
        path: '/debate2',
        name: 'debate2',
        component: () => import('@/views/debate/Debate.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/user-login/index.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/user-register/index.vue'),
      },
      {
        path: '/test-ws',
        name: 'testWs',
        component: () => import('@/views/test/test-ws.vue'),
      },
      {
        path: '/test-debate',
        name: 'testDebate',
        component: () => import('@/views/test/test-debate.vue'),
      },
      {
        path: '/test-debate2',
        name: 'testDebate2',
        component: () => import('@/views/test/test-debate2.vue'),
      },
      {
        path: '/debate-test',
        name: 'debateTest',
        component: () => import('@/views/test/debate-test.vue'),
      },
      {
        path: '/debate-component',
        name: 'debateComponent',
        component: () => import('@/views/test/debate-component.vue'),
      },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

export default routes
