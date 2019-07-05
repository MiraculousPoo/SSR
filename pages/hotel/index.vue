<template>
  <div class="container">
    <!-- 面包屑导航条 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索 -->
    <searchBar class="hotel-search-bar" />
    <!-- 条件01 -->
    <el-row type="flex" class="hotel-option-row">
      <el-col :span="14">
        <searchOptions :searchoptions="searchoptions[0]" />
      </el-col>
      <el-col :span="10">
        地图
      </el-col>
    </el-row>
    <listFilter :hotel-options="hotelOptions" />
    <!-- 酒店列表 -->
    <div class="hotel-list">
      <div v-if="!newHotels" class="no-result">
        暂无符合条件的酒店
      </div>
      <div v-else>
        <itemView v-for="(item,index) in newHotels" :key="index" :hotelslist="item" />
        <!-- 分页 -->
        <div class="pagination-box">
          <!-- size-change：切换条数时候触发 -->
          <!-- current-change：选择页数时候触发 -->
          <!-- current-page: 当前页数 -->
          <!-- page-size：当前条数 -->
          <!-- total：总条数 -->
          <el-button size="mini" icon="el-icon-arrow-left" :disabled="currentPage===1" @click="prev">
            上一页
          </el-button>
          <el-pagination
            small
            :current-page="currentPage"
            :page-size="pageSize"
            layout="pager"
            :total="total"
            @current-change="handleCurrentChange"
          />
          <el-button size="mini" :disabled="currentPage ===Math.ceil(total/pageSize)" @click="next">
            下一页<i class="el-icon-arrow-right el-icon--right" />
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from '@/components/hotel/searchBar'
import searchOptions from '@/components/hotel/searchOptions'
import itemView from '@/components/hotel/itemView'
import listFilter from '@/components/hotel/listFilter'
export default {
  components: {
    searchBar,
    searchOptions,
    itemView,
    listFilter
  },
  data() {
    return {
      // 查找城市数据
      searchoptions: [],
      // 房间设施
      // hotelAssets: [],
      hotelOptions: {},
      // 分页酒店数据
      newHotels: [],
      // 总数据
      hotels: {},
      prevdisabled: false,
      nextdisabled: false,
      // 分页总条数
      total: 5,
      // 当前页数
      currentPage: 1,
      // 显示条数
      pageSize: 5
    }
  },
  mounted() {
    // 酒店详情
    this.$axios({
      url: 'http://157.122.54.189:9095/hotels?city=74'
    }).then((res) => {
      const { data } = res
      this.hotels = data
      this.total = this.hotels.data.length
      // 初始化酒店数据，获取start,end条
      this.setHotelsList()
    })
    // 酒店选项
    this.getHotelOptions()
    // 查找城市
    this.getCities()
  },
  methods: {
    // 上一页
    prev() {
      this.currentPage--
      this.setHotelsList()
    },
    // 下一页
    next() {
      this.currentPage++
      this.setHotelsList()
    },
    // 选择页数时候触发
    handleCurrentChange(val) {
      this.currentPage = val
      this.setHotelsList()
    },
    setHotelsList() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      this.newHotels = this.hotels.data.slice(start, end)
    },
    // 酒店选项
    getHotelOptions() {
      this.$axios({
        url: '/hotels/options'
      }).then((res) => {
        const { data } = res.data
        this.hotelOptions = data
      })
    },
    // 查找城市
    getCities() {
      this.$axios({
        url: `/cities`,
        params: {
          name: '南京市'
        }
      }).then((res) => {
        const { data } = res.data
        this.searchoptions = data
        console.log(this.searchoptions, '// 查找城市')
      })
    }
    // // 查找省份下的城市
    // getProvince() {
    //   this.$axios({
    //     url: `/province/search?`
    //   }).then((res) => {
    //     console.log(res)
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
.container {
    width: 1000px;
    margin: 0 auto;

    .breadcrumb {
      overflow: hidden;
      padding: 20px 0;
    }
    .hotel-option-row {
      min-height: 260px;
      margin-bottom: 20px;
    }

    .pagination-box {
      display: flex;
      justify-content: flex-end;
      padding: 20px 0 40px 0;
    }

    .no-result,
    .hotel-list-loading {
      text-align: center;
      height: 300px;
      margin-top: 20px;
    }
  }
</style>
