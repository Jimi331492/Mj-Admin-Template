<!--
 * @Author: 龙际妙
 * @Date: 2021-10-24 22:51:29
 * @Description: 
 * @FilePath: \music-web-vue\src\views\system\Menu.vue
 * @LastEditTime: 2021-11-23 13:36:55
 * @LastEditors: Please set LastEditors
-->
<template>
  <div class="container">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片内容区 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.queryKey" clearable @clear="getRightList">
            <template #append>
              <el-button icon="el-icon-search" @click="getRightList"></el-button>
            </template>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="showAddDialog" v-has="{ perm: 'menu:add' }">添加权限</el-button>
        </el-col>
      </el-row>
      <!-- 列表区域 -->
      <el-table :data="rightlist" border stripe default-expand-all row-key="menuId" :tree-props="{ children: 'menus' }" :indent="16">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="menuName" label="权限名称" sortable></el-table-column>
        <el-table-column prop="url" label="路径"></el-table-column>
        <el-table-column prop="type" label="类型">
          <template v-slot="scope">
            <el-tag v-if="scope.row.parentId === 0">一级菜单</el-tag>
            <el-tag type="danger" v-else-if="scope.row.type === '1'">按钮</el-tag>
            <el-tag type="success" v-else>二级菜单</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="权限标识" prop="parms">
          <template v-slot="scope">
            <div v-if="scope.row.perms">{{ scope.row.perms }}</div>
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

        <el-table-column label="操作" width="200px" v-if="isHiddenLastColumn">
          <template v-slot="scope">
            <!-- 编辑按钮 -->
            <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip> -->

            <!-- 删除按钮 -->
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="confirmDeleteBox(scope.row.menuId)"
                v-has="{ perm: 'menu:delete' }"
              ></el-button>
            </el-tooltip>

            <!-- <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRole(scope.row)" v-has="{ perm: 'user:set' }"></el-button>
            </el-tooltip> -->
            <!-- <div id="notAll">无权限</div> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 弹窗区域 -->
    <el-dialog :title="titles" v-model="dialogVisible" @close="dialogClosed" width="60%">
      <!-- 表单区域 -->
      <el-form ref="formRef" :model="rightInfo" :rules="rules" label-width="120px">
        <!-- 权限类型 -->
        <el-form-item label="权限类型:" prop="type">
          <el-radio-group v-model="rightInfo.type" @change="typeChange">
            <el-radio label="0">菜单</el-radio>
            <el-radio label="1">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 权限名 -->
        <el-form-item label="菜单/按钮名称:" prop="menuName">
          <el-input v-model="rightInfo.menuName" placeholder="请输入权限名称" />
        </el-form-item>

        <!-- 菜单父级权限 -->
        <el-form-item label="父级权限:" prop="parentId" v-show="rightInfo.type !== '1'">
          <el-cascader
            v-model="parentIdArray"
            :options="permsList"
            :props="selectProps0"
            placeholder="请选择父级权限"
            show-all-levels
            @change="parentChange"
            clearable
          ></el-cascader>
        </el-form-item>

        <!-- 按钮父级权限 -->
        <el-form-item label="父级权限:" prop="parentId" v-show="rightInfo.type === '1'">
          <el-cascader
            v-model="parentIdArray"
            :options="permsList"
            :props="selectProps1"
            placeholder="请选择父级权限"
            show-all-levels
            @change="parentChange"
            clearable
          ></el-cascader>
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item label="菜单图标:" prop="icon" v-show="level !== '3'">
          <el-select v-model="rightInfo.icon" placeholder="请选择菜单图标">
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

        <!-- 菜单路径 -->
        <el-form-item label="菜单路径:" prop="url" v-show="level === '2'">
          <el-input v-model="rightInfo.url" placeholder="请输入菜单路径" />
        </el-form-item>
        <!-- 对应操作 -->
        <el-form-item label="权限标识:" prop="perms" v-show="level !== '1'">
          <el-radio-group v-model="rightInfo.perms">
            <el-input v-model="rightInfo.perms" placeholder="请输入权限标识" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="子菜单" prop="childrenMenu" v-show="level === '1'">
          <el-table :data="rightInfo.childrenMenu" border stripe>
            <el-table-column prop="menuName" label="菜单名称" align="center">
              <template v-slot="scope">
                <el-input v-model="scope.row.menuName" placeholder="请输入菜单名称" />
              </template>
            </el-table-column>
            <el-table-column prop="url" label="菜单路径" align="center">
              <template v-slot="scope">
                <el-input v-model="scope.row.url" placeholder="请输入菜单路径" />
              </template>
            </el-table-column>

            <el-table-column prop="icon" label="菜单图标" align="center" width="140px">
              <template v-slot="scope">
                <el-select v-model="scope.row.icon" placeholder="请选择" clearable>
                  <template #prefix>
                    <i :class="scope.row.icon"></i>
                  </template>
                  <el-option v-for="(item, index) in iconList" :key="index" :label="' '" :value="item">
                    <span style="float: left">
                      {{ item }}
                    </span>
                    <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">
                      <i :class="item"></i>
                    </span>
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="perms" label="权限标识" align="center">
              <template v-slot="scope">
                <el-input v-model="scope.row.perms" placeholder="请输入权限标识" />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="45px" align="center">
              <template v-slot="scope">
                <el-button type="text" size="medium" @click="deleteData(scope.row, scope.$index)">
                  <i class="el-icon-delete" aria-hidden="true"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="text" @click="addData">添加一条</el-button>
        </el-form-item>

        <el-form-item label="子权限" prop="childrenBtn" v-show="level === '2'">
          <el-table :data="rightInfo.childrenBtn" border stripe>
            <el-table-column prop="menuName" label="权限名称" align="center">
              <template v-slot="scope">
                <el-input v-model="scope.row.menuName" placeholder="请输入权限名称" />
              </template>
            </el-table-column>

            <el-table-column prop="perms" label="权限标识" align="center">
              <template v-slot="scope">
                <el-input v-model="scope.row.perms" placeholder="请输入权限标识" />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="45px" align="center">
              <template v-slot="scope">
                <el-button type="text" size="medium" @click="deleteDataBtn(scope.row, scope.$index)">
                  <i class="el-icon-delete" aria-hidden="true"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="text" @click="addDataBtn">添加一条</el-button>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRight()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getRight, addMenu, deleteMenu } from '../../api/system/menu'
export default {
  data() {
    const validItem = (value) => {
      let flag = true
      value.forEach((item) => {
        console.log('item', item)

        console.log('item.menuName === null', item.menuName === null)
        console.log("item.menuName === ''", item.menuName === '')
        console.log('item.menuName === undefined', item.menuName === undefined)
        if (item.menuName === null || item.menuName === '' || item.menuName === undefined) {
          flag = false
        }
      })
      return flag
    }
    const validatorChildrenMenu = (rules, value, callback) => {
      if (this.level === '1') {
        if (value.length === 0) {
          return new Error('至少添加一条记录')
        } else {
          if (!validItem(value)) {
            return new Error('菜单名称不能为空')
          } else {
            console.log('validItem(value)', validItem(value))
            callback()
          }
        }
      } else {
        callback()
      }
    }
    return {
      queryInfo: {
        queryKey: '',
        // 当前的页数
        currentPage: 1,
        // 每页显示多少条数据
        pageSize: 5,
      },

      rightlist: [],
      permsList: [],
      iconList: ['el-icon-user', 'el-icon-platform-eleme', 'el-icon-s-tools', 'el-icon-delete', 'el-icon-menu'],
      titles: '',
      dialogVisible: false,
      level: '', //权限等级
      selectProps0: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'menuId',
        children: 'menus',
        label: 'menuName',
      },
      selectProps1: {
        expandTrigger: 'hover',
        checkStrictly: false,
        value: 'menuId',
        children: 'menus',
        label: 'menuName',
      },
      parentIdArray: [], //父级ID数组
      rightInfo: {
        menuName: '', //权限名
        parentId: '', //父级ID
        icon: '',
        type: '', //权限类型
        url: '', //权限路径
        childrenMenu: [],
        childrenBtn: [],
      },
      rules: {
        menuName: [{ required: true, message: '请输入权限名', trigger: 'blur' }],
        parentId: [{ required: true, message: '请选择父级权限', trigger: 'blur' }],
        type: [{ required: true, message: '请选择权限类型', trigger: 'blur' }],
        childrenMenu: [{ type: 'array', required: true, validator: validatorChildrenMenu, trigger: 'blur' }],
      },
    }
  },
  created() {
    this.getRightList()
  },
  computed: {
    //如果一个操作里一个按钮的权限都没有 就不显示操作这一列
    isHiddenLastColumn() {
      let perm1 = ['menu:delete']

      let bol = this.$_has(perm1)

      return bol
    },
  },
  methods: {
    async getRightList() {
      const { data: res } = await getRight()
      if (res.code !== 200) {
        return this.$message.error('获取权限列表失败!')
      }
      this.rightlist = res.data.menus
      const arr = this.$_.cloneDeep(this.rightlist)
      let newArr = this.filterTree(arr)

      newArr = this.menusIsBlank(newArr)

      let newArr2 = [{ menuId: 0, menuName: 'Root', menus: newArr }]
      this.permsList = this.$_.cloneDeep(newArr2)
      console.log('this.permsList', this.permsList)
      console.log(this.rightlist)
    },
    filterTree(arr) {
      const newArr = arr.filter((item) => item.type === '0')
      return newArr.map((item) => {
        if (item.menus) {
          item.menus = this.filterTree(item.menus)
        }
        return item
      })
    },
    menusIsBlank(arr) {
      arr.forEach((e) => {
        if (e.menus) {
          e.menus.forEach((item) => {
            item.menus = null
          })
        }
      })
      return arr
    },
    showAddDialog() {
      this.titles = '添加权限'
      this.dialogVisible = true
    },
    typeChange(e) {
      console.log('e', e)
      this.rightInfo.parentId = ''
      if (e === '1') {
        this.level = '3'
        this.rightInfo.icon = ''
      } else {
        this.level = ''
      }
    },
    parentChange(e) {
      if (e === null) {
        this.rightInfo.type = ''
        this.level = ''
        return
      }
      if (e.length === 3) {
        this.rightInfo.type = '1'
        this.rightInfo.icon = ''
        this.level = '3'
        console.log('level', this.level)
      } else {
        this.rightInfo.type = '0'
        this.level = e.length + ''
      }
      this.parentIdArray = e
      let lengths = this.parentIdArray.length - 1
      let parent = this.parentIdArray[lengths]
      this.rightInfo.parentId = parent
      console.log('parentIdArr', this.parentIdArray)
    },

    dialogClosed() {
      this.$refs.formRef.resetFields()
      this.level = ''
    },
    //添加一条子菜单记录
    addData() {
      this.rightInfo.childrenMenu.push({})
    },
    //删除
    deleteData(row, index) {
      this.rightInfo.childrenMenu.splice(index, 1)
    },
    //添加一条记录
    addDataBtn() {
      this.rightInfo.childrenBtn.push({})
    },
    //删除
    deleteDataBtn(row, index) {
      this.rightInfo.childrenBtn.splice(index, 1)
    },

    // 点击按钮新增权限
    addRight() {
      this.$refs.formRef.validate(async (valid) => {
        if (!valid) return

        this.rightInfo.level = this.level
        console.log('this.addform', this.rightInfo)
        const { data: res } = await addMenu(this.rightInfo)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.getRightList()
        this.dialogVisible = false
        this.$message.success(res.msg)
      })
    },

    // 根据Id删除对应角色
    async confirmDeleteBox(menuId) {
      // console.log(user)
      // console.log(roleId)
      // 弹窗提示用户是否要删除
      const Result = await this.$confirm('此操作将永久删除该权限及其所有子权限!!!是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (Result !== 'confirm') {
        return this.$message.info('已经取消删除')
      }

      const { data: res } = await deleteMenu(menuId)
      if (res.code !== 200) return this.$message.error(res.msg)
      this.getRightList()
      this.$message.success('操作成功！')
      // vue 3.x不行了 也会刷新了
      // role.menus = res.data
    },
  },
}
</script>

<style scoped lang="less">
.el-table {
  width: 100%;
  &:deep .el-input,
  .el-select {
    width: 100%;
  }
  &:deep .el-input__prefix {
    padding-left: 40px;
  }
}
</style>
>
