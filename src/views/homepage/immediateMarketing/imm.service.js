import CommonHttpTransform from '../../../service/commonHttpTransform.service'
import API_MARKET from '../../../service/marketing.service'
export default {

    // var data = {
    //   config: {
    //     status: '',             // 订单状态
    //     deadline: [],  // 活动有效时间  空为开启后一直运行，非空为自定义，自定义对应时间值为[时间戳1，时间戳2】
    //     deadline_label: '',
    //     trigger_time: '',       // 发送节点  暂时不用
    //     send_time: '',          // 信息发送时间段
    //     items: [],              // 推送营销宝贝
    //     items_label: '',
    //     trade_from: '',         // 订单来源
    //     items_range: {include:[],exclude:[]},        // 购买宝贝范围  {include:[],exclude:[]}
    //     items_range_label: [],
    //     interval: 1,            // 发送频率
    //     activity_type: [],        // 订单类型
    //     activity_type_label: '',
    //     payment: [],            // 订单金额
    //     payment_start: 0,
    //     payment_end: 0,
    //     payment_label: '',
    //     created: [],            // 下单时间
    //     created_start: '',
    //     created_end: '',
    //     group: {category_id: '', group_id: ''},              // 目标会员   {category_id: 1, group_id: 1}
    //     group_label: '',
    //     buyer_message: '',      // 卖家留言
    //     seller_flag: [],        // 备注旗子
    //     seller_flag_label: [],        // 备注旗子
    //     reminder: {time:'',mobile:''},   // 结束提醒
    //     reminder_label: '',   // 结束提醒
    //     send_type: 'sms',
    //     message: '【签名】亲，您可能还需要【<AI商品短名>】，一起买更省心奥^_^点击查看【<店铺短链>】'
    //   }
    // }

  getTransform(data) {
    var conf = {}
    if (typeof (data) === 'string') {
        conf = JSON.parse(data)
    } else {
        conf = data
    }
    return conf
  },
  setTransform(data) {
    var conf = {}
    if (typeof (data) === 'string') {
        conf = JSON.parse(data)
    } else {
        conf = data
    }

    return conf
  }

}
