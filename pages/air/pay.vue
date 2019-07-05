<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额 <span class="pay-price">￥ {{ order.price }}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          class="pay-qrcode"
        >
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage" />
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 生成二维码的包
import { setTimeout } from 'timers'
import QRCode from 'qrcode'
export default {
  data() {
    return {
      order: {}
    }
  },
  mounted() {
    const { id } = this.$route.query
    const { user: { userInfo } } = this.$store.state
    setTimeout(() => {
      this.$axios({
        url: `/airorders/${id}`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }).then((res) => {
        this.order = res.data
        // 价格保留两位小数点
        this.order.price = Number(this.order.price).toFixed(2)
        // 生成二维码到canvas/ 生成二维码到canvas
        const stage = document.querySelector('#qrcode-stage')
        // stage: canvas的dom元素
        // url: 付款的链接
        // 配置：配置宽高
        QRCode.toCanvas(stage, this.order.payInfo.code_url, {
          width: 200
        })
        // 判断当前付款是否成功
        this.timer = setInterval(async () => {
          const isPay = await this.isPay()
          if (isPay) {
            this.$messge.success('付款成功')
            clearInterval(this.timer)
          }
        }, 5000)
      })
    }, 100)
  },
  destroyed() {
    // 当页面离开后停止定时器
    clearInterval(this.timer)
  },
  methods: {
    // 检查付款状态
    isPay() {
      const { id } = this.$route.query
      const { user: { userInfo } } = this.$store.state
      const { price, orderNo } = this.order
      return this.$axios({
        url: '/airorders/checkpay',
        method: 'POST',
        data: {
          id,
          price,
          orderNo
        },
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }).then((res) => {
        const { statusTxt } = res.data
        if (statusTxt === '支付完成') {
          return true
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>
