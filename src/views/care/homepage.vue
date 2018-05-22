<template>
<div style="height: 100%">
    <content-header
      :name="vm.taskName"
    >
    </content-header>
    <market-home
    :homeData='careData'
    :menuCodes='g_const.activeMenuCodes.care'>
    </market-home>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
export default {
    data() {
        return {
            g_const: globalConstant,
            vm: {
                taskName: '关怀总览'
            }
        }
    },
    computed: {
        ...mapGetters(['careData'])
    }
}
</script>
<style lang="scss" scoped>

</style>
