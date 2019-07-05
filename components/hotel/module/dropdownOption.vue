<template>
  <el-dropdown placement="" class="filter-dropdown">
    <span class="el-dropdown-link">
      <span class="dropdown-link-text">不限</span>
      <i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <div class="filter-view-menu-box">
        <el-dropdown-item
          v-for="item in dropdowndata"
          :key="item.name"
        >
          <!-- <i class="iconfont iconright-1" /> -->
          <i class="iconfont iconcircle" />
          <span class="dropdown-menu-text">{{ item.name }}</span>
          <slot />
        </el-dropdown-item>
      </div>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    dropdowndata: {
      type: Array
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    a() {
      console.log(this.dropdowndata, 'sdf')
    }

  }
}
</script>
<style lang="less" scoped>
.filter-dropdown {
    position: relative;
    width: 100%;
  }
  .el-dropdown-link {
    display: flex;
    flex: 1;
    width: 100%;
    cursor: pointer;
  }
  .dropdown-link-text {
    flex: 1;
    font-size: 13px;
  }
  .el-icon--right {
    align-self: center;
  }
  .dropdown-menu-text {
    display: inline-block;
    min-width: 100px;
    margin-left: 10px;

  }
  .filter-view-menu-box {
    max-height: 230px;
    overflow: auto;
  }
</style>
