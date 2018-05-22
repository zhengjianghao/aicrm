import * as TYPE from './type.constant'
import moment from 'moment'
import utils from '../misc/utils'
import global from '../misc/global.constant.js'
import store from './modules/messageTest.js'
export const GET_XSE = (state, data) => {
  state.xseData = data;
}
export const GET_KDJ = (state, data) => {
  state.kdjData = data;
}
export const GET_FGZQ = (state, data) => {
  state.fgzqData = data;
}
export const GET_SUBSTATE = (state, data) => {
  state.subState = ''
  state.subState = data;
}
export const GET_USER = (state, [data, isFirst]) => {
  state.userData = data;
  if (!isFirst || isFirst.ADMIN_NAME == '') {
    state.userData.is_first = true
  } else {
    state.userData.is_first = false
  }
}
export const GET_MENUSTATE = (state, data) => {
  state.menuState = data;
}
export const UPDATE_FLAG = (state, data) => {
  state.flagState = data;
}
export const UPDATE_ODERTYPE = (state, data) => {
  state.oderTypeState = data;
}
export const UPDATE_MSG = (state, data) => {
  state.msgState = data;
}
export const UPDATE_OPENMODAL = (state, data) => {
  state.openModalState = data;
}
export const UPDATE_SIDERBAR = (state, data) => {
  state.siderbarData = data;
}
export const UPDATE_SIDERBAR_ACTIVE_NODE = (state, data) => {
  state.siderbarActiveNode = data;
}
export const RESULT_DATA_FOR_USER = (state, data) => {
  state.resultDataForUser = data;
}
export const RESULT_DATA_FOR_MSG = (state, data) => {
  state.resultDataForMsg = data;
}
export const RESULT_DATA_FOR_REBUY = (state, data) => {
  state.resultDataForRebuy = data;
}
export const GET_TOKEN = (state, data) => {
  state.tokenState = data;
}
export const LOGOUT = (state, data) => {
  state.logoutState = data;
}
export const GET_CHARGE_MSG_LIST = (state, data) => {
  state.chargeMessagelistData = data;
}
export const CALLBACK_MSG = (state, data) => {
  state.callbackMsg = data;
}
export const UPDATE_SWITCH_STATE = (state, data) => {
  state.switchState = data;
}
export const CLOSE_MODAL = (state, data) => {
  state.closeModalName = data;
}
export const UPDATE_MARKET_JOB_STATE = (state, data) => {
  state.marketJobState = data;
}
export const GET_MARKET_JOB = (state, data) => {
  state.marketJob = data;
}
export const DO_SAVE_AS = (state, data) => {
  state.saveAsData = data;
}
export const DO_RENAME = (state, data) => {
  state.renameData = data;
}
export const GET_ATTITUDE_LOSS = (state, data) => {
  var _temp = data
  var _list = _temp.lost.data
  var _prelist = _temp.prelost.data
  _temp.lost.list = [_list['态度不满'], _list['假货怀疑'], _list['质量不满'], _list['欺诈行为'], _list['价格不满'], _list['承诺不兑现'], _list['预期落差'], _list['物流问题'], _list['未发货退款的'], _list['发货后退货退款的'], _list['申请过售后的']]
  _temp.prelost.list = [_prelist['态度不满'], _prelist['假货怀疑'], _prelist['质量不满'], _prelist['欺诈行为'], _prelist['价格不满'], _prelist['承诺不兑现'], _prelist['预期落差'], _prelist['物流问题'], _prelist['未发货退款的'], _prelist['发货后退货退款的'], _prelist['申请过售后的']]
  var _sortList = new Array(_temp.lost.list)
  var _sortPrelist = new Array(_temp.prelost.list)
  _temp.listMax = _sortList.sort()[10]
  _temp.preMax = _sortPrelist.sort()[10]
  state.attitudeLoss = _temp;
}

export const GET_MARKET_JOB_BY_PARAM = (state, param) => {
  // 临时job集合
  var temp = state.marketJob;
  var final = []
  // 关闭的job
  var _stopArray = temp.filter(data => {
    var opt = JSON.parse(data.filter_option)
    return data.status === 'CLOSED' && opt && opt.deadline !== undefined
  })
  // 未关闭的job
  var _runArray = temp.filter(data => {
    return data.status !== 'CLOSED'
  })
  // 没有活动执行时间
  var noDeadline = temp.filter(data => {
    var opt = JSON.parse(data.filter_option)
    return opt && opt.deadline === undefined
  })
  // 未关闭的job 且为开启后一直运行
  var _alwaysRunArray = _runArray.filter(data => {
    var opt = JSON.parse(data.filter_option)
    return opt && opt.deadline && opt.deadline.length === 0
  })
  // 未关闭的job 且自定义且结束时间非空
  var _customTimeArray = _runArray.filter(data => {
    var opt = JSON.parse(data.filter_option)
    return opt && opt.deadline && opt.deadline.length > 0 && opt.deadline[1] !== '0'
  })
  // 未关闭的job 自定义且结束时间为不限制
  var _customEndTimeUnlimitArray = _runArray.filter(data => {
    var opt = JSON.parse(data.filter_option)
    return opt && opt.deadline && opt.deadline.length > 0 && opt.deadline[1] === '0'
  })

  // 按快结束时间排序
  if (param === 'end_time' || !param) {
    // 1.先排序自定义时间 且结束时间非空的任务
    var part1 = _customTimeArray.sort((a, b) => {
      var opta = JSON.parse(a.filter_option)
      var optb = JSON.parse(b.filter_option)
      return moment(opta.deadline[1]).valueOf() - moment(optb.deadline[1]).valueOf()
    })
    // 2.自定义结束时间 且结束时间为不限制
    var part2 = part1.concat(_customEndTimeUnlimitArray)
    // 3.开启后一直运行
    var part3 = part2.concat(_alwaysRunArray)
    // 4.关闭的job
    final = part3.concat(_stopArray)
    // 按快启用时间排序
  } else if (param === 'activity_time') {
    // 自定义时间部分排序
    part1 = _customTimeArray.sort((a, b) => {
      var opta = JSON.parse(a.filter_option)
      var optb = JSON.parse(b.filter_option)
      return moment(opta.deadline[0]).valueOf() - moment(optb.deadline[0]).valueOf()
    })
    // 1.开启后一直运行的job在最前面
    // 2.自定义时间放在其后面
    part2 = _alwaysRunArray.concat(part1)
    // 3.未开启job放在末尾 没有执行时间的放在最末尾
    final = part2.concat(_stopArray)
  }
  state.marketJobByParam = final.concat(noDeadline)
}
export const UPDATE_MARKET = (state, data) => {
  state.market = data;
}
export const GET_MARKET_P4P_SYSID = (state, data) => {
  state.marketingSysId = data;
}
export const UPDATE_IS_SHAER = (state, data) => {
  state.messageIsShare = data;
}
export const SET_ALREADY = (state, data) => {
  state.setCenterAlreadyState = data;
}
export const UPDATE_IS_P4P_SYS_MARKETINGJOB = (state, data) => {
  state.isSysMarketingjob = data;
}
//成果详单
export const GET_RESULE_DETAIL = (state, [data, sortBy]) => {
  if (!data) data = []
  data = utils.dirtyDataProcess(data)
  if (store.state.settingGlobal.IS_HIDE_ID == 1) {
    data.forEach(o => {
      o.buyer_nick = o.buyer_nick.substr(0, 1) + o.buyer_nick.substr(0, o.buyer_nick.length - 2).replace(/./g, '*') + o.buyer_nick.substr(-1)
      // o.tid_change = o.tid.replace(/(\d{1})\d{4}(\d{1})/, '$1************$2')
    })
  }
  //隐藏会员等级
  data.forEach(grade => {
    grade.grade_crm = '/'
  })
  state.resultDetailData = data
  // var temp = data
  // 排序
  // state.resultDetailData = temp.sort((a, b) => {
  //   return moment(b.sort_time).valueOf() - moment(a.sort_time).valueOf()
  // })
}
export const GET_RESULE_DETAIL_BY_PARAM = (state, [pagination, keyword, lastDate, buyDateRang]) => {
  var tempRet = utils.data_filte(state.resultDetailData, pagination, keyword, lastDate, buyDateRang)
  state.filterResultDetailData = pagination.doPage(tempRet)
}
//推送记录
export const GET_PUSH_RECORD = (state, [data, sortBy]) => {
  if (!data) data = []
  data = utils.dirtyDataProcess(data)
  if (store.state.settingGlobal.IS_HIDE_ID == 1) {
    data.forEach(o => {
      o.buyer_nick = o.buyer_nick.substr(0, 1) + o.buyer_nick.substr(0, o.buyer_nick.length - 2).replace(/./g, '*') + o.buyer_nick.substr(-1)
      // o.tid_change = o.tid.replace(/(\d{1})\d{4}(\d{1})/, '$1************$2')
    })
  }
  //隐藏会员等级
  data.forEach(grade => {
    grade.grade_crm = '/'
  })
  state.pushRecordData = data
  // 排序
  // state.pushRecordData = temp.sort((a, b) => {
  //   return moment(b.sort_time).valueOf() - moment(a.sort_time).valueOf()
  // })
}
export const GET_PUSH_RECORD_BY_PARAM = (state, [pagination, keyword, lastDate, buyDateRang]) => {
  var tempRet = utils.data_filte(state.pushRecordData, pagination, keyword, lastDate, buyDateRang)
  state.filterPushRecordData = pagination.doPage(tempRet)
}
//退订记录
export const GET_UNSUBSCRIBE_RECORD = (state, [data, sortBy]) => {
  if (!data) data = []
  data = utils.dirtyDataProcess(data)
  if (store.state.settingGlobal.IS_HIDE_ID == 1) {
    data.forEach(o => {
      o.buyer_nick = o.buyer_nick.substr(0, 1) + o.buyer_nick.substr(0, o.buyer_nick.length - 2).replace(/./g, '*') + o.buyer_nick.substr(-1)
      // o.tid_change = o.tid.replace(/(\d{1})\d{4}(\d{1})/, '$1************$2')
    })
  }
  //隐藏会员等级
  data.forEach(grade => {
    grade.grade_crm = '/'
  })
  state.unsubscribeRecordData = data
  // 排序
  // state.unsubscribeRecordData = data.sort((a, b) => {
  //   return moment(b.sort_time).valueOf() - moment(a.sort_time).valueOf()
  // })
}
export const GET_UNSUBSCRIBE_RECORD_BY_PARAM = (state, [pagination, keyword, lastDate, buyDateRang]) => {
  var tempRet = utils.data_filte(state.unsubscribeRecordData, pagination, keyword, lastDate, buyDateRang)
  state.filterUnsubscribeRecordData = pagination.doPage(tempRet)
}
//千牛任务
export const GET_QIANNIU_TASK = (state, [data, sortBy]) => {
  // if (!data) data = []
  // data = utils.dirtyDataProcess(data)
  // if (store.state.settingGlobal.IS_HIDE_ID == 1) {
  //   data.forEach(o => {
  //     o.buyer_nick = o.buyer_nick.substr(0, 1) + o.buyer_nick.substr(0, o.buyer_nick.length - 2).replace(/./g, '*') + o.buyer_nick.substr(-1)
  //     // o.tid_change = o.tid.replace(/(\d{1})\d{4}(\d{1})/, '$1************$2')
  //   })
  // }
  // //隐藏会员等级
  // data.forEach(grade => {
  //   grade.grade_crm = '/'
  // })
  // state.qianniuTaskData = data
  if (!data) data = []
  data = utils.dirtyDataProcess(data)
  if (store.state.settingGlobal.IS_HIDE_ID == 1) {
    data.forEach(o => {
      o.buyer_nick = o.buyer_nick.substr(0, 1) + o.buyer_nick.substr(0, o.buyer_nick.length - 2).replace(/./g, '*') + o.buyer_nick.substr(-1)
      // o.tid_change = o.tid.replace(/(\d{1})\d{4}(\d{1})/, '$1************$2')
    })
  }
  //隐藏会员等级
  data.forEach(grade => {
    grade.grade_crm = '/'
  })
  state.qianniuTaskData = data
}
export const GET_QIANNIU_TASK_BY_PARAM = (state, [pagination, keyword, lastDate, buyDateRang]) => {
  var tempRet = utils.data_filte(state.qianniuTaskData, pagination, keyword, lastDate, buyDateRang)
  state.filterQianniuTaskData = pagination.doPage(tempRet)
}
export const UPDATE_PROCESS = (state, data) => {
  data.processText = ''
  var pdata = state.processData
  if (data && data.show) {
    data.orderProcess = data.orderProcess ? data.orderProcess : (pdata.orderProcess ? pdata.orderProcess : 0)
    data.goodsProcess = data.goodsProcess ? data.goodsProcess : (pdata.goodsProcess ? pdata.goodsProcess : 0)
    data.processText = '上传完成' + parseInt((parseFloat(data.orderProcess) + parseFloat(data.goodsProcess)) / 2) + '%'
  }
  state.processData = Object.assign({}, state.processData, data)
}
//防止重复点击
export const REPEAT_CLICK = (state, data) => {
  var o = !state.repeatClickState
  state.repeatClickState = o
}
//验证临时存储
export const VERIFICATION = (state, obj) => {
  //state.verificationData = obj
  state.verificationData = Object.assign({}, state.verificationData, obj)
}
//清空验证
export const EMPTY_VERIFICATION = (state) => {
  state.verificationData = {}
}
//用户权限验证
export const JURISDICTION_VERIFICATION = (state, data) => {
  var juriDate = {
    //最高权限
    allShow: true,
    //第二级权限
    secondShow: true,
    //三级权限
    thirdShow: true
  }
  var isShow = utils.checkJTest(state.userData.user_id)
  if (isShow == 'all') {
  } else if (isShow == 'part') {
    juriDate.allShow = false
  } else {
    juriDate.allShow = false
    juriDate.secondShow = false
    juriDate.thirdShow = false
  }
  state.jurisdictionData = juriDate
  //state.jurisdictionData = utils.checkJurisdiction(state.userData.user_id)
}
//获取合并订单
export const GET_MAERGE_ORDER = (state, data) => {
  let _data = utils.processData(data, 'pic', true)
  _data.forEach(o => {
    o.name_change = o.name.substr(0, 1) + o.name.substr(0, o.name.length - 2).replace(/./g, '*') + o.name.substr(-1)
    o.phone_change = o.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  })
  state.maergeOrderData = _data.sort((a, b) => {
    if (!a.pay_date || !b.pay_date) return 0
    return moment(b.pay_date).valueOf() - moment(a.pay_date).valueOf()
  })
}
export const GET_MAERGE_ORDER_BY_PARAM = (state, [pagination]) => {
  state.filterMaergeOrderData = pagination.doPage(state.maergeOrderData)
}
//获取双11头部日历信息
export const GET_CALENDAR_DATE = (state, [data, type]) => {
  if (!data || data.length === undefined) {
    data = []
  }
  var that = this
  // 加工数组,变为{date:value},例如之前为[{"date" : "2017-10-12","numbers" : 55},{"date" : "2017-10-13","numbers" : 100}] 处理后为{"2017-10-12":55,"2017-10-13":100}
  var _data = {}
  var _type = type == 'double12' ? '-11-01' : '-10-01'
  //获取当前的年份 整合当年的 10月1号 或 11月1号
  var _now_year = moment().format('YYYY') + _type
  //将每天发送人数整合成可用的json
  data.forEach(o => {
    _data[o.date] = o.numbers
  })
  var num = 61
  var _cale = []
  for (var i = 0; i < num; i++) {
    var _date = moment(new Date(_now_year)).add(i, 'days')
    _cale.push({
      message: '',
      days: [{
        week: global.weeks[parseInt(moment(_date).format('d'))],
        day: moment(_date).format('D'),
        message: _data[moment(_date).format('YYYY-MM-DD')] ? _data[moment(_date).format('YYYY-MM-DD')] : '0',
        date: moment(_date).format('YYYY-MM-DD'),
        className: utils.getCalendreClass(moment(_date).format('MM-DD'), type)
      }]
    })
  }
  if (type == 'double12') {
    var _firstHot_12 = {
      message: '预热第一波',
      days: [
        _cale[30].days[0],
        _cale[31].days[0],
        _cale[32].days[0],
      ]
    }
    var _s_orgasm_12 = {
      message: '小高潮',
      days: [
        _cale[38].days[0],
        _cale[39].days[0],
      ]
    }
    var _end_double_12 = {
      message: '缓冲日',
      days: [
        _cale[42].days[0],
        _cale[43].days[0],
      ]
    }
    _cale.splice(30, 3, _firstHot_12)
    _cale.splice(36, 2, _s_orgasm_12)
    _cale.splice(39, 2, _end_double_12)
    _cale[37].message = '巩固日'
    _cale[38].message = '爆发日'
  } else {
    var _before = {
      message: '前置日',
      days: [
        _cale[27].days[0],
        _cale[28].days[0]
      ]
    }
    var _firstHot = {
      message: '预热第一波',
      days: [
        _cale[31].days[0],
        _cale[32].days[0],
        _cale[33].days[0],
      ]
    }
    var _s_orgasm = {
      message: '小高潮',
      days: [
        _cale[34].days[0],
        _cale[35].days[0],
      ]
    }
    var _end_double = {
      message: '缓冲日',
      days: [
        _cale[42].days[0],
        _cale[43].days[0],
      ]
    }
    _cale.splice(27, 2, _before)
    _cale.splice(30, 3, _firstHot)
    _cale.splice(31, 2, _s_orgasm)
    _cale.splice(38, 2, _end_double)
    _cale[36].message = '巩固日'
    _cale[37].message = '爆发日'
  }
  state.calendarDate = _cale
}
export const GET_FILCALENDAR_DATA = (state, date) => {
  var _temp = state.calendarDate
  var endDate = moment(new Date(date)).add(16, 'days')
  var filCale = _temp.filter(o => {
    return moment(o.date).isBetween(date, endDate) || moment(o.date).isSame(date) || moment(o.date).isSame(endDate)
  })
  state.filCalendarData = filCale
}
//获取合并订单发送短信内容
export const GET_MAERGE_MESSAGE = (state, data) => {
  state.maergeMessage = data
}
//更新测试发送短信内容
export const UPDATE_MARKET_JSON = (state, data) => {
  state.marketJson = data
}
//显示同步数据
export const SHOW_SYNCHRONOUS_DATA = (state, data) => {
  state.synchronousData = data
}
//显示版本更新弹框
export const SHOW_VERSION_UPDATE = (state, data) => {
  state.versionUpdate = data
}
// 头部重要信息
export const GET_IMPORTANT_MESSAGE = (state, data) => {
  var _data = data
  if (_data.length > 0) {
    for (var i in _data) {
      if (_data[i].type == 'IMPORT' || _data[i].type == 'EDITGOODS') {
        _data[i].openModel = global.headerMessageRoad[_data[i].type]
      } else {
        _data[i].path = global.headerMessageRoad[_data[i].type]
      }
    }
  }
  state.importantMessage = _data
}
// 店铺扣费规则
export const GET_DEDUCTION_RULE = (state, data) => {
  state.deductionRule = data
}
// 导入进度条
export const GET_PROGRESS = (state, data) => {
  let _data = data
  if (_data.hasOwnProperty('progress_info')) {
    for (let i in _data.progress_info) {
      if (_data.progress_info[i].finish_time) {
        _data.progress_info[i].finish_time = moment(_data.progress_info[i].finish_time).format('MM-DD HH:mm:ss')
      }
      if (_data.progress_info[i].state === 'wait') {
        _data.actived = parseInt(i)
        break;
      }
    }
    if (_data.progress_info[4].state === 'success') {
      _data.actived = 5
    }
  }
  state.progressData = _data
}
// 付款订单
export const GET_PAY_ORDER_DATA = (state, data) => {
  state.payOrderData = data
}
// 客服中心数据
export const GET_SERVER_CENTER_DATA = (state, data) => {
  state.serverCenterData = data
}
