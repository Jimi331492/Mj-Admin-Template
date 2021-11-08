/*
 * @Author: 龙际妙
 * @Date: 2021-10-14 18:32:18
 * @Description:
 * @FilePath: \music-web-vue\src\store\index.js
 * @LastEditTime: 2021-11-08 20:43:48
 * @LastEditors: Please set LastEditors
 */
import { createStore } from 'vuex'
import user from './modules/user'
import global from './modules/global'
import getters from './getters'

const store = createStore({
  modules: {
    global,
    user,
  },
  mutations: {
    USER_LOGOUT() {
      sessionStorage.clear()
      user.userId = 0
      global.collapse = false
      user.token = ''
      user.userBaseInfo = {}
      user.roleInfo = {}
      user.menusInfo = {}
      user.init = false
    },
  },
  actions: {
    // USER_LOGOUT({ commit }) {
    //   commit('USER_LOGOUT')
    // },
  },
  getters,
})

// const store = createStore({
//   state: {
//     init: false,
//     collapse: false,
//     userId: 0,
//     roleInfo: {},
//     menusInfo: {},
//     userBaseInfo: {},
//     tagList: [],
//     buttons: [],
//   },
//   mutations: {
//     set_init: (state, status) => {
//       state.init = status //是permission.js中的初始化判断
//       // 注意data中要引入
//     },
//     // 保存是否展开侧边栏
//     setCollapse(state, collapse) {
//       state.collapse = collapse
//     },

//     setTagList(state, tagList) {
//       state.tagList = tagList
//     },

//     // 保存用户ID
//     setUserId(state, userId) {
//       state.userId = userId
//     },

//     // 保存用户角色信息
//     setRoleInfo(state, roleInfo) {
//       state.roleInfo = roleInfo
//     },

//     // 保存用户菜单信息
//     setMenusInfo(state, menusInfo) {
//       state.menusInfo = menusInfo
//     },

//     // 保存用户基本信息
//     setUserBaseInfo(state, baseInfo) {
//       state.userBaseInfo = baseInfo
//     },

//     // 实现前端按钮控制
//     SET_BUTTONS: (state, buttons) => {
//       state.buttons = buttons
//     },

//     LOGOUT({ commit, state }) {
//       sessionStorage.clear()
//       state.userId = 0
//       state.avatarUrl = ''
//       state.userBaseInfo = {}
//       commit('set_init', false)
//     },
//   },
//   actions: {
//     // 不知道怎么用，按钮权限控制
//     // SET_BUTTONS(context, button) {
//     //   this.state.buttons.push(button)
//     //   var buttons = this.state.buttons
//     //   console.log(123)
//     //   console.log(buttons)
//     //   context.commit('SET_BUTTONS', buttons)
//     // },
//     getUserInfo({ commit }, userId) {
//       return new Promise((resolve, reject) => {
//         getUserPermsInfo(userId)
//           .then((data) => {
//             const res = data
//             commit('setUserBaseInfo', res.data.userBaseInfo)
//             commit('setRoleInfo', res.data.roleInfo)
//             commit('setMenusInfo', res.data.menusInfo)
//             resolve()
//           })
//           .catch((error) => {
//             reject(error)
//           })
//       })
//     },
//   },
//   modules: {},
// })
// export default store

export default store
