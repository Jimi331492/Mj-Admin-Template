/*
 * @Author: 龙际妙
 * @Date: 2021-11-11 00:45:51
 * @Description:
 * @FilePath: \music-web-vue\src\permission.js
 * @LastEditTime: 2021-11-11 03:01:01
 * @LastEditors: Please set LastEditors
 */
// 路哟i有
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'] // 没有重定向白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  //设置页面title
  document.title = to.meta.title

  // 判断用户是否登录
  const hasToken = sessionStorage.getItem('token')

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，重定向主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 判断用户获取到权限
      const hasRoles = store.getters.asyncRouter && store.getters.asyncRouter.length > 0
      if (hasRoles) {
        // 获取权限路由
        // const homeRouter = await JSON.parse(sessionStorage.getItem('homeRouter'))
        // if (from.fullPath === '/') {
        //   if (to.fullPath !== '/login') {
        //     //这里是判断如果上个页面不是登录页，就把路由添进去
        //     router.addRoute(homeRouter) //这里我用到了本地存储。在页面登录成功后，吧遍历好的路由存到了storage里面。
        //   }
        // }
        console.log(router, 'ss')
        next()
      } else {
        try {
          // 获取用户信息

          // router.addRoute(homeRouter)
          console.log(router)
          // 导航不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 移除token 返回登录
          await store.commit('USER_LOGOUT')
          console.error(error || '有错误')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 其他没有访问权限的页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g
//   const isChunkLoadFailed = error.message.match(pattern)
//   const targetPath = router.history.pending.fullPath
//   if (isChunkLoadFailed) {
//     router.replace(targetPath)
//   }
// })
