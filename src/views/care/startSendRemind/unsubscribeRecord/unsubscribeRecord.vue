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
          pay_time: {name: '本次nn付款时间', width: '75', type: 'date'},
          tid: {name: '本次nn订单编号', width: '75'},
          arrive_mycity_date: {name: '到达所在城市时间', width: '110', type: 'date'},
          start_send_time: {name: '开始派送时间', width: '110', type: 'date'},
          marketing_time: {name: '买家提醒nn推送时间', width: '110', type: 'date'},
          marketing_job: {name: '推送手段', width: '75'},
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
