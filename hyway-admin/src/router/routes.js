// layout
import layoutHeaderAside from '@/layout/header-aside'

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          requiresAuth: true,
          title: '首页'
        },
        component: () => import('@/views/index')
      }
    ]
  },
  {
    path: '/system',
    redirect: '/system/resources',
    component: layoutHeaderAside,
    children: [
      {
        path: 'resources',
        name: 'resources',
        meta: {
          requiresAuth: false,
          title: '树形菜单'
        },
        component: () => import('@/views/system/resources/')
      }
    ]
  },
  {
    path: '/system',
    redirect: '/system/user',
    component: layoutHeaderAside,
    children: [
      {
        path: 'user',
        name: 'userpage',
        meta: {
          requiresAuth: false,
          title: '用户'
        },
        component: () => import('@/views/system/user/')
      }
    ]
  },
  {
    path: '/system',
    redirect: '/system/role',
    component: layoutHeaderAside,
    children: [
      {
        path: 'role',
        name: 'rolePage',
        meta: {
          requiresAuth: false,
          title: '角色'
        },
        component: () => import('@/views/system/role/')
      }
    ]
  },
  {
    path: '/system',
    redirect: '/system/route',
    component: layoutHeaderAside,
    children: [
      {
        path: 'route',
        name: 'routePage',
        meta: {
          requiresAuth: false,
          title: '路由'
        },
        component: () => import('@/views/system/route/')
      }
    ]
  },
  {
    path: '/system',
    redirect: '/system/dict',
    component: layoutHeaderAside,
    children: [
      {
        path: 'dict',
        name: 'dictPage',
        meta: {
          requiresAuth: false,
          title: '路由'
        },
        component: () => import('@/views/system/dict/')
      }
    ]
  },
  {
    path: '/system',
    redirect: '/system/schedule',
    component: layoutHeaderAside,
    children: [
      {
        path: 'schedule',
        name: 'schedule',
        meta: {
          requiresAuth: false,
          title: '路由'
        },
        component: () => import('@/views/system/schedule/')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登陆
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/views/error-page-404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
