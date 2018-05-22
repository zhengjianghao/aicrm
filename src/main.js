// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import focus from './components/focus.directive.js'
import textareaDelete from './components/textareaDelete.directive.js'
import toolBox from './components/toolbox/toolbox'
import searchInput from './components/search/searchInput'
import searchByInput from './components/search/searchByInput'
import tableList from './components/list/tableList'
import flowBtn from './components/flowBtn.directive.js'
import clickTrigger from './components/clickTrigger.directive.js'

import { sync } from 'vuex-router-sync'
import bouncedBox from './components/bouncedBox/bouncedBox'
import lazyRender from './components/lazyRender'
import baseMarketingConfig from './components/baseMarketingConfig/baseMarketingConfig'
import baseVIPConfig from './components/baseMarketingConfig/baseVIPConfig'
import initJump from './components/initPaginationJump.directive.js'
import switchBig from './components/switch/switch'
import taskSwitch from './components/switch/taskSwitch'
import marketingHeader from './components/header/marketingHeader'
import targetMemberPon from './components/baseMarketingConfig/targetMemberPon'
import targetMemberImm from './components/baseMarketingConfig/targetMemberImm'
import targetMember from './components/baseMarketingConfig/targetMember'
import orderTime from './components/baseMarketingConfig/orderTime'
import orderTimeIntime from './components/baseMarketingConfig/orderTimeIntime'
import orderFrom from './components/baseMarketingConfig/orderFrom'
import orderPayment from './components/baseMarketingConfig/orderPayment'
import orderPaymentIntime from './components/baseMarketingConfig/orderPaymentIntime'
import orderTypes from './components/oderTypeCheckboxsGroup/oderTypeCheckboxsGroup'
import pushitem from './components/baseMarketingConfig/pushItems'
import pushitemsHML from './components/baseMarketingConfig/pushItemsHML'
import deadline from './components/baseMarketingConfig/deadline'
import flags from './components/flagCheckboxsGroup/flagCheckboxsGroup'
import goodsNum from './components/baseMarketingConfig/goodsNum'
import itemsRange from './components/baseMarketingConfig/itemsRange'
import payTime from './components/baseMarketingConfig/payTime'
import consignTime from './components/baseMarketingConfig/consignTime'
import signTime from './components/baseMarketingConfig/signTime'
import confirmTime from './components/baseMarketingConfig/confirmTime'
import buyerMessage from './components/baseMarketingConfig/buyerMessage'
import overRemind from './components/baseMarketingConfig/overRemind'
import saveBtn from './components/baseMarketingConfig/saveBtn'
import saveAsBtn from './components/baseMarketingConfig/saveAsBtn'
import deleteBtn from './components/baseMarketingConfig/deleteBtn'
import sendTimes from './components/baseMarketingConfig/sendTimes'
import sendtime from './components/baseMarketingConfig/sendtime'
import sendtimeN from './components/baseMarketingConfig/sendtimeN'
import sendtimeT from './components/baseMarketingConfig/sendtimeT.vue'
import pushType from './components/baseMarketingConfig/pushType'
import pushTypeUser from './components/baseMarketingConfig/pushTypeUser'
import secondPayRemind from './components/baseMarketingConfig/secondPayRemind'
import nearCloseRemind from './components/baseMarketingConfig/nearCloseRemind'
import orderState from './components/baseMarketingConfig/orderState'
import buyCount from './components/baseMarketingConfig/buyCount'
import goodsType from './components/baseMarketingConfig/goodsType'
import multiSearch from './components/search/multiSearch'
import createMarketGroup from './components/search/createMarketGroup'
import msgEditTemp from './components/messageEditTemplate/messageEditTemplate'
import msgEditTempT from './components/messageEditTemplate/messageEditTemplateT'
import msgEditTempP from './components/messageEditTemplate/messageEditTemplateP'
import msgEditTempN from './components/messageEditTemplate/messageEditTemplateN'
import msgEditTempSend from './components/messageEditTemplate/messageEditTemplateSend'
import contentHeader from './components/header/contentHeader'
import baseMemberList from './components/list/baseMemberList'
import targetMultiselect from './components/baseMarketingConfig/targetMultiselect.vue'
import groupTag from './components/tag/groupTag'
import express from './components/baseMarketingConfig/express'
import marketHome from './components/marketHome/marketHome'
import baseSelectCity from './components/selectGroup/baseSelectCity'
import marketHomeAll from './components/marketHome/marketHomeAll'
import dataChartHome from './components/marketHome/dataChartHome'
import undevelopPage from './components/commonPage/undevelopPage'
import memberChange from './components/baseMarketingConfig/memberChange'
import bufferTime from './components/baseMarketingConfig/bufferTime.vue'
import activeTitle from './components/baseMarketingConfig/activeTitle.vue'
import kdjMultiselect from './components/baseMarketingConfig/kdjMultiselect.vue'
import calendarDate from './components/calendarDate/calendarDate.vue'
import addStair12 from './components/addStairs/addStair12.vue'
import addStair12Add from './components/addStairs/addStair12Add.vue'

import selectCityCode from './components/selectGroup/selectCityCode'
import selectCity from './components/selectGroup/selecCity'
import settingListDouble from './components/double11SettingList/settingListDouble'

// 引入ElementUI css
import '../theme/index.css'
// 引入element ui
import ElementUI from 'element-ui'
import router from './router'
// AI引擎logo
import AI from './components/AI'
import store from './vuex/store'
// 引入XLSX
import XLSX from 'xlsx';

// 下单时间有隔天的
import timerPicker from './components/timerPicker'
sync(store, router)

// 注册组件

// 版本更新通知
Vue.component('bouncedBox', bouncedBox)
// 延迟渲染组件
Vue.component('lazyRender', lazyRender)
// 双11头部日历
Vue.component('calendarDate', calendarDate)
// 双12添加阶梯
Vue.component('addStair12', addStair12)
// 双12添加阶梯当天增量型
Vue.component('addStair12Add', addStair12Add)
// 双11设置宝贝
Vue.component('settingListDouble', settingListDouble)
// 营销配置组件
Vue.component('baseMarketingConfig', baseMarketingConfig)
// 客单价多选下拉框
Vue.component('kdjMultiselect', kdjMultiselect)
// 自定义会员的配置项
Vue.component('baseVIPConfig', baseVIPConfig)
// 多选下拉框
Vue.component('targetMultiselect', targetMultiselect)
// 开关组件
Vue.component('switchBig', switchBig)
// 开关组件-营销配置
Vue.component('taskSwitch', taskSwitch)
// 营销配置标题头组件
Vue.component('marketingHeader', marketingHeader)
// 目标会员（跟随潜需）
Vue.component('configTargetMemberPon', targetMemberPon)
Vue.component('configTargetMemberImm', targetMemberImm)
Vue.component('configTargetMember', targetMember)
// 下单时间
Vue.component('configOrderTime', orderTime)
Vue.component('configOrderTimeIntime', orderTimeIntime)
// 订单来源
Vue.component('configOrderFrom', orderFrom)
// 活动备注
Vue.component('configActiveTitle', activeTitle)
// 缓冲时间
Vue.component('configBufferTime', bufferTime)
// 订单金额
Vue.component('configOrderPayment', orderPayment)
Vue.component('configOrderPaymentIntime', orderPaymentIntime)
// 订单类型
Vue.component('configOrderTypes', orderTypes)
// 商品件数
Vue.component('configGoodsNum', goodsNum)
// 营销宝贝
Vue.component('configPushitem', pushitem)
// 营销宝贝高中低
Vue.component('configPushitemsHML', pushitemsHML)
// 营销有效时间
Vue.component('configDeadline', deadline)
// 卖家留言
Vue.component('configBuyerMessage', buyerMessage)
// 备注旗子
Vue.component('configFlags', flags)
// 购买宝贝范围
Vue.component('configItemsRange', itemsRange)
// 付款时间
Vue.component('configPayTime', payTime)
// 发货时间
Vue.component('configConsignTime', consignTime)
// 签收时间
Vue.component('configSignTime', signTime)
// 确认时间
Vue.component('configConfirmTime', confirmTime)
// 发送频率
Vue.component('configSendTimes', sendTimes)
// 二次催付
Vue.component('configSecondPayRemind', secondPayRemind)
// 临近催付
Vue.component('configNearCloseRemind', nearCloseRemind)
// 结束提醒
Vue.component('configOverRemind', overRemind)
// 推送方式
Vue.component('configPushType', pushType)
// 推送方式
Vue.component('configPushTypeUser', pushTypeUser)
// 短信内容
Vue.component('msgEditTemp', msgEditTemp)
// 提醒短信内容
Vue.component('msgEditTempT', msgEditTempT)
// 二次催付
Vue.component('msgEditTempP', msgEditTempP)
// 临近催付
Vue.component('msgEditTempN', msgEditTempN)
// 发送短信中的
Vue.component('msgEditTempSend', msgEditTempSend)
// 保存
Vue.component('configSaveBtn', saveBtn)
// 另存为
Vue.component('configSaveAsBtn', saveAsBtn)
// 删除
Vue.component('configDeleteBtn', deleteBtn)
// 发送时间段
Vue.component('configSendtime', sendtime)
// 发送时间段
Vue.component('configSendtimeN', sendtimeN)
// 发送时间段
Vue.component('configSendtimeT', sendtimeT)
// 订单状态
Vue.component('configOrderState', orderState)
// 购物次数
Vue.component('configBuyCount', buyCount)
// 商品种类
Vue.component('configGoodsType', goodsType)
// 快递公司
Vue.component('configExpress', express)
// 基础城市选择组件
Vue.component('baseSelectCity', baseSelectCity)
// 城市选择组件 传汉子
Vue.component('configSelectCity', selectCity)
// 城市选择组件 传code
Vue.component('selectCityCode', selectCityCode)
// 会员状态变更时间
Vue.component('configMemberChange', memberChange)
// 会员列表模板
Vue.component('baseMemberList', baseMemberList)
// 多条件搜索
Vue.component('multiSearch', multiSearch)
// 新建营销分组配置项
Vue.component('createMarketGroup', createMarketGroup)
// 内容区域头部
Vue.component('contentHeader', contentHeader)
// 标签
Vue.component('groupTag', groupTag)
// 营销任务首页执行一览
Vue.component('marketHome', marketHome)
Vue.component('marketHomeAll', marketHomeAll)
Vue.component('dataChartHome', dataChartHome)

// 列表的工具栏
Vue.component('toolBox', toolBox)
// 搜索框
Vue.component('searchInput', searchInput)
Vue.component('searchByInput', searchByInput)
// list
Vue.component('tableList', tableList)
// 获取焦点插件
Vue.use(focus)
Vue.use(initJump)
// 速发短信快速删除短信变量
Vue.use(textareaDelete)
// 保存按钮浮动
Vue.use(flowBtn)
// click 指令
Vue.use(clickTrigger)
//下单时间有隔天的
Vue.component('timerPicker', timerPicker)
/*** 状态页 ***/
// 待开发
Vue.component('undevelopPage', undevelopPage)
Vue.use(ElementUI)
Vue.component('AI', AI)
/* eslint-disable no-new */
new Vue({
  el: '#aicrm',
  router,
  store
})
