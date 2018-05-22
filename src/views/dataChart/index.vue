<template>
<div>
  <router-view></router-view>
</div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
export default {
   data() {
        return {
            g_const: globalConstant
        }
    },
     computed: {
        ...mapGetters([
        ])
    },
    mounted() {
      this.getActiveMenuCode(this.g_const.activeMenuCodes.dataChart)
    },
    methods: {
      ...mapActions([
          'getActiveMenuCode'
      ])
    }
}
</script>
<style lang="scss" scoped>

</style>
