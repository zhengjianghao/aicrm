<template>
  <result-detail :sortBy="'marketing_time'" :taskId="taskId" :partItem="partLabel">
  </result-detail>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import utils from '../../../../misc/utils'
  import resultDetail from '../../../../components/resultDetail/resultDetail'
  export default {
    data() {
      return {
        utils: utils,
        taskId: '',
        partLabel: {
          created: {name: '本次nn下单时间', width: '75', type: 'date'},
          buyer_nick: {name: '买家ID', width: '90'},
          payment: {name: '本次nn订单金额', width: '75', type: 'money'},
          pay_time: {name: '本次nn付款时间', width: '75', type: 'date'},
          tid: {name: '本次nn订单编号', width: '75'},
          end_time: {name: '本次交易nn成功时间', width: '90'},
          first_comment_date: {name: '初评时间', width: '75'},
          reminder_interval: {name: '提醒间隔', width: '75'},
          add_comment_date: {name: '追评时间', width: '75'},
          marketing_interval: {name: '提醒成功时间差', width: '108'},
          marketing_time: {name: '买家提醒nn推送时间', width: '125', type: 'date'},
          marketing_job: {name: '推送手段', width: '75'}
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
