import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {path: '/opening/herb', 
    component: () => import('@/views/opening/herb/index'),
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  }
]

export const asyncRouterMap = [
  {
    path:'/info',
    component: Layout,
    redirect: '/info/bigscreen',
    name: 'info',
    meta: {title: '基础信息', icon: 'order'},
    children: [
      {
        path: 'bigscreen',
        name: 'bigscreen',
        component: () => import('@/views/info/bigscreen/index'),
        meta: {title: '大屏配置管理', icon: 'product-list'}
      },
      {
        path: 'manager',
        name: 'manager',
        component: () => import('@/views/info/manager/index'),
        meta: {title: '管理员管理'}
      },
      {
        path: 'addManager',
        name: 'addManager',
        component: () => import('@/views/info/manager/add'),
        meta: {title: '新增管理员'},
        hidden: true
      },
      {
        path: 'updateManager',
        name: 'updateManager',
        component: () => import('@/views/info/manager/update'),
        meta: {title: '编辑管理员'},
        hidden: true
      },
      {
        path: 'herb',
        name: 'herb',
        component: () => import('@/views/info/herb/index'),
        meta: {title: '药草管理', icon: 'product-list'}
      },
      {
        path: 'addHerb',
        name: 'addHerb',
        component: () => import('@/views/info/herb/add'),
        meta: {title: '新增药草'},
        hidden: true
      },
      {
        path: 'updateHerb',
        name: 'updateHerb',
        component: () => import('@/views/info/herb/update'),
        meta: {title: '编辑药草'},
        hidden: true
      },
      {
        path: 'herbType',
        name: 'herbType',
        component: () => import('@/views/info/herbType/index'),
        meta: {title: '药草类型管理', icon: 'product-list'}
      },
      {
        path: 'addHerbType',
        name: 'addHerbType',
        component: () => import('@/views/info/herbType/add'),
        meta: {title: '新增药草类型'},
        hidden: true
      },
      {
        path: 'updateHerbType',
        name: 'updateHerbType',
        component: () => import('@/views/info/herbType/update'),
        meta: {title: '编辑药草类型'},
        hidden: true
      },
      {
        path: 'processing',
        name: 'processing',
        component: () => import('@/views/info/processing/index'),
        meta: {title: '加工管理', icon: 'product-list'}
      },
      {
        path: 'addProcessing',
        name: 'addProcessing',
        component: () => import('@/views/info/processing/add'),
        meta: {title: '新增加工'},
        hidden: true
      },
      {
        path: 'updateProcessing',
        name: 'updateProcessing',
        component: () => import('@/views/info/processing/update'),
        meta: {title: '编辑加工'},
        hidden: true
      },
      {
        path: 'diet',
        name: 'diet',
        component: () => import('@/views/info/diet/index'),
        meta: {title: '药膳管理', icon: 'product-list'}
      },
      {
        path: 'addDiet',
        name: 'addDiet',
        component: () => import('@/views/info/diet/add'),
        meta: {title: '新增药膳'},
        hidden: true
      },
      {
        path: 'updateDiet',
        name: 'updateDiet',
        component: () => import('@/views/info/diet/update'),
        meta: {title: '编辑药膳'},
        hidden: true
      },
      {
        path: 'sales',
        name: 'sales',
        component: () => import('@/views/info/sales/index'),
        meta: {title: '销售管理', icon: 'product-list'}
      },
      {
        path: 'addSales',
        name: 'addSales',
        component: () => import('@/views/info/sales/add'),
        meta: {title: '新增销售'},
        hidden: true
      },
      {
        path: 'updateSales',
        name: 'updateSales',
        component: () => import('@/views/info/sales/update'),
        meta: {title: '编辑销售'},
        hidden: true
      },
      {
        path: 'yield',
        name: 'yield',
        component: () => import('@/views/info/yield/index'),
        meta: {title: '产量管理', icon: 'product-list'}
      },
      {
        path: 'addYield',
        name: 'addYield',
        component: () => import('@/views/info/yield/add'),
        meta: {title: '新增产量'},
        hidden: true
      },
      {
        path: 'updateYield',
        name: 'updateYield',
        component: () => import('@/views/info/yield/update'),
        meta: {title: '编辑产量'},
        hidden: true
      },
    ]
  },
  {
    path:'/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: {title: '权限', icon: 'ums'},
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {title: '用户列表', icon: 'ums-admin'}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: {title: '角色列表', icon: 'ums-role'}
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/ums/role/allocMenu'),
        meta: {title: '分配菜单'},
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/ums/role/allocResource'),
        meta: {title: '分配资源'},
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: {title: '菜单列表', icon: 'ums-menu'}
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('@/views/ums/menu/add'),
        meta: {title: '添加菜单'},
        hidden: true
      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('@/views/ums/menu/update'),
        meta: {title: '修改菜单'},
        hidden: true
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/ums/resource/index'),
        meta: {title: '资源列表', icon: 'ums-resource'}
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/ums/resource/categoryList'),
        meta: {title: '资源分类'},
        hidden: true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

