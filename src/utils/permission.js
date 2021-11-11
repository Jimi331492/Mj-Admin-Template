// /*
//  * @Author: 龙际妙
//  * @Date: 2021-11-08 01:42:32
//  * @Description:
//  * @FilePath: \music-web-vue\src\utils\permission.js
//  * @LastEditTime: 2021-11-10 17:30:43
//  * @LastEditors:
//  */
// import router from '../router'
// import store from '../store'

// const whiteList = ['/login']
// router.beforeEach(async (to, from, next) => {
//   document.title = to.meta.title
//   // 获取用户token，用来判断当前用户是否登录
//   const hasToken = localStorage.getItem('Token')
//   if (hasToken) {
//     if (to.path === '/login') {
//       next({ path: '/' })
//     } else {
//       //异步获取store中的路由
//       let route = store.state.user.addRoutes
//       // console.log(route)
//       // return false
//       // console.log(route)
//       const hasRouters = route && route.length > 0
//       //判断store中是否有路由，若有，进行下一步
//       if (hasRouters) {
//         // console.log(112)
//         next()
//       } else {
//         //store中没有路由，则需要获取获取异步路由，并进行格式化处理
//         try {
//           store.dispatch('leftList').then((res) => {
//             const accessRoutes = getAsyncRoutes(store.state.user.addRoutes)
//             // // 动态添加格式化过的路由
//             router.addRoutes(accessRoutes)
//             next({ ...to, replace: true })
//           })
//         } catch (error) {
//           next('/logins')
//         }
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next('/logins')
//     }
//   }
// })

// router.afterEach(() => {})
