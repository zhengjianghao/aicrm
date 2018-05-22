<template>
<div>
    <content-header
      :name="vm.taskName"
    >
    </content-header>
    <data-chart-home
    :homeData='g_const.dataChart'
    :menuCodes='g_const.activeMenuCodes.dataChart'>
    </data-chart-home>
</div>

</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import globalConstant from '../../misc/global.constant'
  export default {
    data() {
      return {
        g_const: globalConstant,
        vm: {
          taskName: '数据总览'
        }
      }
    },
    mounted() {
      // 强制加载会员数据
      this.getMemberGroup()
    },
    methods: {
      ...mapActions([
        'getMemberGroup'
      ])
    }
  }
</script>
<style lang="scss" scoped>

</style>
