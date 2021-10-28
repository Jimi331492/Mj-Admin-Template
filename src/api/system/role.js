/*
 * @Author: 龙际妙
 * @Date: 2021-10-25 17:25:07
 * @Description:
 * @FilePath: \music-web-vue\src\api\system\role.js
 * @LastEditTime: 2021-10-25 17:26:35
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
