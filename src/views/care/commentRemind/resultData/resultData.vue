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
      marketingTypes: g_const.marketingGiftMarket,
      curUserTypeValue: g_const.marketingGiftMarket[0].name,
      tooltipContent: {
        GIFTMARKET_RATE: '公式=当日 被成功营销过并3天内有成果的用户数/当日被成功营销过的用户数（成果指的是提醒后买家来评价了）<br/>【备注：因为客户从被营销到评价会有延迟，所以暂定延期统计3天内的评价情况，归入发送短信的日计算，所以3天内的数额始终会变化，“营销成果是归属到营销推送成功时间计算（即已营销、营销成功、营销失败状态），如果在统计时间内出现多次推送多个成果的，以推送时间作为成果切割，最近一次推送时间之前的归入前面一次的成果，最近一次推送时间之后的归入本次推送”】',
        GIFTMARKET_CUSTOMER: '公式=每日被成功营销过客户统计',
        GIFTMARKET_ORDER_CUSTOMER: '公式=当日 被成功营销过并3天内有成果的用户数（成果指的是提醒后买家来评价了）<br/>【备注：因为客户从被营销到评价会有延迟，所以暂定延期统计3天内的评价，归入发送短信的日计算，所以3天内的数额始终会变化，“营销成功用户数是归属到营销推送成功时间计算（即已营销、营销成功、营销失败状态），如果在统计时间内出现多次推送多个成果的，以推送时间作为成果切割，最近一次推送时间之前的归入前面一次的成果，最近一次推送时间之后的归入本次推送”】'
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
