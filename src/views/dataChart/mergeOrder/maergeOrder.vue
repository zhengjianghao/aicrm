<template>
    <div>
        <content-header :name="vm.taskName">
        </content-header>
        <div>
            <div class="search_box">
                <el-form :model="searchConf" :inline="true" :rules="rules" ref="searchConf" class="demo-ruleForm">
                    <div class="search_box_inputs">
                        <el-row :gutter='8' type='flex'>
                            <el-col :span='24'>
                                <el-form-item label="订单编号：" prop='tid'>
                                    <el-input class="mid_input" v-model="searchConf.tid" placeholder='请输入订单编号'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span='24'>
                                <el-form-item label="买家ID：">
                                    <el-input class="mid_input" v-model='searchConf.buyer_nick' placeholder='请输入买家ID'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span='24'>
                                <el-form-item label="手机号：" prop='receiver_mobile'>
                                    <el-input class="mid_input" v-model='searchConf.receiver_mobile' placeholder='请输入手机号'></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div v-show="showMore">
                            <el-row :gutter='8' type='flex'>
                                <el-col :span='24'>
                                    <el-form-item label="下单时间：">
                                        <el-date-picker v-model='searchConf.created' class="mid_input" type="daterange" placeholder="选择日期范围">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='24'>
                                    <el-form-item label="付款时间：">
                                        <el-date-picker v-model='searchConf.pay_time' class="mid_input" type="daterange" placeholder="选择日期范围">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='24'>
                                    <el-form-item label="订单金额：" prop='payment'>
                                        <el-input placeholder='最低价' class="small_input" v-model='searchConf.payment[0]'></el-input> -
                                        <el-input placeholder='最高价' class="small_input" v-model='searchConf.payment[1]'></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter='8' type='flex'>
                                <el-col :span='24'>
                                    <el-form-item label="交易状态：">
                                        <el-select class="selct_input" v-model="searchConf.status" placeholder="请选择">
                                            <el-option v-for="item in allTransactionTypes" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='24'>
                                    <el-form-item label="有无退款：">
                                        <el-select class="selct_input" v-model="searchConf.has_refund" placeholder="请选择">
                                            <el-option v-for="item in isRefund" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='24'>
                                    <el-form-item label="有无售后：">
                                        <el-select class="selct_input" v-model="searchConf.has_refund_sale" placeholder="请选择">
                                            <el-option v-for="item in isAfter" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='24'>
                                    <el-form-item label="有无评价：">
                                        <el-select class="selct_input" v-model="searchConf.buyer_rate" placeholder="请选择">
                                            <el-option v-for="item in isComment" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='24'>
                                    <el-form-item label="有无追评：">
                                        <el-select class="selct_input" v-model="searchConf.buyer_rate_append" placeholder="请选择">
                                            <el-option v-for="item in isAddComment" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter='8' type='flex'>
                                <el-col :span='24'>
                                    <el-form-item label="宝贝个数：" prop='num'>
                                        <el-input placeholder='最低' class="small_input" v-model="searchConf.num[0]"></el-input> -
                                        <el-input placeholder='最高' class="small_input" v-model="searchConf.num[1]"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='24'>
                                    <el-form-item label="宝贝种类数：" prop='order_num'>
                                        <el-input placeholder='最低' class="small_input" v-model="searchConf.order_num[0]"></el-input> -
                                        <el-input placeholder='最高' class="small_input" v-model="searchConf.order_num[1]"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='24'>
                                    <el-form-item label="订单合并状态：">
                                        <el-select class="selct_input" v-model="searchConf.merged_status" placeholder="请选择">
                                            <el-option v-for="item in mergeType" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='24'>
                                    <el-form-item label="潜需宝贝：">
                                        <el-input class="mid_input" v-model="searchConf.num_iid" placeholder='请输入宝贝名称,短名或id'></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="search_box_btn">
                        <el-button type='primary' @click='searchOrder'>搜索</el-button>
                        <div class="pull-right">
                            <i style="text-decoration: none; color: #ccc; font-size: 18px" class="iconfont" :class="showMore ? 'icon-xiangshang' : 'icon-xiangxia'"></i>
                            <a class="link senior_search" @click='showMore = !showMore'>{{showMore ? '收起' : '展开'}}</a>
                        </div>
                    </div>
                </el-form>
            </div>
            <div class="order_table">
                <table-list @getBaseList="searchRemote" @getFilterList="searchLocal" ref="tableList" :filterListData="maergeOrderData">
                    <template slot='toolbox' scope='scope'>
                        <div class="select_head">
                            <el-checkbox style="padding-top: 3px" v-model="modelCurPageCheckedAll" @change="doCheckedCurPage">本页全选</el-checkbox>
                            <!--<el-checkbox v-model="modelCheckedAll" disabled @change="checkAll">全表全选</el-checkbox>-->
                            <el-checkbox disabled>全表全选</el-checkbox>
                            <el-button :disabled='selOrder.length <= 0' class="pull-right" type='primary' @click='openModal(g_const.openModalCodes.maergeSendMessage)'>发短信</el-button>
                        </div>
                    </template>
                    <template slot="tableData" scope="scope">
                        <el-checkbox-group v-model='selOrder'>
                            <slot name='tableData' :data='scope.remotePageData' :selGoods="selOrder">
                                <el-table :data='scope.remotePageData' border class="selectGoods" max-height="775">
                                    <el-table-column align="center" width="50px" label="">
                                        <template scope="scope">
                                            <el-checkbox :label="scope.row.num_iid" class="ckGroup" @change="getIdPhone(scope.row.num_iid, scope.row.phone)"></el-checkbox>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align='left' header-align='center' min-width='480' label='订单'>
                                        <template scope='scope'>
                                            <el-popover ref="popover" placement="left-start" width="600" trigger="hover">
                                                <order-popover :tid="scope.row.tid" :created="scope.row.created" :orderDetails="scope.row.order_details" :url="scope.row.url" :money="scope.row.money" :expressMoney="scope.row.express_money">
                                                </order-popover>
                                            </el-popover>
                                            <div>
                                                <div v-popover:popover class="mark_corner" :class="scope.row.is_merge == '合并完结' ? 'greenBG' : 'redBG'">
                                                    <p>合</p>
                                                </div>
                                                <p>
                                                    <span class='table_color_grey'>买家：</span>
                                                    <span class="table_center">{{settingGlobal.IS_HIDE_ID == 1 ? scope.row.name_change : scope.row.name}}</span>
                                                    <span class='table_color_grey iconfont icon-shouji'></span>
                                                    <span class="table_center">{{settingGlobal.IS_HIDE_PHONE == 1 ? scope.row.phone_change : scope.row.phone}}</span>
                                                    <span class='table_color_grey'>￥：</span>
                                                    <span class="table_center">{{scope.row.money}}</span>
                                                </p>
                                                <p>
                                                    <span class='table_color_grey'>订单编号：</span>
                                                    <span class="table_center">{{scope.row.tid}}</span>
                                                </p>
                                                <p>
                                                    <span class='table_color_grey'>下单时间：</span>
                                                    <span class="table_center">{{scope.row.created}}</span>
                                                    <span class='table_color_grey'>付款时间：</span>
                                                    <span class="table_center">{{scope.row.pay_date}}</span>
                                                </p>
                                                <p>
                                                    <span class='table_color_grey'>地址：</span>
                                                    <span class="table_center">{{scope.row.address}}</span>
                                                </p>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align='center' min-width='110' label='状态'>
                                        <template scope='scope'>
                                            <p>{{scope.row.transaction_status}}</p>
                                            <p>{{scope.row.is_refund}}</p>
                                            <p>{{scope.row.is_after_sale}}</p>
                                            <p>
                                                <span>{{scope.row.evaluation}}</span>
                                                <span>{{scope.row.add_evaluation}}</span>
                                            </p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align='center' min-width='180' label='其他'>
                                        <template scope='scope'>
                                            <el-popover ref="popover1" placement="left-start" width="600" trigger="hover" :open-delay="delay_time">
                                                <order-popover :tid="scope.row.tid" :created="scope.row.created" :orderDetails="scope.row.order_details" :url="scope.row.url" :money="scope.row.money" :expressMoney="scope.row.express_money">
                                                </order-popover>
                                            </el-popover>
                                            <div v-popover:popover1>
                                                <p>
                                                    <span>{{scope.row.goodsNum}}</span> 件宝贝</p>
                                                <p>
                                                    <span>{{scope.row.goodsType}}</span> 类宝贝</p>
                                                <p :class="scope.row.is_merge == '合并完结' ? 'greenColor' : 'redColor'">{{scope.row.is_merge}}</p>
                                                <p>
                                                    <span>{{scope.row.order_c}}</span> 淘宝订单</p>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align='center' min-width='230' label='潜需宝贝'>
                                        <!--<template scope='scope' v-if="scope.row.url.length > 0" >
                                            <div>
                                                <div
                                                class='order_img'
                                                v-for="(data, index) in scope.row.url"
                                                :key="index">
                                                    <a :href='data.src'><img :src="data.pic"/></a>
                                                </div>
                                            </div>
                                        </template>-->
                                        <template scope='scope'>
                                            <div style='max-height: 132px' v-if="scope.row.url.length > 0">
                                                <div class='order_img' v-for="(data, index) in scope.row.url" :key="index">
                                                    <a :href='data.src' target="_blank">
                                                        <div class='order_img_index'>{{parseInt(index) + 1}}</div>
                                                        <img :src="data.pic" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div v-else style='text-align: center; font-size: 16px;'>
                                                暂无潜需宝贝
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </slot>

                        </el-checkbox-group>
                    </template>
                </table-list>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import pagination from '../../../misc/pagination'
import utils from '../../../misc/utils'
import globalConstant from '../../../misc/global.constant'
import orderPopover from './orderPopover'
export default {
    data() {
        return {
            delay_time: 300, //弹出框延迟时间
            g_const: globalConstant,
            vm: {
                taskName: '合并订单管理'
            },
            utils: utils,
            pagination: pagination,
            showMore: false,
            searchConf: {
                tid: '', //订单编号
                buyer_nick: '', //买家id
                receiver_mobile: '', //手机号
                created: [], //下单时间
                pay_time: [], //付款时间
                payment: ['', ''], //订单金额
                status: '', //交易状态
                has_refund: '', //有无退款
                has_refund_sale: '', //有无售后
                buyer_rate: '', //有无评价
                buyer_rate_append: '', //有无追评
                merged_status: '', //合并订单状态
                num: ['', ''], //宝贝个数
                order_num: ['', ''], //宝贝种类数
                num_iid: '' //宝贝名称
            },
            modelCurPageCheckedAll: false,
            modelCheckedAll: false,
            selOrder: [], //选中id
            selPhone: [], //选中号码
            selId: [], //选中id
            allTransactionTypes: [{
                label: '全部状态',
                value: ''
            }, {
                label: '等待买家付款',
                value: 'WAIT_BUYER_PAY'
            }, {
                label: '等待卖家发货',
                value: 'WAIT_SELLER_SEND_GOODS'
            }, {
                label: '等待买家确认收货',
                value: 'WAIT_BUYER_CONFIRM_GOODS'
            }, {
                label: '买家已签收',
                value: 'TRADE_BUYER_SIGNED'
            }, {
                label: '交易成功',
                value: 'TRADE_FINISHED'
            }, {
                label: '退款关闭',
                value: 'TRADE_CLOSED'
            }, {
                label: '淘宝主动关闭交易',
                value: 'TRADE_CLOSED_BY_TAOBAO'
            }, {
                label: '卖家部分发货',
                value: 'SELLER_CONSIGNED_PART'
            }, {
                label: '没有创建支付宝交易',
                value: 'TRADE_NO_CREATE_PAY'
            }],
            isRefund: [{
                label: '全部',
                value: ''
            }, {
                label: '有退款',
                value: 'true'
            }, {
                label: '无退款',
                value: 'false'
            }],
            isAfter: [{
                label: '全部',
                value: ''
            }, {
                label: '有售后',
                value: 'true'
            }, {
                label: '无售后',
                value: 'false'
            }],
            isComment: [{
                label: '全部',
                value: ''
            }, {
                label: '有评价',
                value: 'true'
            }, {
                label: '无评价',
                value: 'false'
            }],
            isAddComment: [{
                label: '全部',
                value: ''
            }, {
                label: '有追评',
                value: 'true'
            }, {
                label: '无追评',
                value: 'false'
            }],
            mergeType: [{
                label: '全部状态',
                value: ''
            }, {
                label: '未合并',
                value: 'NOMERGED'
            }, {
                label: '合并中',
                value: 'MERGED'
            }, {
                label: '合并完结',
                value: 'UNMERGED'
            }],
            rules: {
                receiver_mobile: [
                    { validator: utils.checkPhone, trigger: 'blur' }
                ],
                payment: [
                    { validator: utils.checkPayment, trigger: 'blur' }
                ],
                num: [
                    { validator: utils.checkNum, trigger: 'blur' }
                ],
                order_num: [
                    { validator: utils.checkOrderNum, trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        showMore() {
            this.changeSearch()
        },
        // 是否本页全选或，全表全选
        selOrder() {
            this.modelCurPageCheckedAll = this.isCurPageCheckedAll()
            this.modelCheckedAll = this.isCheckedAll()
        },
        maergeOrderData() {
            this.modelCurPageCheckedAll = this.isCurPageCheckedAll()
            this.modelCheckedAll = this.isCheckedAll()
        }
    },
    computed: {
        ...mapGetters([
            'maergeOrderData',
            'memberGroupData',
            'settingGlobal'
        ]),
        // _isCurPageCheckedAll() {
        //     return this.isCurPageCheckedAll()
        // },
        // _isCheckedAll() {
        //     return this.isCheckedAll()
        // },
    },
    mounted() {
        // this.getMaergeOrder([this.pagination, this.searchConf])
        // 未加载会员列表 则加载
        if (!this.memberGroupData || !this.memberGroupData.length) {
            this.getMemberGroup()
        }
        this.init()
    },
    methods: {
        ...mapActions([
            'updateOpenModal',
            'getMaergeOrder',
            'getMaergeOrderByParam',
            'getMemberGroup'
        ]),
        init() {
            this.$refs.tableList.init()
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
            if (this.maergeOrderData) {
                this.maergeOrderData.forEach(o => {
                    this.doChecked(event, o.num_iid)
                })
            }
        },
        // 全选
        checkAll(event) {
            if (this.maergeOrderData) {
                this.maergeOrderData.forEach(o => {
                    this.doChecked(event, o.num_iid)
                })
            }
        },
        // 是否本页全选
        isCurPageCheckedAll() {
            if (!this.maergeOrderData) return false
            var ret = false
            for (var j = 0; j < this.maergeOrderData.length; j++) {
                ret = false
                var o = this.maergeOrderData[j]
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
            var retData = this.maergeOrderData
            if (!retData) return false
            var tempObj = {}
            var tempArray = []
            for (var i = 0; i < this.selOrder.length; i++) {
                var id = this.selOrder[i]
                if (!tempObj[id]) {
                    tempArray.push(id)
                }
            }
            if (retData.length === 0) return false
            if (tempArray.length === retData.length) {
                return true
            } else {
                return false
            }
        },
        // 获取远程数据
        searchRemote([pagination]) {
            this.getMaergeOrder([pagination, this.searchConf])
        },
        // 处理本地数据
        searchLocal([pagination]) {
            // 主动获取数据
            // this.getMaergeOrderByParam([pagination])
            this.getMaergeOrder([pagination, this.searchConf])
        },
        changeSearch() {
            var noSearchConf = {
                tid: '', //订单编号
                buyer_nick: '', //买家id
                receiver_mobile: '', //手机号
                created: [], //下单时间
                pay_time: [], //付款时间
                payment: ['', ''], //订单金额
                status: '', //交易状态
                has_refund: '', //有无退款
                has_refund_sale: '', //有无售后
                buyer_rate: '', //有无评价
                buyer_rate_append: '', //有无追评
                merged_status: '', //合并订单状态
                num: ['', ''], //宝贝个数
                order_num: ['', ''], //宝贝种类数
                num_iid: '' //宝贝名称
            }
            if (this.showMore) {
                noSearchConf = this.searchConf
            } else {
                noSearchConf.tid = this.searchConf.tid
                noSearchConf.buyer_nick = this.searchConf.buyer_nick
                noSearchConf.receiver_mobile = this.searchConf.receiver_mobile
            }
            this.searchConf = noSearchConf
        },
        searchOrder() {
            var formName = 'searchConf'
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.getMaergeOrder([this.pagination, this.searchConf])
                } else {
                    return false;
                }
            })
        },
        //发短信
        openModal(code) {
            this.updateOpenModal({
                name: code,
                param: {
                    phone: this.selPhone
                }
            })
        },
        //获取订单id、手机号存入数组
        getIdPhone(id, phone) {
            if (this.selId.indexOf(id) >= 0) {
                let index = this.selId.indexOf(id)
                this.selId.splice(index, 1)
                this.selPhone.splice(index, 1)
            } else {
                this.selId.push(id)
                this.selPhone.push(phone)
            }
        }
    },
    components: {
        orderPopover
    }
}
</script>
<style lang="scss" scoped>
@import '../../../style/variable.scss';
.small_input {
    width: 70px;
}

.search_box {
    font-size: 12px;
    background: #f1f2f3;
    line-height: 35px;
    overflow: hidden;
    margin: 18px;
    .el-form {
        .el-form-item__label {
            padding: 0px;
        }
    }
    .search_box_inputs {
        padding: 16px 16px 0px 16px;
        .selct_input {
            width: 100px;
        }
    }
    .search_box_btn {
        text-align: center;
        padding: 0px 32px;
        height: 48px;
        line-height: 48px;
        border-top: solid 1px #dfe8ec;
        overflow: hidden;
    }
}

.mid_input {
    width: 170px;
}

.select_input {
    width: 110px;
}

.senior_search {
    display: inline-block;
    font-size: 12px;
    text-decoration: underline;
}

.order_table {
    .select_head {
        height: 38px;
        line-height: 35px;
        font-size: $menuFontSize;
        background: $modal-bg;
        .el-checkbox {
            margin: 0px 15px;
        }
        .el-button {
            padding: 4px 18px;
            margin: 9px;
        }
    }
    .iconfont {
        font-size: 20px;
    }
    .table_color_grey {
        color: #9a9a9a;
    }
    .table_center {
        margin-right: 12px;
    }
    .mark_corner {
        font-size: 12px;
        position: absolute;
        right: 1px;
        top: -7px;
        color: #f3f5f9;
        z-index: 9;
        p {
            cursor: default;
        }
        &::after {
            content: '';
            position: absolute;
            right: -1px;
            top: 7px; // border: 13px solid #ff7900;
            // border-left-color: transparent;
            // border-bottom-color: transparent;
            z-index: -1;
        }
    }
    .greenBG {
        &::after {
            border: 13px solid green;
            border-left-color: transparent;
            border-bottom-color: transparent;
        }
    }
    .redBG {
        &::after {
            border: 13px solid #ff7900;
            border-left-color: transparent;
            border-bottom-color: transparent;
        }
    }
    .greenColor {
        color: green;
    }
    .redColor {
        color: #ff7900;
    }
}

.order_img {
    width: 60px;
    height: 60px;
    margin: 0px 2px;
    position: relative;
    display: inline-block;
    a {
        display: inline-block;
        width: 100%;
        height: 100%;
        .order_img_index {
            position: absolute;
            font-size: 12px;
            color: #0BB8F8;
            left: 2px;
            top: -7px;
            z-index: 1;
            &::after {
                content: '';
                position: absolute;
                left: -2px;
                top: 7px;
                border: 13px solid #2c303c;
                border-right-color: transparent;
                border-bottom-color: transparent;
                z-index: -1;
            }
        }
    }
}
</style>
