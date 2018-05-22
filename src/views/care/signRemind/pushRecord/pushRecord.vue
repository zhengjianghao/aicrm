<template>
<push-record :sortBy="'marketing_time'" :taskId="taskId" :partItem='partLabel'>
  </push-record>
</template>
<script type="text/ecmascript-6" scoped>
  import utils from '../../../../misc/utils'
  import pushRecord from '../../../../components/pushRecord/pushRecord'
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
          sign_time: {name: '签收时间', type: 'date', width: '75'},
          marketing_time: {name: '买家提醒nn推送时间', type: 'date', width: '125'},
          marketing_job: {name: '推送手段', width: '75'},
          marketing_status: {name: '营销状态', width: '75'},
        }
      }
    },
    mounted() {
      this.taskId = this.$route.query.id
    },
    components: {
      pushRecord
    }
  }
</script>
<style lang="scss" scoped>

</style>
