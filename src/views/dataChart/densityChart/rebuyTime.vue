<template>
  <div>
    <base-chart ref="baseChartRef" baseChartId="chartId" :getChartOption="getChartOption" :isRewriteTooltip="true" :option="option" :data="rebuyTimeData" @getData="getData">
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
          text: '复购时间分布密度图'
        },
        toolBox: {
          select1: {
            curSelVal: '1',
            data: [
              { label: '最近1周', value: '1' },
              { label: '最近2周', value: '2' },
              { label: '最近4周', value: '4' }
            ]
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'rebuyTimeData'
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
      'getRebuyTime'
    ]),
    getData(month, val) {
      this.getRebuyTime([month, val])
    },
    getChartOption(data, val) {
      return {
        yAxis: [{
          name: '复购时间点(24H)'
        }]
      }
    },
    init() {
      if (this.curChartName === '复购时间') {
        this.$refs.baseChartRef.search()
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
