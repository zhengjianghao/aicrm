<template>
<div>
  <result-data
  :marketingTypes="marketingTypes"
  :resultSelStyle="{width: '190px'}"
  :curUserTypeValue="curUserTypeValue"
  :tooltipContent='tooltipContent'
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
                marketingTypes: g_const.marketingAletter,
                curUserTypeValue: g_const.marketingAletter[0].name,
                tooltipContent: {
                    ALETTER_RATE: '公式=当日 被成功营销过并30天内有成果的用户数/当日被成功营销过的用户数（拍下即算，未付款、退款都不影响）<br/>【备注：因为客户从被营销到回购会有延迟，所以暂定延期统计30天内的回购，归入发送短信的日计算，所以30天内的数额始终会变化，“营销成果是归属到营销推送成功时间计算（即已营销、营销成功、营销失败状态），如果在统计时间内出现多次推送多个成果的，以推送时间作为成果切割，最近一次推送时间之前的归入前面一次的成果，最近一次推送时间之后的归入本次推送”】',
                    ALETTER_CUSTOMER: '公式=每日 被成功营销过客户统计',
                    ALETTER_ORDER_CUSTOMER: '公式=当日 被成功营销过并30天内有成果的用户数（拍下即算，未付款、退款都不影响）<br/>【备注：因为客户从被营销到回购会有延迟，所以暂定延期统计30天内的回购，归入发送短信的日计算，所以30天内的数额始终会变化，“营销成功应户数是归属到营销推送成功时间计算（即已营销、营销成功、营销失败状态），如果在统计时间内出现多次推送多个成果的，以推送时间作为成果切割，最近一次推送时间之前的归入前面一次的成果，最近一次推送时间之后的归入本次推送”】'
                }
            }
        },
        methods: {

        },
        components: {
          resultData
        }
    }
</script>
<style lang="scss" scoped>

</style>
