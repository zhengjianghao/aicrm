import * as TYPE from '../type.constant'
import g_const from '../../misc/global.constant'
import store from '../store'
import moment from 'moment'
import Vue from 'vue'

const state = {
  baseMConfigData: {},
  baseMCommonData: [],
  baseMConfigOriginalData: []
}

const getters = {
  baseMConfigData: state => {
    return state.baseMConfigData
  },
  baseMCommonData: state => {
    return state.baseMCommonData
  },
  baseMConfigOriginalData: state => {
    return state.baseMConfigOriginalData
  }

}

const actions = {
  updataBaseMConfigOriginal({ commit }, option) {
    var opt = ''
    if (typeof (option) !== 'string') {
      opt = JSON.stringify(option)
    } else {
      opt = option
    }
    commit(TYPE.UPDATE_BASE_MARKETING_ORIGINAL, JSON.parse(opt))
  },
  updataBaseMConfig({ commit }, baseConf) {
    commit(TYPE.UPDATE_BASE_MARKETING_CONFIG, baseConf)
  },
  emptyBaseMConfig({ commit }) {
    commit(TYPE.EMPTY_BASE_MARKETING_CONFIG)
  },
  updataBaseMCommon({ commit }, data) {
    commit(TYPE.UPDATE_BASE_MARKETING_COMMON, {
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
  },
  updataBaseMCommonSwitch({ commit, state }, taskSwitch) {
    var data = state.baseMCommonData
    commit(TYPE.UPDATE_BASE_MARKETING_COMMON, {
      id: data.id,
      title: data.title,
      status: taskSwitch ? g_const.marketingState.OPEN : g_const.marketingState.CLOSED,
      start_time: data.start_time,
      end_time: data.end_time,
      activity_time: data.activity_time,
      is_system: data.is_system,
      is_shared: data.is_shared,
      type: data.type
    })
  }
}

const mutations = {
  [TYPE.UPDATE_BASE_MARKETING_CONFIG](state, baseConf) {
    state.baseMConfigData = Object.assign({}, state.baseMConfigData, baseConf)
  },
  [TYPE.EMPTY_BASE_MARKETING_CONFIG](state) {
    state.baseMConfigData = {}
  },
  [TYPE.UPDATE_BASE_MARKETING_COMMON](state, data) {
    state.baseMCommonData = data
  },
  [TYPE.UPDATE_BASE_MARKETING_ORIGINAL](state, data) {
    state.baseMConfigOriginalData = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
