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
          order_sure_time: {name: '订单确认时间', type: 'date', width: '80'},
          tid: {name: '本次nn订单编号'},
          marketing_time: {name: '买家关怀推送时间', type: 'date', width: '88'},
          marketing_status: {name: '买家关怀推送状态'},
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
