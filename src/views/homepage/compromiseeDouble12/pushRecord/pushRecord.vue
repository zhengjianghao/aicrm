<template>
<push-record :sortBy="'marketing_time'" :taskId="taskId" :partItem='partLabel'>
    <!--<template scope="props">
        <el-table
            :data="props.data"
            max-height="565"
            stripe
            border>
            <el-table-column
            prop="created"
            min-width="80"
            align="center"
            label="下单时间">
                <template scope="scope">
                 <p>{{utils.format_date(scope.row.created)}}<br/>{{utils.format_time(scope.row.created)}}</p>
                </template>
            </el-table-column>
            <el-table-column
            prop="buyer_nick"
            align="center"
            min-width="100"
            label="买家ID">
            </el-table-column>
            <el-table-column
            prop="payment"
            align="right"
            header-align="center"
            min-width="80"
            label="订单金额">
                <template scope="scope">
                 <p>{{utils.format_money(scope.row.payment)}}</p>
                </template>
            </el-table-column>
            <el-table-column
            prop="order_interval"
            align="right"
            header-align="center"
            min-width="110"
            label="本次营销nn间隔时间">
              <template scope="scope">
                <p>{{utils.is_null(scope.row.order_interval)}}</p>
              </template>
            </el-table-column>
            <el-table-column
            prop="status"
            align="center"
            min-width="85"
            label="回购nn订单状态">
                <template scope="scope">
                    <p>{{utils.is_null(scope.row.status)}}</p>
                </template>
            </el-table-column>
            <el-table-column
            prop="marketing_time"
            align="center"
            min-width="80"
            label="营销时间">
                <template scope="scope">
                 <p>{{utils.format_date(scope.row.marketing_time)}}<br/>{{utils.format_time(scope.row.marketing_time)}}</p>
                </template>
            </el-table-column>
            <el-table-column
            prop="pay_time"
            align="center"
            min-width="85"
            label="回购nn付款时间">
                <template scope="scope">
                 <p>{{utils.format_date(scope.row.pay_time)}}<br/>{{utils.format_time(scope.row.pay_time)}}</p>
                </template>
            </el-table-column>
            <el-table-column
            prop="marketing_interval"
            align="center"
            min-width="95"
            label="回购成功时间差">
                <template scope="scope">
                    <p>{{utils.is_null(scope.row.marketing_interval)}}</p>
                </template>
            </el-table-column>
            <el-table-column
            prop="tid"
            align="center"
            min-width="70"
            label="订单编号">
              <template scope="scope">
                <p>{{utils.is_null(scope.row.tid)}}</p>
              </template>
            </el-table-column>
            <el-table-column
            prop="purchase_times"
            align="center"
            min-width="65"
            label="购物次数">
                <template scope="scope">
                    <p>{{utils.is_null(scope.row.purchase_times)}}</p>
                </template>
            </el-table-column>
            <el-table-column
            prop="grade_crm"
            align="center"
            min-width="60"
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
            <el-table-column
            prop="marketing_status"
            align="center"
            min-width="70"
            label="营销状态">
              <template scope="scope">
                <p>{{utils.is_null(scope.row.marketing_status)}}</p>
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
          order_interval: {width: '90' ,name: '本次营销nn间隔时间'},
          status: {name: '回购nn订单状态'},
          marketing_time: {name: '营销时间', type: 'date', width: '88'},
          pay_time: {name: '回购nn付款时间', type: 'date', width: '75'},
          marketing_interval: {width: '108' ,name: '回购成功时间差'},
          tid: {name: '订单编号'},
          purchase_times: {name: '购物次数标签'},
          grade_crm: {name: 'CRM内会员级别'},
          marketing_job: {name: '营销手段'},
          marketing_status: {name: '营销状态'},
        }
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
