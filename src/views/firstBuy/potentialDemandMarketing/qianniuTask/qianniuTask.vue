<template>
<qianniu-task :sortBy="'marketing_time'" :taskId="taskId" :partItem='partLabel'>
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
          min-width="88"
          label="买家ID">
          </el-table-column>
          <el-table-column
          prop="push_servicer"
          align="center"
          label="推送客服"
          min-width="75">
          </el-table-column>
          <el-table-column
          prop="push_state"
          align="center"
          label="推送状态"
          min-width="75">
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
            min-width="75">
              <template scope="scope">
                <el-tooltip :disabled="scope.row.marketing_status !== '推送无效'" :content='scope.row.sms_status' placement="top" popper-class='tool_notes' effect="dark">
                  <p>{{utils.is_null(scope.row.marketing_status)}}</p>
                </el-tooltip>
              </template>
          </el-table-column>
          <el-table-column
          prop="order_interval"
          min-width="93"
          align="center"
          label="本次营销nn间隔时间">
          </el-table-column>
          <el-table-column
          prop="status"
          label="复购nn订单状态"
          align="center"
          min-width="108">
          </el-table-column>
          <el-table-column
          prop="marketing_time"
          align="center"
          min-width="75"
          label="营销时间">
            <template scope="scope">
              <p>{{utils.format_date(scope.row.marketing_time)}}<br/>{{utils.format_time(scope.row.marketing_time)}}</p>
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
          min-width="93"
          label="复购成功时间差">
          </el-table-column>
          <el-table-column
          prop="purchase_times"
          align="center"
          min-width="60"
          label="购物次数">
          </el-table-column>
          <el-table-column
          prop="grade_crm"
          align="center"
          min-width="70"
          label="CRM内会员级别">
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
          push_servicer: {name: '推送客服'},
          push_state: {name: '推送状态'},
          payment: {name: '订单金额', type: 'money', width: '75'},
          marketing_status: {name: '营销状态'},
          order_interval: {width: '90' ,name: '本次营销nn间隔时间'},
          status: {name: '复购nn订单状态'},
          marketing_time: {name: '营销时间', type: 'date', width: '88'},
          pay_time: {name: '付款时间', type: 'date', width: '75'},
          marketing_interval: {width: '108' ,name: '复购成功时间差', toolContent: '【注释】在营销信息发送成功后，买家复购成功拍下时间（减）对应营销信息发送时间'},
          purchase_times: {name: '购物次数标签'},
          grade_crm: {name: 'CRM内会员级别'},
        }
      }
    },
    computed: {
      ...mapGetters([
          'userData',
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
