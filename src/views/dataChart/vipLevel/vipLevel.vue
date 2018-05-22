<template>
  <div>
    <!--头部-->
    <content-header :name="vm.taskName">
    </content-header>
    <!--数据基础组件-->
    <base-data-chart ref="baseDataChart" :menuListData="menuListData" @getAllChartImg="getLevelChartAll" :showLoading="showLoadingAll">
      <template slot="mChart" scope="scope">
        <!--页卡下对应的图表组件-->
        <summary-list v-show="isShowSummary(scope.chartData.name)" tableTitle="AI智能分组" :data="!isShowSummary(scope.chartData.name) ? [] : scope.chartData.data.ai"></summary-list>
        <summary-list v-show="isShowSummary(scope.chartData.name)" tableTitle="CRM内会员等级" :data="!isShowSummary(scope.chartData.name) ? [] : scope.chartData.data.crm"></summary-list>
        <base-chart ref="baseChart" v-show="!isShowSummary(scope.chartData.name)" title="AI智能分组" :getChartOption="scope.chartData.getChartOption" :getChartImgOption="getChartImgOption" chartId="chartId" :unit="scope.chartData.unit" name="" :data="isShowSummary(scope.chartData.name) ? [] : scope.chartData.data.ai">
        </base-chart>
        <base-chart ref="baseChart2" v-show="!isShowSummary(scope.chartData.name)" title="CRM内会员等级" :getChartOption="scope.chartData.getChartOption" :getChartImgOption="getChartImgOption" chartId="chartId2" :unit="scope.chartData.unit" name="" :data="isShowSummary(scope.chartData.name) ? [] : scope.chartData.data.crm">
        </base-chart>
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
import summaryList from './summary.vue'
import moment from 'moment'
import g_const from '../../../misc/global.constant'
export default {
  data() {
    return {
      vm: {
        taskName: '会员等级'
      },
      chartName: '',
      menuListData: [],
      curMonthVal: '3month' // 当前检索月份
    }
  },
  computed: {
    ...mapGetters([
      'levelChartAllData' // 当前月份下的会员等级数据
    ])

  },
  watch: {
    // 当前路由监听
    $route() {
      // 只监听全局数据的路由
      if (this.$route.path === '/dataChart/vipLevel') {
        this.routeTo(this.$route.query.name)
      }
    },
    // 监听当前月份下的全局数据，有改动则重新渲染图表
    levelChartAllData(list) {
      // 绘制头部图片
      this.menuListData = list.map((k, index) => {
        k.img = this.drawImg(k.data, k.getChartOption, index)
        return k
      })
      // 获取当前页卡下的图表数据
      var obj = list.filter(o => {
        return o.title === this.$route.query.name
      })[0]
      // 加载
      this.$refs.baseDataChart.switchChartTab(obj)
    }
  },
  mounted() {
    // 获取当前月份下的全局数据
    this.getLevelChartAll(this.curMonthVal)
    // 加载等待
    this.showLoading()
    // 默认左侧菜单选中
    this.updateCurSidebar(this.$route.query.name)
  },
  methods: {
    ...mapActions([
      'updateSiderbarActiveNode',
      'getLevelChartAll'
    ]),
    showLoadingAll() {
      this.showLoading()
      this.showLoading2()
    },
    isShowSummary(name) {
      return name === 'summary'
    },
    // 默认左侧菜单选中
    updateCurSidebar(name) {
      this.updateSiderbarActiveNode({
        id: '',
        openName: this.vm.taskName,
        name: name
      })
    },
    // 左侧菜单切换，加载相应的图表
    routeTo(title) {
      this.showLoadingAll()
      // 默认左侧菜单选中
      this.updateCurSidebar(this.$route.query.name)
      // 筛选
      var _item = this.levelChartAllData.filter(o => {
        return o.title === title
      })[0]
      // 加载
      this.$refs.baseDataChart.switchChartTab(_item)
    },
    // 表1加载等待
    showLoading() {
      this.$refs.baseChart.showLoading()
    },
    // 表2加载等待
    showLoading2() {
      this.$refs.baseChart2.showLoading()
    },
    // 依次绘制头部菜单图片，返回相应图表图片（base64）
    drawImg(data, customOption, index) {
      if (index === 0) return ''
      // 调用子组件生成图表函数
      var imgUrl = this.$refs.baseChart.exportImg(data.ai, customOption)
      // 第一次调用多调用一次（解决第一次加载无图片bug）
      if (index === 1) {
        imgUrl = this.$refs.baseChart.exportImg(data.ai, customOption)
      }
      return imgUrl
    },
    // 头部菜单 配置echarts生成相应的图片
    getChartImgOption() {
      return {
        backgroundColor: '#ffffff',
        grid: {
          left: 0,
          top: 0,
          bottom: 10,
          right: 0
        },
        legend: false,
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        }
      }
    }
  },
  components: {
    baseDataChart,
    baseChart,
    summaryList
  }
}
</script>
<style lang="scss" scoped>

</style>
