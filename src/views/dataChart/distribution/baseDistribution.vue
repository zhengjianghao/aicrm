<template>
  <div class="chartWaper" :style="waperStyle">
    <div :id="chartId" v-loading="isLoading" :element-loading-text="processText" class="wrap"></div>
    <div class="noData" v-show="isEmpty">
      <span>暂无数据</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import echarts from 'echarts'
import chinaJson from '../../../misc/china.json'
import Immutable from 'immutable'
import service from './distributionMap.service'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      processText: '数据量较大请耐心等待',
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters([
    ]),
    isEmpty() {
      if (this.data) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    data() {
      this.drawChart(this.data)
    }
  },
  mounted() {
    this.drawChart(this.data)
  },
  methods: {
    ...mapActions([
    ]),
    showLoading() {
      this.isLoading = true
    },
    drawChart(data) {
      if (!data) {
        this.isLoading = false
        return
      }
      echarts.registerMap('china', chinaJson)
      var $chartImg = document.getElementById(this.chartId)
      var _baseChartImg = echarts.getInstanceByDom($chartImg)
      if (!_baseChartImg) {
        _baseChartImg = echarts.init($chartImg)
      }
      var _opt = this.createOption(data, this.title)
      var mapOptsF = Immutable.fromJS(this.getChartOption ? this.getChartOption(data) : {})
      var mapOptsT = Immutable.fromJS(_opt)
      var opts = mapOptsT.mergeDeep(mapOptsF).toJS()
      _baseChartImg.setOption(opts)
      this.isLoading = false
    }
  },
  props: [
    'chartId',
    'data',
    'getChartOption',
    'createOption',
    'title',
    'waperStyle'
  ]
}
</script>
<style lang="scss" scoped>
.chartWaper {
  margin: 10px 0;
  padding-bottom: 10px;
  height: 650px;
  position: relative;
  .wrap {
    height: 100%;
  }
  .noData {
    position: absolute;
    top: 200px;
    width: 100%;
    color: #ffffff;
    text-align: center;
  }
}
</style>
