<template>
<qianniu-task :sortBy="'marketing_time'" :taskId="taskId" :partItem='partLabel'>
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
          push_servicer: {name: '推送客服', width: '90'},
          push_state: {name: '推送状态', width: '90'},
          payment: {name: '本次nn订单金额', type: 'money', width: '75'},
          marketing_status: {name: '营销状态'},
          status: {name: '加购nn订单状态'},
          marketing_time: {name: '营销时间', type: 'date', width: '88'},
          pay_time: {name: '本次nn付款时间', type: 'date', width: '75'},
          marketing_interval: {width: '108' ,name: '加购成功时间差'},
          purchase_times: {name: '购物次数标签'},
          grade_crm: {name: 'CRM内会员级别'},
        }
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
<style lang="scss">
</style>
