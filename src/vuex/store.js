import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import plugins from './plugins'
import * as TYPE from './type.constant'
import goods from './modules/goods'
import member from './modules/member'
import imm from './modules/immediateMarketing'
import chargeRecord from './modules/chargeRecord'
import pon from './modules/potentialDemandMarketing'
import importOrder from './modules/importOrder'
import msgTest from './modules/messageTest'
import homepage from './modules/homepage'
import lossPrevention from './modules/lossPrevention'
import dataChart from './modules/dataChart'
import care from './modules/care'
import firstBuy from './modules/firstBuy'
import maintenance from './modules/maintenance'
import saveCustomer from './modules/saveCustomer'
import activateCustomer from './modules/activateCustomer'
import baseMarketingConfig from './modules/baseMarketingConfig'
import utils from '../misc/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    xseData: [],
    kdjData: [],
    fgzqData: [],
    subState: '',
    userData: [],
    menuState: [],
    flagState: [],
    oderTypeState: [],
    msgState: [],
    openModalState: {},
    siderbarData: [],
    siderbarActiveNode: [],
    resultDataForMsg: [],
    resultDataForRebuy: [],
    resultDataForUser: [],
    tokenState: [],
    logoutState: [],
    chargeMessagelistData: [],
    callbackMsg: '',
    switchState: '',
    closeModalName: '',
    marketJobState: '',
    marketJobByParam: '',
    marketJob: [],
    saveAsData: '',
    renameData: '',
    marketJson: {},
    market: '',
    marketingSysId: '',
    messageIsShare: '',
    setCenterAlreadyState: '',
    isSysMarketingjob: true,
    resultDetailData: [],
    filterResultDetailData: [],
    filterPushRecordData: [],
    pushRecordData: [],
    unsubscribeRecordData: [],
    filterUnsubscribeRecordData: [],
    qianniuTaskData: [],
    filterQianniuTaskData: [],
    processData: '',
    repeatClickState: false,
    verificationData: '',
    jurisdictionData: {},
    maergeOrderData: [],
    filterMaergeOrderData: [],
    calendarDate: [],
    filCalendarData: [],
    importantMessage: [],
    deductionRule: {},
    attitudeLoss: {
      lost: {
        total: '',
        list: []
      },
      prelost: {
        total: '',
        list: []
      }
    },
    maergeMessage: '',
    synchronousData: false,
    versionUpdate: true,
    progressData: {},
    payOrderData: {},
    serverCenterData: []
  },
  getters,
  mutations,
  actions,
  plugins,
  modules: {
    goods,
    member,
    imm,
    pon,
    importOrder,
    msgTest,
    chargeRecord,
    homepage,
    lossPrevention,
    dataChart,
    care,
    firstBuy,
    maintenance,
    saveCustomer,
    activateCustomer,
    baseMarketingConfig
  }
})
