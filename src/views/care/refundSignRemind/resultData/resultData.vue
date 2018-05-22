<template>
  <div>
    <result-data :marketingTypes="marketingTypes" :resultSelStyle="{width: '190px'}" :curUserTypeValue="curUserTypeValue" :tooltipContent="tooltipContent" :taskId="taskId"></result-data>
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
      marketingTypes: g_const.marketingREFUNDSIGNREMIND,
      curUserTypeValue: g_const.marketingREFUNDSIGNREMIND[0].name,
      tooltipContent: {
        ONLYREFUND_USER_NUMBER: '公式=选定时间段内符合配置条件的“买家退货被签收”用户数汇总统计（去掉重复用户）'
      },
      taskId: ''
    }
  },
  mounted() {
    this.taskId = this.$route.query.id
  },
  // 买家退货被签收提醒用户占比
  components: {
    resultData
  }
}
</script>
<style lang="scss" scoped>

</style>
