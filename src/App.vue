<template>
  <div style="height:100%">
    <div class='container'>
      <div class="left">
        <sider-bar></sider-bar>
      </div>
      <div class="mainContent">
        <div class="header_wraper">
          <header-bar class="fixed"></header-bar>
        </div>
        <keep-alive>
          <router-view class="content" v-if="$route.meta.keepAlive">
          </router-view>
        </keep-alive>
        <router-view class="content" v-if="!$route.meta.keepAlive">
        </router-view>
      </div>
      <!-- 弹出层 -->
      <el-dialog id='importBox' :top="dialogTop" :title="dialogTitle" v-model="showDialog" :custom-class="dialogClassName" :close-on-click-modal="closeOnClick" :show-close="showClose" :close-on-press-escape="closeOnPressEsc" @close="closeDialog">
        <component v-bind:is="curDialogView"></component>
      </el-dialog>
      <el-dialog top="20px" title="发送测试短信" v-model="showTestSendMessage" custom-class="testSendMessage" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="true">
        <test-send-message></test-send-message>
      </el-dialog>
      <el-dialog top="20px" title="选择宝贝" v-model="showChooseGoods" :custom-class="curChoooseView" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="true">
        <component v-bind:is="curChoooseView"></component>
      </el-dialog>
      <el-dialog title="修改任务名称" v-model="showTaskRename" custom-class="taskRename" :close-on-click-modal="false" :close-on-press-escape="false">
        <task-rename></task-rename>
      </el-dialog>
      <el-dialog title="另存为自定义营销" v-model="showTaskSaveAs" custom-class="taskSaveAs" :close-on-click-modal="false" :close-on-press-escape="false">
        <task-save-as></task-save-as>
      </el-dialog>
      <el-dialog title="会员详情" v-model="showMemberDetails" custom-class="memberDetails" :close-on-click-modal="false" :close-on-press-escape="false">
        <member-details :id="buyerId" ref='memberDetails'>
        </member-details>
      </el-dialog>
      <el-dialog title="添加灰名单" v-model="showGreyList" custom-class="greyList" :close-on-click-modal="false" :close-on-press-escape="false" @close="closeModal('greyList')">
        <grey-list-add></grey-list-add>
      </el-dialog>
      <el-dialog title="添加黑名单" v-model="showBlackList" custom-class="blackList" :close-on-click-modal="false" :close-on-press-escape="false" @close="closeModal('blackList')">
        <black-list-add></black-list-add>
      </el-dialog>
      <el-dialog title="营销本组会员" v-model="showMarketGroup" custom-class="marketGroup" :close-on-click-modal="false" :close-on-press-escape="false">
        <market-group></market-group>
      </el-dialog>
      <el-dialog title="新建营销分组" v-model="showCreateMarketGroup" top="0" custom-class="createMarketGroup" :close-on-click-modal="false" :close-on-press-escape="false">
        <create-market-group></create-market-group>
      </el-dialog>
      <!-- 合并订单中的速发短信 -->
      <el-dialog title="发送短信" v-model="showMaergeSendMessage" custom-class="maergeSendMessage" :close-on-click-modal="false" size="70%" :close-on-press-escape="false" :show-close="true" @close="closeDialogQuickSendMessage">
        <maerge-send-message></maerge-send-message>
      </el-dialog>
      <!-- 页面头部 速发短信 -->
      <el-dialog title="速发短信" v-model="showQuickSendMessage" custom-class="quickSendMessage" :close-on-click-modal="false" size="70%" :close-on-press-escape="false" :show-close="true" @close="closeDialogQuickSendMessage">
        <quick-send-message v-if="isRenderQuickSendMessage"></quick-send-message>
      </el-dialog>
      <!--购买场景-->
      <el-dialog title="扩展场景" v-model="showBuyMarketingJob" custom-class="buyMarketingJob" :close-on-click-modal="false" size="70%" :close-on-press-escape="false" :show-close="true">
        <buy-marketing-job :activeChild="activeName"></buy-marketing-job>
      </el-dialog>
      <!--付款方式-->
      <el-dialog title="付款订单" v-model="showPayOrder" custom-class="payOrder" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="true">
        <pay-order></pay-order>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import headerBar from 'components/header/header'
import siderBar from 'components/siderbar/siderbar'
import * as TYPE from './vuex/type.constant'
import store from './vuex/store'
import _g from './misc/global.constant'
import utils from './misc/utils'
const msgConfig = Vue.component('msgConfig', function(resolve) {
  require(['./views/message/message'], resolve)
})
const systemConfig = Vue.component('systemConfig', function(resolve) {
  require(['./views/SystemSettings/SystemSettings'], resolve)
})
const importModal = Vue.component('importModal', function(resolve) {
  require(['./views/importOrder/importOrder'], resolve)
})
const messageTemplate = Vue.component('messageTemplate', function(resolve) {
  require(['./views/message/messageTemplate'], resolve)
})
const settingsCenter = Vue.component('settingsCenter', function(resolve) {
  require(['./views/SystemSettings/settingsCenter'], resolve)
})
const testSendMessage = Vue.component('testSendMessage', function(resolve) {
  require(['./views/message/testSendMessage'], resolve)
})
const chooseGoods = Vue.component('chooseGoods', function(resolve) {
  require(['./components/chooseGoods/chooseGoods'], resolve)
})
const chooseGoodsLevel = Vue.component('chooseGoodsLevel', function(resolve) {
  require(['./components/chooseGoods/chooseGoodsLevel'], resolve)
})
const maergeSendMessage = Vue.component('maergeSendMessage', function(resolve) {
  require(['./components/maergeSendMessage/maergeSendMessage'], resolve)
})
const quickSendMessage = Vue.component('quickSendMessage', function(resolve) {
  require(['./components/maergeSendMessage/sendMessageQuick'], resolve)
})
const buyMarketingJob = Vue.component('buyMarketingJob', function(resolve) {
  require(['./views/message/buyMarketingJob'], resolve)
})
const payOrder = Vue.component('payOrder', function(resolve) {
  require(['./components/bouncedBox/payOrder'], resolve)
})

import taskRename from './components/taskRename/taskRename'
import taskSaveAs from './components/TaskSaveAs.vue'
import marketGroup from './components/marketGroup.vue'
import memberDetails from './views/memberManage/memberDetails/memberDetails.vue'
import blackListAdd from './components/list/blackListAdd'
import greyListAdd from './components/list/greyListAdd'
import createMarketGroup from './components/search/createMarketGroup'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      curDialogView: {},
      dialogClassName: '',
      closeOnClick: false,
      dialogTop: '',
      closeOnPressEsc: true,
      dialogTitle: '',
      showDialog: false,
      showClose: true,
      showTestSendMessage: false,
      showChooseGoods: false,
      showTaskRename: false,
      showTaskSaveAs: false,
      showMemberDetails: false,
      showGreyList: false,
      showBlackList: false,
      showMarketGroup: false,
      showCreateMarketGroup: false,
      showMaergeSendMessage: false,
      showQuickSendMessage: false, // 打开速发短信弹框
      isRenderQuickSendMessage: false, // 开始渲染速发短信组件
      showBuyMarketingJob: false, //扩展场景
      showPayOrder: false,  // 付款订单
      curChoooseView: '',
      selGoods: [],
      eleName: '',
      marketType: '',
      buyerId: '',  // 卖家id 会员详情
      loadingTest: 'loading-test',
      activeName: []
    }
  },
  computed: {
    ...mapGetters([
      'openModalState',
      'importOrderData',
      'closeModalName',
      'settingContact',
      'setCenterAlreadyState',
      'userData',
      'processData',
      'memberGroupData'
    ]),
    // 判断用户是否设置账号信息
    isGuide() {
      return this.settingContact.ADMIN_NAME === '' ? false : true
    }
  },
  watch: {
    // 用户数据加载完成后执行
    userData() {
      // 检测一些信息是否需要显示
      this.checkMessage()
    },
    // 打开弹出框 通用
    openModalState() {
      var _self = this
      this.initDialog()
      if (this.openModalState.name === _g.openModalCodes.msgConfig) { // 短信充值
        this.dialogTitle = '短信相关设置'
        this.dialogClassName = 'messageModal'
        this.showDialog = true
        this.curDialogView = _g.openModalCodes.msgConfig
      } else if (this.openModalState.name === _g.openModalCodes.systemConfig) { // 系统设置
        this.dialogTitle = '系统设置'
        this.dialogClassName = 'systemModal'
        this.showDialog = true
        this.curDialogView = _g.openModalCodes.systemConfig
        if (this.openModalState.param.state === 'close') {
          this.showDialog = false
        }
      } else if (this.openModalState.name === _g.openModalCodes.importModal) { // 导入历史订单
        this.openImportDialog()
      } else if (this.openModalState.name === _g.openModalCodes.messageTemplate) { // 短信模板参考
        this.dialogTitle = '参考模板'
        this.dialogClassName = 'messageTemplate'
        this.showDialog = true
        this.curDialogView = _g.openModalCodes.messageTemplate
      } else if (this.openModalState.name === _g.openModalCodes.settingsCenter) { // 设置中心
        if (this.openModalState.param.state === 'close') {
          this.openSettingCenter()
        } else if (_self.openModalState.param.state === 'closeMe') {
          _self.showDialog = false;
        }
      } else if (this.openModalState.name === _g.openModalCodes.testSendMessage) { // 发送短信测试
        this.showTestSendMessage = true;
      } else if (this.openModalState.name === _g.openModalCodes.chooseGoods || this.openModalState.name === _g.openModalCodes.chooseGoodsLevel) {
        this.showChooseGoods = this.openModalState.isOpen;
        this.curChoooseView = this.openModalState.name
      } else if (this.openModalState.name === _g.openModalCodes.editMarketingName) {
        this.showTaskRename = true;
      } else if (this.openModalState.name === _g.openModalCodes.marketSaveAs) {
        this.showTaskSaveAs = true;
      } else if (this.openModalState.name === _g.openModalCodes.memberDetails) {
        this.showMemberDetails = true;
        this.buyerId = this.openModalState.param.id
        if (this.$refs.memberDetails) {
          this.$refs.memberDetails.init()
        }
      } else if (this.openModalState.name === _g.openModalCodes.greyList) {
        this.showGreyList = true;
        this.closeModal('')
      } else if (this.openModalState.name === _g.openModalCodes.blackList) {
        this.showBlackList = true;
        this.closeModal('')
      } else if (this.openModalState.name === _g.openModalCodes.marketGroup) {
        this.showMarketGroup = true;
      } else if (this.openModalState.name === _g.openModalCodes.createMarketGroup) {
        this.showCreateMarketGroup = true;
      } else if (this.openModalState.name === _g.openModalCodes.maergeSendMessage) {
        this.showMaergeSendMessage = true
        // 发出速发短信弹窗打开广播 用来传jobId
        this.updateQuickSendMsgState({
          isOpen: true
        })
      } else if (this.openModalState.name === _g.openModalCodes.quickSendMessage) {
        // 弹出速发短信弹框
        this.showQuickSendMessage = true
        // 渲染弹框内组件
        this.isRenderQuickSendMessage = true
        // 发出速发短信弹窗打开广播
        this.updateQuickSendMsgState({
          isOpen: true
        })
      } else if (this.openModalState.name === _g.openModalCodes.buyMarketingJob) { //扩展场景
        this.showBuyMarketingJob = true
        this.activeName = this.openModalState.param.f_name ? [this.openModalState.param.f_name] : []
      } else if (this.openModalState.name === _g.openModalCodes.payOrder) { // 付款订单
        this.showPayOrder = true
      }
    },
    // 关闭弹出框，通用
    closeModalName() {
      if (this.closeModalName === 'importModal') {
        this.showDialog = false
        this.closeModal('')
      } else if (this.closeModalName === 'messageTemplate') {
        this.showDialog = false
        this.closeModal('')
      } else if (this.closeModalName === 'systemModal') {
        this.showDialog = false
        this.closeModal('')
      } else if (this.closeModalName === 'testSendMessage') {
        this.showTestSendMessage = false
        this.closeModal('')
      } else if (this.closeModalName === 'saveAs') {
        this.showTaskSaveAs = false
        this.closeModal('')
      } else if (this.closeModalName === 'rename') {
        this.showTaskRename = false
        this.closeModal('')
      } else if (this.closeModalName === 'marketGroup') {
        this.showMarketGroup = false
        this.closeModal('')
      } else if (this.closeModalName === 'blackList') {
        this.showBlackList = false
      } else if (this.closeModalName === 'greyList') {
        this.showGreyList = false
      } else if (this.closeModalName === 'createMarketGroup') {
        this.showCreateMarketGroup = false
        this.closeModal('')
      } else if (this.closeModalName === 'maergeSendMessage') {
        this.showMaergeSendMessage = false
        this.closeModal('')
      } else if (this.closeModalName === 'quickSendMessage') {
        this.showQuickSendMessage = false
        this.closeModal('')
      } else if (this.closeModalName === 'buyMarketingJob') {
        this.showBuyMarketingJob = false
        this.closeModal('')
      } else if (this.closeModalName === 'payOrder') {
        this.showPayOrder = false
        this.closeModal('')
      }
    },
    // 此时用户数据已经加载完成
    // 判断用户是否设置账号信息，没设置则弹出设置中心，有则判断是否满足弹出导入提示框条件
    settingContact() {
      if (this.settingContact.ADMIN_NAME === '') {
        // 弹出设置中心
        this.openSettingCenter()
      } else {
        // 只有在第一次登录时提示
        if (this.userData.is_first) {
          // 弹出导入提示
          this.openImportDialog()
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'updateToken',
      'getSubCode',
      'closeModal',
      'getSettingContact',
      'showSynchronousData',
      'showVersionUpdate',
      'setCenterAlready',
      'getMemberGroup',
      'updateQuickSendMsgState',
      'getUser'
    ]),
    // 设置中心
    openSettingCenter() {
      this.dialogTitle = '设置中心'
      this.dialogClassName = 'settingsCenter'
      this.showDialog = true
      this.closeOnPressEsc = false
      this.curDialogView = _g.openModalCodes.settingsCenter
      this.showClose = this.isGuide
    },
    // 导入历史记录
    openImportDialog() {
      this.getSubCode('taobaoHistoryOrder')
      this.dialogTitle = '导入历史订单'
      this.dialogClassName = 'importModal'
      this.showDialog = true
      // 修改
      this.showClose = !this.userData.is_first
      this.closeDialog = this.closeImportModal
      this.closeOnPressEsc = false
      this.curDialogView = _g.openModalCodes.importModal
    },
    // 关闭弹窗回调（通用）
    closeDialog() {
      // 充值后关闭窗口重新获取短信信息
      // if(this.dialogTitle === '短信相关设置') {
      //   this.getUser()
      // }
    },
    // 速发短信弹窗关闭回调
    closeDialogQuickSendMessage() {
      // this.$refs['maergeSendMessage'].init()
      // 发出速发短信弹窗关闭广播
      this.updateQuickSendMsgState({
        isOpen: false
      })
    },
    initDialog() {
      this.closeOnClick = false
      this.showClose = true
      this.closeOnPressEsc = true
      this.dialogTop = '20px'
    },
    // 绿色通道（针对内部人员shift+alt+f键）
    greenChannel() {
      var that = this
      window.onkeydown = function(event) {
        /* eslint-disable */
        var e = event || window.event || arguments.callee.caller.arguments[0]
        if(e && e.shiftKey && e.altKey && e.keyCode === 70) {
          that.showDialog = false
        }
      }
    },
    //  定时刷新token
    updateTokenTimer() {
      var that = this
      var timer = setInterval(() => {
        var u_id = store.state.userData.user_id
        var token = JSON.parse(window.localStorage.getItem(u_id))
        if (token.data && token.data.length > 0) {
          that.updateToken().then(token => {
            // 将token存入本地
            utils.setLocalStore(u_id, token)
          })
        } else {
          clearInterval(timer)
        }
      }, 1000 * 60 * 10)
    },
    // 关闭导入弹出框 （独立）
    closeImportModal() {
      this.getSubCode('')
    },
    // 网站初始化项
    init() {
      // 内部人员绿色通道
      this.greenChannel()
    },
    // 预加载数据
    getPreData() {
      // 加载会员分组列表
      if (!this.memberGroupData || !this.memberGroupData.length) {
        this.getMemberGroup()
      }
      // this.getMemberGroup()
    },
    // 提示检测 第一次登录获取user信息 但是触发不了watch中的userData 在mounted 中调用一次
    checkMessage() {
      // 获取设置中心数据，用于判断用户是否已经填写账号信息
      if (!this.settingContact.hasOwnProperty('ADMIN_NAME')) {
        this.getSettingContact()
      }
      //是否显示提示信息
      if(this.userData.length != 0) {
        this.showSynchronousData()
        //是否显示版本更新提示
        // this.showVersionUpdate()
      }
    }
  },
  mounted() {
    // 网站初始化项
    this.init()
    //检测是否显示一些提示
    this.checkMessage()
    // 预加载数据
    this.getPreData()
    // 用户登录成功后 启动刷新token的定时器
    this.updateTokenTimer()
    //是否显示版本更新提示
    this.showVersionUpdate()
  },
  components: {
    headerBar,
    siderBar,
    settingsCenter,
    testSendMessage,
    chooseGoods,
    taskRename,
    taskSaveAs,
    memberDetails,
    marketGroup,
    greyListAdd,
    blackListAdd,
    createMarketGroup
  }
}
</script>

<style lang="scss">
@import './style/index.scss';







/*整体框架布局*/

body {
  margin: 0;
}

.container {
  height: 100%;
  overflow: auto;
  *zoom: 1;
}

.mainContent {
  /*左侧栏宽度*/
  margin-left: $siderbar-width;
  /*页面最小宽度*/
  min-width: $container-min-width;
  height: 100%;
  /*主内容区边距*/
  .content {
    margin: $moduleMargin $moduleMargin 0 $moduleMargin;
    box-shadow: 0px 0px 20px 0 #D1D1D1;
    padding-bottom: 0 !important;
    margin-bottom: 10px !important;
    min-height: 85%;
  }
  .content>div {
    height: 100%;
    overflow: hidden;
    border-bottom: 1px solid #dce1e4;
  }
  .el-tabs {
    background-color: $white;
  }
  .el-tabs__header {
    margin-bottom: 0;
    padding-left: 20px;
    .el-tabs__item {
      &.is-active {
        color: #0BB8F8;
      }
    }
    .is-disabled {
      &:hover {
        color: #afb3bc;
      }
    }
  }
  #grade_tabs {
    .el-tabs__header {
      margin-bottom: 0;
      padding-left: 0px;
      .el-tabs__item {
        background: #252c33;
        &.is-active {
          background: $white;
        }
        &.is-active:hover {
          color: black;
        }
        &:hover {
          color: $white;
        }
      }
    }
  } //图表tab背景为黑色
  .base_chart_wraper {
    .el-tabs__header {
      background-color: $chart-header-bg;
      border-bottom: 0;
      padding-left: 10px;
      .el-tabs__active-bar {
        background-color: $white;
      }
      .el-tabs__item {
        color: #afb3bc;
        &.is-active {
          color: $white;
        }
        &:hover {
          color: $white;
        }
      }
      .is-disabled {
        &:hover {
          color: #afb3bc;
        }
      }
    }
  }
  .base_chart_wraper.home_base_chart {
    .el-tabs__header {
      padding-left: 166px;
    }
  }
  .toolBox {
    .el-select {
      .el-input {
        input {
          color: $white;
          background-color: $chart-bg;
          border: 0;
        }
        .el-input__icon {
          color: $white;
        }
      }
    }
  }
}

.el-select-dropdown.chartSel {
  border: 0;
  .el-scrollbar {
    background-color: $chart-bg;
  }
  .el-select-dropdown__item {
    color: $white;
    &.selected {
      background-color: $chart-bg;
      color: $primary;
    }
    background-color: $chart-bg;
    &:hover {
      color: $primary;
    }
  }
}

.left {
  z-index: 800;
  position: fixed;
  height: 100%;
  width: $siderbar-width;
  float: left;
  background-color: $siderbar-bg;
}

.header_wraper {
  position: relative;
  height: 122px;
}

// 头部冻结样式
.fixed {
  z-index: 800;
  position: fixed;
  left: $siderbar-width;
  right: 0;
  min-width: $container-min-width;
}

#aicrm {

  .messageModal {
    width: 820px; // height: 80%;
    min-height: 550px;
  }
  .messageControl {
    padding-top: 0px;
    padding-bottom: 0px;
    min-height: 350px;
  }
  .systemModal {
    width: 860px;
    min-height: 550px;
  }
  .importModal {
    width: 860px;
  }
  .settingsCenter {
    width: 820px;
  }
  .taskRename {
    width: 500px;
  }
  .marketGroup {
    width: 500px;
  }
  .chooseGoods {
    width: 860px;
  }
  .chooseGoodsLevel {
    width: 1145px;
  }
  .taskSaveAs {
    width: 500px;
  }
  .testSendMessage {
    width: 820px;
  }
  .createMarketGroup {
    width: 1100px;
    min-width: 1100px;
  }
  .memberDetails {
    width: 820px;
  }
  .quickSendMessage {
    width: 1010px;
  }
  .maergeSendMessage {
    width: 1010px;
  }
  .buyMarketingJob {
    width: 980px;
  }
}
</style>
