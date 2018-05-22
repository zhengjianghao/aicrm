<template>
  <div>
    <result-data :marketingTypes="marketingTypes" :resultSelStyle="{width: '220px'}" :curUserTypeValue="curUserTypeValue" :taskId="taskId" :tooltipContent="tooltipContent"></result-data>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import resultData from '../../../../components/resultData/resultData'
import g_const from '../../../../misc/global.constant'
import moment from 'moment'
export default {
  data() {
    return {
      marketingTypes: g_const.marketingAGREERETURNREFUND,
      curUserTypeValue: g_const.marketingAGREERETURNREFUND[0].name,
      tooltipContent: {
        ONLYREFUND_USER_NUMBER: '公式=选定时间段内符合配置条件的“商家同意退货退款”用户数汇总统计（去掉重复用户）'
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
