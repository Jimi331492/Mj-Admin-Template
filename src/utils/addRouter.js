/*
 * @Author: 龙际妙
 * @Date: 2021-11-08 01:29:11
 * @Description:
 * @FilePath: \music-web-vue\src\utils\addRouter.js
 * @LastEditTime: 2021-11-09 04:40:50
 * @LastEditors: Please set LastEditors
 */
import { router, constRoutes } from '../router'
import store from '../store'

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

let asyncRouterList = new Array()

export const getAsyncRouter = (routers) => {
  routers.filter((itemRouter) => {
    if (itemRouter.url !== null) {
      asyncRouterList.push({ path: `/${itemRouter.url}`, meta: { title: itemRouter.menuName }, component: () => import(`../views/${itemRouter.url}`) })
      console.log(asyncRouterList)
    }
    // 是否存在子集
    if (itemRouter.menus && itemRouter.menus.length) {
      getAsyncRouter(itemRouter.menus)
    }
    return true
  })
}

export let finallyRouter = new Array()

export const getFinallyRouter = () => {
  let array = constRoutes[2].children.concat(asyncRouterList)
  console.log('array', array)
  finallyRouter = constRoutes
  finallyRouter[2].children = array
  console.log('finallyRouterList', finallyRouter)
  return finallyRouter
}

export const mountedRouter = (finallyRouter) => {
  finallyRouter.filter((item) => {
    router.addRoute(item)
  })
}

export function resetRouter() {
  const newRouter = router.readyNewRouter()
  router.resolve = newRouter.resolve // reset router
}
