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
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../misc/global.constant'
  import homepage from './homepage/homepage'
  export default {
    data() {
      return {
        vm: {
          taskName: '执行一览表'
        }
      }
    },
    computed: {
    },
    methods: {
      ...mapActions(['getActiveMenuCode', 'updateSiderbarActiveNode'])
    },
    mounted() {
        this.getActiveMenuCode(globalConstant.activeMenuCodes.tasklist)
        // 清空左侧菜单的选中
        this.updateSiderbarActiveNode({
            id: ''
          })
    },
    components: {
        homepage
    }
}
</script>
<style lang="scss">

</style>
