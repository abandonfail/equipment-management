export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/welcome', icon: 'smile', component: './Welcome', name: '欢迎页' },
  {
    path: '/category',
    icon: 'tags', 
    name: '分类管理',
    component: './Category', 
    access: 'isLoggedIn',
  },
  {
    path: '/device',
    icon: 'appstore',
    name: '设备管理',
    component: './Device',
    access: 'isLoggedIn',
  },
  {
    path: '/location',
    icon: 'environment',
    name: '位置管理',
    component: './Location',
    access: 'isLoggedIn',
  },
  {
    path: '/maintenance-order',
    icon: 'tool',
    name: '维修工单管理',
    component: './MaintenanceOrder',
    access: 'canAdminOrMaintenance', 
  },
  {
    path: '/admin/user',
    name: '用户管理',
    icon: 'table',
    access: 'canAdmin',
    component: './Admin/User',
  },
  {
    path: '/account/settings',
    name: '个人设置',
    icon: 'setting',
    component: './Settings',
    access: 'isLoggedIn',
    hideInMenu: true, // 不显示在左侧菜单中
  },  
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
