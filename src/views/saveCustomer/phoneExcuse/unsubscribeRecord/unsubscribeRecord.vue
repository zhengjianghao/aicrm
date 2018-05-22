<template>
<unsubscribe-record :sortBy="'refund_time'" :taskId="taskId" :partItem="partLabel">
      <!--<template scope='props'>
          <el-table
              :data="props.data"
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
              prop="marketing_time"
              align="center"
              min-width="88"
              label="营销时间">
                <template scope="scope">
                  <p>{{utils.format_date(scope.row.marketing_time)}}<br/>{{utils.format_time(scope.row.marketing_time)}}</p>
                </template>
              </el-table-column>
              <el-table-column
              prop="refund_time"
              align="center"
              label="退订时间"
              min-width="80">
                <template scope="scope">
                  <p>{{utils.format_date(scope.row.refund_time)}}<br/>{{utils.format_time(scope.row.refund_time)}}</p>
                </template>
              </el-table-column>
          </el-table>
      </template>-->
</unsubscribe-record>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import utils from '../../../../misc/utils'
  import unsubscribeRecord from '../../../../components/unsubscribeRecord/unsubscribeRecord'
  export default {
    data() {
      return {
        utils: utils,
        taskId: '',
        partLabel: {
          created: {name: '下单时间', width: '75', type: 'date'},
          buyer_nick: {name: '买家ID', width: '90'},
          lost_reason: {name: '流失因素', width: '70'},
          marketing_time: {name: '营销时间', width: '80', type: 'date'},
          refund_time: {name: '退订时间', width: '75', type: 'date'}
        }
      }
    },
    mounted() {
      this.taskId = this.$route.query.id
    },
    components: {
      unsubscribeRecord
    }
}
</script>
<style lang="scss" scoped>

</style>
