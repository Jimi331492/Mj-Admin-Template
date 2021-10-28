/*
 * @Author: 龙际妙
 * @Date: 2021-10-13 13:21:41
 * @Description:
 * @FilePath: \music-web-vue\src\api\system\user.js
 * @LastEditTime: 2021-10-28 02:31:45
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

// 分页查询用户
export function queryUser(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/user/query',
    method: 'post',
    data,
  })
}

// 登录成功后根据id用户查询用户基本信息
export function getUserInfo(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/user/findBaseInfo',
    method: 'post',
    data,
  })
}

// 查找单个用户
export function getOnlyUser(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/user/select',
    method: 'post',
    data,
  })
}

// 修改用户信息
export function updateUserInfo(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/user/updateBase',
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
