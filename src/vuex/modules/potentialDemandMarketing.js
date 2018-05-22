import * as TYPE from '../type.constant'
import API_PON from '../../views/maintenance/potentialDemandMarketing/pon.service'
import g_const from '../../misc/global.constant'
import API_MARKET from '../../service/marketing.service'
import utils from '../../misc/utils'
import store from '../store'
import moment from 'moment'

const state = {
  ponSidebarData: [],
  ponConfigData: {},        // 存储营销任务除配置外的其它信息
  ponConfigConfData: {},     // 存储营销任务配置信息
}

const getters = {
  ponSidebarData: state => {
    return state.ponSidebarData
  },
  ponConfigData: state => {
    return state.ponConfigData
  },
  ponConfigConfData: state => {
    return state.ponConfigConfData
  },
}

const actions = {
  getPonConfigData({ commit }, id) {
     return new Promise((resolve,reject) => {
       API_PON.getPonConfigData(id).then(data => {
        commit(TYPE.GET_PON_CONFIG, {
          id: data.id,
          title: data.title,
          status: data.status,
          start_time: data.start_time,
          end_time: data.end_time,
          activity_time: data.activity_time,
          is_system: data.is_system,
          is_shared: data.is_shared,
          type: data.type
        })
        resolve(data)
        commit(TYPE.GET_PON_CONFIG_CONF, JSON.stringify(data.filter_option))
       })
    })
  },
   refresh({ commit }, data) {
      commit(TYPE.GET_PON_CONFIG, {
        id: data.id,
        title: data.title,
        status: data.status,
        start_time: data.start_time,
        end_time: data.end_time,
        activity_time: data.activity_time,
        is_system: data.is_system,
        is_shared: data.is_shared,
        type: data.type
      })
      // commit(TYPE.GET_PON_CONFIG_CONF, JSON.stringify(data.filter_option))
  },
  // 修改营销任务配置
  updatePonConfigData({ commit }, [id, data]) {
      return API_PON.updatePonConfigData(id, data)
  },
  // 删除营销任务
  deletePonConfig({ commit }, id) {
      return API_MARKET.deleteMarketConfig(id)
  },
  // 另存营销任务配置
  saveAsPonConfigData({ commit }, [id, obj]) {
    return new Promise((resolve,reject) => {
       API_PON.saveAsPonConfig(id, obj).then(data => {
          commit(TYPE.GET_PON_CONFIG, {
            id: data.id,
            title: data.title,
            status: data.status,
            start_time: data.start_time,
            end_time: data.end_time,
            activity_time: data.activity_time,
            is_system: data.is_system,
            is_shared: data.is_shared,
            type: data.type
          })
          resolve(data)
          commit(TYPE.GET_PON_CONFIG_CONF, JSON.stringify(data.filter_option))
       })
    })
  },
  // 修改营销任务名称
  renamePonMarketTask({commit, state}, [id, name]) {
    var task = state.ponConfigData
    var conf = state.ponConfigConfData
    if(typeof(conf) === 'string') {
      conf = JSON.parse(conf)
    }
    return API_PON.renamePon(id, {
      title: name,
      start_time: task.start_time,
      end_time: task.end_time,
      filter_option: conf
    })
  },
  getPonSidebar({ commit }) {
    var mj = store.state.marketJob
    // 未加载营销列表，则加载
    if(!mj || !mj.length) {
      API_MARKET.getMarketingJob().then(data => {
        commit(TYPE.GET_PON_SIDEBAR, data)
      })
    } else {
      commit(TYPE.GET_PON_SIDEBAR, mj)
    }
  }
}

const mutations = {
  [TYPE.GET_PON_CONFIG] (state, data) {
    state.ponConfigData = data
  },
  [TYPE.GET_PON_CONFIG_CONF] (state, data) {
    state.ponConfigConfData = data
  },
  [TYPE.GET_PON_SIDEBAR] (state, data) {
    var ret = []
    ret = API_MARKET.mergeMarketingData(g_const.ponSidebar, data)
    state.ponSidebarData = ret
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
