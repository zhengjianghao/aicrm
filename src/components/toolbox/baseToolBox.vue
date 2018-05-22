<template>
  <div class="user_toolbox">
    <!-- 基础搜索组件 -->
    <slot name="baseSearch" :doSearch="doSearch">
    </slot>
    <slot name="otherTools">
    </slot>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  export default {
    data() {
      return {
      }
    },
    methods: {
      // 触发父组件搜索事件
      doSearch(searchObj) {
        this.$emit('searchHook', searchObj)
      }
    }
}
</script>
<style lang="scss">
</style>
