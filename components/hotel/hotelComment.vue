<template>
  <el-row class="circle-rate">
    <el-col :span="3">
      <nuxt-link to>
        <img src="./1ad52c00cf1815eec44f5d8cc494dca855bdb36811cdf-Exdgtf_fw658.jpg" alt>
      </nuxt-link>
      <i>ID : {{ data.id }}</i>
      <p>{{ timestamp(data.created_at) }}</p>
    </el-col>

    <el-col class="text" :span="21">
      <span>{{ data.content }}</span>
      <el-input
        v-model="commentText"
        type="textarea"
        resize="none"
        placeholder=""
        class="input"
        @focus="hiddenfocus"
        @blur="hiddenfocus"
      />
      <el-button v-if="hidden" size="mini" type="primary" class="submit">
        回复
      </el-button>
    </el-col>
    <hotelComment v-if="data.folowed" :data="data.folowed" />
  </el-row>
</template>
<script>
import moment from 'moment'
export default {
  name: 'HotelComment',
  props: {
    data: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {

      }
    }
  },
  data() {
    return {
      // 隐藏
      hidden: false,
      textarea: '',
      commentText: ''

    }
  },
  mounted() {
    console.log(this.data, 'dprops')
  },
  methods: {
    hiddenfocus() {
      this.hidden = !this.hidden
    },

    timestamp(value) {
      return moment(value).format('YYYY-MM-DD h:mm')
    }
  }
}
</script>
<style lang="less" scoped>
.circle-rate {

  a {
    width: 44px;
    height: 44px;
    display: inline-block;
    padding: 2px;
    border-radius: 50%;
    vertical-align: middle;
  }
  img {
    width: 100%;
    border-radius: 50%;
    box-sizing: border-box;
    &:hover {
      border: 2px solid #f90;
    }
  }
  i {
    font-size: 12px;
    color: #f30;
  }
  p {
    color: #666;
    font-size: 14px;
  }
  .submit{
      float: right
  }
  .input{
    margin: 10px 0;
  }
}
.text {
}
</style>
