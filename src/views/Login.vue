<template>
  <!-- #707070 -->
  <vue-particles
    class="login-background"
    color="#fff"
    :particleOpacity="0.7"
    :particlesNumber="150"
    shapeType="edge"
    :particleSize="2"
    linesColor="#fff"
    :linesWidth="1.5"
    :lineLinked="true"
    :lineOpacity="0.3"
    :linesDistance="200"
    :moveSpeed="3"
    :hoverEffect="true"
    hoverMode="grab"
    :clickEffect="true"
    clickMode="push"
  >
  </vue-particles>
  <div class="login_container">
    <!-- 登录框 -->
    <div class="login_box">
      <!-- logo区域 -->
      <div class="logo">
        RBAC|Mj-admin
        <div>通用权限管理模板</div>
      </div>

      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
      </el-form>

      <!-- 按钮区域 -->
      <div class="btns">
        <el-button type="primary" @click="login" class="btnLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createRoute } from '../router'
import { reset } from '../utils/myFunction'
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'superadmin',
        password: '123456',
      },
      token: '',
      // 这是表单的验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {},

  methods: {
    // 重置按钮的点击事件
    resetLoginForm() {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 登录按钮的点击事件
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return

        try {
          const res = await this.$store.dispatch('userLogin', this.loginForm)

          const req = await this.$store.dispatch('getUserInfo', res.data.userId)
          console.log('req', req)

          createRoute(req)
          //重置
          reset()
          // 2.通过编程式导航跳转到后台主页，/home
          this.$message.success('登录成功！')

          this.$router.push('/home')
          console.log('this.$route', this.$route)
        } catch (error) {
          console.log(error)
          this.$message.error(error.msg)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login-background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: 0;
  position: absolute;
}

.login-background::before {
  content: '';
  position: absolute;
  // background-image: url('https://cdn.jsdelivr.net/gh/Jimi331492/cdn@1.3/img/cover/(4).jpg.webp');
  background-image: url('../assets/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  // filter: blur(2px);
  // -webkit-filter: blur(2px);
  z-index: -1;
  height: 100%;
  width: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  background-color: #fff;
  border-radius: 25px;
  .logo {
    font: 24px 'D-Din';
    margin: calc(5% + 5px) auto;
    div {
      font: 18px '站酷黑体';
      margin-top: 3px;
      text-align: center;
    }
  }
  .login_form {
    width: 100%;
    padding: 0 50px 0 50px;
    z-index: 0;
  }
  .btns {
    margin: 2% auto;
    .btnLogin {
      width: 120px;
      background-color: #000;
      border-radius: 20px;
      margin: 0 auto;
    }
  }
}
</style>
