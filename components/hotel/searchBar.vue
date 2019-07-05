<template>
  <el-form :inline="true">
    <el-form-item>
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
      />
    </el-form-item>

    <el-date-picker
      v-model="daterange"
      value-format="yyyy-MM-dd"
      type="daterange"
      range-separator="-"
      start-placeholder="入住日期"
      end-placeholder="离店日期"
    />

    <el-form-item>
      <el-input
        v-model="input1"
        placeholder="人数未定"
        suffix-icon="el-icon-user"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary">
        查看价格
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      daterange: '',
      state: '',
      input1: ''
    }
  },
  mounted() {

  },
  methods: {
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
