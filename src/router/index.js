/*
 * @Author: 龙际妙
 * @Date: 2021-10-14 18:32:18
 * @Description:
 * @FilePath: \music-web-vue\src\router\index.js
 * @LastEditTime: 2021-11-18 13:14:36
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
  if (!homeRouter || homeRouter.length == 0) {
    router.addRoute({ path: '/:pathMatch(.*)*', name: 'err', meta: { title: '网页不存在' }, component: Error })
    return
  }

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
