<template>
  <div>
    <div class="title">
      <div class="title_content">
        <div class="remind">
          <h3 class="subTitleColor">
            <span class="iconfont icon-tasks"></span>
            <span>
              {{vm.taskName}}
            </span>
            <a class="link" @click="openModal(vm.taskName)">
              <span class="iconfont icon-pen" v-show="!isSysMarketingjob"></span>
            </a>
          </h3>
          <div class="hint-main" style="text-indent: 26px">
            提醒：此项不建议与【拍下即时营销】同时开启，因为信息密度过大会影响买家体验 ^_^
          </div>
        </div>
      </div>
      <div class="switch-wraper">
        <switch-big :initValue="vm.initValue"></switch-big>
      </div>
    </div>
    <div>
      <el-tabs @tab-click="activeSubCode" v-model="vm.activeName">
        <el-tab-pane label="配置" name="defenseConfig">
          <config-page></config-page>
        </el-tab-pane>
        <el-tab-pane label="效果数据" name="defenseResultData">
          <result-data></result-data>
        </el-tab-pane>
        <el-tab-pane label="成果详单" name="defenseResultDetail">
          <result-detail></result-detail>
        </el-tab-pane>
        <el-tab-pane label="推送记录" name="defensePushRecord">
          <push-record></push-record>
        </el-tab-pane>
        <el-tab-pane label="退订记录" name="unsubscribeRecord">
          <unsubscribe-record></unsubscribe-record>
        </el-tab-pane>
        <el-tab-pane label="千牛任务" name="qianniuTask">
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
        activeName: this.g_const.activeCode.defenseConfig,
        taskName: '购买A和其他',
        initValue: {
          type: 'market',
          state: false
        }
      },
      conf: {}
    }
  },
  mounted() {
    this.getActiveMenuCode(this.g_const.activeMenuCodes.home)
    this.getSubCode(this.g_const.activeCode.defenseConfig)
  },
  // 组件被激活时调用（组件应用keep-alive缓存）
  activated() {
    this.getActiveMenuCode(g_const.activeMenuCodes.home)
    this.vm.activeName = g_const.activeCode.config
  },
  // 在当前路由改变，但是该组件被复用(相同组件)时调用
  beforeRouteUpdate(to, from, next) {
    this.getActiveMenuCode(g_const.activeMenuCodes.home)
    this.vm.activeName = g_const.activeCode.config
    next()
  },
  computed: {
    ...mapGetters([
      'marketJobState',
      'immConfigData',
      'isSysMarketingjob'
    ])
  },
  watch: {
    immConfigData() {
      var data = this.immConfigData
      // 是否是系统模板
      var isSys = data.type === g_const.marketTemplateType.PAYED_P4P_SYS
      this.updateIsSysMarketingjob(isSys)
      // 任务名称
      this.vm.taskName = '' + data.title
      // 任务是否开启
      this.vm.initValue = {
        type: 'market',
        state: data.status === g_const.marketingState.OPEN ? true : false,
        id: data.id
      }
      // 打开相应的左侧菜单
      var group = isSys ? '即时营销' : '自定义'
      this.updateSiderbarActiveNode({
        id: this.immConfigData.id,
        openName: group
      })
    }
  },
  methods: {
    ...mapActions([
      'getActiveMenuCode',
      'getSubCode',
      'updateOpenModal',
      'updateSiderbarActiveNode',
      'updateIsSysMarketingjob'
    ]),
    activeSubCode(tab) {
      this.getSubCode(tab.name);
    },
    openModal(name) {
      this.updateOpenModal({
        name: this.g_const.openModalCodes.editMarketingName,
        param: {
          taskName: name,
          from: 'imm'
        }
      })
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
