export default {
  updateTime: '2018-05-14 17:45:00',
  title: {
    topTitle: "魔方墙AI思维引擎CRM X1.0.051401更新：新开放退货退款、初评提醒和追评提醒三个场景！",
    boxTitle: "魔方墙AI思维引擎CRM X1.0.051401更新",
  },
  scene: {
    title: "新开放场景：",
    content: [
      {
        name: '退货退款',
        type: 'RETURNREFUND_P4P_SYS',
        path: '/lossPrevention/returnRefund/config',
        f_name: '退货退款'
      }, {
        name: '初评提醒',
        type: 'COMMENTREMIND_P4P_SYS',
        path: '/care/commentRemind/config',
        f_name: '评价'
      }, {
        name: '追评提醒',
        type: 'ADDITIONALREMIND_P4P_SYS',
        path: '/care/additionalRemind/config',
        f_name: '评价'
      }
    ]
  },
  // description: [
  //   //   {
  //   //   title: "系统优化：",
  //   //   content: ["优化预计消耗短信条数算法"
  //   //   ]
  //   // },
  //   // {
  //   //   title: "系统调整：",
  //   //   content: [
  //   //     "新增任意支付宝扫码支付功能！",
  //   //   ]
  //   // }
  // ],
  // notice: [{
  //   content: ["魔方墙AICRM 按效果分成版本X1.0正式上线！"
  //   ]
  // }],
}
