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
          buyer_nick: {name: '买家ID', width: '90'},
          payment: {name: '本次nn订单金额', width: '75', type: 'money'},
          pay_time: {name: '本次nn付款时间', width: '75', type: 'date'},
          apply_refund_date: {name: '申请退款时间', width: '110', type: 'date'},
          refuse_date: {name: '商家同意时间', width: '110', type: 'date'},
          tid: {name: '本次nn订单编号', width: ''},
          marketing_time: {name: '买家提醒nn推送时间', width: '100', type: 'date'},
          marketing_job: {name: '营销手段', width: '75'},
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
