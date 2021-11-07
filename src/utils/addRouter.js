/*
 * @Author: 龙际妙
 * @Date: 2021-11-08 01:29:11
 * @Description:
 * @FilePath: \music-web-vue\src\utils\addRouter.js
 * @LastEditTime: 2021-11-08 03:54:59
 * @LastEditors: Please set LastEditors
 */

/**
 * 生成路由
 * @param {Array} menusList 格式化路由
 * @returns
 */
export function addRouter(menusList) {
  const router = []
  try {
    console.log('routerlist==', menusList)
    menusList.forEach((e) => {
      if (e.url !== null) {
        let e_new = {
          path: e.url,
          name: e.url.split('/')[e.url.split('/').length - 1],
          redirect: e.url,
          component: import(/* webpackChunkName: "admin" */ `../views${e.url}`),
        }
        e_new = { ...e_new, meta: { title: e.menuName } }
        router.push(e_new)
      }
    })
  } catch (error) {
    console.error(error)
    return []
  }
  return router
}

// export function addRouterchild(routerlist) {
//   const router = []
//   try {
//     console.log('addRouterchild==', routerlist)
//     routerlist.forEach((e) => {
//       if (e.url !== null) {
//         let e_new = {
//           path: e.url,
//           name: e.url.split('/')[e.url.split('/').length - 1],
//           component: (resolve) => require([`../views${e.url}`], resolve),
//         }
//         e_new = { ...e_new, meta: { title: e.title } }
//         router.push(e_new)
//       }
//     })
//   } catch (error) {
//     console.error(error)
//     return []
//   }
//   return router
// }
