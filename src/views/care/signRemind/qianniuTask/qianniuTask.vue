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
          payment: {name: '本次nn订单金额', type: 'money', width: '75'},
          pay_time: {name: '本次nn付款时间', type: 'date', width: '75'},
          tid: {name: '本次nn订单编号'},
          arrive_mycity_date: {name: '到达所在城市时间', type: 'date', width: '95'},
          start_send_time: {name: '开始派送时间', type: 'date', width: '80'},
          sign_time: {name: '签收时间', type: 'date', width: '70'},
          marketing_time: {name: '买家提醒nn推送时间', type: 'date', width: '88'},
          marketing_status: {name: '买家提醒推送状态'},
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
<style lang="scss" scoped>
</style>
