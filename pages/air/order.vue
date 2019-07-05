<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->

      <div class="main">
        <OrderForm @setInfoData="setInfoData" @setAllPrice="setAllPrice" />
      </div>
      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="infoData" :all-price="allPrice" />
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm.vue'
import OrderAside from '@/components/air/OrderAside.vue'
export default {
  components: {
    OrderForm,
    OrderAside
  },
  data() {
    return {
      // 机票信息
      infoData: {
        insurances: [], // 初始化保险数据
        seat_infos: {}
      },
      allPrice: 0
    }
  },
  methods: {
    // 设置订单机票信息，给orderForm来调用的
    setInfoData(data) {
      this.infoData = data
    },
    // 接收总价格，来自于orderForm
    setAllPrice(price) {
      this.allPrice = price
    }
  }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }

    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>
