/*
 * @Author: 龙际妙
 * @Date: 2021-10-14 18:32:18
 * @Description:
 * @FilePath: \music-web-vue\src\main.js
 * @LastEditTime: 2021-11-25 23:01:03
 * @LastEditors: Please set LastEditors
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lodash from 'lodash'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import VueParticles from 'vue-particles'
import './assets/css/global.less'
import axios from 'axios'
import './permission' //路由权限
const app = createApp(App)
app.config.globalProperties.$http = axios
app.config.globalProperties.$_ = lodash

// 注册
// app.directive('my-directive', {
//   // 指令是具有一组生命周期的钩子：
//   // 在绑定元素的 attribute 或事件监听器被应用之前调用
//   created(el, binding) {},
//   // 在绑定元素的父组件挂载之前调用
//   beforeMount(el, binding) {},
//   // 绑定元素的父组件被挂载时调用
//   mounted(el, binding) {},
//   // 在包含组件的 VNode 更新之前调用
//   beforeUpdate(el, binding) {},
//   // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
//   updated(el, binding) {},
//   // 在绑定元素的父组件卸载之前调用
//   beforeUnmount(el, binding) {},
//   // 卸载绑定元素的父组件时调用
//   unmounted(el, binding) {},
// })

// 权限检查方法
app.config.globalProperties.$_has = function (value) {
  // 获取用户的所有按钮权限

  let perms = [...store.getters.permList]

  if (!(perms instanceof Array) || !(value instanceof Array)) return false
  const len = value.length
  // perms的长度小于value的长度，直接返回false
  if (perms.length < len) return false
  for (let i = 0; i < len; i++) {
    // 遍历value中的元素，遇到perms没有包含某个元素的，直接返回false
    if (!perms.includes(value[i])) return false
  }
  // 遍历结束，返回true
  return true
}

// 注册 按钮检测(功能指令)
app.directive('has', (el, binding) => {
  let perm = binding.value.perm.split(',')
  // 没有权限
  if (!app.config.globalProperties.$_has(perm)) {
    if (binding.value.perm === 'user:revoke') {
      //   el.removeChild(el.lastChild)
      el.lastChild.style.display = 'none'
      // console.log('ele', el.lastChild)
    } else {
      el.style.display = 'none'
    }
  } else {
    //   有权限
    if (binding.value.perm === 'user:lock') {
      el.nextSibling.style.display = 'none'
    }
    //   有权限
  }
})

// 注册 如果没有权限显示啥(功能指令)
app.directive('no-has', (el, binding) => {
  let perm = binding.value.perm.split(',')
  // 没有权限
  if (app.config.globalProperties.$_has(perm)) {
    el.style.display = 'none'
  }
})

app.use(router).use(store).use(ElementPlus, { locale }).use(VueParticles).mount('#app')
