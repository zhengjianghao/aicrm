import * as TYPE from '../type.constant'
import g_const from '../../misc/global.constant'
import API_MARKET from '../../service/marketing.service'
import store from '../store'
import moment from 'moment'

const state = {
  careSidebarData: []
}

const getters = {
  careSidebarData: state => {
    return state.careSidebarData
  }
}

const actions = {
  getCareSidebar({ commit }) {
    var mj = store.state.marketJob
    // 未加载营销列表，则加载
    if (!mj || !mj.length) {
      API_MARKET.getMarketingJob().then(data => {
        commit(TYPE.GET_CARE_SIDEBAR, data)
      })
    } else {
      commit(TYPE.GET_CARE_SIDEBAR, mj)
    }
  }
}

const mutations = {
  [TYPE.GET_CARE_SIDEBAR](state, data) {
    // data = data.concat([
    //   {
    //   title: '大活动促销提醒',
    //   type: 'BIGEVENTREMIND_P4P_SYS'
    //   },
    //   {
    //     title: '默认付款关怀',
    //     type: 'PAYCARE_P4P_SYS'
    //   },
    //   {
    //     title: '默认发货提醒',
    //     type: 'DELIVERREMIND_P4P_SYS'
    //   },
    //   {
    //     title: '开始派送提醒',
    //     type: 'STARTSENDREMIND_P4P_SYS'
    //   },
    //   {
    //     title: '签收提醒',
    //     type: 'SIGNREMIND_P4P_SYS'
    //   },
    //   {
    //     title: '默认确认关怀',
    //     type: 'AFFIRMCARE_P4P_SYS'
    //   },
    //   {
    //     title: '会员卡领取提醒',
    //     type: 'CLUBCARDREMIND_P4P_SYS'
    //   },
    //   {
    //     title: '初评提醒',
    //     type: 'COMMENTREMIND_P4P_SYS'
    //   },
    //   {
    //     title: '追评提醒',
    //     type: 'ADDITIONALREMIND_P4P_SYS'
    //   },
    //   {
    //     title: '追评关怀',
    //     type: 'ADDITIONALCARE_P4P_SYS'
    //   },
    //   {
    //     title: '买家申请退货退款',
    //     type: 'APPLYRETURNREFUND_P4P_SYS'
    //   },
    //   {
    //     title: '卖家拒绝仅退款申请',
    //     type: 'REFUSEREFUND_P4P_SYS'
    //   },
    //   {
    //     title: '卖家拒绝退货退款申请',
    //     type: 'REFUSERETURNREFUND_P4P_SYS'
    //   },
    //   {
    //     title: '卖家同意退货退款申请',
    //     type: 'AGREERETURNREFUND_P4P_SYS'
    //   },
    //   {
    //     title: '买家退货被签收提醒',
    //     type: 'REFUNDSIGNREMIND_P4P_SYS'
    //   },
    //   {
    //     title: '退款成功提醒',
    //     type: 'SUCCESSREFUND_P4P_SYS'
    //   },
    // ])
    var ret = []
    ret = API_MARKET.mergeMarketingData(g_const.Care, data)
    state.careSidebarData = ret
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
