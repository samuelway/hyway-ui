// 菜单 侧边栏
export default [
  { path: '/views', title: '首页', icon: 'home' },
  {
    title: '系统管理',
    icon: 'folder-o',
    children: [
      { path: '/system/user', title: '用户管理' },
      { path: '/system/role', title: '角色管理' },
	  { path: '/system/resources', title: '菜单管理' },
	  { path: '/system/route', title: '路由管理' },
	  { path: '/system/dict', title: '字典管理' },
	  { path: '/system/schedule', title: '定时器管理'}
    ]
  }
]
