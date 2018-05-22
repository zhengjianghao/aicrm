<template>
  <table-list ref="tableList" :hiddenToolBox='true' :showConfBox='true' listTableClass='market_tablelist' :configClass='true' @checkBuyAll="checkBuyAll" @getBaseList="searchRemote" @getFilterList="getFilterList" :filterListData="filterData">
    <template slot="toolboxLeft" scope="props">
      <h3 style="color:#5D6D7D;">设置快消品购买周期</h3>
      <span style="line-height: 30px">选择好快消品宝贝后需要对每个宝贝逐一设置购买周期</span>
    </template>
    <template slot="toolboxRight" scope="props">
      <div style="padding: 15px 10px 0px 0px;">
        当前已有
        <span class="num">{{props.data.totalNum ? props.data.totalNum : 0}}</span> 件快消品
        <el-button style="background-color: #0bb8f8;background-image: linear-gradient(45deg, #0bb8f8 25%, #2AF598 100%);" type="primary" @click="openChoTemplate(gbConst.openModalCodes.chooseGoods, 'buyingCycelGoods', buyingCycelGoodsCurOpen)">添加快消品宝贝</el-button>
      </div>
    </template>
    <template slot="tableData" scope="props">
      <el-table :data="props.data" max-height="775">
        <el-table-column width="80px" align="center" label="">
          <template scope="scope">
            <img :src="scope.row.pic_url" />
          </template>
        </el-table-column>
        <el-table-column min-width="150" header-align="center" label="宝贝名称">
          <template scope="scope">
            <div class="goodsName_row">
              <div class="pull-left introduce">
                <p @click="gbConst.goTaobaoDetail(scope.row.num_iid)()" class="sub_title link">{{scope.row.sub_title}}</p>
                <span>
                  <p class="des">{{scope.row.title}}</p>
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="num_iid" align="center" min-width="90" label="宝贝ID">
        </el-table-column>
        <el-table-column prop="outer_id" align="center" min-width="90" label="商家编码">
        </el-table-column>
        <el-table-column prop="salesInventory" align="center" min-width="90px" label="销量与库存">
          <template scope="scope">
            <div class="sale">
              <p>销量
                <span class="num"> {{scope.row.sold_quantity}} </span>笔/月</p>
              <p>库存
                <span class="num"> {{scope.row.num}} </span>件</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="75px" align="center" label="价格">
          <template scope="scope">
            <span>￥{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="110px" align="center" label="设置重复购买周期">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" :manual="true" :value='buyDayID.indexOf(scope.row.num_iid) >=0 ' :content="buyDayContent.length >0 ? buyDayID.indexOf(scope.row.num_iid) >=0 ? buyDayContent[buyDayID.indexOf(scope.row.num_iid)] : '' : ''" placement="top">
              <el-input v-model="scope.row.buying_cycel_days" @blur="checkBuyCycelDays(scope.row.buying_cycel_days, scope.row.num_iid)" style="width: 100px">
                <template slot="append">天</template>
              </el-input>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column min-width="90px" align="center" label="操作">
          <template scope="scope">
            <span class="link_underline" @click="delete_goods(scope.row.num_iid)">
              <a class="Delet link">删除</a>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </table-list>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../../../misc/global.constant'
export default {
  data() {
    return {
      // 存储完整的要设置快消品周期的宝贝
      buyingCycelGoods: [],
      filterData: [],
      buyingCycelGoodsCur: [],
      gbConst: globalConstant,
      buyDayID: [],
      buyDayContent: [],
      asyncGoodsData: []
    }
  },
  watch: {
    // 选择宝贝回传来的数据变化时执行
    selectGoodsData() {
      var selGoodsData = this.selectGoodsData
      if (selGoodsData.eleName === 'buyingCycelGoods') {
        this.buyingCycelGoods = this.getBuyingRycelGoodsBySel(selGoodsData.selectGoods)
        // 展现列表
        this.showBuyingRycel()
      }
    },
    // 父级组件传来的数据变化时执行
    settingListData() {
      var that = this
      if (that.settingListData && that.settingListData.length > 0 && that.settingListData[0].num_iid) {
        if (!that.goodsData || that.goodsData.length === 0) { // 未加载店铺宝贝数据 则加载
          that.getGoods([]).then(data => {
            that.asyncGoodsData = data
            that.buyingCycelGoods = that.getBuyingRycelGoodsByInit(that.settingListData)
            // 展现列表
            that.showBuyingRycel()
          })
        } else {  // 已经加载了店铺宝贝数据
          that.asyncGoodsData = that.goodsData
          that.buyingCycelGoods = that.getBuyingRycelGoodsByInit(that.settingListData)
          // 置空当前数据
          that.showBuyingRycel()
        }
      } else { // 父组件数据为空
        if (!that.goodsData || that.goodsData.length === 0) { // 未加店铺载宝贝数据
          that.getGoods([]).then(data => {
            that.asyncGoodsData = data
            // 展现列表
            that.showBuyingRycel()
          })
        } else {
          that.asyncGoodsData = that.goodsData
          // 置空当前数据
          that.buyingCycelGoods = []
          // 置空当前数据
          that.showBuyingRycel()
        }
      }

    },
    // 将修改的快消品宝贝数据同步到父组件
    buyingCycelGoods() {
      this.updateValue()
    }
  },
  computed: {
    ...mapGetters([
      'selectGoodsData',
      'goodsData'
    ]),
    buyingCycelGoodsCurOpen() {
      return this.buyingCycelGoodsCur.map(o => {
        return o.num_iid
      })
    }
  },
  //重复请求
  // beforeMount() {
  //   if (!this.goodsData || this.goodsData.length === 0) {
  //     this.getGoods([])
  //   }
  // },
  methods: {
    ...mapActions([
      'updateOpenModal',
      'updateSelectGoods',
      'updataBaseMConfig',
      'getGoods'
    ]),
    getContent(id) {
      return this.buyDayContent.length > 0 ? this.buyDayID.indexOf(id) >= 0 ? this.buyDayContent[this.buyDayID.indexOf(id)] : '' : ''
      //return this.buyDayID.indexOf(id) >=0 ? this.buyDayContent[this.buyDayID.indexOf(id)] : ''
    },
    checkBuyCycelDays(value, id) {
      var reg = /^\+?[1-9]\d*$/g;
      var that = this;
      if (value == '') {
        if (that.buyDayID.indexOf(id) < 0) {
          that.buyDayID.push(id)
          that.buyDayContent.push('请输入大于0的 整数')
        } else {
          that.buyDayContent[that.buyDayID.indexOf(id)] = '请输入大于0的 整数'
        }

      } else if (!reg.test(value)) {
        if (that.buyDayID.indexOf(id) < 0) {
          that.buyDayID.push(id)
          that.buyDayContent.push('请输入大于0的 整数')
        } else {
          that.buyDayContent[that.buyDayID.indexOf(id)] = '请输入大于0的 整数'
        }

      } else {
        if (that.buyDayID.indexOf(id) >= 0) {
          that.buyDayContent.splice(that.buyDayID.indexOf(id), 1)
          that.buyDayID.splice(that.buyDayID.indexOf(id), 1)
        }
        that.updateValue()
      }
    },
    checkBuyAll() {
      // if(this.buyingCycelGoodsCur.length == 0) {
      //   return '请选择快消品宝贝'
      // }
      for (var i in this.buyingCycelGoodsCur) {
        this.checkBuyCycelDays(this.buyingCycelGoodsCur[i].buying_cycel_days, this.buyingCycelGoodsCur[i].num_iid)
      }
      return this.buyDayID.length == 0
    },
    //////////////////////////////////////// 设置快消品周期部分 ////////////////////////////////////////
    updateValue() {
      var _data = this.buyingCycelGoods.map(o => {
        return {
          num_iid: o.num_iid,
          buying_cycel_days: o.buying_cycel_days
        }
      })
      this.buyingCycelGoodsCur = _data
      // 更新营销配置基本量
      this.updataBaseMConfig({
        buying_cycel_items: _data
      })
    },
    // 根据选择宝贝后回传的ids，获取详细的宝贝信息
    getBuyingRycelGoodsBySel(ids) {
      if (!ids) return []
      // 遍历选择的宝贝的ids
      return ids.map(o => {
        // 遍历店铺所有的宝贝，获取id相等的宝贝信息
        var matchObj = this.goodsData.filter(g => {
          return g.num_iid === o
        })[0]
        // 将重复购买周期初始化为0
        matchObj.buying_cycel_days = 0
        // 遍历历史快消品购买周期，保留其设置的购买周期
        this.buyingCycelGoodsCur.forEach(g => {
          if (matchObj.num_iid === g.num_iid) {
            matchObj.buying_cycel_days = g.buying_cycel_days
          }
        })
        return matchObj
      })
    },
    // 页面初始化时，根据接口提供的宝贝ids和购买周期数获取详细的宝贝信息
    getBuyingRycelGoodsByInit(initGoods) {
      var that = this
      if (that.asyncGoodsData.length === 0) return []
      var _initGoods = JSON.parse(JSON.stringify(initGoods))
      // 遍历初始化的宝贝的ids
      return _initGoods.map(o => {
        // 遍历店铺所有的宝贝，获取id相等的宝贝信息
        var matchObj = that.asyncGoodsData.filter(g => {
          return g.num_iid === o.num_iid
        })[0]
        // 如果宝贝不为空获取购买周期数
        if (matchObj) {
          matchObj.buying_cycel_days = o.buying_cycel_days
        }
        return matchObj
      })
    },
    // 处理本地数据 快消品周期宝贝本地分页
    getFilterList([pagination]) {
      this.filterData = pagination.doPage(this.buyingCycelGoods)
    },
    // 删除
    delete_goods(id) {
      var that = this
      if (that.buyDayID.indexOf(id) >= 0) {
        that.buyDayContent.splice(that.buyDayID.indexOf(id), 1)
        that.buyDayID.splice(that.buyDayID.indexOf(id), 1)
      }
      this.buyingCycelGoods = this.buyingCycelGoods.filter(o => {
        return o.num_iid != id
      })

      // 展现列表
      this.showBuyingRycel()
    },
    // 子组件回调函数，用于分页
    searchRemote([pagination, sortBy]) {
      this.filterData = pagination.doPage(this.buyingCycelGoods)
    },
    // 展现快消品周期宝贝数据
    showBuyingRycel() {
      // 调用组件分页方法
      this.$refs['tableList'].init()
    },
    // 打开宝贝选择弹框
    openChoTemplate(code, eleName, selGoods) {
      this.updateOpenModal({
        name: code,
        isOpen: true
      })
      this.updateSelectGoods({
        selectGoods: selGoods,
        eleName: eleName
      })
    }
  },
  props: [
    'sortBy',
    'settingListData'
  ],
}
</script>
<style lang="scss" scoped>
@import '../../../../style/variable.scss';
$commonColor: #365964;
$commonColor_low: #AAAAAA;
.el-table {
  a {
    text-decoration: underline;
  }
}

.el-table::after {
  width: 0px;
}

.Delet {
  color: $warning;
}

.introduce {
  .sub_title {
    font-size: $titleFontSize;
    color: $commonColor;
    text-decoration: underline;
  }
  .des {
    color: $commonColor_low;
    line-height: 16px;
  }
  width: 288px;
}
</style>
