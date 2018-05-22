/* 营销service
 * @Author: baymax
 * @Date: 2017-03-21 21:52:13
 * @Last Modified by: baymax
 * @Last Modified time: 2017-11-21 14:41:57
 */
import CommonHttpTransform from './commonHttpTransform.service'
import vuex from '../vuex/store'
import utils from '../misc/utils'
import global from '../misc/global.constant'
import moment from 'moment'
export default {
  /**
 * @api {get} /buy_market_list 扩展场景购买信息列表
 * @apiVersion 2.0.0
 * @apiGroup marketing
 *
 * @apiDescription 扩展场景购买信息列表
 *
 * @apiParam {String} token
 *
 * @apiSuccess {String}   type    营销类型
 * @apiSuccess {Date}   past_date    过期时间（已购买的显示到期时间，未购买的为空）
 * @apiSuccess {Array[]}   buys    购买信息（名称和链接）
 * @apiSuccess {String}   buys.name      名称(xx元/季,xx元/半年,xx元/年)
 * @apiSuccess {String}   buys.value    链接
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *
 * [
 *  {
 *    type: 'DELIVERYDELAY_SYS',
 *    past_date: '2017-12-16', // 或者是时间戳
 *    buys: [
 *      {
 *        name: '22元/季',
 *        value: 'xsxxxxx'
 *      },
 *      {
 *        name: '23元/半年',
 *        value: 'xxxx'
 *      }
 *    ]
 *  }
 * ]
 *
 *
 * @apiUse errorMessage
 */
  /**
 * @api {get} /marketingjob 获取p4p所有的营销场景
 * @apiVersion 2.0.0
 * @apiGroup marketing
 *
 * @apiDescription 获取p4p所有的营销场景
 *
 * @apiParam {String} token
 *
 * @apiSuccess {Number}   id    任务id
 * @apiSuccess {String}   title    任务名称
 * @apiSuccess {Date}   start_time    任务开始时间
 * @apiSuccess {Date}   end_time      任务结束时间
 * @apiSuccess {Date}   activity_time    任务最近执行时间
 * @apiSuccess {String} activity_status  营销任务状态（过期，运行，排队）
 * @apiSuccess {String}   status    任务状态
 * @apiSuccess {String}   filter_option    任务配置json
 * @apiSuccess {Num}   is_system    是否系统任务
 * @apiSuccess {Num}   is_shared    是否开启模板分享
 * @apiSuccess {String}   type    任务类型（PAYED_P4P_SYS即时营销,POTENTIAL_P4P_SYS跟随潜需式营销,PAYED_P4P_CUSTOM自定义即时营销,POTENTIAL_P4P_CUSTOM自定义跟随潜需式营销）
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *
 * [
 *  {
 *    activity_status: "ACTIVITY",
 *    activity_time: '2017-12-16 12:12:12',
 *    end_time: '2017-12-16 12:12:12',
 *    filter_option: {},
 *    id: 10,
 *    is_shared: 0,
 *    is_system: 0,
 *    start_time: "2017-12-16 12:12:12",
 *    status: "CLOSED",
 *    title: "标记活动类型",
 *    type: "TAGACTIVITYTYPE_SYS"
 *  }
 * ]
 *
 *
 * @apiUse errorMessage
 */
  /**
   * @api {get} /buy_market_order 扩展场景购买记录
   * @apiVersion 2.0.0
   * @apiGroup marketing
   *
   * @apiDescription 扩展场景购买记录
   *
   * @apiParam {String} token
   *
   * @apiSuccess {Date}   buy_date    订购时间(yyyy-mm-dd hh-mm-ss)
   * @apiSuccess {Date}   past_date    到期时间(yyyy-mm-dd hh-mm-ss)
   * @apiSuccess {String}   tid    对应淘宝订单编号
   * @apiSuccess {String}   market      对应场景
   * @apiSuccess {String}   cost    费用
   * @apiSuccess {String}   type    支付状态(未付款/已付款)
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   * [
   *  {
   *    buy_date: '2017-12-16 12:12:12', // 或者是时间戳
   *    past_date: '2017-12-16 12:12:12', // 或者是时间戳
   *    tid: '2312454',
   *    market: '默认催付',
   *    cost: '35',
   *    type: '未付款'
   *  }
   * ]
   *
   * @apiUse errorMessage
   */
  /**
   * @api {get} /output_sales 产出销售额
   * @apiVersion 2.0.0
   * @apiGroup chart
   *
   * @apiDescription 产出销售额
   *
   * @apiParam {String} token
   * @apiParam {Sting} month    月份.月数 最近1年=12，最近2年=24（只包含产生服务费的销售额）
   *
   * @apiSuccess {Timestamp}   day    按天的时间戳
   * @apiSuccess {Double}   count    统计值
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   * [
   *  [
 *      13251032100000,
 *      12.33,
 *    ]
   * ]
   *
   * @apiUse errorMessage
   */
  /**
 * @api {get} /service_charge 服务费
 * @apiVersion 2.0.0
 * @apiGroup chart
 *
 * @apiDescription 服务费
 *
 * @apiParam {String} token
 * @apiParam {String} month    月份.月数 最近1年=12，最近2年=24
 *
 * @apiSuccess {Timestamp}   day    按天的时间戳
 * @apiSuccess {Double}   count    统计值
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *
 * [
 *  [
 *    13251032100000,
 *    12.33,
 *  ]
 * ]
 *
 * @apiUse errorMessage
 */

  /**
     * 获取销售额数据
     * @param {String} - monthCount  月数 最近1年=12，最近2年=24
     * @param {String} - customerType 'all'、‘new'、'old'
     * @return {Promise.Object}
     **/
  getChartCCXseData(monthCount) {
    monthCount = !monthCount ? '12' : monthCount;
    return CommonHttpTransform.get('/output_sales?month=' + monthCount);
  },
  /**
   * 获取扩展场景列表
   */
  getBuyMarketList() {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/buy_market_list').then(data => {
        resolve(data.data)
      })
    })
  },
  // 扩展场景购买记录
  getBuyMarketRecordData() {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/buy_market_order').then(data => {
        resolve(data.data)
      })
    })
  },
  /**
   * 获取服务费数据
   * @param {String} - monthCount  月数 最近1年=12，最近2年=24
   * @return {Promise.Object}
   **/
  getChartFwfData(monthCount) {
    return new Promise(function (resolve, reject) {
      monthCount = !monthCount ? '12' : monthCount
      CommonHttpTransform.get('/service_charge?month=' + monthCount).then(data => {
        var _data = []
        for (var i in data.data) {
          _data.push([data.data[i].day, data.data[i].count])
        }
        resolve(_data)
      })
    })
    // monthCount = !monthCount ? '12' : monthCount;
    // return CommonHttpTransform.get('/chart/sales?month=' + monthCount);
  },
  /**
   * 获取客单价数据
   * @param {String} - monthCount  月数 最近1年=12，最近2年=24
   * @param {String} - customerType 'all'、‘new'、'old'
   * @return {Promise.Object}
   **/
  getChartKdjData(monthCount, customerType) {
    monthCount = !monthCount ? '12' : monthCount;
    customerType = !customerType ? 'all' : customerType;
    return CommonHttpTransform.get('/chart/customer_price?month=' + monthCount + '&type=' + customerType);
  },
  /**
   * 获取复购周期数据
   * @param {String} - monthCount  月数 例如:12个月 默认12个月
   * @param {String} - rebuyNum 复购次数 例如：x - (x+1)次 默认0-1次
   * @return {Promise.Object}
   **/
  getChartFgzqData(monthCount, rebuyNum) {
    monthCount = !monthCount ? '12' : monthCount;
    rebuyNum = !rebuyNum ? 2 : rebuyNum;
    return CommonHttpTransform.get('/chart/purchase_cycle?month=' + monthCount + '&purchase_times=' + rebuyNum);
  },
  /**
     * 获取营销效果图表数据
     * @param taskId   任务id 唯一
     * @param dayCount 最近天数分为15,30,90      类型：正整数
     * @param tartDate 查询的开始日期，为空则不限 类型：时间戳
     * @param endDate  查询的结束日期，为空则不限 类型：时间戳
     * @param marketingType   营销效果类型  类型：对象  例如   {IORate:'投入产出比ROI'}
     * @param i   特殊表字段 比如默认催付提醒需要 同时返回三种数据
     * @return 返回对象
     * {
     *  marketingTypes = [{IORate:'投入产出比ROI'},{rebuyRate:'营销复购率'},{targetUserNum:'营销用户数'},{rebugUserNum:'回购用户数'}];
     *  marketingChartData = {marketingType:{IORate:'投入产出比ROI'},data:[{yData:'数据',xData:'日期'},{yData:'数据',xData:'日期'}]};
     * }
     */
  getMarketingResultData(taskId, dayCount, startDate, endDate, marketingType, i) {
    dayCount = dayCount || '15';
    startDate = startDate || '';
    endDate = endDate || '';
    var _i = i ? ('&i=' + i) : ''
    if (startDate || startDate) {
      dayCount = ''
    }
    return CommonHttpTransform.get(
      '/marketingjob/' + taskId +
      '/marketing_report?day=' + dayCount +
      '&end_time=' + endDate +
      '&start_time=' + startDate +
      '&type=' + marketingType +
      _i
    )
  },
  // 获取营销任务左侧菜单数据
  mergeMarketingData(base, target) {
    var list = [];
    var submenus = {};
    base.forEach(o => {
      submenus = {};
      o.submenus.forEach(sub => {
        target.forEach(item => {
          if (sub.type === item.type) {
            if (!submenus[item.type]) {
              submenus[item.type] = [{
                name: item.title,
                icon: sub.icon ? sub.icon : o.icon,
                path: sub.path,
                id: item.id,
                type: item.type,
                group: o.name,
                class: item.className,
                finishState: sub.finishState
              }]
            } else {
              submenus[item.type].push({
                name: item.title,
                icon: sub.icon ? sub.icon : o.icon,
                path: sub.path,
                id: item.id,
                type: item.type,
                group: o.name,
                class: item.className,
                finishState: sub.finishState
              })
            }
          }
        })
      })
      var arr = Object.keys(submenus);
      if (arr.length == 0) {
        // console.log(1)
      } else {
        list.push({
          name: o.name,
          icon: o.icon,
          isObj: false,
          submenus: submenus
        })
      }
      // if(submenus.length)
      // list.push({
      //   name: o.name,
      //   icon: o.icon,
      //   isObj: false,
      //   submenus: submenus
      // })
    });
    return list;
  },
  // 获取执行一览表菜单数据
  taskListMarketingData(base, target) {
    var list = [];
    var submenus = {};
    base.forEach(o => {
      submenus = [];
      o.submenus.forEach(sub => {
        target.forEach(item => {
          if (sub.type === item.type) {
            submenus.push({
              name: item.title,
              path: sub.path,
              type: item.type,
              types: sub.types,
              finishState: sub.finishState,
              state: {
                name: item.title,
                params: {
                  id: item.id
                }
              }
            })
          }
        })
      })
      if (submenus.length == 0) {
        // console.log(1)
      } else {
        list.push({
          name: o.name,
          icon: o.icon,
          isObj: false,
          submenus: submenus
        })
      }
      // if(submenus.length)
      // list.push({
      //   name: o.name,
      //   icon: o.icon,
      //   isObj: false,
      //   submenus: submenus
      // })
    });
    return list;
  },
  // 获取成果详单数据
  getResultDetail(pagination, id, dayCount, startDate, endDate, keyword, isAll) {
    dayCount = dayCount || '15'
    startDate = startDate || ''
    endDate = endDate || ''
    if (startDate || startDate) {
      dayCount = ''
    }
    return new Promise((resolve, reject) => {
      CommonHttpTransform.get(
        '/marketingjob/' +
        id +
        '/marketing_result' +
        '?day=' + dayCount +
        '&start_time=' + startDate +
        '&end_time=' + endDate +
        '&search=' + keyword +
        '&page=' + pagination.pageIndex +
        '&per_page=' + pagination.pageSize
      ).then(function (data) {
        if (isAll != 'all') {
          pagination.totalNum = data.meta.pagination.total
          pagination.pageSize = data.meta.pagination.per_page
          pagination.pageIndex = data.meta.pagination.current_page
        }
        resolve(data.data)
      })
    })
  },
  // 获取推送记录数据
  getPushRecord(pagination, id, dayCount, startDate, endDate, keyword, isAll) {
    dayCount = dayCount || '15'
    startDate = startDate || ''
    endDate = endDate || ''
    if (startDate || startDate) {
      dayCount = ''
    }
    return new Promise((resolve, reject) => {
      CommonHttpTransform.get(
        '/marketingjob/' +
        id +
        '/marketing_record' +
        '?day=' + dayCount +
        '&start_time=' + startDate +
        '&end_time=' + endDate +
        '&search=' + keyword +
        '&page=' + pagination.pageIndex +
        '&per_page=' + pagination.pageSize
      ).then(function (data) {
        if (isAll != 'all') {
          pagination.totalNum = data.meta.pagination.total
          pagination.pageSize = data.meta.pagination.per_page
          pagination.pageIndex = data.meta.pagination.current_page
        }
        resolve(data.data)
      })
    })
  },
  // 获取退订记录数据
  getUnsubscribeRecord(pagination, id, dayCount, startDate, endDate, keyword, isAll) {
    dayCount = dayCount || '15'
    startDate = startDate || ''
    endDate = endDate || ''
    if (startDate || startDate) {
      dayCount = ''
    }
    return new Promise((resolve, reject) => {
      CommonHttpTransform.get(
        '/marketingjob/' +
        id +
        '/marketing_refund' +
        '?day=' + dayCount +
        '&start_time=' + startDate +
        '&end_time=' + endDate +
        '&search=' + keyword +
        '&page=' + pagination.pageIndex +
        '&per_page=' + pagination.pageSize
      ).then(function (data) {
        if (isAll != 'all') {
          pagination.totalNum = data.meta.pagination.total
          pagination.pageSize = data.meta.pagination.per_page
          pagination.pageIndex = data.meta.pagination.current_page
        }
        resolve(data.data)
      })
    })
  },
  // 获取千牛任务数据
  getQianniuTask(pagination, id, dayCount, startDate, endDate, keyword, isAll) {
    //千牛接口还没给 现在用的是退订的
    dayCount = dayCount || '15'
    startDate = startDate || ''
    endDate = endDate || ''
    if (startDate || startDate) {
      dayCount = ''
    }
    return new Promise((resolve, reject) => {
      CommonHttpTransform.get(
        '/marketingjob/' +
        id +
        '/marketing_refund' +
        '?day=' + dayCount +
        '&start_time=' + startDate +
        '&end_time=' + endDate +
        '&search=' + keyword +
        '&page=' + pagination.pageIndex +
        '&per_page=' + pagination.pageSize
      ).then(function (data) {
        if (isAll != 'all') {
          pagination.totalNum = data.meta.pagination.total
          pagination.pageSize = data.meta.pagination.per_page
          pagination.pageIndex = data.meta.pagination.current_page
        }
        resolve(data.data)
      })
    })
  },
  // 获取营销任务列表
  getMarketingJob() {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/marketingjob').then(o => {
        resolve(o.data)
      })
    })
  },
  // 获取单个营销任务
  getMarketConfig(id) {
    return new Promise((resolve, reject) => {
      CommonHttpTransform.get('/marketingjob/' + id).then(data => {
        resolve(data.data)
      })
    })
  },
  /**
   *  获取合并后的营销配置数据
   *  @id 营销配置id
   *  @target 具体营销配置service对象
   */
  getMarketConfigMerge(id, getTransform) {
    return new Promise((resolve, reject) => {
      this.getMarketConfig(id).then(data => {
        resolve(this.mergeGetConf(data, getTransform))
      })
    })
  },
  /**
   *  保存合并后的营销配置数据
   *  @id 营销配置id
   *  @baseConf 通用营销配置项
   *  @customConf 各个营销场景独有配置项
   *  @target 具体营销配置service对象
   */
  saveMerge(id, baseCommonConf, baseConf, customConf, setTransform, getTransform) {
    var data = baseCommonConf
    data.filter_option = this.mergeSetConf(baseConf, customConf, setTransform)
    return new Promise((resolve, reject) => {
      this.save(id, data).then(obj => {
        resolve(this.mergeGetConf(obj, getTransform))
      })
    })
  },
  /**
   *  另存为合并后的营销配置数据
   *  @id 营销配置id
   *  @baseConf 通用营销配置项
   *  @customConf 各个营销场景独有配置项
   *  @target 具体营销配置service对象
   */
  saveAsMerge(id, baseCommonConf, baseConf, customConf, setTransform, getTransform) {
    var data = baseCommonConf
    data.filter_option = this.mergeSetConf(baseConf, customConf, setTransform)
    return new Promise((resolve, reject) => {
      this.saveAs(id, data).then(obj => {
        resolve(this.mergeGetConf(obj, getTransform))
      })
    })
  },
  // 重命名
  rename(id, data) {
    return this.save(id, data)
  },
  // 初始化营销配置信息合并
  mergeGetConf(data, getTransform) {
    var baseConf = this.baseGetTransform(data.filter_option)
    var mergeConf = getTransform(baseConf)
    data.filter_option = mergeConf
    return data
  },
  // 合并提交的营销配置信息
  mergeSetConf(baseConf, customConf, setTransform) {
    var bconf = this.baseSetTransform(baseConf, customConf)
    var mergeConf = setTransform(bconf)
    return mergeConf
  },
  // 删除营销任务
  deleteMarketConfig(id) {
    return new Promise((resolve, reject) => {
      CommonHttpTransform.delete('/marketingjob/' + id).then(data => {
        resolve(data.data)
      })
    })
  },
  // 营销任务开/关
  doMarketTask(id, state) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.post('/marketingjob/' + id + '/' + state).then(o => {
        resolve(o.data)
      })
    })
  },
  // 态度流失一览表
  getAttitudeLoss(date) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.post('/attitudeloss/', {
        date: date
      }).then(o => {
        resolve(o.data)
      })
    })
  },
  // 另存为营销任务
  saveAs(id, data) {
    if (typeof (data.filter_option) !== 'string') {
      data.filter_option = JSON.stringify(data.filter_option)
    }
    return new Promise((resolve, reject) => {
      CommonHttpTransform.post('/marketingjob/' + id + '/save', data).then(obj => {
        resolve(obj.data)
      })
    })
  },
  //  保存营销任务
  save(id, data) {
    if (typeof (data.filter_option) !== 'string') {
      data.filter_option = JSON.stringify(data.filter_option)
    }
    return new Promise((resolve, reject) => {
      CommonHttpTransform.put('/marketingjob/' + id, {
        title: data.title,
        start_time: data.start_time,
        end_time: data.end_time,
        filter_option: data.filter_option
      }).then(data => {
        resolve(data.data)
      })
    })
  },
  //合并订单管理
  getMaergeOrder(searchWord, pagination) {
    return new Promise((resolve, reject) => {
      var pageParam = '?page=' + pagination.pageIndex + '&per_page=' + pagination.pageSize
      var url = '/data/mergedtrade' + pageParam
      CommonHttpTransform.post(url, {
        search: JSON.stringify(searchWord)
      }).then(o => {
        pagination.totalNum = o.meta.pagination.total
        pagination.pageSize = o.meta.pagination.per_page
        pagination.pageIndex = o.meta.pagination.current_page
        resolve(o.data)
      })
    })
  },
  /**
   * 传入营销配置对象，转换成可以再页面展示的对象
   * @param {any} baseConf
   * @return 转换后的营销对象
   */
  baseGetTransform(baseConf) {
    var conf = {}
    if (typeof (baseConf) === 'string') {
      conf = JSON.parse(baseConf)
    } else {
      conf = baseConf
    }

    // 营销时间点
    if (conf.hasOwnProperty('interval')) {
      conf.interval_label = conf.interval.length === 0 ? '' : 'custom'
    }
    if (conf.hasOwnProperty('bad_weather_custom')) {
      for (var cust in conf.bad_weather_custom) {
        for (var ai in global.bad_weather_list) {
          if (conf.bad_weather_custom[cust].name === global.bad_weather_list[ai].name) {
            conf.bad_weather_custom[cust].hasTypes = global.bad_weather_list[ai].hasTypes
          }
        }
      }
    }
    if (conf.hasOwnProperty('bad_weather_ai')) {
      for (var cus2 in conf.bad_weather_ai) {
        for (var ai2 in global.bad_weather_list) {
          if (conf.bad_weather_ai[cus2].name === global.bad_weather_list[ai2].name) {
            conf.bad_weather_ai[cus2].hasTypes = global.bad_weather_list[ai2].hasTypes
          }
        }
      }
    }
    // 信息发送时间段
    if (conf.hasOwnProperty('send_time')) {
      conf.send_time_label = conf.send_time.length === 0 ? '' : conf.send_time[0] === 'now' ? 'now' : 'custom'
      if (conf.hasOwnProperty('send_time_behind')) {
        conf.send_time_behind = conf.send_time.length === 0 ? false : conf.send_time_behind
      }
    }
    if (conf.hasOwnProperty('send_time_day')) {
      conf.send_time_day = !conf.send_time_day ? '' : conf.send_time_day
    }
    if (conf.hasOwnProperty('send_date')) {
      conf.send_date = conf.send_date ? conf.send_date : '1'
    }

    // 信息不发送时间段 默认不选中
    if (conf.hasOwnProperty('exclude_time')) {
      if (conf.exclude_time.length === 0) {
        conf.exclude_time_label = false
        conf.exclued_time_start = '8:30'
        conf.exclued_time_end = '22:00'
      } else {
        conf.exclued_time_start = conf.exclude_time[0]
        conf.exclued_time_end = conf.exclude_time[1]
        conf.exclude_time_label = true
      }
    }

    // 提前发送 默认不选中
    if (conf.hasOwnProperty('ahead_time')) {
      conf.ahead_time_label = conf.ahead_time.length === 0 ? false : true
    }
    // 推荐宝贝
    if (conf.hasOwnProperty('items')) {
      conf.items_label = conf.items.length === 0 ? '' : 'custom'
    }
    // 活动有效时间
    if (conf.hasOwnProperty('deadline')) {
      conf.deadline_label = conf.deadline.length === 0 ? '' : 'custom'
    }
    // 订单金额
    if (conf.hasOwnProperty('payment')) {
      conf.payment_label = conf.payment.length === 0 ? '' : 'custom'
    }
    // 商品件数
    if (conf.hasOwnProperty('buys')) {
      conf.buys_label = conf.buys.length === 0 ? '' : 'custom'
    }
    // 购物次数
    if (conf.hasOwnProperty('purchase_times')) {
      conf.purchase_times_label = conf.purchase_times.length === 0 ? '' : 'custom'
    }
    // 商品种类
    if (conf.hasOwnProperty('order_num')) {
      conf.order_num_label = conf.order_num.length === 0 ? '' : 'custom'
    }
    // 付款时间
    if (conf.hasOwnProperty('pay_time')) {
      conf.pay_time_label = conf.pay_time.length === 0 ? '' : 'custom'
    }
    // 发货时间
    if (conf.hasOwnProperty('consign_time')) {
      conf.consign_time_label = conf.consign_time.length === 0 ? '' : 'custom'
    }
    // 签收时间
    if (conf.hasOwnProperty('sign_time')) {
      conf.sign_time_label = conf.sign_time.length === 0 ? '' : 'custom'
    }
    // 确认时间
    if (conf.hasOwnProperty('end_time')) {
      conf.end_time_label = conf.end_time.length === 0 ? '' : 'custom'
    }
    // 下单时间
    if (conf.hasOwnProperty('created')) {
      if (conf.created.length > 0) {
        if (conf.created[0] === '1month') {
          conf.created_label = '1month'
          conf.created = []
        } else if (conf.created[0] === '3month') {
          conf.created_label = '3month'
          conf.created = []
        } else {
          conf.created_label = 'custom'
        }
      } else {
        conf.created_label = ''
      }
    }
    // 目标会员
    if (conf.hasOwnProperty('group')) {
      conf.group_ai_id = []
      conf.group_flag_id = []
      conf.group_vip_id = []
      conf.group_grade_id = []
      conf.group_custom_id = []
      conf.curGroupIds = {}
      var id_ai = this.getMemberCategory('AI引擎流转分组').id
      var id_flag = this.getMemberCategory('智能标签').id
      var id_vip = this.getMemberCategory('导入会员批次').id
      var id_grade = this.getMemberCategory('会员等级分组').id
      var id_custom = this.getMemberCategory('自建营销标签').id
      if (conf.group.category_id.length === 0 || conf.group.group_id.length === 0) {
        conf.group_label = ''
      } else if (conf.group.category_id === id_ai) {
        conf.group_label = 'AI'
        conf.curGroupIds.group_ai_id = conf.group.group_id
      } else if (conf.group.category_id === id_flag) {
        conf.group_label = 'FLAG'
        conf.curGroupIds.group_flag_id = conf.group.group_id
      } else if (conf.group.category_id === id_vip) {
        conf.group_label = 'VIP'
        conf.curGroupIds.group_vip_id = conf.group.group_id
      } else if (conf.group.category_id === id_grade) {
        conf.group_label = 'GRADE'
        conf.curGroupIds.group_grade_id = conf.group.group_id
      } else if (conf.group.category_id === id_custom) {
        conf.group_label = 'CUSTOM'
        conf.curGroupIds.group_custom_id = conf.group.group_id
      }

      // 包含活动性会员第一次购物
      if (conf.group.hasOwnProperty('is_item')) {
        conf.is_item_label = conf.group.is_item === '' ? true : false
      }
      // 根据选定宝贝潜需智能优化
      if (conf.group.hasOwnProperty('is_first')) {
        conf.is_first_label = conf.group.is_first === '' ? true : false
      }
      // 仅限新品型标签会员
      if (conf.group.hasOwnProperty('only_new')) {
        conf.only_new_label = conf.group.only_new === '' ? true : false
      }
    }
    //双11阶梯
    if (conf.hasOwnProperty('stairs')) {
      // customConf.stairs = baseConf.stairs
      if (conf.stairs.length > 0 && conf.stairs[0].send_time) {
        for (var i in conf.stairs) {
          conf.stairs[i].send_time = [moment(conf.stairs[i].send_time[0]).format('YYYY-MM-DD 00:00:00'), moment(conf.stairs[i].send_time[1]).format('YYYY-MM-DD 23:59:59')]
        }
      }
    }
    // 购买宝贝范围
    if (conf.hasOwnProperty('items_range')) {
      if (conf.items_range.include) {
        if (conf.items_range.include.length === 0 && conf.items_range.exclude.length === 0) {
          conf.items_range_label = ''
        } else if (conf.items_range.include.length !== 0) {
          conf.items_range_label = 'include'
        } else if (conf.items_range.exclude.length !== 0) {
          conf.items_range_label = 'exclude'
        }
      } else if (conf.items_range.xx) {
        if (conf.items_range.xx.length === 0 && conf.items_range.xy.length === 0) {
          conf.items_range_label = ''
        } else if (conf.items_range.xx.length !== 0) {
          conf.items_range_label = 'xx'
        } else if (conf.items_range.xy.length !== 0) {
          conf.items_range_label = 'xy'
        }
      }
    }
    // 结束提醒 默认选中
    if (conf.hasOwnProperty('reminder')) {
      conf.reminder_label = conf.reminder.time.length === 0 ? false : true
    }
    // 会员状态变更时间
    if (conf.hasOwnProperty('member_change')) {
      if (conf.member_change == '') {
        conf.member_change_label = ''
      } else if (conf.member_change == '15') {
        conf.member_change_label = '15'
      } else if (conf.member_change == '30') {
        conf.member_change_label = '30'
      } else {
        conf.member_change_label = 'custom'
      }
    }
    //高中低宝贝
    if (conf.hasOwnProperty('high_items')) {
      conf.high_items_label = conf.high_items.length == 0 ? false : true
    }
    if (conf.hasOwnProperty('middle_items')) {
      conf.middle_items_label = conf.middle_items.length == 0 ? false : true
    }
    if (conf.hasOwnProperty('low_items')) {
      conf.low_items_label = conf.low_items.length == 0 ? false : true
    }
    return conf
  },
  /**
   * 传入营销配置对象，转换成可以再页面展示的对象
   * @param {any} baseConf
   * @return 转换后的营销对象
   */
  baseSetTransform(baseConf, customConf) {
    if (typeof (customConf) === 'string') {
      customConf = JSON.parse(customConf)
    }
    // 营销间隔
    if (baseConf.hasOwnProperty('interval')) {
      if (baseConf.interval_label !== undefined) {
        customConf.interval = baseConf.interval_label.length === 0 ? '' : baseConf.interval
      } else {
        customConf.interval = baseConf.interval
      }
    }
    // 发送频率
    if (baseConf.hasOwnProperty('send_times')) {
      customConf.send_times = baseConf.send_times
    }
    // 营销宝贝
    if (baseConf.hasOwnProperty('items_label')) {
      customConf.items = baseConf.items_label.length === 0 ? [] : baseConf.items
    }
    // 活动有效时间
    if (baseConf.hasOwnProperty('deadline')) {
      customConf.deadline = baseConf.deadline_label.length === 0 ? [] : baseConf.deadline
      if (customConf.deadline.length > 0 && customConf.deadline[0]) {
        customConf.deadline[0] = moment(customConf.deadline[0]).format('YYYY-MM-DD HH:mm')
      }
      if (customConf.deadline.length === 2 && !customConf.deadline[1]) {
        customConf.deadline[1] = ''
      } else if (customConf.deadline.length === 2 && customConf.deadline[1]) {
        customConf.deadline[1] = moment(customConf.deadline[1]).format('YYYY-MM-DD HH:mm')
      }
    }
    if (baseConf.hasOwnProperty('send_time_behind')) {
      customConf.send_time_behind = baseConf.send_time_behind
    }
    //express 快递公司
    if (baseConf.hasOwnProperty('express')) {
      customConf.express = baseConf.express
    }
    // 地区
    if (baseConf.hasOwnProperty('city')) {
      customConf.city = baseConf.city
    }
    if (baseConf.hasOwnProperty('area_text_array')) {
      customConf.area_text_array = baseConf.area_text_array
    }
    // 信息发送时间段
    if (baseConf.hasOwnProperty('send_time_label')) {
      if (baseConf.send_time == '请选择') {
        baseConf.send_time = ''
      }
      if (baseConf.send_time_day == '不能为空') {
        baseConf.send_time_day = ''
      }
      if (baseConf.send_time_type == 'isNow') {
        customConf.send_time = baseConf.send_time_label == '' ? [] : baseConf.send_time_label == 'now' ? ['now'] : baseConf.send_time
      } else {
        customConf.send_time = baseConf.send_time_label.length === 0 ? baseConf.send_time_type == 'isString' ? '' : [] : baseConf.send_time
        if (baseConf.hasOwnProperty('send_time_day')) {
          customConf.send_time_day = baseConf.send_time_label.length === 0 ? '' : baseConf.send_time_day
        }
        if (baseConf.hasOwnProperty('exclude_time_label') && baseConf.send_time_label.length != 0) {
          baseConf.exclude_time_label = false
        }
        if (baseConf.hasOwnProperty('ahead_time_label') && baseConf.send_time_label.length != 0) {
          baseConf.ahead_time_label = false
        }
      }
    }
    //发送日期
    if (baseConf.hasOwnProperty('send_date')) {
      customConf.send_date = baseConf.send_date
    }
    // 订单金额
    if (baseConf.hasOwnProperty('payment_label')) {
      customConf.payment_label = baseConf.payment_label
      if (baseConf.payment_label.length === 0) {
        customConf.payment = []
        // customConf.payment_more = []
      } else {
        customConf.payment = [parseFloat(baseConf.payment[0]), parseFloat(baseConf.payment[1])]
        // customConf.payment_more = [parseFloat(baseConf.payment[0]), parseFloat(baseConf.payment[1])]
      }
    }
    // 商品件数
    if (baseConf.hasOwnProperty('buys_label')) {
      customConf.buys_label = baseConf.buys_label
      customConf.buys = baseConf.buys_label.length === 0 ? [] : baseConf.buys
    }
    // 购物次数
    if (baseConf.hasOwnProperty('purchase_times_label')) {
      customConf.purchase_times_label = baseConf.purchase_times_label
      customConf.purchase_times = baseConf.purchase_times_label.length === 0 ? [] : baseConf.purchase_times
      // customConf.purchase_times_more = baseConf.purchase_times_label.length === 0 ? [] : baseConf.purchase_times_more
    }
    // 商品种类
    if (baseConf.hasOwnProperty('order_num_label')) {
      customConf.order_num_label = baseConf.order_num_label
      customConf.order_num = baseConf.order_num_label.length === 0 ? [] : baseConf.order_num
    }
    // 付款时间
    if (baseConf.hasOwnProperty('pay_time_label')) {
      customConf.pay_time_label = baseConf.pay_time_label
      customConf.pay_time = baseConf.pay_time_label.length === 0 ? [] : baseConf.pay_time
    }
    // 发货时间
    if (baseConf.hasOwnProperty('consign_time_label')) {
      customConf.consign_time_label = baseConf.consign_time_label
      customConf.consign_time = baseConf.consign_time_label.length === 0 ? [] : baseConf.consign_time
    }
    // 签收时间
    if (baseConf.hasOwnProperty('sign_time_label')) {
      customConf.sign_time_label = baseConf.sign_time_label
      customConf.sign_time = baseConf.sign_time_label.length === 0 ? [] : baseConf.sign_time
    }
    // 确认时间
    if (baseConf.hasOwnProperty('end_time_label')) {
      customConf.end_time_label = baseConf.end_time_label
      customConf.end_time = baseConf.end_time_label.length === 0 ? [] : baseConf.end_time
    }
    // 订单状态
    if (baseConf.hasOwnProperty('status')) {
      customConf.status = baseConf.status
    }
    // 下单时间
    if (baseConf.hasOwnProperty('created_label')) {
      customConf.created_label = baseConf.created_label
      if (baseConf.created_label.length === 0) {
        customConf.created = []
      } else if (baseConf.created_label === '1month') {
        customConf.created = ['1month']
      } else if (baseConf.created_label === '3month') {
        customConf.created = ['3month']
      } else if (baseConf.created_label === 'custom') {
        customConf.created = baseConf.created
      }
    }
    // 订单来源
    if (baseConf.hasOwnProperty('trade_from')) {
      customConf.trade_from = baseConf.trade_from
    }
    // 目标会员
    if (baseConf.hasOwnProperty('group_label')) {
      var groupObj = utils.getGroupDetail(baseConf)
      customConf.group.category_id = this.getMemberCategory(groupObj.groupName) ? this.getMemberCategory(groupObj.groupName).id : ''
      customConf.group.group_id = groupObj.groupId
      // 根据选定宝贝潜需智能优化
      if (baseConf.hasOwnProperty('is_item_label')) {
        if (baseConf.is_item_label !== undefined) {
          customConf.group.is_item = baseConf.is_item_label ? '' : false
        }
      }
      // 包含活动性会员第一次购物
      if (baseConf.hasOwnProperty('is_first_label')) {
        if (baseConf.is_first_label !== undefined) {
          customConf.group.is_first = baseConf.is_first_label ? '' : false
        }
      }
      // 仅限新品型标签会员
      if (baseConf.hasOwnProperty('only_new_label')) {
        if (baseConf.only_new_label !== undefined) {
          customConf.group.only_new = baseConf.only_new_label ? '' : false
        }
      }
    }
    // 买家留言
    if (baseConf.hasOwnProperty('buyer_message')) {
      customConf.buyer_message = baseConf.buyer_message
    }
    // 备注旗子
    if (baseConf.hasOwnProperty('seller_flag')) {
      customConf.seller_flag = baseConf.seller_flag
    }
    // 高中低客单价
    if (baseConf.hasOwnProperty('guest_price')) {
      customConf.guest_price = baseConf.guest_price
    }
    // 订单类型
    if (baseConf.hasOwnProperty('activity_type')) {
      customConf.activity_type = baseConf.activity_type
    }
    // 短信营销内容
    if (baseConf.hasOwnProperty('message')) {
      customConf.message = baseConf.message
    }
    // 提醒短信内容
    if (baseConf.hasOwnProperty('send_message_user')) {
      customConf.send_message_user = baseConf.send_message_user
    }
    // 结束提醒 默认选中
    if (baseConf.hasOwnProperty('reminder_label')) {
      customConf.reminder.time = baseConf.reminder_label ? baseConf.reminder.time : ''
    }
    // 推送方式
    if (baseConf.hasOwnProperty('send_type')) {
      customConf.send_type = baseConf.send_type
    }
    // 提醒方式
    if (baseConf.hasOwnProperty('send_type_user')) {
      customConf.send_type_user = baseConf.send_type_user
    }
    // 提醒接收号码
    if (baseConf.hasOwnProperty('send_mobile_user')) {
      customConf.send_mobile_user = baseConf.send_mobile_user
    }
    //二次催付
    if (baseConf.hasOwnProperty('sencod_remind_pay')) {
      customConf.sencod_remind_pay = baseConf.sencod_remind_pay
    }
    //临近催付
    if (baseConf.hasOwnProperty('near_close_reminder')) {
      customConf.near_close_reminder = baseConf.near_close_reminder
    }
    //信息不发送时间段
    if (baseConf.hasOwnProperty('exclued_time_start')) {
      customConf.exclued_time_start = baseConf.exclued_time_start
      customConf.exclued_time_end = baseConf.exclued_time_end
    }
    //快消品宝贝
    if (baseConf.hasOwnProperty('buying_cycel_items')) {
      customConf.buying_cycel_items = baseConf.buying_cycel_items
    }
    //双11宝贝
    if (baseConf.hasOwnProperty('double_items')) {
      if (baseConf.hasOwnProperty('setting_goods')) {
        customConf.setting_goods = baseConf.setting_goods
        customConf.double_items = baseConf.setting_goods ? baseConf.double_items : []
      } else {
        customConf.double_items = baseConf.double_items
      }
      //防止默认值没操作后 有一个空的宝贝存着
      if (baseConf.double_items.length == 1 && baseConf.double_items[0].num_iid == '') {
        customConf.double_items = []
      }
    }
    //双11阶梯
    if (baseConf.hasOwnProperty('stairs')) {
      customConf.stairs = baseConf.stairs
      if (customConf.stairs.length > 0 && customConf.stairs[0].send_time) {
        for (var i in customConf.stairs) {
          customConf.stairs[i].send_time = [moment(customConf.stairs[i].send_time[0]).format('YYYY-MM-DD 00:00:00'), moment(customConf.stairs[i].send_time[1]).format('YYYY-MM-DD 23:59:59')]
        }
      }
    }
    //缓冲时间
    if (baseConf.hasOwnProperty('buffer_time')) {
      customConf.buffer_time = baseConf.buffer_time
    }
    //礼品营销
    if (baseConf.hasOwnProperty('discount_set')) {
      customConf.discount_set = baseConf.discount_set
    }
    // 节假日问候设置
    if (baseConf.hasOwnProperty('holiday_set')) {
      customConf.holiday_set = baseConf.holiday_set
    }
    // 节假日问候设置
    // ai
    if (baseConf.hasOwnProperty('holiday_data_ai')) {
      customConf.holiday_data_ai = baseConf.holiday_data_ai
    }
    // 节假日问候设置
    // 自定义
    if (baseConf.hasOwnProperty('holiday_data_custom')) {
      customConf.holiday_data_custom = baseConf.holiday_data_custom
    }
    if (baseConf.hasOwnProperty('bad_weather_set')) {
      customConf.bad_weather_set = baseConf.bad_weather_set
    }
    // 恶劣天气
    // ai
    if (baseConf.hasOwnProperty('bad_weather_ai')) {
      customConf.bad_weather_ai = baseConf.bad_weather_ai
    }
    // 恶劣天气
    // 自定义
    if (baseConf.hasOwnProperty('bad_weather_custom')) {
      customConf.bad_weather_custom = baseConf.bad_weather_custom
    }
    // 购买宝贝范围
    if (baseConf.hasOwnProperty('items_range_label')) {
      if (baseConf.items_range.include) {
        customConf.items_range_label = baseConf.items_range_label
        if (baseConf.items_range_label.length === 0) {
          customConf.items_range = { include: [], exclude: [] }
        } else if (baseConf.items_range_label === 'include') {
          customConf.items_range.include = baseConf.items_range.include
          customConf.items_range.exclude = []
        } else if (baseConf.items_range_label === 'exclude') {
          customConf.items_range.exclude = baseConf.items_range.exclude
          customConf.items_range.include = []
        }
      } else if (baseConf.items_range.xx) {
        customConf.items_range_label = baseConf.items_range_label
        if (baseConf.items_range_label.length === 0) {
          customConf.items_range = { xx: [], xy: [] }
        } else if (baseConf.items_range_label === 'xx') {
          customConf.items_range.xx = baseConf.items_range.xx
          customConf.items_range.xy = []
        } else if (baseConf.items_range_label === 'xy') {
          customConf.items_range.xy = baseConf.items_range.xy
          customConf.items_range.xx = []
        }
      }

    }
    // 会员状态变更时间
    if (baseConf.hasOwnProperty('member_change_label')) {
      if (baseConf.member_change_label == 'custom') {
        customConf.member_change = baseConf.member_change
      } else {
        customConf.member_change = baseConf.member_change_label
      }

    }
    //高中低宝贝
    if (baseConf.hasOwnProperty('high_items_label')) {
      customConf.high_items = baseConf.high_items_label ? baseConf.high_items : []
    }
    if (baseConf.hasOwnProperty('middle_items_label')) {
      customConf.middle_items = baseConf.middle_items_label ? baseConf.middle_items : []
    }
    if (baseConf.hasOwnProperty('low_items_label')) {
      customConf.low_items = baseConf.low_items_label ? baseConf.low_items : []
    }
    // 信息不发送时间段 默认不选中
    if (baseConf.hasOwnProperty('exclude_time_label')) {
      customConf.exclude_time = baseConf.exclude_time_label ? baseConf.exclude_time : []
    }
    if (baseConf.hasOwnProperty('ahead_time_label')) {
      customConf.ahead_time = baseConf.ahead_time_label ? 'true' : ''
    }
    // 聚划算宝贝配置
    if (baseConf.hasOwnProperty('items_data')) {
      customConf.items_data = baseConf.items_data
    }
    ////// 宝贝设置 区分高中低端会员  start //////
    // 是否区分高中低会员
    if (baseConf.hasOwnProperty('active_items')) {
      customConf.active_items = baseConf.active_items
      if (customConf.active_items === 'ISHIGH') { // 区分高中低
        // 不区分高中低客单价 置为空
        customConf.items_data = []
        // 高客单价配置
        customConf.high_items = baseConf.high_items
        // 中客单价配置
        customConf.middle_items = baseConf.middle_items
        // 低客单价配置
        customConf.low_items = baseConf.low_items
      } else if (customConf.active_items === 'NOHIGH') { // 不区分高中低
        // 不区分高中低客单价
        customConf.items_data = baseConf.items_data
        // 高客单价配置 置为空
        customConf.high_items = []
        // 中客单价配置 置为空
        customConf.middle_items = []
        // 中客单价配置 置为空
        customConf.low_items = []
      }
    }
    ////// 宝贝设置 区分高中低端会员  end //////

    return customConf
  },
  getMemberCategory(title) {
    return vuex.state.member.memberCategoryData.filter(o => {
      return o.title === title
    })[0]
  }
}
