/*
 * @Author: 龙际妙
 * @Date: 2021-11-08 04:33:01
 * @Description:
 * @FilePath: \music-web-vue\src\store\getters.js
 * @LastEditTime: 2021-11-08 05:10:56
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
}

export default getters
