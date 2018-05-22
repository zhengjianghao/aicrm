<template>
<div :style="{minHeight: processMinHeight}" v-loading="loading" :element-loading-text="processText ? processText : '数据较多,请耐心等待'">
  <template v-if="show">
    <slot></slot>
  </template>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  export default {
    data() {
      return {
        show: false,
        loading: true
      }
    },
    computed: {
      processMinHeight() {
        return this.minHeight ? this.minHeight : '300px'
      }
    },
    created () {
      var that = this
      window.setTimeout(() => {
        that.show = true
      }, that.time ? that.time : 10)
      window.setTimeout(() => {
        that.loading = false
      }, that.loadingTime ? that.loadingTime : 500)
    },
    props: [
      'time',
      'loadingTime',
      'processText',
      'minHeight'
    ]
}
</script>
<style lang="scss">

</style>
