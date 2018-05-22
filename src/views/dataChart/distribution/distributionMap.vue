<template>
  <div class="baseChart">
    <div class="_left">
      <base-distribution :data="dataBar.data" chartId="chart1" :waperStyle="waperStyle" :getChartOption="getChartOptionBar" :createOption="createOptionList" title="复购用户地区排行"></base-distribution>
    </div>
    <div class="_right">
      <base-distribution :data="dataMap.data" chartId="chart2" :createOption="createOptionMap" title="复购用户地域分布情况"></base-distribution>
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
      dataMap: [],
      dataBar: [],
      service: service,
      waperStyle: {
        height: '750px'
      }
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
    this.dataMap = dataTest.data1.data
    this.dataBar = dataTest.data1.dataBar
  },
  methods: {
    ...mapActions([
    ]),
    createOptionList(data, title) {
      return this.service.createOptionList(data, title, ['复购用户数(人)', '复购用户占比'], this.dataMap.maxNum)
    },
    createOptionMap(data, title) {
      return this.service.createOptionMap(data, title, ['复购用户数(人)', '复购用户占比'], this.dataBar.maxNum)
    },
    getChartOptionBar(data) {
      return {
        grid: {
          top: 40,
          height: 700
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
    width: 30%;
    float: left;
  }
  ._right {
    width: 60%;
    float: left;
  }
}
</style>
