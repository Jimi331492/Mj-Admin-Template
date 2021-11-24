/*
 * @Author: 龙际妙
 * @Date: 2021-11-03 05:21:32
 * @Description:
 * @FilePath: \music-web-vue\src\api\system\log.js
 * @LastEditTime: 2021-11-22 19:43:36
 * @LastEditors: Please set LastEditors
 */
import request from '../../utils/request'

// 获取操作日志列表
export function queryLog(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/log/query',
    method: 'post',
    data,
  })
}

// 获取登录日志列表
export function queryLoginLog(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/loginLog/query',
    method: 'post',
    data,
  })
}
