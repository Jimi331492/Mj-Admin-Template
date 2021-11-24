/*
 * @Author: 龙际妙
 * @Date: 2021-11-18 14:46:33
 * @Description:
 * @FilePath: \music-web-vue\src\utils\avatar.js
 * @LastEditTime: 2021-11-18 15:52:31
 * @LastEditors: Please set LastEditors
 */

/**
 *@param widths 画布宽
 *@param heights 画布高
 *@param fontSize 字体大小
 *@param id canvas id值
 *@param className img ID值或者类名
 *@param userName 用户名
 *@param index 索引值
 */
export function draw(userName) {
  console.log(userName)
  // 获取DOM元素
  var canvas = document.getElementById('defalut')
  //随机选择俩种不同的颜色
  const bgColor = '#fff'
  const strColor = '#faf'
  // 选择内容
  var context = canvas.getContext('2d')
  // 确定画布大小
  canvas.width = 40
  canvas.height = 40
  // 确定画布背景色
  if (strColor !== bgColor) {
    context.fillStyle = bgColor
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = strColor
  }

  let str = userName.substring(0, 1).toUpperCase()
  console.log(str)
  context.font = 'normal bold 30px Arial'
  // 设置对其方式

  context.textBaseline = 'middle'
  context.textAlign = 'center'

  let textMetrics = context.measureText(str)
  let actualBoundingBoxDescent = textMetrics.actualBoundingBoxDescent
  context.fillText(str, canvas.width / 2 - 0.5, (canvas.height + actualBoundingBoxDescent) / 2)

  let dataURL = canvas.toDataURL('image/jpeg', 0.6)
  console.log(dataURL)
}
//获取动态的颜色
// function getColor() {
//   var str = '#'
//   var colorArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
//   for (var i = 0; i < 6; i++) {
//     var num = parseInt(Math.random() * 16)
//     str += colorArr[num]
//   }
//   return str
// }
