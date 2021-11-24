<!--
 * @Author: 龙际妙
 * @Date: 2021-10-24 22:55:25
 * @Description: 
 * @FilePath: \music-web-vue\src\views\welcome\Welcome.vue
 * @LastEditTime: 2021-11-23 18:49:38
 * @LastEditors: Please set LastEditors
-->
<template>
  <div class="container">
    <!-- 卡片内容 -->
    <!-- <el-card>
     
      <div id="userCharts"></div>
    </el-card> -->
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
  </div>
</template>

<script>
// 1.导入echarts
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
              { value: 1048, name: '普通用户' },
              { value: 735, name: '前端工程师' },
              { value: 580, name: '后端工程师' },
              { value: 484, name: '产品经理' },
              { value: 300, name: '测试工程师' },
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
    }
  },
  created() {
    this.getIndex()
  },
  // 此时页面上的元素已经渲染完毕
  // async mounted() {
  //   // 3.基于准备好的dom,初始化echarts实例
  //   var myChart = echarts.init(document.getElementById('userCharts'))

  //   const { data: res } = await getUserCount()
  //   if (res.code !== 200) {
  //     return this.$message.error('获取图标数据失败！')
  //   }
  //   this.count = res.data.count
  //   console.log('res.data.count', res.data.count)

  //   this.options.title = {
  //     text: `用户管理：` + this.count,
  //     subtext: 'Fake Data',
  //     left: 'left',
  //   }

  //   // 4.准备数据项和配置项
  //   // const result = this._.merge(title, this.options)

  //   // 5.展示数据
  //   myChart.setOption(this.options)
  // },
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
// .el-card {
//   width: 500px;
//   height: 160px;
//   padding-left: 50px;
//   padding-top: 50px;
//   #userCharts {
//     width: 100%;
//     height: 100%;
//     position: absolute;

//     &:deep canvas {
//       width: auto !important;
//       height: auto !important;
//     }
//   }
// }

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
</style>
