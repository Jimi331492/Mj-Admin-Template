/*
 * @Author: 龙际妙
 * @Date: 2021-10-14 18:32:18
 * @Description:
 * @FilePath: \music-web-vue\src\store\index.js
 * @LastEditTime: 2021-10-31 00:15:18
 * @LastEditors: Please set LastEditors
 */
import { createStore } from 'vuex'

export default createStore({
  state: {
    collapse: false,
    userId: 0,
    avatarUrl: '',
    userBaseInfo: {},
  },
  mutations: {
    // 保存是否展开侧边栏
    setCollapse(state, collapse) {
      state.collapse = collapse
    },

    // 保存用户ID
    setUserId(state, userId) {
      state.userId = userId
    },

    // 保存用户头像地址
    setAvatarUrl(state, avatarUrl) {
      state.avatarUrl = avatarUrl
    },

    // 保存用户基本信息
    setUserBaseInfo(state, baseInfo) {
      state.userBaseInfo = baseInfo
    },
  },
  actions: {},
  modules: {},
})
