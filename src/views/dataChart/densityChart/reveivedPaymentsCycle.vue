<template>
  <div>
    <base-chart ref="reveivedPaymentsCycleRef" :getChartOption="getChartOption" :isRewriteTooltip="true" baseChartId="reveivedPaymentsCycleId" :option="option" :data="reveivedPaymentsCycleData" @getData="getData">
      <template slot="title" scope="prop">
        {{ prop.title.text }}
      </template>
    </base-chart>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import baseChart from '../../../components/chart/baseChart'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      option: {
        title: {
          text: '回款周期分布密度图'
        },
        toolBox: {
          select1: {
            curSelVal: '1',
            data: [
              { label: '最近1个月', value: '1' },
              { label: '最近3个月', value: '3' }
            ]
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'reveivedPaymentsCycleData'
    ])
  },
  watch: {
    curChartName() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions([
      'getReveivedPaymentsCycle'
    ]),
    getData(month, val) {
      this.getReveivedPaymentsCycle([month, val])
    },
    getChartOption(data, val) {
      return {
        yAxis: [{
          name: '回款周期(天)'
        }]
      }
    },
    init() {
      if (this.curChartName === '回款周期') {
        this.$refs.reveivedPaymentsCycleRef.search()
      }
    }
  },
  components: {
    baseChart
  },
  props: [
    'curChartName'
  ]
}
</script>
<style lang="scss" scoped>

</style>
