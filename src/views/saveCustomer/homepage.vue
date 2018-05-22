<template>
<div>
    <content-header
      :name="vm.taskName"
    >
    </content-header>
    <market-home
    :homeData='g_const.SaveCustomer'
    :menuCodes='g_const.activeMenuCodes.saveCustomer'>
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
                    taskName: '挽回总览'
                }
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
