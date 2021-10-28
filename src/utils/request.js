/*
 * @Author: 龙际妙
 * @Date: 2021-10-13 13:22:12
 * @Description:
 * @FilePath: \music-web-vue\src\utils\request.js
 * @LastEditTime: 2021-10-23 20:05:33
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios'
import Cookies from 'js-cookie'
import { ElMessageBox, ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

//配置请求头
axios.defaults.baseURL = 'http://127.0.0.1:8888' //配置接口地址

// 请求携带token
axios.interceptors.request.use(
  (config) => {
    const tokens = sessionStorage.getItem('token') || Cookies.get('token')
    if (tokens) {
      config.headers.token = tokens // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
    }
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

const service = axios.create({
  timeout: 50000, // 请求超时时间
})

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// request token
service.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem('token') || Cookies.get('token')
    if (tokens) {
      config.headers['token'] = tokens
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor 拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.code == 401) {
      ElMessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // store.dispatch('user/resetToken').then(() => {
          //   location.reload()
          // })
          window.location.href = '/'
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    } else {
      return response
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service
