import HomeView from '../views/HomeView.vue'
import Layout from '@/Layout/index.vue'
import Home from '@/views/home/index.vue'
/* 
layout下面的子路由有下列的规则决定：
meta里面的onHeader是在header组件中显示的文字，
name属性必须书写，是决定路由的唯一标识，否则无法出现在header组件中

要求：
所有的路由都不得同名
*/

export default [
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
        path: '/home',
        name: 'home2',
        component: HomeView,
        meta: {
          onHeader: '测试主页',
        },
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: {
          onHeader: '关于',
        },
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
      },
      {
        path: '/test1',
        name: 'test',
        component: () => import('@/views/test/index.vue'),
        meta: {
          onHeader: '测试',
        },
      },
      {
        path: '/test2',
        name: 'test2',
        component: () => import('@/views/test/index2.vue'),
        meta: {
          onHeader: '测试2',
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
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
