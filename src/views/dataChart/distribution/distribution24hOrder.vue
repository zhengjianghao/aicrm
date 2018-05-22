<template>
  <div class="baseChart">
    <div class="_left">
      <base-distribution :data="data24hBar.data" chartId="chart1" :getChartOption="getChartOptionBar" :createOption="createOptionList" title=""></base-distribution>
    </div>
    <div class="_right">
      <base-distribution :data="data24hPie.data" chartId="chart2" :createOption="createOptionPie" title=""></base-distribution>
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
      data24hBar: [],
      data24hPie: [],
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
    this.data24hBar = dataTest.data1.dataBar24h
    this.data24hPie = dataTest.data1.dataPie24h
  },
  methods: {
    ...mapActions([
    ]),
    createOptionList(data, title) {
      return this.service.createOptionList(data, title, ['下单数(个)', '下单占比'], this.data24hBar.maxNum)
    },
    createOptionPie(data, title) {
      return this.service.createOptionPie(data, title, ['下单数(个)', '下单占比'], this.data24hPie.maxNum)
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
