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
      marketingTypes: g_const.marketingTypesSignRemind,
      curUserTypeValue: g_const.marketingTypesSignRemind[0].name,
      g_const: g_const,
      tooltipContent: {
        SENDREMIND_USER_NUMBER: '公式=选定时间段内符合配置条件的“签收”用户数汇总统计（去掉重复用户），计算时间以快件被签收时间为准'
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
