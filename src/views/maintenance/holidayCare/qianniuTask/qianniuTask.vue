<template>
<qianniu-task :sortBy="'customer_reminder_date'" :taskId="taskId" :partItem='partLabel'>
  <!--<template scope='props'>
      <el-table
          :data="props.data"
          max-height="560"
          stripe

          border>
          <el-table-column
          prop="created"
          align="center"
          min-width="75"
          label="下单时间">
            <template scope="scope">
              <p>{{utils.format_date(scope.row.created)}}<br/>{{utils.format_time(scope.row.created)}}</p>
            </template>
          </el-table-column>

          <el-table-column
          prop="buyer_nick"
          align="center"
          min-width="130"
          label="买家ID">
              <template scope="scope">
                  <p>{{utils.is_null(scope.row.buyer_nick)}}</p>
              </template>
          </el-table-column>
          <el-table-column
          prop="payment"
          align="right"
          header-align="center"
          min-width="75"
          label="订单金额">
            <template scope="scope">
              <p>{{utils.format_money(scope.row.payment)}}</p>
            </template>
          </el-table-column>
          <el-table-column
          prop="marketing_status"
          align="center"
          label="营销状态"
          min-width="80">
              <template scope="scope">
                <el-tooltip :disabled="scope.row.marketing_status !== '推送无效'" :content='scope.row.sms_status' placement="top" popper-class='tool_notes' effect="dark">
                  <p>{{utils.is_null(scope.row.marketing_status)}}</p>
                </el-tooltip>
              </template>
          </el-table-column>
          <el-table-column
          prop="order_interval"
          align="center"
          min-width="95"
          label="本次营销nn间隔时间">
              <template scope="scope">
                  <p>{{utils.is_null(scope.row.order_interval)}}</p>
              </template>
          </el-table-column>
          <el-table-column
          prop="status"
          align="center"
          label="订单状态"
          min-width="108">
            <template scope="scope">
              <p>{{utils.is_null(scope.row.status)}}</p>
            </template>
          </el-table-column>
          <el-table-column
          prop="pay_time"
          align="center"
          min-width="75"
          label="付款时间">
            <template scope="scope">
              <p>{{utils.format_date(scope.row.pay_time)}}<br/>{{utils.format_time(scope.row.pay_time)}}</p>
            </template>
          </el-table-column>
          <el-table-column
          prop="marketing_interval"
          align="center"
          min-width="108"
          label="复购成功时间差">
            <template scope="scope">
              <p>{{utils.is_null(scope.row.marketing_interval)}}</p>
            </template>
          </el-table-column>
          <el-table-column
          prop="purchase_times"
          align="center"
          min-width="70"
          label="购物次数">
            <template scope="scope">
              <p>{{utils.is_null(scope.row.purchase_times)}}</p>
            </template>
          </el-table-column>
          <el-table-column
          prop="holiday"
          align="center"
          min-width="88"
          label="节假日">
            <template scope="scope">
              <p>{{utils.is_null(scope.row.holiday)}}</p>
            </template>
          </el-table-column>
          <el-table-column
          prop="customer_reminder_date"
          align="center"
          label="客服推送时间"
          min-width="90">
            <template scope="scope">
              <p>{{utils.format_date(scope.row.customer_reminder_date)}}<br/>{{utils.format_time(scope.row.customer_reminder_date)}}</p>
            </template>
          </el-table-column>
          <el-table-column
          prop="push_state"
          align="center"
          label="推送状态"
          min-width="75">
          </el-table-column>
      </el-table>
  </template>-->
</qianniu-task>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import utils from '../../../../misc/utils'
  import qianniuTask from '../../../../components/qianniuTask/qianniuTask'
  export default {
    data() {
      return {
        utils: utils,
        taskId: '',
        partLabel: {
          created:  {name: '下单时间', type: 'date', width: '75'},
          buyer_nick: {name: '买家ID', width: '90'},
          payment: {name: '订单金额', type: 'money', width: '75'},
          marketing_status: {name: '营销状态'},
          order_interval: {name: '本次营销nn间隔时间'},
          status: {name: '订单状态'},
          pay_time: {name: '付款时间', type: 'date', width: '75'},
          marketing_interval: {name: '复购成功时间差'},
          purchase_times: {name: '购物次数标签'},
          holiday: {name: '节假日'},
          customer_reminder_date: {name: '客服推送时间', type: 'date', width: '80'},
          push_state: {name: '推送状态'},
        },
      }
    },
    computed: {
      ...mapGetters([
          'jurisdictionData'
          ])
    },
    mounted() {
      this.taskId = this.$route.query.id
    },
    components: {
      qianniuTask
    }
}
</script>
<style lang="scss" scoped>
</style>
