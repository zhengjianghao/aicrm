<template>
    <table-list @getBaseList="searchRemote" @getFilterList="searchLocal" ref="tableList" :filterListData="costOrderData">
        <template slot="toolbox">
            <div class="user_toolbox">
                <div class="toolbox_control">
                    消费时间：
                    <el-date-picker v-model="buyDateRang" @change="search" type="daterange" :editable="false" format="yyyy-MM-dd" placeholder="选择日期范围" size="small">
                    </el-date-picker>
                </div>
                <div class="toolbox_control">
                    <el-button-group>
                        <!--<el-button size="small" :class="vm.activeTabName === '所有记录' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('所有记录')">所有记录</el-button>-->
                        <el-button size="small" class="margin_left_tiny" :class="vm.activeTabName === 'money' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('money')">预付费消费</el-button>
                        <el-button size="small" style="margin-left: 2px;" :class="vm.activeTabName === 'sms' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('sms')">短信消费</el-button>
                    </el-button-group>
                </div>
            </div>
        </template>
        <template slot="tableData" scope="scope">
            <el-table :data="scope.remotePageData" stripe border max-height="436" style="width:100%">
                <el-table-column prop="chargeOrder" align="center" min-width="40" label="次序">
                </el-table-column>
                <el-table-column prop="use_date" align="center" min-width="110" label="消费时间">
                    <template scope="scope">
                        {{utils.format_All_time(scope.row.use_date)}}
                    </template>
                </el-table-column>
                <el-table-column prop="buyer_nick" align="center" min-width="110" label="买家ID">
                </el-table-column>
                <el-table-column prop="use_way" align="center" min-width="100" label="消费方式"
                :render-header="utils.appendTip('消费方式：预付费/短信')">
                </el-table-column>
                <el-table-column prop="marketing_task" min-width="100" align="center" label="营销场景">
                </el-table-column>
                <el-table-column prop="tid" min-width="160" align="center" label="订单编号">
                </el-table-column>
                <el-table-column prop="use_money" min-width="80" align="center" label="消费金额">
                    <template scope="scope">
                        {{utils.format_money(scope.row.use_money, 3)}}
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </table-list>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import utils from '../../misc/utils'
import moment from 'moment'
export default {
    data() {
        return {
            g_const: globalConstant,
            vm: {
                activeTabName: 'money'
            },
            utils: utils,
            buyDateRang: [],
            loading: false
        }
    },
    mounted() {
        this.loading = true
    },
    methods: {
        ...mapActions(['getCostOrderData']),
        switchTab(name) {
            this.vm.activeTabName = name;
            this.search();
        },
        search() {
            this.$refs['tableList'].init()
        },
        searchRemote([pagination]) {
            this.getCostOrderData([pagination, this.buyDateRang, this.vm.activeTabName])
        },
        searchLocal([pagination]) {
            this.getCostOrderData([pagination, this.buyDateRang, this.vm.activeTabName])
        },
        init() {
            this.buyDateRang = []
            this.vm.activeTabName = 'money'
            this.search()
        }
    },
    computed: {
        ...mapGetters(['costOrderData', 'subState'])
    },
    watch: {
        subState() {
            if (this.subState === 'consumptionRecord') {
                this.init()
            }
        },
        costOrderData() {
            this.loading = false
        },
    },
}
</script>
<style lang="scss" scoped>
// 弹出框tableliss
.chargeRecord_content {
    overflow: hidden;
}
</style>
