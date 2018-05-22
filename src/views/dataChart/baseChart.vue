<template>
  <div class="chartWaper">
    <div :id="chartId" v-loading="isLoading" :element-loading-text="processText" class="wrap"></div>
    <div id="baseChartImg" class="wrap"></div>
    <div class="noData" v-show="isEmpty">
      <span>暂无数据</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import service from './baseChartService'
import chartHelper from '../../misc/chartHelper'
import echarts from 'echarts'
import Immutable from 'immutable'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      processText: '数据量较大请耐心等待',
      isLoading: false,
      baseChartDiv: {},
      baseChartImg: {}
    }
  },
  computed: {
    ...mapGetters([
    ]),
    isEmpty() {
      // if (this.data && this.data.category && this.data.category.length > 0) {
      if (this.data) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    data() {
      var that = this
      that.drawChart(this.data)
    }
  },
  mounted() {
    this.baseChartDiv = echarts.init(document.getElementById(this.chartId))
    // this.baseChartImg = echarts.init(document.getElementById('baseChartImg'))
    chartHelper.autoSize(this.baseChartDiv)
  },
  methods: {
    ...mapActions([
    ]),
    showLoading() {
      this.isLoading = true
    },
    drawChart(data) {
      if(data.length === 0) {
        this.isLoading = false
        return
      }
      var _opt = service.createOption(data, 12, this.name, this.unit, this.title)
      var mapOptsF = Immutable.fromJS(this.getChartOption ? this.getChartOption(data, 12, this.name, this.unit) : {})
      var mapOptsT = Immutable.fromJS(_opt)
      var opts = mapOptsT.mergeDeep(mapOptsF).toJS()
      this.baseChartDiv.setOption(opts)
      this.isLoading = false
    },
    exportImg(data, customOption) {
      var _container = document.getElementById('baseChartImg')
      var _opt = service.createOption(data, 12, this.name, this.unit)
      var _chartOption = customOption ? customOption : this.getChartOption
      var mapOptsF = Immutable.fromJS(_chartOption ? _chartOption(data, 12, this.name, this.unit) : {})
      var mapOptsT = Immutable.fromJS(_opt)
      var mapOptsImg = Immutable.fromJS(this.getChartImgOption())
      var opts = mapOptsT.mergeDeep(mapOptsF).mergeDeep(mapOptsImg).toJS()
      var $chartImg = document.getElementById('baseChartImg')
      var _baseChartImg = echarts.getInstanceByDom($chartImg)
      if(!_baseChartImg) {
        _baseChartImg = echarts.init($chartImg)
      }
      _baseChartImg.setOption(opts)
      _container.style.display = 'block'
      var exportImgUrl = _baseChartImg.getDataURL()
      _container.style.display = 'none'
      return exportImgUrl
    }
  },
  props: [
    'data',
    'name',
    'unit',
    'title',
    'getChartOption',
    'getChartImgOption',
    'chartId',
  ]
}
</script>
<style lang="scss" scoped>
.chartWaper {
  margin: 10px 0;
  height: 450px;
  position: relative;
  .wrap {
    height: 100%;
  }
  .noData {
    position: absolute;
    top: 200px;
    width: 100%;
    color: #5e7982;
    text-align: center;
  }
}
</style>
