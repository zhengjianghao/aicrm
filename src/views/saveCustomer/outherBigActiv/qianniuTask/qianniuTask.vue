<template>
<qianniu-task :sortBy="'marketing_time'" :partItem="partLabel">
    <!--<template scope="props">
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
              min-width="90"
              label="买家ID">
                    <template scope="scope">
                    <p>{{utils.is_null(scope.row.buyer_nick)}}</p>
                    </template>
              </el-table-column>
              <el-table-column
              prop="push_servicer"
              align="center"
              label="推送客服"
              min-width="95">
                  <template scope="scope">
                      <p>{{utils.is_null(scope.row.push_servicer)}}</p>
                  </template>
              </el-table-column>
              <el-table-column
              prop="push_state"
              align="center"
              label="推送状态"
              min-width="95">
                  <template scope="scope">
                      <p>{{utils.is_null(scope.row.push_state)}}</p>
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
              label="本次营销nn间隔时间"
              min-width="90">
                <template scope="scope">
                  <p>{{utils.is_null(scope.row.order_interval)}}</p>
                </template>
              </el-table-column>
              <el-table-column
              prop="status"
              align="center"
              label="挽回nn订单状态"
              min-width="108">
                <template scope="scope">
                  <p>{{utils.is_null(scope.row.status)}}</p>
                </template>
              </el-table-column>
              <el-table-column
              prop="marketing_time"
              align="center"
              min-width="88"
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
              min-width="108"
              label="挽回成功时间差">
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
              prop="grade_crm"
              align="center"
              min-width="88"
              label="CRM内会员级别">
                <template scope="scope">
                  <p>{{utils.is_null(scope.row.grade_crm)}}</p>
                </template>
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
        partLabel: {
          created: {name: '下单时间', width: '85', type: 'date'},
          buyer_nick: {name: '买家ID', width: '90'},
          push_servicer: {name: '推送客服', width: '80'},
          push_state: {name: '推送状态', width: '80'},
          payment: {name: '订单金额', width: '80', type: 'money'},
          marketing_status: {name: '营销状态', width: '80'},
          order_interval: {name: '本次营销nn间隔时间', width: '90'},
          status: {name: '挽回nn订单状态', width: '85'},
          marketing_time: {name: '营销时间', width: '80', type: 'date'},
          pay_time: {name: '付款时间', width: '80', type: 'date'},
          marketing_interval: {name: '挽回成功时间差', width: '90'},
          purchase_times: {name: '购物次数标签', width: '80'},
          grade_crm: {name: 'CRM内会员级别', width: '80'},
        }
      }
    },
    components: {
      qianniuTask
    }
}
</script>
<style lang="scss" scoped>
</style>
