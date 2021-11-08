/*
 * @Author: 龙际妙
 * @Date: 2021-10-14 18:32:18
 * @Description:
 * @FilePath: \music-web-vue\src\router\index.js
 * @LastEditTime: 2021-11-08 20:38:37
 * @LastEditors: Please set LastEditors
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
const Login = () => import(/* webpackChunkName: "public" */ '../views/Login')
const Layout = () => import(/* webpackChunkName: "public" */ '../views/Layout')
const Error = () => import(/* webpackChunkName: "public" */ '../views/Error')
const Welcome = () => import(/* webpackChunkName: "public" */ '../views/welcome/Welcome')
const UserInfo = () => import(/* webpackChunkName: "public" */ '../views/welcome/UserInfo')

const User = () => import(/* webpackChunkName: "admin" */ '../views/system/User')
const Role = () => import(/* webpackChunkName: "admin" */ '../views/system/Role')
const Menu = () => import(/* webpackChunkName: "menu" */ '../views/system/Menu')
const Log = () => import(/* webpackChunkName: "watch" */ '../views/log/Log')
const Front = () => import(/* webpackChunkName: "function" */ '../views/features/Front')
const Rear = () => import(/* webpackChunkName: "function" */ '../views/features/Rear')
const Test = () => import(/* webpackChunkName: "funciton" */ '../views/features/Test')

export const constRoutes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Layout,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome,
        meta: {
          title: '首页',
        },
      },
      {
        path: '/userinfo',
        component: UserInfo,
        meta: {
          title: '个人信息',
        },
      },
      {
        name: 'User',
        path: '/system/user',
        component: User,
        meta: {
          title: '用户管理',
        },
      },

      {
        path: '/system/role',
        component: Role,
        meta: {
          title: '角色管理',
        },
      },
      {
        path: '/system/menu',
        component: Menu,
        meta: {
          title: '菜单管理',
        },
      },
      {
        path: '/monitor/log',
        component: Log,
        meta: {
          title: '日志管理',
        },
      },
      {
        path: '/code/web',
        component: Front,
        meta: {
          title: '前端模块',
        },
      },
      {
        path: '/code/java',
        component: Rear,
        meta: {
          title: '后端模块',
        },
      },
      {
        path: '/code/test',
        component: Test,
        meta: {
          title: '测试模块',
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'err',
    component: Error,
  },
]

export const AsyncRouter = []

const readyNewRouter = () =>
  new createRouter({
    scrollBehavior: () => ({ top: 0 }),
    history: createWebHashHistory(),
    routes: constRoutes,
  })

const router = readyNewRouter()

router.beforeEach((to, form, next) => {
  // to 将要访问的路径
  // from 代表哪个路径跳转而来
  // next()函数表示放行 next('./login')强制跳转

  if (to.path === '/login') {
    return next()
  }
  // 获取token
  const tokenStr = store.getters.token
  if (!tokenStr) return next('/login')
  next()
})

export function resetRouter() {
  const newRouter = readyNewRouter()
  router.resolve = newRouter.resolve // reset router
}

export default router
