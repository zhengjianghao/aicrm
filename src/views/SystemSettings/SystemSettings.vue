<template>
  <div class="user_tabs">
    <el-tabs @tab-click="activeSubCode" v-model="vm.activeName">
      <el-tab-pane label="测试号码" name="testPhoneNumber">
      </el-tab-pane>
      <el-tab-pane label="发送明细" name="sendDetail">
      </el-tab-pane>
      <el-tab-pane label="宝贝设置" name="projectSetting">
      </el-tab-pane>
      <el-tab-pane label="全局设置" name="globalSetting">
      </el-tab-pane>
      <el-tab-pane label="账号信息" name="settingsCenter">
      </el-tab-pane>
      <el-tab-pane label="导入历史记录" name="importModal">
        <span slot="label">
          <!--特殊期间可以禁用导入功能-->
          <!--<el-tooltip :value='isToolShow'  content='暂未开放' placement="top" popper-class='tool_notes' effect="dark">-->
            <!--<span @mouseleave="isToolShow = false" @mouseenter="isToolShow = true">导入历史记录</span>-->
          <!--</el-tooltip>-->
          <span>导入历史记录</span>
        </span>
      </el-tab-pane>
    </el-tabs>
    <component v-bind:is="currentView">
    </component>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import g_const from '../../misc/global.constant'
import utils from '../../misc/utils'
import testPhoneNumber from './testPhoneNumber'
import globalSettings from './globalSettings'
import productSettings from './productSettings'
import sendDetail from '../message/sendDetail'

export default {
  data() {
    return {
      vm: {
        activeName: 'testPhoneNumber',
        activeTabName: '',
        initValue: true
      },
      isToolShow: false,
      currentView: testPhoneNumber,
      utils: utils
    }
  },
  watch: {
    openModalState() {
      this.init()
    },
    subState() {
      if (this.subState === 'globalSetting') {
        this.getSettingGlobal()
      }
    }

  },
  computed: {
    ...mapGetters([
      'openModalState',
      'subState',
      'userData',
      'jurisdictionData'
    ])
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions([
      'getSubCode',
      'updateOpenModal',
      'getSettingContact',
      'getSettingGlobal',
      'getGoods'
    ]),
    init() {
      if (this.openModalState.name === g_const.openModalCodes.systemConfig) {
        if (this.openModalState.param.state === 'globalSetting') {
          this.vm.activeName = 'globalSetting'
          this.getSubCode('globalSetting')
          this.currentView = globalSettings
        } else if(this.openModalState.param.state === 'projectSetting') {
          this.vm.activeName = 'projectSetting'
          this.getSubCode('projectSetting')
          this.currentView = productSettings
        } else {
          this.vm.activeName = 'testPhoneNumber'
          this.getSubCode('testPhoneNumber')
          this.currentView = testPhoneNumber
        }
      }
    },
    activeSubCode(tab) {
      this.getSubCode(tab.name)
      if (tab.name === 'importModal') {
        tab.state = 'close'
        this.openModal(tab)
      } else if (tab.name === 'settingsCenter') {
        this.getSettingContact()
        tab.state = 'close'
        this.openModal(tab)
      } else if (tab.name === 'testPhoneNumber') {
        this.currentView = testPhoneNumber
      } else if (tab.name === 'sendDetail') {
        this.currentView = sendDetail
      } else if (tab.name === 'projectSetting') {
        this.currentView = productSettings
      } else if (tab.name === 'globalSetting') {
        this.currentView = globalSettings
      }
    },
    openModal(code) {
      this.updateOpenModal({
        name: code.name,
        param: {
          state: code.state
        }
      })
    },
  },
  components: {
    testPhoneNumber,
    globalSettings,
    productSettings,
    sendDetail
  }
}
</script>
<style lang="scss">
</style>
