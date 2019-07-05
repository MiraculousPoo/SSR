<template>
  <el-rate
    :value="value"
    disabled
    show-text
    show-score
    text-color="#ff9900"
    score-template="{value}分"
  />
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['stars'],
  data() {
    return {
      value: 0
    }
  },
  mounted() {
    this.value = this.stars
  }
}
</script>
