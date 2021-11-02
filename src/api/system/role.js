/*
 * @Author: 龙际妙
 * @Date: 2021-10-25 17:25:07
 * @Description:
 * @FilePath: \music-web-vue\src\api\system\role.js
 * @LastEditTime: 2021-11-02 17:51:38
 * @LastEditors: Please set LastEditors
 */

import request from '../../utils/request'

// 分页查询角色
export function queryRole(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/role/query',
    method: 'post',
    data,
  })
}

// 分页查询角色
export function queryRoleById(data) {
  //传数据写入data，不传则不需要
  return request({
    method: 'post',
    url: '/role/select',
    data,
  })
}

// 查询角色菜单
export function getRoleMenus(data) {
  //传数据写入data，不传则不需要
  return request({
    url: `/menu/returnByRole?roleId=${data}`,
    method: 'get',
  })
}

// 新增角色
export function addRole(data) {
  //传数据写入data，不传则不需要
  return request({
    url: `/role/add`,
    method: 'post',
    data,
  })
}

// 删除角色
export function deleteRole(data) {
  //传数据写入data，不传则不需要
  return request({
    url: `/role/delete`,
    method: 'post',
    data,
  })
}
