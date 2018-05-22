<template>
<qianniu-task :sortBy="'customer_reminder_date'" :taskId="taskId" :partItem='partLabel'>
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
        taskId: '',
        partLabel: {
          created:  {name: '本次nn下单时间', type: 'date', width: '75'},
          buyer_nick: {name: '买家ID', width: '90'},
          payment: {name: '本次nn订单金额', type: 'money', width: '75'},
          pay_time: {name: '本次nn付款时间', type: 'date', width: '75'},
          send_time: {name: '物流单号填写时间', type: 'date', width: '95'},
          express_receive_time: {name: '快递揽收时间', type: 'date', width: '95'},
          error_reason: {name: '流转异常原因'},
          tid: {name: '本次nn订单编号'},
          marketing_status: {name: '买家防御推送状态'},
          marketing_time: {name: '买家防御nn推送时间', type: 'date', width: '88'},
          customer_reminder_state: {name: '客服提醒推送状态'},
          customer_reminder_date: {name: '客服推送时间点', type: 'date', width: '75'},
        },
      }
    },
    mounted() {
      this.taskId = this.$route.query.id
    },
    components: {
      qianniuTask
    }
}
</script>
<style lang="scss" scoped>
</style>
