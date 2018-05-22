<template>
  <table-list
    ref="tableList"
    :hidPage='isShowGoods != undefined ? !setting_goods : false'
    :showConfBox='true'
    listTableClass='market_tablelist'
    :configClass='true'
    @checkBuyAll="checkBuyAll"
    @getBaseList="searchRemote"
    @getFilterList="getFilterList"
    :filterListData="filterData">
    <template slot="toolboxLeft" scope="props">
      <h3>
        <span style="color:#5D6D7D; font-size: 14px; font-weight: bold; margin-right: 18px;">设置{{doubleName}}宝贝</span>
        <div class='import_box'>
          <el-button class='btn_import' type='primary' @click='importClick' :disabled="isShowGoods != undefined ? !setting_goods : false">上传</el-button>
          <input class='hide_import' id='import_goods_file' type="file" @change="importGoods" />
          <a href='http://www.mofangqiang.cn/storage/2017/双11宝贝模板.xlsx' v-if="doubleName == '双11'">下载模板</a>
          <a href='http://www.mofangqiang.cn/storage/2017/双12宝贝模板.xlsx' v-else>下载模板</a>
        </div>
        <el-checkbox v-if='isShowGoods != undefined' v-model='setting_goods'>开启宝贝设置</el-checkbox>
      </h3>
      <span style="line-height: 30px">魔方墙AI思维引擎 会根据买家的潜在需求从设置的{{doubleName}}宝贝中选择匹配度最高的推送给买家，作精准营销”</span>
    </template>
    <template slot="toolbox" scope="scope">
      <div v-show='isShowGoods != undefined ? setting_goods : true' class="user_toolbox user_toolbox_position" style="margin: 0px;">
        <div class="toolbox_control">
          宝贝状态 ：
          <el-select style="width:200px;" v-model="activeGoodsState" @change='searchFiltData' size="small">
            <el-option v-for="(item, index) in goodStates" :label="item.label" :value="item.value" :key="item.value + index">
            </el-option>
          </el-select>
        </div>
        <div class="toolbox_control">
          宝贝类型 ：
          <select-group :goodsCategory="goodsCategory" :activeCategory="activeSelectGoodsCategoryBounced" :DoubleEleven="true"></select-group>
        </div>
        <el-input size="small" v-model="searchWords" style="margin: 10px 0px 7px 20px;">
          <el-button slot="append" icon="search" @click="searchFiltData"></el-button>
        </el-input>
      </div>
      <div v-show='isShowGoods != undefined ? setting_goods : true' class="selectGood_head">
        <el-checkbox class='pull-left' v-model="modelCurPageCheckedAll" @change="doCheckedCurPage">本页全选</el-checkbox>
        <el-checkbox class='pull-left' v-model="modelCheckedAll" @change="checkAll">全表全选</el-checkbox>
        <span @click="clearAll()" class="pull-left link_underline">清空已选宝贝</span>
        <el-input class='pull-left' style='padding-top: 2px' size="small" v-model="allDis" :disabled='selOrder.length <= 0'>
          <el-button slot="append" @click="doAllDis" :disabled='selOrder.length <= 0'>批量修改折扣</el-button>
        </el-input>
        <el-button class='pull-left' @click='doAllDel' type="danger" :disabled='selOrder.length <= 0'>批量删除</el-button>
      </div>
    </template>
    <template slot="toolboxRight" scope="props">
      <div v-show='isShowGoods != undefined ? setting_goods : true' style="padding: 15px 10px 0px 0px;">
        当前已有
        <span class="num">{{props.data.totalNum ? props.data.totalNum : 0}}</span> 件宝贝
        <el-button style="background-color: #0bb8f8;background-image: linear-gradient(45deg, #0bb8f8 25%, #2AF598 100%);" type="primary" @click="openChoTemplate(gbConst.openModalCodes.chooseGoods, 'buyingCycelGoods', buyingCycelGoodsCurOpen)">添加{{doubleName}}宝贝</el-button>
      </div>
    </template>
    <template slot="tableData" scope="props">
      <el-checkbox-group v-model='selOrder' v-show='isShowGoods != undefined ? setting_goods : true'>
        <el-table :data="props.data" class="selectGoods" max-height="825">
          <el-table-column align="center" width="50px" label="">
            <template scope="scope">
              <el-checkbox :label="scope.row.num_iid" class="ckGroup"></el-checkbox>
            </template>
          </el-table-column>
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
          <el-table-column min-width="110px" align="center" label="折扣">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" :manual="true" :value='buyDayID.indexOf(scope.row.num_iid) >=0 ' :content="buyDayContent.length >0 ? buyDayID.indexOf(scope.row.num_iid) >=0 ? buyDayContent[buyDayID.indexOf(scope.row.num_iid)] : '' : ''" placement="top">
                <el-input v-model="scope.row.dis" @change="checkDis(scope.row.dis, scope.row.num_iid)" style="width: 100px">
                  <template slot="append">折</template>
                </el-input>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column min-width="110px" align="center" :label="doubleName + '价格'">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" :manual="true" :value='doublePriceId.indexOf(scope.row.num_iid) >=0 ' :content="doublePriceCont.length >0 ? doublePriceId.indexOf(scope.row.num_iid) >=0 ? doublePriceCont[doublePriceId.indexOf(scope.row.num_iid)] : '' : ''" placement="top">
                <el-input v-model="scope.row.double11_price" @change="checkDoublePrice(scope.row.price, scope.row.double11_price, scope.row.num_iid, scope.row.dis)" style="width: 100px">
                  <template slot="append">元</template>
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
      </el-checkbox-group>
    </template>
  </table-list>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import utils from '../../misc/utils'
import selectGroup from '../../components/selectGroup/selectGroup'
//引入XLSX
import XLSX from 'xlsx'
export default {
  data() {
    return {
      buyingCycelGoods: [], // 存储完整的要设置快消品周期的宝贝
      isLocalSearch: false, // 是否保留分页参数 例如：删除后，要保留在当前页码
      filterData: [],
      buyingCycelGoodsCur: [],
      chooseBuyingCycelGoods: [],
      gbConst: globalConstant,
      goodStates: globalConstant.goodsStates,
      activeSelCategory: 'all',
      buyDayID: [],
      buyDayContent: [],
      asyncGoodsData: [],
      activeGoodsState: 'all',
      selOrder: [],
      allDis: '',
      searchWords: '',
      utils: utils,
      setting_goods: false,
      modelCurPageCheckedAll: false,
      modelCheckedAll: false,
      doublePriceId: [],
      doublePriceCont: []
    }
  },
  watch: {
    // 选择宝贝回传来的数据变化时执行
    selectGoodsData() {
      var selGoodsData = this.selectGoodsData
      if (selGoodsData.eleName === 'buyingCycelGoods') {
        this.buyingCycelGoods = this.getBuyingRycelGoodsBySel(selGoodsData.selectGoods)
        this.activeGoodsState = 'all'
        this.updateActiveGoodsCategoryBounced('all')
        this.searchWords = ''
        this.searchFiltData()
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
            this.searchFiltData()
          })
        } else {  // 已经加载了店铺宝贝数据
          // clone 宝贝数据
          that.asyncGoodsData = JSON.parse(JSON.stringify(that.goodsData))
          that.buyingCycelGoods = that.getBuyingRycelGoodsByInit(that.settingListData)
          this.searchFiltData()
        }
      } else { // 父组件数据为空
        if (!that.goodsData || that.goodsData.length === 0) { // 未加店铺载宝贝数据
          that.getGoods([]).then(data => {
            that.asyncGoodsData = data
            // 展现列表
            that.showBuyingRycel()
          })
        } else {
          // clone 宝贝数据
          that.asyncGoodsData = JSON.parse(JSON.stringify(that.goodsData))
          // 置空当前数据
          that.buyingCycelGoods = []
          // 置空当前数据
          that.showBuyingRycel()
        }
      }
    },
    //开启宝贝设置
    isShowGoods() {
      this.setting_goods = this.isShowGoods
    },
    setting_goods() {
      this.updateValue()
    },
    // 将修改的快消品宝贝数据同步到父组件
    buyingCycelGoods() {
      this.updateValue()
      // this.searchGoods()
      this.searchFiltData()
    },
    chooseBuyingCycelGoods() {
      // 展现列表
      if (this.isLocalSearch) {
        this.isLocalSearch = false
        this.$refs['tableList'].searchLocal()
      } else {
        this.showBuyingRycel()
      }
    },
    activeSelectGoodsCategoryBounced() {
      this.searchFiltData()
    },
    //是否本页全选或，全表全选
    selOrder() {
      this.modelCurPageCheckedAll = this.isCurPageCheckedAll()
      this.modelCheckedAll = this.isCheckedAll()
    },
    filterData() {
      this.modelCurPageCheckedAll = this.isCurPageCheckedAll()
      this.modelCheckedAll = this.isCheckedAll()
    }
  },
  computed: {
    ...mapGetters([
      'selectGoodsData',
      'goodsData',
      'activeSelectGoodsCategoryBounced',
      'goodsCategory',
      'jurisdictionData'
    ]),
    buyingCycelGoodsCurOpen() {
      return this.buyingCycelGoodsCur.map(o => {
        return o.num_iid
      })
    }
  },
  beforeMount() {
    if (!this.goodsData || this.goodsData.length === 0) {
      this.getGoods([])
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions([
      'updateOpenModal',
      'updateSelectGoods',
      'updataBaseMConfig',
      'getGoods',
      'getGoodsCategory',
      'updateActiveGoodsCategoryBounced'
    ]),
    init() {
      this.clearSearchParam()
      // 加载宝贝分类数据
      // 判断为空的时候请求
      if (this.goodsCategory.length <= 1) {
        this.getGoodsCategory()
      }
    },
    getContent(id) {
      return this.buyDayContent.length > 0 ? this.buyDayID.indexOf(id) >= 0 ? this.buyDayContent[this.buyDayID.indexOf(id)] : '' : ''
    },
    //价格改变，改变折扣
    changeDis(value, doublevalue, niid, oldDis, index) {
      var _allDate = this.filterData.filterData
      var _dis = ((parseFloat(doublevalue) / parseFloat(value)) * 10).toFixed(2)
      if (parseFloat(oldDis) != parseFloat(_dis)) {
        for (var i in _allDate) {
          if (_allDate[i].num_iid == niid) {
            _allDate[i].dis = _dis
          }
        }
      }
    },
    //折扣改变，价格改变
    changeDoublePrice(dis, id) {
      var _allDate = this.filterData.filterData
      for (var i in _allDate) {
        if (_allDate[i].num_iid == id) {
          _allDate[i].double11_price = (parseFloat(_allDate[i].price) * parseFloat(dis) / 10).toFixed(2)
        }
      }
    },
    //验证折扣
    checkDis(value, id, isall) {
      var reg = /^[0-9]([.][0-9]{1,2})?$/
      // var reg = /^([0-9]){1}+(.[0-9]{1,2})?$/
      var that = this;
      if (value === 10 || value === '10') {
        if (that.buyDayID.indexOf(id) >= 0) {
          that.buyDayContent.splice(that.buyDayID.indexOf(id), 1)
          that.buyDayID.splice(that.buyDayID.indexOf(id), 1)
        }
      } else if (value == '') {
        if (that.buyDayID.indexOf(id) < 0) {
          that.buyDayID.push(id)
          that.buyDayContent.push('请输入折扣')
        } else {
          that.buyDayContent.splice(that.buyDayID.indexOf(id), 1)
          that.buyDayID.splice(that.buyDayID.indexOf(id), 1)
          that.buyDayID.push(id)
          that.buyDayContent.push('请输入折扣')
        }

      } else if (!reg.test(value)) {
        if (that.buyDayID.indexOf(id) < 0) {
          that.buyDayID.push(id)
          that.buyDayContent.push('折扣格式输入错误')
        } else {
          that.buyDayContent.splice(that.buyDayID.indexOf(id), 1)
          that.buyDayID.splice(that.buyDayID.indexOf(id), 1)
          that.buyDayID.push(id)
          that.buyDayContent.push('折扣格式输入错误')
        }

      } else {
        if (that.buyDayID.indexOf(id) >= 0) {
          that.buyDayContent.splice(that.buyDayID.indexOf(id), 1)
          that.buyDayID.splice(that.buyDayID.indexOf(id), 1)
        }
        if (!isall) {
          this.changeDoublePrice(value, id)
          that.updateValue()
        }
      }
      this.$refs['tableList'].searchLocal()
    },
    //验证双11价格
    checkDoublePrice(pic, dpic, id, dis, isall) {
      var _name = this.doubleName
      var reg = /^[0-9]+(.[0-9]{1,2})?$/g;
      var that = this
      if (dpic == '') {
        if (that.doublePriceId.indexOf(id) < 0) {
          that.doublePriceId.push(id)
          that.doublePriceCont.push(_name + '价格不能为空')
        } else {
          that.doublePriceCont.splice(that.doublePriceId.indexOf(id), 1)
          that.doublePriceId.splice(that.doublePriceId.indexOf(id), 1)
          that.doublePriceId.push(id)
          that.doublePriceCont.push(_name + '价格不能为空')
        }
        return
      }
      var _pic = parseFloat(pic)
      var _dpic = parseFloat(dpic)
      if (_dpic > _pic) {
        if (that.doublePriceId.indexOf(id) < 0) {
          that.doublePriceId.push(id)
          that.doublePriceCont.push(_name + '价格不能大于原价')
        } else {
          that.doublePriceCont.splice(that.doublePriceId.indexOf(id), 1)
          that.doublePriceId.splice(that.doublePriceId.indexOf(id), 1)
          that.doublePriceId.push(id)
          that.doublePriceCont.push(_name + '价格不能大于原价')
        }
      } else if (!reg.test(dpic)) {
        if (that.doublePriceId.indexOf(id) < 0) {
          that.doublePriceId.push(id)
          that.doublePriceCont.push(_name + '价格格式错误')
        } else {
          that.doublePriceCont.splice(that.doublePriceId.indexOf(id), 1)
          that.doublePriceId.splice(that.doublePriceId.indexOf(id), 1)
          that.doublePriceId.push(id)
          that.doublePriceCont.push(_name + '价格格式错误')
        }
      } else {
        if (that.doublePriceId.indexOf(id) >= 0) {
          that.doublePriceCont.splice(that.doublePriceId.indexOf(id), 1)
          that.doublePriceId.splice(that.doublePriceId.indexOf(id), 1)
        }
        if (!isall) {
          this.changeDis(_pic, _dpic, id, dis)
          that.updateValue()
        }
      }
      this.$refs['tableList'].searchLocal()
    },
    // 全不选
    clearAll() {
      this.selOrder = []
    },
    //批量设置折扣
    doAllDis() {
      var _dis = this.allDis
      var reg = /^[0-9]([.][1-9]{1,2})?$/
      if (_dis == '10' || (_dis != '' && reg.test(_dis))) {
        this.changeAllDis(_dis)
      } else {
        this.utils.showErrorMsg(this, '请输入正确的折扣信息')
      }
    },
    //批量删除
    doAllDel() {
      var that = this
      if (this.selOrder.length > 0) {
        that.$confirm('是否批量删除宝贝', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (var i in that.selOrder) {
            that.delete_goods(that.selOrder[i], true)
          }
          that.selOrder = []
          that.$message({
            type: 'success',
            customClass: 'message_position',
            message: '删除成功!'
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            customClass: 'message_position',
            message: '已取消删除'
          })
        })
      }
    },
    changeAllDis(value) {
      if (this.selOrder.length > 0) {
        for (var i in this.filterData.filterData) {
          if (this.selOrder.indexOf(this.filterData.filterData[i].num_iid) >= 0) {
            this.filterData.filterData[i].dis = value
            this.filterData.filterData[i].double11_price = (parseFloat(this.filterData.filterData[i].price) * parseFloat(value) / 10).toFixed(2)
          }
        }
        this.$refs['tableList'].searchLocal()
        this.updateValue()
      }
    },
    // 清空页面参数
    clearSearchParam() {
      this.activeGoodsState = 'all'
      this.updateActiveGoodsCategoryBounced('all')
      this.searchWords = ''
    },
    //搜索
    searchFiltData() {
      var _state = this.activeGoodsState
      var _type = this.activeSelectGoodsCategoryBounced
      var _word = this.searchWords
      this.dosomething(_state, _type, _word)
    },
    dosomething(goodsState, goodsCategory, keyWord) {
      var tempRet = this.buyingCycelGoods.filter(o => {
        var stateOk = o.approve_status === goodsState || goodsState === 'all'
        var categoryOk = false
        if (goodsCategory === 'all' || goodsCategory[0] === 'all') {
          categoryOk = true
        } else {
          categoryOk = !goodsCategory.every(cid => {
            return o.seller_cids.indexOf(cid + '') < 0
          })
        }
        var tempKey = this.utils.trim(keyWord)
        var keyWordOk = tempKey.length === 0 || o.sub_title.indexOf(tempKey) >= 0 || o.title.indexOf(tempKey) >= 0 || (o.num_iid + '').indexOf(tempKey) >= 0
        if (stateOk && categoryOk && keyWordOk) {
          return true
        } else {
          return false
        }
      })
      this.chooseBuyingCycelGoods = tempRet
    },
    //验证
    checkBuyAll() {
      if (this.setting_goods) {
        var isall = true
        this.clearSearchParam()
        for (var i in this.buyingCycelGoods) {
          this.checkDis(this.buyingCycelGoods[i].dis, this.buyingCycelGoods[i].num_iid, isall)
          this.checkDoublePrice(this.buyingCycelGoods[i].price, this.buyingCycelGoods[i].double11_price, this.buyingCycelGoods[i].num_iid, this.buyingCycelGoods[i].dis, isall)
        }
        //错误提示
        if (this.buyDayID.length > 0) {
          this.utils.showErrorMsg(this, 'id为' + this.buyDayID + '的宝贝折扣格式错误')
        }
        if (this.doublePriceId.length > 0) {
          this.utils.showErrorMsg(this, 'id为' + this.doublePriceId + '的宝贝价格格式错误')
        }
        return this.buyDayID.length == 0 && this.doublePriceId.length == 0
      } else {
        return true
      }
    },
    //////////////////////////////////////// 设置双11折扣部分 ////////////////////////////////////////
    updateValue() {
      var that = this
      if((this.isShowGoods != undefined && this.setting_goods) || this.isShowGoods == undefined) {
        var _data = this.buyingCycelGoods.map(o => {
          return {
            num_iid: o.num_iid,
            dis: o.dis,
            double11_price: o.double11_price
          }
        })
        this.buyingCycelGoodsCur = _data
        // 更新营销配置基本量
        if(this.isShowGoods == undefined) {
          this.updataBaseMConfig({
            double_items: _data,
          })
        } else {
          this.updataBaseMConfig({
            double_items: _data,
            setting_goods: that.setting_goods
          })
        }
      }else if(this.isShowGoods != undefined && !this.setting_goods) {
        this.updataBaseMConfig({
            double_items: [],
            setting_goods: that.setting_goods
          })
      }
    },
    // 根据选择宝贝后回传的ids，获取详细的宝贝信息
    getBuyingRycelGoodsBySel(ids) {
      if (!ids) return []
      // clone 宝贝数据
      var _goodsData = JSON.parse(JSON.stringify(this.goodsData))
      // 遍历选择的宝贝的ids
      return ids.map(o => {
        // 遍历店铺所有的宝贝，获取id相等的宝贝信息
        var matchObj = _goodsData.filter(g => {
          return g.num_iid === o
        })[0]
        // 将重复购买周期初始化为0
        matchObj.dis = '10'
        matchObj.double11_price = matchObj.price
        // 遍历历史快消品购买周期，保留其设置的购买周期
        this.buyingCycelGoodsCur.forEach(g => {
          if (matchObj.num_iid === g.num_iid) {
            matchObj.dis = g.dis
            matchObj.double11_price = g.double11_price
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
          matchObj.dis = o.dis ? o.dis : ((parseFloat(o.double11_price) / parseFloat(matchObj.price)) * 10).toFixed(2)
          matchObj.double11_price = o.double11_price
        }
        return matchObj
      }).filter(n => {
        return n != undefined
      })
    },
    // 处理本地数据 快消品周期宝贝本地分页
    getFilterList([pagination]) {
      this.filterData = pagination.doPage(this.chooseBuyingCycelGoods)
    },
    // 删除
    delete_goods(id, all) {
      var that = this
      if (all) {
        this.do_delete(id)
      } else {
        that.$confirm('是否删除宝贝', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.do_delete(id)
          that.selOrder.splice(that.selOrder.indexOf(id), 1)
          that.$message({
            type: 'success',
            customClass: 'message_position',
            message: '删除成功!'
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            customClass: 'message_position',
            message: '已取消删除'
          })
        })
      }
    },
    do_delete(id) {
      this.isLocalSearch = true
      var that = this
      if (that.buyDayID.indexOf(id) >= 0) {
        that.buyDayContent.splice(that.buyDayID.indexOf(id), 1)
        that.buyDayID.splice(that.buyDayID.indexOf(id), 1)
        that.doublePriceCont.splice(that.doublePriceId.indexOf(id), 1)
        that.doublePriceId.splice(that.doublePriceId.indexOf(id), 1)
      }
      this.buyingCycelGoods = this.buyingCycelGoods.filter(o => {
        return o.num_iid != id
      })
    },
    // 子组件回调函数，用于分页
    searchRemote([pagination]) {
      this.filterData = pagination.doPage(this.chooseBuyingCycelGoods)
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
    },
    // 勾选选中的宝贝
    checkedSelOrder(val) {
      var ret = false
      for (var i = 0; i < this.selOrder.length; i++) {
        if (this.selOrder[i] === val) {
          ret = true
          break
        }
      }
      return ret
    },
    // 通用选中
    commonCheck(checked, id) {
      if (checked) {
        if (!this.checkedSelOrder(id)) {
          this.selOrder.push(id)
        }
      } else {
        if (this.checkedSelOrder(id)) {
          this.selOrder = this.selOrder.filter(o => {
            return o !== id
          })
        }
      }
    },
    // 选中事件
    doChecked(event, id) {
      var checked = event.target.checked
      this.commonCheck(checked, id)
    },
    // 本页全选
    doCheckedCurPage(event) {
      if (this.filterData.curPageData) {
        this.filterData.curPageData.forEach(o => {
          this.doChecked(event, o.num_iid)
        })
      }
    },
    // 全选
    checkAll(event) {
      if (this.filterData.filterData) {
        this.filterData.filterData.forEach(o => {
          this.doChecked(event, o.num_iid)
        })
      }
    },
    // 是否本页全选
    isCurPageCheckedAll() {
      if (!this.filterData.curPageData) return false
      var ret = false
      for (var j = 0; j < this.filterData.curPageData.length; j++) {
        ret = false
        var o = this.filterData.curPageData[j]
        for (var i = 0; i < this.selOrder.length; i++) {
          if (this.selOrder[i] === o.num_iid) {
            ret = true
            break
          }
        }
        if (!ret) {
          break
        }
      }
      return ret
    },
    // 是否全选
    isCheckedAll() {
      var retData = this.filterData.filterData
      if (!retData) return false
      var tempObj = {}
      var tempArray = []
      // for (var i = 0; i < this.selOrder.length; i++) {
      //   var id = this.selOrder[i]
      //   if (!tempObj[id]) {
      //     tempArray.push(id)
      //   }
      // }
      if (retData.length === 0) return false
      for (var i in retData) {
        if (this.selOrder.indexOf(retData[i].num_iid) >= 0) {
          tempArray.push(retData[i].num_iid)
        }
      }
      if (tempArray.length === retData.length) {
        return true
      } else {
        return false
      }
    },
    //导入测试
    importGoods(e) {
      var that = this
      var files = e.target.files
      var f = files[0]
      if (!f) {
        return
      }
      var reg = /^.*\.(?:xls|xlsx)$/i;//文件名可以带空格
      var import_goods_file = document.getElementById('import_goods_file')
      if (!reg.test(f.name)) {
        //校验不通过
        this.utils.showErrorMsg(that, "请上传excel格式的文件!")
        import_goods_file.value = []
        return
      } else {
        var reader = new FileReader()
        reader.onload = function(e) {
          var data = e.target.result
          data = new Uint8Array(data);
          var workbook = XLSX.read(data, { type: 'array' })
          if (!workbook.Sheets.Sheet1) {
            that.utils.showErrorMsg(that, "表一名称应为：‘Sheet1’")
            import_goods_file.value = []
            return
          }
          //四种数据输出格式
          var _excel_json = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1)
          var isTrue = that.checkJson(_excel_json)
          if (isTrue) {
            var goods_data = that.changeToJsons(_excel_json)
            if (that.buyingCycelGoods.length > 0) {
              goods_data.push.apply(goods_data, that.buyingCycelGoods)
            }
            that.double11Import(goods_data)
            import_goods_file.value = []
          } else {
            import_goods_file.value = []
          }
        }
        reader.onerror = function(e) {
          that.utils.showErrorMsg(that, "文件内容格式错误!")
        }
        reader.readAsArrayBuffer(f);
      }
    },
    //转化json格式
    changeToJsons(value) {
      var _data = []
      var _name = this.doubleName === '双11' ? '双11价格' : '双12价格'
      for (var i in value) {
        var _part = {}
        _part.num_iid = parseInt(value[i]['宝贝id'])
        _part.double11_price = value[i][_name]
        _data.push(_part)
      }
      return _data
    },
    //验证excel格式
    checkJson(value) {
      var that = this
      var _name = this.doubleName === '双11' ? '双11价格' : '双12价格'
      if (!value || value.length <= 0) {
        that.utils.showErrorMsg(that, "亲,请不要上传空文件哦!")
        return false
      }
      if (Object.getOwnPropertyNames(value[0]).length != 3) {
        that.utils.showErrorMsg(that, "文件内容格式错误!")
        return false
      } else if (value[0].hasOwnProperty('宝贝id') && value[0].hasOwnProperty(_name)) {
        return true
      } else {
        that.utils.showErrorMsg(that, "文件内容格式错误!")
        return false
      }
    },
    importClick() {
      var import_goods_file = document.getElementById('import_goods_file')
      import_goods_file.click()
    }
  },
  props: [
    'sortBy',
    'settingListData',
    'isShowGoods',
    'double11Import',
    'doubleName'
  ],
  components: {
    selectGroup
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variable.scss';
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

.selectGood_head {
  height: 38px;
  line-height: 35px;
  padding: 10px 30px;
  font-size: $menuFontSize;
  a {
    text-decoration: underline;
    color: #0099ff;
    margin-right: 20px;
  }
  .link_underline {
    color: #0099ff;
  }
  .el-checkbox,
  .el-input,
  .el-button--danger {
    margin: 0px 15px;
  }
}

.import_box {
  display: inline-block;
  .hide_import {
    display: none;
  }
}
</style>
