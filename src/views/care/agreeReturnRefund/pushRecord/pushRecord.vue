<template>
  <push-record :sortBy="'apply_refund_date'" :taskId="taskId" :partItem='partLabel'>
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
          payment: {name: '本次nn订单金额', type: 'money', width: '75'},
          pay_time: {name: '本次nn付款时间', type: 'date', width: '75'},
          apply_refund_date: {name: '申请退款时间', type: 'date', width: '100'},
          refuse_date: {name: '商家同意时间', type: 'date', width: '80'},
          tid: {name: '本次nn订单编号'},
          marketing_time: {name: '买家提醒nn推送时间', type: 'date', width: '88'},
          customer_reminder: {name: '客服提醒手段'},
          customer_reminder_date: {name: '客服推送时间', type: 'date', width: '80'},
          marketing_status: {name: '营销状态'},
          marketing_job: {name: '营销手段'},
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
