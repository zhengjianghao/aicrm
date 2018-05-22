<template>
<push-record :sortBy="'marketing_time'" :taskId="taskId" :partItem='partLabel'>
</push-record>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import utils from '../../../../misc/utils'
  import pushRecord from '../../../../components/pushRecord/pushRecord'
  export default {
    data() {
      return {
        utils: utils,
        taskId: '',
        partLabel: {
          created:  {name: '本次nn下单时间', type: 'date', width: '75'},
          buyer_nick: {name: '买家ID', width: '90'},
          payment: {name: '本次nn订单金额', type: 'money', width: '60'},
          order_type: {name: '订单类型', width: '75'},
          order_interval: {name: '催付间隔时间', width: '85'},
          marketing_status: {name: '催付状态', width: '75'},
          marketing_time: {name: '催付提醒时间', type: 'date', width: '85'},
          pay_time: {name: '本次nn付款时间', type: 'date', width: '75'},
          marketing_interval: {name: '催付成功时间差', width: '95'},
          status: {name: '当前交易状态', width: '75'},
          tid: {name: '本次nn订单编号', width: '75'},
          purchase_times: {name: '催付轮次', width: '60'},
          marketing_job: {name: '催付手段', width: '60'},
          customer_reminder: {name: '客服提醒手段', width: '60'},
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
