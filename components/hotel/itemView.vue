<template>
  <el-row class="hotel-item">
    <el-col :span="8">
      <span class="img-wrapper">
        <nuxt-link :to="`hotel/${hotelslist.id}.hotel`">
          <img :src="hotelslist.photos" width="320" height="210">
        </nuxt-link>
      </span>
    </el-col>

    <el-col :span="10">
      <!-- 名称信息 -->
      <h4 class="hotel-cn-name">
        <nuxt-link :to="`hotel/${hotelslist.id}.hotel`">
          {{ hotelslist.name }}
        </nuxt-link>
      </h4>
      <div class="hotel-en-name">
        <span>{{ hotelslist.alias }} </span>
      </div>

      <!-- 评价信息 -->
      <el-row type="flex">
        <!-- 星星 -->
        <el-col :span="10">
          <starRating :stars="hotelslist.stars" class="rate-budget" />
        </el-col>
        <el-col :span="7">
          <span class="height-light"> XXX</span>条评价
        </el-col>
        <el-col :span="7">
          <span class="height-light"> XXX</span>篇游记
        </el-col>
      </el-row>

      <!-- 简介 -->
      <!-- <div class="hotel-summary-row" /> -->
      <div class="location-row">
        <i class="el-icon-location" />
        位于:{{ hotelslist.address }}
      </div>
    </el-col>
    <!-- 平台 -->
    <el-col :span="6" class="price-col">
      <platform :platform="hotelslist.products" class="price-table" />
    </el-col>
  </el-row>
</template>
<script>
import starRating from './module/starRating'
import platform from './module/platform'
export default {
  // props: {
  //     data: {
  //       type: Object,
  //       // eslint-disable-next-line vue/require-valid-default-prop
  //       default: {
  //       }
  //     }
  //   },
  components: {
    starRating,
    platform
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['hotelslist'],
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.hotel-item {
    padding: 25px 0;
    border-bottom: 1px solid #eee;
  }
  .larger {
    font-size: larger;
  }

  .x-large {
    font-size: x-large;
  }
  .height-light {
    color: #f90;
  }
  .hotel-cn-name {
    font-weight: normal;
    font-size: x-large;
  }
  .hotel-en-name {
    margin-bottom: 0.5em;
  }

  .rate-budget {
    display: inline-block;
  }

  .hotel-summary-row {
    margin: 1em 0;
    font-size: 14px;
    color: #666;
  }

  .location-row {
    color: #666;
    font-size: 14px;
  }

  .img-wrapper {
    width: 420px;
    > img {
      border-radius: 4px;
    }
  }
  .hotel-en-name {
    color: #999;
  }
  .price-col {
    margin-top: 20px;
    .price-num {
      font-size: x-large;
    }
    /deep/ .product-row {
      cursor: pointer;
    }
  }
</style>
