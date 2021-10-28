<!--
 * @Author: 龙际妙
 * @Date: 2021-10-26 11:25:27
 * @Description: 
 * @FilePath: \music-web-vue\src\views\welcome\UserInfo.vue
 * @LastEditTime: 2021-10-28 04:50:35
 * @LastEditors: Please set LastEditors
-->
<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片内容区 -->
    <el-card>
      <el-collapse v-model="deaultArray" @change="handleChange">
        <el-collapse-item title="基础信息" name="baseInfo">
          <div class="baseInfo">
            <!-- 用户头像 -->
            <!-- <div class="avatar">
              <el-avatar :src="userInfo.avatar" @error="errorHandler">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
              <el-button type="primary" @click="showDialog">设置头像</el-button>
            </div> -->

            <!-- 信息Table -->
            <el-descriptions class="baseInfo_table" :column="2" :size="mini" border>
              <template #extra>
                <el-button type="primary" size="small" @click="showInfoDialog">修改</el-button>
              </template>
              <el-descriptions-item width="120px">
                <template #label>
                  <i class="el-icon-user"></i>
                  用户名
                </template>
                {{ userInfo.username }}
              </el-descriptions-item>
              <el-descriptions-item width="120px">
                <template #label>
                  <i class="el-icon-tickets"></i>
                  性别
                </template>
                <el-tag v-if="userInfo.ssex == 0" size="small">男 </el-tag>
                <el-tag v-else-if="userInfo.ssex == 1" size="small" type="success">女</el-tag>
                <el-tag v-else-if="userInfo.ssex == 2" size="small" type="danger">保密</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <i class="el-icon-mobile-phone"></i>
                  手机号
                </template>
                {{ userInfo.mobile }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <i class="el-icon-location-outline"></i>
                  邮箱
                </template>
                {{ userInfo.email }}
              </el-descriptions-item>

              <el-descriptions-item>
                <template #label>
                  <i class="el-icon-office-building"></i>
                  描述
                </template>
                {{ userInfo.description }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-collapse-item>
        <el-collapse-item title="账号信息" name="accountInfo">
          <!-- 账号信息展示表单 -->
          <el-form>
            <el-form-item label="账号状态:" prop="status">
              <div v-if="userInfo.status === 0"><el-tag type="danger">锁定</el-tag></div>
              <div v-else><el-tag type="success">有效</el-tag></div>
            </el-form-item>
            <el-form-item label="注册日期:" prop="createTime">{{ this.format(this.userInfo.createTime) }} </el-form-item>
            <el-form-item label="最近修改日期:" prop="modifyTime">{{ this.format(this.userInfo.modifyTime) }} </el-form-item>
            <el-form-item label="最近登录日期:" prop="lastLoginTime">
              {{ this.format(this.userInfo.lastLoginTime) }}
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="角色信息" name="roleInfo">
          <!-- 角色信息展示table -->
          <el-table></el-table>
        </el-collapse-item>
        <el-collapse-item title="权限信息" name="authoInfo">
          <!-- 权限信息展示table -->
          <el-table></el-table>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <!-- 修改用户基本信息弹窗 -->
    <el-dialog :title="titles" v-model="infoDialogVisible" width="50%" @close="dialogClosed">
      <div class="baseInfo_form">
        <!-- 修改用户表单 -->
        <el-form ref="baseInfoRef" :model="userInfo" label-width="120px" :rules="userInfoRules">
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

          <el-form-item
            ><!-- 底部按钮区域 -->
            <span class="form-footer">
              <el-button @click="this.infoDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="saveUserInfo">提交</el-button>
            </span></el-form-item
          >
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateUserInfo } from '../../api/system/user'

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
      deaultArray: ['baseInfo', 'accountInfo'],
      userId: 0, //id
      userInfo: {},
      sumbitForm: {
        userId: 0, //用户Id
        username: '', //用户名
        ssex: '', //性别
        email: '', //邮箱
        mobile: '', //手机号
        description: '', //描述
      },
      infoDialogVisible: false,
      otherDialogVisible: false,
      titles: '', //弹窗标题
      userInfoRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在 3 到 10 个字符之间',
            trigger: 'blur',
          },
        ],
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
    this.getUserInfo()
    // var str1 = JSON.stringify(this.userInfo.createTime)
    // var unno = JSON.parse(str1)
    // console.log(unno)
    // console.log(typeof unno)
    // console.log(str1)
    // console.log(typeof str1)
    let array = [...this.userInfo.createTime]
    var str = JSON.stringify(array[0] + '年' + array[1] + '月' + array[2] + '日' + array[3] + '时' + array[4] + '分')
    console.log(str)
    // console.log(typeof array)
    // for (let item of array) {
    //   console.log(item)
    // }
  },
  computed: {
    getUserBaseInfo() {
      return this.$store.state.userBaseInfo
    },
  },
  methods: {
    //   加载时获取用户信息
    async getUserInfo() {
      this.userInfo = this.getUserBaseInfo
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

    // baseInfo表单项Change事件
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

    // 点击修改提交修改的用户信息
    saveUserInfo() {
      // 先表单校验
      this.$refs.baseInfoRef.validate(async (valid) => {
        //   校验失败返回
        if (!valid) return
        this.sumbitForm.userId = this.userInfo.userId
        console.log(this.sumbitForm)
        // 调用接口
        await updateUserInfo(this.sumbitForm).then((res) => {
          console.log(res)
          if (res.data.code !== 200) this.$message.error('操作失败！')
          this.$message.success('操作成功！')
          this.infoDialogVisible = false
        })
      })
    },

    // 展示修改头像的弹窗
    showInfoDialog() {
      this.titles = '修改基本信息'
      this.infoDialogVisible = true
    },

    // 监听dialog弹窗关闭事件
    dialogClosed() {
      this.$refs.baseInfoRef.resetFields()
    },
  },
}
</script>

<style scoped lang="less">
.baseInfo {
  display: flex;
  flex-direction: column;
  // .avatar {
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: center;
  //   align-items: center;
  //   flex: 1;
  //   width: 150px;
  //   height: 180px;
  //   .el-button {
  //     margin-left: 10px;
  //   }
  // }
  .baseInfo_table {
    width: 60% !important;
    margin: 10px auto 40px;
  }
}

.el-dialog {
  min-width: 500px;
  .el-input {
    width: 300px !important;
  }
  .inputDesc {
    width: 300px !important;
  }
}
</style>
