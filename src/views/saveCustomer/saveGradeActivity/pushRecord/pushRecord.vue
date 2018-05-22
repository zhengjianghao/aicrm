<template>
<push-record :sortBy="'marketing_time'" :taskId="taskId" :partItem='partLabel'>
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
              label="订单状态"
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
              <el-table-column
              prop="marketing_job"
              align="center"
              min-width="70"
              label="营销手段">
                <template scope="scope">
                  <p>{{utils.is_null(scope.row.marketing_job)}}</p>
                </template>
              </el-table-column>
          </el-table>
    </template>-->
  </push-record>
</template>
<script type="text/ecmascript-6" scoped>
  import utils from '../../../../misc/utils'
  import pushRecord from '../../../../components/pushRecord/pushRecord'
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
          order_interval: {width: '90' ,name: '本次营销nn间隔时间'},
          status: {name: '订单状态'},
          marketing_time: {name: '营销时间', type: 'date', width: '88'},
          pay_time: {name: '付款时间', type: 'date', width: '75'},
          marketing_interval: {width: '108' ,name: '挽回成功时间差'},
          purchase_times: {name: '购物次数标签'},
          grade_crm: {name: 'CRM内会员级别'},
          marketing_job: {name: '营销手段'},
        },
      }
    },
    mounted() {
      this.taskId = this.$route.query.id
    },
    components: {
      pushRecord
    }
  }
</script>
<style lang="scss" scoped>

</style>
