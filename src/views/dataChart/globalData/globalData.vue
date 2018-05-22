<template>
  <div>
    <!--头部-->
    <content-header :name="vm.taskName">
    </content-header>
    <!--数据基础组件-->
    <base-data-chart ref="baseDataChart" :menuListData="menuListData" :drawImg="drawImg" @getAllChartImg="getDataChartAll" :showLoading="showLoading">
      <template slot="mChart" scope="scope">
        <!--页卡下对应的图表组件-->
        <base-chart ref="baseChart" :getChartOption="scope.chartData.getChartOption" :getChartImgOption="getChartImgOption" chartId="chartId" :unit="scope.chartData.unit" name="" :data="scope.chartData.data"></base-chart>
      </template>
    </base-data-chart>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import baseChart from '../baseChart'
import baseDataChart from '../baseDataChart'
import echarts from 'echarts'
import utils from '../../../misc/utils'
export default {
  data() {
    return {
      vm: {
        taskName: '全局数据' // 模块名称
      },
      menuListData: [],
      chartName: '', // 当前表名称
      curMonthVal: '3month' // 当前检索月份
    }
  },
  computed: {
    ...mapGetters([
      'dataChartAllData' // 当前月份下的全局数据
    ])
  },
  watch: {
    // 当前路由监听
    $route() {
      // 只监听全局数据的路由
      if (this.$route.path === '/dataChart/globaldata') {
        this.showLoading() // 加载等待
        this.routeTo(this.$route.query.name) // 相应的页卡图表
      }
    },
    // 监听当前月份下的全局数据，有改动则重新渲染图表
    dataChartAllData(list) {
      // 绘制头部图片
      this.menuListData = list.map((k, index) => {
        k.img = this.drawImg(k.data, k.getChartOption, index)
        return k
      })
      // 获取当前页卡下的图表数据
      var obj = list.filter(o => {
        return o._title === this.$route.query.name
      })[0]
      // 加载
      this.$refs.baseDataChart.switchChartTab(obj)
    }
  },
  mounted() {
    // 获取当前月份下的全局数据
    this.getDataChartAll(this.curMonthVal)
    // 加载等待
    this.showLoading()
    // 默认左侧菜单选中
    this.updateCurSidebar(this.$route.query.name)
  },
  methods: {
    ...mapActions([
      'updateSiderbarActiveNode',
      'getDataChartAll'
    ]),
    // 默认左侧菜单选中
    updateCurSidebar(name) {
      this.updateSiderbarActiveNode({
        id: '',
        openName: this.vm.taskName,
        name: name
      })
    },
    // 路由跳转，从全局数据中筛选（根据title）加载相应图表数据
    routeTo(title) {
      this.showLoading()
      // 默认左侧菜单选中
      this.updateCurSidebar(this.$route.query.name)
      // 筛选
      var _item = this.dataChartAllData.filter(o => {
        return o._title === title
      })[0]
      // 加载
      this.$refs.baseDataChart.switchChartTab(_item)
    },
    // 加载等待
    showLoading() {
      this.$refs.baseChart.showLoading()
    },
    // 依次绘制头部菜单图片，返回相应图表图片（base64）
    drawImg(data, customOption, index) {
      // 调用子组件生成图表函数
      var imgUrl = this.$refs.baseChart.exportImg(data, customOption)
      // 第一次调用多调用一次（解决第一次加载无图片bug）
      if (index === 0) {
        imgUrl = this.$refs.baseChart.exportImg(data, customOption)
      }
      return imgUrl
    },
    // 默认重写图表样式函数
    getChartOption(data, splitNumber, name) {
    },
    // 头部菜单 配置echarts生成相应的图片
    getChartImgOption() {
      return {
        legend: false,
        backgroundColor: '#ffffff',
        grid: {
          left: 0,
          top: 0,
          bottom: 0,
          right: 0
        },
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        series: [{
          lineStyle: {
            normal: {
              width: 0.5
            }
          },
          symbol: 'none',
          smooth: true,
          itemStyle: {
            normal: {
              color: 'rgb(0, 153, 255)'
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0, 153, 255, 0.3)'
              }, {
                offset: 1,
                color: 'rgba(0, 153, 255, 0)'
              }])
            }
          }
        }, {
          lineStyle: {
            normal: {
              width: 0.5,
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)',
            }
          },
          symbol: 'none',
          smooth: true,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(114, 245, 161, 0.3)'
              }, {
                offset: 1,
                color: 'rgba(114, 245, 161, 0)'
              }])
            }
          }
        }]
      }
    }
  },
  components: {
    baseDataChart,
    baseChart
  }
}
</script>
<style lang="scss" scoped>

</style>
