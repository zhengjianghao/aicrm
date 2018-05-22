<template>
    <table-list :hiddenToolBox="true" @getBaseList="searchRemote" @getFilterList="searchLocal" ref="tableList" :filterListData="filterBuyMarketRecordData">
        <template slot="tableData" scope="scope">
            <el-table :data="scope.data" stripe border max-height="436" style="width:100%">
                <el-table-column prop="chargeOrder" align="center" min-width="40" label="次序">
                </el-table-column>
                <el-table-column prop="buy_date" align="center" min-width="110" label="订购时间">
                    <template scope="scope">
                        {{utils.format_All_time(scope.row.buy_date)}}
                    </template>
                </el-table-column>
                <el-table-column prop="past_date" min-width="110" align="center" label="到期时间">
                    <template scope="scope">
                        {{utils.format_All_time(scope.row.past_date)}}
                    </template>
                </el-table-column>
                <el-table-column prop="tid" min-width="110" align="center" label="对应淘宝订单编号">
                </el-table-column>
                <el-table-column prop="market" label="对应场景" min-width="85" align="center">
                    <template scope="scope">
                        {{scope.row.market === "EXPERIENCEPOOR_P4P" ? "体验不佳" : g_const.allMarketTypes[scope.row.market + '_SYS']}}
                    </template>
                </el-table-column>
                <el-table-column prop="cost" min-width="80" align="center" label="费用">
                </el-table-column>
                <!--<el-table-column prop="unit_price" header-align="center" align="right" min-width="100" label="当前短信均价/元">
                        </el-table-column>-->
                <!--<el-table-column prop="remain" min-width="80" align="center" label="充值后余量/条">
                        </el-table-column>-->
                <el-table-column align="center" min-width="75" label="支付状态" :render-header="utils.appendTip('注释： 未付款/已付款')">
                    <template scope="scope">
                        {{"已付款"}}
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </table-list>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import moment from 'moment'
import utils from '../../misc/utils'
export default {
    data() {
        return {
            g_const: globalConstant,
            utils: utils,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        ...mapActions(['getBuyMarketRecordData', 'getBuyMarketRecordDataByParam']),
        init() {
            this.$refs['tableList'].init()
        },
        // 获取远程数据
        searchRemote([pagination]) {
            this.getBuyMarketRecordData([pagination])
        },
        // 处理本地数据
        searchLocal([pagination]) {
            // 主动获取数据
            this.getBuyMarketRecordDataByParam([pagination])
        }
    },
    computed: {
        ...mapGetters(['buyMarketRecordData', 'filterBuyMarketRecordData', 'subState'])
    },
    watch: {
    },
    components: {
    }
}
</script>
<style lang="scss">

</style>
