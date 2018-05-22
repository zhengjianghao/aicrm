<template>
  <div>
    <result-data :marketingTypes="marketingTypes" :taskId="taskId" :resultSelStyle="{width: '200px'}"  :tooltipContent='tooltipContent' :curUserTypeValue="curUserTypeValue"></result-data>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import resultData from '../../../../components/resultData/resultData'
import g_const from '../../../../misc/global.constant'
import moment from 'moment'
import echarts from 'echarts'
export default {
  data() {
    return {
      marketingTypes: g_const.marketingRefund,
      curUserTypeValue: g_const.marketingRefund[0].name,
      tooltipContent: {
        REFUND_USER_NUM: '公式=选定时间段内符合配置条件的“发货后未收货退款”用户数汇总统计（去掉重复用户）',
        REFUND_USER_PROPORTION: '公式=选定时间段内符合配置条件的“发货后未收货退款”用户数汇总/当日符合配置条件的所有退款用户数，（去掉重复用户）'
      },
      taskId: ''
    }
  },
  mounted() {
    this.taskId = this.$route.query.id
  },
  components: {
    resultData
  }
}
</script>
<style lang="scss" scoped>

</style>
