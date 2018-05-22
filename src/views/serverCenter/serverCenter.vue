<template>
  <div>
    <div class="tasklist_title">
    <div class="title">
      <div class="title_content">
          <div class="remind">
            <h3 class="subTitleColor">
                <span class="iconfont icon-tasks"></span>
                <span>
                  {{vm.taskName}}
                </span>
            </h3>
          </div>
      </div>
    </div>
    <homepage></homepage>
  </div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import homepage from './scHomepage'
export default {
  data() {
    return {
      vm: {
        taskName: '客服中心'
      }
    }
  },
  components: {
    homepage
  }
}
</script>
<style lang="scss">

</style>
