<!--
 * @Author: 龙际妙
 * @Date: 2021-10-15 14:26:59
 * @Description: 
 * @FilePath: \music-web-vue\src\components\public\Header.vue
 * @LastEditTime: 2021-10-28 04:47:14
 * @LastEditors: Please set LastEditors
-->
<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">通用权限管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <!-- 用户头像 -->
        <div class="user-avator"><img :src="avatarUrl" /></div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link"> {{ name }}<i class="el-icon-caret-bottom"></i> </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item divided command="setAvatar">设置头像</el-dropdown-item>
              <el-dropdown-item divided command="userinfo">个人信息</el-dropdown-item>
              <el-dropdown-item divided command="updatePwd">修改密码</el-dropdown-item>
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
  <!-- 弹窗区域 -->
  <el-dialog :title="titles" v-model="dialogVisible" width="50%" @close="avatarDialogClosed">
    <el-form ref="sumbitFormRef" label-width="100px">
      <el-form-item v-if="titles == '设置头像'" label="图片地址:" prop="avatar"
        ><el-input class="long" v-model="avatarUrl" placeholder="请输入图片的网络地址" @change="avatarChange"> </el-input>
      </el-form-item>
      <el-form-item v-if="titles == '修改密码'" label="旧密码:" prop="oldPwd"
        ><el-input v-model="oldPwd" placeholder="请输入旧密码" @change="oldPwdChange"> </el-input>
      </el-form-item>
      <el-form-item v-if="titles == '修改密码'" label="新密码:" prop="newPwd"
        ><el-input v-model="newPwd" placeholder="请输入新密码" @change="newPwdChange"> </el-input>
      </el-form-item>
      <el-form-item v-if="titles == '修改密码'" label="确认密码:" prop="confirePwd"
        ><el-input v-model="confirePwd" placeholder="请确认密码" @change="confirePwdChange"> </el-input>
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
export default {
  data() {
    return {
      collapse: false,
      fullscreen: false,
      titles: '',
      dialogVisible: false,
      name: 'undefined',
      message: 2,
    }
  },
  created() {},
  computed: {
    avatarUrl() {
      return this.$store.state.avatarUrl
    },
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage()
    }
    // 获取姓名
    this.name = this.$store.getters.roleName
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == 'loginout') {
        localStorage.removeItem('token')
        localStorage.removeItem('roleName')
        window.location.reload()
        this.$router.push('/login')
      } else if (command == 'userinfo') {
        this.$router.push('/userinfo')
      } else if (command == 'setAvatar') {
        this.titles = '设置头像'
        this.dialogVisible = true
      } else if (command == 'updatePwd') {
        this.titles = '修改密码'
        this.dialogVisible = true
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse
      console.log(this.collapse)
      this.$store.commit('setCollapse', this.collapse)
      //   bus.$emit('collapse', this.collapse)
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
  },
}
</script>

<style scoped lang="less">
.header {
  position: relative;
  box-sizing: border-box;
  background-color: #0d9;
  width: 100%;
  height: 70px;
  font-size: 22px;
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
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
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
