/*
 * @Author: baymax
 * @Date: 2017-03-03 18:01:35
 * @Last Modified by: xiamu
 * @Last Modified time: 2018-04-21 16:11:52
 * 全局常量， 存放前端维护的静态数据
 */
export default {
  // 淘宝详情url
  goTaobaoDetail(id) {
    return function () {
      window.open('https://item.taobao.com/item.htm?id=' + id)
    }
  },
  //历史合并订单有效与即时订单有效
  orderRemarks: [
    {
      label: '以下条件针对-历史合并订单有效',
      value: 'historyOrder'
    },
    {
      label: '以下条件针对-即时订单有效',
      value: 'instantOrder'
    },
    {
      label: '以下条件针对-历史合并订单、即时订单有效',
      value: 'bothOrder'
    }
  ],
  // 时间段下拉数据
  monthCounts: [
    { label: '全部', value: 'all' },
    { label: '最近1年', value: '12' },
    { label: '最近2年', value: '24' },
    { label: '最近3年', value: '36' },
    { label: '最近3个月', value: '3' },
    { label: '最近6个月', value: '6' }
  ],
  // 顾客类型
  customerTypes: [
    { label: '全部顾客分布图', value: 'all' },
    { label: '新客分布图', value: 'new' },
    { label: '老客分布图', value: 'old' }
  ],
  // 顾客类型
  customerTypesSales: [
    { label: '新老客户对比图', value: 'all' },
    { label: '新顾客波谱图', value: 'new' },
    { label: '老顾客波谱图', value: 'old' }
  ],
  // 复购周期
  rebuyNums: [
    { label: '第1-2复购', value: '2' },
    { label: '第2-3复购', value: '3' },
    { label: '第3-4复购', value: '4' },
    { label: '第4-5复购', value: '5' }
  ],
  // 宝贝状态  出售中|库存
  goodsStates: [
    {
      label: '所有宝贝状态',
      value: 'all'
    },
    {
      label: '出售中的宝贝',
      value: 'onsale'
    },
    {
      label: '库存中的宝贝',
      value: 'instock'
    }
  ],
  //星期
  weeks: ['日', '一', '二', '三', '四', '五', '六'],
  //触发因素
  reasons: [
    {
      name: '态度不满',
      value: 'DISPLEASURE'
    }, {
      name: '假货怀疑',
      value: 'FAKESUSPECT'
    }, {
      name: '质量不满',
      value: 'DISQUALITY'
    }, {
      name: '欺诈行为',
      value: 'CHEATBEHAVIOR'
    }, {
      name: '价格不满',
      value: 'DISPRICE'
    }, {
      name: '承诺不兑现',
      value: 'PROMISENOCASH'
    }, {
      name: '物流问题',
      value: 'LOGISTICSPROBLEM'
    }, {
      name: '预期落差',
      value: 'EXPECTEDGAP'
    }, {
      name: '未发货退款的',
      value: 'NOSENDREFUND'
    }, {
      name: '发货后退货退款的',
      value: 'RETURNREFUND'
    }, {
      name: '申请过售后的',
      value: 'FORCUSTOMERSERVICE'
    }
  ],
  //客单价
  guestPrice: [{
    name: '精准至高客单价会员',
    value: 'high'
  }, {
    name: '精准至中客单价会员',
    value: 'middle'
  }, {
    name: '精准至低客单价会员',
    value: 'low'
  }],
  // 十种常见的颜色
  common_colors: [
    '#c00000', '#ff0000', '#ffc000', '#ffff00', '#92d050', '#00b050', '#00b0f0', '#0e0e0e', '#002060', '#0b051b',
    '#F4606C', '#ECAD9E', '#E6CEAC', '#D1BA74', '#D6D5B7', '#BEEDC7', '#BEE7E9', '#A0EEE1', '#8CC7B5', '#19CAAD'
  ],
  // 旗子的数组
  flags: [
    {
      des: '灰',
      color: '#757575',
      checked: false,
      value: 0
    }, {
      des: '红',
      color: '#FF0101',
      checked: false,
      value: 1
    }, {
      des: '黄',
      color: '#FFE32A',
      checked: false,
      value: 2
    }, {
      des: '绿',
      color: '#01D020',
      checked: false,
      value: 3
    }, {
      des: '蓝',
      color: '#0051F8',
      checked: false,
      value: 4
    }, {
      des: '紫',
      color: '#E000FB',
      checked: false,
      value: 5
    }
  ],
  // 订单类型
  orderTypes: [
    '日常销售',
    '会员促销',
    '自己店铺大力度促销',
    '淘外大力度促销',
    '聚划算',
    '淘抢购',
    '品牌团',
    '双11',
    '双12',
    '淘宝其他官方活动'
  ],
  //按效果分成 即时营销
  marketingTypesByEffectImm:
  [
    {
      name: 'SERIVICE',
      value: '服务费'
    },
    // 营销管理系统中使用
    // {
    //   name: 'PAYED_ORDER_CUSTOMER_P4P',
    //   value: '成果用户数'
    // },
    // {
    //   name: 'PAYED_MARKETING_CUSTOMER_P4P',
    //   value: '营销用户数'
    // },
    // {
    //   name: 'PAYED_RATE_P4P',
    //   value: '营销成功率'
    // },
    // {
    //   name: 'PAYED_ROI_P4P',
    //   value: '投入产出比'
    // }
  ],
  marketingTypesByEffectPon:
  [
    {
      name: 'SERIVICE',
      value: '服务费'
    },
    // 营销管理系统中使用
    // {
    //   name: 'POTEN_ORDER_CUSTOMER_P4P',
    //   value: '成果用户数'
    // },
    // {
    //   name: 'PAYED_MARKETING_CUSTOMER_P4P',
    //   value: '营销用户数'
    // },
    // {
    //   name: 'POTEN_RATE_P4P',
    //   value: '营销成功率'
    // },
    // {
    //   name: 'POTEN_ROI_P4P',
    //   value: '投入产出比'
    // }
  ],
  marketingTypes:
  [
    {
      name: 'ROI',
      value: '投入产出比ROI'
    },
    {
      name: 'RATE',
      value: '营销成功率'
    },
    {
      name: 'MARKETING_CUSTOMER',
      value: '营销用户数'
    },
    {
      name: 'ORDER_CUSTOMER',
      value: '加购用户数'
    }
  ],
  // 跟随潜需 效果数据
  marketingTypesP:
  [
    {
      name: 'ROI',
      value: '投入产出比ROI'
    },
    {
      name: 'RATE',
      value: '营销复购率'
    },
    {
      name: 'MARKETING_CUSTOMER',
      value: '营销用户数'
    },
    {
      name: 'ORDER_CUSTOMER',
      value: '回购用户数'
    }
  ],
  //处女购跟随
  marketingTypesFirst:
  [
    {
      name: 'ROI',
      value: '营销I/O投入产出比'
    },
    {
      name: 'RATE',
      value: '营销复购率'
    },
    {
      name: 'MARKETING_CUSTOMER',
      value: '营销用户数'
    },
    {
      name: 'ORDER_CUSTOMER',
      value: '回购用户数'
    }
  ],
  // 挽回通用
  //营销I/O投入产出比、营销成功率、营销用户数、成果用户数
  marketingTypesW:
  [
    {
      name: 'ROI',
      value: '营销I/O投入产出比'
    },
    {
      name: 'RATE',
      value: '营销成功率'
    },
    {
      name: 'MARKETING_CUSTOMER',
      value: '营销用户数'
    },
    {
      name: 'ORDER_CUSTOMER',
      value: '成果用户数'
    }
  ],
  // 默认催付提醒 效果数据
  marketingTypesPayRemind:
  [
    // {
    //   name: 'PAYREMIND_USER_COUNT',
    //   value: '默认催付用户数'
    // },
    // {
    //   name: 'PAYREMIND_USER_RATE',
    //   value: '默认催付用户占比'
    // },
    {
      name: 'PAYREMIND_SAVE_MONEY',
      value: '挽回金额'
    },
    {
      name: 'PAYREMIND_SAVE_ORDER_NUM',
      value: '挽回订单量'
    },
    {
      name: 'PAYREMIND_SAVE_ORDER_RATE',
      value: '挽回订单率'
    },
    {
      name: 'PAYREMIND_ORDER_CLOSED_RATE',
      value: '订单关闭率'
    }
  ],
  //态度不满效果数据
  marketingTypesDispleasure: [{
    name: 'DISPLEASURE_USER_NUMBER',
    value: '态度不满用户数'
  }, {
    name: 'DISPLEASURE_USER_PROPORTION',
    value: '态度不满用户占比'
  }],
  //假货怀疑效果数据
  marketingTypesFakesuspect: [{
    name: 'DISPLEASURE_USER_NUMBER',
    value: '假货怀疑用户数'
  }, {
    name: 'DISPLEASURE_USER_PROPORTION',
    value: '假货怀疑用户占比'
  }],
  //质量不满效果数据
  marketingTypesdisquality: [{
    name: 'DISPLEASURE_USER_NUMBER',
    value: '质量不满用户数'
  }, {
    name: 'DISPLEASURE_USER_PROPORTION',
    value: '质量不满用户占比'
  }],
  //欺诈行为效果数据
  marketingTypesCheatbehavior: [{
    name: 'DISPLEASURE_USER_NUMBER',
    value: '欺诈行为用户数'
  }, {
    name: 'DISPLEASURE_USER_PROPORTION',
    value: '欺诈行为用户占比'
  }],
  //价格不满效果数据
  marketingTypesDisprice: [{
    name: 'DISPLEASURE_USER_NUMBER',
    value: '价格不满用户数'
  }, {
    name: 'DISPLEASURE_USER_PROPORTION',
    value: '价格不满用户占比'
  }],
  //承诺不兑现效果数据
  marketingTypesPromisenoCash: [{
    name: 'DISPLEASURE_USER_NUMBER',
    value: '承诺不兑现用户数'
  }, {
    name: 'DISPLEASURE_USER_PROPORTION',
    value: '承诺不兑现用户占比'
  }],
  //物流问题效果数据
  marketingTypesLOGISTICSPROBLEM: [{
    name: 'DISPLEASURE_USER_NUMBER',
    value: '物流问题用户数'
  }, {
    name: 'DISPLEASURE_USER_PROPORTION',
    value: '物流问题用户占比'
  }],
  //预期落差效果数据
  marketingTypesEXPECTEDGAP: [{
    name: 'DISPLEASURE_USER_NUMBER',
    value: '预期落差用户数'
  }, {
    name: 'DISPLEASURE_USER_PROPORTION',
    value: '预期落差用户占比'
  }],
  //到达所在城市效果数据
  marketingTypesSendremind: [{
    name: 'SENDREMIND_USER_NUMBER',
    value: '到达所在城市提醒用户数'
  }],
  //开始派送效果数据
  marketingTypesStartSendRemind: [{
    name: 'SENDREMIND_USER_NUMBER',
    value: '开始派送提醒用户数'
  }],
  //签收提醒效果数据
  marketingTypesSignRemind: [{
    name: 'SENDREMIND_USER_NUMBER',
    value: '签收提醒用户数'
  }],
  //发货延迟效果数据
  marketingDelayDelivering: [{
    name: 'DELAYDELIVER_ORDER_NUM',
    value: '发货延迟订单量'
  }, {
    name: 'DELAYDELIVER_ORDER_PROPORTION',
    value: '发货延迟订单率'
  }],
  //快递运送超时效果数据
  marketingEXPRESSOUT: [{
    name: 'DELAYDELIVER_ORDER_NUM',
    value: '快递运送超时订单量'
  }, {
    name: 'DELAYDELIVER_ORDER_PROPORTION',
    value: '快递运送超时订单率'
  }],
  //无流转记录效果数据
  marketingNOTRANSFERRECORD: [{
    name: 'DELAYDELIVER_ORDER_NUM',
    value: '无流转记录订单量'
  }, {
    name: 'DELAYDELIVER_ORDER_PROPORTION',
    value: '无流转记录订单率'
  }],
  //无流转记录效果数据
  marketingTRANSFERREEOE: [{
    name: 'DELAYDELIVER_ORDER_NUM',
    value: '流转异常时订单量'
  }, {
    name: 'DELAYDELIVER_ORDER_PROPORTION',
    value: '流转异常时订单率'
  }],
  //初评关怀
  marketingFirstComment: [{
    name: 'FIRSTCOMMENT_USER_NUM',
    value: '初评关怀用户数'
  }
    // , {
    //   name: 'FIRSTCOMMENT_USER_PROPORTION',
    //   value: '初评关怀用户占比'
    // }
  ],
  //默认付款关怀
  marketingPAYCARE: [{
    name: 'FIRSTCOMMENT_USER_NUM',
    value: '默认付款关怀用户数'
  }],
  //默认发货提醒
  marketingDELIVERREMIND: [{
    name: 'FIRSTCOMMENT_USER_NUM',
    value: '默认发货提醒用户数'
  }],
  //默认确认关怀
  marketingAFFIRMCARE: [{
    name: 'FIRSTCOMMENT_USER_NUM',
    value: '默认确认关怀用户数'
  }],
  //会员卡领取提醒
  marketingCLUBCARDREMIND: [{
    name: 'FIRSTCOMMENT_USER_NUM',
    value: '会员卡领取提醒用户数'
  }],
  //追评关怀
  marketingADDITIONALCARE: [{
    name: 'FIRSTCOMMENT_USER_NUM',
    value: '追评关怀用户数'
  }],

  //未发货退款
  marketingNosendrefund: [{
    name: 'REFUND_USER_NUM',
    value: '未发货退款用户数'
  }, {
    name: 'REFUND_USER_PROPORTION',
    value: '未发货退款用户占比'
  }],
  //发货后未收货退款
  marketingRefund: [{
    name: 'REFUND_USER_NUM',
    value: '发货后未收货退款用户数'
  }, {
    name: 'REFUND_USER_PROPORTION',
    value: '发货后未收货用户占比'
  }],
  //退货退款
  marketingRetrunRefund: [{
    name: 'REFUND_USER_NUM',
    value: '退货退款用户数'
  }, {
    name: 'REFUND_USER_PROPORTION',
    value: '退货退款用户占比'
  }],
  //买家申请仅退款效果数据
  marketingOnlyRefund: [{
    name: 'ONLYREFUND_USER_NUMBER',
    value: '买家申请仅退款用户数',
  }, {
    name: 'ONLYREFUND_USER_PROPORTION',
    value: '买家申请仅退款用户占比',
  }],
  //买家申请退货退款效果数据
  marketingAPPLYRETURNREFUND: [{
    name: 'ONLYREFUND_USER_NUMBER',
    value: '买家申请退货退款用户数',
  }, {
    name: 'ONLYREFUND_USER_PROPORTION',
    value: '买家申请退货退款用户占比',
  }],
  //商家拒绝仅退款申请效果数据
  marketingREFUSEREFUND: [{
    name: 'ONLYREFUND_USER_NUMBER',
    value: '商家拒绝仅退款申请用户数',
  }],
  //商家拒绝退货退款申请效果数据
  marketingREFUSERETURNREFUND: [{
    name: 'ONLYREFUND_USER_NUMBER',
    value: '商家拒绝退货退款申请用户数',
  }],
  //商家同意退货退款申请效果数据
  marketingAGREERETURNREFUND: [{
    name: 'ONLYREFUND_USER_NUMBER',
    value: '商家同意退货退款申请用户数',
  }],
  //买家退货被签收提醒效果数据
  marketingREFUNDSIGNREMIND: [{
    name: 'ONLYREFUND_USER_NUMBER',
    value: '买家退货被签收提醒用户数',
  }],
  //退款成功效果数据
  marketingSUCCESSREFUND: [{
    name: 'ONLYREFUND_USER_NUMBER',
    value: '退款成功提醒用户数',
  }],
  //快消品效果数据
  //营销I/O投入产出比、营销成功率、营销用户数、成果用户数、复购用户占比
  marketingFMGGcare: [{
    name: 'FMGGCARE_ROI',
    value: '营销I/O投入产出比'
  },
  {
    name: 'FMGGCARE_RATE',
    value: '营销成功率'
  },
  {
    name: 'FMGGCARE_CUSTOMER',
    value: '营销用户数'
  },
  {
    name: 'FMGGCARE_ORDER_CUSTOMER',
    value: '成果用户数'
  },
  {
    name: 'FMGGCARE_USER_PROPORTION',
    value: '复购用户占比'
  }],
  //节假日效果数据
  marketingHolidayCare: [{
    name: 'HOLIDAYCARE_ROI',
    value: '营销I/O投入产出比'
  }, {
    name: 'HOLIDAYCARE_RATE',
    value: '营销成功率'
  }, {
    name: 'HOLIDAYCARE_CUSTOMER',
    value: '营销用户数'
  }, {
    name: 'HOLIDAYCARE_ORDER_CUSTOMER',
    value: '成果用户数'
  }],
  //节气效果数据
  //营销I/O投入产出比、营销成功率、营销用户数、成果用户数
  marketingSolartermCare: [{
    name: 'SOLARTERMCARE_ROI',
    value: '营销I/O投入产出比'
  }, {
    name: 'SOLARTERMCARE_RATE',
    value: '营销成功率'
  }, {
    name: 'SOLARTERMCARE_CUSTOMER',
    value: '营销用户数'
  }, {
    name: 'SOLARTERMCARE_ORDER_CUSTOMER',
    value: '成果用户数'
  }],
  //恶劣天气效果数据
  //营销I/O投入产出比、营销成功率、营销用户数、成果用户数
  marketingBadWeather: [{
    name: 'BADWEATHER_ROI',
    value: '营销I/O投入产出比'
  }, {
    name: 'BADWEATHER_RATE',
    value: '营销成功率'
  }, {
    name: 'BADWEATHER_CUSTOMER',
    value: '营销用户数'
  }, {
    name: 'BADWEATHER_ORDER_CUSTOMER',
    value: '成果用户数'
  }],
  //礼品营销效果数据
  marketingGiftMarket: [{
    name: 'GIFTMARKET_RATE',
    value: '营销成功率'
  }, {
    name: 'GIFTMARKET_CUSTOMER',
    value: '营销用户数'
  }, {
    name: 'GIFTMARKET_ORDER_CUSTOMER',
    value: '成果用户数'
  }],
  //初评提醒和追评提醒（待定）
  marketingCOMMENTREMIND: [{
    name: 'COMMENTREMIND_RATE',
    value: '营销成功率'
  }, {
    name: 'COMMENTREMIND_CUSTOMER',
    value: '营销用户数'
  }, {
    name: 'COMMENTREMIND_ORDER_CUSTOMER',
    value: '成果用户数'
  }],
  //聚划算挽回
  marketingJuhuasuanSave: [{
    name: 'JHSREDEEM_ROI',
    value: '营销I/O投入产出比'
  }, {
    name: 'JHSREDEEM_RATE',
    value: '营销成功率'
  }, {
    name: 'JHSREDEEM_CUSTOMER',
    value: '营销用户数'
  }, {
    name: 'JHSREDEEM_ORDER_CUSTOMER',
    value: '成果用户数'
  }],
  //挽回会员专享活动
  marketingSaveGradeActivity: [{
    name: 'SAVEACTIVITY_ROI',
    value: '营销I/O投入产出比'
  }, {
    name: 'SAVEACTIVITY_RATE',
    value: '营销成功率'
  }, {
    name: 'SAVEACTIVITY_CUSTOMER',
    value: '营销用户数'
  }, {
    name: 'SAVEACTIVITY_ORDER_CUSTOMER',
    value: '成果用户数'
  }],
  //同类型新品
  marketingSameNew: [{
    name: 'SAMENER_ROI',
    value: '营销I/O投入产出比'
  }, {
    name: 'SAMENER_RATE',
    value: '营销成功率'
  }, {
    name: 'SAMENER_CUSTOMER',
    value: '营销用户数'
  }, {
    name: 'SAMENER_ORDER_CUSTOMER',
    value: '成果用户数'
  }],
  //致歉信效果数据
  marketingAletter: [{
    name: 'ALETTER_RATE',
    value: '营销成功率'
  }, {
    name: 'ALETTER_CUSTOMER',
    value: '营销用户数'
  }, {
    name: 'ALETTER_ORDER_CUSTOMER',
    value: '成果用户数'
  }],
  //聚划算 激活
  marketingJuhuasuanActivate: [{
    name: 'JHSACTIVATE_ROI',
    value: '营销I/O投入产出比'
  }, {
    name: 'JHSACTIVATE_RATE',
    value: '营销成功率'
  }, {
    name: 'JHSACTIVATE_CUSTOMER',
    value: '营销用户数'
  }, {
    name: 'JHSACTIVATE_ORDER_CUSTOMER',
    value: '成果用户数'
  }],
  marketingContentTypes: [
    {
      name: 'SMS_SUCCESS',
      value: '短信推送成功量'
    },
    // {
    //   name: 'QIANNIU_SEND',
    //   value: '千牛发送量'
    // },
    // {
    //   name: 'QIANNIU_PUSH',
    //   value: '千牛推送量'
    // },
    // {
    //   name: 'QIANNIU_RATE',
    //   value: '千牛推送率'
    // }
  ],
  qianniuService: [
    {
      name: '客服1',
      value: '1'
    },
    {
      name: '客服2',
      value: '2'
    }
  ],
  expressList: [
    {
      name: '全峰快递',
      value: 'quanfeng'
    },
    {
      name: '中通',
      value: 'zhongtong'
    },
    {
      name: '全一快递',
      value: 'quanyi'
    },
    {
      name: '速尔',
      value: 'suer'
    },
    {
      name: 'EMS经济快递',
      value: 'ems_cheap'
    },
    {
      name: 'EMS',
      value: 'ems'
    },
    {
      name: '圆通速递',
      value: 'yuantong'
    },
    {
      name: '中通快递',
      value: 'zhongtong_kuaidi'
    },
    {
      name: '宅急送',
      value: 'zhaijisong'
    },
    {
      name: '韵达快递',
      value: 'yunda'
    },
    {
      name: '天天快递',
      value: 'tiantian'
    },
    {
      name: '菜鸟同城配',
      value: 'cainiao_tongcheng'
    },
    {
      name: '华强物流',
      value: 'huaqiang'
    },
    {
      name: '百世快递',
      value: 'baishi'
    },
    {
      name: '联邦快递',
      value: 'lianbang'
    },
    {
      name: '百世物流',
      value: 'baishi_wuliu'
    },
    {
      name: '顺丰速运',
      value: 'shunfeng'
    },
    {
      name: '申通快递',
      value: 'shentong'
    },
    {
      name: '龙邦速递',
      value: 'longbang'
    },
    {
      name: '天地华宇',
      value: 'tiandihuayu'
    },
    {
      name: '快捷快递',
      value: 'kuaijie'
    },
    {
      name: '邮政快递包裹',
      value: 'youzheng'
    },
    {
      name: '新邦物流',
      value: 'xinbang'
    },
    {
      name: '中通速递BJ',
      value: 'zhongtong_bj'
    },
    {
      name: '联邦快递陆运',
      value: 'lianbang_luyun'
    },
    {
      name: '邮政标准快递',
      value: 'youzheng_biaozhun'
    },
    {
      name: '德邦快递',
      value: 'debang'
    },
    {
      name: '优速快递',
      value: 'yousu'
    },
    {
      name: '德邦物流',
      value: 'debang_wuliu'
    },
    {
      name: '国通快递',
      value: 'guotong'
    }

  ],
  finishState: [
    '(待开发)',
    '(测试中)',
    ''
  ],
  /////////////////// 左侧菜单数据 /////////////////
  MemberManageSidebar: [
    {
      name: '全部会员',
      icon: 'icon-allUsers',
      isObj: false,
      path: '/memberManage/memberList'
    },
    // {
    //   name: 'AI引擎流转分组',
    //   icon: 'icon-Automatic-configuration',
    //   isObj: true,
    //   path: '/memberManage/memberList',
    //   submenus: [
    //     '平销',
    //     '活动'
    //   ]
    // },
    {
      name: '智能标签',
      icon: 'icon-biaoqian2',
      path: '/memberManage/memberList',
      isObj: true,
      submenus: [
        '购物次数标签',
        '客单价标签'
      ],
      submenusTool: {
        more: {
          购物次数标签: 8
        }
      }
    },
    // {
    //   name: '会员等级分组',
    //   icon: 'icon-huiyuandengjifenzu',
    //   path: '/memberManage/memberList',
    //   isObj: true,
    //   submenus: [],
    //   submenusTool: {
    //     links: {
    //       创建会员等级制度: '/memberManage/createMemberGrade'
    //     }
    //   }
    // },
    {
      name: '自建营销标签',
      icon: 'icon-AIzhinengbiaoqianfenzu',
      path: '/memberManage',
      isObj: true,
      submenus: [
      ],
      submenusTool: {
        links: {
          黑名单: '/memberManage/blackList',
          灰名单: '/memberManage/greyList',
          // 新建营销分组: ''
        }
      }
    }, {
      name: '导入会员批次',
      path: '/memberManage/memberList',
      icon: 'icon-submit',
      isObj: true,
      submenus: [
        '导入会员'
      ]
    }],
  // 首页
  HomepageSidebar: [
    {
      name: '效果分成',
      icon: 'icon-xiaoguofencheng',
      submenus: [{
        name: '即时营销',
        type: 'PAYED_P4P_SYS',
        types: 'PAYED',
        finishState: 2,
        icon: 'icon-jishiyingxiao',
        path: '/homepage/immediateMarketing/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '跟随潜需式营销',
        type: 'POTENTIAL_P4P_SYS',
        types: 'POTENTIAL',
        finishState: 2,
        icon: 'icon-fugouyingxiao',
        path: '/homepage/pon/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    }
  ],
  HomepageSidebar2: [
    {
      name: '双11/12阶梯营销',
      icon: 'icon-shuang11',
      submenus: [{
        name: '双12全量前倾型',
        type: 'ALLBEFOREDOUBLE12_P4P_SYS',
        types: 'ALLBEFOREDOUBLE12',
        finishState: 2,
        path: '/homepage/allBeforeDouble12/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双12全量型',
        type: 'ALLDOUBLE12_P4P_SYS',
        types: 'ALLDOUBLE12',
        finishState: 2,
        path: '/homepage/allDouble12/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双12效率型',
        type: 'EFFICTIVEDOUBLE12_P4P_SYS',
        types: 'EFFICTIVEDOUBLE12',
        finishState: 2,
        path: '/homepage/effictiveDouble12/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双12折中型',
        type: 'COMPROMISEEDOUBLE12_P4P_SYS',
        types: 'COMPROMISEEDOUBLE12',
        finishState: 2,
        path: '/homepage/compromiseeDouble12/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双12专注型',
        type: 'FOCUSDOUBLE12_P4P_SYS',
        types: 'FOCUSDOUBLE12',
        finishState: 2,
        path: '/homepage/focusDouble12/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双12定制型',
        type: 'CUSTOMIZEDDOUBLE12_P4P_SYS',
        types: 'CUSTOMIZEDDOUBLE12',
        finishState: 2,
        path: '/homepage/customizedDouble12/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双12当天增量即时型',
        type: 'ADDDOUBLE12INSTANT_P4P_SYS',
        types: 'ADDDOUBLE12INSTANT',
        finishState: 2,
        path: '/homepage/addDouble12/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双12当天增量预设型',
        type: 'ADDDOUBLE12PRESET_P4P_SYS',
        types: 'ADDDOUBLE12PRESET',
        finishState: 2,
        path: '/homepage/addDouble12Preset/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双11全量前置型',
        type: 'ALLBEFOREDOUBLE11_P4P_SYS',
        types: 'ALLBEFOREDOUBLE11',
        finishState: 2,
        path: '/homepage/allBeforeDouble11/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双11全量型',
        type: 'ALLDOUBLE11_P4P_SYS',
        types: 'ALLDOUBLE11',
        finishState: 2,
        path: '/homepage/allDouble11/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双11效率型',
        type: 'EFFICTIVEDOUBLE11_P4P_SYS',
        types: 'EFFICTIVEDOUBLE11',
        finishState: 2,
        path: '/homepage/effictiveDouble11/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双11折中型',
        type: 'COMPROMISEEDOUBLE11_P4P_SYS',
        types: 'COMPROMISEEDOUBLE11',
        finishState: 2,
        path: '/homepage/compromiseeDouble11/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双11专注型',
        type: 'FOCUSDOUBLE11_P4P_SYS',
        types: 'FOCUSDOUBLE11',
        finishState: 2,
        path: '/homepage/focusDouble11/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双11定制型',
        type: 'CUSTOMIZEDDOUBLE11_P4P_SYS',
        types: 'CUSTOMIZEDDOUBLE11',
        finishState: 2,
        path: '/homepage/customizedDouble11/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双11当天增量即时型',
        type: 'ADDDOUBLE11INSTANT_P4P_SYS',
        types: 'ADDDOUBLE11INSTANT',
        finishState: 2,
        path: '/homepage/addDouble11/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '双11当天增量预设型',
        type: 'ADDDOUBLE11PRESET_P4P_SYS',
        types: 'ADDDOUBLE11PRESET',
        finishState: 2,
        path: '/homepage/addDouble11Preset/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    }, {
      name: '即时营销',
      icon: 'icon-jishiyingxiao',
      submenus: [{
        name: '拍下即时营销',
        type: 'PAYED_P4P_SYS',
        types: 'PAYED',
        finishState: 2,
        path: '/homepage/immediateMarketing/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '付款即时营销',
        type: 'PAYMENT_P4P_SYS',
        types: 'PAYMENT_',
        finishState: 1,
        path: '/homepage/payMent/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '订单关闭即时营销',
        type: 'ORDERCLOSED_P4P_SYS',
        types: 'ORDERCLOSED_',
        finishState: 1,
        path: '/homepage/orderClosed/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    },
    {
      name: '上新营销',
      icon: 'icon-shangxinyingxiao',
      submenus: [{
        finishState: 0,
        name: '季节性新品',
        type: 'PSEASONALNEW_P4P_SYS',
        types: 'PSEASONALNEW',
        path: '',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 0,
        name: '同类型新品',
        type: 'UNSEASONALNEW_P4P_SYS',
        types: 'UNSEASONALNEW',
        path: '',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 0,
        name: '换代型新品',
        type: 'PUPDATANEW_P4P_SYS',
        types: 'PUPDATANEW',
        path: '',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      },
      {
        finishState: 0,
        name: '配件型新品',
        type: 'PPARTSNEW_P4P_SYS',
        types: 'PPARTSNEW',
        path: '',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 0,
        name: '延伸型新品',
        type: 'PEXPANDNEW_P4P_SYS',
        types: 'PEXPANDNEW',
        path: '',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    },
    {
      name: '活动营销',
      icon: 'icon-dianneidaliducuxiao',
      submenus: [{
        finishState: 0,
        name: '会员专享活动',
        type: 'TOMEMBERSHIP_P4P_SYS',
        types: 'TOMEMBERSHIP_',
        path: '',
        //path: '/activateCustomer',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 0,
        name: '聚划算',
        type: 'PJHSACTIVATE_P4P_SYS',
        types: 'PJHSACTIVATE',
        path: '',
        //path: '/activateCustomer',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 0,
        name: '品牌团',
        type: 'PPPTACTIVATE_P4P_SYS',
        types: 'PPPTACTIVATE',
        path: '',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 0,
        name: '淘抢购',
        type: 'PTQGACTIVATE_P4P_SYS',
        types: 'PTQGACTIVATE',
        path: '',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 0,
        name: '其他大促活动',
        type: 'POTHERACTIVATE_P4P_SYS',
        types: 'POTHERACTIVATE',
        path: '',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    },
    {
      name: '折扣促销',
      icon: 'icon-zhekoucuxiao',
      submenus: [
        {
          name: '打折',
          type: 'DISCOUNT_P4P_SYS',
          types: 'DISCOUNT',
          path: '/homepage/discount/config',
          finishState: 0,
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          name: '满减',
          type: 'FULLCUT_P4P_SYS',
          types: 'FULLCUT',
          path: '/homepage/fullCut/config',
          finishState: 0,
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          name: '买A+？元优惠买B',
          type: 'BUYAANDOTHER_P4P_SYS',
          types: 'BUYAANDOTHER',
          finishState: 0,
          path: '/homepage/buyAandother/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          name: 'A+B一起买优惠',
          type: 'BUYAADNB_P4P_SYS',
          types: 'BUYAADNB',
          finishState: 0,
          path: '/homepage/buyAandB/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          name: '免邮',
          type: 'FREESHIPPING_P4P_SYS',
          types: 'FREESHIPPING',
          finishState: 0,
          path: '/homepage/freeShipping/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '标记活动类型',
      icon: 'icon-zidingyi',
      submenus: [
        {
          finishState: 0,
          name: '标记活动类型',
          type: 'TAGACTIVITYTYPE_P4P_SYS',
          types: 'TAGACTIVITYTYPE',
          path: '',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
      ]
    },
    {
      name: '自定义',
      icon: 'icon-zidingyi',
      submenus: [
        {
          name: '双11全量前置型',
          type: 'ALLBEFOREDOUBLE11_P4P_CUSTOM',
          types: 'ALLBEFOREDOUBLE11',
          finishState: 2,
          path: '/homepage/allBeforeDouble11/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双11全量型',
          type: 'ALLDOUBLE11_P4P_CUSTOM',
          types: 'ALLDOUBLE11',
          finishState: 2,
          path: '/homepage/allDouble11/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双11效率型',
          type: 'EFFICTIVEDOUBLE11_P4P_CUSTOM',
          types: 'EFFICTIVEDOUBLE11',
          finishState: 2,
          path: '/homepage/effictiveDouble11/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双11折中型',
          type: 'COMPROMISEEDOUBLE11_P4P_CUSTOM',
          types: 'COMPROMISEEDOUBLE11',
          finishState: 2,
          path: '/homepage/compromiseeDouble11/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双11专注型',
          type: 'FOCUSDOUBLE11_P4P_CUSTOM',
          types: 'FOCUSDOUBLE11',
          finishState: 2,
          path: '/homepage/focusDouble11/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双11定制型',
          type: 'CUSTOMIZEDDOUBLE11_P4P_CUSTOM',
          types: 'CUSTOMIZEDDOUBLE11',
          finishState: 2,
          path: '/homepage/customizedDouble11/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双11当天增量即时型',
          type: 'ADDDOUBLE11INSTANT_P4P_CUSTOM',
          types: 'ADDDOUBLE11INSTANT',
          finishState: 2,
          path: '/homepage/addDouble11/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双11当天增量预设型',
          type: 'ADDDOUBLE11PRESET_P4P_CUSTOM',
          types: 'ADDDOUBLE11PRESET',
          finishState: 2,
          path: '/homepage/addDouble11Preset/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双12全量前倾型',
          type: 'ALLBEFOREDOUBLE12_P4P_CUSTOM',
          types: 'ALLBEFOREDOUBLE12',
          finishState: 2,
          path: '/homepage/allBeforeDouble12/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双12全量型',
          type: 'ALLDOUBLE12_P4P_CUSTOM',
          types: 'ALLDOUBLE12',
          finishState: 2,
          path: '/homepage/allDouble12/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双12效率型',
          type: 'EFFICTIVEDOUBLE12_P4P_CUSTOM',
          types: 'EFFICTIVEDOUBLE12',
          finishState: 2,
          path: '/homepage/effictiveDouble12/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双12折中型',
          type: 'COMPROMISEEDOUBLE12_P4P_CUSTOM',
          types: 'COMPROMISEEDOUBLE12',
          finishState: 2,
          path: '/homepage/compromiseeDouble12/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双12专注型',
          type: 'FOCUSDOUBLE12_P4P_CUSTOM',
          types: 'FOCUSDOUBLE12',
          finishState: 2,
          path: '/homepage/focusDouble12/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双12定制型',
          type: 'CUSTOMIZEDDOUBLE12_P4P_CUSTOM',
          types: 'CUSTOMIZEDDOUBLE12',
          finishState: 2,
          path: '/homepage/customizedDouble12/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双12当天增量即时型',
          type: 'ADDDOUBLE12INSTANT_P4P_CUSTOM',
          types: 'ADDDOUBLE12INSTANT',
          finishState: 2,
          path: '/homepage/addDouble12/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '双12当天增量预设型',
          type: 'ADDDOUBLE12PRESET_P4P_CUSTOM',
          types: 'ADDDOUBLE12PRESET',
          finishState: 2,
          path: '/homepage/addDouble12Preset/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '拍下即时营销',
          type: 'PAYED_P4P_CUSTOM',
          types: 'PAYED',
          finishState: 2,
          path: '/homepage/immediateMarketing/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          type: 'DISCOUNT_P4P_CUSTOM',
          types: 'DISCOUNT',
          name: '打折',
          finishState: 0,
          path: '/homepage/discount/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          name: '付款即时营销',
          type: 'PAYMENT_P4P_CUSTOM',
          types: 'PAYMENT_',
          finishState: 1,
          path: '/homepage/payMent/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '订单关闭即时营销',
          type: 'ORDERCLOSED_P4P_CUSTOM',
          types: 'ORDERCLOSED_',
          finishState: 1,
          path: '/homepage/orderClosed/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 0,
          name: '季节性新品',
          type: 'PSEASONALNEW_P4P_CUSTOM',
          types: 'PSEASONALNEW',
          path: '',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '同类型新品',
          type: 'UNSEASONALNEW_P4P_CUSTOM',
          types: 'UNSEASONALNEW',
          path: '',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '换代型新品',
          type: 'PUPDATANEW_P4P_CUSTOM',
          types: 'PUPDATANEW',
          path: '',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 0,
          name: '配件型新品',
          type: 'PPARTSNEW_P4P_CUSTOM',
          types: 'PPARTSNEW',
          path: '',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '延伸型新品',
          type: 'PEXPANDNEW_P4P_CUSTOM',
          types: 'PEXPANDNEW',
          path: '',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 0,
          name: '会员专享活动',
          type: 'TOMEMBERSHIP_P4P_CUSTOM',
          types: 'TOMEMBERSHIP_',
          path: '/activateCustomer/juHuaSuan/config',
          //path: '/activateCustomer',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '聚划算',
          type: 'PJHSACTIVATE_P4P_CUSTOM',
          types: 'PJHSACTIVATE',
          path: '/activateCustomer/juHuaSuan/config',
          //path: '/activateCustomer',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '品牌团',
          type: 'PPPTACTIVATE_P4P_CUSTOM',
          types: 'PPPTACTIVATE',
          path: '',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '淘抢购',
          type: 'PTQGACTIVATE_P4P_CUSTOM',
          types: 'PTQGACTIVATE',
          path: '',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '其他大促活动',
          type: 'POTHERACTIVATE_P4P_CUSTOM',
          types: 'POTHERACTIVATE',
          path: '',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          name: '满减',
          type: 'FULLCUT_P4P_CUSTOM',
          types: 'FULLCUT',
          finishState: 0,
          path: '/homepage/fullCut/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          name: '买A+？元优惠买B',
          type: 'BUYAANDOTHER_P4P_CUSTOM',
          types: 'BUYAANDOTHER',
          finishState: 0,
          path: '/homepage/buyAandother/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          name: 'A+B一起买优惠',
          type: 'BUYAADNB_P4P_CUSTOM',
          types: 'BUYAADNB',
          finishState: 0,
          path: '/homepage/buyAandB/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          name: '免邮',
          type: 'FREESHIPPING_P4P_CUSTOM',
          types: 'FREESHIPPING',
          finishState: 0,
          path: '/homepage/freeShipping/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 0,
          name: '标记活动类型',
          type: 'TAGACTIVITYTYPE_P4P_CUSTOM',
          types: 'TAGACTIVITYTYPE',
          path: '',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    }],
  // 流失预防
  LossPrevention: [
    {
      name: '物流异常',
      icon: 'icon-wuliu',
      submenus: [{
        name: '发货延迟',
        type: 'DELIVERYDELAY_P4P_SYS',
        types: 'DELIVERYDELAY',
        path: '/lossPrevention/delayDelivering/config',
        finishState: 2,
        //path: '/lossPrevention',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '快递运送超时',
        type: 'EXPRESSOUT_P4P_SYS',
        types: 'EXPRESSOUT',
        finishState: 2,
        path: '/lossPrevention/expresSout/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '无流转记录',
        type: 'NOTRANSFERRECORD_P4P_SYS',
        types: 'NOTRANSFERRECORD',
        finishState: 2,
        path: '/lossPrevention/notransferRecord/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '流转异常时',
        type: 'TRANSFERREEOE_P4P_SYS',
        types: 'TRANSFERREEOE',
        finishState: 0,
        path: '/lossPrevention/transferReeor/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    },
    {
      name: '体验不佳',
      icon: 'icon-tiyanbujia',
      submenus: [
        {
          name: '态度不满',
          type: 'DISPLEASURE_P4P_SYS',
          types: 'DISPLEASURE',
          finishState: 2,
          path: '/lossPrevention/badAttitude/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '假货怀疑',
          type: 'FAKESUSPECT_P4P_SYS',
          types: 'FAKESUSPECT',
          finishState: 2,
          path: '/lossPrevention/fakeSuspect/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '质量不满',
          type: 'DISQUALITY_P4P_SYS',
          types: 'DISQUALITY',
          finishState: 2,
          path: '/lossPrevention/disquality/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '欺诈行为',
          type: 'CHEATBEHAVIOR_P4P_SYS',
          types: 'CHEATBEHAVIOR',
          finishState: 2,
          path: '/lossPrevention/cheatBehavior/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '价格不满',
          type: 'DISPRICE_P4P_SYS',
          types: 'DISPRICE',
          finishState: 2,
          path: '/lossPrevention/disprice/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '承诺不兑现',
          type: 'PROMISENOCASH_P4P_SYS',
          types: 'PROMISENOCASH',
          finishState: 2,
          path: '/lossPrevention/promiseNocash/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '预期落差',
          type: 'EXPECTEDGAP_P4P_SYS',
          types: 'EXPECTEDGAP',
          finishState: 2,
          path: '/lossPrevention/expectedgap/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '物流问题',
          type: 'LOGISTICSPROBLEM_P4P_SYS',
          types: 'LOGISTICSPROBLEM',
          finishState: 2,
          path: '/lossPrevention/logisticsProblem/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '退货退款',
      icon: 'icon-tuihuotuikuan',
      submenus: [
        {
          name: '发货后未收货退款',
          finishState: 2,
          type: 'NORECEIPTREFUND_P4P_SYS',
          types: 'NORECEIPTREFUND',
          path: '/lossPrevention/refund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '未发货退款',
          type: 'NOSENDREFUND_P4P_SYS',
          types: 'NOSENDREFUND',
          finishState: 0,
          path: '/lossPrevention/noSendRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '退货退款',
          type: 'RETURNREFUND_P4P_SYS',
          types: 'RETURNREFUND',
          finishState: 2,
          path: '/lossPrevention/returnRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '自定义',
      icon: 'icon-zidingyi',
      submenus: [
        {
          name: '发货延迟',
          type: 'DELIVERYDELAY_P4P_CUSTOM',
          types: 'DELIVERYDELAY',
          finishState: 2,
          path: '/lossPrevention/delayDelivering/config',
          state: {
            name: '',
            params: {
              id: '111'
            }
          }
        }, {
          name: '快递运送超时',
          type: 'EXPRESSOUT_P4P_CUSTOM',
          types: 'EXPRESSOUT',
          finishState: 2,
          path: '/lossPrevention/expresSout/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '无流转记录',
          type: 'NOTRANSFERRECORD_P4P_CUSTOM',
          types: 'NOTRANSFERRECORD',
          finishState: 2,
          path: '/lossPrevention/notransferRecord/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '流转异常时',
          type: 'TRANSFERREEOE_P4P_CUSTOM',
          types: 'TRANSFERREEOE',
          finishState: 0,
          path: '/lossPrevention/transferReeor/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          name: '假货怀疑',
          type: 'FAKESUSPECT_P4P_CUSTOM',
          types: 'FAKESUSPECT',
          finishState: 2,
          path: '/lossPrevention/fakeSuspect/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '质量不满',
          type: 'DISQUALITY_P4P_CUSTOM',
          types: 'DISQUALITY',
          finishState: 2,
          path: '/lossPrevention/disquality/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '欺诈行为',
          type: 'CHEATBEHAVIOR_P4P_CUSTOM',
          types: 'CHEATBEHAVIOR',
          finishState: 2,
          path: '/lossPrevention/cheatBehavior/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '价格不满',
          type: 'DISPRICE_P4P_CUSTOM',
          types: 'DISPRICE',
          finishState: 2,
          path: '/lossPrevention/disprice/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '承诺不兑现',
          type: 'PROMISENOCASH_P4P_CUSTOM',
          types: '',
          finishState: 2,
          path: '/lossPrevention/promiseNocash/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '预期落差',
          type: 'EXPECTEDGAP_P4P_CUSTOM',
          types: '',
          finishState: 2,
          path: '/lossPrevention/expectedgap/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '物流问题',
          type: 'LOGISTICSPROBLEM_P4P_CUSTOM',
          types: '',
          finishState: 2,
          path: '/lossPrevention/logisticsProblem/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          name: '态度不满',
          type: 'DISPLEASURE_P4P_CUSTOM',
          types: 'DISPLEASURE',
          finishState: 2,
          path: '/lossPrevention/badAttitude/config',
          state: {
            name: '',
            params: {
              id: '222'
            }
          }
        },
        {
          name: '发货后未收货退款',
          type: 'NORECEIPTREFUND_P4P_CUSTOM',
          types: 'NORECEIPTREFUND',
          finishState: 2,
          path: '/lossPrevention/refund/config',
          state: {
            name: '',
            params: {
              id: '333'
            }
          }
        }, {
          name: '未发货退款',
          type: 'NOSENDREFUND_P4P_CUSTOM',
          types: '',
          finishState: 0,
          path: '/lossPrevention/noSendRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '退货退款',
          type: 'RETURNREFUND_P4P_CUSTOM',
          types: '',
          finishState: 2,
          path: '/lossPrevention/returnRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    }],
  // 关怀
  Care: [
    {
      name: '拍下',
      icon: 'icon-paixia',
      submenus: [{
        name: '默认催付提醒',
        type: 'CREATEDREMIND_P4P_SYS',
        types: 'CREATEDREMIND',
        finishState: 2,
        path: '/care/payRemind/config',
        //path: '/care',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '大活动促销提醒',
        type: 'BIGEVENTREMIND_P4P_SYS',
        types: 'BIGEVENTREMIND',
        finishState: 0,
        path: '/care/bigEventRemind/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    },
    {
      name: '付款',
      icon: 'icon-fukuan',
      submenus: [
        {
          name: '默认付款关怀',
          finishState: 2,
          type: 'PAYCARE_P4P_SYS',
          types: 'PAYCARE',
          path: '/care/payCare/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '发货',
      icon: 'icon-fahuo1',
      submenus: [
        {
          name: '默认发货提醒',
          finishState: 2,
          type: 'DELIVERREMIND_P4P_SYS',
          types: 'DELIVERREMIND',
          path: '/care/deliverRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '物流',
      icon: 'icon-wuliu',
      submenus: [
        {
          name: '到达所在城市提醒',
          type: 'SENDREMIND_P4P_SYS',
          finishState: 2,
          types: 'SENDREMIND',
          path: '/care/arriveMyCityRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '开始派送提醒',
          finishState: 1,
          type: 'STARTSENDREMIND_P4P_SYS',
          types: 'STARTSENDREMIND',
          path: '/care/startSendRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '签收提醒',
          finishState: 1,
          type: 'SIGNREMIND_P4P_SYS',
          types: 'SIGNREMIND',
          path: '/care/signRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '确认',
      icon: 'icon-queren',
      submenus: [
        {
          name: '默认确认关怀',
          finishState: 2,
          type: 'AFFIRMCARE_P4P_SYS',
          types: 'AFFIRMCARE',
          path: '/care/affirmCare/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '会员卡领取提醒',
          finishState: 0,
          type: 'CLUBCARDREMIND_P4P_SYS',
          types: 'CLUBCARDREMIND',
          path: '/care/clubCardRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '评价',
      icon: 'icon-pingjia',
      submenus: [
        {
          name: '初评关怀',
          type: 'COMMENTCARE_P4P_SYS',
          types: 'COMMENTCARE',
          finishState: 2,
          path: '/care/firstComment/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '初评提醒',
          finishState: 2,
          type: 'COMMENTREMIND_P4P_SYS',
          types: 'COMMENTREMIND',
          path: '/care/commentRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '追评提醒',
          finishState: 2,
          type: 'ADDITIONALREMIND_P4P_SYS',
          types: 'ADDITIONALREMIND',
          path: '/care/additionalRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '追评关怀',
          finishState: 0,
          type: 'ADDITIONALCARE_P4P_SYS',
          types: 'ADDITIONALCARE',
          path: '/care/additionalCare/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '售后',
      icon: 'icon-shouhou',
      submenus: [
        {
          name: '买家申请仅退款',
          type: 'REFUND_P4P_SYS',
          finishState: 2,
          types: 'REFUND',
          path: '/care/onlyRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '买家申请退货退款',
          finishState: 2,
          type: 'APPLYRETURNREFUND_P4P_SYS',
          types: 'APPLYRETURNREFUND',
          path: '/care/applyReturnRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '商家拒绝仅退款申请',
          finishState: 2,
          type: 'REFUSEREFUND_P4P_SYS',
          types: 'REFUSEREFUND',
          path: '/care/refuseRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '商家拒绝退货退款申请',
          finishState: 2,
          type: 'REFUSERETURNREFUND_P4P_SYS',
          types: 'REFUSERETURNREFUND',
          path: '/care/refuseReturnRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '商家同意退货退款申请',
          finishState: 2,
          type: 'AGREERETURNREFUND_P4P_SYS',
          types: 'AGREERETURNREFUND',
          path: '/care/agreeReturnRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '买家退货被签收提醒',
          finishState: 0,
          type: 'REFUNDSIGNREMIND_P4P_SYS',
          types: 'REFUNDSIGNREMIND',
          path: '/care/refundSignRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '退款成功提醒',
          finishState: 2,
          type: 'SUCCESSREFUND_P4P_SYS',
          types: 'SUCCESSREFUND',
          path: '/care/successRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '自定义',
      icon: 'icon-zidingyi',
      submenus: [
        {
          name: '默认催付提醒',
          type: 'CREATEDREMIND_P4P_CUSTOM',
          types: 'CREATEDREMIND',
          path: '/care/payRemind/config',
          finishState: 2,
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          name: '买家申请仅退款',
          type: 'REFUND_P4P_CUSTOM',
          types: 'REFUND_',
          finishState: 2,
          path: '/care/onlyRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          name: '大活动促销提醒',
          type: 'BIGEVENTREMIND_P4P_CUSTOM',
          types: 'BIGEVENTREMIND',
          finishState: 0,
          path: '/care/bigEventRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '默认付款关怀',
          finishState: 2,
          type: 'PAYCARE_P4P_CUSTOM',
          types: 'PAYCARE',
          path: '/care/payCare/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '默认发货提醒',
          finishState: 2,
          type: 'DELIVERREMIND_P4P_CUSTOM',
          types: 'DELIVERREMIND',
          path: '/care/deliverRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '到达所在城市提醒',
          type: 'SENDREMIND_P4P_CUSTOM',
          types: 'SENDREMIND',
          finishState: 2,
          path: '/care/arriveMyCityRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '开始派送提醒',
          finishState: 1,
          type: 'STARTSENDREMIND_P4P_CUSTOM',
          types: 'STARTSENDREMIND',
          path: '/care/startSendRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '签收提醒',
          finishState: 1,
          type: 'SIGNREMIND_P4P_CUSTOM',
          types: 'SIGNREMIND',
          path: '/care/signRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '默认确认关怀',
          finishState: 2,
          type: 'AFFIRMCARE_P4P_CUSTOM',
          types: 'AFFIRMCARE',
          path: '/care/affirmCare/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '会员卡领取提醒',
          finishState: 0,
          type: 'CLUBCARDREMIND_P4P_CUSTOM',
          types: 'CLUBCARDREMIND',
          path: '/care/clubCardRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '初评关怀',
          type: 'COMMENTCARE_P4P_CUSTOM',
          types: 'COMMENTCARE',
          finishState: 2,
          path: '/care/firstComment/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '初评提醒',
          finishState: 2,
          type: 'COMMENTREMIND_P4P_CUSTOM',
          types: 'COMMENTREMIND',
          path: '/care/commentRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '追评提醒',
          finishState: 2,
          type: 'ADDITIONALREMIND_P4P_CUSTOM',
          types: 'ADDITIONALREMIND',
          path: '/care/additionalRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '追评关怀',
          finishState: 0,
          type: 'ADDITIONALCARE_P4P_CUSTOM',
          types: 'ADDITIONALCARE',
          path: '/care/additionalCare/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '买家申请退货退款',
          finishState: 2,
          type: 'APPLYRETURNREFUND_P4P_CUSTOM',
          types: 'APPLYRETURNREFUND',
          path: '/care/applyReturnRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '商家拒绝仅退款申请',
          finishState: 2,
          type: 'REFUSEREFUND_P4P_CUSTOM',
          types: 'REFUSEREFUND',
          path: '/care/refuseRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '商家拒绝退货退款申请',
          finishState: 2,
          type: 'REFUSERETURNREFUND_P4P_CUSTOM',
          types: 'REFUSERETURNREFUND',
          path: '/care/refuseReturnRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '商家同意退货退款申请',
          finishState: 2,
          type: 'AGREERETURNREFUND_P4P_CUSTOM',
          types: 'AGREERETURNREFUND',
          path: '/care/agreeReturnRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '买家退货被签收提醒',
          finishState: 0,
          type: 'REFUNDSIGNREMIND_P4P_CUSTOM',
          types: 'REFUNDSIGNREMIND',
          path: '/care/refundSignRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '退款成功提醒',
          finishState: 2,
          type: 'SUCCESSREFUND_P4P_CUSTOM',
          types: 'SUCCESSREFUND',
          path: '/care/successRefund/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }]
    }
  ],
  // 处女购
  FirstBuy: [
    {
      name: '新人礼',
      icon: 'icon-xinrenli',
      submenus: [{
        name: '送优惠券',
        finishState: 0,
        type: 'GIVECOUPON_P4P_SYS',
        types: 'GIVECOUPON',
        path: '',
        //path: '/firstBuy',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '第二次买就送',
        finishState: 0,
        type: 'SECONDGIVE_P4P_SYS',
        types: 'SECONDGIVE',
        path: '',
        //path: '/firstBuy',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '新人专享折扣',
        finishState: 0,
        type: 'NEWERDISCOUNT_P4P_SYS',
        types: 'NEWERDISCOUNT',
        path: '',
        //path: '/firstBuy',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '新人专享满减',
        finishState: 0,
        type: 'NEWERFULLCUT_P4P_SYS',
        types: 'NEWERFULLCUT',
        path: '',
        //path: '/firstBuy',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '新人买A+?？元优惠买B',
        finishState: 0,
        type: 'NEWERBUYAANDOTHER_P4P_SYS',
        types: 'NEWERBUYAANDOTHER',
        path: '',
        //path: '/firstBuy',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '新人A+B一起买优惠',
        finishState: 0,
        type: 'NEWERBUYAANDB_P4P_SYS',
        types: 'NEWERBUYAANDB',
        path: '',
        //path: '/firstBuy',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        name: '新人免邮+升级快递',
        finishState: 0,
        type: 'NEWERFREESHIP_P4P_SYS',
        types: 'NEWERFREESHIP',
        path: '',
        //path: '/firstBuy',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    }, {
      name: '复购营销',
      icon: 'icon-fugouyingxiao',
      submenus: [{
        name: '跟随潜需式营销',
        type: 'PON_P4P_SYS',
        types: 'PON',
        //path: '',
        finishState: 2,
        path: '/firstBuy/pon/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    },
    {
      name: '自定义',
      icon: 'icon-zidingyi',
      submenus: [
        {
          name: '跟随潜需式营销',
          type: 'PON_P4P_CUSTOM',
          types: 'PON',
          finishState: 2,
          path: '/firstBuy/pon/config',
          //path: '',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '送优惠券',
          finishState: 0,
          type: 'GIVECOUPON_P4P_CUSTOM',
          types: 'GIVECOUPON',
          path: '',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '第二次买就送',
          finishState: 0,
          type: 'SECONDGIVE_P4P_CUSTOM',
          types: 'SECONDGIVE',
          path: '',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '新人专享折扣',
          finishState: 0,
          type: 'NEWERDISCOUNT_P4P_CUSTOM',
          types: 'NEWERDISCOUNT',
          path: '',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '新人专享满减',
          finishState: 0,
          type: 'NEWERFULLCUT_P4P_CUSTOM',
          types: 'NEWERFULLCUT',
          path: '',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '新人买A+?？元优惠买B',
          finishState: 0,
          type: 'NEWERBUYAANDOTHER_P4P_CUSTOM',
          types: 'NEWERBUYAANDOTHER',
          path: '',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '新人A+B一起买优惠',
          finishState: 0,
          type: 'NEWERBUYAANDB_P4P_CUSTOM',
          types: 'NEWERBUYAANDB',
          path: '',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '新人免邮+升级快递',
          finishState: 0,
          type: 'NEWERFREESHIP_P4P_CUSTOM',
          types: 'NEWERFREESHIP',
          path: '',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    }
  ],
  // 维护
  maintenance: [
    {
      name: '关怀问候',
      icon: 'icon-guanhuaiwenhou',
      submenus: [
        {
          finishState: 2,
          name: '快消品关怀',
          type: 'FMGGCARE_P4P_SYS',
          types: 'FMGGCARE',
          path: '/maintenance/FMGGcare/config',
          //path: '/maintenance',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 0,
          name: '非快消品关怀',
          type: 'NOFMGGCARE_P4P_SYS',
          types: 'NOFMGGCARE',
          path: '/maintenance/noFMGGcare/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 2,
          name: '节假日问候',
          type: 'HOLIDAYCARE_P4P_SYS',
          types: 'HOLIDAYCARE',
          path: '/maintenance/holidayCare/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 2,
          name: '节气问候',
          type: 'SOLARTERMCARE_P4P_SYS',
          types: 'SOLARTERMCARE',
          path: '/maintenance/solartermCare/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 2,
          name: '恶劣天气预警关怀',
          type: 'BADWEATHER_P4P_SYS',
          types: 'BADWEATHER',
          path: '/maintenance/badWeather/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '复购营销',
      icon: 'icon-fugouyingxiao',
      submenus: [
        {
          name: '跟随潜需式营销',
          type: 'POTENTIAL_P4P_SYS',
          types: 'POTENTIAL',
          finishState: 2,
          path: '/maintenance/pon/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '礼品营销',
      icon: 'icon-lipinyingxiao',
      submenus: [
        {
          finishState: 1,
          name: '礼品营销',
          type: 'GIFTMARKET_P4P_SYS',
          types: 'GIFTMARKET',
          path: '/maintenance/giftMaket/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '自定义',
      icon: 'icon-zidingyi',
      submenus: [
        {
          name: '跟随潜需式营销',
          type: 'POTENTIAL_P4P_CUSTOM',
          types: 'POTENTIAL',
          finishState: 2,
          path: '/maintenance/pon/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 2,
          name: '快消品关怀',
          type: 'FMGGCARE_P4P_CUSTOM',
          types: 'FMGGCARE',
          path: '/maintenance/FMGGcare/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 0,
          name: '非快消品关怀',
          type: 'NOFMGGCARE_P4P_CUSTOM',
          types: 'NOFMGGCARE',
          path: '/maintenance/noFMGGcare/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 2,
          name: '节假日问候',
          type: 'HOLIDAYCARE_P4P_CUSTOM',
          types: 'HOLIDAYCARE',
          path: '/maintenance/holidayCare/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 2,
          name: '节气问候',
          type: 'SOLARTERMCARE_P4P_CUSTOM',
          path: '/maintenance/solartermCare/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 2,
          name: '恶劣天气预警关怀',
          type: 'BADWEATHER_P4P_CUSTOM',
          path: '/maintenance/badWeather/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 1,
          name: '礼品营销',
          type: 'GIFTMARKET_P4P_CUSTOM',
          path: '/maintenance/giftMaket/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    }
  ],
  // 挽回
  SaveCustomer: [
    {
      name: '价格因素流失',
      icon: 'icon-jiageyinsuliushi',
      submenus: [
        {
          finishState: 2,
          name: '聚划算挽回',
          type: 'JHSREDEEM_P4P_SYS',
          types: 'JHSREDEEM',
          path: '/saveCustomer/juhuasuanSave/config',
          // path: '/saveCustomer',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '淘抢购挽回',
          type: 'TQGREDEEM_P4P_SYS',
          types: 'TQGREDEEM',
          path: '/saveCustomer/tqgRedeem/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '品牌团挽回',
          type: 'PPTREDEEM_P4P_SYS',
          types: 'PPTREDEEM',
          path: '/saveCustomer/pptRedeem/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '其他大型活动',
          type: 'OUTHERBIGACTIV_P4P_SYS',
          types: 'OUTHERBIGACTIV',
          path: '/saveCustomer/outherBigActiv/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 1,
          name: '挽回会员专享活动',
          type: 'SAVEACTIVITY_P4P_SYS',
          types: 'SAVEACTIVITY',
          path: '/saveCustomer/saveGradeActivity/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '缺乏新品流失',
      icon: 'icon-quefaxinpinliushi',
      submenus: [
        {
          finishState: 1,
          name: '同类型新品',
          type: 'SAMENER_P4P_SYS',
          types: 'SAMENER',
          path: '/saveCustomer/sameNew/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 0,
          name: '季节性新品',
          type: 'SEASONALNEW_P4P_SYS',
          types: 'SEASONALNEW',
          path: '/saveCustomer/seasonalNew/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '换代型新品',
          type: 'UPDATANEW_P4P_SYS',
          types: 'UPDATANEW',
          path: '/saveCustomer/updataNew/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 0,
          name: '配件型新品',
          type: 'PARTSNEW_P4P_SYS',
          types: 'PARTSNEW',
          path: '/saveCustomer/partsNew/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '延伸型新品',
          type: 'EXPANDNEW_P4P_SYS',
          types: 'EXPANDNEW',
          path: '/saveCustomer/expandNew/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '态度不满流失',
      icon: 'icon-taidubumanliushi',
      submenus: [
        {
          finishState: 0,
          name: '态度流失一览',
          type: 'ATTITUDELOSS_P4P_SYS',
          types: 'ATTITUDELOSS',
          className: 'primary',
          path: '/saveCustomer/attitudeLoss/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 2,
          name: '致歉信',
          type: 'ALETTER_P4P_SYS',
          types: 'ALETTER',
          path: '/saveCustomer/apologyLetter/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 2,
          name: '电话致歉',
          type: 'PHONEEXCUSE_P4P_SYS',
          types: 'PHONEEXCUSE',
          path: '/saveCustomer/phoneExcuse/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '邮件致歉',
          types: 'EMAILEXCUSE',
          type: 'EMAILEXCUSE_P4P_SYS',
          path: '/saveCustomer/emailExcuse/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '高端会员流失',
      icon: 'icon-gaoduanhuiyuanliushi',
      submenus: [
        {
          finishState: 2,
          name: '礼品+感谢信挽回',
          type: 'GIFTANDLETTER_P4P_SYS',
          types: 'GIFTANDLETTER',
          path: '/saveCustomer/giftAndLetter/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '自定义',
      icon: 'icon-zidingyi',
      submenus: [
        {
          finishState: 2,
          name: '聚划算挽回',
          type: 'JHSREDEEM_P4P_CUSTOM',
          types: 'JHSREDEEM',
          path: '/saveCustomer/juhuasuanSave/config',
          // path: '/saveCustomer',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 2,
          name: '礼品+感谢信挽回',
          type: 'GIFTANDLETTER_P4P_CUSTOM',
          types: 'GIFTANDLETTER',
          path: '/saveCustomer/giftAndLetter/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '淘抢购挽回',
          type: 'TQGREDEEM_P4P_CUSTOM',
          types: 'TQGREDEEM',
          path: '/saveCustomer/tqgRedeem/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '品牌团挽回',
          type: 'PPTREDEEM_P4P_CUSTOM',
          types: 'PPTREDEEM',
          path: '/saveCustomer/pptRedeem/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '其他大型活动',
          type: 'OUTHERBIGACTIV_P4P_CUSTOM',
          types: 'OUTHERBIGACTIV',
          path: '/saveCustomer/outherBigActiv/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 1,
          name: '挽回会员专享活动',
          type: 'SAVEACTIVITY_P4P_CUSTOM',
          types: 'SAVEACTIVITY',
          path: '/saveCustomer/saveGradeActivity/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 1,
          name: '同类型新品',
          type: 'SAMENER_P4P_CUSTOM',
          types: 'SAMENER',
          path: '/saveCustomer/sameNew/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 0,
          name: '季节性新品',
          type: 'SEASONALNEW_P4P_CUSTOM',
          types: 'SEASONALNEW',
          path: '/saveCustomer/seasonalNew/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '换代型新品',
          type: 'UPDATANEW_P4P_CUSTOM',
          types: 'UPDATANEW',
          path: '/saveCustomer/updataNew/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 0,
          name: '配件型新品',
          type: 'PARTSNEW_P4P_CUSTOM',
          types: 'PARTSNEW',
          path: '/saveCustomer/partsNew/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '延伸型新品',
          type: 'EXPANDNEW_P4P_CUSTOM',
          types: 'EXPANDNEW',
          path: '/saveCustomer/expandNew/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 0,
          name: '态度流失一览',
          type: 'ATTITUDELOSS_P4P_CUSTOM',
          types: 'ATTITUDELOSS',
          path: '/saveCustomer/attitudeLoss/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 2,
          name: '致歉信',
          type: 'ALETTER_P4P_CUSTOM',
          types: 'ALETTER',
          path: '/saveCustomer/apologyLetter/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 2,
          name: '电话致歉',
          type: 'PHONEEXCUSE_P4P_CUSTOM',
          types: 'PHONEEXCUSE',
          path: '/saveCustomer/phoneExcuse/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '邮件致歉',
          type: 'EMAILEXCUSE_P4P_CUSTOM',
          types: 'EMAILEXCUSE',
          path: '/saveCustomer/emailExcuse/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    }
  ],
  // 激活
  ActivateCustomer: [
    {
      name: '淘宝大促激活',
      icon: 'icon-taobaodacujihuo',
      submenus: [{
        finishState: 1,
        name: '聚划算',
        type: 'JHSACTIVATE_P4P_SYS',
        types: 'JHSACTIVATE',
        path: '/activateCustomer/juHuaSuan/config',
        //path: '/activateCustomer',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 0,
        name: '品牌团',
        type: 'PPTACTIVATE_P4P_SYS',
        types: 'PPTACTIVATE',
        path: '/activateCustomer/pptActivate/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 0,
        name: '淘抢购',
        type: 'TQGACTIVATE_P4P_SYS',
        types: 'TQGACTIVATE',
        path: '/activateCustomer/tqgActivate/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 0,
        name: '618',
        type: 'XFSACTIVATE_P4P_SYS',
        types: 'XFSACTIVATE',
        path: '/activateCustomer/xfsActivate/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 0,
        name: '双11',
        type: 'DOUBLEELEVEN_P4P_SYS',
        types: 'DOUBLEELEVEN',
        path: '/activateCustomer/doubleEleven/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 0,
        name: '双12',
        type: 'DOUBLETWELVE_P4P_SYS',
        types: 'DOUBLETWELVE',
        path: '/activateCustomer/doubleTwelve/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 0,
        name: '其他淘宝大促',
        type: 'OTHERACTIVATE_P4P_SYS',
        types: 'OTHERACTIVATE',
        path: '/activateCustomer/otherActivate/config',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    },
    {
      name: '店内大力度激活',
      icon: 'icon-dianneidaliducuxiao',
      submenus: [
        {
          finishState: 0,
          name: '沉睡会员专享大力度促销',
          type: 'SLEEPVIPACTIV_P4P_SYS',
          types: 'SLEEPVIPACTIV',
          path: '/activateCustomer/sleepVIPactiv/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    },
    {
      name: '自定义',
      icon: 'icon-zidingyi',
      submenus: [
        {
          finishState: 1,
          name: '聚划算',
          type: 'JHSACTIVATE_P4P_CUSTOM',
          types: 'JHSACTIVATE',
          path: '/activateCustomer/juHuaSuan/config',
          //path: '/activateCustomer',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '品牌团',
          type: 'PPTACTIVATE_P4P_CUSTOM',
          types: 'PPTACTIVATE',
          path: '/activateCustomer/pptActivate/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '淘抢购',
          type: 'TQGACTIVATE_P4P_CUSTOM',
          types: 'TQGACTIVATE',
          path: '/activateCustomer/tqgActivate/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '618',
          type: 'XFSACTIVATE_P4P_CUSTOM',
          types: 'XFSACTIVATE',
          path: '/activateCustomer/xfsActivate/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '双11',
          type: 'DOUBLEELEVEN_P4P_CUSTOM',
          types: 'DOUBLEELEVEN',
          path: '/activateCustomer/doubleEleven/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '双12',
          type: 'DOUBLETWELVE_P4P_CUSTOM',
          types: 'DOUBLETWELVE',
          path: '/activateCustomer/doubleTwelve/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '其他淘宝大促',
          type: 'OTHERACTIVATE_P4P_CUSTOM',
          types: 'OTHERACTIVATE',
          path: '/activateCustomer/otherActivate/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        },
        {
          finishState: 0,
          name: '沉睡会员专享大力度促销',
          type: 'SLEEPVIPACTIV_P4P_CUSTOM',
          types: 'SLEEPVIPACTIV',
          path: '/activateCustomer/sleepVIPactiv/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }
      ]
    }
  ],
  //数据
  dataChart: [
    {
      name: '全局数据',
      icon: 'icon-quanjushuju',
      submenus: [{
        finishState: 1,
        name: 'ROI',
        type: 'ROI_P4P_SYS',
        types: 'ROI',
        path: '/dataChart/globaldata',
        //path: '/activateCustomer',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 1,
        name: '复购人数',
        type: 'FUGOURENSHU_P4P_SYS',
        types: 'FUGOURENSHU',
        path: '/dataChart/globaldata',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 1,
        name: '复购金额',
        type: 'FUGOUJINE_P4P_SYS',
        types: 'FUGOUJINE',
        path: '/dataChart/globaldata',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 1,
        name: '复购客单价',
        type: 'FUGOUKEDANJIA_P4P_SYS',
        types: 'FUGOUKEDANJIA',
        path: '/dataChart/globaldata',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 1,
        name: '复购客件数',
        type: 'FUGOUKEJIANSHU_P4P_SYS',
        types: 'FUGOUKEJIANSHU',
        path: '/dataChart/globaldata',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 1,
        name: '复购客类数',
        type: 'FUGOUKELEISHU_P4P_SYS',
        types: 'FUGOUKELEISHU',
        path: '/dataChart/globaldata',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    },
    {
      name: '会员等级',
      icon: 'icon-huiyuandengji',
      submenus: [{
        finishState: 1,
        name: '汇总',
        type: 'VIP_LEVEL_ALL_P4P_SYS',
        path: '/dataChart/vipLevel',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 1,
        name: '人数',
        type: 'VIP_LEVEL_NUM_P4P_SYS',
        path: '/dataChart/vipLevel',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 1,
        name: '累计成交金额',
        type: 'VIP_LEVEL_MONEY_P4P_SYS',
        path: '/dataChart/vipLevel',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 1,
        name: '累计成交次数',
        type: 'VIP_LEVEL_DEAL_NUM_P4P_SYS',
        path: '/dataChart/vipLevel',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 1,
        name: '客单价',
        type: 'VIP_LEVEL_PER_MONEY_P4P_SYS',
        path: '/dataChart/vipLevel',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 1,
        name: '客件数',
        type: 'VIP_LEVEL_PER_NUM_P4P_SYS',
        path: '/dataChart/vipLevel',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }, {
        finishState: 1,
        name: '每人次客类数',
        type: 'VIP_LEVEL_PER_CATEGORY_P4P_SYS',
        path: '/dataChart/vipLevel',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    },
    {
      name: '分布相关',
      icon: 'icon-fenbuxiangguan',
      submenus: [{
        finishState: 0,
        name: '复购地域',
        type: 'REBUY_AREA_P4P_SYS',
        path: '/dataChart/distribution',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      },
      {
        finishState: 0,
        name: '复购24小时下单分布',
        type: 'REBUY_24H_ORDER_P4P_SYS',
        path: '/dataChart/distribution',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      },
      {
        finishState: 0,
        name: '复购24小时付款间隔分布',
        type: 'REBUY_24H_BUY_TIME_P4P_SYS',
        path: '/dataChart/distribution',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      },
      {
        finishState: 0,
        name: '复购订单周期性分布',
        type: 'REBUY_ORDER_CYCLE_P4P_SYS',
        path: '/dataChart/distribution',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    },
    {
      name: '密度图',
      icon: 'icon-midutu',
      submenus: [{
        finishState: 1,
        name: '客单价分布',
        type: 'PER_PAYMENT_P4P_SYS',
        path: '/densityChart/densityChart',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      },
      {
        finishState: 0,
        name: '复购时间',
        type: 'REBUY_TIME_P4P_SYS',
        path: '/densityChart/densityChart',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      },
      {
        finishState: 0,
        name: '回款周期',
        type: 'RECEIVED_PAYMENTS_CYCLE_P4P_SYS',
        path: '/densityChart/densityChart',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      },
      {
        finishState: 1,
        name: '复购周期',
        type: 'REBUY_CYCLE_P4P_SYS',
        path: '/densityChart/densityChart',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    },
    {
      name: '合并订单管理',
      icon: 'icon-dingdanguanli',
      submenus: [{
        finishState: 1,
        name: '合并订单管理',
        type: 'MERGE_ORDER_P4P_SYS',
        types: 'MERGE_ORDER',
        path: '/dataChart/mergeOrder',
        //path: '/activateCustomer',
        state: {
          name: '',
          params: {
            id: ''
          }
        }
      }]
    },
  ],
  // 所有
  allMarket: [{
    name: '流失防御',
    icon: 'icon-lossPrevention',
    isShow: false,
    mainData: [
      {
        name: '物流异常',
        icon: 'icon-wuliu',
        isShow: false,
        submenus: [{
          name: '发货延迟',
          type: 'DELIVERYDELAY_P4P_SYS',
          finishState: 2,
          types: 'DELIVERYDELAY',
          path: '/lossPrevention/delayDelivering/config',
          //path: '/lossPrevention',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '快递运送超时',
          type: 'EXPRESSOUT_P4P_SYS',
          types: 'EXPRESSOUT',
          finishState: 2,
          path: '/lossPrevention/expresSout/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '无流转记录',
          type: 'NOTRANSFERRECORD_P4P_SYS',
          types: 'NOTRANSFERRECORD',
          finishState: 2,
          path: '/lossPrevention/notransferRecord/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '流转异常时',
          type: 'TRANSFERREEOE_P4P_SYS',
          types: 'TRANSFERREEOE',
          finishState: 0,
          path: '/lossPrevention/transferReeor/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }]
      },
      {
        name: '体验不佳',
        icon: 'icon-tiyanbujia',
        isShow: false,
        submenus: [
          {
            name: '态度不满',
            type: 'DISPLEASURE_P4P_SYS',
            types: 'DISPLEASURE',
            finishState: 2,
            path: '/lossPrevention/badAttitude/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '假货怀疑',
            type: 'FAKESUSPECT_P4P_SYS',
            types: 'FAKESUSPECT',
            finishState: 2,
            path: '/lossPrevention/fakeSuspect/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '质量不满',
            type: 'DISQUALITY_P4P_SYS',
            types: 'DISQUALITY',
            finishState: 2,
            path: '/lossPrevention/disquality/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '欺诈行为',
            type: 'CHEATBEHAVIOR_P4P_SYS',
            types: 'CHEATBEHAVIOR',
            finishState: 2,
            path: '/lossPrevention/cheatBehavior/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '价格不满',
            type: 'DISPRICE_P4P_SYS',
            types: 'DISPRICE',
            finishState: 2,
            path: '/lossPrevention/disprice/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '承诺不兑现',
            type: 'PROMISENOCASH_P4P_SYS',
            types: 'PROMISENOCASH',
            finishState: 2,
            path: '/lossPrevention/promiseNocash/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '预期落差',
            type: 'EXPECTEDGAP_P4P_SYS',
            types: 'EXPECTEDGAP',
            finishState: 2,
            path: '/lossPrevention/expectedgap/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '物流问题',
            type: 'LOGISTICSPROBLEM_P4P_SYS',
            types: 'LOGISTICSPROBLEM',
            finishState: 2,
            path: '/lossPrevention/logisticsProblem/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },
      {
        name: '退货退款',
        icon: 'icon-tuihuotuikuan',
        isShow: false,
        submenus: [
          {
            name: '发货后未收货退款',
            type: 'NORECEIPTREFUND_P4P_SYS',
            types: 'NORECEIPTREFUND',
            finishState: 2,
            path: '/lossPrevention/refund/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '未发货退款',
            type: 'NOSENDREFUND_P4P_SYS',
            types: 'NOSENDREFUND',
            finishState: 0,
            path: '/lossPrevention/noSendRefund/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '退货退款',
            type: 'RETURNREFUND_P4P_SYS',
            types: 'RETURNREFUND',
            finishState: 2,
            path: '/lossPrevention/returnRefund/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      }],

  }, {
    icon: 'icon-aixin',
    name: '关怀',
    isShow: false,
    mainData: [
      {
        name: '拍下',
        icon: 'icon-paixia',
        isShow: false,
        submenus: [{
          name: '默认催付提醒',
          type: 'CREATEDREMIND_P4P_SYS',
          types: 'CREATEDREMIND',
          finishState: 2,
          path: '/care/payRemind/config',
          //path: '/care',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '大活动促销提醒',
          type: 'BIGEVENTREMIND_P4P_SYS',
          types: 'BIGEVENTREMIND',
          finishState: 0,
          path: '/care/bigEventRemind/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }]
      },
      {
        name: '付款',
        icon: 'icon-wuliu',
        isShow: false,
        submenus: [
          {
            name: '默认付款关怀',
            finishState: 2,
            type: 'PAYCARE_P4P_SYS',
            types: 'PAYCARE',
            path: '/care/payCare/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },
      {
        name: '发货',
        icon: 'icon-wuliu',
        isShow: false,
        submenus: [
          {
            name: '默认发货提醒',
            finishState: 2,
            type: 'DELIVERREMIND_P4P_SYS',
            types: 'DELIVERREMIND',
            path: '/care/deliverRemind/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },
      {
        name: '物流',
        icon: 'icon-wuliu',
        isShow: false,
        submenus: [
          {
            name: '到达所在城市提醒',
            type: 'SENDREMIND_P4P_SYS',
            types: 'SENDREMIND',
            finishState: 2,
            path: '/care/arriveMyCityRemind/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '开始派送提醒',
            finishState: 1,
            type: 'STARTSENDREMIND_P4P_SYS',
            types: 'STARTSENDREMIND',
            path: '/care/startSendRemind/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '签收提醒',
            finishState: 1,
            type: 'SIGNREMIND_P4P_SYS',
            types: 'SIGNREMIND',
            path: '/care/signRemind/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },
      {
        name: '确认',
        icon: 'icon-pingjia',
        isShow: false,
        submenus: [
          {
            name: '默认确认关怀',
            finishState: 2,
            type: 'AFFIRMCARE_P4P_SYS',
            types: 'AFFIRMCARE',
            path: '/care/affirmCare/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '会员卡领取提醒',
            finishState: 0,
            type: 'CLUBCARDREMIND_P4P_SYS',
            types: 'CLUBCARDREMIND',
            path: '/care/clubCardRemind/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },
      {
        name: '评价',
        icon: 'icon-pingjia',
        isShow: false,
        submenus: [
          {
            name: '初评关怀',
            type: 'COMMENTCARE_P4P_SYS',
            types: 'COMMENTCARE',
            finishState: 2,
            path: '/care/firstComment/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '初评提醒',
            finishState: 2,
            type: 'COMMENTREMIND_P4P_SYS',
            types: 'COMMENTREMIND',
            path: '/care/commentRemind/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '追评提醒',
            finishState: 2,
            type: 'ADDITIONALREMIND_P4P_SYS',
            types: 'ADDITIONALREMIND',
            path: '/care/additionalRemind/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '追评关怀',
            finishState: 0,
            type: 'ADDITIONALCARE_P4P_SYS',
            types: 'ADDITIONALCARE',
            path: '/care/additionalCare/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },
      {
        name: '售后',
        icon: 'icon-shouhou',
        isShow: false,
        submenus: [
          {
            name: '买家申请仅退款',
            type: 'REFUND_P4P_SYS',
            types: 'REFUND_',
            finishState: 2,
            path: '/care/onlyRefund/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '买家申请退货退款',
            finishState: 2,
            type: 'APPLYRETURNREFUND_P4P_SYS',
            types: 'APPLYRETURNREFUND',
            path: '/care/applyReturnRefund/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '商家拒绝仅退款申请',
            finishState: 2,
            type: 'REFUSEREFUND_P4P_SYS',
            types: 'REFUSEREFUND',
            path: '/care/refuseRefund/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '商家拒绝退货退款申请',
            finishState: 2,
            type: 'REFUSERETURNREFUND_P4P_SYS',
            types: 'REFUSERETURNREFUND',
            path: '/care/refuseReturnRefund/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '商家同意退货退款申请',
            finishState: 2,
            type: 'AGREERETURNREFUND_P4P_SYS',
            types: 'AGREERETURNREFUND',
            path: '/care/agreeReturnRefund/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '买家退货被签收提醒',
            finishState: 0,
            type: 'REFUNDSIGNREMIND_P4P_SYS',
            types: 'REFUNDSIGNREMIND',
            path: '/care/refundSignRemind/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            name: '退款成功提醒',
            finishState: 2,
            type: 'SUCCESSREFUND_P4P_SYS',
            types: 'SUCCESSREFUND',
            path: '/care/successRefund/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },
    ]
  },
  /*
  {
    icon: 'icon-firstBuy',
    name: '处女购',
    isShow: false,
    mainData: [
      {
        name: '新人礼',
        icon: 'icon-fugouyingxiao',
        isShow: false,
        submenus: [{
          name: '送优惠券',
          finishState: 0,
          type: 'GIVECOUPON_P4P_SYS',
          types: 'GIVECOUPON',
          path: '',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '第二次买就送',
          finishState: 0,
          type: 'SECONDGIVE_P4P_SYS',
          types: 'SECONDGIVE',
          path: '',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '新人专享折扣',
          finishState: 0,
          type: 'NEWERDISCOUNT_P4P_SYS',
          types: 'NEWERDISCOUNT',
          path: '',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '新人专享满减',
          finishState: 0,
          type: 'NEWERFULLCUT_P4P_SYS',
          types: 'NEWERFULLCUT',
          path: '',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '新人买A+?？元优惠买B',
          finishState: 0,
          type: 'NEWERBUYAANDOTHER_P4P_SYS',
          types: 'NEWERBUYAANDOTHER',
          path: '',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '新人A+B一起买优惠',
          finishState: 0,
          type: 'NEWERBUYAANDB_P4P_SYS',
          types: 'NEWERBUYAANDB',
          path: '',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '新人免邮+升级快递',
          finishState: 0,
          type: 'NEWERFREESHIP_P4P_SYS',
          types: 'NEWERFREESHIP',
          path: '',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }]
      }, {
        name: '复购营销',
        icon: 'icon-fugouyingxiao',
        isShow: false,
        submenus: [{
          name: '跟随潜需式营销',
          type: 'PON_P4P_SYS',
          types: 'PON',
          finishState: 2,
          path: '/firstBuy/pon/config',
          //path: '/firstBuy',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }]
      },
    ]
  }, {
    icon: 'icon-users',
    name: '维护',
    isShow: true,
    mainData: [
      {
        name: '关怀问候',
        icon: 'icon-guanhuaiwenhou',
        isShow: false,
        submenus: [
          {
            finishState: 2,
            name: '快消品关怀',
            type: 'FMGGCARE_P4P_SYS',
            types: 'FMGGCARE',
            path: '/maintenance/FMGGcare/config',
            //path: '/maintenance',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          },
          {
            finishState: 0,
            name: '非快消品关怀',
            type: 'NOFMGGCARE_P4P_SYS',
            types: 'NOFMGGCARE',
            path: '/maintenance/noFMGGcare/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          },
          {
            finishState: 2,
            name: '节假日问候',
            type: 'HOLIDAYCARE_P4P_SYS',
            types: 'HOLIDAYCARE',
            path: '/maintenance/holidayCare/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          },
          {
            finishState: 2,
            name: '节气问候',
            type: 'SOLARTERMCARE_P4P_SYS',
            types: 'SOLARTERMCARE',
            path: '/maintenance/solartermCare/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          },
          {
            finishState: 2,
            name: '恶劣天气预警关怀',
            type: 'BADWEATHER_P4P_SYS',
            types: 'BADWEATHER',
            path: '/maintenance/badWeather/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },
      {
        name: '复购营销',
        icon: 'icon-fugouyingxiao',
        isShow: true,
        submenus: [
          {
            name: '跟随潜需式营销',
            type: 'POTENTIAL_P4P_SYS',
            types: 'POTENTIAL',
            finishState: 2,
            path: '/maintenance/pon/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },
      {
        name: '礼品营销',
        icon: 'icon-lipinyingxiao',
        isShow: false,
        submenus: [
          {
            finishState: 1,
            name: '礼品营销',
            type: 'GIFTMARKET_P4P_SYS',
            types: 'GIFTMARKET',
            path: '/maintenance/giftMaket/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },
    ]
  }, {
    icon: 'icon-care',
    name: '挽回',
    isShow: false,
    mainData: [
      {
        name: '价格因素流失',
        icon: 'icon-jiageyinsuliushi',
        isShow: false,
        submenus: [
          {
            finishState: 2,
            name: '聚划算挽回',
            type: 'JHSREDEEM_P4P_SYS',
            types: 'JHSREDEEM',
            path: '/saveCustomer/juhuasuanSave/config',
            // path: '/saveCustomer',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            finishState: 0,
            name: '淘抢购挽回',
            type: 'TQGREDEEM_P4P_SYS',
            types: 'TQGREDEEM',
            path: '/saveCustomer/tqgRedeem/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            finishState: 0,
            name: '品牌团挽回',
            type: 'PPTREDEEM_P4P_SYS',
            types: 'PPTREDEEM',
            path: '/saveCustomer/pptRedeem/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            finishState: 0,
            name: '其他大型活动',
            type: 'OUTHERBIGACTIV_P4P_SYS',
            types: 'OUTHERBIGACTIV',
            path: '/saveCustomer/outherBigActiv/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          },
          {
            finishState: 1,
            name: '挽回会员专享活动',
            type: 'SAVEACTIVITY_P4P_SYS',
            types: 'SAVEACTIVITY',
            path: '/saveCustomer/saveGradeActivity/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },
      {
        name: '缺乏新品流失',
        icon: 'icon-taidubumanliushi',
        isShow: false,
        submenus: [
          {
            finishState: 1,
            name: '同类型新品',
            type: 'SAMENER_P4P_SYS',
            types: 'SAMENER',
            path: '/saveCustomer/sameNew/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          },
          {
            finishState: 0,
            name: '季节性新品',
            type: 'SEASONALNEW_P4P_SYS',
            types: 'SEASONALNEW',
            path: '/saveCustomer/seasonalNew/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            finishState: 0,
            name: '换代型新品',
            type: 'UPDATANEW_P4P_SYS',
            types: 'UPDATANEW',
            path: '/saveCustomer/updataNew/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          },
          {
            finishState: 0,
            name: '配件型新品',
            type: 'PARTSNEW_P4P_SYS',
            types: 'PARTSNEW',
            path: '/saveCustomer/partsNew/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            finishState: 0,
            name: '延伸型新品',
            type: 'EXPANDNEW_P4P_SYS',
            types: 'EXPANDNEW',
            path: '/saveCustomer/expandNew/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },
      {
        name: '态度不满流失',
        icon: 'icon-taidubumanliushi',
        isShow: false,
        submenus: [
          {
            finishState: 0,
            name: '态度流失一览',
            type: 'ATTITUDELOSS_P4P_SYS',
            types: 'ATTITUDELOSS',
            path: '/saveCustomer/attitudeLoss/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          },
          {
            finishState: 2,
            name: '致歉信',
            type: 'ALETTER_P4P_SYS',
            types: 'ALETTER',
            path: '/saveCustomer/apologyLetter/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            finishState: 2,
            name: '电话致歉',
            type: 'PHONEEXCUSE_P4P_SYS',
            types: 'PHONEEXCUSE',
            path: '/saveCustomer/phoneExcuse/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }, {
            finishState: 0,
            name: '邮件致歉',
            types: 'EMAILEXCUSE',
            type: 'EMAILEXCUSE_P4P_SYS',
            path: '/saveCustomer/emailExcuse/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },
      {
        name: '高端会员流失',
        icon: 'icon-gaoduanhuiyuanliushi',
        submenus: [
          {
            finishState: 2,
            name: '礼品+感谢信挽回',
            type: 'GIFTANDLETTER_P4P_SYS',
            types: 'GIFTANDLETTER',
            path: '/saveCustomer/giftAndLetter/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },

    ]
  }, {
    icon: 'icon-activateCustomer',
    name: '激活',
    isShow: false,
    mainData: [
      {
        name: '淘宝大促激活',
        icon: 'icon-taobaodacujihuo',
        isShow: false,
        submenus: [{
          finishState: 1,
          name: '聚划算',
          type: 'JHSACTIVATE_P4P_SYS',
          types: 'JHSACTIVATE',
          path: '/activateCustomer/juHuaSuan/config',
          //path: '/activateCustomer',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '品牌团',
          type: 'PPTACTIVATE_P4P_SYS',
          types: 'PPTACTIVATE',
          path: '/activateCustomer/pptActivate/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '淘抢购',
          type: 'TQGACTIVATE_P4P_SYS',
          types: 'TQGACTIVATE',
          path: '/activateCustomer/tqgActivate/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '618',
          type: 'XFSACTIVATE_P4P_SYS',
          types: 'XFSACTIVATE',
          path: '/activateCustomer/xfsActivate/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '双11',
          type: 'DOUBLEELEVEN_P4P_SYS',
          types: 'DOUBLEELEVEN',
          path: '/activateCustomer/doubleEleven/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '双12',
          type: 'DOUBLETWELVE_P4P_SYS',
          types: 'DOUBLETWELVE',
          path: '/activateCustomer/doubleTwelve/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          finishState: 0,
          name: '其他淘宝大促',
          type: 'OTHERACTIVATE_P4P_SYS',
          types: 'OTHERACTIVATE',
          path: '/activateCustomer/otherActivate/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }]
      },
      {
        name: '店内大力度激活',
        icon: 'icon-zidingyi',
        isShow: false,
        submenus: [
          {
            finishState: 0,
            name: '沉睡会员专享大力度促销',
            type: 'SLEEPVIPACTIV_P4P_SYS',
            types: 'SLEEPVIPACTIV',
            path: '/activateCustomer/sleepVIPactiv/config',
            state: {
              name: '',
              params: {
                id: ''
              }
            }
          }
        ]
      },
    ]
  },
  */
  {
    icon: 'icon-xiaoguofencheng',
    name: '效果分成',
    isShow: true,
    mainData: [
      {
        name: '日常场景',
        icon: 'icon-xiaoguofencheng',
        submenus: [{
          name: '即时营销',
          type: 'PAYED_P4P_SYS',
          types: 'PAYED',
          finishState: 2,
          icon: 'icon-jishiyingxiao',
          path: '/homepage/immediateMarketing/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }, {
          name: '跟随潜需式营销',
          type: 'POTENTIAL_P4P_SYS',
          types: 'POTENTIAL',
          finishState: 2,
          icon: 'icon-fugouyingxiao',
          path: '/homepage/pon/config',
          state: {
            name: '',
            params: {
              id: ''
            }
          }
        }]
      },
    ],


  }],
  /////////////////// 存储状态数据 /////////////////
  // 选项卡状态
  activeCode: {
    xse: 'xse',
    kdj: 'kdj',
    fgzq: 'fgzq',
    fwf: 'fwf',
    jinriyilan: 'jinriyilan',
    chaping: 'chaping',
    zhuanhua: 'zhuanhua',
    fahuo: 'fahuo',
    huikuan: 'huikuan',
    config: 'config',
    resultData: 'resultData',
    resultDetail: 'resultDetail',
    pushRecord: 'pushRecord',
    unsubscribeRecord: 'unsubscribeRecord',
    qianniuTask: 'qianniuTask',
    immConfig: 'immConfig',
    thisGroupVIP: 'thisGroupVIP',
    immResultData: 'immResultData',
    immResultDetail: 'immResultDetail',
    immPushRecord: 'immPushRecord',
    defenseConfig: 'defenseConfig',
    defenseResultData: 'defenseResultData',
    defenseRresultDetail: 'defenseRresultDetail',
    defensePushRecord: 'defensePushRecord',
  },
  // 菜单状态
  activeMenuCodes: {
    home: '/homepage',
    lossPrevention: '/lossPrevention',
    care: '/care',
    firstBuy: '/firstBuy',
    maintenance: '/maintenance',
    saveCustomer: '/saveCustomer',
    activateCustomer: '/activateCustomer',
    dataChart: '/dataChart',
    imm: '/imm/immediateMarketing/config',
    pon: '/pon/config',
    member: '/memberManage/home',
    tasklist: '/tasklist/home',
    defense: '/defense/config'
  },
  // 弹出框状态
  openModalCodes: {
    msgConfig: 'msgConfig',
    systemConfig: 'systemConfig',
    importModal: 'importModal',
    messageTemplate: 'messageTemplate',
    settingsCenter: 'settingsCenter',
    testSendMessage: 'testSendMessage',
    chooseGoods: 'chooseGoods',
    chooseGoodsLevel: 'chooseGoodsLevel',
    editMarketingName: 'editMarketingName',
    marketSaveAs: 'saveAs',
    memberDetails: 'memberDetails',
    greyList: 'greyList',
    blackList: 'blackList',
    marketGroup: 'marketGroup',
    createMarketGroup: 'createMarketGroup',
    maergeSendMessage: 'maergeSendMessage',
    quickSendMessage: 'quickSendMessage',
    buyMarketingJob: 'buyMarketingJob',
    payOrder: 'payOrder'
  },
  // 操作结果提示信息
  callMsg: {
    success_save: '保存成功',
    success_add: '添加成功',
    success_create: '创建成功',
    success_del: '删除成功',
    success_modify: '修改成功',
    fail_save: '保存失败',
    fail_add: '添加失败',
    fail_create: '创建失败',
    fail_del: '删除失败',
    fail_modify: '修改失败'
  },

  ////////////// 营销任务常量 ////////////////
  marketingResultTab: [
    { label: '配置', name: 'config' },
    { label: '效果数据', name: 'resultData' },
    { label: '成果详单', name: 'resultDetail' },
    { label: '推送记录', name: 'pushRecord' },
    { label: '退订记录', name: 'unsubscribeRecord' },
    { label: '千牛任务', name: 'qianniuTask' }
  ],
  marketingState: {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED'
  },
  // 头部重要信息提醒路由
  headerMessageRoad: {
    DISPLEASURE: '/lossPrevention/badAttitude/config',//态度不满
    FAKESUSPECT: '/lossPrevention/fakeSuspect/config',//假货怀疑
    DISQUALITY: '/lossPrevention/disquality/config',//质量不满
    CHEATBEHAVIOR: '/lossPrevention/cheatBehavior/config',//欺诈行为
    DISPRICE: '/lossPrevention/disprice/config',//价格不满
    PROMISENOCASH: '/lossPrevention/promiseNocash/config',//承诺不兑现
    EXPECTEDGAP: '/lossPrevention/expectedgap/config',//预期落差
    LOGISTICSPROBLEM: '/lossPrevention/logisticsProblem/config',//物流问题
    EXPRESSOUT: '/lossPrevention/expresSout/config',//快递运送超时
    NOTRANSFERRECORD: '/lossPrevention/notransferRecord/config',//无流转记录
    TRANSFERREEOE: '/lossPrevention/transferReeor/config',//流转异常时
    DELIVERYDELAY: '/lossPrevention/delayDelivering/config',  // 发货延迟
    NOSENDREFUND: '/lossPrevention/noSendRefund/config',//未发货退款
    RETURNREFUND: '/lossPrevention/returnRefund/config',//退货退款
    NORECEIPTREFUND: '/lossPrevention/refund/config', //发货未到货退款
    CREATEDREMIND: '/care/payRemind/config',//默认催付提醒
    BIGEVENTREMIND: '/care/bigEventRemind/config',//大活动促销提醒
    PAYCARE: '/care/payCare/config',//默认付款关怀
    DELIVERREMIND: '/care/deliverRemind/config',//默认发货提醒
    SENDREMIND: '/care/arriveMyCityRemind/config',//到达所在城市提醒_系统
    SIGNREMIND: '/care/signRemind/config',//签收提醒
    STARTSENDREMIND: '/care/startSendRemind/config',//开始派送提醒
    AFFIRMCARE: '/care/affirmCare/config',//默认确认关怀
    CLUBCARDREMIND: '/care/clubCardRemind/config',//会员卡领取提醒
    COMMENTREMIND: '/care/commentRemind/config',//初评提醒
    ADDITIONALREMIND: '/care/additionalRemind/config',//追评提醒
    ADDITIONALCARE: '/care/additionalCare/config',//追评关怀
    COMMENTCARE: '/care/firstComment/config',//初评关怀
    APPLYRETURNREFUND: '/care/applyReturnRefund/config',//买家申请退货退款
    REFUSEREFUND: '/care/refuseRefund/config',//商家拒绝仅退款申请
    REFUSERETURNREFUND: '/care/refuseReturnRefund/config',//商家拒绝退货退款申请
    AGREERETURNREFUND: '/care/agreeReturnRefund/config',//商家同意退货退款申请
    REFUNDSIGNREMIND: '/care/refundSignRemind/config',//买家退货被签收提醒
    SUCCESSREFUND: '/care/successRefund/config',//退款成功提醒
    REFUND: '/care/onlyRefund/config',//买家申请仅退款_系统
    IMPORT: ['importModal'], // 导入
    EDITGOODS: ['systemConfig', 'projectSetting'] //宝贝短名编辑
  },
  // 营销模板类型对应的父级菜单
  marketTypeParent: {
    PAYED_P4P_SYS: '即时营销',          // 拍下_系统
    PAYED_P4P_CUSTOM: '自定义',         // 拍下_自定义
    POTENTIAL_P4P_SYS: '复购营销',      // 跟随_系统
    POTENTIAL_P4P_CUSTOM: '自定义',     // 跟随_自定义
    DELIVERYDELAY_P4P_SYS: '物流异常',  // 发货延迟_系统
    DELIVERYDELAY_P4P_CUSTOM: '自定义',  // 发货延迟_自定义
    NORECEIPTREFUND_P4P_SYS: '退货退款', //发货未到货退款_系统
    NORECEIPTREFUND_P4P_CUSTOM: '自定义', //发货后未收货退款_自定义
    REFUND_P4P_SYS: '售后',//买家申请仅退款_系统
    REFUND_P4P_CUSTOM: '自定义', //买家申请仅退款_自定义
    SENDREMIND_P4P_SYS: '物流',//到达所在城市提醒_系统
    SENDREMIND_P4P_CUSTOM: '自定义', //到达所在城市提醒_自定义
    DISPLEASURE_P4P_SYS: '体验不佳',//态度不满_系统
    DISPLEASURE_P4P_CUSTOM: '自定义',//态度不满_自定义
    CREATEDREMIND_P4P_SYS: '拍下',//默认催付提醒_系统
    CREATEDREMIND_P4P_CUSTOM: '自定义',//默认催付提醒_自定义
    COMMENTCARE_P4P_SYS: '评价',//初评关怀_系统
    COMMENTCARE_P4P_CUSTOM: '自定义',//初评关怀_自定义
    FMGGCARE_P4P_SYS: '关怀问候',// 快消品关怀_系统
    FMGGCARE_P4P_CUSTOM: '自定义',// 快消品关怀_自定义
    HOLIDAYCARE_P4P_SYS: '关怀问候',// 节假日_系统
    HOLIDAYCARE_P4P_CUSTOM: '自定义',//节假日_自定义
    PON_P4P_SYS: '复购营销',//跟随_系统（处女购）
    PON_P4P_CUSTOM: '自定义',//跟随_自定义（处女购）
    SOLARTERMCARE_P4P_SYS: '关怀问候',//节气_系统
    SOLARTERMCARE_P4P_CUSTOM: '自定义',//节气_自定义
    BADWEATHER_P4P_SYS: '关怀问候', // 恶劣天气_sys
    BADWEATHER_P4P_CUSTOM: '自定义',
    GIFTMARKET_P4P_SYS: '礼品营销',//礼品营销_系统
    GIFTMARKET_P4P_CUSTOM: '自定义',
    JHSREDEEM_P4P_SYS: '价格因素流失',//聚划算挽回
    JHSREDEEM_P4P_CUSTOM: '自定义',
    SAVEACTIVITY_P4P_SYS: '价格因素流失',//挽回会员专享活动
    SAVEACTIVITY_P4P_CUSTOM: '自定义',
    SAMENER_P4P_SYS: '缺乏新品流失',//同类型新品
    SAMENER_P4P_CUSTOM: '自定义',
    ALETTER_P4P_SYS: '态度不满流失',//致歉信
    ALETTER_P4P_CUSTOM: '自定义',
    JHSACTIVATE_P4P_SYS: '淘宝大促激活',//聚划算
    JHSACTIVATE_P4P_CUSTOM: '自定义',
    FAKESUSPECT_P4P_SYS: '体验不佳',//假货怀疑
    FAKESUSPECT_P4P_CUSTOM: '自定义',
    DISQUALITY_P4P_SYS: '体验不佳',//质量不满
    DISQUALITY_P4P_CUSTOM: '自定义',
    CHEATBEHAVIOR_P4P_SYS: '体验不佳',//欺诈行为
    CHEATBEHAVIOR_P4P_CUSTOM: '自定义',
    DISPRICE_P4P_SYS: '体验不佳',//价格不满
    DISPRICE_P4P_CUSTOM: '自定义',
    PROMISENOCASH_P4P_SYS: '体验不佳',//承诺不兑现
    PROMISENOCASH_P4P_CUSTOM: '自定义',
    EXPECTEDGAP_P4P_SYS: '体验不佳',//预期落差
    EXPECTEDGAP_P4P_CUSTOM: '自定义',
    LOGISTICSPROBLEM_P4P_SYS: '体验不佳',//物流问题
    LOGISTICSPROBLEM_P4P_CUSTOM: '自定义',
    PHONEEXCUSE_P4P_SYS: '态度不满流失',//电话致歉
    PHONEEXCUSE_P4P_CUSTOM: '自定义',
    EMAILEXCUSE_P4P_SYS: '态度不满流失',//邮件致歉
    EMAILEXCUSE_P4P_CUSTOM: '自定义',
    GIFTANDLETTER_P4P_SYS: '高端会员流失',//礼品+感谢信
    GIFTANDLETTER_P4P_CUSTOM: '自定义',
    EXPRESSOUT_P4P_SYS: '物流异常',//快递运送超时
    EXPRESSOUT_P4P_CUSTOM: '自定义',
    NOSENDREFUND_P4P_SYS: '退货退款',//未发货退款
    NOSENDREFUND_P4P_CUSTOM: '自定义',
    RETURNREFUND_P4P_SYS: '退货退款',//退货退款
    RETURNREFUND_P4P_CUSTOM: '自定义',
    NOTRANSFERRECORD_P4P_SYS: '物流异常',//无流转记录
    NOTRANSFERRECORD_P4P_CUSTOM: '自定义',
    TRANSFERREEOE_P4P_SYS: '物流异常',//流转异常时
    TRANSFERREEOE_P4P_CUSTOM: '自定义',
    APPLYRETURNREFUND_P4P_SYS: '售后',//买家申请退货退款
    APPLYRETURNREFUND_P4P_CUSTOM: '自定义',
    REFUSEREFUND_P4P_SYS: '售后',//商家拒绝仅退款申请
    REFUSEREFUND_P4P_CUSTOM: '自定义',
    REFUSERETURNREFUND_P4P_SYS: '售后',//商家拒绝退货退款申请
    REFUSERETURNREFUND_P4P_CUSTOM: '自定义',
    AGREERETURNREFUND_P4P_SYS: '售后',//商家同意退货退款申请
    AGREERETURNREFUND_P4P_CUSTOM: '自定义',
    REFUNDSIGNREMIND_P4P_SYS: '售后',//买家退货被签收提醒
    REFUNDSIGNREMIND_P4P_CUSTOM: '自定义',
    SUCCESSREFUND_P4P_SYS: '售后',//退款成功提醒
    SUCCESSREFUND_P4P_CUSTOM: '自定义',
    SIGNREMIND_P4P_SYS: '物流',//签收提醒
    SIGNREMIND_P4P_CUSTOM: '自定义',
    STARTSENDREMIND_P4P_SYS: '物流',//开始派送提醒
    STARTSENDREMIND_P4P_CUSTOM: '自定义',
    BIGEVENTREMIND_P4P_SYS: '拍下',//大活动促销提醒
    BIGEVENTREMIND_P4P_CUSTOM: '自定义',
    PAYCARE_P4P_SYS: '付款',//默认付款关怀
    PAYCARE_P4P_CUSTOM: '自定义',
    DELIVERREMIND_P4P_SYS: '发货',//默认发货提醒
    DELIVERREMIND_P4P_CUSTOM: '自定义',
    AFFIRMCARE_P4P_SYS: '确认',//默认确认关怀
    AFFIRMCARE_P4P_CUSTOM: '自定义',
    SEASONALNEW_P4P_SYS: '缺乏新品流失',//季节性新品挽回
    SEASONALNEW_P4P_CUSTOM: '自定义',
    UPDATANEW_P4P_SYS: '缺乏新品流失',//换代型新品
    UPDATANEW_P4P_CUSTOM: '自定义',
    PARTSNEW_P4P_SYS: '缺乏新品流失',//配件型新品
    PARTSNEW_P4P_CUSTOM: '自定义',
    EXPANDNEW_P4P_SYS: '缺乏新品流失',//延伸型新品
    EXPANDNEW_P4P_CUSTOM: '自定义',
    SLEEPVIPACTIV_P4P_SYS: '店内大力度激活',//沉睡会员专享大力度促销
    SLEEPVIPACTIV_P4P_CUSTOM: '自定义',
    NOFMGGCARE_P4P_SYS: '关怀问候',//非快消品关怀
    NOFMGGCARE_P4P_CUSTOM: '自定义',
    CLUBCARDREMIND_P4P_SYS: '确认',//会员卡领取提醒
    CLUBCARDREMIND_P4P_CUSTOM: '自定义',
    COMMENTREMIND_P4P_SYS: '评价',//初评提醒
    COMMENTREMIND_P4P_CUSTOM: '自定义',
    ADDITIONALREMIND_P4P_SYS: '评价',//追评提醒
    ADDITIONALREMIND_P4P_CUSTOM: '自定义',
    ADDITIONALCARE_P4P_SYS: '评价',//追评关怀
    ADDITIONALCARE_P4P_CUSTOM: '自定义',
    PPTACTIVATE_P4P_SYS: '淘宝大促激活',//品牌团
    PPTACTIVATE_P4P_CUSTOM: '自定义',
    PPTREDEEM_P4P_SYS: '价格因素流失',//品牌团挽回
    PPTREDEEM_P4P_CUSTOM: '自定义',
    TQGREDEEM_P4P_SYS: '价格因素流失',//淘抢购挽回
    TQGREDEEM_P4P_CUSTOM: '自定义',
    OUTHERBIGACTIV_P4P_SYS: '价格因素流失',//其他大型活动
    OUTHERBIGACTIV_P4P_CUSTOM: '自定义',
    TQGACTIVATE_P4P_SYS: '淘宝大促激活',//淘抢购(激活)
    TQGACTIVATE_P4P_CUSTOM: '自定义',
    XFSACTIVATE_P4P_SYS: '淘宝大促激活',//618(激活)
    XFSACTIVATE_P4P_CUSTOM: '自定义',
    DOUBLEELEVEN_P4P_SYS: '淘宝大促激活',//双11(激活)
    DOUBLEELEVEN_P4P_CUSTOM: '自定义',
    DOUBLETWELVE_P4P_SYS: '淘宝大促激活',//双12(激活)
    DOUBLETWELVE_P4P_CUSTOM: '自定义',
    OTHERACTIVATE_P4P_SYS: '淘宝大促激活',//其他淘宝大促(激活)
    OTHERACTIVATE_P4P_CUSTOM: '自定义',
    PAYMENT_P4P_SYS: '即时营销',//付款即时营销
    PAYMENT_P4P_CUSTOM: '自定义',
    ORDERCLOSED_P4P_SYS: '即时营销',//订单关闭即时营销
    ORDERCLOSED_P4P_CUSTOM: '自定义',
    ALLDOUBLE11_P4P_SYS: '双11/12阶梯营销',//双11全量型
    ALLDOUBLE11_P4P_CUSTOM: '自定义',
    ADDDOUBLE11INSTANT_P4P_SYS: '双11/12阶梯营销',//双11当天增量即时型
    ADDDOUBLE11INSTANT_P4P_CUSTOM: '自定义',
    ADDDOUBLE11PRESET_P4P_SYS: '双11/12阶梯营销',//双11当天增量预设型
    ADDDOUBLE11PRESET_P4P_CUSTOM: '自定义',
    ALLBEFOREDOUBLE11_P4P_SYS: '双11/12阶梯营销',//双11全量前置型
    ALLBEFOREDOUBLE11_P4P_CUSTOM: '自定义',
    EFFICTIVEDOUBLE11_P4P_SYS: '双11/12阶梯营销',//双11效率型
    EFFICTIVEDOUBLE11_P4P_CUSTOM: '自定义',
    COMPROMISEEDOUBLE11_P4P_SYS: '双11/12阶梯营销',//双11折中型
    COMPROMISEEDOUBLE11_P4P_CUSTOM: '自定义',
    FOCUSDOUBLE11_P4P_SYS: '双11/12阶梯营销',//双11专注型
    FOCUSDOUBLE11_P4P_CUSTOM: '自定义',
    CUSTOMIZEDDOUBLE11_P4P_SYS: '双11/12阶梯营销',//双11定制型
    CUSTOMIZEDDOUBLE11_P4P_CUSTOM: '自定义',
    ALLDOUBLE12_P4P_SYS: '双11/12阶梯营销',//双12全量型
    ALLDOUBLE12_P4P_CUSTOM: '自定义',
    ADDDOUBLE12INSTANT_P4P_SYS: '双11/12阶梯营销',//双12当天增量即时型
    ADDDOUBLE12INSTANT_P4P_CUSTOM: '自定义',
    ADDDOUBLE12PRESET_P4P_SYS: '双11/12阶梯营销',//双12当天增量预设型
    ADDDOUBLE12PRESET_P4P_CUSTOM: '自定义',
    ALLBEFOREDOUBLE12_P4P_SYS: '双11/12阶梯营销',//双12全量前倾型
    ALLBEFOREDOUBLE12_P4P_CUSTOM: '自定义',
    EFFICTIVEDOUBLE12_P4P_SYS: '双11/12阶梯营销',//双12效率型
    EFFICTIVEDOUBLE12_P4P_CUSTOM: '自定义',
    COMPROMISEEDOUBLE12_P4P_SYS: '双11/12阶梯营销',//双12折中型
    COMPROMISEEDOUBLE12_P4P_CUSTOM: '自定义',
    FOCUSDOUBLE12_P4P_SYS: '双11/12阶梯营销',//双12专注型
    FOCUSDOUBLE12_P4P_CUSTOM: '自定义',
    CUSTOMIZEDDOUBLE12_P4P_SYS: '双11/12阶梯营销',//双12定制型
    CUSTOMIZEDDOUBLE12_P4P_CUSTOM: '自定义',
  },
  // 营销模板类型
  marketTemplateType: {
    PAYED_P4P_SYS: 'PAYED_P4P_SYS',          // 拍下_系统
    PAYED_P4P_CUSTOM: 'PAYED_P4P_CUSTOM',         // 拍下_自定义
    POTENTIAL_P4P_SYS: 'POTENTIAL_P4P_SYS',      // 跟随_系统
    POTENTIAL_P4P_CUSTOM: 'POTENTIAL_P4P_CUSTOM',     // 跟随_自定义
    DELIVERYDELAY_P4P_SYS: 'DELIVERYDELAY_P4P_SYS',  // 发货延迟_系统
    DELIVERYDELAY_P4P_CUSTOM: 'DELIVERYDELAY_P4P_CUSTOM',  // 发货延迟_自定义
    NORECEIPTREFUND_P4P_SYS: 'NORECEIPTREFUND_P4P_SYS',//发货未到货退款_系统
    NORECEIPTREFUND_P4P_CUSTOM: 'NORECEIPTREFUND_P4P_CUSTOM',//发货后未收货退款_自定义
    REFUND_P4P_SYS: 'REFUND_P4P_SYS',//买家申请仅退款_系统
    REFUND_P4P_CUSTOM: 'REFUND_P4P_CUSTOM', //买家申请仅退款_自定义
    SENDREMIND_P4P_SYS: 'SENDREMIND_P4P_SYS',//到达所在城市提醒_系统
    SENDREMIND_P4P_CUSTOM: 'SENDREMIND_P4P_CUSTOM', //到达所在城市提醒_自定义
    DISPLEASURE_P4P_SYS: 'DISPLEASURE_P4P_SYS',//态度不满_系统
    DISPLEASURE_P4P_CUSTOM: 'DISPLEASURE_P4P_CUSTOM',//态度不满_自定义
    CREATEDREMIND_P4P_SYS: 'CREATEDREMIND_P4P_SYS',//默认催付提醒_系统
    CREATEDREMIND_P4P_CUSTOM: 'CREATEDREMIND_P4P_CUSTOM',//默认催付提醒_自定义
    COMMENTCARE_P4P_SYS: 'COMMENTCARE_P4P_SYS',//初评关怀_系统
    COMMENTCARE_P4P_CUSTOM: 'COMMENTCARE_P4P_CUSTOM',//初评关怀_自定义
    FMGGCARE_P4P_SYS: 'FMGGCARE_P4P_SYS',// 快消品关怀_系统
    FMGGCARE_P4P_CUSTOM: 'FMGGCARE_P4P_CUSTOM',// 快消品关怀_自定义
    HOLIDAYCARE_P4P_SYS: 'HOLIDAYCARE_P4P_SYS',// 节假日_系统
    HOLIDAYCARE_P4P_CUSTOM: 'HOLIDAYCARE_P4P_CUSTOM',//节假日_自定义
    PON_P4P_SYS: 'PON_P4P_SYS',//跟随_系统（处女购）
    PON_P4P_CUSTOM: 'PON_P4P_CUSTOM',//跟随_自定义（处女购）
    SOLARTERMCARE_P4P_SYS: 'SOLARTERMCARE_P4P_SYS',//节气_系统
    SOLARTERMCARE_P4P_CUSTOM: 'SOLARTERMCARE_P4P_CUSTOM',//节气_自定义
    BADWEATHER_P4P_SYS: 'BADWEATHER_P4P_SYS', // 恶劣天气_sys
    BADWEATHER_P4P_CUSTOM: 'BADWEATHER_P4P_CUSTOM',
    GIFTMARKET_P4P_SYS: 'GIFTMARKET_P4P_SYS',//礼品营销_系统
    GIFTMARKET_P4P_CUSTOM: 'GIFTMARKET_P4P_CUSTOM',
    JHSREDEEM_P4P_SYS: 'JHSREDEEM_P4P_SYS',//聚划算挽回
    JHSREDEEM_P4P_CUSTOM: 'JHSREDEEM_P4P_CUSTOM',
    SAVEACTIVITY_P4P_SYS: 'SAVEACTIVITY_P4P_SYS',//挽回会员专享活动
    SAVEACTIVITY_P4P_CUSTOM: 'SAVEACTIVITY_P4P_CUSTOM',
    SAMENER_P4P_SYS: 'SAMENER_P4P_SYS',//同类型新品
    SAMENER_P4P_CUSTOM: 'SAMENER_P4P_CUSTOM',
    ALETTER_P4P_SYS: 'ALETTER_P4P_SYS',//致歉信
    ALETTER_P4P_CUSTOM: 'ALETTER_P4P_CUSTOM',
    JHSACTIVATE_P4P_SYS: 'JHSACTIVATE_P4P_SYS',//聚划算
    JHSACTIVATE_P4P_CUSTOM: 'JHSACTIVATE_P4P_CUSTOM',
    FAKESUSPECT_P4P_SYS: 'FAKESUSPECT_P4P_SYS',//假货怀疑
    FAKESUSPECT_P4P_CUSTOM: 'FAKESUSPECT_P4P_CUSTOM',
    DISQUALITY_P4P_SYS: 'DISQUALITY_P4P_SYS',//质量不满
    DISQUALITY_P4P_CUSTOM: 'DISQUALITY_P4P_CUSTOM',
    CHEATBEHAVIOR_P4P_SYS: 'CHEATBEHAVIOR_P4P_SYS',//欺诈行为
    CHEATBEHAVIOR_P4P_CUSTOM: 'CHEATBEHAVIOR_P4P_CUSTOM',
    DISPRICE_P4P_SYS: 'DISPRICE_P4P_SYS',//价格不满
    DISPRICE_P4P_CUSTOM: 'DISPRICE_P4P_CUSTOM',
    PROMISENOCASH_P4P_SYS: 'PROMISENOCASH_P4P_SYS',//承诺不兑现
    PROMISENOCASH_P4P_CUSTOM: 'PROMISENOCASH_P4P_CUSTOM',
    EXPECTEDGAP_P4P_SYS: 'EXPECTEDGAP_P4P_SYS',//预期落差
    EXPECTEDGAP_P4P_CUSTOM: 'EXPECTEDGAP_P4P_CUSTOM',
    LOGISTICSPROBLEM_P4P_SYS: 'LOGISTICSPROBLEM_P4P_SYS',//物流问题
    LOGISTICSPROBLEM_P4P_CUSTOM: 'LOGISTICSPROBLEM_P4P_CUSTOM',
    PHONEEXCUSE_P4P_SYS: 'PHONEEXCUSE_P4P_SYS',//电话致歉
    PHONEEXCUSE_P4P_CUSTOM: 'PHONEEXCUSE_P4P_CUSTOM',
    GIFTANDLETTER_P4P_SYS: 'GIFTANDLETTER_P4P_SYS',//礼品+感谢信
    GIFTANDLETTER_P4P_CUSTOM: 'GIFTANDLETTER_P4P_CUSTOM',
    EMAILEXCUSE_P4P_SYS: 'EMAILEXCUSE_P4P_SYS',//邮件致歉
    EMAILEXCUSE_P4P_CUSTOM: 'EMAILEXCUSE_P4P_CUSTOM',
    EXPRESSOUT_P4P_SYS: 'EXPRESSOUT_P4P_SYS',//快递运送超时
    EXPRESSOUT_P4P_CUSTOM: 'EXPRESSOUT_P4P_CUSTOM',
    NOSENDREFUND_P4P_SYS: 'NOSENDREFUND_P4P_SYS',//未发货退款
    NOSENDREFUND_P4P_CUSTOM: 'NOSENDREFUND_P4P_CUSTOM',
    RETURNREFUND_P4P_SYS: 'RETURNREFUND_P4P_SYS',//退货退款
    RETURNREFUND_P4P_CUSTOM: 'RETURNREFUND_P4P_CUSTOM',
    NOTRANSFERRECORD_P4P_SYS: 'NOTRANSFERRECORD_P4P_SYS',//无流转记录
    NOTRANSFERRECORD_P4P_CUSTOM: 'NOTRANSFERRECORD_P4P_CUSTOM',
    TRANSFERREEOE_P4P_SYS: 'TRANSFERREEOE_P4P_SYS',//流转异常时
    TRANSFERREEOE_P4P_CUSTOM: 'TRANSFERREEOE_P4P_CUSTOM',
    APPLYRETURNREFUND_P4P_SYS: 'APPLYRETURNREFUND_P4P_SYS',//买家申请退货退款
    APPLYRETURNREFUND_P4P_CUSTOM: 'APPLYRETURNREFUND_P4P_CUSTOM',
    REFUSEREFUND_P4P_SYS: 'REFUSEREFUND_P4P_SYS',//商家拒绝仅退款申请
    REFUSEREFUND_P4P_CUSTOM: 'REFUSEREFUND_P4P_CUSTOM',
    REFUSERETURNREFUND_P4P_SYS: 'REFUSERETURNREFUND_P4P_SYS',//商家拒绝退货退款申请
    REFUSERETURNREFUND_P4P_CUSTOM: 'REFUSERETURNREFUND_P4P_CUSTOM',
    AGREERETURNREFUND_P4P_SYS: 'AGREERETURNREFUND_P4P_SYS',//商家同意退货退款申请
    AGREERETURNREFUND_P4P_CUSTOM: 'AGREERETURNREFUND_P4P_CUSTOM',
    REFUNDSIGNREMIND_P4P_SYS: 'REFUNDSIGNREMIND_P4P_SYS',//买家退货被签收提醒
    REFUNDSIGNREMIND_P4P_CUSTOM: 'REFUNDSIGNREMIND_P4P_CUSTOM',
    SUCCESSREFUND_P4P_SYS: 'SUCCESSREFUND_P4P_SYS',//退款成功提醒
    SUCCESSREFUND_P4P_CUSTOM: 'SUCCESSREFUND_P4P_CUSTOM',
    SIGNREMIND_P4P_SYS: 'SIGNREMIND_P4P_SYS',//签收提醒
    SIGNREMIND_P4P_CUSTOM: 'SIGNREMIND_P4P_CUSTOM',
    STARTSENDREMIND_P4P_SYS: 'STARTSENDREMIND_P4P_SYS',//开始派送提醒
    STARTSENDREMIND_P4P_CUSTOM: 'STARTSENDREMIND_P4P_CUSTOM',
    BIGEVENTREMIND_P4P_SYS: 'BIGEVENTREMIND_P4P_SYS',//大活动促销提醒
    BIGEVENTREMIND_P4P_CUSTOM: 'BIGEVENTREMIND_P4P_CUSTOM',
    PAYCARE_P4P_SYS: 'PAYCARE_P4P_SYS',//默认付款关怀
    PAYCARE_P4P_CUSTOM: 'PAYCARE_P4P_CUSTOM',
    DELIVERREMIND_P4P_SYS: 'DELIVERREMIND_P4P_SYS',//默认发货提醒
    DELIVERREMIND_P4P_CUSTOM: 'DELIVERREMIND_P4P_CUSTOM',
    AFFIRMCARE_P4P_SYS: 'AFFIRMCARE_P4P_SYS',//默认确认关怀
    AFFIRMCARE_P4P_CUSTOM: 'AFFIRMCARE_P4P_CUSTOM',
    SEASONALNEW_P4P_SYS: 'SEASONALNEW_P4P_SYS',//季节性新品挽回
    SEASONALNEW_P4P_CUSTOM: 'SEASONALNEW_P4P_CUSTOM',
    UPDATANEW_P4P_SYS: 'UPDATANEW_P4P_SYS',//换代型新品
    UPDATANEW_P4P_CUSTOM: 'UPDATANEW_P4P_CUSTOM',
    PARTSNEW_P4P_SYS: 'PARTSNEW_P4P_SYS',//配件型新品
    PARTSNEW_P4P_CUSTOM: 'PARTSNEW_P4P_CUSTOM',
    EXPANDNEW_P4P_SYS: 'EXPANDNEW_P4P_SYS',//延伸型新品
    EXPANDNEW_P4P_CUSTOM: 'EXPANDNEW_P4P_CUSTOM',
    SLEEPVIPACTIV_P4P_SYS: 'SLEEPVIPACTIV_P4P_SYS',//沉睡会员专享大力度促销
    SLEEPVIPACTIV_P4P_CUSTOM: 'SLEEPVIPACTIV_P4P_CUSTOM',
    NOFMGGCARE_P4P_SYS: 'NOFMGGCARE_P4P_SYS',//非快消品关怀
    NOFMGGCARE_P4P_CUSTOM: 'NOFMGGCARE_P4P_CUSTOM',
    CLUBCARDREMIND_P4P_SYS: 'CLUBCARDREMIND_P4P_SYS',//会员卡领取提醒
    CLUBCARDREMIND_P4P_CUSTOM: 'CLUBCARDREMIND_P4P_CUSTOM',
    COMMENTREMIND_P4P_SYS: 'COMMENTREMIND_P4P_SYS',//初评提醒
    COMMENTREMIND_P4P_CUSTOM: 'COMMENTREMIND_P4P_CUSTOM',
    ADDITIONALREMIND_P4P_SYS: 'ADDITIONALREMIND_P4P_SYS',//追评提醒
    ADDITIONALREMIND_P4P_CUSTOM: 'ADDITIONALREMIND_P4P_CUSTOM',
    ADDITIONALCARE_P4P_SYS: 'ADDITIONALCARE_P4P_SYS',//追评关怀
    ADDITIONALCARE_P4P_CUSTOM: 'ADDITIONALCARE_P4P_CUSTOM',
    PPTACTIVATE_P4P_SYS: 'PPTACTIVATE_P4P_SYS',//品牌团
    PPTACTIVATE_P4P_CUSTOM: 'PPTACTIVATE_P4P_CUSTOM',
    PPTREDEEM_P4P_SYS: 'PPTREDEEM_P4P_SYS',//品牌团挽回
    PPTREDEEM_P4P_CUSTOM: 'PPTREDEEM_P4P_CUSTOM',
    TQGREDEEM_P4P_SYS: 'TQGREDEEM_P4P_SYS',//淘抢购挽回
    TQGREDEEM_P4P_CUSTOM: 'TQGREDEEM_P4P_CUSTOM',
    OUTHERBIGACTIV_P4P_SYS: 'OUTHERBIGACTIV_P4P_SYS',//其他大型活动
    OUTHERBIGACTIV_P4P_CUSTOM: 'OUTHERBIGACTIV_P4P_CUSTOM',
    TQGACTIVATE_P4P_SYS: 'TQGACTIVATE_P4P_SYS',//淘抢购(激活)
    TQGACTIVATE_P4P_CUSTOM: 'TQGACTIVATE_P4P_CUSTOM',
    XFSACTIVATE_P4P_SYS: 'XFSACTIVATE_P4P_SYS',//618(激活)
    XFSACTIVATE_P4P_CUSTOM: 'XFSACTIVATE_P4P_CUSTOM',
    DOUBLEELEVEN_P4P_SYS: 'DOUBLEELEVEN_P4P_SYS',//双11(激活)
    DOUBLEELEVEN_P4P_CUSTOM: 'DOUBLEELEVEN_P4P_CUSTOM',
    DOUBLETWELVE_P4P_SYS: 'DOUBLETWELVE_P4P_SYS',//双12(激活)
    DOUBLETWELVE_P4P_CUSTOM: 'DOUBLETWELVE_P4P_CUSTOM',
    OTHERACTIVATE_P4P_SYS: 'OTHERACTIVATE_P4P_SYS',//其他淘宝大促(激活)
    OTHERACTIVATE_P4P_CUSTOM: 'OTHERACTIVATE_P4P_CUSTOM',
    PAYMENT_P4P_SYS: 'PAYMENT_P4P_SYS',//付款即时营销
    PAYMENT_P4P_CUSTOM: 'PAYMENT_P4P_CUSTOM',
    ORDERCLOSED_P4P_SYS: 'ORDERCLOSED_P4P_SYS',//订单关闭即时营销
    ORDERCLOSED_P4P_CUSTOM: 'ORDERCLOSED_P4P_CUSTOM',
    ALLDOUBLE11_P4P_SYS: 'ALLDOUBLE11_P4P_SYS',//双11全量型
    ALLDOUBLE11_P4P_CUSTOM: 'ALLDOUBLE11_P4P_CUSTOM',
    ADDDOUBLE11INSTANT_P4P_SYS: 'ADDDOUBLE11INSTANT_P4P_SYS',//双11当天增量即时型
    ADDDOUBLE11INSTANT_P4P_CUSTOM: 'ADDDOUBLE11INSTANT_P4P_CUSTOM',
    ADDDOUBLE11PRESET_P4P_SYS: 'ADDDOUBLE11PRESET_P4P_SYS',//双11当天增量预设型
    ADDDOUBLE11PRESET_P4P_CUSTOM: 'ADDDOUBLE11PRESET_P4P_CUSTOM',
    ALLBEFOREDOUBLE11_P4P_SYS: 'ALLBEFOREDOUBLE11_P4P_SYS',//双11全量前置型
    ALLBEFOREDOUBLE11_P4P_CUSTOM: 'ALLBEFOREDOUBLE11_P4P_CUSTOM',
    EFFICTIVEDOUBLE11_P4P_SYS: 'EFFICTIVEDOUBLE11_P4P_SYS',//双11效率型
    EFFICTIVEDOUBLE11_P4P_CUSTOM: 'EFFICTIVEDOUBLE11_P4P_CUSTOM',
    COMPROMISEEDOUBLE11_P4P_SYS: 'COMPROMISEEDOUBLE11_P4P_SYS',//双11折中型
    COMPROMISEEDOUBLE11_P4P_CUSTOM: 'COMPROMISEEDOUBLE11_P4P_CUSTOM',
    FOCUSDOUBLE11_P4P_SYS: 'FOCUSDOUBLE11_P4P_SYS',//双11专注型
    FOCUSDOUBLE11_P4P_CUSTOM: 'FOCUSDOUBLE11_P4P_CUSTOM',
    CUSTOMIZEDDOUBLE11_P4P_SYS: 'CUSTOMIZEDDOUBLE11_P4P_SYS',//双11定制型
    CUSTOMIZEDDOUBLE11_P4P_CUSTOM: 'CUSTOMIZEDDOUBLE11_P4P_CUSTOM',
    ALLDOUBLE12_P4P_SYS: 'ALLDOUBLE12_P4P_SYS',//双12全量型
    ALLDOUBLE12_P4P_CUSTOM: 'ALLDOUBLE12_P4P_CUSTOM',
    ADDDOUBLE12INSTANT_P4P_SYS: 'ADDDOUBLE12INSTANT_P4P_SYS',//双12当天增量即时型
    ADDDOUBLE12INSTANT_P4P_CUSTOM: 'ADDDOUBLE12INSTANT_P4P_CUSTOM',
    ADDDOUBLE12PRESET_P4P_SYS: 'ADDDOUBLE12PRESET_P4P_SYS',//双12当天增量预设型
    ADDDOUBLE12PRESET_P4P_CUSTOM: 'ADDDOUBLE12PRESET_P4P_CUSTOM',
    ALLBEFOREDOUBLE12_P4P_SYS: 'ALLBEFOREDOUBLE12_P4P_SYS',//双12全量前倾型
    ALLBEFOREDOUBLE12_P4P_CUSTOM: 'ALLBEFOREDOUBLE12_P4P_CUSTOM',
    EFFICTIVEDOUBLE12_P4P_SYS: 'EFFICTIVEDOUBLE12_P4P_SYS',//双12效率型
    EFFICTIVEDOUBLE12_P4P_CUSTOM: 'EFFICTIVEDOUBLE12_P4P_CUSTOM',
    COMPROMISEEDOUBLE12_P4P_SYS: 'COMPROMISEEDOUBLE12_P4P_SYS',//双12折中型
    COMPROMISEEDOUBLE12_P4P_CUSTOM: 'COMPROMISEEDOUBLE12_P4P_CUSTOM',
    FOCUSDOUBLE12_P4P_SYS: 'FOCUSDOUBLE12_P4P_SYS',//双12专注型
    FOCUSDOUBLE12_P4P_CUSTOM: 'FOCUSDOUBLE12_P4P_CUSTOM',
    CUSTOMIZEDDOUBLE12_P4P_SYS: 'CUSTOMIZEDDOUBLE12_P4P_SYS',//双12定制型
    CUSTOMIZEDDOUBLE12_P4P_CUSTOM: 'CUSTOMIZEDDOUBLE12_P4P_CUSTOM',
  },
  member_group: {
    AI_TAG: '智能标签'
  },
  member_type: {
    BUY_NUMS: '购物次数标签'
  },
  //日历
  calendar: [{
    name: '农历',
    value: 'lunar'
  }, {
    name: '公历',
    value: 'gregorian'
  }],
  //发送日期
  sendData: [{
    name: '当天',
    value: '0'
  }, {
    name: '1天',
    value: '1'
  }, {
    name: '2天',
    value: '2'
  }, {
    name: '3天',
    value: '3'
  }, {
    name: '4天',
    value: '4'
  }, {
    name: '5天',
    value: '5'
  }, {
    name: '6天',
    value: '6'
  }],
  // 节假日问候发送时间
  holidaySendTime: [
    {
      name: '当天',
      value: '0'
    }, {
      name: '提前1天',
      value: '-1'
    }, {
      name: '提前2天',
      value: '-2'
    }, {
      name: '提前3天',
      value: '-3'
    }, {
      name: '提前4天',
      value: '-4'
    }, {
      name: '提前5天',
      value: '-5'
    }, {
      name: '延后1天',
      value: '1'
    }, {
      name: '延后2天',
      value: '2'
    }, {
      name: '延后3天',
      value: '3'
    }, {
      name: '延后4天',
      value: '4'
    }, {
      name: '延后5天',
      value: '5'
    }
  ],
  //恶劣天气
  weather_type: [
    {
      name: '道路结冰',
      value: '道路结冰'
    }, {
      name: '暴雪',
      value: '暴雪'
    }, {
      name: '暴雨',
      value: '暴雨'
    }, {
      name: '冰雹',
      value: '冰雹'
    }, {
      name: '大风',
      value: '大风'
    }, {
      name: '大雾',
      value: '大雾'
    }, {
      name: '高温',
      value: '高温'
    }, {
      name: '干旱',
      value: '干旱'
    }, {
      name: '寒潮',
      value: '寒潮'
    }, {
      name: '雷电',
      value: '雷电'
    }, {
      name: '霾',
      value: '霾'
    }, {
      name: '沙尘暴',
      value: '沙尘暴'
    }, {
      name: '霜冻',
      value: '霜冻'
    }, {
      name: '台风',
      value: '台风'
    }, {
      name: '未知',
      value: '未知'
    }
  ],
  //恶劣天气等级
  weather_leavel: [
    {
      name: '蓝色预警',
      value: 'blue'
    }, {
      name: '黄色预警',
      value: 'yellow'
    }, {
      name: '橙色预警',
      value: 'origin'
    }, {
      name: '红色预警',
      value: 'red'
    }
  ],
  //恶劣天气发送时间
  badWeatherSendTime: [
    {
      name: '即时发送',
      value: '0'
    }, {
      name: '延后1小时',
      value: '1'
    }, {
      name: '延后2小时',
      value: '2'
    }, {
      name: '延后3小时',
      value: '3'
    }, {
      name: '延后5小时',
      value: '5'
    }, {
      name: '延后10小时',
      value: '10'
    }, {
      name: '延后18小时',
      value: '18'
    }, {
      name: '延后1天',
      value: '24'
    }, {
      name: '延后2天',
      value: '48'
    }, {
      name: '延后3天',
      value: '75'
    }
  ],
  // 营销间隔的可选择项
  marketingInterval: [
    {
      name: '12小时',
      value: '12'
    }, {
      name: '24小时',
      value: '24'
    }, {
      name: '36小时',
      value: '36'
    }, {
      name: '48小时',
      value: '48'
    }, {
      name: '72小时',
      value: '72'
    }, {
      name: '4天',
      value: 4 * 24 + ''
    }, {
      name: '5天',
      value: 5 * 24 + ''
    }, {
      name: '6天',
      value: 6 * 24 + ''
    }, {
      name: '7天',
      value: 7 * 24 + ''
    }, {
      name: '8天',
      value: 8 * 24 + ''
    }, {
      name: '9天',
      value: 9 * 24 + ''
    }, {
      name: '11天',
      value: 11 * 24 + ''
    }, {
      name: '12天',
      value: 12 * 24 + ''
    }, {
      name: '13天',
      value: 13 * 24 + ''
    }, {
      name: '14天',
      value: 14 * 24 + ''
    }, {
      name: '15天',
      value: 15 * 24 + ''
    }
  ],
  //缓冲时间
  bufferTime: [
    {
      name: '2小时',
      value: '2'
    }, {
      name: '4小时',
      value: '4'
    }, {
      name: '6小时',
      value: '6'
    }, {
      name: '12小时',
      value: '12'
    }, {
      name: '18小时',
      value: '18'
    }, {
      name: '24小时',
      value: '24'
    }, {
      name: '30小时',
      value: '30'
    }, {
      name: '36小时',
      value: '36'
    }, {
      name: '42小时',
      value: '42'
    }, {
      name: '48小时',
      value: '48'
    }, {
      name: '54小时',
      value: '54'
    }, {
      name: '60小时',
      value: '60'
    }, {
      name: '66小时',
      value: '66'
    }, {
      name: '72小时',
      value: '72'
    }
  ],
  urgeTimePayRemaind: [
    {
      name: '5分钟',
      value: '5'
    }, {
      name: '10分钟',
      value: '10'
    }, {
      name: '15分钟',
      value: '15'
    }, {
      name: '20分钟',
      value: '20'
    }, {
      name: '30分钟',
      value: '30'
    }, {
      name: '1小时',
      value: 1 * 60 + ''
    }, {
      name: '2小时',
      value: 2 * 60 + ''
    }, {
      name: '3小时',
      value: 3 * 60 + ''
    }, {
      name: '4小时',
      value: 4 * 60 + ''
    }, {
      name: '5小时',
      value: 5 * 60 + ''
    }, {
      name: '6小时',
      value: 6 * 60 + ''
    }, {
      name: '7小时',
      value: 7 * 60 + ''
    }, {
      name: '8小时',
      value: 8 * 60 + ''
    }, {
      name: '9小时',
      value: 9 * 60 + ''
    }, {
      name: '10小时',
      value: 10 * 60 + ''
    }, {
      name: '11小时',
      value: 11 * 60 + ''
    }, {
      name: '12小时',
      value: 12 * 60 + ''
    }, {
      name: '13小时',
      value: 13 * 60 + ''
    }, {
      name: '14小时',
      value: 14 * 60 + ''
    }, {
      name: '15小时',
      value: 15 * 60 + ''
    }, {
      name: '16小时',
      value: 16 * 60 + ''
    }, {
      name: '17小时',
      value: 17 * 60 + ''
    }, {
      name: '18小时',
      value: 18 * 60 + ''
    }, {
      name: '19小时',
      value: 19 * 60 + ''
    }, {
      name: '20小时',
      value: 20 * 60 + ''
    }, {
      name: '21小时',
      value: 21 * 60 + ''
    }, {
      name: '22小时',
      value: 22 * 60 + ''
    }, {
      name: '23小时',
      value: 23 * 60 + ''
    }
  ],
  //催付时间间隔
  urgeTime: [
    {
      name: '5分钟',
      value: '5'
    }, {
      name: '10分钟',
      value: '10'
    }, {
      name: '15分钟',
      value: '15'
    }, {
      name: '20分钟',
      value: '20'
    }, {
      name: '30分钟',
      value: '30'
    }, {
      name: '1小时',
      value: 1 * 60 + ''
    }, {
      name: '2小时',
      value: 2 * 60 + ''
    }, {
      name: '3小时',
      value: 3 * 60 + ''
    }, {
      name: '4小时',
      value: 4 * 60 + ''
    }, {
      name: '5小时',
      value: 5 * 60 + ''
    }, {
      name: '6小时',
      value: 6 * 60 + ''
    }, {
      name: '7小时',
      value: 7 * 60 + ''
    }, {
      name: '8小时',
      value: 8 * 60 + ''
    }, {
      name: '9小时',
      value: 9 * 60 + ''
    }, {
      name: '10小时',
      value: 10 * 60 + ''
    }, {
      name: '11小时',
      value: 11 * 60 + ''
    }, {
      name: '12小时',
      value: 12 * 60 + ''
    }, {
      name: '13小时',
      value: 13 * 60 + ''
    }, {
      name: '14小时',
      value: 14 * 60 + ''
    }, {
      name: '15小时',
      value: 15 * 60 + ''
    }, {
      name: '16小时',
      value: 16 * 60 + ''
    }, {
      name: '17小时',
      value: 17 * 60 + ''
    }, {
      name: '18小时',
      value: 18 * 60 + ''
    }, {
      name: '19小时',
      value: 19 * 60 + ''
    }, {
      name: '20小时',
      value: 20 * 60 + ''
    }, {
      name: '21小时',
      value: 21 * 60 + ''
    }, {
      name: '22小时',
      value: 22 * 60 + ''
    }, {
      name: '23小时',
      value: 23 * 60 + ''
    }, {
      name: '24小时',
      value: 24 * 60 + ''
    }, {
      name: '48小时',
      value: 48 * 60 + ''
    }, {
      name: '70小时',
      value: 70 * 60 + ''
    }

  ],
  //宝贝到达收件人所在城市
  urgeTime2: [
    {
      name: '立即',
      value: '0'
    }, {
      name: '3分钟',
      value: '3'
    }, {
      name: '5分钟',
      value: '5'
    }, {
      name: '10分钟',
      value: '10'
    }, {
      name: '15分钟',
      value: '15'
    }, {
      name: '20分钟',
      value: '20'
    }, {
      name: '30分钟',
      value: '30'
    }, {
      name: '1小时',
      value: 1 * 60 + ''
    }, {
      name: '2小时',
      value: 2 * 60 + ''
    }, {
      name: '3小时',
      value: 3 * 60 + ''
    }, {
      name: '4小时',
      value: 4 * 60 + ''
    }, {
      name: '5小时',
      value: 5 * 60 + ''
    }, {
      name: '6小时',
      value: 6 * 60 + ''
    }, {
      name: '7小时',
      value: 7 * 60 + ''
    }, {
      name: '8小时',
      value: 8 * 60 + ''
    }, {
      name: '9小时',
      value: 9 * 60 + ''
    }, {
      name: '10小时',
      value: 10 * 60 + ''
    }, {
      name: '11小时',
      value: 11 * 60 + ''
    }, {
      name: '12小时',
      value: 12 * 60 + ''
    }, {
      name: '13小时',
      value: 13 * 60 + ''
    }, {
      name: '14小时',
      value: 14 * 60 + ''
    }, {
      name: '15小时',
      value: 15 * 60 + ''
    }, {
      name: '16小时',
      value: 16 * 60 + ''
    }, {
      name: '17小时',
      value: 17 * 60 + ''
    }, {
      name: '18小时',
      value: 18 * 60 + ''
    }, {
      name: '19小时',
      value: 19 * 60 + ''
    }, {
      name: '20小时',
      value: 20 * 60 + ''
    }, {
      name: '21小时',
      value: 21 * 60 + ''
    }, {
      name: '22小时',
      value: 22 * 60 + ''
    }, {
      name: '23小时',
      value: 23 * 60 + ''
    }, {
      name: '24小时',
      value: 24 * 60 + ''
    }, {
      name: '48小时',
      value: 48 * 60 + ''
    }, {
      name: '70小时',
      value: 70 * 60 + ''
    }

  ],
  //触发节点
  urgeTime3: [
    {
      name: '0.5天',
      value: 0.5 * 24 + ''
    }, {
      name: '1天',
      value: 1 * 24 + ''
    }, {
      name: '1.5天',
      value: 1.5 * 24 + ''
    }, {
      name: '2天',
      value: 2 * 24 + ''
    }, {
      name: '2.5天',
      value: 2.5 * 24 + ''
    }, {
      name: '3天',
      value: 3 * 24 + ''
    }, {
      name: '4天',
      value: 4 * 24 + ''
    }, {
      name: '5天',
      value: 5 * 24 + ''
    }, {
      name: '6天',
      value: 6 * 24 + ''
    }, {
      name: '7天',
      value: 7 * 24 + ''
    }, {
      name: '10天',
      value: 10 * 24 + ''
    }, {
      name: '15天',
      value: 15 * 24 + ''
    }, {
      name: '20天',
      value: 20 * 24 + ''
    }, {
      name: '25天',
      value: 25 * 24 + ''
    }, {
      name: '30天',
      value: 30 * 24 + ''
    }, {
      name: '40天',
      value: 40 * 24 + ''
    }, {
      name: '45天',
      value: 45 * 24 + ''
    }, {
      name: '50天',
      value: 50 * 24 + ''
    }, {
      name: '55天',
      value: 55 * 24 + ''
    }, {
      name: '60天',
      value: 60 * 24 + ''
    }, {
      name: '70天',
      value: 70 * 24 + ''
    }, {
      name: '80天',
      value: 80 * 24 + ''
    }, {
      name: '90天',
      value: 90 * 24 + ''
    }, {
      name: '105天',
      value: 105 * 24 + ''
    }, {
      name: '120天',
      value: 120 * 24 + ''
    }, {
      name: '150天',
      value: 150 * 24 + ''
    }, {
      name: '180天',
      value: 180 * 24 + ''
    }
  ],
  //所有营销类型
  allMarketType: [
    {
      name: '双12全量型',
      type: 'ALLDOUBLE12_P4P_SYS',
      finishState: 2,
    }, {
      name: '双12全量前倾型',
      type: 'ALLBEFOREDOUBLE12_P4P_SYS',
      finishState: 2,
    }, {
      name: '双12效率型',
      type: 'EFFICTIVEDOUBLE12_P4P_SYS',
      finishState: 2,
    }, {
      name: '双12折中型',
      type: 'COMPROMISEEDOUBLE12_P4P_SYS',
      finishState: 2,
    }, {
      name: '双12专注型',
      type: 'FOCUSDOUBLE12_P4P_SYS',
      finishState: 2,
    }, {
      name: '双12定制型',
      type: 'CUSTOMIZEDDOUBLE12_P4P_SYS',
      finishState: 2,
    }, {
      name: '双12当天增量即时型',
      type: 'ADDDOUBLE12INSTANT_P4P_SYS',
      finishState: 2,
    }, {
      name: '双12当天增量预设型',
      type: 'ADDDOUBLE12PRESET_P4P_SYS',
      finishState: 2,
    }, {
      name: '双11全量型',
      type: 'ALLDOUBLE11_P4P_SYS',
      finishState: 2,
    }, {
      name: '双11全量前置型',
      type: 'ALLBEFOREDOUBLE11_P4P_SYS',
      finishState: 2,
    }, {
      name: '双11效率型',
      type: 'EFFICTIVEDOUBLE11_P4P_SYS',
      finishState: 2,
    }, {
      name: '双11折中型',
      type: 'COMPROMISEEDOUBLE11_P4P_SYS',
      finishState: 2,
    }, {
      name: '双11专注型',
      type: 'FOCUSDOUBLE11_P4P_SYS',
      finishState: 2,
    }, {
      name: '双11定制型',
      type: 'CUSTOMIZEDDOUBLE11_P4P_SYS',
      finishState: 2,
    }, {
      name: '双11当天增量即时型',
      type: 'ADDDOUBLE11INSTANT_P4P_SYS',
      finishState: 2,
    }, {
      name: '双11当天增量预设型',
      type: 'ADDDOUBLE11PRESET_P4P_SYS',
      finishState: 2,
    }, {
      name: '拍下即时营销',
      type: 'PAYED_P4P_SYS',
      finishState: 2,
    }, {
      name: '跟随潜需式营销',
      type: 'POTENTIAL_P4P_SYS',
      finishState: 2,
    }, {
      name: '发货延迟',
      type: 'DELIVERYDELAY_P4P_SYS',
      finishState: 2,
    }, {
      name: '态度不满',
      type: 'DISPLEASURE_P4P_SYS',
      finishState: 2,
    }, {
      name: '发货后未收货退款',
      type: 'NORECEIPTREFUND_P4P_SYS',
      finishState: 2,
    }, {
      name: '默认催付提醒',
      type: 'CREATEDREMIND_P4P_SYS',
      finishState: 2,
    }, {
      name: '到达所在城市提醒',
      type: 'SENDREMIND_P4P_SYS',
      finishState: 2,
    }, {
      name: '初评关怀',
      type: 'COMMENTCARE_P4P_SYS',
      finishState: 2,
    }, {
      name: '买家申请仅退款',
      type: 'REFUND_P4P_SYS',
      finishState: 2,
    }, {
      name: '快递运送超时',
      type: 'EXPRESSOUT_P4P_SYS',
      finishState: 2,
    }, {
      name: '无流转记录',
      type: 'NOTRANSFERRECORD_P4P_SYS',
      finishState: 2,
    }, {
      name: '流转异常时',
      type: 'TRANSFERREEOE_P4P_SYS',
      finishState: 0,
    }, {
      name: '假货怀疑',
      type: 'FAKESUSPECT_P4P_SYS',
      finishState: 2,
    }, {
      name: '质量不满',
      type: 'DISQUALITY_P4P_SYS',
      finishState: 2,
    }, {
      name: '欺诈行为',
      type: 'CHEATBEHAVIOR_P4P_SYS',
      finishState: 2,
    }, {
      name: '价格不满',
      type: 'DISPRICE_P4P_SYS',
      finishState: 2,
    }, {
      name: '承诺不兑现',
      type: 'PROMISENOCASH_P4P_SYS',
      finishState: 2,
    }, {
      name: '预期落差',
      type: 'EXPECTEDGAP_P4P_SYS',
      finishState: 2,
    }, {
      name: '物流问题',
      type: 'LOGISTICSPROBLEM_P4P_SYS',
      finishState: 2,
    }, {
      name: '未发货退款',
      type: 'NOSENDREFUND_P4P_SYS',
      finishState: 0,
    }, {
      name: '退货退款',
      type: 'RETURNREFUND_P4P_SYS',
      finishState: 2,
    }, {
      name: '大活动促销提醒',
      type: 'BIGEVENTREMIND_P4P_SYS',
      finishState: 0,
    }, {
      name: '默认付款关怀',
      type: 'PAYCARE_P4P_SYS',
      finishState: 2,
    }, {
      name: '默认发货提醒',
      type: 'DELIVERREMIND_P4P_SYS',
      finishState: 2,
    }, {
      name: '开始派送提醒',
      type: 'STARTSENDREMIND_P4P_SYS',
      finishState: 1,
    }, {
      name: '签收提醒',
      type: 'SIGNREMIND_P4P_SYS',
      finishState: 1,
    }, {
      name: '默认确认关怀',
      type: 'AFFIRMCARE_P4P_SYS',
      finishState: 2,
    }, {
      name: '会员卡领取提醒',
      type: 'CLUBCARDREMIND_P4P_SYS',
      finishState: 0,
    }, {
      name: '初评提醒',
      type: 'COMMENTREMIND_P4P_SYS',
      finishState: 2,
    }, {
      name: '追评提醒',
      type: 'ADDITIONALREMIND_P4P_SYS',
      finishState: 2,
    }, {
      name: '追评关怀',
      type: 'ADDITIONALCARE_P4P_SYS',
      finishState: 0,
    }, {
      name: '买家申请退货退款',
      type: 'APPLYRETURNREFUND_P4P_SYS',
      finishState: 2,
    }, {
      name: '商家拒绝仅退款申请',
      type: 'REFUSEREFUND_P4P_SYS',
      finishState: 2,
    }, {
      name: '商家拒绝退货退款申请',
      type: 'REFUSERETURNREFUND_P4P_SYS',
      finishState: 2,
    }, {
      name: '商家同意退货退款申请',
      type: 'AGREERETURNREFUND_P4P_SYS',
      finishState: 2,
    }, {
      name: '买家退货被签收提醒',
      type: 'REFUNDSIGNREMIND_P4P_SYS',
      finishState: 0,
    }, {
      name: '退款成功提醒',
      type: 'SUCCESSREFUND_P4P_SYS',
      finishState: 2,
    }, {
      name: '送优惠券',
      type: 'GIVECOUPON_P4P_SYS',
      finishState: 0,
    }, {
      name: '第二次买就送',
      type: 'SECONDGIVE_P4P_SYS',
      finishState: 0,
    }, {
      name: '新人专享折扣',
      type: 'NEWERDISCOUNT_P4P_SYS',
      finishState: 0,
    }, {
      name: '新人专享满减',
      type: 'NEWERFULLCUT_P4P_SYS',
      finishState: 0,
    }, {
      name: '新人买A+?？元优惠买B',
      type: 'NEWERBUYAANDOTHER_P4P_SYS',
      finishState: 0,
    }, {
      name: '新人A+B一起买优惠',
      type: 'NEWERBUYAANDB_P4P_SYS',
      finishState: 0,
    }, {
      name: '新人免邮+升级快递',
      type: 'NEWERFREESHIP_P4P_SYS',
      finishState: 0,
    }, {
      name: '非快消品关怀',
      type: 'NOFMGGCARE_P4P_SYS',
      finishState: 0,
    }, {
      name: '淘抢购挽回',
      type: 'TQGREDEEM_P4P_SYS',
      finishState: 0,
    }, {
      name: '品牌团挽回',
      type: 'PPTREDEEM_P4P_SYS',
      finishState: 0,
    }, {
      name: '其他大型活动',
      type: 'OUTHERBIGACTIV_P4P_SYS',
      finishState: 0,
    }, {
      name: '挽回会员专享活动',
      type: 'SAVEACTIVITY_P4P_SYS',
      finishState: 0,
    }, {
      name: '同类型新品',
      type: 'SAMENER_P4P_SYS',
      finishState: 1,
    }, {
      name: '季节性新品',
      type: 'SEASONALNEW_P4P_SYS',
      finishState: 0,
    }, {
      name: '换代型新品',
      type: 'UPDATANEW_P4P_SYS',
      finishState: 0,
    }, {
      name: '配件型新品',
      type: 'PARTSNEW_P4P_SYS',
      finishState: 0,
    }, {
      name: '延伸型新品',
      type: 'EXPANDNEW_P4P_SYS',
      finishState: 0,
    }, {
      name: '电话致歉',
      type: 'PHONEEXCUSE_P4P_SYS',
      finishState: 2,
    }, {
      name: '邮件致歉',
      type: 'EMAILEXCUSE_P4P_SYS',
      finishState: 0,
    }, {
      name: '品牌团',
      type: 'PPTACTIVATE_P4P_SYS',
      finishState: 0,
    }, {
      name: '淘抢购',
      type: 'TQGACTIVATE_P4P_SYS',
      finishState: 0,
    }, {
      name: '618',
      type: 'XFSACTIVATE_P4P_SYS',
      finishState: 0,
    }, {
      name: '双11',
      type: 'DOUBLEELEVEN_P4P_SYS',
      finishState: 0,
    }, {
      name: '双12',
      type: 'DOUBLETWELVE_P4P_SYS',
      finishState: 0,
    }, {
      name: '其他淘宝大促',
      type: 'OTHERACTIVATE_P4P_SYS',
      finishState: 0,
    }, {
      name: '沉睡会员专享大力度促销',
      type: 'SLEEPVIPACTIV_P4P_SYS',
      finishState: 0,
    }, {
      name: '打折',
      type: 'DISCOUNT_P4P_SYS',
      finishState: 0,
    }, {
      name: '满减',
      type: 'FULLCUT_P4P_SYS',
      finishState: 0,
    }, {
      name: '买A+？元优惠买B',
      type: 'BUYAANDOTHER_P4P_SYS',
      finishState: 0,
    }, {
      name: 'A+B一起买优惠',
      type: 'BUYAADNB_P4P_SYS',
      finishState: 0,
    }, {
      name: '免邮',
      type: 'FREESHIPPING_P4P_SYS',
      finishState: 0,
    }, {
      name: '聚划算挽回(挽回)',
      type: 'JHSREDEEM_P4P_SYS',
      finishState: 2,
    }, {
      name: '聚划算挽回(激活)',
      type: 'JHSACTIVATE_P4P_SYS',
      finishState: 1,
    }, {
      name: '礼品+感谢信挽回',
      type: 'GIFTANDLETTER_P4P_SYS',
      finishState: 2,
    }, {
      name: '跟随潜需式营销(处女购)',
      type: 'PON_P4P_SYS',
      finishState: 2,
    }, {
      name: '快消品关怀',
      type: 'FMGGCARE_P4P_SYS',
      finishState: 2,
    }, {
      name: '节假日问候',
      type: 'HOLIDAYCARE_P4P_SYS',
      finishState: 2,
    }, {
      name: '节气问候',
      type: 'SOLARTERMCARE_P4P_SYS',
      finishState: 2,
    }, {
      name: '恶劣天气预警关怀',
      type: 'BADWEATHER_P4P_SYS',
      finishState: 2,
    }, {
      name: '礼品营销',
      type: 'GIFTMARKET_P4P_SYS',
      finishState: 1,
    }, {
      name: '致歉信',
      type: 'ALETTER_P4P_SYS',
      finishState: 2,
    }, {
      name: '付款即时营销',
      type: 'PAYMENT_P4P_SYS',
      finishState: 1,
    }, {
      name: '订单关闭即时营销',
      type: 'ORDERCLOSED_P4P_SYS',
      finishState: 1,
    }, {
      name: '季节性新品(上新营销中)',
      type: 'PSEASONALNEW_P4P_SYS',
      finishState: 0,
    }, {
      name: '同类型新品(上新营销中)',
      type: 'UNSEASONALNEW_P4P_SYS',
      finishState: 0,
    }, {
      name: '换代型新品(上新营销中)',
      type: 'PUPDATANEW_P4P_SYS',
      finishState: 0,
    }, {
      name: '配件型新品(上新营销中)',
      type: 'PPARTSNEW_P4P_SYS',
      finishState: 0,
    }, {
      name: '延伸型新品(上新营销中)',
      type: 'PEXPANDNEW_P4P_SYS',
      finishState: 0,
    }, {
      name: '会员专享活动(活动营销)',
      type: 'TOMEMBERSHIP_P4P_SYS',
      finishState: 0,
    }, {
      name: '聚划算(活动营销)',
      type: 'PJHSACTIVATE_P4P_SYS',
      finishState: 0,
    }, {
      name: '品牌团(活动营销)',
      type: 'PPPTACTIVATE_P4P_SYS',
      finishState: 0,
    }, {
      name: '淘抢购(活动营销)',
      type: 'PTQGACTIVATE_P4P_SYS',
      finishState: 0,
    }, {
      name: '其他大促活动(活动营销)',
      type: 'POTHERACTIVATE_P4P_SYS',
      finishState: 0,
    }, {
      name: '标记活动类型',
      type: 'TAGACTIVITYTYPE_P4P_SYS',
      finishState: 0,
    }
  ],
  //所有营销类型
  allMarketTypes: {
    ADDDOUBLE11INSTANT_P4P_SYS: "双11当天增量即时型",
    ADDDOUBLE11PRESET_P4P_SYS: "双11当天增量预设型",
    ADDDOUBLE12INSTANT_P4P_SYS: "双12当天增量即时型",
    ADDDOUBLE12PRESET_P4P_SYS: "双12当天增量预设型",
    ADDITIONALCARE_P4P_SYS: "追评关怀",
    ADDITIONALREMIND_P4P_SYS: "追评提醒",
    AFFIRMCARE_P4P_SYS: "默认确认关怀",
    AGREERETURNREFUND_P4P_SYS: "商家同意退货退款申请",
    ALETTER_P4P_SYS: "致歉信",
    ALLBEFOREDOUBLE11_P4P_SYS: "双11全量前置型",
    ALLBEFOREDOUBLE12_P4P_SYS: "双12全量前倾型",
    ALLDOUBLE11_P4P_SYS: "双11全量型",
    ALLDOUBLE12_P4P_SYS: "双12全量型",
    APPLYRETURNREFUND_P4P_SYS: "买家申请退货退款",
    BADWEATHER_P4P_SYS: "恶劣天气预警关怀",
    BIGEVENTREMIND_P4P_SYS: "大活动促销提醒",
    BUYAADNB_P4P_SYS: "A+B一起买优惠",
    BUYAANDOTHER_P4P_SYS: "买A+？元优惠买B",
    CHEATBEHAVIOR_P4P_SYS: "欺诈行为",
    CLUBCARDREMIND_P4P_SYS: "会员卡领取提醒",
    COMMENTCARE_P4P_SYS: "初评关怀",
    COMMENTREMIND_P4P_SYS: "初评提醒",
    COMPROMISEEDOUBLE11_P4P_SYS: "双11折中型",
    COMPROMISEEDOUBLE12_P4P_SYS: "双12折中型",
    CREATEDREMIND_P4P_SYS: "默认催付提醒",
    CUSTOMIZEDDOUBLE11_P4P_SYS: "双11定制型",
    CUSTOMIZEDDOUBLE12_P4P_SYS: "双12定制型",
    DELIVERREMIND_P4P_SYS: "默认发货提醒",
    DELIVERYDELAY_P4P_SYS: "发货延迟",
    DISCOUNT_P4P_SYS: "打折",
    DISPLEASURE_P4P_SYS: "态度不满",
    DISPRICE_P4P_SYS: "价格不满",
    DISQUALITY_P4P_SYS: "质量不满",
    DOUBLEELEVEN_P4P_SYS: "双11",
    DOUBLETWELVE_P4P_SYS: "双12",
    EFFICTIVEDOUBLE11_P4P_SYS: "双11效率型",
    EFFICTIVEDOUBLE12_P4P_SYS: "双12效率型",
    EMAILEXCUSE_P4P_SYS: "邮件致歉",
    EXPANDNEW_P4P_SYS: "延伸型新品",
    EXPECTEDGAP_P4P_SYS: "预期落差",
    EXPRESSOUT_P4P_SYS: "快递运送超时",
    FAKESUSPECT_P4P_SYS: "假货怀疑",
    FMGGCARE_P4P_SYS: "快消品关怀",
    FOCUSDOUBLE11_P4P_SYS: "双11专注型",
    FOCUSDOUBLE12_P4P_SYS: "双12专注型",
    FREESHIPPING_P4P_SYS: "免邮",
    FULLCUT_P4P_SYS: "满减",
    GIFTANDLETTER_P4P_SYS: "礼品+感谢信挽回",
    GIFTMARKET_P4P_SYS: "礼品营销",
    GIVECOUPON_P4P_SYS: "送优惠券",
    HOLIDAYCARE_P4P_SYS: "节假日问候",
    JHSACTIVATE_P4P_SYS: "聚划算挽回(激活)",
    JHSREDEEM_P4P_SYS: "聚划算挽回(挽回)",
    LOGISTICSPROBLEM_P4P_SYS: "物流问题",
    NEWERBUYAANDB_P4P_SYS: "新人A+B一起买优惠",
    NEWERBUYAANDOTHER_P4P_SYS: "新人买A+?？元优惠买B",
    NEWERDISCOUNT_P4P_SYS: "新人专享折扣",
    NEWERFREESHIP_P4P_SYS: "新人免邮+升级快递",
    NEWERFULLCUT_P4P_SYS: "新人专享满减",
    NOFMGGCARE_P4P_SYS: "非快消品关怀",
    NORECEIPTREFUND_P4P_SYS: "发货后未收货退款",
    NOSENDREFUND_P4P_SYS: "未发货退款",
    NOTRANSFERRECORD_P4P_SYS: "无流转记录",
    ORDERCLOSED_P4P_SYS: "订单关闭即时营销",
    OTHERACTIVATE_P4P_SYS: "其他淘宝大促",
    OUTHERBIGACTIV_P4P_SYS: "其他大型活动",
    PARTSNEW_P4P_SYS: "配件型新品",
    PAYCARE_P4P_SYS: "默认付款关怀",
    PAYED_P4P_SYS: "拍下即时营销",
    PAYMENT_P4P_SYS: "付款即时营销",
    PEXPANDNEW_P4P_SYS: "延伸型新品(上新营销中)",
    PHONEEXCUSE_P4P_SYS: "电话致歉",
    PJHSACTIVATE_P4P_SYS: "聚划算(活动营销)",
    PON_P4P_SYS: "跟随潜需式营销(处女购)",
    POTENTIAL_P4P_SYS: "跟随潜需式营销",
    POTHERACTIVATE_P4P_SYS: "其他大促活动(活动营销)",
    PPARTSNEW_P4P_SYS: "配件型新品(上新营销中)",
    PPPTACTIVATE_P4P_SYS: "品牌团(活动营销)",
    PPTACTIVATE_P4P_SYS: "品牌团",
    PPTREDEEM_P4P_SYS: "品牌团挽回",
    PROMISENOCASH_P4P_SYS: "承诺不兑现",
    PSEASONALNEW_P4P_SYS: "季节性新品(上新营销中)",
    PTQGACTIVATE_P4P_SYS: "淘抢购(活动营销)",
    PUPDATANEW_P4P_SYS: "换代型新品(上新营销中)",
    REFUNDSIGNREMIND_P4P_SYS: "买家退货被签收提醒",
    REFUND_P4P_SYS: "买家申请仅退款",
    REFUSEREFUND_P4P_SYS: "商家拒绝仅退款申请",
    REFUSERETURNREFUND_P4P_SYS: "商家拒绝退货退款申请",
    RETURNREFUND_P4P_SYS: "退货退款",
    SAMENER_P4P_SYS: "同类型新品",
    SAVEACTIVITY_P4P_SYS: "挽回会员专享活动",
    SEASONALNEW_P4P_SYS: "季节性新品",
    SECONDGIVE_P4P_SYS: "第二次买就送",
    SENDREMIND_P4P_SYS: "到达所在城市提醒",
    SIGNREMIND_P4P_SYS: "签收提醒",
    SLEEPVIPACTIV_P4P_SYS: "沉睡会员专享大力度促销",
    SOLARTERMCARE_P4P_SYS: "节气问候",
    STARTSENDREMIND_P4P_SYS: "开始派送提醒",
    SUCCESSREFUND_P4P_SYS: "退款成功提醒",
    TAGACTIVITYTYPE_P4P_SYS: "标记活动类型",
    TOMEMBERSHIP_P4P_SYS: "会员专享活动(活动营销)",
    TQGACTIVATE_P4P_SYS: "淘抢购",
    TQGREDEEM_P4P_SYS: "淘抢购挽回",
    TRANSFERREEOE_P4P_SYS: "流转异常时",
    UNSEASONALNEW_P4P_SYS: "同类型新品(上新营销中)",
    UPDATANEW_P4P_SYS: "换代型新品"
  },
  //账户权限
  //所有权限
  user_jurisdiction: [
    1990030064,
    1783151372
  ],
  //部分权限
  user_jurisdiction_part: [
    49193531
  ],
  saveGradeGoods: [{
    name: '所有宝贝',
    value: 'all',
  }, {
    name: '高客单价宝贝',
    value: 'high',
  }, {
    name: '中客单价宝贝',
    value: 'middle',
  }, {
    name: '低客单价宝贝',
    value: 'low',
  }],
  // 发送短信过滤单词（主要是过滤任何形式的链接）
  keyword_danger: [
    '.com', '.edu', '.gov', '.int', '.mil', '.net', '.org', '.biz', '.info', '.pro', '.name', '.museum', '.coop', '.aero', '.xxx', '.idv',
    '.ac', '.ad', '.ae', '.af', '.ag', '.ai', '.al', '.am', '.an', '.ao', '.aq', '.ar', '.as', '.at', '.au', '.aw', '.az', '.ba', '.bb', '.bd', '.be', '.bf', '.bg', '.bh', '.bi', '.bj', '.bm', '.bn', '.bo', '.br', '.bs', '.bt', '.bv', '.bw', '.by', '.bz', '.ca', '.cc', '.cd', '.cf', '.cg', '.ch', '.ci', '.ck', '.cl', '.cm', '.cn', '.co', '.cr', '.cu', '.cv', '.cx', '.cy', '.cz', '.de', '.dj', '.dk', '.dm', '.do', '.dz', '.ec', '.ee', '.eg', '.eh', '.er', '.es', '.et', '.eu', '.fi', '.fj', '.fk', '.fm', '.fo', '.fr', '.ga', '.gd', '.ge', '.gf', '.gg', '.gh', '.gi', '.gl', '.gm', '.gn', '.gp', '.gq', '.gr', '.gs', '.gt', '.gu', '.gw', '.gy', '.hk', '.hm', '.hn', '.hr', '.ht', '.hu', '.id', '.ie', '.il', '.im', '.in', '.io', '.iq', '.ir', '.is', '.it', '.je', '.jm', '.jo', '.jp', '.ke', '.kg', '.kh', '.ki', '.km', '.kn', '.kp', '.kr', '.kw', '.ky', '.kz', '.la', '.lb', '.lc', '.li', '.lk', '.lr', '.ls', '.lt', '.lu', '.lv', '.ly', '.ma', '.mc', '.md', '.mg', '.mh', '.mk', '.ml', '.mm', '.mn', '.mo', '.mp', '.mq', '.mr', '.ms', '.mt', '.mu', '.mv', '.mw', '.mx', '.my', '.mz', '.na', '.nc', '.ne', '.nf', '.ng', '.ni', '.nl', '.no', '.np', '.nr', '.nu', '.nz', '.om', '.pa', '.pe', '.pf', '.pg', '.ph', '.pk', '.pl', '.pm', '.pn', '.pr', '.ps', '.pt', '.pw', '.py', '.qa', '.re', '.ro', '.ru', '.rw', '.sa', '.sb', '.sc', '.sd', '.se', '.sg', '.sh', '.si', '.sj', '.sk', '.sl', '.sm', '.sn', '.so', '.sr', '.st', '.sv', '.sy', '.sz', '.tc', '.td', '.tf', '.tg', '.th', '.tj', '.tk', '.tl', '.tm', '.tn', '.to', '.tp', '.tr', '.tt', '.tv', '.tw', '.tz', '.ua', '.ug', '.uk', '.um', '.us', '.uy', '.uz', '.va', '.vc', '.ve', '.vg', '.vi', '.vn', '.vu', '.wf', '.ws', '.ye', '.yt', '.yu', '.yr', '.za', '.zm', '.zw'
  ],
  holiday_list: [
    {
      id: 26,
      name: '元旦',
      calendar: 'gregorian',  // 公历
      date: '2019.1.1',
      area: [],
      sendtime: '0',  // 当天
      message: '迈过了365个昼夜，做过了365个梦，付出了365滴辛劳，收获了365个幸福，亲元旦快乐',
      isswitch: 1
    },
    {
      id: 25,
      name: '腊八节',
      calendar: 'lunar',  // 农历
      // date: '2018.1.24',
      date: '2018.12.8',
      area: [],
      sendtime: '0',  // 当天
      message: '累了，请将心靠岸;伤了，会明白坚强;醉了，会知道难忘;闷了，腊八节就找我聊聊',
      isswitch: 1
    },
    {
      id: 24,
      name: '小年',
      calendar: 'lunar',  // 农历
      date: '2018.12.23',
      area: [],
      sendtime: '0',  // 当天
      message: '扫扫扫扫尽一年的烦恼；洗洗洗洗尽所有的忧愁；盼盼盼盼来你新一年的信任；祝小年快乐',
      isswitch: 1
    },
    {
      id: 23,
      name: '除夕',
      calendar: 'lunar',  // 农历
      date: '2018.12.30',
      area: [],
      sendtime: '0',  // 当天
      message: '一路有你，三饭惦记，五福送去，顺顺利利，七彩中的，久久回忆，实心实意祝您除夕团圆',
      isswitch: 1
    },
    {
      id: 22,
      name: '春节',
      calendar: 'lunar',  // 农历
      date: '2019.1.1',
      area: [],
      sendtime: '0',  // 当天
      message: '初春雪漫漫，人间处处新!人依旧，物依然，又是一年待您再相会',
      isswitch: 1
    },
    {
      id: 21,
      name: '元宵节',
      calendar: 'lunar',  // 农历
      date: '2019.1.15',
      area: [],
      sendtime: '0',  // 当天
      message: '烟花纷飞，带着情谊，温暖了您的心窝，萧瑟的回忆里，因为有你，而更加美丽。祝元宵快乐',
      isswitch: 1
    },
    {
      id: 20,
      name: '情人节',
      calendar: 'gregorian',  // 公历
      date: '2019.2.14',
      area: [],
      sendtime: '0',  // 当天
      message: '相识相知又一年，相爱相恋为相伴，与你共画同心圆，只要与你肩并肩，不离不弃度风寒',
      isswitch: 1
    },
    {
      id: 19,
      name: '龙头节',
      calendar: 'lunar',  // 农历
      date: '2019.2.2',
      area: [],
      sendtime: '0',  // 当天
      message: '二月二，龙抬头，一场春风，绿遍大地，一场春雨，滋润万物；一条短信，问候朋友',
      isswitch: 1
    },
    {
      id: 18,
      name: '妇女节',
      calendar: 'gregorian',  // 公历
      date: '2019.3.8',
      area: [],
      sendtime: '0',  // 当天
      message: '撷一缕春风，沾两滴春雨，采三片春叶，摘四朵春花，织成五颜六色的祝福，我愿伴你左右',
      isswitch: 1
    },
    {
      id: 17,
      name: '植树节',
      calendar: 'gregorian',  // 公历
      date: '2018.3.12',
      area: [],
      sendtime: '0',  // 当天
      message: '一棵树赶走一片雾霾，一片绿色创造美丽家园。植树节，让我们栽下一棵树，传递一份微笑',
      isswitch: 1
    },
    {
      id: 16,
      name: '消费者权益日',
      calendar: 'gregorian',  // 公历
      date: '2018.3.15',
      area: [],
      sendtime: '0',  // 当天
      message: '315权益日，我们的友情经由了雾里看花慧眼审查，被赋予“爱无敌”免检产品；有效期：天长地久',
      isswitch: 1
    },
    {
      id: 15,
      name: '愚人节',
      calendar: 'gregorian',  // 公历
      date: '2018.4.1',
      area: [],
      sendtime: '0',  // 当天
      message: '走着走着，就算了，回忆也淡了；回头发现你，不见了，突然我乱了，晕眩中。愚人节快乐',
      isswitch: 1
    },
    {
      id: 14,
      name: '地球日',
      calendar: 'gregorian',  // 公历
      date: '2018.4.22',
      area: [],
      sendtime: '0',  // 当天
      message: '抱一抱大地，拥一拥蓝天，减一减污染，愿你我爱护环境，守住心灵宁静，世界地球日快乐',
      isswitch: 1
    },
    {
      id: 13,
      name: '劳动节',
      calendar: 'gregorian',  // 公历
      date: '2018.5.1',
      area: [],
      sendtime: '0',  // 当天
      message: '掬一捧春水，扬一缕春风，采一束鲜花，寻一方新绿；愿你心如春水，笑如春风，五一快乐！',
      isswitch: 1
    },
    {
      id: 12,
      name: '五四青年节',
      calendar: 'gregorian',  // 公历
      date: '2018.5.4',
      area: [],
      sendtime: '0',  // 当天
      message: '为生命开一扇窗，阳光照耀大地；为生命打一眼泉，雨露滋润心田；青年节我被青春撞了一下腰',
      isswitch: 1
    },
    {
      id: 11,
      name: '母亲节',
      calendar: 'gregorian',  // 公历
      date: '2018.5.13',
      area: [],
      sendtime: '-1',  // 当天
      message: '没有太阳，花儿就不能开放；没有母亲，就没有诗人和英雄，就没有整个世界。感恩母亲',
      isswitch: 1
    },
    {
      id: 10,
      name: '端午节',
      calendar: 'lunar',  // 农历
      date: '2018.5.5',
      area: [],
      sendtime: '0',  // 当天
      message: '《红豆》寄相思,《糯米》呈祝愿,《大红枣》报平安，《荷叶》打个包，祝您端午快乐',
      isswitch: 1
    },
    {
      id: 9,
      name: '儿童节',
      calendar: 'gregorian',  // 公历
      date: '2018.6.1',
      area: [],
      sendtime: '0',  // 当天
      message: '细数年轻的梦，轻拂幻想的风；依恋年少的雨，踏寻纯真的心；你我悄悄长大，童年依然美丽',
      isswitch: 1
    },
    {
      id: 8,
      name: '环境日',
      calendar: 'gregorian',  // 公历
      date: '2018.6.5',
      area: [],
      sendtime: '0',  // 当天
      message: '大风起兮沙尘扬，雾霾一片风暴狂。大气污染受影响，人类生活也遭殃。世界环境日保卫家园',
      isswitch: 1
    },
    {
      id: 7,
      name: '父亲节',
      calendar: 'gregorian',  // 公历
      date: '2018.6.17',
      area: [],
      sendtime: '-1',  // 当天
      message: '父爱如山，遮阴挡风避凉。父爱如酒，醇厚沁心绵长。又到父亲节，祝愿天下所有的父亲',
      isswitch: 1
    },
    {
      id: 6,
      name: '建军节',
      calendar: 'gregorian',  // 公历
      date: '2018.8.1',
      area: [],
      sendtime: '0',  // 当天
      message: '每个男人都有一个当兵的梦，渴望凤凰涅槃浴火重生的成熟，何不八一看个拯救片，梦一会',
      isswitch: 1
    },
    {
      id: 5,
      name: '七夕节',
      calendar: 'lunar',  // 农历
      date: '2018.7.7',
      area: [],
      sendtime: '0',  // 当天
      message: '月上林梢头，人约黄昏后。七夕鹊桥见，情谊两绵绵。无语相见事，尽在不言中，不离不弃',
      isswitch: 1
    },
    {
      id: 4,
      name: '教师节',
      calendar: 'gregorian',  // 公历
      date: '2018.9.10',
      area: [],
      sendtime: '-1',  // 当天
      message: '难忘的校园时光，有着难忘的师生情怀；坦诚的学生时代，有着老师孜孜不倦的教诲',
      isswitch: 1
    },
    {
      id: 3,
      name: '国庆',
      calendar: 'gregorian',  // 公历
      date: '2018.10.1',
      area: [],
      sendtime: '0',  // 当天
      message: '秋风红叶，丹桂飘香，天高云淡，大雁南飞，一叶落知天下秋，金秋十月愿您乐悠悠',
      isswitch: 1
    },
    {
      id: 2,
      name: '中秋',
      calendar: 'lunar',  // 农历
      date: '2018.8.15',
      area: [],
      sendtime: '0',  // 当天
      message: '独在异乡为异客，每逢佳节倍思亲。在远方的我们愿中秋佳节与您相伴',
      isswitch: 1
    },
    {
      id: 1,
      name: '重阳节',
      calendar: 'lunar',  // 农历
      date: '2018.9.9',
      area: [],
      sendtime: '0',  // 当天
      message: '青青茱萸，悠悠我心，暂折一枝表情意；登高望远，一览无余；九九重阳，久久祝福',
      isswitch: 1
    }
  ],
  // 节气列表
  solarterm_list: [
    {
      id: 1,
      name: '大寒',
      calendar: 'gregorian',  // 农公历历
      date: '2019.01.20',
      area: [],
      sendtime: '0',  // 当天
      message: '《大寒》江山十日雪,雪深江雾浓，起来望樊山,但见群玉峰',
      isswitch: 1
    },
    {
      id: 2,
      name: '小寒',
      calendar: 'gregorian',  // 农公历历
      date: '2019.01.05',
      area: [],
      sendtime: '0',  // 当天
      message: '《小寒》东风吹雨小寒生，杨柳飞花乱晚晴，客子从今无可恨，窦家园里有莺声',
      isswitch: 1
    },
    {
      id: 3,
      name: '冬至',
      calendar: 'gregorian',  // 农公历历
      date: '2018.12.22',
      area: [],
      sendtime: '0',  // 当天
      message: '《冬至》天时人事日相催,冬至阳生春又来，岸容待腊将舒柳,山意冲寒欲放梅',
      isswitch: 1
    },
    {
      id: 4,
      name: '大雪',
      calendar: 'gregorian',  // 农公历历
      date: '2018.12.07',
      area: [],
      sendtime: '0',  // 当天
      message: '《大雪》江南江北雪漫漫，遥知易水寒，同云深处望三关，断肠山又山',
      isswitch: 1
    },
    {
      id: 5,
      name: '小雪',
      calendar: 'gregorian',  // 农公历历
      date: '2018.11.22',
      area: [],
      sendtime: '0',  // 当天
      message: '《小雪》花雪随风不厌看，更多还肯失林峦，愁人正在书窗下，一片飞来一片寒',
      isswitch: 1
    },
    {
      id: 6,
      name: '立冬',
      calendar: 'gregorian',  // 农公历历
      date: '2018.11.07',
      area: [],
      sendtime: '0',  // 当天
      message: '《立冬》细雨生寒未有霜，庭前木叶半青黄，小春此去无多日，何处梅花一绽香',
      isswitch: 1
    },
    {
      id: 7,
      name: '霜降',
      calendar: 'gregorian',  // 农公历历
      date: '2018.10.23',
      area: [],
      sendtime: '0',  // 当天
      message: '《霜降》北风降霜松柏雕，天形惨澹光景销，山河夜半失故处，何地藏舟无动摇',
      isswitch: 1
    },
    {
      id: 8,
      name: '寒露',
      calendar: 'gregorian',  // 农公历历
      date: '2018.10.08',
      area: [],
      sendtime: '0',  // 当天
      message: '《寒露》萧疏桐叶上,月白露初团.滴沥清光满,荧煌素彩寒.',
      isswitch: 1
    },
    {
      id: 9,
      name: '秋分',
      calendar: 'gregorian',  // 农公历历
      date: '2018.09.23',
      area: [],
      sendtime: '0',  // 当天
      message: '《秋分》秋风起兮云飞扬，草木黄落兮雁南归，树树秋声，山山寒色',
      isswitch: 1
    },
    {
      id: 10,
      name: '白露',
      calendar: 'gregorian',  // 农公历历
      date: '2018.09.08',
      area: [],
      sendtime: '0',  // 当天
      message: '《白露》蒹葭苍苍，白露为霜，所谓伊人，在水一方，溯游从之，宛在水中央',
      isswitch: 1
    },
    {
      id: 11,
      name: '处暑',
      calendar: 'gregorian',  // 农公历历
      date: '2018.08.23',
      area: [],
      sendtime: '0',  // 当天
      message: '《处暑》大漠沙如雪，燕山月似钩，何当金络脑，快走踏清秋',
      isswitch: 1
    },
    {
      id: 12,
      name: '立秋',
      calendar: 'gregorian',  // 农公历历
      date: '2018.08.07',
      area: [],
      sendtime: '0',  // 当天
      message: '《立秋》春眠不觉晓,  处处闻啼鸟.  夜来风雨声,  花落知多少',
      isswitch: 1
    },
    {
      id: 13,
      name: '大暑',
      calendar: 'gregorian',  // 农公历历
      date: '2018.07.23',
      area: [],
      sendtime: '0',  // 当天
      message: '《大暑》大暑不可避,微凉安所寻，云霄非浊世,竹树有清阴',
      isswitch: 1
    },
    {
      id: 14,
      name: '小暑',
      calendar: 'gregorian',  // 农公历历
      date: '2018.07.07',
      area: [],
      sendtime: '0',  // 当天
      message: '《小暑》倏忽温风至，因循小暑来，竹喧先觉雨，山暗已闻雷',
      isswitch: 1
    },
    {
      id: 15,
      name: '夏至',
      calendar: 'gregorian',  // 农公历历
      date: '2018.06.21',
      area: [],
      sendtime: '0',  // 当天
      message: '《夏至》杨柳青青江水平，闻郎岸上踏歌声，东边日出西边雨，道是无晴却有晴。',
      isswitch: 1
    },
    {
      id: 16,
      name: '芒种',
      calendar: 'gregorian',  // 农公历历
      date: '2018.06.06',
      area: [],
      sendtime: '0',  // 当天
      message: '《芒种》芒种初过雨及时,纱厨睡起角巾欹，绿树晚凉鸠语闹,画梁昼寂燕归迟',
      isswitch: 1
    },
    {
      id: 17,
      name: '小满',
      calendar: 'gregorian',  // 农公历历
      date: '2018.05.21',
      area: [],
      sendtime: '0',  // 当天
      message: '《小满》夜莺啼绿柳,皓月醒长空，最爱垄头麦,迎风笑落红',
      isswitch: 1
    },
    {
      id: 18,
      name: '立夏',
      calendar: 'gregorian',  // 农公历历
      date: '2018.05.05',
      area: [],
      sendtime: '0',  // 当天
      message: '《立夏》斗指东南，维为立夏，万物至此皆长大，故名立夏也；蝼蝈鸣，王瓜生，苦菜秀',
      isswitch: 1
    },
    {
      id: 19,
      name: '谷雨',
      calendar: 'gregorian',  // 农公历历
      date: '2018.04.20',
      area: [],
      sendtime: '0',  // 当天
      message: '《谷雨》随风潜入夜，润物细无声；柳絮飞落，杜鹃夜啼，牡丹吐蕊，樱桃红熟，雨生百谷',
      isswitch: 1
    },
    {
      id: 20,
      name: '清明',
      calendar: 'gregorian',  // 农公历历
      date: '2018.04.05',
      area: [],
      sendtime: '0',  // 当天
      message: '《清明》清明时节雨纷纷，荡秋千、踏青、放风筝、插柳、赏桃李好时节',
      isswitch: 1
    },
    {
      id: 21,
      name: '春分',
      calendar: 'gregorian',  // 农公历历
      date: '2018.03.21',
      area: [],
      sendtime: '0',  // 当天
      message: '《春分》雪入春分省见稀，半开桃杏不胜威',
      isswitch: 1
    },
    {
      id: 22,
      name: '惊蛰',
      calendar: 'gregorian',  // 农公历历
      date: '2019.03.06',
      area: [],
      sendtime: '0',  // 当天
      message: '《惊蛰》春雷乍动，惊醒了蛰伏在土壤中冬眠的动物',
      isswitch: 1
    },
    {
      id: 23,
      name: '雨水',
      calendar: 'gregorian',  // 农公历历
      date: '2019.02.19',
      area: [],
      sendtime: '0',  // 当天
      message: '《雨水》万物开始萌动，春天就要到了，桃李含苞，樱桃花开',
      isswitch: 1
    },
    {
      id: 24,
      name: '立春',
      calendar: 'gregorian',  // 农公历历
      date: '2019.02.04',
      area: [],
      sendtime: '0',  // 当天
      message: '《立春》野火烧不尽，春风吹又生；万物复苏生机勃勃，一年四季从此开始了',
      isswitch: 1
    }
  ],
  //恶劣天气列表
  bad_weather_list: [
    {
      id: 1,
      name: '道路结冰',
      level: ['yellow', 'origin', 'red'],
      area: [],
      sendtime: '0',
      message: '',
      is_ai_message: 'ai',
      isswitch: 1,
      hasTypes: [
        {
          name: '',
          value: ''
        }, {
          name: '黄色预警',
          value: 'yellow'
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '红色预警',
          value: 'red'
        }
      ]
    }, {
      id: 2,
      name: '暴雪',
      level: ['blue', 'yellow', 'origin', 'red'],
      area: [],
      sendtime: '0',
      message: '',
      is_ai_message: 'ai',
      isswitch: 1,
      hasTypes: [
        {
          name: '蓝色预警',
          value: 'blue'
        }, {
          name: '黄色预警',
          value: 'yellow'
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '红色预警',
          value: 'red'
        }
      ]
    }, {
      id: 3,
      name: '暴雨',
      level: ['blue', 'yellow', 'origin', 'red'],
      area: [],
      sendtime: '0',
      is_ai_message: 'ai',
      message: '',
      isswitch: 1,
      hasTypes: [
        {
          name: '蓝色预警',
          value: 'blue'
        }, {
          name: '黄色预警',
          value: 'yellow'
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '红色预警',
          value: 'red'
        }
      ]
    }, {
      id: 4,
      name: '冰雹',
      level: ['origin', 'red'],
      area: [],
      sendtime: '0',
      is_ai_message: 'ai',
      message: '',
      isswitch: 1,
      hasTypes: [
        {
          name: '',
          value: ''
        }, {
          name: '',
          value: ''
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '红色预警',
          value: 'red'
        }
      ]
    }, {
      id: 5,
      name: '大风',
      level: ['blue', 'yellow', 'origin', 'red'],
      area: [],
      sendtime: '0',
      is_ai_message: 'ai',
      message: '',
      isswitch: 1,
      hasTypes: [
        {
          name: '蓝色预警',
          value: 'blue'
        }, {
          name: '黄色预警',
          value: 'yellow'
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '红色预警',
          value: 'red'
        }
      ]
    }, {
      id: 6,
      name: '大雾',
      level: ['yellow', 'origin', 'red'],
      area: [],
      sendtime: '0',
      is_ai_message: 'ai',
      message: '',
      isswitch: 1,
      hasTypes: [
        {
          name: '',
          value: ''
        }, {
          name: '黄色预警',
          value: 'yellow'
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '红色预警',
          value: 'red'
        }
      ]
    }, {
      id: 7,
      name: '高温',
      level: ['yellow', 'origin', 'red'],
      area: [],
      sendtime: '0',
      is_ai_message: 'ai',
      message: '',
      isswitch: 1,
      hasTypes: [
        {
          name: '',
          value: ''
        }, {
          name: '黄色预警',
          value: 'yellow'
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '红色预警',
          value: 'red'
        }
      ]
    }, {
      id: 8,
      name: '干旱',
      level: ['origin', 'red'],
      area: [],
      sendtime: '0',
      is_ai_message: 'ai',
      message: '',
      isswitch: 1,
      hasTypes: [
        {
          name: '',
          value: ''
        }, {
          name: '',
          value: ''
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '红色预警',
          value: 'red'
        }
      ]
    }, {
      id: 9,
      name: '寒潮',
      level: ['blue', 'yellow', 'origin', 'red'],
      area: [],
      sendtime: '0',
      is_ai_message: 'ai',
      message: '',
      isswitch: 1,
      hasTypes: [
        {
          name: '蓝色预警',
          value: 'blue'
        }, {
          name: '黄色预警',
          value: 'yellow'
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '红色预警',
          value: 'red'
        }
      ]
    }, {
      id: 10,
      name: '雷电',
      level: ['yellow', 'origin', 'red'],
      area: [],
      sendtime: '0',
      is_ai_message: 'ai',
      message: '',
      isswitch: 1,
      hasTypes: [
        {
          name: '',
          value: ''
        }, {
          name: '黄色预警',
          value: 'yellow'
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '红色预警',
          value: 'red'
        }
      ]
    }, {
      id: 11,
      name: '霾',
      level: ['yellow', 'origin', 'red'],
      area: [],
      sendtime: '0',
      is_ai_message: 'ai',
      message: '',
      isswitch: 1,
      hasTypes: [
        {
          name: '',
          value: ''
        }, {
          name: '黄色预警',
          value: 'yellow'
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '红色预警',
          value: 'red'
        }
      ]
    }, {
      id: 12,
      name: '沙尘暴',
      level: ['blue', 'yellow', 'origin', 'red'],
      area: [],
      sendtime: '0',
      is_ai_message: 'ai',
      message: '',
      isswitch: 1,
      hasTypes: [
        {
          name: '蓝色预警',
          value: 'blue'
        }, {
          name: '黄色预警',
          value: 'yellow'
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '红色预警',
          value: 'red'
        }
      ]
    }, {
      id: 13,
      name: '霜冻',
      level: ['blue', 'yellow', 'origin'],
      area: [],
      sendtime: '0',
      is_ai_message: 'ai',
      message: '',
      isswitch: 1,
      hasTypes: [
        {
          name: '蓝色预警',
          value: 'blue'
        }, {
          name: '黄色预警',
          value: 'yellow'
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '',
          value: ''
        }
      ]
    }, {
      id: 14,
      name: '台风',
      level: ['blue', 'yellow', 'origin', 'red'],
      area: [],
      sendtime: '0',
      is_ai_message: 'ai',
      message: '',
      isswitch: 1,
      hasTypes: [
        {
          name: '蓝色预警',
          value: 'blue'
        }, {
          name: '黄色预警',
          value: 'yellow'
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '红色预警',
          value: 'red'
        }
      ]
    }, {
      id: 15,
      name: '未知',
      level: ['blue', 'yellow', 'origin', 'red'],
      area: [],
      sendtime: '0',
      is_ai_message: 'ai',
      message: '',
      isswitch: 1,
      hasTypes: [
        {
          name: '蓝色预警',
          value: 'blue'
        }, {
          name: '黄色预警',
          value: 'yellow'
        }, {
          name: '橙色预警',
          value: 'origin'
        }, {
          name: '红色预警',
          value: 'red'
        }
      ]
    }
  ],
  // 成果详单、推送记录、退订记录、千牛任务 表格注释
  table_tooltip: {
    回购nn下单时间: '在营销信息发送成功后，客户的回购订单拍下时间',
    加购nn下单时间: '在营销信息发送成功后，客户的加购订单拍下时间',
    // 下单时间: '本次营销发送之前的上一次购物行为（合并订单）拍下时间',
    本次nn下单时间: '本次营销触发订单的主订单拍下时间（注意这个指主订单，不是指合并订单）',
    上次nn下单时间: '本次营销发送之前的上一次购物行为（合并订单）拍下时间',
    复购nn下单时间: '在营销信息发送成功后，客户的复购订单拍下时间',
    挽回nn下单时间: '在营销信息发送成功后，客户挽回后订单拍下时间',
    激活nn下单时间: '在营销信息发送成功后，客户激活后订单拍下时间',
    回购nn订单金额: '在营销信息发送成功后，客户的回购订单拍下订单金额',
    加购nn订单金额: '在营销信息发送成功后，客户的加购订单拍下订单金额',
    // 订单金额: '本次营销发送之前的上一次购物行为（合并订单）总金额',
    上次nn订单金额: '本次营销发送之前的上一次购物行为（合并订单）订单总金额',
    本次nn订单金额: '本次营销触发订单的主订单总金额（注意这个指主订单，不是指合并订单）',
    复购nn订单金额: '在营销信息发送成功后，客户的复购订单拍下订单金额',
    挽回nn订单金额: '在营销信息发送成功后，客户挽回后订单拍下订单金额',
    激活nn订单金额: '在营销信息发送成功后，客户激活后订单拍下订单金额',
    本次营销nn间隔时间: '本次营销发送时间（减）买家上次购物行为签收时间的时间差',
    催付间隔时间: '催付提醒发送时间（减）订单拍下时间的时间差',
    提醒间隔: '本次提醒发送时间（减）买家上次购物订单交易成功时间的时间差',
    回购nn订单状态: '在营销信息发送成功后，客户的回购订单状态',
    加购nn订单状态: '在营销信息发送成功后，客户的加购订单状态',
    // 订单状态: '本次营销发送之前的上一次购物行为（合并订单）状态',
    上次nn订单状态: '本次营销发送之前的上一次购物行为（合并订单）订单状态',
    本次nn订单状态: '本次营销触发订单的主订单状态（注意这个指主订单，不是指合并订单）',

    当前交易状态: '在营销信息发送成功时，客户的本次订单的状态',
    复购nn订单状态: '在营销信息发送成功后，客户的复购订单状态',
    挽回nn订单状态: '在营销信息发送成功后，客户挽回后订单状态',
    激活nn订单状态: '在营销信息发送成功后，客户激活后订单状态',
    营销时间: '本次营销信息的实际发送时间',
    本次nn营销时间: '指营销信息成功发送到买家的时间（千牛指客服完成点击发送给买家时间）',
    催付提醒时间: '本次催付提醒信息的实际发送时间',
    买家提醒nn推送时间: '本次买家提醒信息的实际发送时间',
    回购nn付款时间: '在营销信息发送成功后，客户的回购订单付款时间',
    加购nn付款时间: '在营销信息发送成功后，客户的加购订单付款时间',
    // 付款时间: '本次营销发送之前的上一次购物行为（合并订单）付款时间',
    上次nn付款时间: '本次营销发送之前的上一次购物行为（合并订单）订单付款时间',
    本次nn付款时间: '本次营销触发订单的主订单付款时间（注意这个指主订单，不是指合并订单）',
    复购nn付款时间: '在营销信息发送成功后，客户的复购订单付款时间',
    挽回nn付款时间: '在营销信息发送成功后，客户挽回的订单付款时间',
    激活nn付款时间: '在营销信息发送成功后，客户激活的订单付款时间',
    回购成功时间差: '在营销信息发送成功后，客户回购订单拍下时间（减）对应营销信息发送时间的时间差（统计有效期内存在多次营销的以最靠近回购订单拍下时间为准）',
    加购成功时间差: '在营销信息发送成功后，客户加购订单拍下时间（减）对应营销信息发送时间的时间差（统计有效期内存在多次营销的以最后一次为准）',
    复购成功时间差: '在营销信息发送成功后，客户复购订单拍下时间（减）对应营销信息发送时间的时间差（统计有效期内存在多次营销的以最后一次为准）',
    催付成功时间差: '在催付信息发送成功后，客户催付订单付款时间（减）对应营销信息发送时间的时间差（统计有效期内存在多次催付的以最后一次为准）',
    提醒成功时间差: '在提醒信息发送成功后，客户评价时间（减）对应营销信息发送时间的时间差（统计有效期内存在多次提醒的以最后一次为准）',
    挽回成功时间差: '在挽回信息发送成功后，客户挽回订单拍下时间（减）对应营销信息发送时间的时间差（统计有效期内存在多次挽回的以最后一次为准）',
    激活成功时间差: '在激活信息发送成功后，客户激活订单拍下时间（减）对应营销信息发送时间的时间差（统计有效期内存在多次激活的以最后一次为准）',
    // 订单编号: '本次营销发送之前的上一次购物行为（合并订单中主订单）订单编号',
    上次nn订单编号: '本次营销发送之前的上一次购物行为（合并订单）订单编号',
    本次nn订单编号: '本次营销触发订单的主订单编号（注意这个指主订单，不是指合并订单）',
    加购nn订单编号: '本次营销后产生订单的主订单编号（注意这个指主订单，不是指合并订单）',
    复购nn订单编号: '在营销信息发送成功后，客户的复购订单编号',
    挽回nn订单编号: '在营销信息发送成功后，客户挽回订单编号',
    购物次数标签: '本次营销发送之前的买家以往的成功购物行为次数，以合并订单为基准，不包含本次购物行为。',
    CRM内会员级别: '指会员管理-会员等级分组-CRM内会员等级',
    营销手段: '指具体的推送通路方式，包括“短信、千牛、邮件、钉钉”等',
    催付手段: '指具体的推送通路方式，包括“短信、千牛、邮件、钉钉”等',
    推送手段: '指具体的推送通路方式，包括“短信、千牛、邮件、钉钉”等',
    本次nn营销手段: '指具体的推送通路方式，包括“短信、千牛、邮件、钉钉”等',
    快消品宝贝ID: '指推送给买家对应的快消品宝贝ID',
    非快消品宝贝ID: '指推送给买家对应的非快消品宝贝ID',
    催付轮次: '1代表一次催付、2代表二次催付、3代表临关闭催付',
    // 交易成功时间: '本次营销对应订单的交易成功时间',
    上次交易nn成功时间: '本次营销发送之前的上一次购物行为（合并订单）订单交易成功时间',
    本次交易nn成功时间: '本次营销触发订单的主订单交易成功时间（注意这个指主订单，不是指合并订单）',
    加购交易nn成功时间: '本次营销后产生订单的主订单交易成功时间（注意这个指主订单，不是指合并订单）',
    复购交易nn成功时间: '本次营销后产生订单的主订单交易成功时间（注意这个指主订单，不是指合并订单）',
    初评时间: '本次营销对应订单的初次评价时间',
    追评时间: '本次营销对应订单的追加评价时间',
    节假日: '本次营销对应的节假日',
    恶劣天气: '本次营销对应的恶劣天气',
    流失因素: '本次营销对应的触发流失因素',
    买家防御手段: '指具体的推送通路方式，包括“短信、千牛、邮件、钉钉”等',
    买家关怀手段: '指具体的推送通路方式，包括“短信、千牛、邮件、钉钉”等',
    买家提醒nn推送手段: '指具体的推送通路方式，包括“短信、千牛、邮件、钉钉”等',
    客服提醒手段: '指发送给客服具体的推送通路方式，包括“短信、千牛、邮件、钉钉”等',
    客服推送时间: '指发送给客服信息的实际发送时间',
    检测到关键字: '触发此次防御的关键字',
    礼品内容: '指买家对应的配置内-赠品设置-自动添加备注信息',
    加购成果时间差: '在营销信息发送成功后，客户加购成功拍下时间（减）对应营销信息发送时间',
    买家防御nn推送时间: '指本次防御营销信息的实际发送时间',
    营销状态: '指营销中的状态变化：已推送（信息已经推送暂未返回是否成功）、已营销（信息已经推送成功）、推送无效（信息推送失败）、营销失败（营销后在有效期内没有产生成果）、营销成功（营销后在有效期内产生成果）',
    本次nn营销状态: '指营销中的状态变化：已推送（信息已经推送暂未返回是否成功）、已营销（信息已经推送成功）、推送无效（信息推送失败）、营销失败（营销后在有效期内没有产生成果）、营销成功（营销后在有效期内产生成果）',
    本次营销时间间隔: '营销发送时间（减）买家上次购物签收时间',
    失败返还: '每天凌晨自动统计系统前天全天已扣费但后来返回发送失败的短信，并给予返还',
    退订时间: '买家回复退订短信时间',
    买家确认时间: '订单交易成功时间',
    买家购物nn总金额: '订单的总金额，含退款部分',
    加购买家购物总金额: '订单的总金额，含退款部分',
    复购买家购物总金额: '订单的总金额，含退款部分',
    买家退款nn总金额: '排除订单内已经退款的金额汇总',
    加购买家退款总金额: '排除订单内已经退款的金额汇总',
    复购买家退款总金额: '排除订单内已经退款的金额汇总',
    买家确认nn成功金额: '排除订单内已经退款的部分，确认成功交易的金额',
    加购买家确认成功金额: '排除订单内已经退款的部分，确认成功交易的金额',
    复购买家确认成功金额: '排除订单内已经退款的部分，确认成功交易的金额'


  },
  //双11双12阶梯下拉框选项
  SpecSendTime: [
    {
      label: '跟随场景',
      value: ''
    }, {
      label: '00:15',
      value: '00:15'
    }, {
      label: '00:30',
      value: '00:30'
    }, {
      label: '00:45',
      value: '00:45'
    }, {
      label: '01:00',
      value: '01:00'
    }, {
      label: '01:15',
      value: '01:15'
    }, {
      label: '01:30',
      value: '01:30'
    }, {
      label: '01:45',
      value: '01:45'
    }, {
      label: '02:00',
      value: '02:00'
    }, {
      label: '02:15',
      value: '02:15'
    }, {
      label: '02:30',
      value: '02:30'
    }, {
      label: '02:45',
      value: '02:45'
    }, {
      label: '03:00',
      value: '03:00'
    }, {
      label: '03:15',
      value: '03:15'
    }, {
      label: '03:30',
      value: '03:30'
    }, {
      label: '03:45',
      value: '03:45'
    }, {
      label: '04:00',
      value: '04:00'
    }, {
      label: '04:15',
      value: '04:15'
    }, {
      label: '04:30',
      value: '04:30'
    }, {
      label: '04:45',
      value: '04:45'
    }, {
      label: '05:00',
      value: '05:00'
    }, {
      label: '05:15',
      value: '05:15'
    }, {
      label: '05:30',
      value: '05:30'
    }, {
      label: '05:45',
      value: '05:45'
    }, {
      label: '06:00',
      value: '06:00'
    }, {
      label: '06:15',
      value: '06:15'
    }, {
      label: '06:30',
      value: '06:30'
    }, {
      label: '06:45',
      value: '06:45'
    }, {
      label: '07:00',
      value: '07:00'
    }, {
      label: '07:15',
      value: '07:15'
    }, {
      label: '07:30',
      value: '07:30'
    }, {
      label: '07:45',
      value: '07:45'
    }, {
      label: '08:00',
      value: '08:00'
    }, {
      label: '08:15',
      value: '08:15'
    }, {
      label: '08:30',
      value: '08:30'
    }, {
      label: '08:45',
      value: '08:45'
    }, {
      label: '09:00',
      value: '09:00'
    }, {
      label: '09:15',
      value: '09:15'
    }, {
      label: '09:30',
      value: '09:30'
    }, {
      label: '09:45',
      value: '09:45'
    }, {
      label: '10:00',
      value: '01:00'
    }, {
      label: '10:15',
      value: '10:15'
    }, {
      label: '10:30',
      value: '10:30'
    }, {
      label: '10:45',
      value: '10:45'
    }, {
      label: '11:00',
      value: '11:00'
    }, {
      label: '11:15',
      value: '11:15'
    }, {
      label: '11:30',
      value: '11:30'
    }, {
      label: '11:45',
      value: '11:45'
    }, {
      label: '12:00',
      value: '12:00'
    }, {
      label: '12:15',
      value: '12:15'
    }, {
      label: '12:30',
      value: '12:30'
    }, {
      label: '12:45',
      value: '12:45'
    }, {
      label: '13:00',
      value: '13:00'
    }, {
      label: '13:15',
      value: '13:15'
    }, {
      label: '13:30',
      value: '13:30'
    }, {
      label: '13:45',
      value: '13:45'
    }, {
      label: '14:00',
      value: '14:00'
    }, {
      label: '14:15',
      value: '14:15'
    }, {
      label: '14:30',
      value: '14:30'
    }, {
      label: '14:45',
      value: '14:45'
    }, {
      label: '15:00',
      value: '15:00'
    }, {
      label: '15:15',
      value: '15:15'
    }, {
      label: '15:30',
      value: '15:30'
    }, {
      label: '15:45',
      value: '15:45'
    }, {
      label: '16:00',
      value: '16:00'
    }, {
      label: '16:15',
      value: '16:15'
    }, {
      label: '16:30',
      value: '16:30'
    }, {
      label: '16:45',
      value: '16:45'
    }, {
      label: '17:00',
      value: '17:00'
    }, {
      label: '17:15',
      value: '17:15'
    }, {
      label: '17:30',
      value: '17:30'
    }, {
      label: '17:45',
      value: '17:45'
    }, {
      label: '18:00',
      value: '18:00'
    }, {
      label: '18:15',
      value: '18:15'
    }, {
      label: '18:30',
      value: '18:30'
    }, {
      label: '18:45',
      value: '18:45'
    }, {
      label: '19:00',
      value: '19:00'
    }, {
      label: '19:15',
      value: '19:15'
    }, {
      label: '19:30',
      value: '19:30'
    }, {
      label: '19:45',
      value: '19:45'
    }, {
      label: '20:00',
      value: '20:00'
    }, {
      label: '20:15',
      value: '20:15'
    }, {
      label: '20:30',
      value: '20:30'
    }, {
      label: '20:45',
      value: '20:45'
    }, {
      label: '21:00',
      value: '21:00'
    }, {
      label: '21:15',
      value: '21:15'
    }, {
      label: '21:30',
      value: '21:30'
    }, {
      label: '21:45',
      value: '21:45'
    }, {
      label: '22:00',
      value: '22:00'
    }, {
      label: '22:15',
      value: '22:15'
    }, {
      label: '22:30',
      value: '22:30'
    }, {
      label: '22:45',
      value: '22:45'
    }, {
      label: '23:00',
      value: '23:00'
    }, {
      label: '23:15',
      value: '23:15'
    }, {
      label: '23:30',
      value: '23:30'
    }, {
      label: '23:45',
      value: '23:45'
    }, {
      label: '24:00',
      value: '24:00'
    }
  ],
  // 短信插入关键字段
  shortList: [{
    name: '回TD退订',
    indexArea: [],
    len: 6
  }, {
    name: '<店铺短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<AI推荐商品短名>',
    indexArea: [],
    len: 10
  }, {
    name: '<买家ID>',
    indexArea: [],
    len: 10
  }, {
    name: '<收件人全名>',
    indexArea: [],
    len: 3
  }, {
    name: '<收件人地址>',
    indexArea: [],
    len: 30
  }, {
    name: '<收货人>',
    indexArea: [],
    len: 3
  }, {
    name: '<收货地址>',
    indexArea: [],
    len: 30
  }, {
    name: '<会员等级>',
    indexArea: [],
    len: 4
  }, {
    name: '<待付款金额>',
    indexArea: [],
    len: 7
  }, {
    name: '<付款短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<会员卡领取短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<优惠劵领取短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<AI推荐商品短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<已付款金额>',
    indexArea: [],
    len: 7
  }, {
    name: '<催付商品短名>',
    indexArea: [],
    len: 10
  }, {
    name: '<催付商品短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<待付款-付款短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<订单编号>',
    indexArea: [],
    len: 18
  }, {
    name: '<快递公司>',
    indexArea: [],
    len: 4
  }, {
    name: '<快递单号>',
    indexArea: [],
    len: 13
  }, {
    name: '<订单短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<主商品短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<订单主商品短名>',
    indexArea: [],
    len: 10
  }, {
    name: '<订单主商品短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<触发关键词原因>',
    indexArea: [],
    len: 2
  }, {
    name: '<退款商品短名>',
    indexArea: [],
    len: 10
  }, {
    name: '<退款商品短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<退款金额>',
    indexArea: [],
    len: 7
  }, {
    name: '<买家购买快消品短名>',
    indexArea: [],
    len: 10
  }, {
    name: '<买家购买快消品短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<快消品购买时间>',
    indexArea: [],
    len: 19
  }, {
    name: '<快消品价格>',
    indexArea: [],
    len: 7
  }, {
    name: '<买家购买非快消品短名>',
    indexArea: [],
    len: 10
  }, {
    name: '<买家购买非快消品短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<买家购买非快消品宝贝关怀语>',
    indexArea: [],
    len: 20
  }, {
    name: '<CRM内会员级别>',
    indexArea: [],
    len: 4
  }, {
    name: '<恶劣天气名称>',
    indexArea: [],
    len: 2
  }, {
    name: '<恶劣天气级别>',
    indexArea: [],
    len: 4
  }, {
    name: '<恶劣天气时间>',
    indexArea: [],
    len: 19
  }, {
    name: '<恶劣天气关怀语>',
    indexArea: [],
    len: 60
  }, {
    name: '<自动添加备注信息>',
    indexArea: [],
    len: 10
  }, {
    name: '<节假日名称>',
    indexArea: [],
    len: 3
  }, {
    name: '<节假日时间>',
    indexArea: [],
    len: 9
  }, {
    name: '<节假日问候语>',
    indexArea: [],
    len: 40
  }, {
    name: '<节气名称>',
    indexArea: [],
    len: 2
  }, {
    name: '<节气时间>',
    indexArea: [],
    len: 9
  }, {
    name: '<节气问候语>',
    indexArea: [],
    len: 40
  }, {
    name: '<流失因素>',
    indexArea: [],
    len: 4
  }, {
    name: '<收件人电话>',
    indexArea: [],
    len: 11
  }, {
    name: '<AI推荐聚划算商品短名>',
    indexArea: [],
    len: 10
  }, {
    name: '<AI推荐聚划算商品短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<AI推荐聚划算商品价格>',
    indexArea: [],
    len: 7
  }, {
    name: '<AI推荐聚划算商品折扣>',
    indexArea: [],
    len: 5
  }, {
    name: '<AI推荐聚划算商品开始时间>',
    indexArea: [],
    len: 19
  }, {
    name: '<AI推荐淘抢购商品短名>',
    indexArea: [],
    len: 10
  }, {
    name: '<AI推荐淘抢购商品短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<AI推荐淘抢购商品价格>',
    indexArea: [],
    len: 7
  }, {
    name: '<AI推荐淘抢购商品折扣>',
    indexArea: [],
    len: 5
  }, {
    name: '<AI推荐淘抢购商品开始时间>',
    indexArea: [],
    len: 19
  }, {
    name: '<AI推荐品牌团商品短名>',
    indexArea: [],
    len: 10
  }, {
    name: '<AI推荐品牌团商品短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<AI推荐品牌团商品价格>',
    indexArea: [],
    len: 7
  }, {
    name: '<AI推荐品牌团商品折扣>',
    indexArea: [],
    len: 5
  }, {
    name: '<AI推荐品牌团商品开始时间>',
    indexArea: [],
    len: 19
  }, {
    name: '<AI推荐活动商品短名>',
    indexArea: [],
    len: 10
  }, {
    name: '<AI推荐活动商品短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<AI推荐活动商品价格>',
    indexArea: [],
    len: 7
  }, {
    name: '<AI推荐活动商品折扣>',
    indexArea: [],
    len: 5
  }, {
    name: '<AI推荐活动商品开始时间>',
    indexArea: [],
    len: 19
  }, {
    name: '<AI推荐618商品短名>',
    indexArea: [],
    len: 10
  }, {
    name: '<AI推荐618商品短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<AI推荐618商品价格>',
    indexArea: [],
    len: 7
  }, {
    name: '<AI推荐618商品折扣>',
    indexArea: [],
    len: 5
  }, {
    name: '<AI推荐618商品开始时间>',
    indexArea: [],
    len: 19
  }, {
    name: '<AI推荐新品商品价格>',
    indexArea: [],
    len: 7
  }, {
    name: '<AI推荐新品商品折扣>',
    indexArea: [],
    len: 5
  }, {
    name: '<AI推荐新品商品开始时间>',
    indexArea: [],
    len: 19
  }, {
    name: '<AI推荐会员专享商品价格>',
    indexArea: [],
    len: 7
  }, {
    name: '<AI推荐会员专享商品折扣>',
    indexArea: [],
    len: 5
  }, {
    name: '<AI推荐会员专享商品开始时间>',
    indexArea: [],
    len: 19
  }, {
    name: '<专享营销语>',
    indexArea: [],
    len: 10
  }, {
    name: '<AI推荐双11商品短名>',
    indexArea: [],
    len: 10
  }, {
    name: '<AI推荐双11商品短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<AI推荐双11商品折扣>',
    indexArea: [],
    len: 5
  }, {
    name: '<AI推荐双11商品价格>',
    indexArea: [],
    len: 7
  }, {
    name: '<AI推荐双12商品短名>',
    indexArea: [],
    len: 10
  }, {
    name: '<AI推荐双12商品短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<AI推荐双12商品折扣>',
    indexArea: [],
    len: 5
  }, {
    name: '<AI推荐双12商品价格>',
    indexArea: [],
    len: 7
  }, {
    name: '<宝贝短名>',
    indexArea: [],
    len: 10
  }, {
    name: '<宝贝短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<店铺会员卡领取短链>',
    indexArea: [],
    len: 17
  }, {
    name: '<触发异常原因>',
    indexArea: [],
    len: 7
  }],
  // 充值方式
  chargeWay: {
    P4PMONEY_SOFT: '商家订单充值',
    P4PMONEY_TAOBAO: '商家内购充值',
    P4PMONEY_ALIPAY: '商家支付宝充值',
    P4PMONEY_UNDER_LINE: '商家线下充值',
    P4PDONATE: '官方赠送',
    P4PSYSCORRECTION: '系统修正',
    P4PREFUND_SOFT: '商家订单退款',
    P4PREFUND_TAOBAO: '商家内购退款',
    P4PREFUND_ALIPAY: '商家支付宝退款',
    P4PREFUND_UNDER_LINE: '商家线下退款',
    P4PDONATE_RECALL: '官方赠送撤回',
  }
}
