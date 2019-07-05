<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <!-- cacheFlightsData缓存数据 -->
        <!-- setDataList 用于修改过滤后的数组列表 -->
        <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <el-row v-if="total===0" type="flex" justify="center" class="flights-empty">
          无航班信息
        </el-row>
        <!-- 航班信息 -->
        <div v-else>
          <!-- 航班列表 -->
          <flightsItem v-for="(item, index) in dataList" :key="index" :data="item" />

          <!-- 分页 -->
          <el-row type="flex" justify="center" style="margin-top:10px;">
            <el-pagination
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-row>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsItem from '@/components/air/flightsItem.vue'
import FlightsListHead from '@/components/air/flightsListHead.vue'
import FlightsFilters from '@/components/air/flightsFilters.vue'
import FlightsAside from '@/components/air/flightsAside.vue'
export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      // 缓存数据
      cacheFlightsData: {
        info: {},
        flights: {},
        options: {}
      },
      currentPage: 1, // 默认的当前页
      pageSize: 5, // 默认的条数
      total: 0, // 默认的总条数
      // 航班总数据
      flightsData: {
        info: {},
        flights: {},
        options: {}
      },
      dataList: [] // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
    }
  },
  // 监听
  watch: {
    $route() {
      this.getData()
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 切换条数时候触发
    handleSizeChange(val) {
      this.pageSize = val
      this.setDataList()
    },
    // 切换页数时候触发
    handleCurrentChange(val) {
      this.currentPage = val
      this.setDataList()
    },
    // 设置机票列表的数据
    setDataList(arr) {
      if (arr) {
        this.flightsData.flights = arr
        this.currentPage = 1
        this.total = arr.length
      }
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      this.dataList = this.flightsData.flights.slice(start, end)
    },
    // 获取航班总数据
    getData() {
      this.$axios({
        url: 'http://157.122.54.189:9095/airs',
        params: this.$route.query
      }).then((res) => {
        // 总数据
        this.flightsData = res.data
        // 缓存数据
        this.cacheFlightsData = { ...res.data }
        this.dataList = this.flightsData.flights.slice(0, 5)
        // 初始化分页数据
        this.total = this.flightsData.total
        this.currentPage = 1
      })
    }
  }
}
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}
.aside {
  width: 240px;
}
.statement {
  border: 1px #ddd solid;

  .statement-list {
    padding: 10px 0;
    > div {
      text-align: center;
      i {
        display: block;
        font-size: 40px;
      }
      span {
        font-size: 12px;
      }
    }
  }
  .service-tel {
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    background: #f6f6f6;
    font-size: 14px;
  }
}
.flights-empty {
  font-size: 16px;
  color: #999;
  line-height: 2;
}
.history {
  border: 1px #ddd solid;
  padding: 10px;
  margin-top: 10px;

  h5 {
    font-size: 16px;
    font-weight: normal;
    padding-bottom: 10px;
    border-bottom: 1px #eee solid;
  }

  .history-item {
    padding: 10px 0;
    font-size: 14px;
    border-bottom: 1px #eee solid;

    &:last-child {
      border: none;
    }

    .to-from {
      margin-bottom: 5px;
    }

    p {
      font-size: 12px;
      color: #666;
    }

    span {
      color: #fff;
      display: block;
      padding: 2px 10px;
      background: orange;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
    }
  }
}
</style>
