/*
 * @Author: 龙际妙
 * @Date: 2021-11-08 04:33:01
 * @Description:
 * @FilePath: \music-web-vue\src\store\getters.js
 * @LastEditTime: 2021-11-12 00:43:07
 * @LastEditors: Please set LastEditors
 */
const getters = {
  // 全局数据
  collapse: (state) => state.global.collapse,
  tagList: (state) => state.global.tagList,

  // 用户数据
  userId: (state) => state.user.userId,
  token: (state) => state.user.token,
  userBaseInfo: (state) => state.user.userBaseInfo,
  roleInfo: (state) => state.user.roleInfo,
  menusInfo: (state) => state.user.menusInfo,
  asyncRouter: (state) => state.user.asyncRouter,
  permList: (state) => state.user.permList,
  homeRouter: (state) => state.user.homeRouter,

  // 权限相关
}

export default getters
