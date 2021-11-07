/*
 * @Author: 龙际妙
 * @Date: 2021-10-25 17:25:07
 * @Description:
 * @FilePath: \music-web-vue\src\api\system\role.js
 * @LastEditTime: 2021-11-05 01:51:29
 * @LastEditors: Please set LastEditors
 */

import request from '../../utils/request'

// 分页查询角色
export function selectAllRole() {
  //传数据写入data，不传则不需要
  return request({
    url: '/role/all',
    method: 'get',
  })
}

// 查询所有角色
export function queryRoleById(data) {
  //传数据写入data，不传则不需要
  return request({
    method: 'get',
    url: `/role/${data}`,
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
    url: `/role/${data}`,
    method: 'delete',
    data,
  })
}

// 删除角色
export function updataRoleInfo(data) {
  //传数据写入data，不传则不需要
  return request({
    url: `/role/update`,
    method: 'put',
    data,
  })
}

// 给角色授权
export function setAuth(data) {
  if (data.roleId === undefined || data.idStr === undefined) return
  //传数据写入data，不传则不需要
  return request({
    url: `/role/setAuth`,
    method: 'post',
    data,
  })
}

// 取消角色授权
export function deleteAuth(roleId, menuId) {
  if (menuId === undefined || roleId === undefined) {
    return
  }
  //传数据写入data，不传则不需要
  return request({
    url: `/role/${roleId}/perm/${menuId}`,
    method: 'delete',
  })
}
