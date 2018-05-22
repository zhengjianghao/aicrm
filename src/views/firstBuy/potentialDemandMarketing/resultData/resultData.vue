<template>
<div>
  <result-data
  :selRebuyTypeParam="selRebuyType"
  :marketingTypes="marketingTypes"
  :curUserTypeValue="curUserTypeValue"
  :resultSelStyle="{width: '190px'}"
  :tooltipContent='tooltipContent'
  :taskId="taskId"
  >
  </result-data>
</div>
</template>
<script type="text/ecmascript-6" scoped>
    import resultData from '../../../../components/resultData/resultData'
    import g_const from '../../../../misc/global.constant'
    export default {
        data() {
            return {
                selRebuyType: {value:'RATE_BUY', name:'复购用户占比'},
                marketingTypes: g_const.marketingTypesFirst,
                curUserTypeValue: g_const.marketingTypesFirst[0].name,
                taskId: '',
                tooltipContent: {
                    ROI: '公式=当前有营销活动在选定时间内的被营销顾客产出总金额/当前营销活动在选定时间内的汇总投入金额（短信、千牛、邮件均直接以单条的当前均价计算累加）<br/>【备注：因为客户从被营销到复购会有延迟，所以暂定延期统计7天内的回购，产出金额以付款金额统计，退款等不影响，营销成果是归属到营销推送成功时间计算（即已营销、营销成功、营销失败状态），如果在统计时间内出现多次推送多个成果的，以推送时间作为成果切割，最近一次推送时间之前的归入前面一次的成果，最近一次推送时间之后的归入本次推送】',
                    RATE: '公式=选定时间段内 被成功营销过并复购的用户数/被成功营销过的用户数（拍下即算，未付款、退款都不影响），（营销成果是归属到营销推送成功时间计算（即已营销、营销成功、营销失败状态），如果在统计时间内出现多次推送多个成果的，以推送时间作为成果切割，最近一次推送时间之前的归入前面一次的成果，最近一次推送时间之后的归入本次推送）',
                    MARKETING_CUSTOMER: '公式=选定时间段内 每日被成功营销过客户统计，（特别注意：指的是短信发送成功后的用户数，不是指推送用户数，因为推送会有失败的，同时要注意去重，一个用户只算一次）',
                    ORDER_CUSTOMER: '公式=选定时间段内 每日被成功营销过并复购的用户统计（拍下即算，未付款、退款都不影响），（营销成果是归属到营销推送成功时间计算（即已营销、营销成功、营销失败状态），如果在统计时间内出现多次推送多个成果的，以推送时间作为成果切割，最近一次推送时间之前的归入前面一次的成果，最近一次推送时间之后的归入本次推送）'
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

