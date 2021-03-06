import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/admin',
    name: 'admin',
    component: Layout,
    meta: { title: '?????????', icon: 'el-icon-setting', roles: ['admin'] },
    redirect: '/admin/department',
    children: [
      {
        path: 'department',
        name: 'Department',
        component: () => import('@/views/department/index'),
        meta: { title: '????????????', icon: 'department', roles: ['department'] }
      },
      {
        path: 'ascription',
        name: 'ascription',
        component: () => import('@/views/admin/ascription/index'),
        meta: { title: '????????????', icon: 'el-icon-s-cooperation', roles: ['departments'] }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '????????????', icon: 'el-icon-user', roles: ['user'] }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/role/index'),
        meta: { title: '????????????', icon: 'role', roles: ['roles'] }
      },
      {
        path: 'upload',
        name: 'Upload',
        component: () => import('@/views/upload/Upload'),
        meta: { title: '????????????', icon: 'upload', roles: ['upload'] }
      },
      {
        path: 'quartz',
        name: 'quartzTask',
        component: () => import('@/views/task/index'),
        meta: { title: '????????????', icon: 'task', roles: ['task'] }
      }
    ]
  },
  {
    path: '/public',
    component: Layout,
    redirect: '/public/index',
    meta: { title: '????????????', icon: 'table', roles: ['charts'] },
    children: [
      {
        path: 'index',
        name: 'CurrentMonthDev',
        component: () => import('@/views/public/CurrentMonthDev'),
        meta: { title: '??????????????????', icon: 'charts', roles: ['whole'] }
      },
      {
        path: 'noactive',
        name: 'NoActive',
        component: () => import('@/views/public/NoActive'),
        meta: {
          title: '??????????????????', icon: 'download', roles: ['noactive']
        }
      },
      {
        path: 'commerce',
        name: 'Commerce',
        meta: { title: '????????????', icon: 'charts', roles: ['commerce'] },
        redirect: 'conversion',
        component: () => import('@/views/commerce/index'),
        children: [
          {
            path: 'conversion',
            name: 'Conversion',
            component: () => import('@/views/commerce/Conversion'),
            meta: { title: '???????????????', icon: 'charts', roles: ['conversion'] }
          },
          {
            path: 'thatday',
            name: 'thatDay',
            component: () => import('@/views/commerce/thatDay'),
            meta: { title: '?????????????????????', icon: 'charts', roles: ['todayDev'] }
          },
          {
            path: 'delivery',
            name: 'Delivery',
            component: () => import('@/views/commerce/delivery'),
            meta: { title: '??????????????????', icon: 'delivery', roles: ['delivery'] }
          }
        ]
      },
      {
        path: 'self',
        name: 'Self',
        redirect: 'target',
        component: () => import('@/views/public/self/index'),
        meta: { title: '????????????', icon: 'businessHall', roles: ['self'] },
        children: [
          {
            path: 'target',
            name: 'Target',
            component: () => import('@/views/public/self/target'),
            meta: { title: '???????????????', icon: 'businessHall', roles: ['selfhall'] }
          },
          {
            path: 'dev2person',
            name: 'Dev2Person',
            component: () => import('@/views/public/self/wholeDev2Person'),
            meta: { title: '??????????????????', icon: 'target', roles: ['dev2person'] }
          },
          {
            path: 'dev2Hall',
            name: 'Dev2Hall',
            component: () => import('@/views/public/self/wholeDev2Hall'),
            meta: { title: '??????????????????', icon: 'businessHall', roles: ['dev2hall'] }
          }
        ]
      },
      {
        path: 'stock',
        name: 'Stock',
        component: () => import('@/views/public/stock/index'),
        meta: { title: '????????????', icon: 'table', roles: ['stock'] },
        children: [
          {
            path: 'vip3',
            name: 'VIP3',
            component: () => import('@/views/public/stock/VIP3'),
            meta: { title: 'VIP3', icon: 'table', roles: ['stock'] }
          }
        ]
      },
      {
        path: 'task',
        name: 'Task',
        component: () => import('@/views/public/task'),
        meta: { title: '????????????', icon: 'target', roles: ['selftask'] }
      },
      {
        name: 'dayDevelopment',
        path: 'dayDevelopment',
        component: () => import('@/views/public/DayDevelopment'),
        meta: {
          title: '????????????????????????', icon: 'charts', roles: ['dayDev']
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
