<template>
    <market-home-all
    :homeData='g_const.allMarket'
    :menuCodes='g_const.activeMenuCodes.tasklist'>
    </market-home-all>
</template>
<script>
    import globalConstant from '../../../misc/global.constant'
    export default {
        data() {
            return {
                g_const: globalConstant
            }
        }
    }
</script>
<style lang="scss">

</style>
