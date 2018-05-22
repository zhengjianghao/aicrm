/* 短信处理
 * @Author: baymax
 * @Date: 2017-03-21 21:50:37
 * @Last Modified by: baymax
 * @Last Modified time: 2018-04-27 17:49:00
 */
import CommonHttpTransform from './commonHttpTransform.service'
import moment from 'moment'
import axios from 'axios'
export default {
  // 获取 短信套餐列表
  chargeList() {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/setting_sms_plan')
        .then(function (data) {
          resolve(data.data)
        })
    })
  },
  // 获取 测试短信联系人列表
  contactList() {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/contact')
        .then(function (data) {
          resolve(data.data)
        })
    })
  },
  // 删除 测试短信联系人
  deleteContact(id) {
    return CommonHttpTransform.delete('/contact/' + id)
  },
  // 修改 测试短信联系人
  updateContact(id, obj) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.put('/contact/' + id, {
        mobile: obj.mobile
      }).then(o => {
        resolve(o)
      })
    })
  },
  // 新增 测试短信联系人
  addContact(obj) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.post('/contact', {
        name: obj.name,
        mobile: obj.mobile
      }).then(o => {
        resolve(o.data)
      })
    })
  },
  // 获取 测试短信联系人分组列表
  contactGroupList() {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/contact_group')
        .then(function (data) {
          resolve(data.data)
        })
    })
  },
  // 删除 测试短信联系人分组
  deleteContactGroup(id) {
    return CommonHttpTransform.delete('/contact_group/' + id)
  },
  // 组删 测试短信联系人分除测试账号
  deleteContactGroupPhone(contactId, contactGroupId) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.delete('/contact_group/remove', {
        contact_id: contactId,
        contact_group_id: contactGroupId
      }).then(o => {
        resolve(o.data)
      })
    })
  },
  // 新增 测试短信联系人分组
  addContactGroup(groupName) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.post('/contact_group', {
        group_name: groupName
      }).then(o => {
        resolve(o.data)
      })
    })
  },
  // 修改 分组测试名称
  updateContactGroupName(contactGroupId, obj) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.put('/contact_group/' + contactGroupId, {
        group_name: obj.group_name
      }).then(o => {
        resolve(o.data)
      })
    })
  },
  // 修改 分组测试联系人
  updateContactsInGroup(contactGroupId, obj) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.post('/contact_group/sync', {
        contact_group_id: contactGroupId,
        contact_ids: obj.contact_ids
      }).then(o => {
        resolve(o.data)
      })
    })
  },
  // 添加 测试短信联系人分组测试账号
  addContactGroupPhone(contactId, contactGroupId) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.post('/contact_group/add', {
        contact_id: contactId,
        contact_group_id: contactGroupId
      }).then(o => {
        resolve(o.data)
      })
    })
  },
  //充值记录
  getChargeData(search) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/setting_order?type=' + search).then(o => {
        resolve(o.data)
      })
    })
  },
  //消费记录
  getCostOrderData(pagination, buyDateRang, searchType) {
    searchType = searchType || ''
    var _start = ''
    var _end = ''
    if (!buyDateRang || buyDateRang.length == 0 || !buyDateRang[0] || !buyDateRang[1]) {
      _start = ''
      _end = ''
    } else {
      _start = moment(buyDateRang[0]).format('YYYY-MM-DD')
      _end = moment(buyDateRang[1]).format('YYYY-MM-DD')
    }
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get(
        '/cost_order' +
        '?start_time=' + _start +
        '&end_time=' + _end +
        '&search=' + searchType +
        '&page=' + pagination.pageIndex +
        '&per_page=' + pagination.pageSize
      ).then(o => {
        pagination.totalNum = o.data.meta.pagination.total
        pagination.pageSize = o.data.meta.pagination.perPage
        pagination.pageIndex = o.data.meta.pagination.currentPage
        resolve(o.data)
      })
    })
  },
  //发送明细
  getSendDetail(pagination, dayCount, startDate, endDate, keyword) {
    dayCount = dayCount || '15'
    startDate = startDate || ''
    endDate = endDate || ''
    if (startDate || startDate) {
      dayCount = ''
    }
    return new Promise((resolve, reject) => {
      CommonHttpTransform.get(
        '/setting_sms_report' +
        '?day=' + dayCount +
        '&start_time=' + startDate +
        '&end_time=' + endDate +
        '&search=' + keyword +
        '&page=' + pagination.pageIndex +
        '&per_page=' + pagination.pageSize
      ).then(function (data) {
        pagination.totalNum = data.meta.pagination.total
        pagination.pageSize = data.meta.pagination.per_page
        pagination.pageIndex = data.meta.pagination.current_page
        resolve(data.data)
      })
    })
  },
  //速发短信，发送明细
  getSendQuickDetail(pagination, dayCount, startDate, endDate, keyword) {
    dayCount = dayCount || '15'
    startDate = startDate || ''
    endDate = endDate || ''
    if (startDate || startDate) {
      dayCount = ''
    }
    return new Promise((resolve, reject) => {
      CommonHttpTransform.get(
        '/send_sufa_report' +
        '?day=' + dayCount +
        '&start_time=' + startDate +
        '&end_time=' + endDate +
        '&search=' + keyword +
        '&page=' + pagination.pageIndex +
        '&per_page=' + pagination.pageSize
      ).then(function (data) {
        pagination.totalNum = data.meta.pagination.total
        pagination.pageSize = data.meta.pagination.per_page
        pagination.pageIndex = data.meta.pagination.current_page
        resolve(data.data)
      })
    })
  },
  // 速发短信发送任务
  getSendQuickTask(pagination, dayCount, startDate, endDate, keyword) {
    dayCount = dayCount || '15'
    startDate = startDate || ''
    endDate = endDate || ''
    if (startDate || startDate) {
      dayCount = ''
    }
    // return new Promise((resolve, reject) => {
    //   axios.get('http://localhost:3000/api/send_sufa_task').then(function (data) {
    //     // CommonHttpTransform.get(
    //     //   '/send_sufa_task' +
    //     //   '?day=' + dayCount +
    //     //   '&start_time=' + startDate +
    //     //   '&end_time=' + endDate +
    //     //   '&search=' + keyword +
    //     //   '&page=' + pagination.pageIndex +
    //     //   '&per_page=' + pagination.pageSize
    //     // ).then(function (data) {
    //     pagination.totalNum = data.data.meta.pagination.total
    //     pagination.pageSize = data.data.meta.pagination.per_page
    //     pagination.pageIndex = data.data.meta.pagination.current_page
    //     resolve(data.data.data)
    //   })
    // })
  },
  // 关闭速发短信
  stopSendQuickTask(id) {
    return new Promise(function (resolve, reject) {
      // CommonHttpTransform.get('/send_sufa_task/stop').then(o => {
      var _data = {
        state: true,
        message: '任务已经停止！'
      }
      resolve(_data)
      // })
    })
  },
  // 删除速发短信
  deleteSendQuickTask(id) {
    return new Promise(function (resolve, reject) {
      // CommonHttpTransform.get('/send_sufa_task/delete').then(o => {
      var _data = {
        state: true,
        message: '任务已经删除！'
      }
      resolve(_data)
      // console.log('delete')
      // })
    })
  },
  //参考模板
  getMessageTemplate(list, market) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/message_template' + '?list_type=' + list + '&marketing_type=' + market).then(o => {
        resolve(o.data)
      })
    })
  },
  getHistoryTemplate(list, market) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/message_template' + '?list_type=' + list + '&marketing_type=' + market).then(o => {
        resolve(o.data)
      })
    })
  },
  //引用短信模板
  useMessageTemplate(id, market) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.post('/message_template/' + id + '/used', {
        marketing_type: market
      }).then(o => {
        resolve(o.data)
      })
    })
  },
  //短信共享
  updateShare(state, type) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.post('/message_template/' + state, {
        marketing_type: type
      }).then(o => {
        resolve(o.data)
      })
    })
  },
  //新建或引用模板
  createMessageTemplate(is_copy, content, char_count, marketing_type, is_shared) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.post('/message_template', {
        is_copy: is_copy,
        content: content,
        char_count: char_count,
        marketing_type: marketing_type,
        is_shared: is_shared
      }).then(o => {
        resolve(o.data)
      })
    })
  },
  //短信测试发送
  testSend(obj) {
    return new Promise(function (resolve, reject) {
      obj.message = obj.message.replace('回TD退订', '')
      CommonHttpTransform.post('/send_test', {
        mobiles: JSON.stringify(obj.mobiles),
        message: obj.message,
        char_count: obj.char_count,
        job_id: obj.job_id,
        message_road: obj.message_road
        // shopId: obj.shopId
      }).then(o => {
        resolve(o.data)
      })
    })
  },
  //速发短信
  sendQuick(obj) {
    return new Promise(function (resolve, reject) {
      obj.message_text = obj.message_text.replace('回TD退订', '')
      CommonHttpTransform.post('/send_sufa', {
        phone: obj.phone,
        target_member: obj.target_member,
        message_text: obj.message_text,
        items: obj.items,
        send_time: obj.send_time,
        send_channel: obj.send_channel,
        name: obj.name,
        excel_name: obj.excel_name
        // shopId: obj.shopId
      }).then(o => {
        resolve(o.data)
      })
    })
  },
  //短信通道
  getMessageRoad() {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/setting_sms_channel').then(o => {
        resolve(o.data)
      })
    })
  },
  updateMessageRoad(obj) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.post('/setting_sms_channel', obj).then(o => {
        resolve(o.data)
      })
    })
  },
  //发送验证码
  sendVerifyCode(mobile) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.post('/send_verify_code', {
        mobile: mobile
      }).then(o => {
        resolve(o.data)
      })
    })
  },
  //获取安全配置信息
  getSettingContact(token) {
    var param = ''
    if (token) {
      param = '?token=' + token
    }
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/setting_contact' + param).then(o => {
        resolve(o.data)
      })
    })
  },
  //更改
  updateSettingContact(obj) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.post('/setting_contact', {
        ADMIN_NAME: obj.superAdminName,
        ADMIN_MOBILE: obj.superAdminPhone,
        REMIND_MOBILE: obj.remindPhone,
        QQ: obj.qq,
        WANGWANG: obj.wangwang,
        EMAIL: obj.email,
        CODE_ADMIN: obj.superAdminPhoneCode,
        CODE_REMIND: obj.remindPhoneCode
      }).then(o => {
        resolve(o.data)
      }, res => {
        reject(res)
      })
    })
  },
  //获取全局信息配置
  getSettingGlobal() {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/setting_global').then(o => {
        resolve(o.data)
      })
    })
  },
  updateSettingGlobal(obj) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.post('/setting_global', {
        PAYED_IN_WEEK: obj.newSevenDay,
        PAYED_IN_MONTH: obj.newEight,
        NOPAYED_IN_MONTH: obj.nobuy,
        MERGED_TRADE_INTERVAL: obj.time,
        MERGED_TRADE_ISCOVER: obj.isCover,
        IS_HIDE_ID: obj.hidID,
        IS_HIDE_NAME: obj.hidName,
        IS_HIDE_PHONE: obj.hidPhone,
        CONSIGN_NODE: obj.deliveNode,
        IS_INITIALIZATION: obj.isInitialization
      }).then(o => {
        resolve(o.data)
      })
    })
  },
  // 支付宝付款
  chargeByAli(data, userId, token) {
    data.userId = userId
    return new Promise(function (resolve, reject) {
      let ali_url = window.aicrm_app_host + '/api/alipay/alipay_trade_page_pay?out_trade_no=' + data.out_trade_no + '&total_amount=' + data.total_amount + '&subject=' + data.subject + '&body=' + data.body + '&userId=' + userId + '&order_cycle=' + data.orderCycle + '&token=' + token
      // if (data.orderCycle == 0) {
      //   resolve(ali_url)
      // } else {
      //   // CommonHttpTransform.get('/alipay/pay_confirm?userId=' + userId + '&orderCycle=' + data.orderCycle + '&body=' + data.body).then(o => {
      //   //   if (o.data === 'success') {
      //   //     resolve(ali_url)
      //   //   } else {
      //   //     resolve(false)
      //   //   }
      //   // })
      // }
      resolve(ali_url)
    })
  },
  isCanBuy(userId, orderCycle, body) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/alipay/pay_confirm?userId=' + userId + '&orderCycle=' + orderCycle + '&body=' + body).then(o => {
        if (o.data === 'success') {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  },
  // 获取客服中心数据
  getServerCenterData(pagination, dayCount, startDate, endDate, keyword, activeTabName) {
    dayCount = dayCount || '15'
    startDate = startDate || ''
    endDate = endDate || ''
    if (startDate || startDate) {
      dayCount = ''
    }
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/api/server_center' +
        // CommonHttpTransform.get(
        // '/server_center' +
        '?day=' + dayCount +
        '&start_time=' + startDate +
        '&end_time=' + endDate +
        '&search=' + keyword +
        '&page=' + pagination.pageIndex +
        '&per_page=' + pagination.pageSize +
        '&type=' + activeTabName
      ).then(function (data) {
        pagination.totalNum = data.data.meta.pagination.total
        pagination.pageSize = data.data.meta.pagination.per_page
        pagination.pageIndex = data.data.meta.pagination.current_page
        resolve(data.data.data)
      })
    })
  },
  // 修改客服中心信息状态
  updateServerCenter(id) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/api/update_server_center').then(o => {
        // CommonHttpTransform.post('/update_server_center', {
        //   id: id
        // }).then(o => {
        resolve(o.data)
      })
    })
  }
}
  /**
   * @api {get} /setting_sms_plan 充值列表
   * @apiVersion 2.0.0
   * @apiGroup message
   *
   * @apiDescription 充值列表
   *
   * @apiParam {String} token
   *
   * @apiSuccess {Number}   id    唯一标识
   * @apiSuccess {String}   item_code    购买内容标识
   * @apiSuccess {Number}   item_price    充值价格
   * @apiSuccess {Number}   sms_count    短信条数
   * @apiSuccess {Number}   sms_unit_price    折算单价（0.05）
   * @apiSuccess {String}   sms_channel    短信通道（余额：MONEY，短信：LOW）*
   * @apiSuccess {String}   order_url    充值链接
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   * [
   *  {
   *    id: 1,
   *    item_code: 'FW_GOODS-1000334943-1',
   *    item_price: 50,
   *    sms_count: 3500,
   *    sms_unit_price: 0.05,
   *    sms_channel: 'MONEY',
   *    order_url: 'xxx'
   *  }
   * ]
   *
   * @apiUse errorMessage
  */

  /**
   * @api {get} /setting_order 充值记录
   * @apiVersion 2.0.0
   * @apiGroup message
   *
   * @apiDescription 充值记录
   *
   * @apiParam {String} token
   * @apiParam {String} type  充值类型（money余额，sms短信）
   *
   * @apiSuccess {Date}   pay_time    充值时间
   * @apiSuccess {string}   channel    充值类别（预付费/自用短信）
   * @apiSuccess {string}   before_payment    充值前金额/条数*
   * @apiSuccess {String}   payment    充值金额/条数
   * @apiSuccess {String}   remain    充值后金额/条数
   * @apiSuccess {String}   type    充值方式
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   * [
   *  {
   *    pay_time: '2017-10-11 12:24:11', //或者是时间戳
   *    channel: '预付费',
   *    before_payment: '32元',
   *    payment: '35元',
   *    remain: '67元',
   *    type: '页面充值'
   *  }
   * ]
   *
   * @apiUse errorMessage
  */
  /**
   * @api {get} /cost_order 消费记录
   * @apiVersion 2.0.0
   * @apiGroup message
   *
   * @apiDescription 消费记录*
   *
   * @apiParam {String} token
   * @apiParam {Sting} start_time    开始时间
   * @apiParam {Sting} end_time    结束时间
   * @apiParam {Sting} search    搜索条件（'money预付费'/'sms短信'）
   * @apiParam {num} page    页码
   * @apiParam {num} per_page    每页显示条数
   *
   * @apiSuccess {Object[]} data
   * @apiSuccess {Date}   data.use_date    消费时间
   * @apiSuccess {string}   data.buyer_nick    买家ID (预付费和测试发送短信显示商家，其他显示具体的id)
   * @apiSuccess {string}   data.use_way    消费方式（预付费/短信）
   * @apiSuccess {String}   data.marketing_task    营销场景
   * @apiSuccess {String}   data.tid    订单编号
   * @apiSuccess {String}   data.use_money    消费金额
   *
   * @apiSuccess {Object[]} meta
   * @apiSuccess {Object[]} meta.pagination
   * @apiSuccess {Num} meta.pagination.count 当前条数
   * @apiSuccess {Num} meta.pagination.current_page 当前条数
   * @apiSuccess {Num} meta.pagination.per_page 每页条数
   * @apiSuccess {Num} meta.pagination.total 总条数
   * @apiSuccess {Num} meta.pagination.total_pages 总页数
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   * {
   * data : [
   *    {
   *      use_date: '2017-10-11 12:24:11', //或者是时间戳
   *      user_id: '12354',
   *      use_way: '预付费',
   *      marketing_task: '拍下即时营销',
   *      tid: '2135436216958465',
   *      use_money: '223'
   *    }
   *  ],
   *  meta: {
   *    pagination:{
   *        count: 10,
   *        current_page: 4,
   *        per_page: 3,
   *        total: 199,
   *        total_pages: 20
   *      }
   *    }
   * }
   *
   *
   * @apiUse errorMessage
  */

  /**
   * @api {POST} /send_sufa 速发短信
   * @apiVersion 2.0.0
   * @apiGroup message
   *
   * @apiDescription 速发短信配置 * 表示新增或修改
   *
   * @apiParam {String} token
   * @apiParam {Array} items    选中的宝贝
   * @apiParam {Sting} message_text    短信内容
   * @apiParam {Array} phone    发送手机号
   * @apiParam {Sting} send_channel    短信通道
   * @apiParam {Sting} send_time    发送时间（空为即时）修改*
   * @apiParam {Array} target_member    会员组
   * @apiParam {String} task_name    任务名称 *
   * @apiParam {String} excel_name     导入excel的名称
   *
   *
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   * {
   *  code: null,
   *  desc: "等待发送",
   *  msgid: null,
   *  provider: null
   * }
   *
   *
   * @apiUse errorMessage
  */

  /**
   * @api {get} /send_sufa_report 速发短信，发送明细
   * @apiVersion 2.0.0
   * @apiGroup message
   *
   * @apiDescription 速发短信发送明细*
   *
   * @apiParam {String} token
   * @apiParam {Sting} day    天数，近15天等
   * @apiParam {Sting} start_time    开始时间
   * @apiParam {Sting} end_time    结束时间
   * @apiParam {Sting} search    搜索关键字
   * @apiParam {Sting} page    页码
   * @apiParam {Sting} per_page    每页条数
   *
   * @apiSuccess {Object[]} data
   * @apiSuccess {string}   data.marketing_status    营销状态
   * @apiSuccess {Date}   data.marketing_time    营销时间
   * @apiSuccess {string}   data.member_id    买家id
   * @apiSuccess {String}   data.phone    发送号码
   * @apiSuccess {String}   data.name    任务名称
   *
   * @apiSuccess {Object[]} meta
   * @apiSuccess {Object[]} meta.pagination
   * @apiSuccess {Num} meta.pagination.count 当前条数
   * @apiSuccess {Num} meta.pagination.current_page 当前条数
   * @apiSuccess {Num} meta.pagination.per_page 每页条数
   * @apiSuccess {Num} meta.pagination.total 总条数
   * @apiSuccess {Num} meta.pagination.total_pages 总页数
   *
   *
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   * {
   * data : [
   *    {
   *      marketing_status: '已营销'
   *      marketing_time: '2017-10-11 12:24:11', //或者是时间戳
   *      member_id: '2313254554',
   *      phone: '13676825623',
   *      name: '任务一',
   *    }
   *  ],
   *  meta: {
   *    pagination:{
   *        count: 10,
   *        current_page: 4,
   *        per_page: 3,
   *        total: 199,
   *        total_pages: 20
   *      }
   *    }
   * }
   *
   *
   * @apiUse errorMessage
  */
  /**
   * @api {get} /send_sufa_task 速发短信，发送任务
   * @apiVersion 2.0.0
   * @apiGroup message
   *
   * @apiDescription 速发短信任务列表*
   *
   * @apiParam {String} token
   * @apiParam {Sting} day    天数，近15天等
   * @apiParam {Sting} start_time    开始时间
   * @apiParam {Sting} end_time    结束时间
   * @apiParam {Sting} search    搜索关键字
   * @apiParam {Sting} page    页码
   * @apiParam {Sting} per_page    每页条数
   *
   * @apiSuccess {Object[]} data
   * @apiSuccess {string}   data.num    序号
   * @apiSuccess {string}   data.task_id    任务id
   * @apiSuccess {Date}   data.set_time    建立时间
   * @apiSuccess {string}   data.name    任务名称
   * @apiSuccess {String}   data.send_time_start    发送时间
   * @apiSuccess {String}   data.send_channel    发送通道
   * @apiSuccess {string}   data.send_all_num    总发送数
   * @apiSuccess {Date}   data.status    处理进度
   * @apiSuccess {string}   data.send_time_end    发完时间
   * @apiSuccess {String}   data.send_success_num    总发送成功数
   * @apiSuccess {String}   data.send_defeat_num    总发送失败数
   * @apiSuccess {string}   data.items    发送宝贝
   * @apiSuccess {String}   data.message_text    发送内容
   * @apiSuccess {String}   data.receiver    接收人
   * @apiSuccess {Boolean}   data.is_stop    是否停止
   * @apiSuccess {Boolean}   data.can_stop    能否停止
   * @apiSuccess {Boolean}   data.stop_reason    如果不能停止 显示原因，能则空
   *
   * @apiSuccess {Object[]} meta
   * @apiSuccess {Object[]} meta.pagination
   * @apiSuccess {Num} meta.pagination.count 当前条数
   * @apiSuccess {Num} meta.pagination.current_page 当前条数
   * @apiSuccess {Num} meta.pagination.per_page 每页条数
   * @apiSuccess {Num} meta.pagination.total 总条数
   * @apiSuccess {Num} meta.pagination.total_pages 总页数
   *
   *
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   * {
   * data : [
   *  {
   *     num: '1',
   *     task_id: '1235413524
   *     set_time: '2014-14-01 12:21',
   *     name: '测试一',//任务名
   *     send_time_start: '2014-14-01 12:21',//发送时间
   *     send_channel: '普通通道',//送通道
   *     send_all_num: '20032',//总发送数
   *     status: '待发送',//处理进度
   *     send_time_end: '2014-14-01 12:21',//发完时间
   *     send_success_num: '13612',//|总发送成功数
   *     send_defeat_num: '2135', //总发送失败数
   *     items: '士大夫士大夫',// | 发送宝贝
   *     message_text: '手动阀地方',// | 发送内容
   *     receiver: '阿斯蒂芬啊',// | 接收人
   *     is_stop: true,
   *     can_stop: true,
   *     stop_reason: '',
   *  }
   * ],
   *  meta: {
   *    pagination:{
   *        count: 10,
   *        current_page: 4,
   *        per_page: 3,
   *        total: 199,
   *        total_pages: 20
   *      }
   *    }
   * }
   *
   *
   * @apiUse errorMessage
  */

  /**
   * @api {get} /send_sufa_task/stop 关闭速发短信任务
   * @apiVersion 2.0.0
   * @apiGroup message
   *
   * @apiDescription 关闭速发短信任务
   *
   * @apiParam {String} token
   * @apiParam {String} id     任务id
   *
   * @apiSuccess {Boolean}   state    停止是否成功，true成功，false失败
   * @apiSuccess {String}   message    返回的消息 “任务已经停止！”，“任务超过时间不能停止”
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   *  {
   *    state: true,
   *    message: '任务已经停止！'
   *  }
   *
   * @apiUse errorMessage
   */
    /**
   * @api {get} /send_sufa_task/delete  删除速发短信任务
   * @apiVersion 2.0.0
   * @apiGroup message
   *
   * @apiDescription 关闭速发短信任务
   *
   * @apiParam {String} token
   * @apiParam {String} id     任务id
   *
   * @apiSuccess {Boolean}   state    停止是否成功，true成功，false失败
   * @apiSuccess {String}   message    返回的消息 “任务已经删除！”，“不能删除原因”
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   *  {
   *    state: true,
   *    message: '任务已经删除！'
   *  }
   *
   * @apiUse errorMessage
  */
  /**
   * @api {get} /alipay/pay_confirm 购买场景支付宝付款-判断能否购买
   * @apiVersion 2.0.0
   * @apiGroup pay
   *
   * @apiDescription 购买场景支付宝付款-判断能否购买
   *
   * @apiParam {String} token
   * @apiParam {Number} userId  充值用户
   * @apiParam {Number} orderCycle  购买场景周期（3 or 6 or 12）即（季 or 半年 or 年）
   *
   * @apiSuccess {String} data  验证成功与否（success or failure）
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   *  {
   *    data: 'success'
   *  }
   *
   * @apiUse errorMessage
  */
  /**
   * @api {get} /alipay/alipay_trade_page_pay 支付宝付款功能
   * @apiVersion 2.0.0
   * @apiGroup pay
   *
   * @apiDescription 支付宝付款功能
   *
   * @apiParam {String} token
   * @apiParam {String} out_trade_no  商户订单号
   * @apiParam {Number} total_amount  订单总金额
   * @apiParam {String} subject  订单名称
   * @apiParam {String} body  商品描述
   * @apiParam {Number} userId  充值用户
   * @apiParam {Number} orderCycle  购买场景周期
   *
   * @apiUse errorMessage
  */
  /**
   * @api {get} /server_center 客服中心记录
   * @apiVersion 2.0.0
   * @apiGroup message
   *
   * @apiDescription 客服中心记录*
   *
   * @apiParam {String} token
   * @apiParam {Sting} day    天数，近15天等
   * @apiParam {Sting} start_time    开始时间
   * @apiParam {Sting} end_time    结束时间
   * @apiParam {Sting} search    搜索关键字
   * @apiParam {Sting} page    页码
   * @apiParam {Sting} per_page    每页条数
   * @apiParam {Sting} type    （wait-待处理，dealt已处理）
   *
   * @apiSuccess {Object[]} data
   * @apiSuccess {Date}   data.send_time    推送时间
   * @apiSuccess {string}   data.marketing_task    营销场景
   * @apiSuccess {string}   data.buyer_nick    买家id
   * @apiSuccess {String}   data.content    推送内容
   * @apiSuccess {String}   data.user_name    操作账号
   * @apiSuccess {String}   data.state    状态（待处理，已处理）
   * @apiSuccess {Num}   data.id    用来操作点击待处理时转变为已处理
   *
   * @apiSuccess {Object[]} meta
   * @apiSuccess {Object[]} meta.pagination
   * @apiSuccess {Num} meta.pagination.count 当前条数
   * @apiSuccess {Num} meta.pagination.current_page 当前条数
   * @apiSuccess {Num} meta.pagination.per_page 每页条数
   * @apiSuccess {Num} meta.pagination.total 总条数
   * @apiSuccess {Num} meta.pagination.total_pages 总页数
   *
   *
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   * {
   * data : [
   *    {
   *      send_time: '2017-10-11 12:24:11', //或者是时间戳
   *      user_name: '子账号',
   *      buyer_nick: '测试1',
   *      marketing_task: '拍下即时营销',
   *      content: '发送内容',
   *      state: '已处理',
   *      id: 1
   *    }
   *  ],
   *  meta: {
   *    pagination:{
   *        count: 10,
   *        current_page: 4,
   *        per_page: 3,
   *        total: 199,
   *        total_pages: 20
   *      }
   *    }
   * }
   *
   *
   * @apiUse errorMessage
  */
  /**
   * @api {POST} /update_server_center  修改客服中心信息状态
   * @apiVersion 2.0.0
   * @apiGroup message
   *
   * @apiDescription 修改客服中心信息状态
   *
   * @apiParam {String} token
   * @apiParam {num} id    需要修改的id
   *
   *
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   * {
   *  code: null,
   *  desc: "修改成功",
   *  msgid: null,
   *  provider: null
   * }
   *
   *
   * @apiUse errorMessage
  */
