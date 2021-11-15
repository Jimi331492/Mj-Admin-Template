/*
 * @Author: 龙际妙
 * @Date: 2021-11-10 14:29:35
 * @Description:
 * @FilePath: \music-web-vue\src\utils\myFunction.js
 * @LastEditTime: 2021-11-14 15:38:00
 * @LastEditors: Please set LastEditors
 */
// import Layout from '../views/Layout'
// import Welcome from '../views/welcome/Welcome'
// import UserInfo from '../views/welcome/UserInfo'

const Layout = () => import(/* webpackChunkName: "public" */ '../views/Layout')
const Welcome = () => import(/* webpackChunkName: "public" */ '../views/welcome/Welcome')
const UserInfo = () => import(/* webpackChunkName: "public" */ '../views/welcome/UserInfo')

// const User = () => import(/* webpackChunkName: "admin" */ '../views/system/User')
// const Role = () => import(/* webpackChunkName: "admin" */ '../views/system/Role')
// const Menu = () => import(/* webpackChunkName: "menu" */ '../views/system/Menu')
// const Log = () => import(/* webpackChunkName: "watch" */ '../views/log/Log')
// const Front = () => import(/* webpackChunkName: "function" */ '../views/features/Front')
// const Rear = () => import(/* webpackChunkName: "function" */ '../views/features/Rear')
// const Test = () => import(/* webpackChunkName: "funciton" */ '../views/features/Test')
export let homeRouter = new Object({
  name: 'home',
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
  ],
})
const loadView = (view) => {
  return () => import(/* webpackChunkName: "asyncRouter" */ `../views/${view}`)
}
export let asyncRouter = new Array()
export let permList = new Array()
export const getAsyncRouter = (menusInfo) => {
  menusInfo.forEach((item) => {
    if (item.url !== null) {
      asyncRouter.push({
        name: `${item.url}`,
        path: `/${item.url}`,
        meta: { title: item.menuName, perms: item.perms },
        component: loadView(item.url),
      })
    }
    if (item.perms !== null) {
      permList.push(item.perms)
    }
    // 是否存在子集
    if (item.menus && item.menus.length) {
      getAsyncRouter(item.menus)
    }
    // console.log('item', item)
  })
  //   获取
}

export const getHomeRouter = () => {
  // 将用户的异步路由合并到首页路由的
  let array = homeRouter.children.concat(asyncRouter)
  homeRouter.children = array

  // console.log('asyncRouter', asyncRouter)
  // console.log('homeRouter', homeRouter)
}

export const reset = () => {
  //重置
  asyncRouter = []
  permList = []
  homeRouter = {
    name: 'home',
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
    ],
  }
}
