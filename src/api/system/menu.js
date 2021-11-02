/*
 * @Author: 龙际妙
 * @Date: 2021-10-21 20:42:35
 * @Description:
 * @FilePath: \music-web-vue\src\api\home\home.js
 * @LastEditTime: 2021-10-23 20:01:28
 * @LastEditors: Please set LastEditors
 */
import request from '../../utils/request'
// 查找所用菜单
export function getMenu(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/menu/selectAll',
    method: 'get',
    data,
  })
}
