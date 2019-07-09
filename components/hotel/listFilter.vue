<template>
  <div class="list-filter">
    <el-row type="flex">
      <el-col class="filter-col" :span="8">
        <el-row type="flex" class="filter-title">
          <el-col>
            价格
          </el-col>
          <el-col class="ta-r">
            0-100
          </el-col>
        </el-row>
        <!-- 价格范围选择 -->
        <el-row>
          <el-slider
            v-model="value"
            range
            :max="200"
            show-stops
          />
        </el-row>
      </el-col>
      <el-col v-for="(item,index) in optionslist" :key="index" class="filter-col" :span="6">
        <el-row class="filter-title">
          <el-col>{{ item.type }}</el-col>
        </el-row>
        <el-row class="filter-wrapper">
          <dropdownOption :dropdowndata="hotelOptions[item.valueKey]" />
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dropdownOption from './module/dropdownOption'
export default {
  components: {
    dropdownOption
  },
  props: {
    // eslint-disable-next-line vue/require-valid-default-prop
    hotelOptions: { type: Object, default: [] }
  },
  data() {
    return {
      // 范围选择
      value: [10, 50],
      // marks: {
      //   0: 0,
      //   800: 800
      //   // 50: {
      //   //   style: {
      //   //     color: '#1989FA'
      //   //   },
      //   //   label: this.$createElement('strong', '50%')
      //   // }
      // },
      optionslist: [
        { type: '住宿等级', value: 'hotellevel', valueKey: 'levels' },
        { type: '住宿类型', value: 'hoteltype', valueKey: 'types' },
        { type: '酒店设施', value: 'hotelasset', valueKey: 'assets' },
        { type: '酒店品牌', value: 'hotelbrand', valueKey: 'brands' }
      ]
    }
  },
  mounted() {
    // this.setOptionNav()
  },
  methods: {
    // 设置选择菜单
    setOptionNav() {
      console.log(this.hotelOptions, '设置选择菜')
    }
  }
}
</script>
<style lang="less" scoped>
.list-filter {
    border: 1px solid #ddd;
    padding: 5px 20px;
    color: #666;
  }

  .ta-r {
    text-align: right;
  }

  .filter-col {
    border-right: 1px solid #ddd;
    padding: 5px 20px;
  }

  .filter-title {
    font-size: 14px;
  }

  &:last-child {
    border: none;
  }

  .filter-wrapper {
    height: 38px;
    display: flex;
    align-items: center;
  }
</style>
