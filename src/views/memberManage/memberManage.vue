<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../misc/global.constant'
  export default {
    methods: {
      ...mapActions([
        'getActiveMenuCode'
      ])
    },
    mounted() {
      this.getActiveMenuCode(globalConstant.activeMenuCodes.member)
    }
}
</script>
<style lang="scss" scoped>
</style>
