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
              prop="lost_reason"
              align="center"
              label="流失因素"
              min-width="95">
                  <template scope="scope">
                  <p>{{utils.is_null(scope.row.lost_reason)}}</p>
                  </template>
              </el-table-column>
              <el-table-column
              prop="customer_reminder_date"
              align="center"
              min-width="88"
              label="营销时间">
                <template scope="scope">
                  <p>{{utils.format_date(scope.row.customer_reminder_date)}}<br/>{{utils.format_time(scope.row.customer_reminder_date)}}</p>
                </template>
              </el-table-column>
              <el-table-column
              prop="customer_reminder"
              align="center"
              min-width="70"
              label="营销手段">
                <template scope="scope">
                  <p>{{utils.is_null(scope.row.customer_reminder)}}</p>
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
          lost_reason: {name: '流失因素', width: '70'},
          marketing_job: {name: '营销手段'},
          marketing_status: {name: '营销状态'},
          marketing_time: {name: '营销时间', type: 'date', width: '88'},
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
