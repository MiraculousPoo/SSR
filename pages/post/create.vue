<template>
  <div class="create">
    <el-row type="flex" justify="space-between">
      <div class="main">
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦！</p>
        <el-form>
          <el-form-item>
            <el-input v-model="postForm.title" placeholder="请输入标题" clearable />
          </el-form-item>
          <!-- 富文本编辑器 -->
          <el-form-item>
            <VueEditor ref="vueEditor" :config="config" />
          </el-form-item>
          <!-- 选择城市 -->
          <el-form-item>
            <el-form-item label="选择城市">
              <el-autocomplete
                v-model="cityName"
                placeholder="请搜索游玩城市"
                :fetch-suggestions="querySearchAsync"
                class="el-autocomplete"
                @select="handleSelect"
              />
            </el-form-item>
          </el-form-item>
        </el-form>
        <!-- 发布/保存到草稿 -->
        <div class="create-button">
          <el-button type="primary" size="small" @click="addPost">
            发布
          </el-button>
          <span class="submit-side">
            或者
            <a href="javascript:;" @click="addDraft">保存到草稿</a>
          </span>
        </div>
      </div>
      <div class="aside">
        <el-button
          type="danger"
          class="draft-title"
          @click="delDraft()"
        >
          清空草稿箱{{ draftForm.length || 0 }}
        </el-button>
        <div class="draft-list">
          <div v-if="draftForm.length===0" class="draft-item-top">
            草稿箱为空
          </div>
          <div v-for="(item, index) in draftForm" v-else :key="index" class="draft-item">
            <el-row type="flex" justify="space-between">
              <span>{{ item.title }}</span>
              <div>
                <el-button icon="el-icon-edit" circle size="mini" @click="editDraft(item)" />
                <!-- <el-button icon="el-icon-delete" circle size="mini" /> -->
              </div>
            </el-row>
            <p class="draft-item-p" v-html="item.content" />
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
// import VueEditor from 'vue-word-editor'
// 需要单独引入样式
import 'quill/dist/quill.snow.css'
let VueEditor
if (process.browser) {
  // 只在浏览器端才渲染就不会报错了
  VueEditor = require('vue-word-editor').default
}
export default {
  name: 'VueEditorWrapper',
  components: {
    VueEditor
  },
  data() {
    return {
      // 新增文章参数
      postForm: {
        title: '', // 新增文章标题
        content: '', // 新增文章内容
        city: '' // 新增文章id  用于保存选中时的city
      },
      // 选择城市
      cityName: '',
      // 草稿内容
      draftForm: [],
      newDraftForm: [],
      // 富文本编辑器
      config: {
        modules: {
          // 工具栏
          toolbar: [
            // bold 黑体   italic斜体 underline下划线  strike删去
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            // blockquote 引用  code-block 代码块
            ['blockquote', 'code-block'],
            // image图片 video视频
            ['image', 'video'],
            // custom button values自定义按钮的值
            [{ header: 1 }, { header: 2 }],
            // 有序列表；排序列表
            [{ list: 'ordered' }, { list: 'bullet' }],
            // superscript/subscript 上标下标
            [{ script: 'sub' }, { script: 'super' }],
            // outdent/indent  减少缩进
            [{ indent: '-1' }, { indent: '+1' }],
            // text direction文本方向
            [{ direction: 'rtl' }]
          ]
        },
        // 主题
        theme: 'snow',
        // 上传图片
        uploadImage: {
          url: `${this.$axios.defaults.baseURL}/upload`,
          // url: `/upload`,
          name: 'files',
          // 上传之前
          uploadBefore(file) {
            return true
          },
          // 传进度
          uploadProgress(res) {},
          // 上传成功
          uploadSuccess(res, insert) {
            // 插入
            insert(`http://157.122.54.189:9095` + res.data[0].url)
          },
          // 上传错误
          uploadError() {
            this.$message.error('上传图片错误')
          },
          // 显示进度
          showProgress: false
        },
        // 上传视频
        uploadVideo: {
          url: `${this.$axios.defaults.baseURL}/upload`,
          name: 'files',
          uploadBefore(file) {
            return true
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert(`http://157.122.54.189:9095` + res.data[0].url)
          },
          uploadError() {}
        }
      }
    }
  },
  mounted() {
    this.$store.replaceState({
      ...this.$store.state,
      post: { posts: JSON.parse(localStorage.getItem('posts') || `[]`) }
    })
    const { post } = this.$store.state
    this.draftForm = post.posts
  },
  methods: {
    // 点击添加到草稿
    addDraft() {
      const { commit } = this.$store
      commit('post/addPost', {
        title: this.postForm.title,
        content: this.$refs.vueEditor.editor.root.innerHTML,
        cityName: this.cityName
      })
      this.draftForm.unshift({
        title: this.postForm.title,
        content: this.$refs.vueEditor.editor.root.innerHTML,
        cityName: this.cityName
      })
      // 初始化表单
      this.postForm = {
        title: '',
        content: '',
        city: ''
      }
      this.$refs.vueEditor.editor.root.innerHTML = ''
      this.cityName = ''
    },
    // 删除草稿
    delDraft() {
      this.draftForm = []
      const { commit } = this.$store
      commit('post/delPost')
    },
    // 编辑草稿
    editDraft(item) {
      this.postForm.title = item.title
      this.$refs.vueEditor.editor.root.innerHTML = item.content
      this.cityName = item.cityName
    },
    // 点击发布添加文章
    addPost() {
      // this.$refs.vueEditor.editor.root.innerHTML
      this.postForm.content = this.$refs.vueEditor.editor.root.innerHTML
      this.postForm.city = this.postForm.city || this.cityName
      const rules = {
        title: {
          require: true,
          defaults: this.postForm.title,
          message: '请填写标题'
        },
        content: {
          require: true,
          defaults: this.postForm.content,
          message: '请填写内容'
        },
        city: {
          require: true,
          defaults: this.postForm.city,
          message: '请选择城市'
        }
      }
      let valid = true
      const {
        user: { userInfo }
      } = this.$store.state
      Object.keys(rules).forEach((v) => {
        if (!valid) return
        if (rules[v].require && !rules[v].defaults) {
          this.$message.warning(rules[v].message)
          valid = false
        }
      })
      // 验证不通过，直接返回
      if (!valid) return
      this.$axios({
        url: '/posts',
        method: 'POST',
        data: this.postForm,
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }).then((res) => {
        const { data } = res
        if (!data.status) {
          this.$message.success(data.message)
        }
        // 初始化表单
        this.postForm = {
          title: '',
          content: '',
          city: ''
        }
        this.$refs.vueEditor.editor.root.innerHTML = ''
        this.cityName = ''
      })
    },
    // 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它
    querySearchAsync(queryString, callback) {
      if (!queryString) {
        // eslint-disable-next-line standard/no-callback-literal
        return callback([])
      }

      this.$axios({
        url: '/airs/city',
        params: {
          name: queryString
        }
      }).then((res) => {
        const { data } = res.data
        const arr = data.map((v) => {
          return {
            ...v,
            value: v.name
          }
        })
        callback(arr)
      })
    },
    // 选择城市点击选中建议项时触发
    handleSelect(item) {
      // 城市id
      this.postForm.city = item.id
      // 城市名称
      this.cityName = item.name
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
}
.create {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  .main {
    width: 750px;
    h2 {
      font-weight: 400;
      font-size: 22px;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
    }
    .create-desc {
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
    }

    .submit-side {
      margin-left: 10px;
      font-size: 14px;
      a {
        color: orange;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    /deep/ #editor {
      height: 400px;
    }
  }
  .aside {
    width: 200px;
    .draft-title {
      width: 100%;
      height: 50px;
      margin-bottom: 5px;
    }
    .draft-box {
      border: 1px #ddd solid;
      padding: 10px;
    }
    .draft-list {
      width: 190px;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #dcdfe6;
      .draft-item-top {
        height: 40px;
        padding: 5px;
         line-height: 40px;
        text-align: center;
        color: #999;
      }
      .draft-item {
        margin-bottom: 4px;
        border-bottom: 1px solid rgb(231, 233, 236);
        .draft-post-title {
          cursor: pointer;
          &:hover {
            color: orange;
            text-decoration: underline;
          }
        }

        p {
          color: #999;

        }
      }
    }
  }
}
</style>
