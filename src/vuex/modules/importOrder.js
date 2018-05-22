import * as TYPE from '../type.constant'
import utils from '../../misc/utils'
import API_IMPORT_ORDER from '../../service/import.service'
import g_const from '../../misc/global.constant'
import moment from 'moment'
import store from "../store"

const state = {
  uploadFileData: {},
  importOrderData: [],
  filterImportOrderData: [],
  uploadSuccessCount: 0,
}

const getters = {
  uploadFileData: state => {
    return state.uploadFileData
  },
  importOrderData: state => {
    return state.importOrderData
  },
  filterImportOrderData: state => {
    return state.filterImportOrderData
  },
  uploadSuccessCount: state => {
    return state.uploadSuccessCount
  },
}

const actions = {
  getUploadFile({ commit }) {
    commit(TYPE.GET_UPLOAD_FILE)
  },
  doUploadFile({ commit }, file) {
    // commit(TYPE.DO_UPLOAD_FILE, data)
    API_IMPORT_ORDER.importUpload(file)
  },
  updateImportOrder({ commit }, pagination) {
    API_IMPORT_ORDER.getImportOrder().then(data => {
      commit(TYPE.UPDATE_IMPORT_ORDER, data)
      if (pagination) {
        commit(TYPE.GET_IMPORT_ORDER_BY_PARAM, pagination)
      }
    })
  },
  getImportOrderByParam({ commit }, pagination) {
    commit(TYPE.GET_IMPORT_ORDER_BY_PARAM, pagination)
  },
  updataUploadSuccessCount({ commit }, num) {
    commit(TYPE.UPDATE_UPLOAD_SUCCESS_NUM, num)
  },
  uploadComplete({ commit }, id) {
    return API_IMPORT_ORDER.uploadComplete(id)
  },
  createImportOrder({ commit, state }, groupName) {
    return new Promise((resolve, reject) => {
      API_IMPORT_ORDER.addImportOrder(groupName).then(o => {
        commit(TYPE.UPDATE_IMPORT_ORDER, o)
        resolve(o)
      })
    })
  },
}

const mutations = {
  [TYPE.GET_UPLOAD_FILE](state, data) {
    state.uploadFileData = data
  },
  [TYPE.UPDATE_IMPORT_ORDER](state, data) {
    state.importOrderData = data
  },
  [TYPE.GET_IMPORT_ORDER_BY_PARAM](state, pagination) {
    var ret = state.importOrderData.sort(function (a, b) {
      return moment(b.created_at) - moment(a.created_at)
    })
    state.filterImportOrderData = pagination.doPage(ret)
  },
  [TYPE.UPDATE_UPLOAD_SUCCESS_NUM](state, num) {
    state.uploadSuccessCount = num
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
