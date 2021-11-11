/*
 * @Author: 龙际妙
 * @Date: 2021-10-14 18:32:18
 * @Description:
 * @FilePath: \music-web-vue\src\main.js
 * @LastEditTime: 2021-11-12 01:40:33
 * @LastEditors: Please set LastEditors
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './assets/css/global.css'
import axios from 'axios'
import './permission' //路由权限
const app = createApp(App)
app.config.globalProperties.$http = axios

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
  let isExist = false
  // 获取用户按钮权限

  let perms = [...store.getters.permList]

  if (perms == undefined || perms == null) {
    return false
  }
  if (perms.indexOf(value) > -1) {
    isExist = true
  }

  return isExist
}

// 注册 (功能指令)
app.directive('has', (el, binding) => {
  // 没有权限
  if (!app.config.globalProperties.$_has(binding.value.perm)) {
    if (binding.value.perm === 'user:revoke') {
      //   el.removeChild(el.lastChild)
      el.lastChild.style.display = 'none'
      console.log('ele', el.lastChild)
    } else {
      console.log(el.parentNode)
      el.style.display = 'none'
    }
  } else {
    //   有权限
    if (binding.value.perm === 'user:lock') {
      el.nextSibling.style.display = 'none'
    }
    //   有权限

    // if (binding.value.perm === 'user:set' || binding.value.perm === 'user:update' || binding.value.perm === 'user:delete') {
    //   // 无权限没有被隐藏
    //   el.set
    // }
  }
})

app.use(router).use(store).use(ElementPlus, { locale }).mount('#app')
