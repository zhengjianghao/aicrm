<template>
<div>
  <result-data
  :selRebuyTypeParam="selRebuyType"
  :marketingTypes="marketingTypes"
  :resultSelStyle="{width: '190px'}"
  :curUserTypeValue="curUserTypeValue"
  :taskId="taskId"
  :isEffect='true'
  :tooltipContentT="tooltipContentT"
  :tooltipContent="tooltipContent"
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
                g_const: g_const,
                selRebuyType: {value:'POTEN_RESULTS_SALES', name:'成果销售额'},
                marketingTypes: g_const.marketingTypesByEffectPon,
                curUserTypeValue: g_const.marketingTypesByEffectPon[0].name,
                taskId: '',
                tooltipContentT: '公式=被营销后顾客7天内内拍下付款并最终交易成功金额累加,以日为单位【备注：产出金额以交易成功状态为准,扣除退款:时间归入以交易成功订单确认时间为准】',
                tooltipContent: {
                    SERIVICE: '公式=每日服务费累加【备注：产出金额以交易成功状态为准,扣除退款;时间归入以交易成功订单确认时间为准】'
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
