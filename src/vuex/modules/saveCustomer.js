import * as TYPE from '../type.constant'
import g_const from '../../misc/global.constant'
import API_MARKET from '../../service/marketing.service'
import store from '../store'
import moment from 'moment'

const state = {
  saveCustomerSidebarData: []
}

const getters = {
  saveCustomerSidebarData: state => {
    return state.saveCustomerSidebarData
  }
}

const actions = {
  getSaveCustomerSidebar({ commit }) {
    var mj = store.state.marketJob
    // 未加载营销列表，则加载
    if (!mj || !mj.length) {
      API_MARKET.getMarketingJob().then(data => {
        commit(TYPE.GET_SAVECUSTOMER_SIDEBAR, data)
      })
    } else {
      // 如果不转的话，对象marketJob将不能直接操作（否则会触发marketJob 的 watch）
      var _mj = JSON.parse(JSON.stringify(mj))
      commit(TYPE.GET_SAVECUSTOMER_SIDEBAR, _mj)
    }
  }
}

const mutations = {
  [TYPE.GET_SAVECUSTOMER_SIDEBAR](state, data) {
    //  data = data.concat([
    //   {
    //     title: '聚划算挽回',
    //     type: 'JHSREDEEM_P4P_SYS'
    //   },
    //   {
    //     title: '挽回会员专享活动',
    //     type: 'SAVEACTIVITY_P4P_SYS'
    //   },
    //   {
    //     title: '态度流失一览',
    //     type: 'ATTITUDELOSS_P4P_SYS'
    //   },
    //   {
    //     title: '致歉信',
    //     type: 'ALETTER_P4P_SYS'
    //   },
    //   {
    //     title: '淘抢购挽回',
    //     type: 'TQGREDEEM_P4P_SYS'
    //   },
    //   {
    //     title: '品牌团挽回',
    //     type: 'PPTREDEEM_P4P_SYS'
    //   },
    //   {
    //     title: '其他大型活动',
    //     type: 'OUTHERBIGACTIV_P4P_SYS'
    //   },
    //   {
    //     title: '同类型新品',
    //     type: 'SAMENER_P4P_SYS'
    //   },
    //   {
    //     title: '季节性新品',
    //     type: 'SEASONALNEW_P4P_SYS'
    //   },
    //   {
    //     title: '换代型新品',
    //     type: 'UPDATANEW_P4P_SYS'
    //   },
    //   {
    //     title: '配件型新品',
    //     type: 'PARTSNEW_P4P_SYS'
    //   },
    //   {
    //     title: '延伸型新品',
    //     type: 'EXPANDNEW_P4P_SYS'
    //   },
    //   {
    //     title: '电话致歉',
    //     type: 'PHONEEXCUSE_P4P_SYS'
    //   },
    //   {
    //     title: '邮件致歉',
    //     type: 'EMAILEXCUSE_P4P_SYS'
    //   },
    //   {
    //     title: '礼品+感谢信挽回',
    //     type: 'GIFTANDLETTER_P4P_SYS'
    //   }

    //   ])
    if (data) {
      data.unshift({
        title: '态度流失一览',
        id: '',
        type: 'ATTITUDELOSS_P4P_SYS',
        className: 'primary',
      })
    }
    var ret = []
    ret = API_MARKET.mergeMarketingData(g_const.SaveCustomer, data)
    state.saveCustomerSidebarData = ret
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
