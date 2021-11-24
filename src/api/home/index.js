/*
 * @Author: 龙际妙
 * @Date: 2021-11-23 17:04:05
 * @Description:
 * @FilePath: \music-web-vue\src\api\home\index.js
 * @LastEditTime: 2021-11-23 17:04:05
 * @LastEditors: Please set LastEditors
 */
import request from '../../utils/request'

// 获取操作日志列表
export function index(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/index',
    method: 'get',
    data,
  })
}
