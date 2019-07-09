<template>
  <div class="filters">
    <!-- 筛选 -->
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <!-- 单程 -->
      <el-col :span="8">
        单程：
        {{ data.info.departCity }} - {{ data.info.destCity }}
        /
        {{ data.info.departDate }}
      </el-col>
      <!-- 起飞机场 -->
      <el-col :span="4">
        <el-select v-model="airport" size="mini" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <!-- 起飞时间 -->
      <el-col :span="4">
        <el-select v-model="flightTimes" size="mini" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="item"
          />
        </el-select>
      </el-col>
      <!-- 航空公司 -->
      <el-col :span="4">
        <el-select v-model="company" size="mini" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item , index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <!-- 机型 -->
      <el-col :span="4">
        <el-select v-model="airSize" size="mini" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item , index ) in ariSizeList"
            :key="index"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-col>
    </el-row>
    <!-- 撤销 -->
    <div class="filter-cancel">
      筛选：
      <el-button
        type="primary"
        round
        plain
        size="mini"
        @click="handleFiltersCancel"
      >
        撤销
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
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
      // 机型大小
      ariSizeList: [
        { name: '大', type: 'L' },
        { name: '中', type: 'M' },
        { name: '小', type: 'S' }
      ],
      // ariSizeList: {
      //   L: { name: '大', type: 'L' },
      //   M: { name: '中', type: 'M' },
      //   S: { name: '小', type: 'S' }
      // },
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      airSize: '' // 机型大小
    }
  },
  mounted() {
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      const arr = this.data.flights.filter((v) => {
        return v.org_airport_name === value
      })
      // 触发修改机票列表的方法 setDataList
      this.$emit('setDataList', arr)
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      const arr = this.data.flights.filter((v) => {
        const start = +v.dep_time.split(':')[0]
        return value.from <= start && value.to > start
      })
      this.$emit('setDataList', arr)
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      const arr = this.data.flights.filter((v) => {
        return v.airline_name === value
      })
      this.$emit('setDataList', arr)
    },

    // 选择机型时候触发
    handleAirSize(value, index) {
      const arr = this.data.flights.filter((v, i) => {
        return v.plane_size === value
      })
      this.$emit('setDataList', arr)
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = ''
      this.flightTimes = ''
      this.company = ''
      this.airSize = ''
      this.$emit('setDataList', this.data.flights)
    }
  }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>
