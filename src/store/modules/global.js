/*
 * @Author: 龙际妙
 * @Date: 2021-11-08 04:35:05
 * @Description:
 * @FilePath: \music-web-vue\src\store\modules\global.js
 * @LastEditTime: 2021-11-08 20:24:47
 * @LastEditors: Please set LastEditors
 */
const global = {
  state: {
    collapse: false,
    tagList: [],
  },
  mutations: {
    // 保存是否展开侧边栏
    SET_COLLAPSE(state, collapse) {
      state.collapse = collapse
    },
    // 保存Tag历史浏览标签
    SET_TAGLIST(state, tagList) {
      state.tagList = tagList
    },
  },
  actions: {
    changeSideBar({ commit }, collapse) {
      commit('SET_COLLAPSE', collapse)
    },

    saveTagHist({ commit }, tagList) {
      commit('SET_COLLAPSE', tagList)
    },
  },
}

export default global
