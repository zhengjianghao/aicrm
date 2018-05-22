<template>
  <div class="baseChart">
    <div class="_left">
      <base-distribution :data="dataBarWeek.data" chartId="chart1" :getChartOption="getChartOptionBar" :createOption="createOptionList" title=""></base-distribution>
    </div>
    <div class="_right">
      <base-distribution :data="dataPieWeek.data" chartId="chart2" :getChartOption="getChartOptionPie" :createOption="createOptionPie" title=""></base-distribution>
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
      dataBarWeek: [],
      dataPieWeek: [],
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
    this.dataBarWeek = dataTest.data1.dataBarWeek
    this.dataPieWeek = dataTest.data1.dataPieWeek
  },
  methods: {
    ...mapActions([
    ]),
    createOptionList(data, title) {
      return this.service.createOptionList(data, title, ['订单数(个)', '订单占比'], this.dataBarWeek.maxNum)
    },
    createOptionPie(data, title) {
      return this.service.createOptionPie(data, title, ['订单数(个)', '订单占比'], this.dataPieWeek.maxNum)
    },
    getChartOptionBar(data) {
      return {
        grid: {
          height: 130,
          top: 5,
        }
      }
    },
    getChartOptionPie(data) {
      return {
        series: [
          {},
          {
            splitNumber: 7,
            max: 7
          },
          {
            splitNumber: 7,
            max: 7,
            startAngle: 115.6,
            endAngle: 475.5,
            axisLabel: {
              formatter: function (v) {
                var ret = ''
                switch(v) {
                  case 1:
                    ret = '周一'
                    break;
                  case 2:
                    ret = '周二'
                    break;
                  case 3:
                    ret = '周三'
                    break;
                  case 4:
                    ret = '周四'
                    break;
                  case 5:
                    ret = '周五'
                    break;
                  case 6:
                    ret = '周六'
                    break;
                  case 7:
                    ret = '周日'
                    break;
                  default:
                    ret = ''
                }
                return  ret
              }
            }
          }
        ]
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
