<!--  eslint-disable prettier/prettier -->

<!--
 * @Author: 龙际妙
 * @Date: 2021-11-03 05:46:31
 * @Description: 
 * @FilePath: \music-web-vue\src\views\features\Front.vue
 * @LastEditTime: 2021-11-15 18:59:20
 * @LastEditors: Please set LastEditors
-->
<template>
  <!-- -->
  <div class="container">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>功能模块</el-breadcrumb-item>
      <el-breadcrumb-item>前端模块</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片内容区 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入关键字" v-model="queryInfo.queryKey" clearable @clear="getLogList">
            <template #append>
              <el-button icon="el-icon-search" @click="getPageList"></el-button>
            </template>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="showAddDialog">添加页面</el-button>
        </el-col>
      </el-row>

      <!-- 页面列表区域 -->
      <el-table :data="pageList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="pageName" label="页面名称"></el-table-column>
        <el-table-column prop="url" label="页面路径"> </el-table-column>
        <el-table-column prop="icon" label="图标">
          <template v-slot="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="perms" label="调用接口"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template v-slot="scope">
            {{ this.format(scope.row.createTime) }}
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @current-change="handleCurrentChange" :page-size="limit" :page-sizes="[4]" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 这是添加页面的对话框 -->
    <el-dialog :title="titles" v-model="dialogVisible" width="50%" @close="dialogClosed">
      <!-- 内容主体 -->
      <el-form ref="pageFormRef" :model="pageForm" label-width="70px" :rules="rules">
        <el-form-item label="所属菜单" prop="parentId">
          <el-select v-model="pageForm.parentId" placeholder="请选择父级菜单" style="width: 46%">
            <el-option v-for="(item, index) in parentMenuList" :key="index" :label="item.menuName" :value="item.menuId"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面名称" prop="pageName">
          <el-input v-model="pageForm.pageName"></el-input>
        </el-form-item>
        <el-form-item label="页面路径" prop="url">
          <el-input v-model="pageForm.url"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-select v-model="pageForm.icon" placeholder="请选择页面图标" style="width: 46%">
            <el-option v-for="(item, index) in iconList" :key="index" :label="item" :value="item">
              <span style="float: left">
                {{ item }}
              </span>
              <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">
                <i :class="item"></i>
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调用接口" prop="perms">
          <el-select v-model="pageForm.perms" placeholder="请选择接口" style="width: 46%">
            <el-option v-for="(item, index) in apiList" :key="index" :label="item" :value="item">
              <span style="float: left">
                {{ item }}
              </span>
              <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">
                <i :class="item"></i>
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明" prop="remark" style="width: 52%">
          <el-input type="textarea" v-model="pageForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sumbitForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getPage } from '../../api/features/front'
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
      titles: '',
      dialogVisible: false,
      pageList: [],
      parentMenuList: [],
      iconList: ['el-icon-user', 'el-icon-platform-eleme', 'el-icon-s-tools', 'el-icon-delete', 'el-icon-menu'],
      pageForm: {
        parentId: '',
        pageName: '',
        url: '',
        icon: '',
        perms: '',
        remark: '',
      },
    }
  },
  created() {
    this.getPageList()
  },
  methods: {
    async getPageList() {
      const { data: res } = await getPage()
      if (res.code !== 200) return this.$message.error(res.msg)
      console.log(res)
      this.pageList = res.data.pages
    },
    format(dateObject) {
      let obj = dateObject + ''
      let array = obj.split(',')

      let YY = array[0]
      let MM = array[1]
      let DD = array[2]
      let HH = array[3]
      // let mm = array[4]
      if (array[3] < 10) {
        HH = '0' + array[3]
      }
      // if (array[4] < 10) {
      //   mm = '0' + array[3]
      // }
      var dateStr = YY + '年' + MM + '月' + DD + '日' + HH + '时'
      // + mm + '分'
      return dateStr
    },
    showAddDialog() {
      this.titles = '添加页面'
      this.dialogVisible = true
    },
  },
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
