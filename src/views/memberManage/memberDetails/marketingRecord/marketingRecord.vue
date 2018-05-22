<template>
    <div class="user_tablelist" v-if="subState === 'marketingRecord'">
        <el-table :data="marketingsFilter.curPageData" max-height="565" stripe border>
            <el-table-column prop="pay_time" min-width="130" align="center" label="付款时间">
                <template scope="scope">
                    <p>{{utils.is_null(scope.row.pay_time)}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="payment" align="right" header-align="center" min-width="90" label="订单金额">
                <template scope="scope">
                    <p>{{utils.is_null(scope.row.payment)}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="tid" align="center" min-width="130" label="订单编号">
                <template scope="scope">
                    <p>{{utils.is_null(scope.row.tid)}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="job_type" align="center" label="营销任务类型" min-width="90">
                <template scope="scope">
                    <!--<p>{{utils.is_null(scope.row.job_type)}}</p>-->
                    <p>{{scope.row.job_type ? global.allMarketTypes[scope.row.job_type.split('_')[0] + '_P4P_SYS'] : '/'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="job_name" align="center" label="营销任务名称" min-width="80">
                <template scope="scope">
                    <p>{{utils.is_null(scope.row.job_name)}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="marketing_time" align="center" min-width="130" label="营销时间">
                <template scope="scope">
                    <p>{{utils.is_null(scope.row.marketing_time)}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="marketing_type" align="center" label="营销手段" min-width="90">
                <template scope="scope">
                    <p>{{utils.is_null(scope.row.marketing_type)}}</p>
                </template>
            </el-table-column>
        </el-table>
        <div class="pull-right page_filer">
            <el-pagination :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" :current-page="pageIndex" layout="total, sizes, prev, pager, next, jumper" :total="pagination.totalNum" @current-change="doPageByNum" @size-change="doPageBySize">
            </el-pagination>
        </div>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import pagination from '../../../../misc/pagination'
import utils from '../../../../misc/utils'
import global from '../../../../misc/global.constant'
export default {
    data() {
        return {
            pagination: {},
            marketingsFilter: [],
            pageIndex: 1,
            utils: utils,
            global: global
        }
    },
    computed: {
        ...mapGetters([
            'subState'
        ])
    },
    watch: {
        marketings() {
            this.search()
        },
        subState() {
            if (this.subState === 'marketingRecord') {
                this.init()
            }
        }
    },
    mounted() {
        this.pagination = Object.assign(this.pagination, pagination)
        this.init()
    },
    methods: {
        init() {
            this.pagination.init()
            this.pageIndex = 1
            this.search()
        },
        search() {
            this.marketingsFilter = this.pagination.doPage(this.marketings)
        },
        doPageByNum(val) {
            this.pagination.pageIndex = val
            this.pageIndex = val
            this.search()
        },
        doPageBySize(val) {
            this.pagination.pageSize = val
            this.search()
        }
    },
    props: [
        'marketings'
    ]
}
</script>
<style lang="scss" scoped>
.el-table {
    font-size: 12px;
}

.page_filer {
    margin: 20px;
}

.user_tablelist {
    margin: 0px;
}
</style>
