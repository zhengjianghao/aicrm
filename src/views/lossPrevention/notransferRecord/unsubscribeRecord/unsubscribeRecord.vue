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
          payment: {name: '本次nn订单金额', width: '70', type: 'money'},
          pay_time: {name: '本次nn付款时间', width: '80', type: 'date'},
          send_time: {name: '物流单号填写时间', width: '110', type: 'date'},
          express_receive_time: {name: '快递揽收时间', width: '110', type: 'date'},
          tid: {name: '本次nn订单编号', width: '75'},
          marketing_job: {name: '买家防御手段', width: '90'},
          marketing_time: {name: '买家防御nn推送时间', width: '100', type: 'date'},
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
