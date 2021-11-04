/*
 * @Author: 龙际妙
 * @Date: 2021-10-21 20:42:35
 * @Description:
 * @FilePath: \music-web-vue\src\api\system\menu.js
 * @LastEditTime: 2021-11-04 04:09:09
 * @LastEditors: Please set LastEditors
 */
import request from '../../utils/request'
// 查找所用菜单
export function getRight(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/menu/selectAll',
    method: 'get',
    data,
  })
}
