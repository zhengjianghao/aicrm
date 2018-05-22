import * as TYPE from '../type.constant'
import API_IMM from '../../views/homepage/immediateMarketing/imm.service'
import g_const from '../../misc/global.constant'
import API_MARKET from '../../service/marketing.service'
import utils from '../../misc/utils'
import store from '../store'
import moment from 'moment'

const state = {
  immSidebarData: [],
  immConfigData: [],        // 存储营销任务除配置外的其它信息
  immConfigConfData: {},     // 存储营销任务配置信息

}

const getters = {
  immSidebarData: state => {
    return state.immSidebarData
  },

  immConfigData: state => {
    return state.immConfigData
  },
  immConfigConfData: state => {
    return state.immConfigConfData
  }
}

const actions = {
  getImmConfigData({ commit }, id) {
     return new Promise((resolve,reject) => {
       API_IMM.getImmConfigData(id).then(data => {
          commit(TYPE.GET_IMM_CONFIG, {
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
          commit(TYPE.GET_IMM_CONFIG_CONF, JSON.stringify(data.filter_option))
       })
    })
  },
   refresh({ commit }, data) {
      commit(TYPE.GET_IMM_CONFIG, {
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
      // commit(TYPE.GET_IMM_CONFIG_CONF, JSON.stringify(data.filter_option))
  },
  // 修改营销任务配置
  updateImmConfigData({ commit }, [id, data]) {
      return API_IMM.updateImmConfigData(id, data)
  },
  // 删除营销任务
  deleteImmConfig({ commit }, id) {
      return API_MARKET.deleteMarketConfig(id)
  },
  // 另存营销任务配置
  saveAsImmConfigData({ commit }, [id, obj]) {
    return new Promise((resolve,reject) => {
       API_IMM.saveAsImmConfig(id, obj).then(data => {
          commit(TYPE.GET_IMM_CONFIG, {
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
          commit(TYPE.GET_IMM_CONFIG_CONF, JSON.stringify(data.filter_option))
       })
    })
  },
  // 修改营销任务名称
  renameImmMarketTask({commit, state}, [id, name]) {
    var task = state.immConfigData
    var conf = state.immConfigConfData
    if(typeof(conf) === 'string') {
      conf = JSON.parse(conf)
    }
    return API_IMM.renameImm(id, {
      title: name,
      start_time: task.start_time,
      end_time: task.end_time,
      filter_option: conf
    })
  },
  getImmSidebar({ commit }) {
    var mj = store.state.marketJob
    // 未加载营销列表，则加载
    if(!mj || !mj.length) {
      API_MARKET.getMarketingJob().then(data => {
        commit(TYPE.GET_IMM_SIDEBAR, data)
      })
    } else {
      commit(TYPE.GET_IMM_SIDEBAR, mj)
    }
  }
}

const mutations = {
  [TYPE.GET_IMM_CONFIG] (state, data) {
    state.immConfigData = data
  },
  [TYPE.GET_IMM_CONFIG_CONF] (state, data) {
    state.immConfigConfData = data
  },
  [TYPE.GET_IMM_SIDEBAR] (state, data) {
    var ret = []
    ret = API_MARKET.mergeMarketingData(g_const.HomepageSidebar, data)
    state.immSidebarData = ret
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
