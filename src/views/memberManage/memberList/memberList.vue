<template>
  <div>
      <content-header
        :name="vm.name"
      >
      <template
        slot="toolBox"
      >
      <!--隐藏未开发的功能-->
        <el-button v-if='jurisdictionData.secondShow' type="primary" :disabled="true" @click="openModal(gbConst.marketGroup, vm.id)">
            <div>
                营销本组会员(
                <span class="undev">
                {{g_const.finishState[0]}}
                </span>)
            </div>
        </el-button>
      </template>
      </content-header>
      <div class="member_head">
          <el-tabs v-model="vm.activeName" @tab-click="activeSubCode">
            <el-tab-pane label="本组会员列表" name="thisGroupVIP"></el-tab-pane>
            <!--隐藏未开发的功能-->
            <el-tab-pane v-if='jurisdictionData.secondShow' name="thisGroupVIPData" :disabled="true">
                <span slot="label">
                    本组数据<span class="undev">({{g_const.finishState[0]}})</span>
                </span>
            </el-tab-pane>
         </el-tabs>
      </div>
      <div class="search_box">
        <div class="user_toolbox">
            <!--暂时隐藏等待后端修复搜索功能-->
            <search-input
                ref="searchInput"
                myPlaceholder="买家ID/姓名/手机号"
                :searchStyle="{width:'300px'}"
                :searchByWord="doSearch"
                showClearLink="true"
                @sycnSearchWord="sycnSearchWord"
                :searchWord="search_word"
                v-show="false"
            >
                <template slot="clear" scope="scope">
                    <a class="link link_underline empty" @click="clearAllParam()">清空所有条件</a>
                </template>
            </search-input>
            <div class="link senior_search pull-right">
                <a @click="showSeniorSearch = !showSeniorSearch" v-show="!showSeniorSearch">高级搜索</a>
                <a @click="showSeniorSearch = !showSeniorSearch" v-show="showSeniorSearch">收起高级搜索</a>
                <p class="pull-right member_num">当前会员数量：<span>{{this.pagination.totalNum}}</span></p>
            </div>
            <!--<multi-search
             v-show="showSeniorSearch"
             :searchConf="multiSearchConf"
            >
            </multi-search>-->
            <base-VIP-config ref="base_test" :baseData='multiSearchConf' @updateConf='updateFilterOption'>
                <template slot="baseConfig" scope='props'>
                  <div class="form-control form_control more-content dashedLine" style="width: 100%;" v-show="showSeniorSearch">
                    <el-form-item prop="created">
                        <config-order-time :orderTime="props.conf.created" :orderTimeLabel="props.conf.created_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-order-time>
                    </el-form-item>
                    <el-form-item prop="trade_from">
                        <config-order-from :tradeFrom="props.conf.trade_from" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-order-from>
                    </el-form-item>
                    <el-form-item prop="activity_type">
                        <config-order-types :checkedOrderType="props.conf.activity_type" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-order-types>
                    </el-form-item>
                    <el-form-item>
                        <config-order-payment :memberSearch="'订单总金额：'" :paymentLabel="props.conf.payment_label" :payment="props.conf.payment" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-order-payment>
                    </el-form-item>
                    <el-form-item prop="status">
                        <config-order-state :orderState="props.conf.status" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-order-state>
                    </el-form-item>
                    <el-form-item prop="buys">
                        <config-goods-num :memberSearch="'商品总件数：'" :buys="props.conf.buys" :buysLabel="props.conf.buys_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-goods-num>
                    </el-form-item>
                    <el-form-item>
                        <config-buy-count :purchase="props.conf.purchase_times" :purchaseLabel="props.conf.purchase_times_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-buy-count>
                    </el-form-item>
                    <el-form-item prop="order_num">
                        <config-goods-type :memberSearch="'商品总种类：'" :orderNum="props.conf.order_num" :orderNumLabel="props.conf.order_num_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-goods-type>
                    </el-form-item>
                    <el-form-item props="items_range">
                        <member-items-range :itemsValue="props.conf.items_range" :itemsLabel="props.conf.items_range_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </member-items-range>
                    </el-form-item>
                    <el-form-item prop="pay_time">
                        <config-pay-time :payTime="props.conf.pay_time" :payTimeLabel="props.conf.pay_time_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-pay-time>
                    </el-form-item>
                    <el-form-item prop="consign_time">
                        <config-consign-time :consignTime="props.conf.consign_time" :consignTimeLabel="props.conf.consign_time_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-consign-time>
                    </el-form-item>
                    <el-form-item prop="sign_time">
                        <config-sign-time :signTime="props.conf.sign_time" :signTimeLabel="props.conf.sign_time_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-sign-time>
                    </el-form-item>
                    <el-form-item prop="end_time">
                        <config-confirm-time :confirmTime="props.conf.end_time" :confirmTimeLabel="props.conf.end_time_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-confirm-time>
                    </el-form-item>
                    <el-form-item prop="buyer_message">
                        <config-buyer-message :buyerMessage="props.conf.buyer_message" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-buyer-message>
                    </el-form-item>
                    <el-form-item>
                        <config-flags :checkedFlags="props.conf.seller_flag" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-flags>
                    </el-form-item>
                    <el-form-item>
                        <config-express :expressArraySel="props.conf.express" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-express>
                    </el-form-item>
                    <el-form-item>
                        <config-select-city :selCity="props.conf.city" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                        </config-select-city>
                    </el-form-item>
                  </div>
                </template>
            </base-VIP-config>
            <div class="search_bottom dashedLine" v-show="showSeniorSearch">
                <div class="search_btn">
                    <el-button type="primary" @click="tempDoMultiSearch">搜索</el-button>
                    <a class="link link_underline empty" @click="clearAllParam">清空所有条件</a>
                    <a @click="showSeniorSearch = !showSeniorSearch" class="pull-right link senior_search">收起高级搜索</a>
                </div>
            </div>
        </div>
      </div>
      <div
        class="user_tablelist"
        v-loading="loading"
        element-loading-text="数据较多,请耐心等待">
          <el-table
              class="user_header"
              :data="memberListData"
              border
              stripe
              max-height="640"
              style="background:$white">
              <el-table-column
                :prop="settingGlobal.IS_HIDE_ID == 1 ? 'nick_change' : 'nick'"
                align="center"
                min-width="150"
                label="买家ID">
                <template scope="scope">
                    <group-tag
                    class="pull-left"
                    v-show="scope.row.is_black"
                    name="黑"
                    type="black"
                    >
                    </group-tag>
                    <group-tag
                    class="pull-left margin_l_2"
                    v-show="scope.row.is_grey"
                    name="灰"
                    type="grey"
                    >
                    </group-tag>
                    <span class="alginWithtag">{{settingGlobal.IS_HIDE_ID == 1 ? scope.row.nick_change : scope.row.nick}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="grade_crm"
                min-width="95"
                align="center"
                label="CRM会员等级">
              </el-table-column>
              <el-table-column
                align="center"
                :prop="settingGlobal.IS_HIDE_NAME == 1 ? 'real_name_change' : 'real_name'"
                min-width="60"
                label="姓名">
              </el-table-column>
              <el-table-column
                :prop="settingGlobal.IS_HIDE_PHONE == 1 ? 'mobile_change' : 'mobile'"
                align="center"
                min-width="80"
                label="手机号">
              </el-table-column>
              <el-table-column
                prop="trade_payment_sum_show"
                min-width="100"
                align="right"
                header-align="center"
                label="成功交易总金额">
              </el-table-column>
              <el-table-column
                prop="trade_merged_count"
                align="center"
                min-width="90"
                label="成功购买次数">
              </el-table-column>
              <el-table-column
              align="center"
              label="最近一次">
              <el-table-column
                prop="last_trade_success_time_date"
                min-width="88"
                align="center"
                label="成功交易时间">
                <template scope="scope">
                 <p>{{scope.row.last_trade_success_time_date.date}}<br/>{{scope.row.last_trade_success_time_date.time}}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="last_trade_success_payment"
                min-width="88"
                align="right"
                header-align="center"
                label="成功交易金额">
              </el-table-column>
              <el-table-column
                prop="last_trade_status"
                min-width="88"
                align="center"
                label="交易成功情况">
              </el-table-column>
              <el-table-column
                prop="last_marketing_time_date"
                min-width="70"
                align="center"
                label="营销时间">
                <template scope="scope">
                 <p>{{scope.row.last_marketing_time_date.date}}<br/>{{scope.row.last_marketing_time_date.time}}</p>
                </template>
              </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                min-width="130"
                label="操作">
                <template scope="scope">
                    <a class="link link_underline" @click="openModal(gbConst.memberDetails, scope.row.id)">查看详情</a>
                    <el-dropdown trigger="click"  menu-align="start"  @command="addToHouse">
                    <span class="el-dropdown-link" v-show="!scope.row.is_grey || !scope.row.is_black">
                        <a class="link link_underline" style="margin-left: 8px">其他操作</a><i class="el-icon-caret-bottom el-icon--right" style="color: #ccc"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-show="!scope.row.is_grey" :command="{code:'addGreyList', id: scope.row.id}"><a class="link link_underline">加入灰名单</a></el-dropdown-item>
                        <el-dropdown-item v-show="!scope.row.is_black" :command="{code:'addBlackList', id: scope.row.id}"><a class="link link_underline">加入黑名单</a></el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </template>
                </el-table-column>
          </el-table>
          <div class="pull-right filer_pag">
              <el-pagination
                :page-sizes="pagination.pageSizes"
                :page-size="pagination.pageSize"
                :current-page="pageIndex"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.totalNum"
                @current-change="doPageByNum"
                @size-change="doPageBySize"
                >
              </el-pagination>
              <a class="to_top" v-show="false"><i class="el-icon-caret-top"></i></a>
          </div>
      </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../../misc/global.constant'
  import pagination from '../../../misc/pagination'
  import API_MARKET from '../../../service/marketing.service'
  import memberItemsRange from './itemsRange'
  import utils from '../../../misc/utils'
  export default {
    data() {
      return {
        vm: {
          category: '',
          name: '',
          id: '',
          activeName: globalConstant.activeCode.thisGroupVIP,
        },
        loading: false,
        pagination: {},
        pageIndex: 1,
        showSeniorSearch: false,
        search_word: '',
        multiSearchConf: {
            created: [],
            trade_from: '',
            activity_type: [],
            payment: [],
            status: '',
            buys: [],
            purchase_times: [],
            order_num: [],
            items_range: {
                // include: [],
                // exclude: []
                xx: [],
                xy: []
            },
            pay_time: [],
            consign_time: [],
            sign_time: [],
            end_time: [],
            buyer_message: '',
            seller_flag: []
        },
        g_const: globalConstant
      }
    },
    watch: {
        $route() {
            this.init()
            this.search()
        },
        memberListData() {
            this.loading = false
        }
    },
    computed: {
        ...mapGetters([
            'memberListData',
            'baseMConfigData',
            'settingGlobal',
            'jurisdictionData'
        ]),
        gbConst() {
            return globalConstant.openModalCodes
        }
    },
    created() {
        this.pagination = Object.assign(this.pagination, pagination)
        this.init()
        this.search()
    },
    mounted() {
        this.getSubCode(globalConstant.activeCode.thisGroupVIP)
        if(this.$route.query.type) {
            this.updateSiderbarActiveNode({
                id: this.$route.query.id,
                openName: this.$route.query.type
            })
        }
        this.pagination.init()
    },
    methods: {
        ...mapActions([
            'getMemberListPage',
            'getSubCode',
            'updateSiderbarActiveNode',
            'updateOpenModal',
            'getMemberListMultiSearch',
            'addBlackList',
            'addGreyList',
            'emptyBaseMConfig'
        ]),
        // 初始化页面
        init() {
            // 重新获取页面参数
            var obj = this.$route.query
            this.vm.category = obj.type
            this.vm.name = obj.name
            this.vm.id = obj.id
            // 分页初始化
            this.pagination.init()
            this.pageIndex = 1
            // 初始化关键字搜索
            this.search_word = ''
            // 隐藏高级搜索
            this.showSeniorSearch = false
            // 初始化高级搜索参数
            this.initMultiSearch()
        },
        clearAllParam() {
            var that = this
            that.initMultiSearch()
            setTimeout(o => {
                that.initMultiSearch()
            }, 500)
        },
        // 加入黑/灰名单
        addToHouse(obj) {
            if (obj.code === 'addGreyList') {
                this.doAddGreyList(obj.id)
            } else if(obj.code === 'addBlackList') {
                this.doAddBlackList(obj.id)
            }
        },
        updateFilterOption(data) {
            this.multiSearchConf = Object.assign({}, this.multiSearchConf, data)
        },
        // 初始化查询条件
        initMultiSearch() {
            if(this.$refs.searchInput) {
                this.$refs.searchInput.clearAllParamNoSearch()
            }
            var baseConf = {
                created: [],
                trade_from: '',
                activity_type: [],
                payment: [],
                status: '',
                buys: [],
                purchase_times: [],
                order_num: [],
                items_range: {
                    xx: [],
                    xy: []
                },
                pay_time: [],
                consign_time: [],
                sign_time: [],
                end_time: [],
                buyer_message: '',
                seller_flag: [],
                express: [],
                city: []
            }
            // 清空全局组件状态值
            this.emptyBaseMConfig()
            var retConf = API_MARKET.baseSetTransform(this.baseMConfigData, this.multiSearchConf)
            var that = this
            that.multiSearchConf = API_MARKET.baseGetTransform(baseConf)
            if(this.$refs.base_test) {
                this.$refs.base_test.clearAll(this.multiSearchConf)
            }
        },
        tempDoMultiSearch() {
            // 分页初始化
            this.pagination.init()
            this.pageIndex = 1
            this.doMultiSearch()
        },
        // 高级查询
        doMultiSearch() {
            this.loading = true
            var _baseConf = {
                created: [],
                trade_from: '',
                activity_type: [],
                payment: [],
                status: '',
                buys: [],
                purchase_times: [],
                order_num: [],
                items_range: {
                    xx: [],
                    xy: []
                },
                pay_time: [],
                consign_time: [],
                sign_time: [],
                end_time: [],
                buyer_message: '',
                seller_flag: [],
                express: [],
                city: []
            }
            var retConf = API_MARKET.baseSetTransform(this.baseMConfigData, this.multiSearchConf)
            var _retConf = API_MARKET.baseSetTransform(retConf, _baseConf)
            if(_retConf.payment_label == 'custom') {
                _retConf.payment = this.multiSearchConf.payment_more
            }
            this.getMemberListMultiSearch([this.$route.query.id, this.pagination, JSON.stringify(_retConf)])
        },
        /**
         *  关键字检索，同步查询条件到父元素
         *  @param val 检索关键字
         * */
        sycnSearchWord(val) {
            this.search_word = val
        },
        // 刷新会员列表（保留检索条件）
        refresh() {
            if(this.showSeniorSearch) {
                this.doMultiSearch()
            } else {
                this.search()
            }
        },
        doSearch() {
            this.pageIndex = 1
            this.pagination.init()
            this.search()
        },
        // 普通查询（非高级检索）
        search() {
            this.loading = true
            this.getMemberListPage([this.$route.query.id, this.pagination, this.search_word])
        },
        /**
         *  移入黑名单
         *  @param id 会员id
         * */
        doAddBlackList(id) {
            this.addBlackList([id]).then(o => {
                utils.showSuccessMsg(this, '操作成功')
                this.refresh()
            })
        },
        /**
         *  移入灰名单
         *  @param id 会员id
         * */
        doAddGreyList(id) {
            this.addGreyList([id]).then(o => {
                utils.showSuccessMsg(this, '操作成功')
                this.refresh()
            })
        },
        doPageByNum(val) {
            this.pagination.pageIndex = val
            this.pageIndex = val
            if(this.showSeniorSearch) {
                this.doMultiSearch()
            }else {
                this.search()
            }
        },
        doPageBySize(val) {
            this.pagination.pageSize = val
            if(this.showSeniorSearch) {
                this.doMultiSearch()
            }else {
                this.search()
            }
        },
        // 激活页卡
        activeSubCode(tab) {
            this.getSubCode(tab.name)
        },
        // 弹出框
        openModal(code, id) {
            this.updateOpenModal({
                name: code,
                param: {
                    id: id
                }
            })
        },
        getTagType(obj) {
            var type = {}
            if(obj.is_black) {
                type.color = 'black'
                type.name = '黑'
            } else if(obj.is_grey) {
                type.color = 'gren'
                type.name = '灰'
            }
            return type
        }
    },
    components: {
        memberItemsRange
    }
}
</script>
<style lang="scss" scoped>
@import '../../../style/variable.scss';

.user_tablelist {
  overflow: hidden;
  background: $white;
}
.content {
    padding-top: 1px;
    margin: 0px;
}
.user_toolbox {
    margin-bottom: 10px;
}
h4 {
    padding-left: 20px;
    font-size: 12px;
    color: #ccc;
    margin-top: 15px;
    margin-bottom: -10px;
}
.member_head {
    height: 40px;
    line-height: 40px;
    border-bottom: solid 1px #d1dbe5;
    font-size: 12px;
    .member_head_name {
        position: relative;
        left: 40px;
        padding: 0px 10px;
        display: inline-block;
        .under_line {
            height: 4px;
            width: 100%;
            background: $primary;
            position: absolute;
            bottom: 0px;
            left: 0px;

        }
    }
}
.senior_search {
    display: inline-block;
    font-size: 12px;
    margin: 16px;
    text-decoration: underline;
}
.empty {
    display: inline-block;
    margin: 16px;
}
.member_num {
    padding-left: 20px;
    font-size: 12px;
    margin-right: 20px;
    color: #818181;
    span {
        font-size: 16px;
        color: $primary;
    }

}
.link {
    font-size: 12px;
}
.el-pagination {
    float: left;
}
.to_top {
    display: inline-block;
    width: 28px;
    height: 28px;
    background: #ddd;
    font-size: 12px;
    color: #ccc;
    text-align: center;
    line-height: 28px;
    border-radius: 2px;
    float: right;
    margin: 10px 5px;
}
.search_bottom {
    overflow: hidden;
    .search_btn {
        text-align: center;
    }
}

.alginWithtag {
    padding: 2px 4px 2px 4px;
    line-height: 18px;
}
</style>
