<template>
  <div class="header">
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt>
        </nuxt-link>
      </div>
      <!-- 菜单栏 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">
          首页
        </nuxt-link>
        <nuxt-link to="/post">
          旅游攻略
        </nuxt-link>
        <nuxt-link to="/hotel">
          酒店
        </nuxt-link>
        <nuxt-link to="/air">
          国内机票
        </nuxt-link>
      </el-row>
      <!-- 登录/用户信息 -->
      <el-row type="flex" align="middle">
        <el-dropdown v-if="$store.state.user.userInfo.token">
          <el-row type="flex" align="middle" class="el-dropdown-link">
            <nuxt-link to="#">
              <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar">
              <span>{{ $store.state.user.userInfo.user.nickname }}</span>
            </nuxt-link>
            <i class="el-icon-caret-bottom el-icon--right" />
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <nuxt-link to="/user/myzoe">
                <span>个人中心</span>
              </nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="handleLogout">
                退出
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 不存在用户信息展示登录注册链接 -->
        <nuxt-link v-else to="/user/login" class="account-link">
          登录 / 注册
        </nuxt-link>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    // 用户退出
    handleLogout() {
      this.$store.commit('user/cleanUserInfo')
      // this.$message({
      //   message: '退出成功',
      //   type: 'success'
      // })
      this.$message.success('退出成功')
      this.$router.push('/user/login')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  border-bottom: 1px solid rgb(231, 231, 231);
  box-shadow: 0 5px 10px #f0f0f0;
  .main {
    width: 1000px;
    margin: 0 auto;
  }
  .logo {
    padding-top: 8px;
    width: 156px;
    img {
      display: block;
      width: 100%;
    }
  }
  .navs {
    margin: 0 20px;
    flex: 1;
    a {
      display: block;
      height: 60px;
      padding: 0 20px;
      color: #000000;
      font-family: Consolas, "Courier New", monospace;
      box-sizing: border-box;
      &:hover,
      &:focus,
      &:active {
        border-bottom: 5px #409eff solid;
        color: #409eff;
      }
    }
    /deep/ .nuxt-link-exact-active {
      background: #409eff;
      color: #fff !important;
    }
  }
  .el-dropdown-link {
    margin-left: 20px;
    span {
      color: #666;
    }
    &:hover {
      img {
        border-color: #409eff;
      }
    }

    a {
      color: #666;
      display: block;
    }

    img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      border: 2px #fff solid;
      border-radius: 50px;
    }
  }

  .account-link {
    font-size: 14px;
    margin-left: 10px;
    color: #666;

    &:hover {
      color: #409eff;
      text-decoration: underline;
    }
  }
}
</style>
