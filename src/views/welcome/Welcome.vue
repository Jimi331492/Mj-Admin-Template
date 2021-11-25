<!--
 * @Author: 龙际妙
 * @Date: 2021-10-24 22:55:25
 * @Description: 
 * @FilePath: \music-web-vue\src\views\welcome\Welcome.vue
 * @LastEditTime: 2021-11-25 23:33:36
 * @LastEditors: Please set LastEditors
-->
<template>
  <div class="container">
    <div class="card-view">
      <div class="card-view">
        <el-card class="user"
          ><span class="card-tip"> 本系统目前: </span>
          <div class="card-content">
            <i class="el-icon-user-solid"></i>用户数量: <span>{{ indexInfo.userNum }} </span>人
          </div></el-card
        >
        <el-card class="online-user"
          ><span class="card-tip"> 本系统目前: </span>
          <div class="card-content">
            <i class="el-icon-user"></i> 在线用户: <span>{{ indexInfo.onLineUser }}</span
            >人
          </div></el-card
        >
      </div>
      <div class="card-view">
        <el-card class="role"
          ><span class="card-tip"> 本系统目前:</span>
          <div class="card-content">
            <i class="el-icon-s-custom"></i> 角色数量: <span>{{ indexInfo.roleNum }}</span>
          </div></el-card
        >
        <el-card class="func"
          ><span class="card-tip"> 本系统目前: </span>
          <div class="card-content">
            <i class="el-icon-s-tools"></i> 模块数量: <span>{{ indexInfo.roleNum }}</span>
          </div></el-card
        >
      </div>
    </div>

    <div class="charts-box">
      <el-card>
        <div id="category-chart"></div>
      </el-card>
      <el-card>
        <div id="pie-chart"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
// 1.导入echarts
import * as echarts from 'echarts'
import { index } from '../../api/home/index'
export default {
  data() {
    return {
      indexInfo: {},
      options: {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          left: 'center',
        },
        series: [
          {
            name: '用户比例',
            type: 'pie',
            radius: '50%',
            width: '250px',
            left: '5%',
            data: [
              { value: 5, name: '普通用户' },
              { value: 2, name: '前端工程师' },
              { value: 1, name: '后端工程师' },
              { value: 2, name: '产品经理' },
              { value: 1, name: '测试工程师' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
      cateOptions: {
        color: 'green',
        title: {
          text: '每日访问次数',
          subtext: 'Fake Data',
          left: 'left',
        },
        xAxis: {
          type: 'category',
          data: ['11/20.', '11/21', '11/22', '11/23', '11/24', '11/25', '11/26'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [0, 10, 20, 10, 30, 50, 10],
            type: 'bar',
          },
        ],
      },
    }
  },
  created() {
    this.getIndex()
  },
  // 此时页面上的元素已经渲染完毕
  mounted() {
    // 3.基于准备好的dom,初始化echarts实例
    const pieChart = echarts.init(document.getElementById('pie-chart'))
    const cateChart = echarts.init(document.getElementById('category-chart'))

    pieChart.setOption(this.options)
    cateChart.setOption(this.cateOptions)
  },
  methods: {
    async getIndex() {
      const { data: res } = await index()
      if (res.code !== 200) return this.$message.error('获取首页数据失败！')
      this.indexInfo = res.data
    },
  },
}
</script>

<style scoped lang="less">
.container {
  height: 100%;
}

.card-view {
  display: flex;
  flex-basis: 50%;
  justify-content: space-around;
  flex-wrap: wrap;
  font: 22px '站酷黑体';
  .el-card {
    margin-top: 20px;
    padding: 20px;
    height: 108px;
    display: flex;
    justify-content: center;
    align-items: center;
    .card-tip {
      position: relative;
      bottom: 10px;
      right: 20px;
      font-size: 14px;
    }
  }
}
.card-content span {
  display: inline-block;
  margin-top: 2px;
  margin-right: 5px;
  font-size: 24px;
}
.charts-box {
  display: flex;

  height: 50vh;
  margin-top: 10vh;
  &:deep .is-always-shadow:first-child {
    width: 37vw;
    height: 45vh;
    flex-grow: 1;
    margin: 0 2vw;
  }
  &:deep .is-always-shadow:last-child {
    width: 45vh;
    height: 45vh;
    padding-right: 2vh;
    margin: 0 2vw;
  }
  #pie-chart {
    width: 45vh;
    height: 45vh;
    padding-right: 2vh;
  }
  #category-chart {
    width: calc(100vh);
    flex-grow: 1;
    height: 45vh;
  }
}
</style>
