<template>
  <div>
    <!--头部-->
    <content-header :name="vm.taskName">
    </content-header>
    <!--数据基础组件-->
    <base-data-chart ref="baseDataChart" @getAllChartImg="getDataChartAll" :showLoading="showLoading">
      <template slot="chartTab" scope="scope">
        <el-tabs @tab-click="switchChartTab" v-model="curChartName">
          <el-tab-pane label="复购地域" name="复购地域">
          </el-tab-pane>
          <el-tab-pane label="复购24小时下单分布" name="复购24小时下单分布">
          </el-tab-pane>
          <el-tab-pane label="复购24小时付款间隔分布" name="复购24小时付款间隔分布">
          </el-tab-pane>
          <el-tab-pane label="复购订单周期性分布" name="复购订单周期性分布">
          </el-tab-pane>
        </el-tabs>
      </template>
      <template slot="mChart" scope="scope">
        <!--<distribution-list></distribution-list>-->
        <!--<distribution-map :data="distributionMapData"></distribution-map>-->
        <div class="chartContainer">
          <component v-bind:is="curDialogView" :curMonth="curMonthVal"></component>
        </div>
      </template>
    </base-data-chart>

  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import echarts from 'echarts'
import utils from '../../../misc/utils'
import baseDataChart from '../baseDataChart'
// import distributionList from './distributionList.vue'
import moment from 'moment'
import dataTest from './dataTest'
import g_const from '../../../misc/global.constant'
import Vue from 'vue'
const distributionMap = Vue.component('distributionMap', function (resolve) {
  require(['./distributionMap'], resolve)
})
const distribution24hOrder = Vue.component('distribution24hOrder', function (resolve) {
  require(['./distribution24hOrder'], resolve)
})
const distribution24hInterval = Vue.component('distribution24hInterval', function (resolve) {
  require(['./distribution24hInterval'], resolve)
})
const distributionWeek = Vue.component('distributionWeek', function (resolve) {
  require(['./distributionWeek'], resolve)
})

export default {
  data() {
    return {
      vm: {
        taskName: '分布相关'
      },
      curChartName: '复购地域',
      curDialogView: 'distributionMap',
      distributionMapData: [],
      curMonthVal: '3month' // 当前检索月份
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  watch: {
    // 当前路由监听
    $route() {
      // 只监听全局数据的路由
      if (this.$route.path === '/dataChart/distribution') {
        this.routeTo(this.$route.query.name)
      }
    },
    // 监听当前月份下的全局数据，有改动则重新渲染图表
    levelChartAllData(list) {

    }
  },
  mounted() {
    // 加载等待
    this.showLoading()
    // 默认左侧菜单选中
    this.updateCurSidebar(this.$route.query.name)
    this.routeTo(this.$route.query.name)
  },
  methods: {
    ...mapActions([
      'updateSiderbarActiveNode'
    ]),
    loadChart(name) {
      switch(name) {
        case '复购地域':
          this.curDialogView = 'distributionMap'
        break;
        case '复购24小时下单分布':
          this.curDialogView = 'distribution24hOrder'
        break;
        case '复购24小时付款间隔分布':
          this.curDialogView = 'distribution24hInterval'
        break;
        case '复购订单周期性分布':
          this.curDialogView = 'distributionWeek'
        break;
      }
    },
    // 按月份查询表数据
    getDataChartAll(month) {
      // 按月份查询
      this.curMonthVal = this.curMonth
    },
    switchChartTab(tab) {
      this.loadChart(tab.name)
      // 默认左侧菜单选中
      this.updateCurSidebar(tab.name)
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
      this.curChartName = title
      this.loadChart(title)
      // 默认左侧菜单选中
      this.updateCurSidebar(title)
    },
    // 加载等待
    showLoading() {
    }
  },
  components: {
    baseDataChart
  }
}
</script>
<style lang="scss" scoped>
.chartContainer {
  overflow: hidden;
}
</style>
