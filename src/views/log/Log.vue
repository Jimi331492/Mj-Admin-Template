<!--
 * @Author: 龙际妙
 * @Date: 2021-10-24 22:52:12
 * @Description: 
 * @FilePath: \music-web-vue\src\views\log\Log.vue
 * @LastEditTime: 2021-11-05 06:31:14
 * @LastEditors: Please set LastEditors
-->
<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统监控</el-breadcrumb-item>
      <el-breadcrumb-item>日志管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片内容区 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入用户名" v-model="queryInfo.queryKey" clearable @clear="getLogList">
            <template #append>
              <el-button icon="el-icon-search" @click="getLogList"></el-button>
            </template>
          </el-input>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="logList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="操作人"></el-table-column>
        <el-table-column prop="operation" label="操作事务"> </el-table-column>
        <el-table-column prop="time" label="操作时间">
          <template v-slot="scope">
            {{ this.format(scope.row.time) }}
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @current-change="handleCurrentChange" :page-size="limit" :page-sizes="[4]" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { queryLog } from '../../api/system/log'
export default {
  data() {
    return {
      limit: 5,
      total: 0,
      queryInfo: {
        queryKey: '',
        // 当前的页数
        currentPage: 1,
        // 每页显示多少条数据
        pageSize: 5,
      },
      logList: [],
    }
  },
  created() {
    this.getLogList()
  },
  mounted() {},
  methods: {
    async getLogList() {
      const { data: res } = await queryLog(this.queryInfo)
      if (res.code === 403) {
        this.$router.replace('/404')
      } else {
        if (res.code !== 200) return this.$message.error('获取日志列表失败！')
        this.logList = res.data.logList
        this.total = res.data.total
      }
    },
    // 监听 CurrentChange 改变的事件
    handleCurrentChange(currentPage) {
      console.log(currentPage)
      this.queryInfo.currentPage = currentPage
      this.getLogList()
    },
    format(dateObject) {
      let array = [...dateObject]
      let YY = array[0]
      let MM = array[1]
      let DD = array[2]
      let HH = array[3]
      let mm = array[4]
      if (array[3] < 10) {
        HH = '0' + array[3]
      }
      if (array[4] < 10) {
        mm = '0' + array[3]
      }
      var dateStr = YY + '年' + MM + '月' + DD + '日' + HH + '时' + mm + '分'
      return dateStr
    },
  },
}
</script>

<style scoped lang="less">
.el-dialog {
  min-width: 50%;
  .el-input {
    width: 300px;
  }
}
.el-tag {
  margin: 5px 5px;
}
</style>
