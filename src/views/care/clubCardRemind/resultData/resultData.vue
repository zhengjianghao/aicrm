<template>
  <div>
    <result-data :marketingTypes="marketingTypes" :resultSelStyle="{width: '190px'}" :curUserTypeValue="curUserTypeValue" :taskId="taskId" :tooltipContent="tooltipContent"></result-data>
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
      marketingTypes: g_const.marketingCLUBCARDREMIND,
      curUserTypeValue: g_const.marketingCLUBCARDREMIND[0].name,
      tooltipContent: {
        FIRSTCOMMENT_USER_NUM: '公式=选定时间段内符合配置条件的“会员卡领取”用户数汇总统计（去掉重复用户），计算时间以实际触发节点时间为准'
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
