import API_MEMBER from '../../service/member.service'
import API_MARKET from '../../service/marketing.service'
import g_const from '../../misc/global.constant'
import * as TYPE from '../type.constant'
import utils from '../../misc/utils'
import moment from 'moment'

const state = {
  memberGroupData: [],
  memberGroupTreeData: [],
  calMemberGroupTreeDate: [],
  memberListData: [],
  memberCategoryData: [],
  filterMemberListData: [],
  newAddGroupData: {},
  // memberDetailData: {
  //   id: [],
  //   data: []
  // },
  memberDetailData: {
    orders: [],
    marketings: [],
    loading: true
  },
  memberLevelData: [],
  memberLevelAiData: [],
  memberLevelCustomData: [],
  memberLevelAiCurrentData: [],
  blackGreyList: [] //添加灰黑名单列表数据
}

const getters = {
  memberLevelAiData: state => {
    return state.memberLevelAiData
  },
  memberLevelCustomData: state => {
    return state.memberLevelCustomData
  },
  memberGroupData: state => {
    return state.memberGroupData
  },
  memberListData: state => {
    return state.memberListData
  },
  memberCategoryData: state => {
    return state.memberCategoryData
  },
  filterMemberListData: state => {
    return state.filterMemberListData
  },
  newAddGroupData: state => {
    return state.newAddGroupData
  },
  memberGroupTreeData: state => {
    return state.memberGroupTreeData
  },
  calMemberGroupTreeDate: state => {
    return state.calMemberGroupTreeDate
  },
  memberDetailData: state => {
    return state.memberDetailData
  },
  blackListData: state => {
    return state.blackListData
  },
  greyListData: state => {
    return state.greyListData
  },
  filterBlackListData: state => {
    return state.filterBlackListData
  },
  filterGreyListData: state => {
    return state.filterGreyListData
  },
  memberLevelData: state => {
    return state.memberLevelData
  },
  memberLevelCurrentData: state => {
    return state.memberLevelCurrentData
  },
  blackGreyList: state => {
    return state.blackGreyList
  }


}

const actions = {
  getMemberGroup({ commit, state }) {
    return new Promise((resolve, reject) => {
      API_MEMBER.getCustomerGroup().then(data => {
        API_MEMBER.getCustomerCategory().then(c_data => {
          //  获取会员分类信息
          commit(TYPE.GET_MEMBER_CATEGORY, c_data)
          // 获取会员分组信息 (为左侧菜单栏、下拉框、会员管理主页准备)
          commit(TYPE.GET_MEMBER_GROUP, data)
          // 获取会员分组信息 (为左多选组件准备)
          commit(TYPE.GET_MEMBER_GROUP_TREE, state.memberGroupData)
          resolve(c_data)
        })
      })
    })
  },
  updateMemberGroupTree({ commit, state }) {
    if (state.memberGroupData) {
      commit(TYPE.GET_MEMBER_GROUP_TREE, state.memberGroupData)
    }
  },
  addMemberGroup({ commit }, data) {
    return API_MEMBER.addCustomeGroup(data).then(o => {
      commit(TYPE.GET_NEWADD_GROUP, o.data)
    })
  },
  getMemberListPage({ commit }, [id, pagination, search_word]) {
    return new Promise((resolve, reject) => {
      API_MEMBER.getCustomerList(id, pagination, search_word).then(data => {
        resolve(data)
        commit(TYPE.GET_MEMBER_LIST, data)
      })
    })
  },
  getMemberListMultiSearch({ commit }, [id, pagination, search_multi]) {
    API_MEMBER.getCustomerListMultiSearch(id, pagination, search_multi).then(data => {
      commit(TYPE.GET_MEMBER_LIST, data)
    })
  },
  getMemberList({ commit }, [id, pagination]) {
    API_MEMBER.getCustomerList(id).then(data => {
      commit(TYPE.GET_MEMBER_LIST, data)
      commit(TYPE.GET_MEMBER_LIST_BY_PARAM, pagination)
    })
  },
  getMemberListByParam({ commit }, pagination) {
    commit(TYPE.GET_MEMBER_LIST_BY_PARAM, pagination)
  },
  //清空会员分组
  clearCustomerDetail({ commit }) {
    commit(TYPE.CLEAR_MEMBER_DETAIL)
  },
  getCustomerDetail({ commit }, id) {
    API_MEMBER.getCustomerDetail(id).then(data => {
      commit(TYPE.GET_MEMBER_DETAIL, [data, id])
    })
  },
  getOutOfBlackListPage({ commit }, [search_word, pagination]) {
    return new Promise((resolve, reject) => {
      API_MEMBER.getOutOfBGList(pagination, 1, search_word).then(data => {
        commit(TYPE.GET_BLACK_GREY_LIST, data)
        resolve(data)
      })
    })
  },
  getOutOfGreyListPage({ commit }, [search_word, pagination]) {
    return new Promise((resolve, reject) => {
      API_MEMBER.getOutOfBGList(pagination, 0, search_word).then(data => {
        commit(TYPE.GET_BLACK_GREY_LIST, data)
        resolve(data)
      })
    })
  },
  addBlackList({ commit }, id) {
    return API_MEMBER.addBlackList(id)
  },
  addGreyList({ commit }, id) {
    return API_MEMBER.addGreyList(id)
  },
  removeBlackList({ commit }, ids) {
    return API_MEMBER.removeBlackList(ids)
  },
  removeGreyList({ commit }, ids) {
    return new Promise((resolve, reject) => {
      API_MEMBER.removeGreyList(ids).then(o => {
        resolve(o)
      })
    })
  },
  getMemberLevel({ commit }) {
    API_MEMBER.getMemberLevel().then(data => {
      commit(TYPE.GET_MEMBER_LEVEL, data)
    })
  },
  // 保存
  saveMemberLevel({ commit }, data) {
    var type = data.settings.filter(o => {
      return o.config_name === 'CRM_SWITCH'
    })[0].config_value
    var _data_switch = tools.switchLevel(data, type)
    var _data = tools.saveProcess(_data_switch)
    // 保存
    return API_MEMBER.saveMemberLevel(_data)
  },
  // 切换为AI / CUTOMER
  switchMemberLevel({ commit, state, dispatch }, [type, data]) {
    var data_temp = data ? data : state.memberLevelData
    var _data_switch = tools.switchLevel(data_temp, type)
    var _data = tools.saveProcess(_data_switch)
    // 保存
    return API_MEMBER.saveMemberLevel(_data)
  },
  addInitData({ commit }, data) {
    return new Promise((resolve, reject) => {
      resolve(tools.getInitData(data))
    })
  },
  getMemberCategory({ commit, state }, title) {
    return new Promise((resolve, reject) => {
      var _obj = state.memberCategoryData.filter(o => {
        return o.title === title
      })[0]
      resolve(_obj)
    })
  }
}

const mutations = {
  [TYPE.GET_MEMBER_GROUP](state, data) {
    var ret = []
    var c_data = state.memberCategoryData
    // 合并会员分类
    ret = data.map(o => {
      c_data.forEach(c => {
        if (o.category_id === c.id) {
          o.category_title = c.title
        }
      })
      return o
    })
    // 加工会员分组，将会员分组，分类整合成可用json对象
    ret = tools.mergeMemberData(g_const.MemberManageSidebar, ret)
    state.memberGroupData = ret
  },
  [TYPE.GET_MEMBER_GROUP_TREE](state, data) {
    state.memberGroupTreeData = tools.mergeMemberTreeData(data)
    var _temp = []
    var _data = state.memberGroupTreeData
    for (var i in _data) {
      if (i != '全部会员' && i != '会员等级分组' && i != '自建营销标签') {
        _temp.push({
          label: i,
          children: _data[i]
        })
      }
    }
    state.calMemberGroupTreeDate = _temp
  },
  [TYPE.GET_MEMBER_CATEGORY](state, data) {
    state.memberCategoryData = data
  },
  [TYPE.GET_MEMBER_LIST](state, data) {
    data.forEach(o => {
      o.last_trade_success_time_date = {
        date: moment(o.last_trade_success_time).format('YYYY-MM-DD') === 'Invalid date' ? '/' : moment(o.last_trade_success_time).format('YYYY-MM-DD'),
        time: moment(o.last_trade_success_time).format('HH:mm') === 'Invalid date' ? '/' : moment(o.last_trade_success_time).format('HH:mm')
      }
      o.last_marketing_time_date = {
        date: moment(o.last_marketing_time).format('YYYY-MM-DD') === 'Invalid date' ? '/' : moment(o.last_marketing_time).format('YYYY-MM-DD'),
        time: moment(o.last_marketing_time).format('HH:mm') === 'Invalid date' ? '/' : moment(o.last_marketing_time).format('HH:mm')
      }
      o.nick_change = o.nick.substr(0, 1) + o.nick.substr(0, o.nick.length - 2).replace(/./g, '*') + o.nick.substr(-1)
      o.mobile_change = o.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      //o.real_name_change = o.real_name
      o.real_name_change = o.real_name.replace(/.(?=.)/g, '*')
      // 数据为计算出来的时候后端会传‘/'
      if (o.trade_payment_sum !== '/') {
        var temp = parseFloat(o.trade_payment_sum).toFixed(2).toString().split('.')
        o.trade_payment_sum_show = temp[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + temp[1]
      } else {
        o.trade_payment_sum_show = '/'
      }
      //隐藏会员等级
      o.grade_crm = '/'
    })
    state.memberListData = data
  },
  [TYPE.GET_MEMBER_LIST_BY_PARAM](state, pagination) {
    state.filterMemberListData = pagination.doPage(state.memberListData)
  },
  [TYPE.GET_NEWADD_GROUP](state, data) {
    state.newAddGroupData = data
  },
  //清空会员详情
  [TYPE.CLEAR_MEMBER_DETAIL](state) {
    state.memberDetailData = {
      orders: [],
      marketings: [],
      loading: true
    }
  },
  [TYPE.GET_MEMBER_DETAIL](state, [data, id]) {
    data.receivers.forEach(o => {
      o.name_show = o.name.replace(/.(?=.)/g, '*')
      o.phone_change = o.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      o.mobile_change = o.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    })
    data.receivers.sort((a, b) => {
      return moment(b.created).valueOf() - moment(a.created).valueOf()
    })
    data.orders.sort((a, b) => {
      return moment(b.pay_time).valueOf() - moment(a.pay_time).valueOf()
    })
    data.marketings.sort((a, b) => {
      return moment(b.marketing_time).valueOf() - moment(a.marketing_time).valueOf()
    })
    data.nick_change = data.nick.substr(0, 1) + data.nick.substr(0, data.nick.length - 2).replace(/./g, '*') + data.nick.substr(-1)
    data.real_name_change = data.real_name.replace(/.(?=.)/g, '*')
    // state.memberDetailData.id.push(id)
    // state.memberDetailData.data.push(data)
    state.memberDetailData = data
  },
  [TYPE.GET_MEMBER_LEVEL](state, data) {
    // 转换成json
    var _groups = data.groups.map(o => {
      o.filter_option = JSON.parse(o.filter_option)
      return o
    })
    data.groups = _groups
    // 所有会员等级制度
    state.memberLevelData = data
    // AI数据
    state.memberLevelAiData = data.groups.filter(o => {
      return o.is_system
    })
    // AI数据排序
    state.memberLevelAiData = state.memberLevelAiData.sort((a, b) => {
      return a.id - b.id
    })
    // AI数据当前使用等值制度
    // var active_ai_type = tools.getActive(data.settings)
    // AI当前使用等值制度数据
    // state.memberLevelAiCurrentData = active_ai_type === 'NO_PRICE' ? tools.getNoPrice(state.memberLevelAiData) : toos.getHasPrice(state.memberLevelAiData)
    // 自定义数据
    var cdata = data.groups.filter(o => {
      return !o.is_system
    })
    // 初次加载 未有自定义数据，则手动添加
    if (cdata.length === 0) {
      state.memberLevelCustomData = [tools.getInitData(data.groups[0])]
    } else {
      // 非初次加载
      cdata = cdata.map(o => {
        o.filter_option = tools.getLevelDataTransform(o.filter_option)
        return o
      })
      cdata = cdata.sort((a, b) => {
        return a.id - b.id
      })
      state.memberLevelCustomData = cdata
    }

  },
  [TYPE.GET_BLACK_GREY_LIST](state, data) {
    data.forEach(o => {
      o.nick_change = o.nick.substr(0, 1) + o.nick.substr(0, o.nick.length - 2).replace(/./g, '*') + o.nick.substr(-1)
      o.mobile_change = o.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      o.real_name_change = o.real_name.replace(/.(?=.)/g, '*')
    })
    state.blackGreyList = data
  }
}

const tools = {
  // 是否 区分高中低端
  getActive(settings) {
    return settings.filter(o => {
      return o.config_name === 'CRM_AI'
    })[0].config_value
  },
  // 区分高中低端的数据
  getNoPrice(list) {
    if (!list) return []
    var _list = list.filter(o => {
      return o.is_system && !this.isHasPrice(o.title)
    })
    return _list
  },
  // 不区分高中低端的数据
  getHasPrice(list) {
    if (!list) return []
    var _list = list.filter(o => {
      return o.is_system && this.isHasPrice(o.title)
    })
    return _list
  },
  isHasPrice(tilte) {
    return tilte !== '铸铁会员'
      && tilte !== '青铜会员'
      && tilte !== '白银会员'
      && tilte !== '黄金会员'
      && tilte !== '钛金会员'
  },
  mergeMemberData(base, target) {
    var list = [];
    var submenus = {};
    this.addGroup(target)
    base.forEach(o => {
      submenus = {};
      target.forEach((item, index) => {
        if (o.name === item.category_title) {
          var link = o.path
          var more = ''
          if (o.submenusTool && o.submenusTool.links && o.submenusTool.links[item.title]) {
            link = o.submenusTool.links[item.title]
          }
          if (o.submenusTool && o.submenusTool.more && o.submenusTool.more[item.tag]) {
            more = o.submenusTool.more[item.tag]
          }
          if (!submenus[item.tag]) {
            submenus[item.tag] = [{
              name: item.title,
              icon: o.icon,
              path: link,
              id: item.id,
              type: item.tag,
              group: item.category_title,
              more: more,
              class: item.className,
              openModalName: item.openModalName,
              finishState: item.finishState ? item.finishState : item.finishState == 0 ? 0 : item.tag == 'CRM内会员等级' ? 0 : 2,
              percentage: '50%',
              num: '200人',
              float: 'up'
            }];
          } else {
            submenus[item.tag].push({
              name: item.title,
              icon: o.icon,
              path: link,
              id: item.id,
              type: item.tag,
              group: item.category_title,
              more: more,
              class: item.className,
              openModalName: item.openModalName,
              finishState: item.finishState ? item.finishState : item.finishState == 0 ? 0 : item.tag == 'CRM内会员等级' ? 1 : 2,
              percentage: '50%',
              num: '15人',
              float: 'down'
            });
          }
        } else if (o.name === "全部会员") {
          if (!submenus[o.name]) {
            submenus[o.name] = [{
              name: '全部',
              icon: o.icon,
              path: o.path,
              id: 'all',
              group: o.name,
              finishState: 2
            }]
          }
        }
      })
      o.submenus = submenus;
      list.push(o)
    });
    for (var i in list) {
      if (list[i].name == "会员等级分组") {
        if (list[i].submenus.length <= 1) {
          list[i].submenus['CRM内会员等级'][0].name = '创建会员等级制度'
          return list
        } else {
          list[i].submenus['CRM内会员等级'][0].name = '编辑会员等级分组'
          return list
        }
      }
    }
    return list;
  },
  addGroup(target) {
    // target.unshift({
    //   title: '创建会员等级制度',
    //   tag: 'CRM内会员等级',
    //   category_title: '会员等级分组',
    //   id: '',
    //   className: 'primary',
    //   openModalName: '',
    //   finishState: 1
    // })
    // target.unshift({
    //   title: '新建营销分组',
    //   tag: '自建营销',
    //   category_title: '自建营销标签',
    //   id: '',
    //   className: 'primary',
    //   openModalName: 'createMarketGroup',
    //   finishState: 0
    // })
    target.unshift({
      title: '点击导入',
      tag: '导入会员批次',
      category_title: '导入会员批次',
      id: '',
      className: 'primary',
      openModalName: 'importModal'
    })
  },
  mergeMemberTreeData(data) {
    var ret = {}
    data.forEach(o => {
      var obj = o.submenus
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var subObj = {
            label: key,
            children: []
          }
          obj[key].forEach(sub => {
            if (!sub.class) {
              subObj.children.push({
                id: sub.id,
                label: sub.name
              })
            }
          })
          if (subObj.children.length > 0) {
            if (!ret[o.name]) {
              ret[o.name] = [subObj]
            } else {
              ret[o.name].push(subObj)
            }
          }
        }
      }

    })
    return ret
  },
  switchLevel(data, type) {
    var _data = JSON.parse(JSON.stringify(data))
    // AI / CUSTOMER
    _data.settings = _data.settings.map(o => {
      if (o.config_name === 'CRM_SWITCH') {
        o.config_value = type
      }
      return o
    })
    // 如果是AI
    if (type === 'AI') {
      // 是否区分高中低端
      var _has_price = tools.getActive(_data.settings) !== 'NO_PRICE'
      // AI标记为启用 ,CUSTOMER标记未启用
      _data.groups = _data.groups.map(o => {
        // 是否区分高中低端 将对应enable值改为 0 或 1
        o.enabled = (o.is_system && (_has_price ? this.isHasPrice(o.title) : !this.isHasPrice(o.title))) ? 1 : 0
        return o
      })
      // 如果是CUSTOMER
    } else if (type === 'CUSTOMER') {
      // 没有自定义数据
      var cdata = _data.groups.filter(o => {
        return !o.is_system
      })
      // 初次加载 未有自定义数据，则手动添加
      if (cdata.length === 0) {
        _data.groups.push(tools.getInitData(_data.groups[0]))
      }
      // AI标记为未启用 ,CUSTOMER标记已启用
      _data.groups = _data.groups.map(o => {
        o.enabled = o.is_system ? 0 : 1
        return o
      })
    }
    return _data
  },
  getInitData(obj) {
    var _data = {
      id: 0,
      user_id: obj.user_id,
      category_id: obj.category_id,
      title: '用户自定义等级1',
      desc: 'V1',
      tag: obj.tag,
      filter_option: this.getOptInitData(),
      is_system: 0,
      enabled: 1
    }
    return _data
  },
  getOptInitData() {
    return {
      // 是否显示高级选项
      showMoreCondition: false,
      // 是否应用高级选项
      applyMoreCondition: false,
      index: 0,
      purchase_times: 1,
      payment: 0,
      purchase_times_more: [],
      purchase_times_label: '',
      purchase_times_normal: 1,
      payment_more: [],
      payment_label: '',
      payment_normal: 0,
      payment_end_invalid: false,
      payment_start_invalid: false,
      payment_start_invalid_msg: '',
      payment_end_invalid_msg: '',

      discount: 9.5,
      created: [
      ],
      trade_from: "",
      activity_type: [
      ],
      status: "",
      buys: [
      ],
      order_num: [
      ],
      items_range: {
        include: [
        ],
        exclude: [
        ]
      },
      pay_time: [
      ],
      consign_time: [
      ],
      sign_time: [
      ],
      end_time: [
      ],
      buyer_message: "",
      seller_flag: [
      ],
      bindCity: {},
      express: [],
      city: {},
      buys_label: "",
      order_num_label: "",
      pay_time_label: "",
      consign_time_label: "",
      sign_time_label: "",
      end_time_label: "",
      created_label: "",
      items_range_label: ""
    }
  },
  getLevelDataTransform(data) {
    var _data = data
    _data = API_MARKET.baseGetTransform(_data)
    if (_data.applyMoreCondition) {
      _data.payment_more = _data.payment
      _data.purchase_times_more = _data.purchase_times
    } else {
      _data.purchase_times_label = ''
      _data.purchase_times_normal = _data.purchase_times
      _data.payment_normal = _data.payment
      _data.payment_label = ''
    }
    return _data
  },
  // 处理customer数据
  setLevelDataTransform(data) {
    var _data = data
    if (_data.applyMoreCondition) {
      _data.purchase_times = _data.purchase_times_label.length === 0 ? [] : _data.purchase_times_more
      _data.payment = _data.payment_label.length === 0 ? [] : _data.payment_more
      if (!_data.order_time_label || _data.order_time_label.length === 0) {
        _data.created = []
      } else if (_data.order_time_label === '1month') {
        _data.created = ['1month']
      } else if (_data.order_time_label === '3month') {
        _data.created = ['3month']
      } else if (_data.order_time_label === 'custom') {
        _data.created = _data.order_time
      }
      _data.city = _data.bindCity
      _data = API_MARKET.baseSetTransform(_data, _data)
      return _data
    } else {
      var initData = this.getOptInitData()
      initData.discount = _data.discount
      initData = API_MARKET.baseSetTransform(initData, initData)
      initData.payment = _data.payment_normal
      initData.payment_label = ''
      initData.purchase_times = _data.purchase_times_normal
      initData.purchase_times_label = ''
      return initData
    }
  },
  isAi(_data) {
    return _data.filter(o => {
      return o.config_name === 'CRM_SWITCH'
    })[0].config_value === 'AI'
  },
  saveProcess(data) {
    // 去除引用
    var _data = JSON.parse(JSON.stringify(data))
    // 是AI / CUSTOMRE
    var _isAi = this.isAi(_data.settings)
    // 处理cusoter数据
    var groups = _data.groups.map(o => {
      if (!o.is_system) {
        // 将新建是创建的临时等级置为0
        o.id = (o.id + '').indexOf('_temp') >= 0 ? 0 : o.id
        o.filter_option = this.setLevelDataTransform(o.filter_option)
      }
      o.filter_option = JSON.stringify(o.filter_option)
      return o
    })
    _data.groups = groups
    return _data
  }


}


export default {
  state,
  getters,
  actions,
  mutations
}
