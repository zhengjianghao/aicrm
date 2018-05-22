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
          order_interval: {name: '催付间隔时间', width: '90'},
          marketing_status: {name: '催付状态', width: '75'},
          marketing_time: {name: '催付提醒时间', width: '88', type: 'date'},
          pay_time: {name: '本次nn付款时间', width: '75', type: 'date'},
          marketing_interval: {name: '催付成功时间差', width: '108'},
          status: {name: '当前交易状态', width: '108'},
          tid: {name: '本次nn订单编号', width: '75'},
          purchase_times: {name: '催付轮次', width: '75'},
          marketing_job: {name: '催付手段', width: '75'}
        },
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
