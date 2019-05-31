import layoutHeaderAside from '@/layout/header-aside'
//import charts from './modules/charts'
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('index')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('function/redirect')
      }
    ]
  },{
    path: '/system',
    redirect: '/system/resources',
    component: layoutHeaderAside,
    children: [
      {
        path: 'resources',
        name: 'resources',
        meta: {
          requiresAuth: false,
          title: '菜单'
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
    redirect: '/system/dept',
    component: layoutHeaderAside,
    children: [
      {
        path: 'dept',
        name: 'deptpage',
        meta: {
          requiresAuth: false,
          title: '组织'
        },
        component: () => import('@/views/system/dept/')
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
          title: '字典'
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
  },
  {
    path: '/service',
    redirect: '/service/monitor',
    component: layoutHeaderAside,
    children: [
      {
        path: 'monitor',
        name: 'monitor',
        meta: {
          requiresAuth: false,
          title: '监控'
        },
        component: () => import('@/views/service/monitor/')
      }
    ]
  },
  {
    path: '/service',
    redirect: '/service/registry',
    component: layoutHeaderAside,
    children: [
      {
        path: 'registry',
        name: 'registry',
        meta: {
          requiresAuth: false,
          title: '注册中心'
        },
        component: () => import('@/views/service/registry')
      }
    ]
  },
  {
    path: '/service',
    redirect: '/service/logging',
    component: layoutHeaderAside,
    children: [
      {
        path: 'logging',
        name: 'logging',
        meta: {
          requiresAuth: false,
          title: '日志'
        },
        component: () => import('@/views/service/logging')
      }
    ]
  },
  {
    path: '/service',
    redirect: '/service/docker',
    component: layoutHeaderAside,
    children: [
      {
        path: 'docker',
        name: 'docker',
        meta: {
          requiresAuth: false,
          title: 'docker'
        },
        component: () => import('@/views/service/docker')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
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
