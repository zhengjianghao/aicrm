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
      marketingTypes: g_const.marketingDELIVERREMIND,
      curUserTypeValue: g_const.marketingDELIVERREMIND[0].name,
      tooltipContent: {
        FIRSTCOMMENT_USER_NUM: '公式=选定时间段内符合配置条件的“填写发货单号”用户数汇总统计（去掉重复用户），计算时间以发货状态节点时间为准，发货节点之前的归属当天，发货节点之后的归属第二天'
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
