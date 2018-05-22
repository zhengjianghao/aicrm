import * as TYPE from '../type.constant'
import g_const from '../../misc/global.constant'
import API_MARKET from '../../service/marketing.service'
import store from '../store'
import moment from 'moment'

const state = {
  activateCustomerSidebarData: []
}

const getters = {
  activateCustomerSidebarData: state => {
    return state.activateCustomerSidebarData
  }
}

const actions = {
  getActivateCustomerSidebar({ commit }) {
    var mj = store.state.marketJob
    // 未加载营销列表，则加载
    if (!mj || !mj.length) {
      API_MARKET.getMarketingJob().then(data => {
        commit(TYPE.GET_ACTIVATECUSTOMER_SIDEBAR, data)
      })
    } else {
      commit(TYPE.GET_ACTIVATECUSTOMER_SIDEBAR, mj)
    }
  }
}

const mutations = {
  [TYPE.GET_ACTIVATECUSTOMER_SIDEBAR](state, data) {
    var ret = []
    ret = API_MARKET.mergeMarketingData(g_const.ActivateCustomer, [])
    state.activateCustomerSidebarData = ret
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
