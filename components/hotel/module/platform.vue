<template>
  <el-table
    :data="platform"
    style="width: 100%"
    class="price-table"
    :show-header="false"
  >
    <el-table-column prop="name" />
    <el-table-column>
      <template slot-scope="scope">
        <span class="height-light larger">￥{{ scope.row.price }}</span>起
        <i class="el-icon-arrow-right" />
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: ['platform']
}
</script>
<style lang="less" scoped>

  .larger {
    font-size: larger;
  }

  .x-large {
    font-size: x-large;
  }
  .height-light {
    color: #f90;
  }

</style>
