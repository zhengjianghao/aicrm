<template>
  <div>
    <result-data :marketingTypes="marketingTypes" :curUserTypeValue="curUserTypeValue" :resultSelStyle="{width: '190px'}" :tooltipContent="tooltipContent" :taskId="taskId">
    </result-data>
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
      marketingTypes: g_const.marketingTRANSFERREEOE,
      curUserTypeValue: g_const.marketingTRANSFERREEOE[0].name,
      tooltipContent: {
        DELAYDELIVER_ORDER_NUM: '公式=选定时间段内 符合配置条件的“流转异常时”订单数汇总统计（以对应订单的填写发货单号时间来确定归属日，注意当日指的是从昨天发货节点之后到今天发货节点，其中在发货节点之后所产生的订单算作第二天的订单）（注意这里是订单不是用户数，非合并订单）',
        DELAYDELIVER_ORDER_PROPORTION: '公式=选定时间段内 符合配置条件的“流转异常时”订单数汇总/当日符合配置条件的所有发货订单数（以对应订单的填写发货单号时间来确定归属日，注意当日指的是从昨天发货节点之后到今天发货节点，一定是当日发货的，其中在发货节点之后所产生的订单算作第二天的订单）（注意这里是订单不是用户数，非合并订单）'
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
