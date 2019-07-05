<template>
  <div class="flight-item">
    <div @click="showHide">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <!-- 航空信息 -->
        <el-col :span="6">
          <span>{{ data.airline_name }}</span>
          {{ data.flight_no }}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <!-- 起飞时间 -->
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.dep_time }}</strong>
              <span>{{ data.org_airport_name }}{{ data.org_airport_quay }}</span>
            </el-col>
            <!-- 时间间隔 -->
            <el-col :span="8" class="flight-time">
              <span>{{ rasnkTime }}</span>
            </el-col>
            <!-- 到达时间 -->
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.arr_time }}</strong>
              <span>{{ data.dst_airport_name }}{{ data.dst_airport_quay }}</span>
            </el-col>
          </el-row>
        </el-col>
        <!-- 价格 -->
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{ data.base_price / 2 }}</span>起
        </el-col>
      </el-row>
    </div>
    <div v-if="hideRecommend" class="flight-recommend">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">
          低价推荐
        </el-col>
        <el-col :span="20">
          <el-row
            v-for="(item,index) in data.seat_infos"
            :key="index"
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{ item.name }}</span>
              | {{ item.supplierName }}
            </el-col>
            <el-col :span="5" class="price">
              ￥{{ item.par_price }}
            </el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini" @click="handleToOrder(item)">
                选定
              </el-button>
              <p>剩余：{{ item.discount }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    data: {
      type: Object,
      // 默认是空数组
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data() {
    return {
      hideRecommend: false
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    rasnkTime() {
      const dep = this.data.dep_time.split(':')
      const arr = this.data.arr_time.split(':')

      const depVal = dep[0] * 60 + +dep[1]
      const arrVal = arr[0] * 60 + +arr[1]

      // 到达时间相减得到分钟
      let dis = arrVal - depVal

      // 如果是第二天凌晨时间段，需要加24小时
      if (dis < 0) {
        dis = arrVal + 24 * 60 - depVal
      }

      // 得到相差时间
      return `${Math.floor(dis / 60)}时${dis % 60}分`
    }
  },
  mounted() {},
  methods: {
    // 切换隐藏座位信息
    showHide() {
      this.hideRecommend = !this.hideRecommend
    },
    // 选定点击跳转到订单页
    handleToOrder(item) {
      this.$router.push({
        path: '/air/order',
        query: {
          id: this.data.id,
          seat_xid: item.seat_xid
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
