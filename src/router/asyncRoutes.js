/*
 * @Author: 龙际妙
 * @Date: 2021-11-04 16:51:33
 * @Description:
 * @FilePath: \music-web-vue\src\router\asyncRoutes.js
 * @LastEditTime: 2021-11-04 16:52:37
 * @LastEditors: Please set LastEditors
 */
var asyncRouetes = [
  {
    path: '/finance',
    component: () => import('../views/Finance'),
    meta: {
      title: '财务信息',
      roles: ['superadmin'],
    },
  },
  {
    path: '/staffs',
    component: () => import('../views/Staffs'),
    meta: {
      title: '员工信息',
      roles: ['superadmin'],
    },
  },
]
export default asyncRouetes
