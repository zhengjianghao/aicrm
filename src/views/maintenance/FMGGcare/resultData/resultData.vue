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
      g_const: g_const,
      marketingTypes: g_const.marketingFMGGcare,
      curUserTypeValue: g_const.marketingFMGGcare[0].name,
      taskId: '',
      tooltipContent: {
        FMGGCARE_ROI: '公式=当前营销活动在当日被营销后顾客7天内产出总金额/当前营销活动在当日的汇总投入总金额（短信、千牛、邮件均直接以单条的当前均价计算累加）<br/>【备注：因为客户从被营销到回购会有延迟，所以暂定延期统计7天内的回购，归入发送短信的日计算，所以7天内的数额始终会变化，产出金额以付款金额统计，退款等不影响，“营销成果是归属到营销推送成功时间计算（即已营销、营销成功、营销失败状态），如果在统计时间内出现多次推送多个成果的，以推送时间作为成果切割，最近一次推送时间之前的归入前面一次的成果，最近一次推送时间之后的归入本次推送”】',
        FMGGCARE_RATE: '公式=当日 被成功营销过并7天内有成果的用户数/当日被成功营销过的用户数（拍下即算，未付款、退款都不影响）<br/>【备注：因为客户从被营销到回购会有延迟，所以暂定延期统计7天内的回购，归入发送短信的日计算，所以7天内的数额始终会变化，“营销成果是归属到营销推送成功时间计算（即已营销、营销成功、营销失败状态），如果在统计时间内出现多次推送多个成果的，以推送时间作为成果切割，最近一次推送时间之前的归入前面一次的成果，最近一次推送时间之后的归入本次推送”】',
        FMGGCARE_CUSTOMER: '公式=每日 被成功营销过客户统计，（特别注意：指的是短信发送成功后的用户数，不是指推送用户数，因为推送会有失败的，同时要注意去重一个用户只算一次）',
        FMGGCARE_ORDER_CUSTOMER: '公式=当日 被成功营销过并7天内有成果的用户数（拍下即算，未付款、退款都不影响）<br/>【备注：因为客户从被营销到回购会有延迟，所以暂定延期统计7天内的回购，归入发送短信的日计算，所以7天内的数额始终会变化，“营销成功应户数是归属到营销推送成功时间计算（即已营销、营销成功、营销失败状态），如果在统计时间内出现多次推送多个成果的，以推送时间作为成果切割，最近一次推送时间之前的归入前面一次的成果，最近一次推送时间之后的归入本次推送”】',
        FMGGCARE_USER_PROPORTION: '公式=选定用户群内当日购买后90天内产生过复购的用户数（拍下即算，未付款、退款都不影响）/选定用户群内当日全部购物付款用户数（注意：每日都会有会员流转会不固定，只要当日内流转进来的就算上，流转出去的就减去）；每日按照0-24小时自然日计算，以付款时间为准，时效当日内，90天内复购的成功数据归入上次购物付款时间内'
      }
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
