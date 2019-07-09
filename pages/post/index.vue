<template>
  <div class="post-index">
    <el-row type="flex" justify="space-between">
      <!-- 左 -->
      <!-- 城市 -->
      <div class="menus-wrapper">
        <div class="menus-body" @mouseleave="leaveHiddenList()">
          <div class="menus">
            <div
              v-for="(item,index) in citysList"
              :key="index"
              :class="{active: currentSelection === index}"
              class="menu-item"
              @mouseover="outHiddenList(index)"
            >
              <span>{{ item.type }}</span>
            </div>
          </div>
          <!-- 隐藏列表 -->
          <div v-if="hiddenList" class="sub-menus">
            <ul>
              <li v-for="(item,index) in citysContent" :key="index" @click="recommendCity(item.city)">
                <nuxt-link :to="`/post?city=${item.city}`">
                  <em>{{ index+1 }}</em>
                  <span>{{ item.city }}</span>
                  <p>{{ item.desc }}</p>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- 推荐城市 -->
        <div class="aside-recommend">
          <h4 class="aside-title">
            推荐城市
          </h4>
          <nuxt-link to="#" class="aside-recommend-item">
            <img src="http://157.122.54.189:9093/images/pic_sea.jpeg">
          </nuxt-link>
        </div>
      </div>
      <!-- 右 -->
      <div class="post-wrapper">
        <div class="search-wrapper">
          <!-- 搜索 -->
          <el-row type="flex" align="middle" class="search-bar">
            <input v-model="city" type="text" :placeholder="searchP" @keyup.enter="recommendCity(city)">
            <i class="el-icon-search" @click="recommendCity(city)" />
          </el-row>
          <div class="search-recommend">
            推荐：
            <span
              v-for="(item,index) in ['广州','上海','北京']"
              :key="index"
              @click="recommendCity(item)"
            >{{ item }}</span>
          </div>
        </div>
        <el-row type="flex" align="middle" justify="space-between" class="post-title">
          <h4>推荐攻略</h4>
          <nuxt-link to="/post/create">
            <el-button type="primary">
              <i class="el-icon-edit" />
              写游记
            </el-button>
          </nuxt-link>
        </el-row>
        <!-- 推荐攻略 -->

        <!-- 文章 -->
        <div class="post-list">
          <postCard v-for="(item, index) in newPosts" :key="index" :data="item" />
          <div v-if="newPosts.length === 0 " class="no-post">
            <p>
              无相关攻略
            </p>
          </div>
        </div>

        <!-- 分页 -->
        <el-row type="flex" justify="center" align="middle">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[1,2,3,4, 5, 10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script>
import postCard from '@/components/post/postCard'
export default {
  components: {
    postCard
  },
  data() {
    return {
      city: this.$route.query.city || '',
      searchP: "请输入想去的地方，比如：'广州'",
      // 当前页
      currentPage: 1,
      // 每页显示的记录数量
      pageSize: 5,
      // 总记录数量
      total: 0,
      // new文章
      newPosts: [],
      // 文章
      posts: [],
      // 当前列表选择
      currentSelection: 999,
      // 隐藏列表内容
      citysContent: [],
      // 城市菜单
      citysList: [],
      // 隐藏列表
      hiddenList: false
    }
  },
  mounted() {
    // 获取文章
    this.getPost()
    // 获取城市
    this.getCities()
  },
  methods: {
    // 搜索
    recommendCity(value) {
      this.city = value
      this.getPost()
    },
    // 分页
    handleSizeChange(val) {
      // 每页显示的记录数量
      this.pageSize = val
      this.currentPage = 1
      this.setNewPosts()
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val
      this.setNewPosts()
    },
    // 显示隐藏列表
    outHiddenList(index) {
      this.currentSelection = index
      this.hiddenList = true
      this.citysContent = this.cities[index].children
    },
    // 隐藏显示列表
    leaveHiddenList() {
      this.hiddenList = false
      this.currentSelection = 999
    },
    setNewPosts() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      this.newPosts = this.posts.slice(start, end)
    },
    // 获取城市
    getCities() {
      this.$axios({
        url: '/posts/cities'
      }).then((res) => {
        const { data } = res.data
        this.cities = data
        this.citysList = this.cities
      })
    },
    // 获取文章
    getPost() {
      const params = { city: this.city }
      if (!this.city) {
        params.city = []
      }
      this.$axios({
        url: `/posts`,
        params
      }).then((res) => {
        const { data, total } = res.data
        this.posts = data
        this.total = total
        this.setNewPosts()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.post-index {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}

/* 菜单栏 */
.menus-wrapper {
  position: relative;
  width: 260px;
  z-index: 2;

  .menus {
    width: 260px;
    border: 1px #ddd solid;
    border-right: none;
    border-bottom: none;
    box-shadow: 0 0 1px #f5f5f5;
    z-index: 2;
  }

  .menu-item {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px #ddd solid;
    border-right: 1px #ddd solid;
    padding: 0 20px;
    font-size: 14px;
    position: relative;
    z-index: 2;

    &:after {
      display: block;
      content: "";
      width: 10px;
      height: 10px;
      border-right: 1px #999 solid;
      border-top: 1px #999 solid;
      transform: rotate(45deg);
      position: absolute;
      right: 20px;
      top: 15px;
    }

    &.active {
      border-right-color: #fff;
      color: orange;

      &:after {
        border-right-color: orange;
        border-top-color: orange;
      }
    }
  }

  .sub-menus {
    position: absolute;
    left: 260px;
    top: 0;
    width: 350px;
    padding: 10px 20px;
    box-sizing: border-box;
    background: #fff;
    border: 1px #ddd solid;

    ul li {
      font-size: 14px;
      line-height: 1.5;

      * {
        vertical-align: middle;
      }

      em {
        color: orange;
        font-size: 24px;
        font-style: italic;
      }

      span {
        margin: 0 10px;
        color: orange;
        font-weight: normal;
        &:hover {
          text-decoration: underline;
        }
      }

      p {
        display: inline-block;
        color: #999;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

/* 侧边栏推荐 */
.aside-recommend {
  margin-top: 20px;

  .aside-title {
    font-weight: normal;
    padding-bottom: 10px;
    border-bottom: 1px #ddd solid;
    margin-bottom: 10px;
  }

  .aside-recommend-item {
    img {
      width: 100%;
      display: block;
    }
  }
}

/*内容*/
.post-wrapper {
  width: 700px;
}

/*搜索栏*/
.search-wrapper {
  .search-bar {
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    border: 3px orange solid;

    input {
      flex: 1;
      padding: 0 20px;
      line-height: 40px;
      outline: none;
      border: none;
      background: none;
    }

    i {
      font-size: 24px;
      color: orange;
      font-weight: bold;
      margin-right: 10px;
    }
  }

  .search-recommend {
    padding: 10px 0;
    font-size: 12px;
    color: #666;

    span {
      margin-right: 5px;
      &:hover {
        color: orange;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}

/* 标题 */
.post-title {
  padding-bottom: 10px;
  border-bottom: 1px #eee solid;
  position: relative;

  h4 {
    font-weight: normal;
    font-size: 18px;
    color: orange;

    &:after {
      display: block;
      content: "";
      width: 72px;
      height: 2px;
      background: orange;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}

.no-post{
  height: 100px;
  margin: 10px 0px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #eee;
  p{
    font-size: 26px;
    color: #666;
  }
}
</style>
