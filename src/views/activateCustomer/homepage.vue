<template>
<div>
    <content-header
      :name="vm.taskName"
    >
    </content-header>
    <market-home
    :homeData='g_const.ActivateCustomer'
    :menuCodes='g_const.activeMenuCodes.activateCustomer'>
    </market-home>
</div>
    
</template>
<script>
    import globalConstant from '../../misc/global.constant'
    export default {
        data() {
            return {
                g_const: globalConstant,
                vm: {
                    taskName: '激活总览'
                }
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
