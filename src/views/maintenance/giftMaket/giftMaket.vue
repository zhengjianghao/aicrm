<template>
<div>
  <marketing-header
    base="基于【礼品营销】模板"
    tip="设计理念：通过对老顾客购物次数的阶梯变化给予对应礼品或快递政策等，刺激反复复购"
  >
  </marketing-header>
  <div>
    <el-tabs @tab-click="activeSubCode" v-model="vm.activeName">
      <el-tab-pane :label="g_const.marketingResultTab[0].label" :name="g_const.marketingResultTab[0].name">
          <config-page></config-page>
      </el-tab-pane>
      <el-tab-pane :label="g_const.marketingResultTab[1].label" :name="g_const.marketingResultTab[1].name">
          <result-data></result-data>
      </el-tab-pane>
      <el-tab-pane :label="g_const.marketingResultTab[2].label" :name="g_const.marketingResultTab[2].name">
          <result-detail></result-detail>
      </el-tab-pane>
      <el-tab-pane :label="g_const.marketingResultTab[3].label" :name="g_const.marketingResultTab[3].name">
          <push-record></push-record>
      </el-tab-pane>
      <el-tab-pane :label="g_const.marketingResultTab[4].label" :name="g_const.marketingResultTab[4].name">
          <unsubscribe-record></unsubscribe-record>
      </el-tab-pane>
      <el-tab-pane v-if="jurisdictionData.allShow" :label="g_const.marketingResultTab[5].label" :name="g_const.marketingResultTab[5].name">
          <qianniu-task></qianniu-task>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import pushRecord from './pushRecord/pushRecord'
  import configPage from './config/config'
  import resultData from './resultData/resultData'
  import resultDetail from './resultDetail/resultDetail'
  import unsubscribeRecord from './unsubscribeRecord/unsubscribeRecord'
  import qianniuTask from './qianniuTask/qianniuTask'
  import g_const from '../../../misc/global.constant'
  export default {
    data() {
      return {
        vm: {
          activeName: g_const.activeCode.config
        },
        g_const: g_const,
      }
    },
    // 组件初次渲染时调用
    mounted() {
      this.init()
    },
    // 组件被激活时调用（组件应用keep-alive缓存）
    activated() {
      this.init()
    },
    // 在当前路由改变，但是该组件被复用(相同组件)时调用
    beforeRouteUpdate(to, from, next) {
      this.init()
      next()
    },
    computed: {
      ...mapGetters([
        'marketJobState',
        'immConfigData',
        'isSysMarketingjob',
        'jurisdictionData'
      ])
    },
    methods: {
      ...mapActions([
        'getActiveMenuCode',
        'getSubCode',
        'updateIsSysMarketingjob'
      ]),
      // 组件激活时调用
      init() {
        this.getActiveMenuCode(g_const.activeMenuCodes.maintenance)
        this.vm.activeName = g_const.activeCode.config
        this.getSubCode(g_const.activeCode.config)
      },
      activeSubCode(tab) {
        this.getSubCode(tab.name)
      }
    },
    components: {
      configPage,
      pushRecord,
      resultData,
      resultDetail,
      unsubscribeRecord,
      qianniuTask
    }
  }
</script>
<style lang="scss" scoped>

</style>
