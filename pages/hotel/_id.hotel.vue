<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">
          酒店
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel' }">
          {{ hotel.real_city }} 酒店
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{ hotel.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 标题 -->
    <el-row class="name-info">
      <el-col>
        <el-row>
          <h4 class="hotel-cn-name">
            {{ hotel.name }}
          </h4>
          <el-rate
            v-model="hotel.stars"
            disabled
          />
        </el-row>
        <el-row>
          <span class="hotel-en-name">
            {{ hotel.alias }}
          </span>
        </el-row>
        <el-row>
          <i class="el-icon-location" />
          {{ hotel.address }}
        </el-row>
      </el-col>
    </el-row>
    <!-- 图片 -->
    <el-row class="pic-info info-row">
      <el-col :span="16" class="pic-left">
        <img src="./1.jpeg" alt="">
      </el-col>
      <el-col :span="8">
        <el-col v-for="(item , index) in hotel.pics" :key="index" class="pic-right" :span="12">
          <nuxt-link to="">
            <img src="./1.jpeg" alt="">
          </nuxt-link>
        </el-col>
      </el-col>
    </el-row>
    <!-- 平台 -->
    <el-table
      class="info-row"
      :data="hotel.products"
    >
      <el-table-column prop="name" label="价格来源" />
      <el-table-column prop="bestType" label="低价房型" />
      <el-table-column prop="price" label="最低价格/每晚" width="160">
        <template slot-scope="scope">
          <span class="height-light larger">
            ￥{{ scope.row.price }}
          </span>起
          <span>
            <i class="el-icon-arrow-right height-light" />
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 地图 -->
    <div class="info-row">
      <mapBox />
    </div>
    <!-- 基本信息 -->
    <div class="info-row">
      <el-row class="assets-info">
        <el-col :span="4" class="assets-info-hd">
          基本信息
        </el-col>
        <el-col :span="20" class="assets-info-bd">
          <el-row type="flex" class="base-info">
            <el-col>入住时间: 14:00之后</el-col>
            <el-col>离店时间: 12:00之前</el-col>
            <el-col>{{ hotel.creation_time }}  /  {{ hotel.renovat_time }} </el-col>
            <el-col>酒店规模: {{ hotel.roomCount }}间客房</el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="assets-info">
        <el-col :span="4" class="assets-info-hd">
          主要设施
        </el-col>
        <el-col :span="20" class="assets-info-bd">
          <span v-for="(item,index) in hotel.hotelassets" :key="index" type="info" class="assets-info-item">
            {{ item.name }}
          </span>
        </el-col>
      </el-row>

      <el-row class="assets-info">
        <el-col :span="4" class="assets-info-hd">
          停车服务
        </el-col>
        <el-col :span="20" class="assets-info-bd base-info">
          {{ hotel.parking|| '-' }}
        </el-col>
      </el-row>

      <el-row class="assets-info">
        <el-col :span="4" class="assets-info-hd">
          品牌信息
        </el-col>
        <el-col :span="20" class="assets-info-bd">
          {{ hotel.hotelbrand ? hotel.hotelbrand.name : '-' }}
        </el-col>
      </el-row>
    </div>
    <!-- 用户评论 -->
    <div class="comment-row">
      <h4 class="comments-hd">
        {{ hotelComment.length }}条真实用户评论
      </h4>

      <el-row type="flex" class="scores-row">
        <el-col :span="4">
          <p>总评数： ?</p>
          <p>好评数：  ?</p>
          <p>差评数： ?</p>
        </el-col>
        <el-col class="recomment-score" :span="5">
          <div class="comment-star">
            <el-rate
              v-model="hotel.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}分"
            />
          </div>
          <div class="x-large height-light stamp">
            推荐
          </div>
        </el-col>
        <el-col v-for="(item,index) in rate" :key="index" :span="3">
          <div class="rate-box">
            {{ item.name }}
          </div>
        </el-col>
      </el-row>

      <div v-for="(item,index) in hotelComment" :key="index" class="comment-list">
        <hotelComment :data="hotelComment[index]" />
      </div>
    </div>
  </div>
</template>

<script>

import hotelComment from '@/components/hotel/hotelComment'
import mapBox from '@/components/hotel/module/mapBox'
export default {
  components: {
    hotelComment,
    mapBox
  },
  data() {
    return {
      // 总数据
      hotel: {},
      hotelComment: {},
      rate: [
        { name: '环境' }, { name: '产品' }, { name: '服务' }
      ]
    }
  },
  mounted() {
    const { id } = this.$route.params
    this.$axios({
      url: '/hotels?id=' + id
    }).then((res) => {
      console.log(res, 'city')
      const { data: [data] } = res.data
      this.hotel = data
      console.log(data, 'data')
    })

    this.$axios({
      url: '/hotels/comments'

    }).then((res) => {
      const { data } = res.data
      this.hotelComment = data
      console.log(this.hotelComment, 'this.hotelComment')
    })
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.comment-list{
  margin-top: 10px;
  padding: 10px 0 ;
  border-top: 1px dashed #eee;
}
.pic-info{
  height: 360px;
}
.pic-left{
img{
    width: 640px;
    height: 360px;
  }
}
.pic-right{
  img{
   width: 160px;
   padding: 0 10px  ;
   margin-bottom: 10px;
  }
}
.container {
    width: 1000px;
    margin: 0 auto;

    .height-light {
      color: #f90;
    }

    .larger {
      font-size: larger;
    }

    .x-large {
      font-size: x-large;
    }

    .breadcrumb {
      overflow: hidden;
      padding: 20px 0;
    }

    .name-info {
      margin-bottom: 20px;
      color: #666;
      font-size: 14px;
    }

    .hotel-cn-name {
      color: #333;
      font-weight: normal;
      font-size: x-large;
    }
    .hotel-en-name {
      margin-bottom: 0.5em;
    }

    .box-card {
      margin: 20px 0;
    }

    .scores-row {
      color: #666;
      padding: 20px 0;
    }
    .score-item {
      margin-top: 6px;
    }

    .base-info {
      color: #666;
      font-size: 14px;
    }

    .assets-info {
      border-bottom: 1px solid #eee;

      .assets-info-hd,
      .assets-info-bd {
        padding: 20px 10px;
        font-size: 14px;
      }
      .assets-info-item {
        border: 1px solid #eee;
        padding: 4px 10px;
        margin-right: 10px;
        border-radius: 4px;
        background-color: #eee;
        color: #666;
      }
    }

    .info-row {
      margin: 40px 0;
    }

    .empty-page {
      text-align: center;
    }

    .rate-box {
      width: 70px;
      line-height: 60px;
      text-align: center;
      color: #f90;
    }

    .recomment-score {
      position: relative;
      display: flex;
      align-content: center;
    }
    .comment-star {
      margin-top: 20px;
    }
    .stamp {
      position: absolute;
      left: 20px;
      border: 2px solid #fa3;
      text-align: center;
      line-height: 70px;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      opacity: 0.25;
      transform: rotate(-30deg);
    }
  }
</style>
