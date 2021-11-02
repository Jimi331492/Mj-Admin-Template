<!--
 * @Author: 龙际妙
 * @Date: 2021-10-24 22:51:08
 * @Description: 
 * @FilePath: \music-web-vue\src\views\system\User.vue
 * @LastEditTime: 2021-11-03 04:58:47
 * @LastEditors: Please set LastEditors
-->
<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片内容区 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.queryKey" clearable @clear="getUserList">
            <template #append>
              <el-button icon="el-icon-search" @click="getUserList"></el-button>
            </template>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="roles" label="角色"
          ><template v-slot="scope">
            <el-tag v-for="item in scope.row.roles" :key="item" closable @close="removeRoleById(scope.row.userId, item.roleId)">{{ item.roleName }}</el-tag>
          </template></el-table-column
        >

        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="400px">
          <template v-slot="scope">
            <!-- 编辑按钮 -->
            <el-tooltip class="item" effect="dark" content="编辑用户" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip>

            <!-- 删除按钮 -->
            <el-tooltip class="item" effect="dark" content="删除用户" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="confirmDeleteBox(scope.row.userId)"></el-button>
            </el-tooltip>

            <!-- 分配角色按钮 -->
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @current-change="handleCurrentChange" :page-size="limit" :page-sizes="[4]" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 这是添加用户的对话框 -->
    <el-dialog title="添加用户" v-model="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体 -->
      <el-form ref="addFormRef" :model="addForm" label-width="70px" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="addForm.description"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" v-model="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 修改用户表单 -->
      <el-form ref="editFormRef" :model="userInfo" label-width="120px" :rules="rules">
        <!-- 用户名 -->
        <el-form-item label="名称:" prop="username">
          <el-input v-model="userInfo.username" @change="usernameChange" />
        </el-form-item>

        <!-- 性别 -->
        <el-form-item label="性别:" prop="ssex">
          <el-radio-group v-model="userInfo.ssex" @change="ssexChange">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
            <el-radio label="2">保密</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 用户邮箱 -->
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="userInfo.email" @change="emailChange" />
        </el-form-item>

        <!-- 用户手机号 -->
        <el-form-item label="手机号:" prop="mobile">
          <el-input v-model="userInfo.mobile" @change="mobileChange" />
        </el-form-item>

        <!-- 描述 -->
        <el-form-item label="描述:" prop="description">
          <el-input
            class="inputDesc"
            v-model="userInfo.description"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="请输入"
            @change="descriptionChange"
          />
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser()">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog title="分配角色 " v-model="showSetRoleVisible" width="50%" @close="resetSetRoleClosed">
      <!-- 内容主体 -->
      <div>
        <p>当前的用户:{{ userInfo.username }}</p>
        <p>
          当前的角色:
          <el-tag v-for="item in userInfo.roles" :key="item">{{ item.roleName }}</el-tag>
        </p>
        <p>
          分配新角色:
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
          </el-select>
        </p>
      </div>
      <!-- 底部区域 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showSetRoleVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmSetRole()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { register, queryUser, deleteUser, lockUser, updateUserInfo, setRole, cancelRole } from '../../api/system/user'
import { selectAllRole } from '../../api/system/role'
export default {
  data() {
    // 邮箱验证的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0-9]|17[3678]|18[0-9]|14[57])\d{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入正确的手机号'))
    }
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        queryKey: '',
        // 当前的页数
        currentPage: 1,
        // 每页显示多少条数据
        pageSize: 5,
      },
      userList: [],
      roleList: [],
      limit: 5,
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      showSetRoleVisible: false,
      currentPageSize: 0,
      selectedRoleId: '',

      // 需要被分配角色的用户信息
      userInfo: {},
      sumbitForm: {}, //上传的表单

      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        description: '',
      },
      // 查询到的用的表单信息
      editForm: {},

      // 添加用户的表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在 3 到 10 个字符之间',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '密码的长度在 3 到 10 个字符之间',
            trigger: 'blur',
          },
        ],
        email: [{ validator: checkEmail, trigger: 'blur' }],
        mobile: [{ validator: checkMobile, trigger: 'blur' }],
      },

      // 修改用户的表单验证规则
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await queryUser(this.queryInfo)
      console.log(res)
      if (res.code !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.userList = res.data.users
      this.total = res.data.total
    },

    // 监听 CurrentChange 改变的事件
    handleCurrentChange(currentPage) {
      console.log(currentPage)
      this.queryInfo.currentPage = currentPage
      this.getUserList()
    },

    // 监听 Swtich 开关状态的改变
    async userStateChange(userInfo) {
      let paramsBody = new Object()

      paramsBody = {
        userId: userInfo.userId,
        status: userInfo.status,
      }
      console.log(userInfo.status)
      console.log(paramsBody)

      /**
       * 调用修改用户状态的接口
       */
      const { data: res } = await lockUser(paramsBody)
      console.log(res)
      if (res.code !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getUserList()
    },

    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },

    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 点击按钮添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return

        /**
         * 调用增加用户的接口
         */
        const { data: res } = await register(this.addForm)
        console.log(res)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success(res.msg)

        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表
        this.getUserList()
      })
    },

    async showEditDialog(row) {
      console.log(row)
      /**
       * 调用查询用户的接口
       */
      this.userInfo = row
      this.sumbitForm.userId = row.userId
      this.editDialogVisible = true
    },

    // userBaseInfo表单项Change事件
    usernameChange(value) {
      this.sumbitForm.username = value
    },
    ssexChange(value) {
      this.sumbitForm.ssex = value
    },
    emailChange(value) {
      this.sumbitForm.email = value
    },
    mobileChange(value) {
      this.sumbitForm.mobile = value
    },
    descriptionChange(value) {
      this.sumbitForm.description = value
    },
    avatarChange(value) {
      this.sumbitForm.avatar = value
    },

    // 点击按钮修改用户
    editUser() {
      this.$refs.editFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return
        // 否则发起修改用户的请求

        /**
         * 调用修改用户的接口
         */

        console.log(this.sumbitForm)
        const { data: res } = await updateUserInfo(this.sumbitForm)

        if (res.code !== 200) return this.$message.error(res.msg)

        this.editDialogVisible = false
        this.getUserList()
        this.$message.success(res.msg)
      })
    },

    // 确认删除的弹窗
    async confirmDeleteBox(id) {
      console.log(id)
      const Result = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (Result !== 'confirm') return this.$message.info('已经取消删除')

      /**
       * 调用删除用户的接口
       */
      const { data: res } = await deleteUser(id)
      if (res.code !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getUserList()
    },

    async showSetRole(user) {
      this.userInfo = user

      // 在展示对话框前，获取所有的角色的列表

      /**
       * 调用获取所有角色列表的接口
       */

      const { data: res } = await selectAllRole()
      // console.log(res)
      if (res.code !== 200) return this.$message.error(res.msg)
      this.roleList = res.data.roles
      this.showSetRoleVisible = true
    },

    // 监听分配角色对话框的关闭 重置rolelist
    resetSetRoleClosed() {
      this.selectedRoleId = ''
      this.roleList = ''
      this.userInfo = {}
    },

    async confirmSetRole() {
      /**
       * 调用给用户分配角色的接口
       */
      let params = {
        userId: this.userInfo.userId,
        roleId: this.selectedRoleId,
      }
      const { data: res } = await setRole(params)
      console.log(res)
      if (res.code !== 200) return this.$message.error(res.msg)
      this.getUserList()
      this.$message.success(res.msg)
      this.showSetRoleVisible = false
    },

    // 根据Id删除对应角色
    async removeRoleById(userId, roleId) {
      // console.log(user)
      // console.log(roleId)
      // 弹窗提示用户是否要删除
      const Result = await this.$confirm('此操作将取消用户该角色权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (Result !== 'confirm') {
        return this.$message.info('已经取消删除')
      }

      const { data: res } = await cancelRole(userId, roleId)
      if (res.code !== 200) return this.$message.error('撤销角色失败!')
      this.getUserList()
      this.$message.success('操作成功！')
      // vue 3.x不行了 也会刷新了
      // role.menus = res.data
    },
  },
}
</script>

<style lang="less" scoped>
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
