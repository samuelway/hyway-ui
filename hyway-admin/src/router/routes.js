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
        component: () => import('@/pages/index')
      }
    ]
  },
  {
    path: '/myiframe',
    redirect: '/myiframe',
    component: layoutHeaderAside,
    children: [
      {
        path: ':routerPath',
        name: 'iframe',
        meta: {
          requiresAuth: true,
          title: 'iframe'
        },
        component: () => import('@/pages/iframe')
      }
    ]
  },
  {
    path: '/system',
    redirect: '/system/base',
    component: layoutHeaderAside,
    children: [
      {
        path: 'base',
        name: 'schedule',
        meta: {
          requiresAuth: false,
          title: '定时任务'
        },
        component: () => import('@/views/system/schedule')
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
    component: () => import('@/pages/login')
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
    component: () => import('@/pages/error-page-404')
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
