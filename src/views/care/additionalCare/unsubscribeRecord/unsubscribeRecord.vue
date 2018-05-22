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
          payment: {name: '本次nn订单金额', width: '', type: 'money'},
          pay_time: {name: '本次nn付款时间', width: '', type: 'date'},
          tid: {name: '本次nn订单编号', width: ''},
          end_time: {name: '本次交易nn成功时间', width: '80', type: 'date'},
          first_comment_state: {name: '初评状态', width: ''},
          first_comment_date: {name: '初评时间', width: '', type: 'date'},
          add_comment_state: {name: '追评状态', width: ''},
          add_comment_date: {name: '追评时间', width: '', type: 'date'},
          marketing_time: {name: '买家关怀推送时间', width: '100', type: 'date'},
          marketing_job: {name: '推送手段', width: ''},
          refund_time: {name: '退订时间', width: '', type: 'date'}
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
