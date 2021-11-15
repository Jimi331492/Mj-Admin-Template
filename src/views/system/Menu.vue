<!--
 * @Author: 龙际妙
 * @Date: 2021-10-24 22:51:29
 * @Description: 
 * @FilePath: \music-web-vue\src\views\system\Menu.vue
 * @LastEditTime: 2021-11-15 18:55:12
 * @LastEditors: Please set LastEditors
-->
<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片内容区 -->
    <el-card>
      <!-- 列表区域 -->
      <el-table :data="rightlist" border stripe default-expand-all row-key="menuId" :tree-props="{ children: 'menus' }" :indent="32">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="menuName" label="权限名称" sortable></el-table-column>
        <el-table-column prop="url" label="路径"></el-table-column>
        <el-table-column prop="type" label="类型">
          <template v-slot="scope">
            <el-tag v-if="scope.row.type === '0'">菜单</el-tag>
            <el-tag type="danger" v-else-if="scope.row.type === '1'">按钮</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="权限等级">
          <template v-slot="scope">
            <el-tag v-if="scope.row.parentId === 0">一级</el-tag>
            <!-- <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag> -->
            <el-tag type="danger" v-else-if="scope.row.type === '1'">三级</el-tag>
            <el-tag type="success" v-else>二级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRight } from '../../api/system/menu'
export default {
  data() {
    //  递归函数
    // const Fn = (data) => {
    //   data.forEach((item, i) => {
    //     if (item.children) {
    //       // 调用递归函数
    //       Fn(item.children)
    //     }
    //     data[i].key = data[i].value
    //   })
    // }
    return {
      rightlist: [],
    }
  },
  created() {
    this.getRightList()
  },
  methods: {
    async getRightList() {
      const { data: res } = await getRight()
      if (res.code !== 200) {
        return this.$message.error('获取权限列表失败!')
      }
      this.rightlist = res.data.menus

      console.log(this.rightlist)
    },
  },
}
</script>

<style lang="less" scoped></style>
>
