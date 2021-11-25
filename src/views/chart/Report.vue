<!--
 * @Author: 龙际妙
 * @Date: 2021-11-21 15:45:54
 * @Description: 
 * @FilePath: \music-web-vue\src\views\chart\Report.vue
 * @LastEditTime: 2021-11-26 01:23:04
 * @LastEditors: Please set LastEditors
-->
<!--
 * @Author: your name
 * @Date: 2021-07-15 01:22:13
 * @LastEditTime: 2021-07-28 03:00:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \e_managesystem\src\components\report\Reports.vue
-->
<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片内容 -->
    <el-card>
      <!-- 2.为Echarts准备一个具备大小的Dom -->
      <div id="main" style="wdith: 600px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
// 1.导入echarts
import * as echarts from 'echarts'

export default {
  data() {
    return {
      options: {
        title: {
          text: '用户来源',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3',
            },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['', 'CSDN', '微信公众号', 'GitHub', '码云', 'QQ', '其他'],
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            data: [0, 2, 4, 1, 20, 40, 10],
            type: 'bar',
          },
        ],
      },
    }
  },
  created() {},
  // 此时页面上的元素已经渲染完毕
  async mounted() {
    // 3.基于准备好的dom,初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    // 5.展示数据
    myChart.setOption(this.options)
  },
}
</script>

<style lang="less" scoped></style>
