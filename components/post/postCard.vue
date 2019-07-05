<template>
  <div class="postcard">
    <!-- 左右 -->
    <el-row
      v-if="arrange==='lr'"
      type="flex"
      justify="space-between"
      align="middle"
      class="post-item image-text"
    >
      <!-- 图片 -->
      <el-row align="middle" class="post-cover">
        <nuxt-link :to="`/post/detail?id=${data.id}`">
          <img :src="data.images[0]" alt>
        </nuxt-link>
      </el-row>
      <!-- 右 -->
      <div class="post-content">
        <!-- 标题 -->
        <h4 class="post-title">
          <nuxt-link :to="`/post/detail?id=${data.id}`">
            {{ data.title }}
          </nuxt-link>
        </h4>
        <!-- 文本 -->
        <p class="post-desc">
          <nuxt-link :to="`/post/detail?id=${data.id}`" v-html="data.content" />
        </p>
        <!-- 地点作者人数 -->
        <el-row type="flex" justify="space-between" class="post-inf">
          <el-row type="flex" align="middle" class="post-info-left">
            <!-- 地点 -->
            <span>
              <i class="el-icon-location-outline" />
              {{ data.cityName }}
            </span>
            <!-- 作者 -->
            <el-row type="flex" align="middle" class="post-user">
              by
              <nuxt-link to>
                <img :src="$axios.defaults.baseURL + data.account.defaultAvatar">
              </nuxt-link>

              <nuxt-link to>
                {{ data.account.nickname }}
              </nuxt-link>
            </el-row>
            <!-- 人数 -->
            <span>
              <i class="el-icon-view" />
              {{ data.watch||0 }}
            </span>
          </el-row>
          <!-- 赞 -->
          <span class="post-info-right">{{ data.like||0 }}赞</span>
        </el-row>
      </div>
    </el-row>
    <!-- 上下 -->
    <div v-if="arrange==='tb'" class="post-item card">
      <!-- 标题 -->
      <h4 class="post-title">
        <nuxt-link :to="`/post/detail?id=${data.id}`">
          {{ data.title }}
        </nuxt-link>
      </h4>
      <!-- 文本 -->
      <p class="post-desc">
        <nuxt-link :to="`/post/detail?id=${data.id}`" v-html="data.content" />
      </p>
      <!-- 图片 -->
      <el-row type="flex" justify="space-between" align="middle" class="card-images">
        <nuxt-link
          v-for="(item, index) in data.images"
          v-show="index < 3"
          :key="index"
          :to="`/post/detail?id=${data.id}`"
        >
          <img :src="item">
        </nuxt-link>
      </el-row>
      <!-- 地点作者人数 -->
      <el-row type="flex" justify="space-between" class="post-inf">
        <el-row type="flex" align="middle" class="post-info-left">
          <!-- 地点 -->
          <span>
            <i class="el-icon-location-outline" />
            {{ data.cityName }}
          </span>
          <!-- 作者 -->
          <el-row type="flex" align="middle" class="post-user">
            by
            <nuxt-link to>
              <img :src="$axios.defaults.baseURL + data.account.defaultAvatar">
            </nuxt-link>

            <nuxt-link to>
              {{ data.account.nickname }}
            </nuxt-link>
          </el-row>
          <!-- 人数 -->
          <span>
            <i class="el-icon-view" />
            {{ data.watch||0 }}
          </span>
        </el-row>
        <!-- 赞 -->
        <span class="post-info-right">{{ data.like||0 }}赞</span>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        images: []
      }
    }
  },
  data() {
    return {
      arrange: 'lr',
      postdata: []
    }
  },
  updated() {
    if (this.data.images && this.data.images.length >= 3) {
      this.arrange = 'tb'
    } else {
      this.arrange = 'lr'
    }
  },
  mounted() {
    if (this.data.images && this.data.images.length >= 3) {
      this.arrange = 'tb'
    } else {
      this.arrange = 'lr'
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.post-item {
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px #eee solid;
}

.image-text {
  .post-content {
    width: 470px;
  }
  .post-desc {
  }
}

.post-cover {
  width: 220px;
  height: 150px;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 10px;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.post-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 15px;
  font-weight: normal;
  font-size: 18px;

  a:hover {
    color: orange;
  }
}

.post-desc {
  margin-bottom: 15px;
  line-height: 1.5;
  font-size: 14px;
  height: 1.5 * 14px * 3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  a {
    color: #666;
  }
}

.post-user {
  img {
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 100px;
    margin: 5px;
  }

  a {
    color: orange;
  }
}

.post-info-left {
  font-size: 12px;
  color: #999;

  > * {
    margin-right: 10px;
  }
}

.post-info-right {
  color: orange;
}

.card-images {
  margin: 15px 0;
  a{
    width: 220px;
    height: 150px;
  }
  img {
    flex: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
