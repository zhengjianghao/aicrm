<template>
<div>
  <result-data
  :marketingTypes="marketingTypes"
  :resultSelStyle="{width: '190px'}"
  :tooltipContent='tooltipContent'
  :taskId="taskId"
  :curUserTypeValue="curUserTypeValue"></result-data>
</div>
</template>
<script type="text/ecmascript-6" scoped>
    import resultData from '../../../../components/resultData/resultData'
    import g_const from '../../../../misc/global.constant'
    export default {
      data() {
        return {
          marketingTypes: g_const.marketingTypesEXPECTEDGAP,
          curUserTypeValue: g_const.marketingTypesEXPECTEDGAP[0].name,
          tooltipContent: {
            DISPLEASURE_USER_NUMBER: '公式=选定时间段内符合配置条件的评价中“预期落差”用户数汇总统计（去掉重复用户）',
            DISPLEASURE_USER_PROPORTION: '公式=选定时间段内符合配置条件的评价中“预期落差”用户数汇总/当日符合配置条件的所有评价用户数，（去掉重复用户）'
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
