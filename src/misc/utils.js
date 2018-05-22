/* 工具类函数
 * @Author: baymax
 * @Date: 2017-03-18 13:58:19
 * @Last Modified by: xiamu
 * @Last Modified time: 2017-12-15 11:46:57
 */
import moment from 'moment'
import vue from 'vue'
import global from './global.constant'
import utils from '../misc/utils'
import calendar from '../assets/js/calendar'
// 用于计算替换插入关键字后的短信字数
const shortList = global.shortList
const _phoneRex = /^1[34578]\d{9}$/
export default {
  phoneRex: /^1[34578]\d{9}$/, // 验证手机号码
  phoneRexNoStrict: /^\d{11}$/, // 验证手机号码, 只验证位数和必须是数字
  trim(value) {
    return value.replace(/(^\s+)|(\s+$)/g, "")
  },
  dateRangeFormat(rangeDay) {
    if (!rangeDay) {
      return {
        startDate: '',
        endDate: ''
      }
    }
    var _startDate = rangeDay.split(' - ')[0] ? rangeDay.split(' - ')[0] : ''
    var _endDate = rangeDay.split(' - ')[1] ? rangeDay.split(' - ')[1] : ''
    return {
      startDate: _startDate,
      endDate: _endDate
    }
  },
  checkPhone(rule, value, callback) {
    if (value) {
      if (!_phoneRex.test(value)) {
        callback(new Error('手机号格式不正确'));
      } else {
        callback();
      }
    } else {
      callback();
    }
  },
  checkQQ(rule, value, callback) {
    if (value) {
      if (!/^\d{5,15}$/.test(value)) {
        callback(new Error('QQ格式不正确'));
      } else {
        callback();
      }
    } else {
      callback();
    }
  },
  copyArr(arr) {
    return arr.map((e) => {
      if (typeof e === 'object') {
        return Object.assign({}, e)
      } else {
        return e
      }
    })
  },
  getRealMarketType(val) {
    return val.replace('_P4P_CUSTOM', '').replace('_P4P_SYS', '')
  },
  ///////////////localStore 过期时间函数//////////////////
  setLocalStore(key, value) {
    if (value.data) {
      value = value.data
    }
    var curTime = new Date().getTime();
    window.localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }));
  },
  getLocalStore(data) {
    var dataObj = data
    if (new Date().getTime() - dataObj.time > 1000 * 60 * 60) {
      return {
        timeout: true,
        data: dataObj.data
      }
    } else {
      return {
        timeout: false,
        data: dataObj.data
      }
    }
  },
  ///////////////// 消息提醒 /////////////////
  showSuccessMsg(t, msg, cb) {
    t.$message({
      message: msg,
      type: 'success',
      customClass: 'message_position',
      onClose: () => {
        if (cb) {
          cb()
        }
      }
    })
  },
  showErrorMsg(t, msg, cb) {
    t.$message({
      message: msg,
      type: 'error',
      customClass: 'message_position',
      onClose: () => {
        if (cb) {
          cb()
        }
      }
    })
  },
  /**
   * 非空验证并转化时间格式
   * @param {any} dateVal
   */
  format_date(dateVal) {
    if (dateVal == '' || dateVal == undefined) {
      return '/'
    } else {
      return moment(dateVal).format('YYYY-MM-DD') === 'Invalid date' ? '/' : moment(dateVal).format('YYYY-MM-DD')
    }
  },
  format_time(dateVal) {
    if (dateVal == '' || dateVal == undefined) {
      return '/'
    } else {
      return moment(dateVal).format('HH:mm') === 'Invalid date' ? '/' : moment(dateVal).format('HH:mm')
    }
  },
  format_time_all(dateVal) {
    if (dateVal == '' || dateVal == undefined) {
      return '/'
    } else {
      return moment(dateVal).format('HH:mm:ss') === 'Invalid date' ? '/' : moment(dateVal).format('HH:mm:ss')
    }
  },
  format_All_time(dateVal) {
    if (dateVal == '' || dateVal == undefined) {
      return '/'
    } else {
      return moment(dateVal).format('YYYY-MM-DD HH:mm:ss') === 'Invalid date' ? '/' : moment(dateVal).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  /**
   * 非空验证
   * @param {any} dateVal
   */
  is_null(dateVal) {
    if (dateVal == '' || dateVal == undefined) {
      return '/'
    } else {
      return dateVal
    }
  },
  format_money(value, num) {
    if (value === 0 || value === '/') return value
    if (!value) return '/'
    var _num = num ? num : 2
    var temp = parseFloat(value).toFixed(_num).toString().split('.')
    return temp[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + temp[1]
  },
  format_per(value) {
    if (value === 0 || value === '/') return value
    if (!value) return '/'
    return (parseFloat(value) * 100).toFixed(2) + '%'
  },
  data_filte(data, pagination, keyword) {
    var tempRet = data.filter(o => {
      var tempKey = this.trim(keyword)
      var keyWordOk
      if (tempKey.length === 0) {
        keyWordOk = true;
      } else {
        for (var key in o) {
          if (o[key].toString().indexOf(tempKey) >= 0) {
            keyWordOk = true;
          }
        }
      }
      if (keyWordOk) {
        return true
      } else {
        return false
      }
    })
    return tempRet
  },
  // 发送频率校验
  checkSendTimes(verification) {
    var checkSendTimes = function (rule, value, callback) {
      var reg = /^\+?[1-9]\d*$/g;
      if (!value) {
        verification({
          intervalInvalid: true,
          inter_message: '不能为空'
        })
        return callback(new Error(''));
      } else if (!reg.test(value)) {
        verification({
          intervalInvalid: true,
          inter_message: '请输入大于0的整数'
        })
        return callback(new Error(''));
      } else {
        verification({
          intervalInvalid: false
        })
        callback()
      }
    }
    return checkSendTimes
  },
  // 活动备注
  checkActiveTitle(verification) {
    var checkActiveTitle = function (rule, value, callback) {
      if (value.length > 30) {
        verification({
          active_remark_invalid: true,
          active_remark_message: '最多30个字'
        })
        return callback(new Error(''));
      } else {
        verification({
          active_remark_invalid: false,
          active_remark_message: ''
        })
        callback()
      }
    }
    return checkActiveTitle
  },
  // 校验订单金额
  // 起始金额
  checkMoney(verification, conf) {

    var checkMoney = function (rule, value, callback) {
      var reg = /^[0-9]+(.[0-9]{1,2})?$/g;
      if (value.length == 0) {
        if (conf) {
          conf = Object.assign({}, conf, {
            payment_end_invalid: false,
            payment_start_invalid: false,
          })
        } else {
          verification({
            payment_end_invalid: false,
            payment_start_invalid: false,
          })
        }

        callback();
        return
      }
      if (!value[0] || parseFloat(value[0]) <= 0) {
        if (conf) {
          conf = Object.assign({}, conf, {
            payment_start_invalid: true,
            payment_start_invalid_msg: '请输入大于0的数字'
          })
        } else {
          verification({
            payment_start_invalid: true,
            payment_start_invalid_msg: '请输入大于0的数字'
          })
        }
        return callback(new Error(''));
      } else if (!reg.test(value[0])) {
        if (conf) {
          conf = Object.assign({}, conf, {
            payment_start_invalid: true,
            payment_start_invalid_msg: '请输入一个数字(小数点后最多有二位)'
          })

        } else {
          verification({
            payment_start_invalid: true,
            payment_start_invalid_msg: '请输入一个数字(小数点后最多有二位)'
          })
        }

        return callback(new Error(''));
      } else {
        reg = /^[0-9]+(.[0-9]{1,2})?$/g;
        if (!value[1] || parseFloat(value[1]) === 0) {
          if (conf) {
            conf = Object.assign({}, conf, {
              payment_start_invalid: false,
              payment_end_invalid: true,
              payment_end_invalid_msg: '请输入大于0的数字'
            })

          } else {
            verification({
              payment_start_invalid: false,
              payment_end_invalid: true,
              payment_end_invalid_msg: '请输入大于0的数字'
            })
          }

          return callback(new Error(''));
        } else if (!reg.test(value[1])) {
          if (conf) {
            conf = Object.assign({}, conf, {
              payment_start_invalid: false,
              payment_end_invalid: true,
              payment_end_invalid_msg: '请输入一个数字(小数点后最多有二位)'
            })

          } else {
            verification({
              payment_start_invalid: false,
              payment_end_invalid: true,
              payment_end_invalid_msg: '请输入一个数字(小数点后最多有二位)'
            })
          }

          return callback(new Error(''));
        } else if (parseFloat(value[1]) <= value[0]) {
          if (conf) {
            conf = Object.assign({}, conf, {
              payment_start_invalid: false,
              payment_end_invalid: true,
              payment_end_invalid_msg: '要大于起始订单金额'
            })

          } else {
            verification({
              payment_start_invalid: false,
              payment_end_invalid: true,
              payment_end_invalid_msg: '要大于起始订单金额'
            })
          }

          return callback(new Error(''));
        } else {
          if (conf) {
            conf = Object.assign({}, conf, {
              payment_start_invalid: false,
              payment_end_invalid: false,
            })

          } else {
            verification({
              payment_start_invalid: false,
              payment_end_invalid: false,
            })
          }

          callback();
        }
      }
    }
    return checkMoney
  },

  // 商品件数校验
  checkBuys(verification, conf) {
    var checkBuys = function (rule, value, callback) {
      var reg = /^[0-9]+$/g;
      if (value.length == 0) {
        verification({
          buys_start_invalid: false,
          buys_end_invalid: false
        })
        callback()
        return
      }
      //   可以为空
      if (value[0] == '') {
        verification({
          buys_start_invalid: false,
        })
        callback()
        return
      } else if (parseFloat(value[0]) === 0 || !reg.test(value[0])) {
        verification({
          buys_start_invalid: true,
          buys_start_invalid_msg: '请输入大于0的整数'
        })
        return callback(new Error(''));
      } else {
        reg = /^[0-9]+$/g;
        //   可以为空
        if (value[1] == '') {
          verification({
            buys_start_invalid: false,
            buys_end_invalid: false,
          })
          callback()
          return
        } else if (parseFloat(value[1]) === 0 || !reg.test(value[1])) {
          verification({
            buys_start_invalid: false,
            buys_end_invalid: true,
            buys_end_invalid_msg: '请输入大于0的整数'
          })
          return callback(new Error(''));
        } else if (parseFloat(value[1]) < parseFloat(value[0])) {
          verification({
            buys_start_invalid: false,
            buys_end_invalid: true,
            buys_end_invalid_msg: '要大于等于起始商品件数'
          })
          return callback(new Error(''));
        } else {
          verification({
            buys_start_invalid: false,
            buys_end_invalid: false,
          })
          callback();
        }
      }
    }
    return checkBuys
  },
  // 验证购物次数
  checkBuyTimes(verification, conf) {
    var checkBuyTimes = function (rule, value, callback) {
      var reg = /^[0-9]+$/g;
      if (value.length == 0) {
        verification({
          count_start_invalid: false,
          count_end_invalid: false
        })
        callback()
        return
      }
      //   可以为空
      if (value[0] == '') {
        verification({
          count_start_invalid: false,
        })
        callback()
        return
      } else if (parseFloat(value[0]) === 0 || !reg.test(value[0])) {
        verification({
          count_start_invalid: true,
          count_start_invalid_msg: '请输入大于0的整数'
        })
        return callback(new Error(''));
      } else {
        reg = /^[0-9]+$/g;
        //   可以为空
        if (value[1] == '') {
          verification({
            count_start_invalid: false,
            count_end_invalid: false,
          })
          callback()
          return
        } else if (parseFloat(value[1]) === 0 || !reg.test(value[1])) {
          verification({
            count_start_invalid: false,
            count_end_invalid: true,
            count_end_invalid_msg: '请输入大于0的整数'
          })
          return callback(new Error(''));
        } else if (parseFloat(value[1]) < parseFloat(value[0])) {
          verification({
            count_start_invalid: false,
            count_end_invalid: true,
            count_end_invalid_msg: '要大于等于起始商品件数'
          })
          return callback(new Error(''));
        } else {
          verification({
            count_start_invalid: false,
            count_end_invalid: false,
          })
          callback();
        }
      }
    }
    return checkBuyTimes
  },
  // 验证购物次数
  checkOrderTypes(verification, conf) {
    var checkOrderTypes = function (rule, value, callback) {
      var reg = /^[0-9]+$/g;
      if (value.length == 0) {
        verification({
          order_start_invalid: false,
          order_end_invalid: false
        })
        callback()
        return
      }
      //   可以为空
      if (value[0] == '') {
        verification({
          order_start_invalid: false,
        })
        callback()
        return
      } else if (parseFloat(value[0]) === 0 || !reg.test(value[0])) {
        verification({
          order_start_invalid: true,
          order_start_invalid_msg: '请输入大于0的整数'
        })
        return callback(new Error(''));
      } else {
        reg = /^[0-9]+$/g;
        //   可以为空
        if (value[1] == '') {
          verification({
            order_start_invalid: false,
            order_end_invalid: false,
          })
          callback()
          return
        } else if (parseFloat(value[1]) === 0 || !reg.test(value[1])) {
          verification({
            order_start_invalid: false,
            order_end_invalid: true,
            order_end_invalid_msg: '请输入大于0的整数'
          })
          return callback(new Error(''));
        } else if (parseFloat(value[1]) < parseFloat(value[0])) {
          verification({
            order_start_invalid: false,
            order_end_invalid: true,
            order_end_invalid_msg: '要大于等于起始商品件数'
          })
          return callback(new Error(''));
        } else {
          verification({
            order_start_invalid: false,
            order_end_invalid: false,
          })
          callback();
        }
      }
    }
    return checkOrderTypes
  },
  //验证手机号
  checkMobilePhone(verification) {
    return function (rule, value, callback) {
      if (!value) {
        verification({
          send_mobile_user_invalid: true,
          send_mobile_user_invalid_msg: '手机号不能为空'
        })
        return callback(new Error(''));
      } else if (!_phoneRex.test(value)) {
        verification({
          send_mobile_user_invalid: true,
          send_mobile_user_invalid_msg: '手机号格式不正确'
        })
        return callback(new Error(''));
      } else {
        verification({
          send_mobile_user_invalid: false,
        })
        callback();
      }
    }
  },
  //验证营销执行时间
  checkDeadline(verification) {
    var checkDeadline = function (rule, value, callback) {
      if (value.length == 0) {
        verification({
          deadline_start_invalid: false,
          deadline_end_invalid: false
        })
        callback()
        return
      }
      if (value[0] == '' || value[0] == undefined) {
        verification({
          deadline_start_invalid: true,
          deadline_start_invalid_msg: '开始时间不能为空'
        })
        return callback(new Error(''));
      } else if (value[1] == '' || value[1] == undefined) {
        verification({
          deadline_start_invalid: false,
          deadline_end_invalid: false
        })
        callback()
        return
      } else if (moment(value[1]).valueOf() - moment(value[0]).valueOf() <= 60000) {
        verification({
          deadline_end_invalid: true,
          deadline_end_invalid_msg: '结束时间要大于开始时间'
        })
        return callback(new Error(''));
      } else {
        verification({
          deadline_start_invalid: false,
          deadline_end_invalid: false
        })
        callback()
      }
    }
    return checkDeadline
  },
  //验证下单时间
  checkOrderTime(verification) {
    var checkOrderTime = function (rule, value, callback) {
      if (value.length == 0) {
        verification({
          ordertime_start_invalid: false,
          ordertime_end_invalid: false
        })
        callback()
        return
      }
      if (value[0] == '' || value[0] == undefined) {
        verification({
          ordertime_start_invalid: true,
          ordertime_start_invalid_msg: '开始时间不能为空'
        })
        return callback(new Error(''));
      } else if (value[1] == '' || value[1] == undefined) {
        verification({
          ordertime_start_invalid: false,
          ordertime_end_invalid: false
        })
        callback()
        return
      } else if (moment(value[1]).valueOf() - moment(value[0]).valueOf() <= 60000) {
        verification({
          ordertime_end_invalid: true,
          ordertime_end_invalid_msg: '结束时间要大于开始时间'
        })
        return callback(new Error(''));
      } else {
        verification({
          ordertime_start_invalid: false,
          ordertime_end_invalid: false
        })
        callback()
      }
    }
    return checkOrderTime
  },
  //验证发送时间
  checkDay(verification, that) {
    var checkDay = (rule, value, callback) => {
      if (that.baseMConfigData.send_time_label === undefined || that.baseMConfigData.send_time_label === '') {
        verification({
          send_day_invalid: false,
        })
        callback()
        return
      }
      if (value == '不能为空' || value == undefined) {
        callback()
        return
      }
      var reg = /^\+?[1-9]\d*$/g;
      if (value == '') {
        verification({
          send_day_invalid: true,
          send_day_invalid_msg: '不能为空'
        })
        return callback(new Error(''));
        // this.sendDay = true,
        // this.sendDayContent = '不能为空'
      } else if (!reg.test(value)) {
        verification({
          send_day_invalid: true,
          send_day_invalid_msg: '请输入大于0的整数'
        })
        return callback(new Error(''));
        // this.sendDay = true,
        // this.sendDayContent = '请输入大于0的整数'
      } else {
        verification({
          send_day_invalid: false,
          send_day_invalid_msg: ''
        })
        callback()
      }
    }
    return checkDay
  },
  checkTime(verification, that) {
    var checkTime = (rule, value, callback) => {
      if (that.baseMConfigData.send_time_label === undefined || that.baseMConfigData.send_time_label === '') {
        verification({
          send_time_invalid: false,
        })
        callback()
        return
      }
      if (value == '请选择') {
        verification({
          send_time_invalid: false,
        })
        callback()
        return
      }
      if (!value) {
        verification({
          send_time_invalid: true,
        })
        return callback(new Error(''));
        //this.isSendTime = true
      } else {
        verification({
          send_time_invalid: false,
        })
        callback()
      }
    }
    return checkTime
  },
  //验证是否有权限查看开发中的内容
  checkJurisdiction(value) {
    //return global.user_jurisdiction.indexOf(value) >= 0 ? true : global.user_jurisdiction_part.indexOf(value) >= 0 ? 'part' : false
    return global.user_jurisdiction.indexOf(value) >= 0
  },
  checkJTest(value) {
    return global.user_jurisdiction.indexOf(value) >= 0 ? 'all' : global.user_jurisdiction_part.indexOf(value) >= 0 ? 'part' : false
  },
  /**
   * 通用数组去重函数 例如[1,2,333,333,333] 去重后是[1,2,333]
   * 不支持对象数组、多维数组
   * @param {Array} arr 数组
   * @returns 去重后的数组
   */
  commonArrayUnique(arr) {
    if (!arr) return []
    var ret = {}
    return arr.filter(o => {
      if (!ret[o]) {
        ret[o] = 1
        return true
      } else {
        return false
      }
    })
  },

  /**
   * 短信发送测试场景去重方法(非通用数组去重)
   * @param {Array} value
   * @returns 去重后的数组
   */
  arrayUnique(value, part) {
    // var _arr = []
    // for (var i in value) {
    //   var cont = 0
    //   for (var j in _arr) {
    //     if (_arr[j][part] == value[i][part]) {
    //       cont++
    //     }
    //   }
    //   if (cont == 0) {
    //     _arr.push(value[i])
    //   }
    // }
    // return _arr
    if (!value) return []
    var ret = {}
    return value.filter(o => {
      if (!ret[o[part]]) {
        ret[o[part]] = 1
        return true
      } else {
        return false
      }
    })
  },
  //脏数据处理
  dirtyDataProcess(value) {
    for (var i in value) {
      for (var j in value[i]) {
        if (!value[i][j] && value[i][j] != 0) {
          value[i][j] = ''
        }
      }
    }
    return value
  },
  // 非法字符验证
  hasKeywordDanger(content, keyword, that, msg) {
    if (!content) return false
    let contArr = content.split(' ')
    let index = 0
    for (let i = 0; i < contArr.length; i++) {
      for (let j = 0; j < keyword.length; j++) {
        if (contArr[i].indexOf(keyword[j]) >= 0) {
          if (contArr[i].indexOf('c.tb.cn/') < 0) {
            // 没有通过验证
            index++
          }
        }
      }
    }
    if (index != 0) {
      utils.showErrorMsg(that, msg ? msg : '如需链接请使用【插入变量】')
      return true
    } else {
      return false
    }
  },
  // 短信内的非法字符验证
  checkSendMsg(obj, that) {
    var k_g = global.keyword_danger
    return !this.hasKeywordDanger(obj.message, k_g, that) &&
      //  客服短信内容验证
      !this.hasKeywordDanger(obj.send_message_user, k_g, that) &&
      //  二次催付内容验证
      !this.hasKeywordDanger(obj.sencod_remind_pay ? obj.sencod_remind_pay.msg_content : '', k_g, that) &&
      //  临近关闭内容验证
      !this.hasKeywordDanger(obj.near_close_reminder ? obj.near_close_reminder.send_content : '', k_g, that)
  },
  // 公历农历转换
  calendarSwitch(row, event, cb) {
    if (event === true) {
      // 记录上次是公历还是农历 预防重复转换
      row.oldCalendar = row.calendar
    } else if (event === false) {
      // 重复选项不进行转换
      if (row.oldCalendar !== row.calendar) {
        var _dateObj = ''
        var _date = ''
        var y = parseInt(moment(row.date).format('YYYY'))
        var m = parseInt(moment(row.date).format('MM'))
        var d = parseInt(moment(row.date).format('DD'))
        // 农历
        if (row.calendar === 'lunar') {
          // 公历转农历
          _dateObj = calendar.solar2lunar(y, m, d)
          _date = _dateObj.lYear + '.' + _dateObj.lMonth + '.' + _dateObj.lDay
        } else if (row.calendar === 'gregorian') {
          // 获取当年闰月
          var leap = calendar.leapMonth(y)
          // 农历转公历
          _dateObj = calendar.lunar2solar(y, m, d, leap === m)
          _date = _dateObj.cYear + '.' + _dateObj.cMonth + '.' + _dateObj.cDay
        }
        row.date = _date
        cb()
      }
    }
  },
  //验证会员分组
  checkGroup(value) {
    var baseConf = value
    //双11场景没有会员分组
    if (baseConf.hasOwnProperty('group_label')) {
      if (baseConf.group_label == '') {
        return true
      } else if (baseConf.group_ai_id.length > 0 || baseConf.group_flag_id.length > 0 || baseConf.group_vip_id.length > 0 || baseConf.group_grade_id.length > 0 || baseConf.group_custom_id.length > 0) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
    // if (baseConf.group_label == '') {
    //   return true
    // } else if (baseConf.group_ai_id.length > 0 || baseConf.group_flag_id.length > 0 || baseConf.group_vip_id.length > 0 || baseConf.group_grade_id.length > 0 || baseConf.group_custom_id.length > 0) {
    //   return true
    // } else {
    //   return false
    // }
  },
  // echarts 中tooltip获取图例颜色
  getLegendHtml(color) {
    return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>'
  },
  // 获取目标会员当前选中的groupid以及分类名称
  getGroupDetail(baseConf) {
    var group_id = []
    var _group = ''
    if (baseConf.group_label === "AI") {
      group_id = baseConf.group_ai_id
      _group = 'AI引擎流转分组'
    } else if (baseConf.group_label === "FLAG") {
      group_id = baseConf.group_flag_id
      _group = '智能标签'
    } else if (baseConf.group_label === "VIP") {
      group_id = baseConf.group_vip_id
      _group = '导入会员批次'
    } else if (baseConf.group_label === "GRADE") {
      group_id = baseConf.group_grade_id
      _group = '会员等级分组'
    } else if (baseConf.group_label === "CUSTOM") {
      group_id = baseConf.group_custom_id
      _group = '自建营销标签'
    }
    return {
      groupName: _group,
      groupId: group_id
    }
  },
  /**
   * 根据目标会员分组id获取text（只取出部分text即可,只用于显示）
   * @param {Array} list 指定会员分组数据
   * @param {Array} curIds 选中的会员分组id
   * @returns {Array} 选中的会员分组text
   */
  getGroupTextByIds(list, curIds) {
    if (!list) return []
    var listText = []
    var tempList = []
    // 递归子节点 返回子节点数组
    var recursion = (subList, tempList) => {
      var _tempList = []
      subList.forEach(o => {
        if (o.children) {
          _tempList = _tempList.concat(recursion(o.children, tempList))
        } else {
          _tempList = _tempList.concat(o)
        }
      })
      return _tempList
    }
    // 遍历父节点
    // 将所有的子节点拼接成一个数组
    tempList = recursion(list, tempList)
    // 找到id对应的节点text放入数组 目前只取出6个节点
    for (var k = 0; k < curIds.length; k++) {
      for (var i = 0; i < tempList.length; i++) {
        if (tempList[i].id === curIds[k]) {
          listText.push(tempList[i].label)
          break
        }
      }
      if (listText.length > 3) {
        break
      }
    }
    return listText
  },
  // 保留两位小数
  toFixed2(val) {
    return parseFloat(val).toFixed(2)
  },
  //数据合并订单中的验证
  //订单金额
  checkPayment(rule, value, callback) {
    var reg = /^[0-9]+(.[0-9]{1,2})?$/g;
    var res = /^[0-9]+(.[0-9]{1,2})?$/g;
    if (value[0] !== '' && !reg.test(value[0])) {
      return callback(new Error('最低价格式错误'));
    } else if (value[1] !== '' && !res.test(value[1])) {
      return callback(new Error('最高价格式错误'));
    } else if (parseFloat(value[1]) <= parseFloat(value[0])) {
      return callback(new Error('最高价要大于最低价'));
    } else {
      callback();
      return
    }
  },
  //宝贝数
  checkNum(rule, value, callback) {
    var reg = /^[0-9]+$/g;
    var res = /^[0-9]+$/g;
    if (value[0] !== '' && !reg.test(value[0])) {
      return callback(new Error('最低个数格式错误'));
    } else if (value[1] !== '' && !res.test(value[1])) {
      return callback(new Error('最高个数格式错误'));
    } else if (parseFloat(value[1]) <= parseFloat(value[0])) {
      return callback(new Error('最高个数要大于最低个数'));
    } else {
      callback();
      return
    }
  },
  //宝贝数
  checkOrderNum(rule, value, callback) {
    var reg = /^[0-9]+$/g;
    var res = /^[0-9]+$/g;
    if (value[0] !== '' && !reg.test(value[0])) {
      return callback(new Error('最低种类数格式错误'));
    } else if (value[1] !== '' && !res.test(value[1])) {
      return callback(new Error('最高种类数格式错误'));
    } else if (parseFloat(value[1]) <= parseFloat(value[0])) {
      return callback(new Error('最高种类数要大于最低种类数'));
    } else {
      callback();
      return
    }
  },
  //日历样式
  getCalendreClass(value, type) {
    if (type == 'double12') {
      if (value == '12-01' || value == '12-02' || value == '12-03') {
        return 'first_hot'
      } else if (value == '12-09' || value == '12-10') {
        return 's_orgasm'
      } else if (value == '12-11') {
        return 'consolidation'
      } else if (value == '12-12') {
        return 'double_e'
      } else if (value == '12-13' || value == '12-14') {
        return 'end_double'
      } else {
        return 'def_color'
      }
    } else {
      if (value == '10-28' || value == '10-29') {
        return 'before_color'
      } else if (value == '11-01' || value == '11-02' || value == '11-03') {
        return 'first_hot'
      } else if (value == '11-04' || value == '11-05') {
        return 's_orgasm'
      } else if (value == '11-10') {
        return 'consolidation'
      } else if (value == '11-11') {
        return 'double_e'
      } else if (value == '11-12' || value == '11-13') {
        return 'end_double'
      } else {
        return 'def_color'
      }
    }

  },
  getNowTime() {
    return moment().format('HH:mm:ss:SSS')
  },
  printNowTime(val) {
    console.info(val + this.getNowTime())
  },
  // 宝贝改成小图
  processData(data, _url, isArr) {
    if (isArr) {
      if (data && data.length > 0) {
        data.forEach(o => {
          o.url.forEach(x => {
            x[_url] += '_60x60.jpg'
          })
        })
      }
    } else {
      if (data && data.length > 0) {
        data.forEach(o => {
          o[_url] = o[_url] + '_60x60.jpg'
        })
      }
    }
    return data
  },
  // 判断两个数组是否相等
  compareArr(arr1, arr2) {
    if (!(arr1 instanceof Array && arr2 instanceof Array)) {
      return false
    } else {
      if (arr1.length != arr2.length) {
        return false
      }
      for (let i = 0; i <= arr2.length; i++) {
        if (arr1[i] != arr2[i]) {
          return false
        }
      }
      return true
    }
  },
  ///////////// tablelist 相关函数  /////////////
  /**
   * 向列添加tooltip功能
   * @param {any} h render函数
   * @param {any} {column} 包含列的相关属性
   * @return h()
   */
  appendTip(tipText, tipOption) {
    // 渲染table头部
    // 参考 https://cn.vuejs.org/v2/guide/render-function.html#JSX
    return function (h, { column }) {
      if (tipText == '' || !tipText) {
        return h('span', column.label)
      }
      // 默认tooltip样式
      var defTipOption = {
        'placement': 'top-start',
        'popper-class': 'tool_notes',
        'effect': 'dark'
      }
      // 设置tooltip内容
      defTipOption.content = '【注释】' + tipText
      // 合并tooltip样式
      defTipOption = Object.assign({}, defTipOption, tipOption ? tipOption : {})
      var _label = column.label + ' '
      var _test = []
      if (_label.indexOf('nn') > 0) { //判断存着nn 的表示要换行
        _test = _label.split('nn')
        return h('el-tooltip', {
          attrs: defTipOption
        }, [
            h('div', [
              h('p', _test[0]),
              h('p', [
                _test[1],
                h('i', {
                  attrs: {
                    class: 'iconfont icon-help1 toolGanTanHao'
                  }
                })
              ])
            ])
          ])
      } else {
        return h('el-tooltip', { //第一层节点 tooltip组件
          attrs: defTipOption
        }, [
            h('span', [ //第二层节点 span
              _label,   //第三层节点 表头标题
              h('i',    //第三层节点 问号图标
                {
                  attrs: {
                    class: 'iconfont icon-help1 toolGanTanHao'
                  }
                }
              )
            ]
            )
          ])
      }
    }
  },
  changeExcelData(val) {
    var tmpdata = val[0]
    val.unshift({})
    var keyMap = [] //获取keys
    for (var k in tmpdata) {
      keyMap.push(k)
      val[0][k] = k
    }
    var _data = [];//用来保存转换好的json
    val.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
      v: v[k],
      position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => _data[v.position] = {
      v: v.v
    })
    var outputPos = Object.keys(_data); //设置区域,比如表格从A1到D10
    var tmpWB = {
      SheetNames: ['mySheet'], //保存的表标题
      Sheets: {
        'mySheet': Object.assign({},
          _data, //内容
          {
            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
          })
      }
    }
    return tmpWB
  },
  // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
  getCharCol(n) {
    let temCol = ''
    let s = ''
    let m = 0
    while (n > 0) {
      m = n % 26 + 1
      s = String.fromCharCode(m + 64) + s
      n = (n - m) / 26
    }
    return s
  },
  /**
   * 把后端json数据转换成Excel导出所需格式
   * @param {Object} header 表格标题
   * @param {Array} val 表格列数据
   */
  changeTableData(header, val) {
    let _arr = []
    for (var i in val) {
      var _obj = {}
      for (var j in header) {
        if (header[j].type == 'money') {
          _obj[header[j]['name']] = this.format_money(val[i][j])
        } else if (header[j].type == 'date') {
          _obj[header[j]['name']] = (val[i][j] == '' || val[i][j] == undefined) ? '' : moment(val[i][j]).format('YYYY-MM-DD HH:mm')
        } else {
          _obj[header[j]['name']] = val[i][j]
        }
      }
      _arr.push(JSON.parse(JSON.stringify(_obj)))
    }
    return _arr
  },
  /////////////////////////////////////////以下估算短信长度方法/////////////////////////////////////////
  /**
   * 估算短信长度
   * @param {String} msgContentData 短信内容
   * @param {Array} allLine 插入关键字数组
   * @param {Number} wordSize 短信字数
   * @returns {Number}
   */
  calculateMsgLen(msgContentData, allLine, wordSize) {
    let wordsArr = []
    // // 计算签名长度
    // this.wordSize = this.msgContentData.length + this.userData.sign.length + 2
    allLine.forEach((k) => {
      let key = '<' + k + '>'
      if (msgContentData.indexOf(key) >= 0) {
        // 获取已插入关键字对象数组 [{name: , len: }, {name: , len: }]
        wordsArr.push(JSON.parse(JSON.stringify(this.getKeyWords(key))))
      }
    })
    // 估算替换插入关键字后短信的实际字数
    wordSize += this.getWordSize(msgContentData, wordsArr)
    return wordSize
  },
  /**
   * 获取global中的指定关键字对象
   * @param keyWord {String} 检索的关键字
   * @return {Object} 关键字对象
   */
  getKeyWords(keyWord) {
    let list = {}
    shortList.forEach((item) => {
      if (item.name == keyWord) {
        list.name = item.name
        if (item.len) {
          list.len = item.len
        }
      }
    })
    return list
  },
  /**
   * 估算插入短信的关键字替换后的实际长度
   * @param msgCont {String} 短信内容
   * @param wordsArr {Array} 需替换的关键字数组
   * @return {Number} 替换后的实际长度
   */
  getWordSize(msgCont, wordsArr) {
    let reLen = 0
    wordsArr.forEach((item) => {
      if (msgCont.indexOf(item.name) >= 0) {
        // 插入关键字长度
        let itemLen = item.name.length
        // 计算相同关键字插入次数
        let reg = new RegExp(item.name, 'g')
        let matchTimes = msgCont.match(reg).length
        // 减去原字段长度（item.len为估计实际长度）
        if (item.len && item.len !== '') {
          reLen += (item.len - itemLen) * matchTimes
        }
      }
    })
    return reLen
  },
  /////////////////////////////////////////以上估算短信长度方法/////////////////////////////////////////
  /**
   * @param {} param 所有的值
   * @param {} api
   * @param {string} color 平均线颜色
   * @return {object} 具体参数
   */
  renderAverageItem(param, api, color) {
    var categoryIndex = api.value(0);
    var _test = moment(api.value(0)).format('d') //判断该点是礼拜几
    var nextV = '' //下个点的value
    var _num = 0
    nextV = moment(api.value(0)).add(1, 'd').valueOf()
    var point = api.coord([api.value(0), api.value(1)]);
    var point2 = api.coord([nextV, api.value(1)]);
    var _test_n = moment(categoryIndex).format('YYYY-MM-DD')
    //判断是否是最后一个点
    var _same = (param.dataIndex + 1 == param.dataInsideLength) ? true : false
    return {
      type: 'line',
      shape: {
        x1: point[0],
        x2: _same ? point[0] + 1 : point2[0] + 0.5,
        y1: point[1],
        y2: point[1]
      },
      style: api.style({
        fill: null,
        stroke: color,
        lineWidth: 1
      })
    };
  }
}
