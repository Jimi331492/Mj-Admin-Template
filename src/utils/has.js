/*
 * @Author: 龙际妙
 * @Date: 2021-11-05 07:29:28
 * @Description:
 * @FilePath: \music-web-vue\src\utils\has.js
 * @LastEditTime: 2021-11-11 10:20:59
 * @LastEditors: Please set LastEditors
 */

// import App from '../App.vue'

// const has = App.directive('has', {
//   bind: function (el, binding, vnode) {
//     // 获取页面按钮权限
//     let btnPermissionsArr = []
//     if (binding.value) {
//       // 如果指令传值，获取指令参数，根据指令参数和当前登录人按钮权限做比较。
//       btnPermissionsArr = Array.of(binding.value)
//     } else {
//       // 否则获取路由中的参数，根据路由的btnPermissionsArr和当前登录人按钮权限做比较。
//       btnPermissionsArr = vnode.context.$route.meta.btnPermissions
//     }
//     if (!App.prototype.$_has(btnPermissionsArr)) {
//       el.parentNode.removeChild(el)
//     }
//   },
// })
// // 权限检查方法
// App.prototype.$_has = function (value) {
//   let isExist = false
//   // 获取用户按钮权限
//   let btnPermissionsStr = this.$store.state.buttons
//   if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
//     return false
//   }
//   if (value.indexOf(btnPermissionsStr) > -1) {
//     isExist = true
//   }
//   return isExist
// }

// export { has }
