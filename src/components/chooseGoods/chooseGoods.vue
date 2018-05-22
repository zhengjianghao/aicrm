<template>
    <div>
        <base-choose-goods listTableClass="user_tablelist_choosegoods" @getGoods="getGoods" @getGoodsByParam="getGoodsByParam" :goodsData="goodsData" :filterGoodData="filterGoodData"></base-choose-goods>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import baseChooseGoods from '../list/baseChooseGoods'
export default {
    computed: {
        ...mapGetters([
            'filterGoodData',
            'goodsData'
        ])
    },
    methods: {
        ...mapActions([
            'getGoods',
            'getGoodsByParam'
        ])
    },
    components: {
        baseChooseGoods
    }
}
</script>
<style lang="scss">
</style>
