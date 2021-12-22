/*
 * @Author: 龙际妙
 * @Date: 2021-10-14 18:32:18
 * @Description:
 * @FilePath: \music-web-vue\babel.config.js
 * @LastEditTime: 2021-12-22 11:03:19
 * @LastEditors: Please set LastEditors
 */
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // plugins: ['transform-remove-console']
  plugins: [...prodPlugins, '@babel/plugin-syntax-dynamic-import'],
}
