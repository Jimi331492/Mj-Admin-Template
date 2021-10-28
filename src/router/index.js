/*
 * @Author: 龙际妙
 * @Date: 2021-10-14 18:32:18
 * @Description:
 * @FilePath: \music-web-vue\src\router\index.js
 * @LastEditTime: 2021-10-26 11:28:16
 * @LastEditors: Please set LastEditors
 */
import { createRouter, createWebHashHistory } from 'vue-router'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/Login')
const Layout = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/Layout')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/welcome/Welcome')
const UserInfo = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/welcome/UserInfo')
const User = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/system/User')
const Role = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/system/Role')
const Menu = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/system/Menu')
const Log = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/log/Log')

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Layout,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/userinfo', component: UserInfo },
      { path: '/system/user', component: User },
      { path: '/system/role', component: Role },
      { path: '/system/menu', component: Menu },
      { path: '/monitor/log', component: Log },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, form, next) => {
  // to 将要访问的路径
  // from 代表哪个路径跳转而来
  // next()函数表示放行 next('./login')强制跳转
  if (to.path === '/login') {
    return next()
  }
  // 获取token
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
