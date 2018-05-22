<template>
  <div class="baseChart">
    <div class="_left">
      <base-distribution :data="dataBar24hInterval.data" chartId="chart1" :getChartOption="getChartOptionBar" :createOption="createOptionList" title=""></base-distribution>
    </div>
    <div class="_right">
      <base-distribution :data="dataPie24hInterval.data" chartId="chart2" :createOption="createOptionPie" title=""></base-distribution>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import baseDistribution from './baseDistribution'
import dataTest from './dataTest'
import service from './distributionMap.service'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      dataBar24hInterval: [],
      service: service
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  watch: {
    curMonthVal(val) {
      // 按月份查询数据
    }
  },
  mounted() {
    // 获取月份
    var _curMonth = this.curMonthVal
    // 按月份查询数据
    this.dataBar24hInterval = dataTest.data1.dataBar24hInterval
    this.dataPie24hInterval = dataTest.data1.dataPie24hInterval
  },
  methods: {
    ...mapActions([
    ]),
    createOptionList(data, title) {
      return this.service.createOptionList(data, title, ['下单-付款间隔(秒)', '订单数(个)'], this.dataBar24hInterval.maxNum)
    },
    createOptionPie(data, title) {
      return this.service.createOptionPie(data, title, ['下单-付款间隔(秒)', '订单数(个)'], this.dataPie24hInterval.maxNum)
    },
    getChartOptionBar(data) {
      return {
        grid: {
          height: 480,
          top: 5
        }
      }
    }
  },
  props: [
    'curMonthVal'
  ],
  components: {
    baseDistribution
  }
}
</script>
<style lang="scss" scoped>
.baseChart {
  ._left {
    width: 40%;
    float: left;
  }
  ._right {
    width: 60%;
    float: left;
  }
}
</style>
