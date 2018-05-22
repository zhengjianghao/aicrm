<template>
  <div>
    <result-data :marketingTypes="marketingTypes" :resultSelStyle="{width: '190px'}" :curUserTypeValue="curUserTypeValue" :taskId="taskId" :tooltipContent='tooltipContent'></result-data>
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
      marketingTypes: g_const.marketingADDITIONALCARE,
      curUserTypeValue: g_const.marketingADDITIONALCARE[0].name,
      tooltipContent: {
        FIRSTCOMMENT_USER_NUM: '选定时间段内 符合配置条件的追评关怀用户数汇总统计（去掉重复用户），计算时间以评价时间为准，竖轴-用户数/横轴日期'
      },
      taskId: ''
    }
  },
  mounted() {
    this.taskId = this.$route.query.id
  },
  // 追评关怀用户占比
  components: {
    resultData
  }
}
</script>
<style lang="scss" scoped>

</style>
