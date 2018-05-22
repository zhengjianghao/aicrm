<template>
<qianniu-task :sortBy="'marketing_time'" :taskId="taskId" :partItem="partLabel">
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
          created: {name: '上次nn下单时间', width: '85', type: 'date'},
          buyer_nick: {name: '买家ID', width: '90'},
          push_servicer: {name: '推送客服', width: '80'},
          push_state: {name: '推送状态', width: '80'},
          payment: {name: '上次nn订单金额', width: '80', type: 'money'},
          marketing_status: {name: '营销状态', width: '80'},
          order_interval: {name: '本次营销nn间隔时间', width: '90'},
          status: {name: '复购nn订单状态', width: '85'},
          marketing_time: {name: '营销时间', width: '80', type: 'date'},
          pay_time: {name: '上次nn付款时间', width: '80', type: 'date'},
          marketing_interval: {name: '复购成功时间差', width: '90'},
          purchase_times: {name: '购物次数标签', width: '80'},
          grade_crm: {name: 'CRM内会员级别', width: '80'},
        }
      }
    },
    computed: {
      ...mapGetters([
          'userData',
          'jurisdictionData'
          ])
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
