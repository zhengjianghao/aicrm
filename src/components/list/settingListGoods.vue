<template>
  <table-list
    ref="tableList"
    @getBaseList="searchRemote"
    :configClass='true'
    listTableClass='market_tablelist'
    :showConfBox='true'
    @getFilterList="getFilterList"
    :filterListData="filterData">
    <template slot="toolboxLeft" scope="props">
      <slot name="toolboxLeft" :data="props.data"></slot>
    </template>
    <template slot="toolboxRight" scope="props">
      <slot name="toolboxRight" :data="props.data" :openChoTemplate="openChooseGoods"></slot>
    </template>
    <template slot="tableData" scope="props">
      <slot name="tableData" :data="props.data" :totalNum="props.totalNum" :openChooseSubGoods="openChooseSubGoods" :deleteSubGoods="delete_sub_goods" :updateValue="updateValue" :refresh="showBuyingRycel" :deleteGoods="delete_goods" :cancelEdit="cancelEdit"></slot>
    </template>
  </table-list>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import utils from '../../misc/utils'
import moment from 'moment'
export default {
  data() {
    return {
      buyingCycelGoods: [],
      filterData: [],
      buyingCycelGoodsCur: [],
      gbConst: globalConstant.openModalCodes,
      buyingCycelGoodsOld: [],
      curChooseGoodId: '',
      asyncGoodsData: []
    }
  },
  mounted() {
    this.isActived = true
  },
  // 组件被激活
  activated() {
    this.isActived = true
  },
  // 组件转为非激活状态
  deactivated() {
    this.isActived = false
  },
  watch: {
    // 选择宝贝回传来的数据变化时执行
    selectGoodsData() {
      if(this.isActived) {
        var that = this
        var selGoodsData = that.selectGoodsData
        // 主宝贝
        if (selGoodsData.eleName === 'buyingCycelGoods') {
          that.buyingCycelGoods = that.getBuyingRycelGoodsBySel(selGoodsData.selectGoods)
          // 每个聚划算宝贝编辑之前的数据
          that.saveOldData(that.buyingCycelGoods)
          // 展现列表
          that.showBuyingRycel()
          // 子宝贝
        } else if (selGoodsData.eleName === 'subGoods') {
          that.buyingCycelGoods = that.buyingCycelGoods.map(o => {
            if (o.num_iid === that.curChooseGoodId) {
              o.j_child_tid = that.getSubGoodsBySel(selGoodsData.selectGoods)
            }
            return o
          })
        }
      }
    },
    // 父级组件传来的数据变化时执行
    settingListData() {
      if(this.isActived) {
        var that = this
        // 父组件数据不为空
        if (this.settingListData && this.settingListData.length > 0 && this.settingListData[0].num_iid) {
          if (!this.goodsData || this.goodsData.length === 0) { // 未加载店铺宝贝数据 则加载
            this.getGoods([]).then(data => {
              that.asyncGoodsData = data
              that.init(that.settingListData)
            })
          } else {  // 已经加载了店铺宝贝数据
            this.asyncGoodsData = this.goodsData
            this.init(this.settingListData)
          }
        } else { // 父组件数据为空
          if (!this.goodsData || this.goodsData.length === 0) { // 未加店铺载宝贝数据
            this.getGoods([]).then(data => {
              that.asyncGoodsData = data
            })
          } else {
            this.asyncGoodsData = this.goodsData
          }
          // 置空当前数据
          this.buyingCycelGoods = []
          // 展现列表
          this.showBuyingRycel()
        }
      }
    },
    // 将修改的宝贝数据同步到父组件
    buyingCycelGoods() {
      if(this.isActived) {
        if (this.isCheckEdit) {
          this.isCheckEdit(this.buyingCycelGoods)
        }
        this.updateValue()
      }
    }
  },
  computed: {
    ...mapGetters([
      'selectGoodsData',
      'goodsData',
      'baseMConfigData'
    ]),
    // 获取主宝贝ids
    buyingCycelGoodsCurOpen() {
      return this.buyingCycelGoodsCur.map(o => {
        return o.num_iid
      })
    }
  },
  methods: {
    ...mapActions([
      'updateOpenModal',
      'updateSelectGoods',
      'updataBaseMConfig',
      'getGoods'
    ]),
    init(data) {
      this.buyingCycelGoods = this.getBuyingRycelGoodsByInit(data)
      // 每个聚划算宝贝编辑之前的数据
      this.saveOldData(this.buyingCycelGoods)
      // 展现列表
      this.showBuyingRycel()
    },
    // 获取主宝贝下的相关宝贝ids, 返回ids数组
    subGoodsCurOpen(id) {
      var goods = this.buyingCycelGoods.filter(o => {
        return o.num_iid === id
      })[0]
      return goods.j_child_tid.map(o => {
        return o.num_iid
      })
    },
    // 取消编辑
    cancelEdit(id) {
      var back_obj = this.buyingCycelGoodsOld.filter(j => {
        return j.num_iid === id
      })[0]
      back_obj.j_is_edit = false
      this.buyingCycelGoods = this.buyingCycelGoods.map(o => {
        if (o.num_iid === id) {
          o = JSON.parse(JSON.stringify(back_obj))
        }
        return o
      })
      // 刷新列表
      this.showBuyingRycel()
    },
    saveOldData(oldData) {
      // 每个聚划算宝贝编辑之前的数据
      this.buyingCycelGoodsOld = JSON.parse(JSON.stringify(oldData))
    },
    updateValue() {
      this.customUpdate(this.buyingCycelGoods)
      this.buyingCycelGoodsCur = JSON.parse(JSON.stringify(this.buyingCycelGoods))
      // 每个聚划算宝贝编辑之前的数据
      this.saveOldData(this.buyingCycelGoods)
    },
    // (相关宝贝)根据选择宝贝后回传的ids，更新详细的宝贝信息
    getSubGoodsBySel(ids) {
      if (!ids) return []
      // 遍历选择的宝贝的ids
      return ids.map(o => {
        // 遍历店铺所有的宝贝，获取id相等的宝贝信息
        var matchObj = this.asyncGoodsData.filter(g => {
          return g.num_iid === o
        })[0]
        return matchObj
      })
    },
    // 根据选择宝贝后回传的ids，更新详细的宝贝信息
    getBuyingRycelGoodsBySel(ids) {
      var that = this
      if (!ids) return []
      // 遍历选择的宝贝的ids
      return ids.map(o => {
        // 遍历店铺所有的宝贝，获取id相等的宝贝信息
        var matchObj = that.asyncGoodsData.filter(g => {
          return g.num_iid === o
        })[0]
        var temp = {}
        // 聚划算宝贝短名
        temp.j_name = matchObj.sub_title
        temp.j_price = '0.00'
        temp.j_discount = ''
        temp.j_date = [moment().format('YYYY-MM-DD HH:mm'), '']
        temp.j_child_tid = []
        temp.j_is_edit = true
        temp.j_is_new = true
        matchObj = Object.assign({}, matchObj, temp)
        // 保留之前的宝贝设置
        that.buyingCycelGoods.forEach(g => {
          if (matchObj.num_iid === g.num_iid) {
            matchObj.j_name = g.j_name
            matchObj.j_price = g.j_price
            matchObj.j_discount = g.j_discount
            matchObj.j_date = g.j_date
            matchObj.j_child_tid = g.j_child_tid
            matchObj.j_is_edit = g.j_is_edit
            matchObj.j_is_new = g.j_is_new
          }
        })
        return matchObj
      })
    },
    // 页面初始化时，根据接口提供的宝贝ids和购买周期数获取详细的宝贝信息
    getBuyingRycelGoodsByInit(initGoods) {
      var that = this
      // 店铺宝贝数据未加载 返回空数据
      if (that.asyncGoodsData.length === 0) return []
      // 初次登录 未设置活动宝贝 返回空数组
      if (!initGoods || initGoods.length === 0 || !initGoods[0].j_name) return []
      var _initGoods = JSON.parse(JSON.stringify(initGoods))
      // 遍历初始化的宝贝的ids
      return _initGoods.map(o => {
        // 遍历店铺所有的宝贝，获取id相等的宝贝信息
        var matchObj = that.asyncGoodsData.filter(g => {
          return g.num_iid === o.num_iid
        })[0]
        if (matchObj) {
          o.j_child_tid = o.j_child_tid.map(j => {
            return that.asyncGoodsData.filter(g => {
              return j === g.num_iid
            })[0]
          }).filter(_g => { // 匹配出的宝贝可能存在undefine(宝贝已经不存在), 过滤掉
            return Boolean(_g)
          })
          matchObj = Object.assign({}, matchObj, o)
          matchObj.j_is_new = false
        }
        return matchObj
      })
    },
    // 处理本地数据 宝贝本地分页
    getFilterList([pagination]) {
      this.filterData = pagination.doPage(this.buyingCycelGoods)
    },
    // 删除主宝贝
    delete_goods(id) {
      this.$confirm('是否删除宝贝', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.buyingCycelGoods = this.buyingCycelGoods.filter(o => {
          return o.num_iid != id
        })
        // 展现列表
        this.showBuyingRycel()
        this.$message({
          type: 'success',
          customClass: 'message_position',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          customClass: 'message_position',
          message: '已取消删除'
        })
      })
    },
    // 删除相关宝贝
    delete_sub_goods(id, subId) {
      this.buyingCycelGoods = this.buyingCycelGoods.map(o => {
        if (o.num_iid === id) {
          o.j_child_tid = o.j_child_tid.filter(j => {
            return j.num_iid != subId
          })
        }
        return o
      })
      // 展现列表
      this.showBuyingRycel()
    },
    // 子组件回调函数，用于分页
    searchRemote([pagination]) {
      this.filterData = pagination.doPage(this.buyingCycelGoods)
    },
    // 展现宝贝数据
    showBuyingRycel() {
      // 调用组件分页方法
      this.$refs['tableList'].init()
    },
    // 打开选择主宝贝弹框
    openChooseGoods(chooseGoodsType, activeItems, curLevel) {
      // 获取当前选中的目标会员分组id
      var groupObj = utils.getGroupDetail(this.baseMConfigData)
      // 将数组改成逗号相连的字符串
      var groupId = groupObj.groupId.length > 0 ? groupObj.groupId.join(',') : ''
      this.openChoTemplate(chooseGoodsType ? chooseGoodsType : this.gbConst.chooseGoods, 'buyingCycelGoods', this.buyingCycelGoodsCurOpen, activeItems, groupId, curLevel)
    },
    // 打开选择相关主宝贝弹框
    openChooseSubGoods(id, chooseGoodsType) {
      this.curChooseGoodId = id
      this.openChoTemplate(chooseGoodsType ? chooseGoodsType : this.gbConst.chooseGoods, 'subGoods', this.subGoodsCurOpen(id))
    },
    // 打开宝贝选择弹框
    openChoTemplate(code, eleName, selGoods, activeItems, groupId, curLevel) {
      this.updateOpenModal({
        name: code,
        isOpen: true
      })
      this.updateSelectGoods({
        selectGoods: selGoods,
        eleName: eleName,
        activeItems: activeItems,
        groupId: groupId,
        curLevel: curLevel
      })
    }
  },
  props: [
    'sortBy',
    'settingListData',
    'customUpdate',
    'isCheckEdit'
  ],
}
</script>
<style lang="scss">
</style>
