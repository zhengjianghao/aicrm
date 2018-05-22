import * as TYPE from '../type.constant'
import goodsService from '../../service/goods.service'
import utils from '../../misc/utils'
import g_const from '../../misc/global.constant'

const state = {
  goodsCategory: [],
  activeSelectGoodsCategory: 'all',
  activeSelectGoodsCategoryBounced: 'all',
  // 店铺宝贝数据
  goodsData: [],
  // 店铺宝贝数据（提供潜需排行数据）
  goodsLevelData: [],
  filterGoodLevelData: {},
  filterGoodData: {},
  // 用于将选择的宝贝在子父窗口传递
  selectGoodsData: {}
}

const getters = {
  goodsCategory: state => {
    var _goodsCategory = [{
      name: '全部宝贝',
      cid: 'all'
    }]
    return _goodsCategory.concat(state.goodsCategory)
  },
  activeSelectGoodsCategory: state => state.activeSelectGoodsCategory,
  activeSelectGoodsCategoryBounced: state => state.activeSelectGoodsCategoryBounced,
  goodsData: state => state.goodsData,
  goodsLevelData: state => state.goodsLevelData,
  filterGoodData: state => state.filterGoodData,
  filterGoodLevelData: state => state.filterGoodLevelData,
  selectGoodsData: state => state.selectGoodsData
}

const actions = {
  getGoodsCategory({ commit }) {
    goodsService.goodsCategory().then((data) => {
      commit(TYPE.GET_GOODS_CATEGORY, data)
    })
  },
  updateActiveGoodsCategory({ commit }, state) {
    commit(TYPE.UPDATE_ACTIVE_GOODS_CATEGORY, state)
  },
  updateActiveGoodsCategoryBounced({ commit }, state) {
    commit(TYPE.UPDATE_ACTIVE_GOODS_CATEGORY_BOUNCED, state)
  },
  getGoods({ commit }, [pagination]) {
    return new Promise((resolve, reject) => {
      goodsService.getGoods().then((data) => {
        resolve(utils.dirtyDataProcess(data))
        commit(TYPE.GET_GOODS, data)
        // 不进行分页
        if (pagination) {
          commit(TYPE.GET_GOODS_BY_PARAM, ['onsale', "all", '', false, pagination])
        }
      })
    })
  },
  getGoodsLevel({ commit }, [pagination, activeItems, groupId, curLevel]) {
    return new Promise((resolve, reject) => {
      goodsService.getGoodsLevel(activeItems, groupId).then((data) => {
        resolve(utils.dirtyDataProcess(data))
        commit(TYPE.GET_GOODS_LEVEL, data)
        // 不进行分页
        if (pagination) {
          commit(TYPE.GET_GOODS_LEVEL_BY_PARAM, ['onsale', "all", '', false, pagination, activeItems, curLevel, utils.dirtyDataProcess(data)])
        }
      })
    })
  },
  getGoodsByParam({ commit }, [goodsState, goodsCategory, keyWord, selGoods, pagination]) {
    commit(TYPE.GET_GOODS_BY_PARAM, [goodsState, goodsCategory, keyWord, selGoods, pagination])
  },
  getGoodsLevelByParam({ commit }, [goodsState, goodsCategory, keyWord, selGoods, pagination, activeItems, curLevel]) {
    commit(TYPE.GET_GOODS_LEVEL_BY_PARAM, [goodsState, goodsCategory, keyWord, selGoods, pagination, activeItems, curLevel])
  },
  updateSubTitle({ commit }, [subTitle, id]) {
    goodsService.updateSubTitle(id, subTitle).then(() => {
      commit(TYPE.CALLBACK_MSG, g_const.callMsg.success_save)
    })
  },
  updateSelectGoods({ commit }, data) {
    commit(TYPE.UPDATE_SEL_GOODS, data)
  }
}

var processPriceLevel = val => {
  if (val === 'high') {
    return '高客单价'
  } else if (val === 'middle') {
    return '中客单价'
  } else if (val === 'low') {
    return '低客单价'
  } else {
    return ''
  }
}


const mutations = {
  [TYPE.GET_GOODS_CATEGORY](state, data) {
    state.goodsCategory = data
  },
  [TYPE.UPDATE_ACTIVE_GOODS_CATEGORY](state, data) {
    state.activeSelectGoodsCategory = data
  },
  [TYPE.UPDATE_ACTIVE_GOODS_CATEGORY_BOUNCED](state, data) {
    state.activeSelectGoodsCategoryBounced = data
  },
  [TYPE.GET_GOODS](state, data) {
    var _data = data
    _data = utils.dirtyDataProcess(_data)
    // _data[0].is_edit = 'true'
    // _data[1].is_edit = 'false'
    // _data[2].is_edit = 'true'
    _data = _data.sort((a, b) => {
      return parseFloat(b.sold_quantity) - parseFloat(a.sold_quantity)
    })
    var no_edit = _data.filter(o => {
      return o.is_subtitle_edited == 0
    })
    var _edit = _data.filter(o => {
      return o.is_subtitle_edited == 1
    })
    _data = no_edit.concat(_edit)
    state.goodsData = utils.processData(_data, 'pic_url')
  },
  [TYPE.GET_GOODS_LEVEL](state, data) {
    var _data = data
    _data = utils.dirtyDataProcess(_data)
    state.goodsLevelData = utils.processData(_data, 'pic_url')
  },
  [TYPE.UPDATE_SEL_GOODS](state, data) {
    // 比较宝贝列表和添加宝贝列表的数组，不一样时刷新搜索条件(不知道为什么当初脑子进水了，写了这个条件判断)
    // if (!utils.compareArr(state.selectGoodsData.selectGoods, data.selectGoods)) {
    state.selectGoodsData = data
    // }
  },
  [TYPE.GET_GOODS_BY_PARAM](state, [goodsState, goodsCategory, keyWord, selGoods, pagination]) {
    var tempRet = state.goodsData.filter(o => {
      var stateOk = o.approve_status === goodsState || goodsState === 'all'
      var categoryOk = false
      if (goodsCategory === 'all' || goodsCategory[0] === 'all') {
        categoryOk = true
      } else {
        categoryOk = !goodsCategory.every(cid => {
          return o.seller_cids.indexOf(cid + '') < 0
        })
      }
      var tempKey = utils.trim(keyWord)
      var keyWordOk = tempKey.length === 0 || o.sub_title.indexOf(tempKey) >= 0 || o.title.indexOf(tempKey) >= 0 || (o.num_iid + '').indexOf(tempKey) >= 0
      if (stateOk && categoryOk && keyWordOk) {
        return true
      } else {
        return false
      }
    })
    if (selGoods) {
      tempRet = tempRet.filter(o => {
        var t = false
        for (var i = 0; i < selGoods.length; i++) {
          if (selGoods[i] === o.num_iid) {
            t = true
            break
          }
        }
        return t
      })
    }
    // tempRet = tempRet.sort((a, b) => {
    //   return parseFloat(b.sold_quantity) - parseFloat(a.sold_quantity)
    // })
    state.filterGoodData = pagination.doPage(tempRet)
  },
  [TYPE.GET_GOODS_LEVEL_BY_PARAM](state, [goodsState, goodsCategory, keyWord, selGoods, pagination, activeItems, curLevel, orignData]) {
    var tempData = []
    if (orignData && orignData.length > 0) {
      tempData = orignData
    } else {
      tempData = state.goodsLevelData
    }

    // 根据潜需会员数排行
    tempData = tempData.sort((a, b) => {
      return parseFloat(b.potential_times) - parseFloat(a.potential_times)
    })

    // 是否区分高中低客单价
    var _curLevel = activeItems === 'ISHIGH' ? curLevel : ''
    // 区分高中低客单价, 则根据当前是高/中/低 对宝贝进行筛选
    if (_curLevel) {
      // 根据高中低客单价筛选
      tempData = tempData.filter(o => {
        // 不区分高中低客单价,则不对宝贝进行筛选
        var priceLevelOk = true // 是否通过筛选，默认通过
        // 根据curLevel(当前查看的是哪个等级的宝贝)，进行筛选
        if (o.priceGroup) { // 不存在该字段则不进行筛选
          priceLevelOk = processPriceLevel(_curLevel) === o.priceGroup
        }
        return priceLevelOk
      })
    }

    // 添加潜需排行标志 No.1、No2、No.3
    tempData.map((o, index) => {
      o.potential_times_num = 'No.' + (index + 1)
    })

    // 根据其它条件筛选
    var tempRet = tempData.filter(o => {
      var stateOk = o.approve_status === goodsState || goodsState === 'all'
      var categoryOk = false
      if (goodsCategory === 'all' || goodsCategory[0] === 'all') {
        categoryOk = true
      } else {
        categoryOk = !goodsCategory.every(cid => {
          return o.seller_cids.indexOf(cid + '') < 0
        })
      }

      var tempKey = utils.trim(keyWord)
      var keyWordOk = tempKey.length === 0 || o.sub_title.indexOf(tempKey) >= 0 || o.title.indexOf(tempKey) >= 0 || (o.num_iid + '').indexOf(tempKey) >= 0
      if (stateOk && categoryOk && keyWordOk) {
        return true
      } else {
        return false
      }
    })
    // 只查看选中的宝贝
    if (selGoods) {
      tempRet = tempRet.filter(o => {
        var t = false
        for (var i = 0; i < selGoods.length; i++) {
          if (selGoods[i] === o.num_iid) {
            t = true
            break
          }
        }
        return t
      })
    }

    state.filterGoodLevelData = pagination.doPage(tempRet)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
