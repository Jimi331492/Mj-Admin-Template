/*
 * @Author: 龙际妙
 * @Date: 2021-11-03 05:21:32
 * @Description:
 * @FilePath: \music-web-vue\src\api\system\log.js
 * @LastEditTime: 2021-11-03 05:23:17
 * @LastEditors: Please set LastEditors
 */
import request from '../../utils/request'

// 用户登录
export function queryLog(data) {
  //传数据写入data，不传则不需要
  return request({
    url: '/log/query',
    method: 'post',
    data,
  })
}
