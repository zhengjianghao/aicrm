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
          created:  {name: '本次nn下单时间', type: 'date', width: '70'},
          buyer_nick: {name: '买家ID', width: '75'},
          payment: {name: '本次nn订单金额', type: 'money', width: '70'},
          status: {name: '加购nn订单状态', width: '90'},
          marketing_time: {name: '本次nn营销时间', type: 'date', width: '70'},
          pay_time: {name: '本次nn付款时间', type: 'date', width: '70'},
          marketing_interval: {name: '加购成功时间差', width: '100'},
          purchase_times: {name: '购物次数标签', width: '70'},
          marketing_job: {name: '本次nn营销手段', width: '70'},
          marketing_status: {name: '本次nn营销状态', width: '70'},
          message_send_content: {name: '本次营销内容', width: '130'}
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
<style lang="scss">

</style>
