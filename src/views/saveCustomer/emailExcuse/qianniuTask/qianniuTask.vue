<template>
<qianniu-task :sortBy="'marketing_time'" :partItem="partLabel">
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
              label="客服推送时间"
              min-width="95">
                <template scope="scope">
                 <p>{{utils.format_date(scope.row.customer_reminder_date)}}<br/>{{utils.format_time(scope.row.customer_reminder_date)}}</p>
                </template>
              </el-table-column>
              <el-table-column
              prop="push_servicer"
              align="center"
              label="推送客服"
              min-width="80">
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
              prop="express_company"
              align="center"
              min-width="110"
              label="快递公司">
                  <template scope="scope">
                      <p>{{utils.is_null(scope.row.express_company)}}</p>
                  </template>
              </el-table-column>
              <el-table-column
              prop="express_num"
              align="center"
              min-width="110"
              label="快递单号">
                  <template scope="scope">
                      <p>{{utils.is_null(scope.row.express_num)}}</p>
                  </template>
              </el-table-column>
              <el-table-column
              prop="send_status"
              align="center"
              min-width="110"
              label="运送状态">
                  <template scope="scope">
                      <p>{{utils.is_null(scope.row.send_status)}}</p>
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
          lost_reason: {name: '流失因素', width: '90'},
          customer_reminder_date: {name: '客服推送时间', width: '85', type: 'date'},
          push_servicer: {name: '推送客服', width: '80'},
          push_state: {name: '推送状态', width: '80'},
          express_company: {name: '快递公司', width: '80'},
          express_num: {name: '快递单号', width: '100'},
          send_status: {name: '运送状态', width: '80'},
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
