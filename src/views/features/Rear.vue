<!--
 * @Author: 龙际妙
 * @Date: 2021-11-03 05:46:31
 * @Description: 
 * @FilePath: \music-web-vue\src\views\features\Rear.vue
 * @LastEditTime: 2021-11-03 05:57:58
 * @LastEditors: Please set LastEditors
-->
<template>
  <!-- -->
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>功能模块</el-breadcrumb-item>
      <el-breadcrumb-item>后端模块</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片内容区 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入关键字" v-model="queryInfo.queryKey" clearable @clear="getLogList">
            <template #append>
              <el-button icon="el-icon-search" @click="getUserList"></el-button>
            </template>
          </el-input>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="logList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="interfacename" label="接口名称"></el-table-column>
        <el-table-column prop="path" label="请求路径"> </el-table-column>
        <el-table-column prop="resParams" label="请求参数"> </el-table-column>
        <el-table-column prop="reqParams" label="响应参数"> </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @current-change="handleCurrentChange" :page-size="limit" :page-sizes="[4]" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
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
    }
  },
  created() {},
  methods: {},
}
</script>

<style scoped>
.container .el-input {
  width: 300px;
}
.container .el-button {
  margin-left: 15px;
  height: 40px;
}
.el-table {
  margin-top: 20px;
}
</style>
