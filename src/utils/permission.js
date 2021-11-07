/*
 * @Author: 龙际妙
 * @Date: 2021-11-08 01:42:32
 * @Description:
 * @FilePath: \music-web-vue\src\utils\permission.js
 * @LastEditTime: 2021-11-08 03:58:01
 * @LastEditors: Please set LastEditors
 */
import router from '../router'
import store from '../store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-plus'
import 'element-plus/dist/index.css'
// import Cookies from 'js-cookie'
import { addRouter } from './addRouter'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (localStorage.getItem('token')) {
    // 判断token是否存在 不存在即为未登录
    if (to.path !== '/login') {
      if (store.state.init) {
        // 获取了动态路由 data一定true,就无需再次请求 直接放行
        next()
      } else {
        // data为false,一定没有获取动态路由,就跳转到获取动态路由的方法
        gotoRouter(to, next)
      }
    } else {
      Message({ message: '您已经登录', type: 'info' })
      next('/')
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 免登陆白名单 直接进入
      next()
    } else {
      if (to.path !== '/login') {
        // 重定向到登录页面 不能这么写 因为假如之前的角色是 管理员页面 后又登陆了非管理员 重定向的页面就可能不存在,就会导致404
        // next(`/login?redirect=${to.path}`)
        next('/login')
      } else {
        next()
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

function getRouter() {
  var menus = this.store.state.menusInfo
  return menus
  // return p
}
function gotoRouter(to, next) {
  getRouter() // 获取动态路由的方法
    .then((res) => {
      const asyncRouter = addRouter(res) // 进行递归解析
      asyncRouter.push({
        path: '*',
        redirect: '/404',
        hidden: true,
      })
      //   store.dispatch('user/setRouterList', asyncRouter) // 存储到vuex
      router.addRoutes(asyncRouter) // vue-router提供的addRouter方法进行路由
      // store.dispatch('user/GetInfo')
      store.commit('user/set_init', true)
      next({ ...to, replace: true }) // hack方法 确保addRo
    })
    .catch((e) => {
      console.log(e)
      localStorage.clear()
    })
}
