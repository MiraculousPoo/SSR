<template>
  <div class="cmt-floor">
    <CommentFloor v-if="comments.parent" :comments="comments.parent" />
    <div class="cmt-content">
      <div class="cmt-info">
        {{ comments.account.nickname }}
        <i> {{ comments.created_at | timestamp }} </i>
        <span>{{ comments.level }} </span>
      </div>
      <p class="cmt-message">
        {{ comments.content }}
      </p>
      <el-row type="flex">
        <div v-for="(picItem, picIndex) in comments.pics" :key="picIndex" class="cmt-pic">
          <img :src="$axios.defaults.baseURL +picItem.url">
        </div>
      </el-row>
      <div class="cmt-ctrl">
        <a href="javascript:;">回复</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommentFloor',
  props: {
    comments: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.comments, 12)
  }
}
</script>

<style lang="less" scoped>
.cmt-floor{
        background:#f9f9f9;
        border:1px #ddd solid;
        padding:2px;

        .cmt-content{
            padding:5px 10px 0;
            .cmt-info{
                font-size:12px;
                color:#666;
                i{
                    color:#999;
                }
                span{
                    float: right;
                }
            }
            .cmt-message{
                margin-top:10px;
            }

            .cmt-pic{
                width:80px;
                height:80px;
                border-radius: 6px;
                overflow: hidden;
                margin-right:5px;
                margin-top:10px;
                padding:5px;
                border:1px #ddd dashed;

                img{
                    display:block;
                    width:100%;
                    height:100%;
                    object-fit: cover;
                    cursor: pointer;
                }
            }

            &:hover{
               .cmt-ctrl{
                    * { display:inline };
                }
            }

            .cmt-ctrl{
                height:20px;
                line-height: 20px;
                font-size:12px;
                color:#1e50a2;
                text-align:right;

                *{
                    display:none;
                }

                a:hover{
                    text-decoration: underline;
                }
            }
        }
    }
</style>
