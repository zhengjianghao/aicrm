<template>
  <div class="user_tablelist" v-if="subState === 'transactionRecord'">
    <el-table
        :data="ordersFilter.curPageData"
        max-height="565"
        stripe
        border>
        <el-table-column
        prop="pay_time"
        min-width="130"
        align="center"
        label="付款时间">
            <template scope="scope">
                <p>{{utils.is_null(scope.row.pay_time)}}</p>
            </template>
        </el-table-column>
        <el-table-column
        prop="payment"
        align="right"
        header-align="center"
        min-width="90"
        label="订单金额">
            <template scope="scope">
                <p>{{utils.is_null(scope.row.payment)}}</p>
            </template>
        </el-table-column>
        <el-table-column
        prop="num"
        align="center"
        label="宝贝件数"
        min-width="80">
            <template scope="scope">
                <p>{{utils.is_null(scope.row.num)}}</p>
            </template>
        </el-table-column>
        <el-table-column
        prop="order_num"
        align="center"
        label="宝贝种类数"
        min-width="90">
            <template scope="scope">
                <p>{{utils.is_null(scope.row.order_num)}}</p>
            </template>
        </el-table-column>
        <el-table-column
        prop="status"
        align="center"
        label="订单状态"
        min-width="80">
            <template scope="scope">
                <p>{{utils.is_null(scope.row.status)}}</p>
            </template>
        </el-table-column>
        <el-table-column
        prop="tid"
        align="center"
        min-width="130"
        label="订单编号">
            <template scope="scope">
                <p>{{utils.is_null(scope.row.tid)}}</p>
            </template>
        </el-table-column>
    </el-table>
    <div class="pull-right page_filer">
        <el-pagination
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            :current-page="pageIndex"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.totalNum"
            @current-change="doPageByNum"
            @size-change="doPageBySize"
            >
        </el-pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import pagination from '../../../../misc/pagination'
  import utils from '../../../../misc/utils'
  export default {
    data() {
      return {
          pagination: pagination,
          ordersFilter: [],
          pageIndex: 1,
          utils: utils
       }
    },
    computed: {
        ...mapGetters([
            'subState'
        ])
    },
    watch: {
        orders() {
            this.search()
        },
        subState() {
            if(this.subState === 'transactionRecord') {
                this.init()
            }
        }
    },
    methods: {
        init() {
            this.pagination.init()
            this.pageIndex = 1
            this.search()
        },
        search() {
            this.ordersFilter = this.pagination.doPage(this.orders)
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
        'orders'
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
