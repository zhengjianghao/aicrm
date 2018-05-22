import * as TYPE from '../type.constant'
import API_MESSAGE from '../../service/message.service'
import g_const from '../../misc/global.constant'
import utils from '../../misc/utils'
import moment from 'moment'
import store from '../store.js'

const state = {
  contactListData: [],
  filterContactListData: [],
  contactGroupListData: [],
  filterContactGroupListData: [],
  sendDetailData: [],
  sendQuickDetail: [],
  messageTemplate: [],
  filterMessageTemplate: [],
  historyTemplate: [],
  filterHistoryTemplate: [],
  messageRoad: [],
  // updateMessageRoad: [],
  messageRoadNoChange: {},
  settingContact: {},
  updateSettingContact: [],
  settingGlobal: [],
  updateSettingGlobal: [],
  isCopy: false,
  isUpdateMesContent: false,
  quickSendMsgState: { // 速发短信全局状态信息，例如弹窗是否关闭
    isOpen: false // 默认速发短信弹窗状态为关闭
  }
}

const getters = {
  isUpdateMesContent: state => {
    return state.isUpdateMesContent
  },
  contactListData: state => {
    return state.contactListData
  },
  settingGlobal: state => {
    return state.settingGlobal
  },
  updateSettingGlobal: state => {
    return state.updateSettingGlobal
  },
  settingContact: state => {
    return state.settingContact
  },
  updateSettingContact: state => {
    return state.updateSettingContact
  },
  filterContactListData: state => {
    return state.filterContactListData
  },
  contactGroupListData: state => {
    return state.contactGroupListData
  },
  filterContactGroupListData: state => {
    return state.filterContactGroupListData
  },
  //速发短信发送明细
  sendDetailData: state => {
    return state.sendDetailData
  },
  sendQuickDetail: state => {
    return state.sendQuickDetail
  },
  messageTemplate: state => {
    return state.messageTemplate
  },
  filterMessageTemplate: state => {
    return state.filterMessageTemplate
  },
  historyTemplate: state => {
    return state.historyTemplate
  },
  filterHistoryTemplate: state => {
    return state.filterHistoryTemplate
  },
  messageRoad: state => {
    return state.messageRoad
  },
  messageRoadNoChange: state => {
    return state.messageRoadNoChange
  },
  updateMessageRoad: state => {
    return state.updateMessageRoad
  },
  isCopy: state => {
    return state.isCopy
  },
  quickSendMsgState: state => {
    return state.quickSendMsgState
  },
}

const actions = {
  updateMesContent({ commit }, data) {
    commit(TYPE.IS_UPDATE_MSG_CONTENT, data)
  },
  updateIsCopy({ commit }, data) {
    commit(TYPE.UPDATE_IS_COPY, data)
  },
  getContactList({ commit }, pagination) {
    return API_MESSAGE.contactList().then(data => {
      commit(TYPE.GET_CONTACT_LIST, data)
      commit(TYPE.GET_CONTACT_LIST_BY_PARAM, pagination)
    })
  },
  getContactListByParam({ commit }, pagination) {
    commit(TYPE.GET_CONTACT_LIST_BY_PARAM, pagination)
  },
  getContactGroupList({ commit }, pagination) {
    return API_MESSAGE.contactGroupList().then(data => {
      commit(TYPE.GET_CONTACT_GROUP_LIST, data)
      commit(TYPE.GET_CONTACT_GROUP_LIST_BY_PARAM, pagination)
    })
  },
  getContactGroupListByParam({ commit }, pagination) {
    commit(TYPE.GET_CONTACT_GROUP_LIST_BY_PARAM, pagination)
  },
  addContact({ commit }, obj) {
    return API_MESSAGE.addContact(obj)
  },
  deleteContact({ commit }, id) {
    return API_MESSAGE.deleteContact(id)
  },
  updateContact({ commit }, [id, obj]) {
    return API_MESSAGE.updateContact(id, obj)
  },
  addContactGroup({ commit }, groupName) {
    return API_MESSAGE.addContactGroup(groupName)
  },
  deleteContactGroup({ commit }, id) {
    return API_MESSAGE.deleteContactGroup(id)
  },
  updateContactGroupName({ commit }, [id, obj]) {
    return API_MESSAGE.updateContactGroupName(id, obj)
  },
  updateContactsInGroup({ commit }, [id, obj]) {
    return API_MESSAGE.updateContactsInGroup(id, obj)
  },
  //发送明细
  getSendDetail({ commit }, [pagination, dayCount, startDate, endDate, keyword]) {
    API_MESSAGE.getSendDetail(pagination, dayCount, startDate, endDate, keyword).then(data => {
      commit(TYPE.GET_SEND_DETAIL, data)
    })
  },
  getSendQuickDetail({ commit }, [pagination, dayCount, startDate, endDate, keyword]) {
    API_MESSAGE.getSendQuickDetail(pagination, dayCount, startDate, endDate, keyword).then(data => {
      commit(TYPE.GET_SEND_QUICK_DETAIL, data)
    })
  },
  //参考模板
  getMessageTemplate({ commit }, [pagination, list, market]) {
    API_MESSAGE.getMessageTemplate(list, market).then(data => {
      commit(TYPE.GET_MESSAGE_TEMPLATE, data)
      commit(TYPE.GET_MESSAGE_TEMPLATE_BY_PARAM, [pagination])
    })
  },
  getMessageTemplateByParam({ commit }, [pagination, name]) {
    commit(TYPE.GET_MESSAGE_TEMPLATE_BY_PARAM, [pagination])
  },
  getHistoryTemplate({ commit }, [pagination, list, market]) {
    API_MESSAGE.getHistoryTemplate(list, market).then(data => {
      commit(TYPE.GET_HISTORY_TEMPLATE, data)
      commit(TYPE.GET_HISTORY_TEMPLATE_BY_PARAM, [pagination])
    })
  },
  getHistoryTemplateByParam({ commit }, [pagination, name]) {
    commit(TYPE.GET_HISTORY_TEMPLATE_BY_PARAM, [pagination])
  },
  //使用模板
  useMessageTemplate({ commit }, [id, obj]) {
    return API_MESSAGE.useMessageTemplate(id, obj)
  },
  //发送测试
  testSend({ commit }, obj) {
    return API_MESSAGE.testSend(obj)
  },
  //短信通道
  getMessageRoad({ commit }) {
    API_MESSAGE.getMessageRoad().then(data => {
      commit(TYPE.GET_MESSAGE_ROAD, data)
    })
  },
  updateMessageRoad({ commit }, obj) {
    API_MESSAGE.updateMessageRoad(obj)
    // .then(data => {
    //   commit(TYPE.UPDATE_MESSAGE_ROAD, data)
    // })
  },
  //更新短信通道用于保存自动
  updateNochangeRoad({ commit }, data) {
    commit(TYPE.UPDATE_NO_CHANGE, data)
  },
  //更新短信通道data
  changeRoadData({ commit }, data) {
    commit(TYPE.CHANGE_ROAD_DATA, data)
  },
  //发送验证码
  sendVerifyCode({ commit }, mobile) {
    return API_MESSAGE.sendVerifyCode(mobile)
  },
  //获取安全设置信息
  getSettingContact({ commit }) {
    return new Promise((resolve, reject) => {
      API_MESSAGE.getSettingContact().then(
        data => {
          commit(TYPE.GET_SETTING_CONTACT, data)
          resolve(data)
        }
      )
    })
  },
  updateSettingContact({ commit }, obj) {
    return new Promise((resolve, reject) => {
      API_MESSAGE.updateSettingContact(obj).then(
        data => {
          commit(TYPE.UPDATE_SETTING_CONTACT, data)
          resolve(data)
        },
        res => {
          reject(res)
        }
      )
    })

  },
  //获取全局设置信息
  getSettingGlobal({ commit }) {
    API_MESSAGE.getSettingGlobal().then(data => {
      commit(TYPE.GET_SETTING_GLOBAL, data)
    })
  },
  updateSettingGlobal({ commit }, obj) {
    API_MESSAGE.updateSettingGlobal(obj).then(data => {
      commit(TYPE.UPDATE_SETTING_GLOBAL, data)
    })
  },
  updateQuickSendMsgState({ commit }, obj) {
    commit(TYPE.UPDATE_QUICK_SEND_MSG_STATE, obj)
  },
}

const mutations = {
  [TYPE.IS_UPDATE_MSG_CONTENT](state, data) {
    state.isUpdateMesContent = data
  },
  [TYPE.UPDATE_QUICK_SEND_MSG_STATE](state, data) {
    state.quickSendMsgState = data
  },
  [TYPE.UPDATE_IS_COPY](state, data) {
    state.isCopy = data
  },
  [TYPE.GET_CONTACT_LIST](state, data) {
    state.contactListData = data.sort((a, b) => {
      return b.id - a.id
    })
  },
  [TYPE.GET_CONTACT_LIST_BY_PARAM](state, pagination) {
    state.filterContactListData = pagination.doPage(state.contactListData)
  },
  [TYPE.GET_CONTACT_GROUP_LIST](state, data) {
    var ret = data.map(group => {
      var contactIds = group.contacts.map(obj => {
        return obj.id
      })
      group.contactIds = contactIds
      return group
    })
    state.contactGroupListData = ret
  },
  [TYPE.GET_CONTACT_GROUP_LIST_BY_PARAM](state, pagination) {
    var ret = state.contactGroupListData.sort((a, b) => {
      return b.id - a.id
    })
    state.filterContactGroupListData = pagination.doPage(state.contactGroupListData)
  },
  //发送明细
  [TYPE.GET_SEND_DETAIL](state, data) {
    var temp = utils.dirtyDataProcess(data)
    // 录视频要用
    var _sign = store.state.userData.sign
    var _username = store.state.userData.user_nick
    var _sign_change = ''
    if (_username == 'sky507ct' || _username == 'coffee711') {
      _sign_change = _sign.substr(0, 1) + _sign.substr(0, _sign.length - 2).replace(/./g, '*') + _sign.substr(-1)
    } else {
      _sign_change = _sign
    }
    temp.forEach(o => {
      // 标记给商家发送的短信
      if (o.name_type == 'seller') {
        o.buyer_nick = '商家'
      }
      // o.buyer_nick_change = o.buyer_nick.substr(0, 1) + o.buyer_nick.substr(0, o.buyer_nick.length - 2).replace(/./g, '*') + o.buyer_nick.substr(-1)
      // 在发送内容尾部追加 置顶文字
      if (o.content) {
        o.content = o.content.replace('回TD退订', '').replace('回T退订', '')
        o.content = o.content + ' 回TD退订'
        o.content = o.content.replace(_sign, _sign_change)
      }
    })
    if (state.settingGlobal.IS_HIDE_ID == 1) {
      temp.forEach(o => {
        o.buyer_nick = o.buyer_nick.substr(0, 1) + o.buyer_nick.substr(0, o.buyer_nick.length - 2).replace(/./g, '*') + o.buyer_nick.substr(-1)
        // o.tid_change = o.tid.replace(/(\d{1})\d{4}(\d{1})/, '$1************$2')
      })
    }
    state.sendDetailData = temp
  },
  //速发短信发送明细
  [TYPE.GET_SEND_QUICK_DETAIL](state, data) {
    state.sendQuickDetail = data
  },
  [TYPE.GET_MESSAGE_TEMPLATE](state, data) {
    state.messageTemplate = data
  },
  [TYPE.GET_MESSAGE_TEMPLATE_BY_PARAM](state, [pagination, name]) {
    // 临时模板集合
    var tempRet = state.messageTemplate;
    var final = []
    //系统推荐
    var _sysArray = tempRet.filter(data => {
      return data.from == '系统推荐'
    })
    //卖家分享
    var _shareArray = tempRet.filter(data => {
      return data.from == '卖家分享'
    })
    //按发布时间排序
    _sysArray.sort((a, b) => {
      return moment(b.created_at).valueOf() - moment(a.created_at).valueOf()
    })
    _shareArray.sort((a, b) => {
      return moment(b.created_at).valueOf() - moment(a.created_at).valueOf()
    })
    //系统模板在前面
    final = _sysArray.concat(_shareArray)
    state.filterMessageTemplate = pagination.doPage(final)
  },
  [TYPE.GET_HISTORY_TEMPLATE](state, data) {
    state.historyTemplate = data
  },
  [TYPE.GET_HISTORY_TEMPLATE_BY_PARAM](state, [pagination, name]) {
    // 临时模板集合
    var tempRet = state.historyTemplate;
    var final = tempRet.sort((a, b) => {
      return moment(b.created_at).valueOf() - moment(a.created_at).valueOf()
    })
    state.filterHistoryTemplate = pagination.doPage(final)
  },
  //短信通道设置
  [TYPE.GET_MESSAGE_ROAD](state, data) {
    state.messageRoadNoChange = data
    var ref = {}
    ref.CHANNEL_AI = data.CHANNEL_AI
    ref.CHANNEL_SWITCH = data.CHANNEL_SWITCH
    ref.types = []
    delete data.CHANNEL_AI
    delete data.CHANNEL_SWITCH
    var allMarketType = g_const.allMarketType
    for (var j in allMarketType) {
      var index = 0
      var state_test = ''
      for (var i in data) {
        if (allMarketType[j].type.indexOf(i + '_') == 0) {
          index++
          state_test = data[i]
          break
        }
      }
      if (index > 0) {
        ref.types.push({
          state: state_test,
          type: allMarketType[j].type,
          finishState: allMarketType[j].finishState
        })
      } else {
        ref.types.push({
          state: 'LOW',
          type: allMarketType[j].type,
          finishState: allMarketType[j].finishState
        })
      }
    }
    state.messageRoadNoChange.CHANNEL_AI = ref.CHANNEL_AI
    state.messageRoadNoChange.CHANNEL_SWITCH = ref.CHANNEL_SWITCH
    state.messageRoad = ref
  },
  //更新短信通道用于保存
  [TYPE.UPDATE_NO_CHANGE](state, data) {
    var _data = state.messageRoadNoChange
    if (data.name == 'road') {
      for (var i in _data) {
        if (i != 'CHANNEL_AI' && i != 'CHANNEL_SWITCH') {
          _data[i] = data.value
        }
      }
    } else if (data.name == 'CHANNEL_AI') {
      _data.CHANNEL_AI = data.value
    } else if (data.name == 'CHANNEL_SWITCH') {
      _data.CHANNEL_SWITCH = data.value
    } else {
      var _type = data.name.split('_')[0]
      _data[_type] = data.value
    }
    state.messageRoadNoChange = _data
  },
  //更新短信通道值
  [TYPE.CHANGE_ROAD_DATA](state, data) {
    var _data = state.messageRoad
    for (var i in _data.types) {
      _data.types[i].state = data
    }
    state.messageRoad = _data
  },
  // [TYPE.UPDATE_MESSAGE_ROAD](state, data) {
  //   console.log(data)
  //   // state.updateMessageRoad = data
  // },
  [TYPE.GET_SETTING_CONTACT](state, data) {
    state.settingContact = data
  },
  [TYPE.UPDATE_SETTING_CONTACT](state, data) {
    state.updateSettingContact = data
  },
  [TYPE.GET_SETTING_GLOBAL](state, data) {
    state.settingGlobal = data
  },
  [TYPE.UPDATE_SETTING_GLOBAL](state, data) {
    state.updateSettingGlobal = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
