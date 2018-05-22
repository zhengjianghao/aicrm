<template>
    <div class="chargeRecord_content">
        <div class="user_toolbox">
            <div class="toolbox_control">
                充值时间：
                <el-date-picker v-model="buyDateRang" @change="searchLocal" type="daterange" :editable="false" format="yyyy-MM-dd" placeholder="选择日期范围" size="small">
                </el-date-picker>
            </div>
            <div class="toolbox_control">
                <el-button-group>
                    <!--<el-button size="small" :class="vm.activeTabName === '所有记录' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('所有记录')">所有记录</el-button>-->
                    <el-button size="small" class="margin_left_tiny" :class="vm.activeTabName === 'money' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('money')">预付费充值</el-button>
                    <el-button size="small" style="margin-left: 2px;" :class="vm.activeTabName === 'sms' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('sms')">短信充值</el-button>
                </el-button-group>
            </div>
        </div>
        <div class="user_tablelist" v-loading="loading" element-loading-text="数据较多,请耐心等待">
            <el-table :data="filterChargeData.curPageData" stripe border max-height="436" style="width:100%">
                <el-table-column prop="chargeOrder" align="center" min-width="40" label="次序">
                </el-table-column>
                <el-table-column prop="pay_time" align="center" min-width="110" label="充值时间">
                    <template scope="scope">
                        {{utils.format_All_time(scope.row.pay_time)}}
                    </template>
                </el-table-column>
                <el-table-column prop="channel" min-width="80" align="center" label="充值类别"
                :render-header="utils.appendTip('注释：预付费/自用短信')"
                >
                </el-table-column>
                <el-table-column prop="before_payment" min-width="80" align="center" label="充值前金额/条数">
                </el-table-column>
                <el-table-column prop="payment" label="充值金额/条数" header-align="center" min-width="85" align="right">
                </el-table-column>
                <el-table-column prop="remain" min-width="80" align="center" label="充值后金额/条数">
                </el-table-column>
                <el-table-column prop="type" align="center" min-width="75" label="充值方式">
                    <template scope="scope">
                        <el-tooltip :disabled="scope.row.type !== '失败返还'" content='每天凌晨自动统计系统前天全天已扣费但后来返回发送失败的短信，并给予返还' placement="top" popper-class='tool_notes' effect="dark">
                            <p>{{g_const.chargeWay[scope.row.type] ? g_const.chargeWay[scope.row.type] : scope.row.type}}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pull-right">
                <el-pagination :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="filterChargeData.totalNum" @current-change="doPageByNum" @size-change="doPageBySize" :current-page="pageIndex">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import pagination from '../../misc/pagination'
import moment from 'moment'
import utils from '../../misc/utils'
export default {
    data() {
        return {
            g_const: globalConstant,
            vm: {
                activeTabName: 'money'
            },
            buyDateRang: '',
            utils: utils,
            pagination: pagination,
            pageIndex: 1,
            loading: false
        }
    },
    mounted() {
        this.loading = true
        // this.getChargeData([this.pagination, 1])
        // this.getChargeDataByParam([this.pagination, this.buyDateRang, this.vm.activeTabName])
    },
    methods: {
        ...mapActions(['getChargeData', 'getChargeDataByParam']),
        switchTab(name) {
            this.vm.activeTabName = name;
            this.searchRemote();
        },
        searchLocal() {
            //this.loading = true
            this.getChargeDataByParam([this.pagination, this.buyDateRang])
        },
        doPageByNum(val) {
            this.pagination.pageIndex = val
            this.searchLocal()
            this.pageIndex = val
        },
        doPageBySize(val) {
            this.pagination.pageSize = val
            this.searchLocal()
        },
        init() {
            this.pagination.pageIndex = 1
            this.pagination.pageSize = 10
            this.pageIndex = 1
            this.buyDateRang = ''
            this.vm.activeTabName = 'money'
            this.searchRemote()
        },
        searchRemote() {
            this.getChargeData([this.pagination, this.vm.activeTabName])
        }
    },
    computed: {
        ...mapGetters(['chargeData', 'filterChargeData', 'subState'])
    },
    watch: {
        subState() {
            if (this.subState === 'chargeRecord') {
                this.init()
            }
        },
        chargeData() {
            this.loading = false
        },
        //   filterChargeData() {
        //       this.loading = false
        //   }
    },
    components: {
    }
}
</script>
<style lang="scss" scoped>
// 弹出框tableliss
.chargeRecord_content {
    overflow: hidden;
}
</style>
