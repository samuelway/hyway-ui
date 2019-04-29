// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '系统管理',
    icon: 'cog',
    children: [
      { path: '/system/user', title: '用户管理', icon: '' },
      { path: '/system/role', title: '角色管理', icon: '' },
      { path: '/system/resources', title: '菜单管理', icon: '' },
      { path: '/system/route', title: '路由管理', icon: '' },
      { path: '/system/dict', title: '字典管理', icon: '' },
      { path: '/system/schedule', title: '定时器管理', icon: '' }
    ]
  }
]
