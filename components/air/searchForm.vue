<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        :class="{active: index === currentTab}"
        @click="handleSearchTab(item, index)"
      >
        <i :class="item.icon" />
        {{ item.name }}
      </span>
    </el-row>
    <!-- 功能 -->
    <el-form ref="form" class="search-form-content" label-width="80px">
      <!-- 出发城市 -->
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="cityForm.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          class="el-autocomplete"
          @select="handleDepartSelect"
        />
      </el-form-item>
      <!-- 到达城市 -->
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="cityForm.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          class="el-autocomplete"
          @select="handleDestSelect"
        />
      </el-form-item>
      <!-- 出发时间 -->
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          v-model="cityForm.departDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
        />
      </el-form-item>
      <!-- 搜索 -->
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">
          搜索
        </el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityForm: {
        departCity: '', // 出发城市
        departCode: '', // 出发城市代码
        destCity: '', // 到达城市
        destCode: '', // 到达城市代码
        departDate: '' // 日期字符串
      },
      // tab栏
      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],
      currentTab: 0
    }
  },
  mounted() {},
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      this.currentTab = index
    },
    departDest(value, cb) {
      if (!value) return
      this.$axios({
        url: '/airs/city?name=' + value
      }).then((res) => {
        const { data } = res.data
        const newData = data.map((v) => {
          return {
            ...v,
            value: v.name.replace('市', '')
          }
        })
        cb(newData)
      })
    },
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      // this.$axios({
      //   // 由于本地的机票接口有问题，暂时修改为线上的地址
      //   url: 'http://157.122.54.189:9095/airs/city?name=' + value
      // }).then((res) => {
      //   const { data } = res.data
      //   const newData = data.map((v) => {
      //     return {
      //       ...v,
      //       value: v.name.replace('市', '')
      //     }
      //   })
      //   cb(newData)
      // })
      this.departDest(value, cb)
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      // this.$axios({
      //   // 由于本地的机票接口有问题，暂时修改为线上的地址
      //   url: 'http://157.122.54.189:9095/airs/city?name=' + value
      // }).then((res) => {
      //   const { data } = res.data
      //   const newData = data.map((v) => {
      //     return {
      //       ...v,
      //       value: v.name.replace('市', '')
      //     }
      //   })
      //   cb(newData)
      // })
      this.departDest(value, cb)
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.cityForm.departCity = item.value
      this.cityForm.departCode = item.sort
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.cityForm.destCity = item.value
      this.cityForm.destCode = item.sort
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.cityForm.departDate = value
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.cityForm
      this.cityForm.departCity = destCity
      this.cityForm.destCity = departCity
      this.cityForm.departCode = destCode
      this.cityForm.destCode = departCode
    },

    // 提交表单是触发
    handleSubmit() {
      const rules = {
        departCity: {
          value: this.cityForm.departCity,
          message: '请选择出发城市'
        },
        destCity: {
          value: this.cityForm.destCity,
          message: '请选择到达城市'
        },
        departDate: {
          value: this.cityForm.departDate,
          message: '请选择出发时间'
        }
      }
      let valid = true
      Object.keys(rules).forEach((v) => {
        if (!valid) return
        if (!rules[v].value) {
          this.$message.warning(rules[v].message)
          valid = false
        }
      })
      if (!valid) return
      this.$router.push({
        path: '/air/flights',
        // path: '/',
        query: this.cityForm
      })
      // 先获取本地的列表
      const localAirs = JSON.parse(localStorage.getItem('airs') || `[]`)
      // 把当前表单的值保存到本地
      // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
      localAirs.unshift(this.cityForm)
      localStorage.setItem('airs', JSON.stringify(localAirs))
    }
  }
}
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
