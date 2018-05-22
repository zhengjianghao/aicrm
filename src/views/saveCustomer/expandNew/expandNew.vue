<template>
  <div>
    <marketing-header base="基于【延伸型新品】模板" tip="设计理念：喜新厌旧是人的本性，尤其当前的人的整体生活水平提高，对于新品的喜好更加突出，店铺实际有新品但碍于竞争或版面限制，无法有效传递给买家这是莫大的悲哀，通过此专用通道针对性的推送给需要的买家，既可以留住买家又可以推送新品增长，一箭双雕" remind='提醒：延伸型指产品之间具有延伸性质，比如微波炉是冰箱的延伸型'>
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
import { mapGetters, mapActions } from 'vuex'
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
        activeName: g_const.activeCode.config
      },
      g_const: g_const,
      utils: utils
    }
  },
  mounted() {
    this.getActiveMenuCode(this.g_const.activeMenuCodes.saveCustomer)
    this.getSubCode(this.g_const.activeCode.defenseConfig)
  },
  // 组件被激活时调用（组件应用keep-alive缓存）
    activated() {
      this.getActiveMenuCode(g_const.activeMenuCodes.saveCustomer)
      this.vm.activeName = g_const.activeCode.config
    },
    // 在当前路由改变，但是该组件被复用(相同组件)时调用
    beforeRouteUpdate(to, from, next) {
      this.getActiveMenuCode(g_const.activeMenuCodes.saveCustomer)
      this.vm.activeName = g_const.activeCode.config
      next()
    },
  computed: {
    ...mapGetters([
      'jurisdictionData'
    ])
  },
  watch: {

  },
  methods: {
    ...mapActions([
      'getActiveMenuCode',
      'getSubCode'
    ]),
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

</style>
