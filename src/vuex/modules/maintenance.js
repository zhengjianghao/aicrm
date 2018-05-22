import * as TYPE from '../type.constant'
import g_const from '../../misc/global.constant'
import API_MARKET from '../../service/marketing.service'
import store from '../store'
import moment from 'moment'

const state = {
  maintenanceSidebarData: []
}

const getters = {
  maintenanceSidebarData: state => {
    return state.maintenanceSidebarData
  }
}

const actions = {
  getMaintenanceSidebar({ commit }) {
    var mj = store.state.marketJob
    // 未加载营销列表，则加载
    if (!mj || !mj.length) {
      API_MARKET.getMarketingJob().then(data => {
        commit(TYPE.GET_MAINTENANCE_SIDEBAR, data)
      })
    } else {
      commit(TYPE.GET_MAINTENANCE_SIDEBAR, mj)
    }
  }
}

const mutations = {
  [TYPE.GET_MAINTENANCE_SIDEBAR](state, data) {
    //  data = data.concat([
    //   {
    //     title: '快消品关怀',
    //     type: 'FMGGCARE_P4P_SYS'
    //   },
    //   {
    //     title: '节假日问候',
    //     type: 'HOLIDAYCARE_P4P_SYS'
    //   },
    //   {
    //     title: '恶劣天气预警关怀',
    //     type: 'BADWEATHER_P4P_SYS'
    //   },
    //   {
    //     title: '礼品营销',
    //     type: 'GIFTMARKET_P4P_SYS'
    //   },
    //   {
    //     title: '非快消品关怀',
    //     type: 'NOFMGGCARE_P4P_SYS'
    //   },

    //   ])
    var ret = []
    ret = API_MARKET.mergeMarketingData(g_const.maintenance, data)
    state.maintenanceSidebarData = ret
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
