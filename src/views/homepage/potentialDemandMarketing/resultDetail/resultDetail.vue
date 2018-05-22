<template>
  <result-detail :sortBy="'marketing_time'" :taskId="taskId" :partItem="partLabel">
  </result-detail>
</template>
<script type="text/ecmascript-6" scoped>
import utils from '../../../../misc/utils'
import resultDetail from '../../../../components/resultDetail/resultDetail'
export default {
  data() {
    return {
      utils: utils,
      taskId: '',
      partLabel: {
        created: { name: '复购nn下单时间', width: '60', type: 'date' },
        buyer_nick: { name: '买家ID', width: '65' },
        payment: { name: '上次nn订单金额', width: '60', type: 'money' },
        order_interval: { name: '本次营销nn间隔时间' },
        status: { name: '复购nn订单状态', width: '65' },
        marketing_time: { name: '本次nn营销时间', width: '60', type: 'date' },
        pay_time: { name: '复购nn付款时间', width: '60', type: 'date' },
        marketing_interval: { name: '复购成功时间差', width: '65' },
        tid: { name: '复购nn订单编号', width: '75' },
        marketing_job: { name: '本次nn营销手段', width: '60' },
        buyer_confirm_date: { name: '复购交易nn成功时间', width: '70', type: 'date' },
        all_order_payment: { name: '复购买家购物总金额', width: '70', type: 'money' },
        all_refund_payment: { name: '复购买家退款总金额', width: '70', type: 'money' },
        buyer_confirm_money: { name: '复购买家确认成功金额', width: '70', type: 'money' },
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
<style lang="scss" scoped>

</style>
