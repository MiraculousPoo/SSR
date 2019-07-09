<template>
  <div class="map">
    <div id="container" style="width:420px; height:260px;" />
  </div>
</template>
<script>
export default {
  // props: {
  //   // coordinates: {
  //   //   type: Object,
  //   //   // eslint-disable-next-line vue/require-valid-default-prop
  //   //   default: {
  //   //   }
  //   // }
  // },
  props: ['coordinates'],
  data() {
    return {
      maplocation: {}
    }
  },
  computed: {
    ismaplocation() {
      return this.maplocation
    }
  },
  watch: {
    ismaplocation() {
      // 发射一个事件
      this.$emit('maplocation', this.maplocation)
    }
  },
  mounted() {
    window.onLoad = () => {
      // eslint-disable-next-line no-undef
      const map = new AMap.Map('container', {
        zoom: 11, // 放大级别
        // center: [116.397428, 39.90923], // 中心点坐标
        viewMode: '3D', // 使用3D视图
        resizeEnable: true// 定位到当前城市
      })

      console.log(map)
      // eslint-disable-next-line no-undef
      AMap.plugin('AMap.CitySearch', () => {
        // eslint-disable-next-line no-undef
        const citySearch = new AMap.CitySearch()
        citySearch.getLocalCity((status, result) => {
          if (status === 'complete' && result.info === 'OK') {
          // 查询成功，result即为当前所在城市信息
            this.maplocation = result
          }
        })
      })
    }
    const key = '763aebf096e7824f4d4e14237beddac0'
    const url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
</style>
