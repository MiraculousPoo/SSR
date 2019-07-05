<template>
  <el-row class="search-options">
    <el-row type="flex" class="option-row">
      <el-col :span="3">
        区域：
      </el-col>
      <el-col>
        <div class="scenics-box">
          <a href="#" class="location-budget active">全部</a>
          <a v-for="(item,index) in searchoptions.scenics " :key="index" class="location-budget">{{ item.name }}</a>
        </div>
        <a href="#">
          <i class="el-icon-d-arrow-right" />
          等n个区域
        </a>
      </el-col>
    </el-row>

    <el-row type="flex" class="option-row">
      <el-col :span="3">
        攻略:
      </el-col>
      <!-- <el-col v-if="searchoptions.posts.length===0">
        暂无攻略
      </el-col> -->
      <el-col>
        <!-- {{ searchoptions.posts.length === 0 }} -->
        <!-- {{ searchoptions.posts }} -->
      </el-col>
    </el-row>
    <el-row type="flex" class="option-row price-row">
      <el-col :span="3">
        均价
        <el-tooltip content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top-start">
          <sup class="question-mark">?</sup>
        </el-tooltip>
        :
      </el-col>
      <el-col>
        <el-row type="flex" justify="start">
          <el-col :span="6" />
          <el-col :span="6" />
          <el-col :span="6">
            <el-tooltip />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-valid-default-prop
    searchoptions: { type: Object, default: [] }
  },
  data() {
    return {
      condition: {}
    }
  },
  mounted() {

  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.option-row {
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;

    .location-budget {
      margin-right: 1em;
      padding: 0 2px;
      border-radius: 4px;
      display: inline-block;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        color: #09f;
      }
      &.active {
        background: #eee;
        cursor: auto;
        text-decoration: none;
        color: #999;
      }
    }

    &.price-row {
      .question-mark {
        background-color: #ccc;
        color: #fff;
        display: inline-block;
        width: 1.2em;
        height: 1.2em;
        text-align: center;
        border-radius: 100%;
      }
    }

    .el-icon-d-arrow-right {
      transform: rotate(270deg);
      color: #f90;
    }
    .hidden-all {
      .scenics-box {
        max-height: 3em;
        overflow: hidden;
      }
      .el-icon-d-arrow-right {
        transform: rotate(90deg);
      }
    }
  }
</style>
