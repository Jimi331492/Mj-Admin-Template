/*
 * @Author: 龙际妙
 * @Date: 2021-10-14 18:32:18
 * @Description:
 * @FilePath: \music-web-vue\src\main.js
 * @LastEditTime: 2021-10-24 23:09:49
 * @LastEditors: Please set LastEditors
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './assets/css/global.css'
import axios from 'axios'

const app = createApp(App)
app.config.globalProperties.$http = axios

app.use(store).use(router).use(ElementPlus, { locale }).mount('#app')
