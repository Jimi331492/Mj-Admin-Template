<!--
 * @Author: 龙际妙
 * @Date: 2021-10-15 14:26:59
 * @Description: 
 * @FilePath: \music-web-vue\src\components\public\Header.vue
 * @LastEditTime: 2021-11-22 19:38:17
 * @LastEditors: Please set LastEditors
-->
<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="changeCollapse">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">通用权限管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="userInfo" @click="toUserInfo">个人中心</div>
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <!-- 用户头像 -->
        <div class="user-avator">
          <img :src="oldAvatarUrl" v-if="oldAvatarUrl" />
          <canvas id="defalut" v-else></canvas>
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link"> <i class="el-icon-caret-bottom"></i> </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item divided command="setAvatar">设置头像</el-dropdown-item>
              <el-dropdown-item divided command="updatePwd">修改密码</el-dropdown-item>
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
  <!-- 弹窗区域 -->
  <el-dialog :title="titles" v-model="dialogVisible" width="50%" @close="dialogClosed">
    <el-form ref="formRef" :model="form" label-width="100px" :rules="rules">
      <el-form-item v-if="titles == '设置头像'" label="图片地址:" prop="newAvatarUrl"
        ><el-input class="long" v-model="form.newAvatarUrl" placeholder="请输入图片的网络地址"> </el-input>
      </el-form-item>
      <el-form-item v-if="titles == '修改密码'" label="旧密码:" prop="oldPwd">
        <el-input v-model="form.oldPwd" placeholder="请输入旧密码" show-password />
      </el-form-item>
      <el-form-item v-if="titles == '修改密码'" label="新密码:" prop="newPwd"
        ><el-input v-model="form.newPwd" placeholder="请输入新密码" show-password />
      </el-form-item>
      <el-form-item v-if="titles == '修改密码'" label="确认密码:" prop="confirePwd"
        ><el-input v-model="form.confirePwd" placeholder="请确认密码" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sumbitForm()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { setAvatar, updatePwd, Logout } from '../../api/system/user'
import { draw } from '../../utils/avatar'
export default {
  data() {
    var checkUrl = (rule, value, callback) => {
      const checkImgNetworkUrl = /^(https?:[^:<>"]*\/)([^:<>"]*)(\.((png!thumbnail)|(png)|(jpg)|(webp)))/
      if (!value) {
        callback(new Error('请输入头像地址'))
      } else if (!checkImgNetworkUrl.test(value)) {
        callback(new Error('请输入合法的头像网络路径，只支持png,jpg,webp'))
      } else {
        callback()
      }
    }
    var checkNewPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error('密码长度为6 - 18个字符'))
      } else {
        callback()
      }
    }
    var checkConfirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      fullscreen: false,
      titles: '',
      dialogVisible: false,
      message: 2,

      oldAvatarUrl: '',
      form: {
        userId: 0,
        newAvatarUrl: '',
        oldPwd: '',
        newPwd: '',
        confirePwd: '',
      },
      rules: {
        newAvatarUrl: [{ validator: checkUrl, trigger: 'blur' }],
        oldPwd: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPwd: [{ validator: checkNewPwd, trigger: 'blur' }],
        confirePwd: [{ validator: checkConfirmPwd, trigger: 'blur' }],
      },
    }
  },
  created() {
    this.oldAvatarUrl = this.getAvatarUrl
    console.log('this.oldAvatarUrl', this.oldAvatarUrl)
    this.form.userId = this.isUserId
  },

  computed: {
    getAvatarUrl() {
      return this.$store.getters.userBaseInfo.avatar
    },
    isUserName() {
      return this.$store.getters.userBaseInfo.username
    },
    isUserId() {
      return this.$store.getters.userId
    },
  },
  mounted() {
    if (!this.oldAvatarUrl) draw(this.isUserName)
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == 'loginout') {
        // sessionStorage.clear()
        Logout(this.isUserName)
        this.$store.commit('USER_LOGOUT')
        this.$router.push('/login')
      } else if (command == 'setAvatar') {
        this.titles = '设置头像'
        this.form.newAvatarUrl = this.getAvatarUrl
        this.dialogVisible = true
      } else if (command == 'updatePwd') {
        this.titles = '修改密码'
        this.dialogVisible = true
      }
    },
    // 侧边栏折叠
    changeCollapse() {
      this.$store.dispatch('changeSideBar', !this.$store.getters.collapse)
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },

    sumbitForm() {
      this.$refs.formRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return

        if (this.titles === '设置头像') {
          if (this.form.newAvatarUrl === '') {
            return this.$message.error('头像路径不能为空！')
          }
          let userId = this.isUserId
          let url = this.form.newAvatarUrl
          const { data: res } = await setAvatar(userId, url)
          if (res.code !== 200) return this.$message.error('操作失败')
          this.oldAvatarUrl = url
          this.$store.commit('SET_AVATAR', url)
          this.$message.success('操作成功！')
          this.dialogVisible = false
        } else {
          if (this.titles === '修改密码') {
            const { data: res } = await updatePwd(this.form)
            console.log(res)
            if (res.code !== 200) return this.$message.error(res.msg)
            this.$message.success('操作成功！请重新登录！')

            // sessionStorage.clear()
            this.$store.commit('USER_LOGOUT')
            this.$router.push('/login')
          }
        }
      })
    },
    // 弹窗关闭事件
    dialogClosed() {
      this.$refs.formRef.resetFields()
    },
    //编程式导航
    toUserInfo() {
      this.$router.push('/userinfo')
    },
  },
}
</script>

<style scoped lang="less">
.header {
  position: relative;
  box-sizing: border-box;
  background-color: #242633;
  width: 100%;
  height: 70px;
  font: 30px '站酷黑体';
  color: #fff;

  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }

  .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }

  .header-right {
    float: right;
    padding-right: 50px;

    .header-user-con {
      display: flex;
      height: 70px;
      align-items: center;
      .userInfo {
        font: 20px '站酷黑体';
        margin-right: 24px;
        cursor: pointer;
      }
      .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 28px;
      }
    }
  }
}

.user-avator {
  margin-left: 20px;
  img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  #defalut {
    display: block;
    border-radius: 50%;
  }
}

.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}

.el-dropdown-menu__item {
  text-align: center;
}

.el-dialog {
  .el-input {
    width: 300px;
  }
  .long {
    width: 500px;
  }
}
</style>
