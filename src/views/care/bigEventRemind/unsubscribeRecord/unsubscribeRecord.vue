<template>
<unsubscribe-record :sortBy="'refund_time'" :taskId="taskId" :partItem="partLabel">
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
          created: {name: '本次nn下单时间', width: '75', type: 'date'},
          buyer_nick: {name: '买家ID', width: '80'},
          payment: {name: '本次nn订单金额', width: '75', type: 'money'},
          order_type: {name: '订单类型', width: '75'},
          order_interval: {name: '催付间隔时间', width: '95'},
          marketing_status: {name: '催付状态', width: '75'},
          marketing_time: {name: '催付提醒时间', width: '100', type: 'date'},
          pay_time: {name: '本次nn付款时间', width: '75', type: 'date'},
          marketing_interval: {name: '催付成功时间差', width: '90'},
          status: {name: '当前交易状态', width: '75'},
          tid: {name: '本次nn订单编号', width: '75'},
          marketing_times: {name: '催付轮次', width: '60'},
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
