<template>
  <el-row class="detail" type="flex" justify="space-between">
    <div class="main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/post">
          旅游攻略
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">攻略详情</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 标题 -->
      <h1>{{ related.title }}</h1>
      <div class="post-info">
        <span>攻略：{{ timestamp(related.created_at) }}</span>
        <span>阅读：{{ related.watch }}</span>
      </div>
      <!-- 文章 -->
      <div class="post-content" v-html="related.content" />
      <!-- 文章功能 -->
      <div class="post-ctrl">
        <el-row type="flex" justify="center">
          <div class="ctrl-item">
            <i class="iconfont iconpinglun" />
            <p>评论{{ totalComments }}</p>
          </div>
          <div class="ctrl-item">
            <i class="iconfont iconstar1" />
            <p>收藏</p>
          </div>
          <div class="ctrl-item">
            <i class="iconfont iconfenxiang" />
            <p>分享</p>
          </div>
          <div class="ctrl-item">
            <i class="iconfont iconding" />
            <p>点赞{{ related.like||0 }}</p>
          </div>
        </el-row>
      </div>
      <!-- 文章评论 -->
      <div class="cmt-wrapper">
        <h4 class="cmt-title">
          评论
        </h4>
        <!-- 评论输入框 -->
        <div class="cmt-input">
          <div class="el-textarea">
            <el-input
              type="textarea"
              resize="none"
              placeholder="说点什么吧..."
            />
          </div>
        </div>
        <!-- 照片墙 -->
        <el-row class="cmt-input-ctrls" justify="space-between" type="flex">
          <div class="cmt-pics">
            <!-- action上传的地址
            list-type文件列表的类型
            on-preview点击文件列表中已上传的文件时的钩子
            on-remove文件列表移除文件时的钩子 -->
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <div>
            <button class="el-button cmt-submit el-button--primary el-button--mini">
              提交
            </button>
          </div>
        </el-row>
        <!-- 无评论时 -->
        <div v-if="!totalComments" class="cmt-empty">
          暂无评论，赶紧抢占沙发！
        </div>
        <!-- 评论 -->
        <div v-if="totalComments" class="cmt-list">
          <div
            v-for="(item,index) in comments"
            :key="index"
            class="cmt-item"
          >
            <div class="cmt-info">
              <img :src="$axios.defaults.baseURL + item.account.defaultAvatar">
              {{ item.account.nickname }}
              <i>{{ item.created_at | timestamp }}</i>
              <span>{{ item.level }}</span>
            </div>
            <div class="cmt-content">
              <!-- 用户 -->
              <CommentFloor
                v-if="item.parent"
                :comments="item.parent"
              />
              <div class="cmt-new">
                <p class="cmt-message">
                  {{ item.content }}
                </p>
                <el-row type="flex">
                  <div v-for="(pic, picIndex) in item.pics" :key="picIndex" class="cmt-pic">
                    <img :src="$axios.defaults.baseURL + pic.url" @click="handlePictureCardPreview(pic)">
                  </div>
                </el-row>
                <div class="cmt-ctrl">
                  <a href="javascript:;">回复</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
    </div>
    <div class="aside">
      <!-- 标题 -->
      <h4 class="aside-title">
        相关攻略
      </h4>
      <div class="recommend-list">
        <nuxt-link v-for="(item,index) in recommends" :key="index" to class="recommend-item">
          <el-row type="flex" class="post-imgText">
            <div class="post-img">
              <img :src="item.images[0]" alt>
            </div>
            <div class="post-text">
              <h5>{{ item.title }}</h5>
              <p>{{ timestamp(item.created_at) }} 阅读{{ item.watch }}</p>
            </div>
          </el-row>
        </nuxt-link>
      </div>
    </div>
  </el-row>
</template>
<script>
import moment from 'moment'
import CommentFloor from '@/components/post/commentFloor'

export default {
  components: {
    CommentFloor
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // 评论长度
      totalComments: 0,
      // 评论
      comments: [],
      related: {},
      // 推荐文章
      recommends: {}
    }
  },
  mounted() {
    const { id } = this.$route.query
    this.$axios({
      url: `/posts/${id}`
    }).then((res) => {
      const { data } = res
      this.related = data
    })
    // 推荐文章
    this.getPostRecmmend()
    // 获取点赞
    this.getPostLike()
    // 获取文章评论
    this.gatComments()
  },
  methods: {
    // on-remove文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // on-preview点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 时间YYYY-MM-DD h:mm
    timestamp(value) {
      return moment(value).format('YYYY-MM-DD h:mm')
    },
    // 获取点赞
    getPostLike() {
      const { id } = this.recommends
      const { user: { userInfo } } = this.$store.state
      this.$axios({
        url: '/posts/like',
        data: id,
        headers: { Authorization: `Bearer ${userInfo.token}` }
      }).then((res) => {
        console.log(res)
      })
    },
    // 获取推荐文章
    getPostRecmmend() {
      this.$axios({
        url: '/posts'
      }).then((res) => {
        const { data } = res.data
        this.recommends = data
      })
    },
    // 获取文章评论
    gatComments() {
      const { id } = this.$route.query
      this.$axios({
        url: 'http://157.122.54.189:9095/posts/comments',
        data: {
          post: id
        }
      }).then((res) => {
        const { data, total } = res.data
        this.comments = data
        this.totalComments = total
        console.log(this.comments)
      })
    }

  }
}
</script>

<style lang="less" scoped>
.detail {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
}
.main {
  width: 700px;

  h1 {
    padding: 20px 0;
    border-bottom: 1px #ddd solid;
  }

  .post-content {
    line-height: 1.5;

    /deep/ * {
      max-width: 700px !important;
    }

    /deep/ img {
      margin: 10px 0;
    }
  }

  .post-info {
    color: #999;
    padding: 20px;
    text-align: right;

    span {
      margin-left: 20px;
    }
  }

  .post-ctrl {
    padding: 50px 0 30px;
    .ctrl-item {
      margin: 0 20px;
      font-size: 20px;
      text-align: center;
      cursor: pointer;

      i {
        display: block;
        font-size: 28px;
        color: orange;
      }

      &:nth-child(2) {
        i {
          transform: scale(1.4);
        }
      }
      p {
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
    }
  }

  /* 评论 */
  .cmt-wrapper {
    margin-bottom: 20px;
  }

  .replyTag {
    margin-bottom: 10px;
  }

  .cmt-title {
    font-weight: normal;
    font-size: 18px;
    margin-bottom: 20px;
  }

  .cmt-input {
    margin-bottom: 10px;
  }

  .cmt-input-ctrls {
    margin-bottom: 30px;
    /deep/ .el-upload--picture-card {
      width: 100px;
      height: 100px;
      line-height: 100px;
    }

    /deep/ .el-upload-list {
      li {
        width: 100px;
        height: 100px;
      }

      img {
        object-fit: cover;
      }
    }
  }

  .cmt-empty {
    color: #999;
    font-size: 14px;
    text-align: center;
    padding: 30px 0;
    border: 1px #ddd dashed;
  }

  .cmt-list {
    border: 1px #ddd solid;
  }

  .cmt-item {
    border-bottom: 1px #ddd dashed;
    padding: 20px 20px 5px;

    &:last-child {
      border-bottom: none;
    }

    .cmt-content {
      padding: 0 0 0 30px;
    }

    .cmt-info {
      margin-bottom: 10px;
      font-size: 12px;
      color: #666;

      * {
        vertical-align: top;
      }

      img {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }

      i {
        color: #999;
      }
      span {
        float: right;
      }
    }
    .cmt-message {
      margin-top: 10px;
    }

    .cmt-pic {
      width: 80px;
      height: 80px;
      border-radius: 6px;
      overflow: hidden;
      margin-right: 5px;
      margin-top: 10px;
      padding: 5px;
      border: 1px #ddd dashed;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
      }
    }

    /*  这里和comment floor不一样，鼠标在最新内容上才hover */
    .cmt-new:hover {
      .cmt-ctrl {
        * {
          display: inline;
        }
      }
    }

    .cmt-ctrl {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #1e50a2;
      text-align: right;

      * {
        display: none;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
}
.aside {
  width: 280px;

  .aside-title {
    font-weight: normal;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px #ddd solid;
  }

  .recommend-item {
    display: block;
    padding: 20px 0;
    border-bottom: 1px #ddd solid;

    .post-imgText {
      .post-img {
        width: 100px;
        height: 80px;
        flex-shrink: 0;
        background: #ddd;
        overflow: hidden;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .post-text {
        flex: 1;
        position: relative;
        h5 {
          position: relative;
          line-height: 1.4em;
          /*设置容器高度为3倍行高就是显示3行*/
          height: 2.8em;
          overflow: hidden;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          font-weight: normal;
          font-size: 16px;
        }

        p {
          position: absolute;
          bottom: 0;
          left: 0;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
