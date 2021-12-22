<!--
 * @Author: 龙际妙
 * @Date: 2021-10-14 18:32:39
 * @Description: 
 * @FilePath: \MjAdmin-Tamplate-Vue\README.md
 * @LastEditTime: 2021-12-22 18:07:42
 * @LastEditors: Please set LastEditors
-->
# Mj-Admin-Template
## 一种RBAC权限模型基于shiro权限框架的通用权限管理模板，
### 简介
- 前端（对应master分支）：Vue3+路由VueRouter+状态管理Vuex+组件库ElementPlus Http库axios 数据可视化Echarts 粒子效果vue-particles（没找到对应CDN资源，所以首屏渲染比较慢）
- 后端（对应springboot分支）：Springboot2+数据库操作mybatisPlus+Swagger3自动生成接口文档+权限框架shrio+jwt
- serve分支为静态部署的前端页面[点击预览](https://www.my3iao.com/Mj-Admin-Template/#/login)由于没有服务器后端项目没有部署，所以具体功能实现不了

## 实现的功能

### 前端
前端权限控制：根据不同角色的权限动态生成路由（菜单），通过Vue自定义指令实现按钮级别颗粒度的权限控制，前端的权限控制主要是配合后端提高用户体验，遵循可见即可操作原则

### 后端
后端通过Shiro安全框架校验http请求头携带token（jwt生成）是否合法,并获取到用户的权限信息进行权限的鉴定，放行。在数据安全方面，机密信息采用MD5算法加密传输，其中用户密码采用MD5+salt加密之后储存数据库。


