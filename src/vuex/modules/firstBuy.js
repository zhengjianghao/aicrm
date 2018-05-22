import * as TYPE from '../type.constant'
import g_const from '../../misc/global.constant'
import API_MARKET from '../../service/marketing.service'
import store from '../store'
import moment from 'moment'

const state = {
  firstBuySidebarData: []
}

const getters = {
  firstBuySidebarData: state => {
    return state.firstBuySidebarData
  }
}

const actions = {
  getFirstBuySidebar({ commit }) {
    var mj = store.state.marketJob
    // 未加载营销列表，则加载
    if (!mj || !mj.length) {
      API_MARKET.getMarketingJob().then(data => {
        commit(TYPE.GET_FIRSTBUY_SIDEBAR, data)
      })
    } else {
      commit(TYPE.GET_FIRSTBUY_SIDEBAR, mj)
    }
  }
}

const mutations = {
  [TYPE.GET_FIRSTBUY_SIDEBAR](state, data) {
    //  data = data.concat([
    //   {
    //     title: '送优惠券',
    //     type: 'GIVECOUPON_P4P_SYS'
    //   },
    //   {
    //     title: '第二次买就送',
    //     type: 'SECONDGIVE_P4P_SYS'
    //   },
    //   {
    //     title: '新人专享折扣',
    //     type: 'NEWERDISCOUNT_P4P_SYS'
    //   },
    //   {
    //     title: '新人专享满减',
    //     type: 'NEWERFULLCUT_P4P_SYS'
    //   },
    //   {
    //     title: '新人买A+?？元优惠买B',
    //     type: 'NEWERBUYAANDOTHER_P4P_SYS'
    //   },
    //   {
    //     title: '新人A+B一起买优惠',
    //     type: 'NEWERBUYAANDB_P4P_SYS'
    //   },
    //   {
    //     title: '新人免邮+升级快递',
    //     type: 'NEWERFREESHIP_P4P_SYS'
    //   },
    //   {
    //     title: '跟随潜需式营销',
    //     type: 'PON_P4P_SYS'
    //   }

    //   ])
    var ret = []
    ret = API_MARKET.mergeMarketingData(g_const.FirstBuy, data)
    state.firstBuySidebarData = ret
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
