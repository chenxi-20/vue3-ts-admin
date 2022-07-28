import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/goods',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/goods',
        name: 'Goods',
        meta: {
          isShow: true, // 是否在菜单栏展示
          title: '商品列表' // 菜单名称
        },
        component: () => import('../views/Goods.vue')
      },
      {
        path: '/user',
        name: 'User',
        meta: {
          isShow: true, // 是否在菜单栏展示
          title: '用户列表' // 菜单名称
        },
        component: () => import('../views/User.vue')
      },
      {
        path: '/role',
        name: 'Role',
        meta: {
          isShow: true, // 是否在菜单栏展示
          title: '角色列表' // 菜单名称
        },
        component: () => import('../views/Role.vue')
      },
      {
        path: '/authority',
        name: 'Authority',
        meta: {
          isShow: false // 是否在菜单栏展示
        },
        component: () => import('../views/Authority.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  const token:string | null = localStorage.getItem('token') || ''
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    if (token && to.path === '/login') {
      next('/')
    } else {
      next()
    }
  }
})

export default router
