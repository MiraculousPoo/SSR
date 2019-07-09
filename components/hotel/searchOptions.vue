<template>
  <el-row class="search-options">
    <el-row type="flex" class="option-row">
      <el-col :span="3">
        区域：
      </el-col>
      <el-col :class="{'hidden-all': !show}">
        <div class="scenics-box">
          <a href="#" class="location-budget active" @click="allShow">全部</a>
          <a
            v-for="(item,index) in searchoptions.scenics "
            :key="index"
            class="location-budget"
          >{{ item.name }}</a>
        </div>
        <a href="#" @click="showHide">
          <i v-if="!show" class="el-icon-arrow-down" />
          <i v-else class="el-icon-arrow-up" />
          等{{ searchoptions.scenics.length }}个区域
        </a>
      </el-col>
    </el-row>

    <el-row type="flex" class="option-row">
      <el-col :span="3">
        攻略:
      </el-col>
      <el-col v-if="searchoptions.posts.length===0" :span="3" class="rategy">
        暂无攻略
      </el-col>
      <el-col :span="3" class="rategy">
        <!-- {{ searchoptions.posts.length === 0 }} -->
        <!-- {{ searchoptions.posts }} -->
      </el-col>
    </el-row>
    <el-row type="flex" class="option-row price-row">
      <el-col :span="3">
        均价
        <el-tooltip content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top-start">
          <sup class="question-mark">?</sup>
        </el-tooltip>:
      </el-col>
      <el-col>
        <el-row type="flex" justify="start">
          <el-tooltip
            v-for="(item,index) in 3"
            :key="index"
            content="等级评定是针对房价，设施和服务等各方面水平的综合评估"
            placement="top-start"
          >
            <el-col :span="6">
              <i class="el-icon-medal" />
              不想弄
            </el-col>
          </el-tooltip>
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
      // 显示
      show: false,
      condition: {}
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this.searchoptions)
    }, 1000)
  },
  methods: {
    showHide() {
      this.show = !this.show
    },
    allShow() {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.option-row {
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
  i {
    color: #f90;
    font-weight: 900;
    font-size: 16px;
  }
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
