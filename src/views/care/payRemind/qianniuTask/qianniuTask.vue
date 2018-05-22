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
          loss_reason: {name: '流失原因'},
          marketing_time: {name: '推送提醒时间', type: 'date', width: '88'},
          push_servicer: {name: '推送客服'},
          push_state: {name: '推送状态'}
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
