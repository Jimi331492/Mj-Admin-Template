/*
 * @Author: your name
 * @Date: 2021-07-28 06:07:22
 * @LastEditTime: 2021-12-22 17:12:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MjAdmin-Tamplate-Vue\vue.config.js
 */
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  'element-plus': 'ElementPlus',
  axios: 'axios',
  lodash: '_',
  echarts: 'echarts',
}

const cdn = {
  css: ['https://unpkg.com/nprogress@0.2.0/nprogress.css', 'https://unpkg.com/element-plus@1.0.2-beta.65/lib/theme-chalk/index.css'],

  js: [
    'https://unpkg.com/vue@3.2.26/dist/vue.global.js',
    'https://unpkg.com/nprogress@0.2.0/nprogress.js',
    'https://cdn.jsdelivr.net/npm/vue-router@4.0.0/dist/vue-router.global.min.js',
    'https://unpkg.com/vuex@4.0.2/dist/vuex.global.js',
    'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
    'https://unpkg.com/element-plus@1.0.2-beta.65/lib/index.full.js',
    'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
    'https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js',
  ],
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  chainWebpack: (config) => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', (config) => {
      config.entry('app').clear().add('./src/main-prod.js')
      // config.set('externals', externals)
      config.externals(externals)
      config.plugin('html').tap((args) => {
        args[0].isProd = true
        args[0].cdn = cdn
        return args
      })
    })

    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap((args) => {
        args[0].isProd = false
        return args
      })
    })
  },
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack')({
        /* options */
      }),
      require('unplugin-auto-import/webpack')({
        /* options */
      }),
    ],
  },
}
