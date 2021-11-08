/*
 * @Author: 龙际妙
 * @Date: 2021-11-08 01:46:20
 * @Description:
 * @FilePath: \music-web-vue\src\store\modules\user.js
 * @LastEditTime: 2021-11-08 20:47:03
 * @LastEditors: Please set LastEditors
 */

import { Login, getUserPermsInfo } from '../../api/system/user'

const user = {
  state: {
    init: false,
    userId: 0,
    token: '',
    roleInfo: {},
    menusInfo: {},
    userBaseInfo: {},
  },
  mutations: {
    INIT(state, init) {
      state.init = init
    },
    // 保存用户ID
    SET_USERID(state, userId) {
      state.userId = userId
    },

    SET_TOKEN(state, token) {
      state.token = token
    },

    // 修改用户头像
    SET_AVATAR(state, avatarUrl) {
      state.userBaseInfo.avatar = avatarUrl
    },

    // 保存用户基本信息
    SET_BASEINFO(state, baseInfo) {
      state.userBaseInfo = baseInfo
    },

    // 保存用户角色信息
    SET_ROLEINFO(state, roleInfo) {
      state.roleInfo = roleInfo
    },

    // 保存用户菜单信息
    SET_MENUSINFO(state, menusInfo) {
      state.menusInfo = menusInfo
    },
  },
  actions: {
    // 封装用户登录的接口
    userLogin({ commit }, loginForm) {
      return new Promise((resolve, reject) => {
        Login(loginForm)
          .then((data) => {
            const res = data.data
            if (res.code !== 200) return reject(res)
            commit('SET_USERID', res.data.userId)
            commit('SET_TOKEN', res.data.token)
            sessionStorage.setItem('token', res.data.token)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 封装用户登录之后获取用户信息的接口
    getUserInfo({ commit }, userId) {
      return new Promise((resolve, reject) => {
        getUserPermsInfo(userId)
          .then((data) => {
            const res = data.data

            if (res.code !== 200) return reject(res)
            commit('SET_BASEINFO', res.data.userBaseInfo)
            commit('SET_ROLEINFO', res.data.roleInfo)
            commit('SET_MENUSINFO', res.data.menusInfo)
            commit('INIT', true)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
  modules: {},
}

export default user
