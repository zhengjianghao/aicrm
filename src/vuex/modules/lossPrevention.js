import * as TYPE from '../type.constant'
import g_const from '../../misc/global.constant'
import API_MARKET from '../../service/marketing.service'
import store from '../store'
import moment from 'moment'

const state = {
  lossPreventionSidebarData: []
}

const getters = {
  lossPreventionSidebarData: state => {
    return state.lossPreventionSidebarData
  }
}

const actions = {
  getLossPreventionSidebar({ commit }) {
    var mj = store.state.marketJob
    // 未加载营销列表，则加载
    if (!mj || !mj.length) {
      API_MARKET.getMarketingJob().then(data => {
        commit(TYPE.GET_LOSSPREVENTION_SIDEBAR, data)
      })
    } else {
      commit(TYPE.GET_LOSSPREVENTION_SIDEBAR, mj)
    }
  }
}

const mutations = {
  [TYPE.GET_LOSSPREVENTION_SIDEBAR](state, data) {
    //  data = data.concat([
    //   {
    //     title: '快递运送超时',
    //     type: 'EXPRESSOUT_P4P_SYS'
    //   },
    //   {
    //     title: '无流转记录',
    //     type: 'NOTRANSFERRECORD_P4P_SYS'
    //   },
    //   {
    //     title: '流转异常时',
    //     type: 'TRANSFERREEOE_P4P_SYS'
    //   },
    //   {
    //     title: '假货怀疑',
    //     type: 'FAKESUSPECT_P4P_SYS'
    //   },
    //   {
    //     title: '质量不满',
    //     type: 'DISQUALITY_P4P_SYS'
    //   },
    //   {
    //     title: '欺诈行为',
    //     type: 'CHEATBEHAVIOR_P4P_SYS'
    //   },
    //   {
    //     title: '价格不满',
    //     type: 'DISPRICE_P4P_SYS'
    //   },
    //   {
    //     title: '承诺不兑现',
    //     type: 'PROMISENOCASH_P4P_SYS'
    //   },
    //   {
    //     title: '预期落差',
    //     type: 'EXPECTEDGAP_P4P_SYS'
    //   },
    //   {
    //     title: '物流问题',
    //     type: 'LOGISTICSPROBLEM_P4P_SYS'
    //   },
    //   {
    //     title: '未发货退款',
    //     type: 'NOSENDREFUND_P4P_SYS'
    //   },
    //   {
    //     title: '退货退款',
    //     type: 'RETURNREFUND_P4P_SYS'
    //   }

    //   ])
    var ret = []
    ret = API_MARKET.mergeMarketingData(g_const.LossPrevention, data)
    state.lossPreventionSidebarData = ret
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
