<template>
<div>
    <marketing-header
      base="基于【追评提醒】模板"
      tip="设计理念：提醒买家进行评价，帮助店铺积累用户评语，同时以此为锲机，买家确认后即进入维护阶段，借助尽可能多的合适机会保持与买家的联系，让买家对店铺始终保有印象，为下一次复购打下良好的基础"
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
      <el-tab-pane :label="g_const.marketingResultTab[5].label" :name="g_const.marketingResultTab[5].name" v-if="jurisdictionData.allShow">
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
  import utils from '../../../misc/utils'
  import g_const from '../../../misc/global.constant'
  export default {
    data() {
      return {
        vm: {
          activeName: g_const.activeCode.config,
        },
        g_const: g_const,
        utils: utils
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
        'immConfigData',
        'isSysMarketingjob',
        'jurisdictionData',
        'userData'
      ])
    },
    methods: {
      ...mapActions([
        'getActiveMenuCode',
        'getSubCode',
        'updateOpenModal',
        'updateSiderbarActiveNode',
        'updateIsSysMarketingjob'
      ]),
      // 组件激活时调用
      init() {
        // this.taskId = this.$route.query.id
        this.getActiveMenuCode(g_const.activeMenuCodes.care)
        this.vm.activeName = g_const.activeCode.config
        this.getSubCode(g_const.activeCode.config)
      },
      activeSubCode(tab) {
        this.getSubCode(tab.name);
      },
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
  ._align {
      margin-left: 76px;
  }
  .sub_main_content .title_align {
    padding-left: 94px;
  }

.el-checkbox__input {
  font-size: 14px;
}
.Dad {
  font-size: 12px;
  color: #fff;
  margin-right: 16px;
}
</style>
