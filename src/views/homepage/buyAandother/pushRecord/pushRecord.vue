<template>
  <div  class="sub_main_content">
    <div class="subTitle">
      推送记录详情清单
    </div>
    <div class="user_toolbox">
        <div class="toolbox_control">
            <el-button-group >
                <el-button size="small" :class="vm.activeTabName === '15' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('15')">近15天</el-button>
                <el-button size="small" class="margin_left_tiny" :class="vm.activeTabName === '30' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('30')">近30天</el-button>
                <el-button size="small" style="margin-left: 2px;" :class="vm.activeTabName === '90' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('90')">近90天</el-button>
            </el-button-group>
        </div>
        <div class="toolbox_control">

            <el-date-picker
            v-model="buyDateRang"
            @change="search"
            type="daterange"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择下单时间段"
            :editable="false"
            size="small">
            </el-date-picker>
        </div>
        <div class="toolbox_control toolbox_search">
            <el-input placeholder="" size="small" v-model="search_word">
                <el-button slot="append" icon="search" @click="search"></el-button>
            </el-input>
        </div>
    </div>
    <div class="user_tablelist">
         <el-table
              :data="filterPushRecordData.curPageData"
              max-height="560"
              stripe
              border>
              <el-table-column
              prop="created"
              align="center"
              min-width="95"
              label="下单时间">
               <template scope="scope">
                 <p>{{utils.format_date(scope.row.created)}}<br/>{{utils.format_time(scope.row.created)}}</p>
                </template>
              </el-table-column>

              <el-table-column
              prop="buyer_nick"
              align="center"
              min-width="160"
              label="买家ID">
              </el-table-column>
              <el-table-column
              prop="payment"
              align="right"
              header-align="center"
              min-width="100"
              label="订单金额">
                <template scope="scope">
                 <p>{{utils.format_money(scope.row.payment)}}</p>
                </template>
              </el-table-column>
              <el-table-column
              prop="promptPay_interval_date"
              align="center"
              label="催付间隔时间"
              min-width="95">
              </el-table-column>
              <el-table-column
              prop="promptPay_state"
              align="center"
              label="催付状态"
              min-width="95">
              </el-table-column>
              <el-table-column
              prop="promptPay_date"
              align="center"
              label="催付时间"
              min-width="95">
                <template scope="scope">
                 <p>{{utils.format_date(scope.row.promptPay_date)}}<br/>{{utils.format_time(scope.row.promptPay_date)}}</p>
                </template>
              </el-table-column>
              <el-table-column
              prop="pay_time"
              align="center"
              min-width="95"
              label="付款时间">
                <template scope="scope">
                  <p>{{utils.format_date(scope.row.pay_time)}}<br/>{{utils.format_time(scope.row.pay_time)}}</p>
                </template>
              </el-table-column>
              <el-table-column
              prop="promptPay_success_interval"
              align="center"
              min-width="110"
              label="催付成功时间差">
              </el-table-column>
              <el-table-column
              prop="transaction_state"
              align="center"
              min-width="110"
              label="当前交易状态">
              </el-table-column>
              <el-table-column
              prop="tid"
              align="center"
              min-width="80"
              label="订单编号">
              </el-table-column>
              <el-table-column
              prop="push_times"
              align="center"
              min-width="75"
              label="推送轮次">
              </el-table-column>
              <el-table-column
              prop="promptPay_way"
              align="center"
              label="催付手段"
              min-width="90">
              </el-table-column>
          </el-table>
        <div class="pull-right">
            <el-pagination
                :page-sizes="pagination.pageSizes"
                :page-size="pagination.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="filterPushRecordData.totalNum"
                @current-change="doPageByNum"
                @size-change="doPageBySize"
                :current-page="pageIndex"
                >
            </el-pagination>
        </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../../../misc/global.constant'
  import pagination from '../../../../misc/pagination'
  import utils from '../../../../misc/utils'
  import moment from 'moment'
  export default {
    data() {
      return {
        pagination: pagination,
        utils: utils,
        buyDateRang: [],
        search_word: '',
        formData: '',
        pageIndex: 1,
        vm: {
          activeName: '',
          activeTabName: '15'
        },
       }
    },
    computed: {
      ...mapGetters(['subState','pushRecordData','filterPushRecordData'])
    },
    watch: {
      subState() {
        if (this.subState === globalConstant.activeCode.immPushRecord) {
            // 只有在被激活，才主动获取数据
            this.vm.activeName = this.subState
            this.init()
        }
      },
    },
    mounted() {
      this.getPushRecord([this.pagination,3])
      this.getPushRecordByParam([this.pagination,this.search_word,this.vm.activeTabName,this.buyDateRang])
    },
    methods: {
      ...mapActions(['getPushRecord','getPushRecordByParam']),
      switchTab(name) {
        this.vm.activeTabName = name;
        this.search();
      },
      init() {
        this.clearSearchParam()
        this.pageIndex = 1
        this.pagination.init()
        this.search()
      },
      clearSearchParam() {
        this.vm.activeTabName = '15'
        this.buyDateRang = []
        this.search_word = ''
      },
      search() {
        this.getPushRecordByParam([this.pagination,this.search_word,this.vm.activeTabName,this.buyDateRang])
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
    }
}
</script>
<style lang="scss" scoped>
  h4 {
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    border-bottom: solid 1px #d1dbe5;
    font-size: 14px;
  }
</style>
