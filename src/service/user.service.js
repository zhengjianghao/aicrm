/*
 * 处理用户信息
 * @Author: baymax
 * @Date: 2017-03-21 18:07:46
 * @Last Modified by: baymax
 * @Last Modified time: 2018-01-22 18:21:15
 */
import CommonHttpTransform from './commonHttpTransform.service'
export default {
  /**
   * @apiDefine errorMessage
   *
   * @apiErrorExample Response (example):
   *     HTTP/1.1 401 Not Authenticated
   *     {
   *       "message": "授权失败，请稍后重试或联系客服咨询"
   *       "status_code": 401
   *     }
 */
  /**
   * @api {get} /account 获取用户信息
   * @apiVersion 2.0.0
   * @apiGroup User
   *
   * @apiDescription 获取用户信息
   *
   * @apiParam {String} token
   *
   * @apiSuccess {String}   user_id    用户id
   * @apiSuccess {String}   user_nick    昵称
   * @apiSuccess {Number}   ordinary_sms_remain    短信剩余条数
   * @apiSuccess {Number}   money_remain    预付费余额*
   * @apiSuccess {Date}   modified    最近更新同步时间
   * @apiSuccess {Boolean}   is_first    用户是否第一次登录*
   * @apiSuccess {String}   sign    签名
   * @apiSuccess {String}   type  购买的类型（p4p 按效果分成）
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   * [
   *  {
   *    user_id: 1233456,
   *    user_nick: 'test',
   *    ordinary_sms_remain: 326,
   *    money_remain: 2156,
   *    modified: '2017-11-11 12:32:12', //或者是时间戳
   *    is_first: false,
   *    sign: 'xxxxx'
   *  }
   * ]
   *
   * @apiUse errorMessage
   */

  /**
   * @api {get} /notice  头部重要信息提示
   * @apiVersion 2.0.0
   * @apiGroup User
   *
   * @apiDescription 头部重要信息提示
   *
   * @apiParam {String} token
   *
   * @apiSuccess {String}   type    提示的type(IMPORT导入，EDITGOODS编辑宝贝，场景type)
   * @apiSuccess {String}   value    提示内容
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   * [
   *  {
   *    type: 'IMPORT',
   *    vlaue: '需要导入xxx',
   *  }
   * ]
   *
   * @apiUse errorMessage
   */
  /**
   * @api {get} /deduction_rule  店铺扣费规则
   * @apiVersion 2.0.0
   * @apiGroup User
   *
   * @apiDescription 店铺扣费规则
   *
   * @apiParam {String} token
   *
   * @apiSuccess {String}   name    当前店铺所处行业
   * @apiSuccess {String}   rate    服务费扣点
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   *
   *  {
   *    name: '衣服',
   *    vlaue: '0.07',
   *  }
   *
   *
   * @apiUse errorMessage
   */
  /**
   * @api {get} /is_first  用户是否第一次登录
   * @apiVersion 2.0.0
   * @apiGroup User
   *
   * @apiDescription 用户是否第一次登录
   *
   * @apiParam {String} token
   *
   * @apiSuccess {Boolean}   is_first    判断用户是否第一次登录，第一次登录需要提醒导入和编辑宝贝短名
   *
   *
   *
   * @apiUse errorMessage
   */

  /**
   * @api {get} /progress  用户初始化进度
   * @apiVersion 2.0.0
   * @apiGroup User
   *
   * @apiDescription 用户初始化进度
   *
   * @apiParam {String} token
   *
   * @apiSuccess {Boolean}   is_show    （显示24小时，超出不显示，true显示，false不显示）
   * @apiSuccess {Array}   progress_info    各个步骤的具体信息[{text:'卖家下单',finish_time:'',state:''}](process: 进行中，wait: 等待运行， success: 成功，error: 失败)
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   *{
   *  data: {
   *    is_show: false,
   *    progress_info: [{text:'卖家下单',finish_time:'',state:''}]
   *  }
    }
   *
   * @apiUse errorMessage
   */
  getUserData(token) {
    var param = ''
    if (token) {
      param = '?token=' + token
    }
    return new Promise(function (resolve, reject) {
      // 修改的p4p接口
      CommonHttpTransform.get('/account' + param)
        .then(function (data) {
          resolve(data.data)
        })
    });
  },
  getToken(code) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/auth/login?code=' + code)
        .then(function (data) {
          resolve(data.token)
        })
    });
  },
  updateToken() {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/auth/refresh_token')
        .then(function (data) {
          resolve(data.new_token)
        })
    });
  },
  logout() {
    return CommonHttpTransform.get('/auth/logout')
  },
  // 更新店铺签名
  updataSignName(name) {
    return CommonHttpTransform.post('/sign', {
      sign_name: name
    })
  },
  // 获取头部重要信息提示
  getImportantMessage() {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/notice').then(function (data) {
        resolve(data.data)
      })
    })
  },
  // 店铺扣费规则
  getDeductionRule() {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/deduction_rule').then(function (data) {
        resolve(data.data)
      })
    })
  },
  // 导入进度条
  getProgress() {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/progress').then(function (data) {
        resolve(data.data)
      })
    })
  }
}
