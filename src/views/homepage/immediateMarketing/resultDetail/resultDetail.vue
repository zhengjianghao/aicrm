<template>
  <result-detail :sortBy="'marketing_time'" :taskId="taskId" :partItem="partLabel">
  </result-detail>
</template>
<script type="text/ecmascript-6" scoped>
import utils from '../../../../misc/utils'
import resultDetail from 'components/resultDetail/resultDetail'
export default {
  data() {
    return {
      utils: utils,
      taskId: '',
      partLabel: {
        created: { name: '加购nn下单时间', width: '60', type: 'date' },
        buyer_nick: { name: '买家ID', width: '60' },
        payment: { name: '本次nn订单金额', width: '60', type: 'money' },
        status: { name: '加购nn订单状态', width: '65' },
        marketing_time: { name: '本次nn营销时间', width: '65', type: 'date' },
        pay_time: { name: '加购nn付款时间', width: '60', type: 'date' },
        marketing_interval: { name: '加购成功时间差', width: '108' },
        tid: { name: '加购nn订单编号', width: '70' },
        marketing_job: { name: '本次nn营销手段', width: '60' },
        buyer_confirm_date: { name: '加购交易成功时间', width: '70', type: 'date' },
        all_order_payment: { name: '加购买家购物总金额', width: '70', type: 'money' },
        all_refund_payment: { name: '加购买家退款总金额', width: '70', type: 'money' },
        buyer_confirm_money: { name: '加购买家确认成功金额', width: '70', type: 'money' },
        serivice_pay_per: { name: '服务费比例', width: '60', type: 'percent' },
        serivice_pay: { name: '服务费', width: '60', type: 'moneyMin' },
      },
    }
  },
  mounted() {
    this.taskId = this.$route.query.id
  },
  components: {
    resultDetail
  }
}
</script>
<style lang="scss">

</style>
