/*
 * @Author: 龙际妙
 * @Date: 2021-10-13 13:21:41
 * @Description:
 * @FilePath: \music-web-vue\src\api\system\user.js
 * @LastEditTime: 2021-11-22 19:37:00
 * @LastEditors: Please set LastEditors
 */
import request from '../../utils/request'

// 用户登录
export function Login(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

// 用户登出
export function Logout(data) {
  //传数据写入data，不传则不需要
  return request({
    url: `/logout/${data}`,
    method: 'post',
    data,
  })
}

// 分页查询用户
export function queryUser(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/user/query',
    method: 'post',
    data,
  })
}

// 登录成功后根据id用户查询用户权限信息
export function getUserPermsInfo(data) {
  //传数据写入data，不传则不需要
  return request({
    url: `/user/baseInfo/${data}`,
    method: 'get',
  })
}

// 修改用户信息
export function updateUserInfo(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/user/baseInfo',
    method: 'put',
    data,
  })
}

// 修改用户头像
export function setAvatar(userId, url) {
  //传数据写入data，不传则不需要
  return request({
    url: `/user/${userId}/avatar?avatarUrl=${url}`,
    method: 'put',
  })
}

// 修改用户密码
export function updatePwd(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/user/updatePassword',
    method: 'post',
    data,
  })
}

// 用户注册
export function register(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/user/register',
    method: 'post',
    data,
  })
}

// 用户删除
export function deleteUser(data) {
  //传数据写入data，不传则不需要
  return request({
    url: `/user/delete/${data}`,
    method: 'delete',
    data,
  })
}

// 锁定用户
export function lockUser(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/user/lockUser',
    method: 'put',
    data,
  })
}
// 分配角色
export function setRole(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/user/setRole',
    method: 'post',
    data,
  })
}

// 撤销角色
export function cancelRole(userId, roleId) {
  if (userId === undefined || roleId === undefined) {
    return
  }
  //传数据写入data，不传则不需要
  return request({
    url: `/user/${userId}/role/${roleId}`,
    method: 'delete',
  })
}

// 查询用户人数
export function getUserCount() {
  //传数据写入data，不传则不需要
  return request({
    url: `/user/count`,
    method: 'get',
  })
}
