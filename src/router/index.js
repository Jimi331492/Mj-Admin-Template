/*
 * @Author: 龙际妙
 * @Date: 2021-10-14 18:32:18
 * @Description:
 * @FilePath: \music-web-vue\src\router\index.js
 * @LastEditTime: 2021-11-14 15:38:47
 * @LastEditors: Please set LastEditors
 */
import { createRouter, createWebHashHistory } from 'vue-router'

// import Login from '../views/Login'
// import { getHomeRouter } from '../utils/myFunction'
const Login = () => import(/* webpackChunkName: "public" */ '../views/Login')
const Error = () => import(/* webpackChunkName: "public" */ '../views/Error')
// import Error from '../views/Error'

const Layout = () => import(/* webpackChunkName: "public" */ '../views/Layout')
// const Error = () => import(/* webpackChunkName: "public" */ '../views/Error')
const Welcome = () => import(/* webpackChunkName: "public" */ '../views/welcome/Welcome')
const UserInfo = () => import(/* webpackChunkName: "public" */ '../views/welcome/UserInfo')

// const User = () => import(/* webpackChunkName: "admin" */ '../views/system/User')
// const Role = () => import(/* webpackChunkName: "admin" */ '../views/system/Role')
// const Menu = () => import(/* webpackChunkName: "menu" */ '../views/system/Menu')
// const Log = () => import(/* webpackChunkName: "watch" */ '../views/log/Log')
// const Front = () => import(/* webpackChunkName: "function" */ '../views/features/Front')
// const Rear = () => import(/* webpackChunkName: "function" */ '../views/features/Rear')
// const Test = () => import(/* webpackChunkName: "funciton" */ '../views/features/Test')

export const constRoutes = [
  { path: '/', redirect: '/login' },
  { path: '/login', meta: { title: '通用权限管理系统' }, component: Login },
  // {
  //   path: '/home',
  //   component: Layout,
  //   redirect: '/welcome',
  //   children: [
  //     {
  //       path: '/welcome',
  //       component: Welcome,
  //       meta: {
  //         title: '首页',
  //       },
  //     },
  //     {
  //       path: '/userinfo',
  //       component: UserInfo,
  //       meta: {
  //         title: '个人信息',
  //       },
  //     },
  //     {
  //       name: 'User',
  //       path: '/system/user',
  //       component: User,
  //       meta: {
  //         title: '用户管理',
  //       },
  //     },

  //     {
  //       path: '/system/role',
  //       component: Role,
  //       meta: {
  //         title: '角色管理',
  //       },
  //     },
  //     {
  //       path: '/system/menu',
  //       component: Menu,
  //       meta: {
  //         title: '菜单管理',
  //       },
  //     },
  //     {
  //       path: '/monitor/log',
  //       component: Log,
  //       meta: {
  //         title: '日志管理',
  //       },
  //     },
  //     {
  //       path: '/code/web',
  //       component: Front,
  //       meta: {
  //         title: '前端模块',
  //       },
  //     },
  //     {
  //       path: '/code/java',
  //       component: Rear,
  //       meta: {
  //         title: '后端模块',
  //       },
  //     },
  //     {
  //       path: '/code/test',
  //       component: Test,
  //       meta: {
  //         title: '测试模块',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'err',
  //   component: Error,
  // },
]

const readyNewRouter = () =>
  new createRouter({
    scrollBehavior: () => ({ top: 0 }),
    history: createWebHashHistory(),
    routes: constRoutes,
  })

export const router = readyNewRouter()

//重置路由(用于退出登录时重置路由)
export function resetRouter() {
  const newRouter = createRouter({
    routes: constRoutes,
    history: createWebHashHistory(),
  })
  router.matcher = newRouter.matcher
}

const loadView = (view) => {
  return () => import(/* webpackChunkName: "asyncRouter" */ `../views${view}`)
}

//动态路由
export function createRoute(homeRouter) {
  console.log(homeRouter)
  if (!homeRouter || homeRouter.length == 0) return

  router.addRoute(homeRouter)
  router.addRoute({ path: '/:pathMatch(.*)*', name: 'err', meta: { title: '网页不存在' }, component: Error })
}

//刷新时浏览器路由不丢失
if (sessionStorage.getItem('homeRouter')) {
  let homeRouterStr = sessionStorage.getItem('homeRouter')
  let homeRouter = JSON.parse(homeRouterStr)

  // console.log(homeRouter, 'obj')
  homeRouter.component = Layout
  homeRouter.children.forEach((item, index) => {
    if (index === 0) {
      item.component = Welcome
    } else if (index === 1) {
      item.component = UserInfo
    } else {
      item.component = loadView(item.path)
    }
  })
  homeRouter && createRoute(homeRouter)
}

export default router
