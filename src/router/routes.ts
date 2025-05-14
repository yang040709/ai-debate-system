import HomeView from '../views/HomeView.vue'
import Layout from '@/Layout/index.vue'

export default [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: HomeView,
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
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
    // name: 'not-find',
    redirect: '/404',
  },
]
