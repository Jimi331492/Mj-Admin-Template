/*
 * @Author: 龙际妙
 * @Date: 2021-11-14 19:22:40
 * @Description:
 * @FilePath: \music-web-vue\src\api\features\front.js
 * @LastEditTime: 2021-11-14 19:23:56
 * @LastEditors: Please set LastEditors
 */
import request from '../../utils/request'

// 用户登录
export function getPage(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/page/selectAll',
    method: 'get',
    data,
  })
}
