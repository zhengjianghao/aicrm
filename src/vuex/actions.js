import API_MARKETING from '../service/marketing.service'
import API_USER from '../service/user.service'
import API_IMM from '../views/homepage/immediateMarketing/imm.service'
import API_PON from '../views/maintenance/potentialDemandMarketing/pon.service'
import API_MSG from '../service/message.service'
import * as TYPE from './type.constant'
import gConst from '../misc/global.constant'
import router from '../router/index'
import utils from '../misc/utils'
import store from "./store"
import moment from 'moment'
import updateData from '../components/header/versionUpdate'
// 菜单状态（一级状态）
export const getActiveMenuCode = ({ commit }, menuState) => {
  commit(TYPE.GET_MENUSTATE, menuState)
}
// tab状态（二级状态）
export const getSubCode = ({ commit }, subCode) => {
  commit(TYPE.GET_SUBSTATE, subCode)
}
// siderbar activecode
export const updateSiderbarActiveNode = ({ commit }, code) => {
  commit(TYPE.UPDATE_SIDERBAR_ACTIVE_NODE, code)
}
//开关的状态
export const updateSwitchState = ({ commit }, switchState) => {
  commit(TYPE.UPDATE_SWITCH_STATE, switchState)
}
// 销售额
export const getChartXse = ({ commit }, [selMonthCount, selCustomerType]) => {
  API_MARKETING.getChartXseData(selMonthCount, selCustomerType).then(data => {
    commit(TYPE.GET_XSE, data.data)
  })
}
// 客单价
export const getChartKdj = ({ commit }, [selMonthCount, selCustomerType]) => {
  API_MARKETING.getChartKdjData(selMonthCount, selCustomerType).then(data => {
    commit(TYPE.GET_KDJ, data.data)
  })
}
// 复购周期
export const getChartFgzq = ({ commit }, [selMonthCount, selRebuyNum]) => {
  API_MARKETING.getChartFgzqData(selMonthCount, selRebuyNum).then(data => {
    commit(TYPE.GET_FGZQ, data.data)
  })
}
// 营销效用户效果数据
export const getResultDataForUser = ({ commit }, [taskId, dayCount, startDate, endDate, marketingType]) => {
  return API_MARKETING.getMarketingResultData(taskId, dayCount, startDate, endDate, marketingType).then(data => {
    commit(TYPE.RESULT_DATA_FOR_USER, data.data)
  })
}
// 营销效果短信与千牛数据
export const getResultDataForMsg = ({ commit }, [taskId, dayCount, startDate, endDate, marketingType]) => {
  return API_MARKETING.getMarketingResultData(taskId, dayCount, startDate, endDate, marketingType).then(data => {
    commit(TYPE.RESULT_DATA_FOR_MSG, data.data)
  })
}
// 加购用户占比
export const getResultDataForRebuy = ({ commit }, [taskId, dayCount, startDate, endDate, marketingType]) => {
  return API_MARKETING.getMarketingResultData(taskId, dayCount, startDate, endDate, marketingType).then(data => {
    commit(TYPE.RESULT_DATA_FOR_REBUY, data.data)
  })
}
// 用户数据
export const getUser = ({ commit, state }, token) => {
  return new Promise((resolve, reject) => {
    API_USER.getUserData(token ? token : state.tokenState).then(data => {
      API_MSG.getSettingContact(token ? token : state.tokenState).then(o => {
        commit(TYPE.GET_USER, [data, o])
        commit(TYPE.JURISDICTION_VERIFICATION)
        resolve(data)
      })
    })
  })

}
// get token
export const getToken = ({ commit }, code) => {
  return new Promise(function (resolve, reject) {
    API_USER.getToken(code).then(data => {
      commit(TYPE.GET_TOKEN, data)
      resolve(data)
    })
  })
}
// refresh token
export const updateToken = ({ commit }) => {
  return new Promise(function (resolve, reject) {
    API_USER.updateToken().then(data => {
      commit(TYPE.GET_TOKEN, data)
      resolve(data)
    })
  })
}
// logout
export const logout = ({ commit, state }) => {
  API_USER.logout().then(() => {
    window.localStorage.removeItem(state.userData.user_id)
    router.push('/login')
    window.location.reload(true)
  })
}
// 备注旗子
export const updateFlag = ({ commit }, flags) => {
  commit(TYPE.UPDATE_FLAG, flags)
}
// 订单类型
export const updateOderType = ({ commit }, flags) => {
  commit(TYPE.UPDATE_ODERTYPE, flags)
}
// 短信内容变动
export const updateMsgContent = ({ commit }, msg) => {
  commit(TYPE.UPDATE_MSG, msg)
}
// 模式窗口状态
export const updateOpenModal = ({ commit }, option) => {
  commit(TYPE.UPDATE_OPENMODAL, option)
}
// 短信模块
export const getMessageChargeList = ({ commit }) => {
  API_MSG.chargeList().then(data => {
    commit(TYPE.GET_CHARGE_MSG_LIST, data)
  })
}
// 关闭弹窗
export const closeModal = ({ commit }, name) => {
  commit(TYPE.CLOSE_MODAL, name)
}
//获取营销任务
export const getMarketingJob = ({ commit }, headerConst) => {
  API_MARKETING.getMarketingJob().then(data => {
    commit(TYPE.GET_MARKET_JOB, data)
    commit(TYPE.GET_MARKET_JOB_BY_PARAM, 'end_time')
    // 获取头部菜单是否显示
    if (headerConst == 'true') {
      store._actions.getHeaderConstant[0]()
    }
  })
}
export const getMarketingJobByParam = ({ commit }, param) => {
  commit(TYPE.GET_MARKET_JOB_BY_PARAM, param)
}
// 营销任务开关
export const doMarketTask = ({ commit }, [id, state]) => {
  return API_MARKETING.doMarketTask(id, state)
}
// 另存为营销任务
export const doSaveAs = ({ commit }, obj) => {
  commit(TYPE.DO_SAVE_AS, obj)
}
// 营销任务 重命名
export const doRename = ({ commit }, obj) => {
  commit(TYPE.DO_RENAME, obj)
}
//营销类型
export const updateMarket = ({ commit }, option) => {
  commit(TYPE.UPDATE_MARKET, option)
}
//共享状态
export const updateIsShare = ({ commit }, option) => {
  commit(TYPE.UPDATE_IS_SHAER, option)
}
export const updateShare = ({ commit }, [state, type]) => {
  return API_MSG.updateShare(state, type)
}
//是否设置安全设置
export const setCenterAlready = ({ commit }, option) => {
  commit(TYPE.SET_ALREADY, option)
}
//获取系统营销模板id
export const getMarketingSysId = ({ commit, state }, type) => {
  return new Promise((resolve, reject) => {
    var jobList = state.marketJob
    var _type = ''
    if (type) {
      _type = type.replace('_P4P_CUSTOM', '_P4P_SYS')
    }
    var market = jobList.filter(o => {
      return o.type === _type
    })
    commit(TYPE.GET_MARKET_P4P_SYSID, market[0].id)
    resolve(market[0].id)
  })
}
//获取系统营销模板title
export const getMarketingSysTitle = ({ commit, state }, type) => {
  return new Promise((resolve, reject) => {
    var jobList = state.marketJob
    var _type = ''
    if (type) {
      _type = type.replace('_P4P_CUSTOM', '_P4P_SYS')
    }
    var market = jobList.filter(o => {
      return o.type === _type
    })
    resolve(market[0].title)
  })
}
//是否为营销任务系统模板
export const updateIsSysMarketingjob = ({ commit, state }, isSys) => {
  commit(TYPE.UPDATE_IS_P4P_SYS_MARKETINGJOB, isSys)
}
//获取成功详单
export const getResultDetail = ({ commit }, [pagination, id, day, startTime, endTime, keyword, sortBy]) => {
  API_MARKETING.getResultDetail(pagination, id, day, startTime, endTime, keyword).then(data => {
    commit(TYPE.GET_RESULE_DETAIL, [data, sortBy])
  })
}
export const getResultDetailByParam = ({ commit }, [pagination, keyword]) => {
  commit(TYPE.GET_RESULE_DETAIL_BY_PARAM, [pagination, keyword])
}
//获取推送记录
export const getPushRecord = ({ commit }, [pagination, id, day, startTime, endTime, keyword, sortBy]) => {
  API_MARKETING.getPushRecord(pagination, id, day, startTime, endTime, keyword).then(data => {
    commit(TYPE.GET_PUSH_RECORD, [data, sortBy])
  })
}
export const getPushRecordByParam = ({ commit }, [pagination, keyword]) => {
  commit(TYPE.GET_PUSH_RECORD_BY_PARAM, [pagination, keyword])
}
//退订记录
export const getUnsubscribeRecord = ({ commit }, [pagination, id, day, startTime, endTime, keyword, sortBy]) => {
  API_MARKETING.getUnsubscribeRecord(pagination, id, day, startTime, endTime, keyword).then(data => {
    commit(TYPE.GET_UNSUBSCRIBE_RECORD, [data, sortBy])
  })
}
export const getUnsubscribeRecordByParam = ({ commit }, [pagination, keyword]) => {
  commit(TYPE.GET_UNSUBSCRIBE_RECORD_BY_PARAM, [pagination, keyword])
}
//千牛任务
export const getQianniuTask = ({ commit }, [pagination, id, day, startTime, endTime, keyword, sortBy]) => {
  API_MARKETING.getQianniuTask(pagination, id, day, startTime, endTime, keyword).then(data => {
    commit(TYPE.GET_QIANNIU_TASK, [data, sortBy])
  })
}
export const getQianniuTaskByParam = ({ commit }, [pagination, keyword]) => {
  commit(TYPE.GET_QIANNIU_TASK_BY_PARAM, [pagination, keyword])
}
//态度不满一览表
export const getAttitudeLoss = ({ commit }, date) => {
  API_MARKETING.getAttitudeLoss(date).then(data => {
    commit(TYPE.GET_ATTITUDE_LOSS, data)
  })
}
export const updateProcess = ({ commit }, process) => {
  commit(TYPE.UPDATE_PROCESS, process)
}
//防止重复点击
export const repeatClick = ({ commit }, data) => {
  commit(TYPE.REPEAT_CLICK, data)
}
//验证临时存储
export const verification = ({ commit }, obj) => {
  commit(TYPE.VERIFICATION, obj)
}
//清空验证
export const emptyVerification = ({ commit }) => {
  commit(TYPE.EMPTY_VERIFICATION)
}
//用户权限验证
export const jurisdictionVerification = ({ commit }) => {
  commit(TYPE.JURISDICTION_VERIFICATION)
}
//获取合并订单信息
export const getMaergeOrder = ({ commit }, [pagination, search]) => {
  API_MARKETING.getMaergeOrder(search, pagination).then(data => {
    commit(TYPE.GET_MAERGE_ORDER, data)
    // commit(TYPE.GET_MAERGE_ORDER_BY_PARAM, [pagination])
  })
}
export const getMaergeOrderByParam = ({ commit }, [pagination]) => {
  commit(TYPE.GET_MAERGE_ORDER_BY_PARAM, [pagination])
}
//获取双11头部日历信息
export const getCalendarDate = ({ commit }, [obj, type]) => {
  commit(TYPE.GET_CALENDAR_DATE, [obj, type])
}
export const getfilCalendarData = ({ commit }, date) => {
  commit(TYPE.GET_FILCALENDAR_DATA, date)
}
//获取合并订单发送短信内容
export const getMaergeMessage = ({ commit }, date) => {
  commit(TYPE.GET_MAERGE_MESSAGE, date)
}
//具体的某个场景json值
export const updateMarketJson = ({ commit }, date) => {
  commit(TYPE.UPDATE_MARKET_JSON, date)
}
//显示同步提醒
export const showSynchronousData = ({ commit, state }, date) => {
  var login_time = store.state.userData.created_at
  var _firstTime = new Date()
  var _dateValue = moment(_firstTime).valueOf() - moment(login_time).add(1, 'days').valueOf()
  if (_dateValue >= 0) {
    commit(TYPE.SHOW_SYNCHRONOUS_DATA, false)
  } else {
    commit(TYPE.SHOW_SYNCHRONOUS_DATA, true)
  }
  // var userId = store.state.userData.user_id
  // var _showSynch = window.localStorage.getItem('showSynch_' + userId)
  // //同步提醒24小时无本地存储
  // if (!_showSynch) {
  //   //添加本部存储
  //   window.localStorage.setItem('showSynch_' + userId, JSON.stringify({
  //     showSynchronous: true,
  //     firstTime: new Date()
  //   }))
  //   //24小时后修改本地存储 隐藏提示
  //   var _time = setTimeout(function () {
  //     window.localStorage.setItem('showSynch_' + userId, JSON.stringify({
  //       showSynchronous: false,
  //     }))
  //     clearTimeout(_time)
  //   }, 24 * 3600 * 1000)
  // } else {
  //   //有本部存储 显示还是隐藏
  //   _showSynch = JSON.parse(_showSynch)
  //   if (_showSynch.showSynchronous) {
  //     var _firstTime = new Date()
  //     //是否已经超过24小时
  //     var _dateValue = moment(_firstTime).valueOf() - moment(_showSynch.firstTime).add(1, 'days').valueOf()
  //     if (_dateValue >= 0) {
  //       window.localStorage.setItem('showSynch_' + userId, JSON.stringify({
  //         showSynchronous: false,
  //       }))
  //     } else {
  //       var _time2 = setTimeout(function () {
  //         window.localStorage.setItem('showSynch_' + userId, JSON.stringify({
  //           showSynchronous: false,
  //         }))
  //         clearTimeout(_time2)
  //       }, Math.abs(_dateValue))
  //     }
  //   }
  // }
  // var _isShow = JSON.parse(window.localStorage.getItem('showSynch_' + userId))
  // //修改是否显示
  // commit(TYPE.SHOW_SYNCHRONOUS_DATA, _isShow.showSynchronous)
}
//显示版本更新弹框
export const showVersionUpdate = ({ commit }, showBox) => {
  let update_time = updateData.updateTime
  let _firstTime = new Date()
  let _dateValue = moment(_firstTime).valueOf() - moment(update_time).add(1, 'days').valueOf()
  if (showBox === 1) {
    commit(TYPE.SHOW_VERSION_UPDATE, true)
  } else if (showBox === 0) {
    commit(TYPE.SHOW_VERSION_UPDATE, false)
  } else {
    if (_dateValue >= 0) {
      commit(TYPE.SHOW_VERSION_UPDATE, false)
    } else {
      commit(TYPE.SHOW_VERSION_UPDATE, true)
    }
  }
}
// 头部重要信息提示
export const getImportantMessage = ({ commit }) => {
  API_USER.getImportantMessage().then(data => {
    commit(TYPE.GET_IMPORTANT_MESSAGE, data)
  })
}
// 店铺扣费规则
export const getDeductionRule = ({ commit }) => {
  API_USER.getDeductionRule().then(data => {
    commit(TYPE.GET_DEDUCTION_RULE, data)
  })
}
// 导入进度条
export const getProgress = ({ commit }) => {
  return new Promise((resolve, reject) => {
    API_USER.getProgress().then(data => {
      commit(TYPE.GET_PROGRESS, data)
      resolve(data)
    })
  })
}
// 付款订单
export const getPayOrderData = ({ commit }, data) => {
  commit(TYPE.GET_PAY_ORDER_DATA, data)
}
// 支付宝付款
export const chargeByAli = ({ commit, state }, data) => {
  let token = JSON.parse(window.localStorage.getItem(state.userData.user_id)).data
  return new Promise((resolve, reject) => {
    API_MSG.chargeByAli(data, state.userData.user_id, token).then(data => {
      resolve(data)
    })
  })
}
// 客服中心数据
export const getServerCenterData = ({ commit }, [pagination, days, startDate, endDate, search_word, activeTabName]) => {
  API_MSG.getServerCenterData(pagination, days, startDate, endDate, search_word, activeTabName).then(data => {
    commit(TYPE.GET_SERVER_CENTER_DATA, data)
  })
}
