<template>
  <div class="login">
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <el-row type="flex" justify="center" align="middle" class="tabs">
          <span
            v-for="(item,index) in [`登录`,`注册`]"
            :key="index"
            :class="{active:memberTab === index}"
            @click="memberSwitch(index)"
          >{{ item }}</span>
        </el-row>
        <el-form
          v-if="memberTab == 0"
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="form"
        >
          <el-form-item prop="username" class="form-item">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable />
          </el-form-item>
          <el-form-item class="form-item" prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <p class="forget-password">
            <nuxt-link to="#">
              忘记密码
            </nuxt-link>
          </p>
          <el-button type="primary" class="login-submit" @click="loginSubmit">
            登录
          </el-button>
        </el-form>
        <el-form
          v-if="memberTab == 1"
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
          class="form"
        >
          <el-form-item class="form-item" prop="username">
            <el-input v-model="registerForm.username" placeholder="请输入手机" clearable />
          </el-form-item>
          <el-form-item class="form-item" prop="captcha">
            <el-input v-model="registerForm.captcha" placeholder="验证码">
              <template slot="append">
                <el-button @click="sendCaptcha()">
                  发送验证码
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item" prop="nickname">
            <el-input v-model="registerForm.nickname" placeholder="你的名字" />
          </el-form-item>
          <el-form-item class="form-item" prop="password">
            <el-input v-model="registerForm.password" placeholder="密码" show-password />
          </el-form-item>
          <el-form-item class="form-item" prop="checkPassword">
            <el-input v-model="registerForm.checkPassword" placeholder="确认密码" show-password />
          </el-form-item>
          <el-button type="primary" class="login-submit" @click="registerSubmit()">
            注册
          </el-button>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        captcha: '',
        nickname: '',
        password: '',
        checkPassword: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        checkPassword: [{ validator: validatePass, trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      loginForm: {
        username: '13800138000',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      // 登录注册选项卡
      memberTab: 0
    }
  },
  mounted() {},
  methods: {
    // 发送验证码
    sendCaptcha() {
      // if (!this.form.username) {
      //   this.$confirm('手机号码不能为空', '提示', {
      //     confirmButtonText: '确定',
      //     showCancelButton: false,
      //     type: 'warning'
      //   })
      //   return
      // }

      // if (this.form.username.length !== 11) {
      //   this.$confirm('手机号码格式错误', '提示', {
      //     confirmButtonText: '确定',
      //     showCancelButton: false,
      //     type: 'warning'
      //   })
      //   return
      // }
      // if (!this.registerForm.username) {
      //   this.$message.warning('请输入手机')
      // }
      this.$axios({
        url: '/captchas',
        method: 'POST',
        data: {
          tel: this.registerForm.username
        }
      }).then((res) => {
        const { code } = res.data
        this.$confirm(`模拟手机验证码为：${code}`, '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
      })
    },
    // 注册
    registerSubmit() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // const { checkPassword, ...props } = this.registerForm
          // this.$axios({
          //   url: '/accounts/register',
          //   method: 'POST',
          //   data: props
          // }).then((res) => {
          //   this.$store.commit('user/setUserInfo', res.data)
          //   this.$message.success('注册成功')
          //   this.$router.push('/')
          // })
          const { checkPassword, ...props } = this.registerForm
          this.$store.dispatch('user/register', props).then((res) => {
            this.$message.success('注册成功')
            this.$router.push('/')
          })
        }
      })
    },
    // 提交登录
    loginSubmit() {
      // 验证表单
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 在user.js优化
          // this.$axios({
          //   url: '/accounts/login',
          //   method: 'POST',
          //   data: this.loginForm
          // }).then((res) => {
          //   this.$store.commit('user/setUserInfo', res.data)
          //   this.$message.success('登录成功')
          //   this.$router.push('/')
          // })
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            this.$message.success('登录成功')
            this.$router.push('/')
          })
        }
      })
    },
    memberSwitch(index) {
      this.memberTab = index
    }
  }
}
</script>

<style scoped lang="less">
.login {
  background: url(/images/bar1.jpg) center 0;
  height: 700px;
  min-width: 1000px;
  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    .form-wrapper {
      width: 400px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .tabs {
      span {
        display: block;
        width: 50%;
        height: 50px;
        box-sizing: border-box;
        border-top: 2px solid #eee;
        background: #eee;
        line-height: 48px;
        text-align: center;
        cursor: pointer;
        color: #666;
        &.active {
          color: orange;
          border-top: 2px solid orange;
        }
      }
    }
    .form {
      padding: 25px;
      .form-item {
        margin-bottom: 20px;
      }
      .login-submit {
        width: 100%;
        margin-top: 10px;
      }
      .forget-password {
        font-size: 12px;
        color: #409eff;
        text-align: right;
        line-height: 1;
      }
    }
  }
}
</style>
