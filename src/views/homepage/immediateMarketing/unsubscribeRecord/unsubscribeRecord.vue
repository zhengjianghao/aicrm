<template>
<unsubscribe-record sortBy="refund_time" :taskId="taskId" :partItem="partLabel">
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
          status: {name: '加购nn订单状态', width: '95'},
          marketing_time: {name: '本次nn营销时间', width: '80', type: 'date'},
          pay_time: {name: '本次nn付款时间', width: '80', type: 'date'},
          marketing_interval: {name: '加购成功时间差', width: '110'},
          purchase_times: {name: '购物次数标签', width: '75'},
          marketing_status: {name: '本次nn营销状态', width: '75'},
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
<style lang="scss">

</style>
