import * as TYPE from '../type.constant'
import API_IMM from '../../views/homepage/immediateMarketing/imm.service'
import g_const from '../../misc/global.constant'
import message from '../../service/message.service'
import market from '../../service/marketing.service'
import utils from '../../misc/utils'
import moment from 'moment'

const state = {
  chargeData: [],
  filterChargeData: [],
  costOrderData: [],
  buyMarketRecordData: [],
  filterBuyMarketRecordData: [],
  buyMarketList: []
}

const getters = {
  chargeData: state => state.chargeData,
  filterChargeData: state => state.filterChargeData,
  costOrderData: state => state.costOrderData,
  buyMarketRecordData: state => state.buyMarketRecordData,
  filterBuyMarketRecordData: state => state.filterBuyMarketRecordData,
  buyMarketList: state => state.buyMarketList
}

const actions = {
  // 充值记录
  getChargeData({ commit }, [pagination, search]) {
    message.getChargeData(search).then(data => {
      commit(TYPE.GET_CHARGE_DATAL, data)
      commit(TYPE.GET_CHARGE_DATAL_BY_PARAM, [pagination, ''])
    })
  },
  getChargeDataByParam({ commit }, [pagination, buyDateRang]) {
    commit(TYPE.GET_CHARGE_DATAL_BY_PARAM, [pagination, buyDateRang])
  },
  //消费记录
  getCostOrderData({ commit }, [pagination, buyDateRang, keyword]) {
    message.getCostOrderData(pagination, buyDateRang, keyword).then(data => {
      commit(TYPE.GET_COST_ORDER_DATA, data)
    })
  },
  // 购买场景记录
  getBuyMarketRecordData({ commit }, [pagination]) {
    market.getBuyMarketRecordData().then(data => {
      commit(TYPE.GET_BUY_MARKET_RECORD, data)
      commit(TYPE.GET_BUY_MARKET_RECORD_BY_PARAM, [pagination])
    })
  },
  getBuyMarketRecordDataByParam({ commit }, [pagination]) {
    commit(TYPE.GET_BUY_MARKET_RECORD_BY_PARAM, [pagination])
  },
  // 扩展场景列表
  getBuyMarketList({ commit }) {
    market.getBuyMarketList().then(data => {
      commit(TYPE.GET_BUY_MARKET_LIST, data)
    })
  }
}

const mutations = {

  [TYPE.GET_CHARGE_DATAL](state, data) {
    var temp = data.sort((a, b) => {
      return moment(b.pay_time).valueOf() - moment(a.pay_time).valueOf()
    })
    var _money = temp.length > 0 && temp[0].channel === '预付费'
    for (var i = 0; i < temp.length; i++) {
      temp[i].chargeOrder = temp.length - i
      if (_money) {
        temp[i].before_payment = utils.format_money(temp[i].before_payment, 3)
        temp[i].remain = utils.format_money(temp[i].remain, 3)
      }
    }
    state.chargeData = temp
  },
  [TYPE.GET_CHARGE_DATAL_BY_PARAM](state, [pagination, buyDateRang]) {
    var tempRet = state.chargeData.filter(o => {
      var buyDateRangOk = buyDateRang.length < 1 || buyDateRang[0] === null || moment(o.pay_time).isBetween(buyDateRang[0], moment(buyDateRang[1]).add(1, 'd'));
      if (buyDateRangOk) {
        return true
      } else {
        return false
      }
    })
    // for (var i = 0; i < tempRet.length; i++) {
    //   tempRet[i].chargeOrder = tempRet.length - i
    // }
    state.filterChargeData = pagination.doPage(tempRet)
  },
  [TYPE.GET_COST_ORDER_DATA](state, data) {
    var _meta = data.meta.pagination
    var temp = data.data.sort((a, b) => {
      // return moment(b.use_date).valueOf() - moment(a.use_date).valueOf()
      return b.use_date - a.use_date
    })
    var start_num = _meta.total - (_meta.currentPage - 1) * _meta.perPage
    for (var i = 0; i < temp.length; i++) {
      temp[i].chargeOrder = start_num - i
    }
    state.costOrderData = temp
  },

  [TYPE.GET_BUY_MARKET_RECORD](state, data) {
    var temp = data.sort((a, b) => {
      return moment(b.buy_date).valueOf() - moment(a.buy_date).valueOf()
    })
    for (var i = 0; i < temp.length; i++) {
      temp[i].chargeOrder = temp.length - i
    }
    state.buyMarketRecordData = temp
  },
  [TYPE.GET_BUY_MARKET_RECORD_BY_PARAM](state, [pagination]) {
    var tempRet = state.buyMarketRecordData
    state.filterBuyMarketRecordData = pagination.doPage(tempRet)
  },
  [TYPE.GET_BUY_MARKET_LIST](state, data) {
    var _data = {}
    for (var j in data) {
      _data[data[j].type + '_SYS'] = {
        pastDate: data[j].past_date,
        buys: data[j].buys
      }
    }
    var _allD = g_const.allMarket
    for (var i in _allD) {
      if (_allD[i].name != '效果分成') {
        for (var m in _allD[i].mainData) {
          for (var sub in _allD[i].mainData[m].submenus) {
            if (_allD[i].mainData[m].name == '体验不佳') {
              _allD[i].mainData[m].submenus[sub].pastDate = _data.EXPERIENCEPOOR_P4P_SYS ? _data.EXPERIENCEPOOR_P4P_SYS.pastDate : ''
              _allD[i].mainData[m].submenus[sub].buys = _data.EXPERIENCEPOOR_P4P_SYS ? _data.EXPERIENCEPOOR_P4P_SYS.buys : []
            } else {
              _allD[i].mainData[m].submenus[sub].pastDate = _data[_allD[i].mainData[m].submenus[sub].type] ? _data[_allD[i].mainData[m].submenus[sub].type].pastDate : ''
              _allD[i].mainData[m].submenus[sub].buys = _data[_allD[i].mainData[m].submenus[sub].type] ? _data[_allD[i].mainData[m].submenus[sub].type].buys : []
            }
          }
        }
      }
    }
    state.buyMarketList = [] // 为了使购买后列表刷新
    state.buyMarketList = _allD
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
