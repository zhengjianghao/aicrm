<template>
<result-detail :sortBy="'pay_time'" :taskId="taskId" :partItem="partLabel">
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
          label="复购nn下单时间">
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
          label="复购nn订单金额">
            <template scope="scope">
              <p>{{utils.format_money(scope.row.payment)}}</p>
            </template>
          </el-table-column>
          <el-table-column
          prop="pay_time"
          align="center"
          min-width="75"
          label="复购nn付款时间">
              <template scope="scope">
              <p>{{utils.format_date(scope.row.pay_time)}}<br/>{{utils.format_time(scope.row.pay_time)}}</p>
              </template>
          </el-table-column>
          <el-table-column
          prop="tid"
          align="center"
          min-width="75"
          label="复购nn订单编号">
                <template scope="scope">
                  <p>{{utils.is_null(scope.row.tid)}}</p>
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
          label="复购nn订单状态"
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
</result-detail>
</template>
<script type="text/ecmascript-6" scoped>
  import utils from '../../../../misc/utils'
  import resultDetail from '../../../../components/resultDetail/resultDetail'
  export default {
    data() {
      return {
        utils: utils,
        taskId: '',
        partLabel: {
          created: {name: '复购nn下单时间', width: '75', type: 'date'},
          buyer_nick: {name: '买家ID', width: '90'},
          payment: {name: '复购nn订单金额', width: '75', type: 'money'},
          pay_time: {name: '复购nn付款时间', width: '80', type: 'date'},
          tid: {name: '复购nn订单编号', width: '75'},
          order_interval: {name: '本次营销nn间隔时间'},
          status: {name: '复购nn订单状态', width: '108'},
          marketing_time: {name: '营销时间', width: '80', type: 'date'},
          marketing_interval: {name: '复购成功时间差', width: '108'},
          purchase_times: {name: '购物次数标签', width: '70'},
          bad_weather: {name: '节假日', width: '75'},
          marketing_job: {name: '营销手段', width: '75'}
        }
      }
    },
    mounted() {
      this.taskId = this.$route.query.id
    },
    components: {
      resultDetail
    }
  }
</script>
<style lang="scss" scoped>

</style>
