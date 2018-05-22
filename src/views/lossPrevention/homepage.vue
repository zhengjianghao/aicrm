<template>
<div>
    <content-header
      :name="vm.taskName"
    >
    </content-header>
    <market-home
    :homeData='lossPreventionData'
    :menuCodes='g_const.activeMenuCodes.lossPrevention'>
    </market-home>
</div>

</template>
<script type="text/ecmascript-6" scoped>
import globalConstant from '../../misc/global.constant'
import { mapGetters, mapActions } from 'vuex'
const delayDelivering = () => import('./delayDelivering/delayDelivering.vue')
export default {
    data() {
        return {
            g_const: globalConstant,
            vm: {
                taskName: '流失防御总览'
            }
        }
    },
    mounted() {
        delayDelivering()
    },
    computed: {
        ...mapGetters(['lossPreventionData'])
    }
}
</script>
<style lang="scss">

</style>
