<template>
  <div class="main">
    <!-- 剩机人 -->
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div v-for="(item,index) in users" :key="index" class="member-info-item">
          <el-form-item label="乘机人类型">
            <el-input v-model="item.username" placeholder="姓名" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1" />
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input v-model="item.id" placeholder="证件号码" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true" />
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 删除乘机人 -->
          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>
      <!-- 添加乘机人 -->
      <el-button class="add-member" type="primary" @click="handleAddUsers">
        添加乘机人
      </el-button>
    </div>
    <!-- 保险 -->
    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div v-for="(item,index) in infoData.insurances" :key="index" class="insurance-item">
          <el-checkbox :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`" border @change="handleInsurances(item)" />
        </div>
      </div>
    </div>
    <!-- 联系人 -->
    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName" />
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="contactPhone" placeholder="请输入内容">
              <template slot="append">
                <el-button @click="handleSendCaptcha">
                  发送验证码
                </el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha" />
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">
          提交订单
        </el-button>
        <!-- 隐藏 -->
        <input type="hidden" :value="allPrice">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      insurances: [], // 保险的id集合
      contactName: '', // 联系人名字
      contactPhone: '', // 联系人电话
      invoice: false, // 是否需要发票
      captcha: '', // 手机验证码
      // 用户列表
      users: [{
        username: '',
        id: ''
      }],
      // 机票信息的总数据
      infoData: {
        seat_infos: {}
      }
    }
  },
  // 监控变量
  computed: {
    allPrice() {
      let price = 0
      // 机票的单价
      price += this.infoData.seat_infos.org_settle_price
      // 燃油费
      price += this.infoData.airport_tax_audlet
      // 保险
      price += 30 * this.insurances.length
      // 乘机人数量
      price *= this.users.length
      this.$emit('setAllPrice', price)
      return price
    }
  },
  mounted() {
    // eslint-disable-next-line camelcase
    const { id, seat_xid } = this.$route.query
    this.$axios({
      url: `/airs/${id}`,
      params: {
        seat_xid
      }
    }).then((res) => {
      const { data } = res
      this.infoData = data
      // 把值传递给父组件
      this.$emit('setInfoData', this.infoData)
    })
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        username: '',
        id: ''
      })
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1)
    },
    // 获取保险的数据
    handleInsurances(item) {
      const index = this.insurances.indexOf(item.id)
      if (index === -1) {
        this.insurances.push(item.id)
      } else {
        this.insurances.splice(index, 1)
      }
    },
    // 发送手机验证码
    handleSendCaptcha() {
      // 如果手机号码是空，直接返回
      if (!this.contactPhone) {
        this.$message.warning('请输入手机号码')
        return
      }
      this.$axios({
        url: '/captchas',
        method: 'POST',
        data: {
          tel: this.contactPhone
        }
      }).then((res) => {
        const { code } = res.data
        alert(code)
      })
    },

    // 提交订单
    handleSubmit() {
      const data = {
        users: this.users, // 用户列表
        insurances: this.insurances, // 保险的id
        contactName: this.contactName, // 联系人名字
        contactPhone: this.contactPhone, // 联系人电话
        invoice: this.invoice, // 是否需要发票
        captcha: this.captcha, // 手机验证码
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      }
      const { user: { userInfo } } = this.$store.state
      this.$axios({
        url: '/airorders',
        method: 'POST',
        data,
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }).then((res) => {
        const { data } = res
        this.$message.success(data.message)
        this.$router.push({
          path: '/air/pay',
          query: {
            id: data.data.id
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>
