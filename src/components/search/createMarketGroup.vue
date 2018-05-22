<template>
<div>
    <base-VIP-config ref="base_test" :baseData='conf'>
        <template slot="baseConfig" scope='props'>
            <div class="form-control form_control">
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
                <config-order-payment :paymentLabel="props.conf.payment_label" :payment="props.conf.payment" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-order-payment>
            </el-form-item>
            <el-form-item prop="status">
                <config-order-state :orderState="props.conf.status" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-order-state>
            </el-form-item>
            <el-form-item prop="buys">
                <config-goods-num :buys="props.conf.buys" :buysLabel="props.conf.buys_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-goods-num>
            </el-form-item>
            <el-form-item>
                <config-buy-count :purchase="props.conf.purchase_times" :purchaseLabel="props.conf.purchase_times_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-buy-count>
            </el-form-item>
            <el-form-item prop="order_num">
                <config-goods-type :orderNum="props.conf.order_num" :orderNumLabel="props.conf.order_num_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-goods-type>
            </el-form-item>
            <el-form-item props="items_range">
                <config-items-range :itemsValue="props.conf.items_range" :itemsLabel="props.conf.items_range_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-items-range>
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
            <el-form-item>
              <el-row :gutter="20">
                  <el-col :span="3"><p>同步设置促销方式：</p></el-col>
                  <el-col :span="21">
                    <el-select v-model="conf.promotionWay" clearable placeholder="请选择">
                      <el-option
                        v-for="item in promotWay"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
              </el-row>
            </el-form-item>
            </div>
        </template>
    </base-VIP-config>
  <div class="bottom_btn">
    <div class="pull-right ">
        <el-button type="primary" @click="save()">保存</el-button>
        <el-button class="skip" @click="close()">取消</el-button>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import API_MARKET from '../../service/marketing.service'
  export default {
    data() {
      return {
        API_MARKET: API_MARKET,
        conf: {
            created: [],
            created_label: '',
            trade_from: '',
            activity_type: [],
            payment: [],
            status: '',
            buys: [],
            purchase_times: [],
            order_num: [],
            items_range: {
                include: [],
                exclude: []
            },
            pay_time: [],
            pay_time_label: '',
            consign_time: [],
            consign_time_label: '',
            sign_time: [],
            sign_time_label: '',
            end_time: [],
            end_time_label: '',
            buyer_message: '',
            seller_flag: [],
            express: [],
            city: [],
            promotionWay: '',
            mailWay: [],
            region: []
        },
        promotWay: [{
          value: 'discount',
            label: '打折'
        },{
            value: 'fullCut',
            label: '满减'
        },{
            value: 'buyAandOther',
            label: '买A+？元优惠买B'
        },{
            value: 'buyAandB',
            label: 'A+B一起买优惠'
        },{
            value: 'freeShip',
            label: '免邮'
        }]
      }
    },
    created() {
        this.init()
    },
    mounted() {

    },
    watch: {

    },
    computed: {
        ...mapGetters([
            'memberListData',
            'baseMConfigData'
        ])
    },
    methods: {
        ...mapActions([
            'emptyBaseMConfig',
            'closeModal'
        ]),
        save() {
            var that = this;
            var retConf = this.API_MARKET.baseSetTransform(this.baseMConfigData, this.conf)
            if (this.$refs.base_test) {
                retConf = this.API_MARKET.baseSetTransform(this.$refs.base_test.conf, this.conf)
            }
            this.initMultiSearch()
            that.closeModal('createMarketGroup')
        },
        close() {
            this.initMultiSearch()
            this.closeModal('createMarketGroup')
        },
        init() {
            this.emptyBaseMConfig()
            var retConf = this.API_MARKET.baseSetTransform(this.baseMConfigData, this.conf)
            this.conf = retConf
        },
        // 初始化查询条件
        initMultiSearch() {
            var baseConf = {
                created: [],
                created_label: '',
                trade_from: '',
                activity_type: [],
                payment: [],
                status: '',
                buys: [],
                purchase_times: [],
                order_num: [],
                items_range: {
                    include: [],
                    exclude: []
                },
                pay_time: [],
                pay_time_label: '',
                consign_time: [],
                consign_time_label: '',
                sign_time: [],
                sign_time_label: '',
                end_time: [],
                end_time_label: '',
                buyer_message: '',
                seller_flag: [],
                express: [],
                city: [],
                promotionWay: '',
                mailWay: [],
                region: []
            }
            // 清空全局组件状态值
            this.emptyBaseMConfig()
            var retConf = API_MARKET.baseSetTransform(this.baseMConfigData, this.conf)
            var that = this
            that.conf = API_MARKET.baseGetTransform(baseConf)
            if(this.$refs.base_test) {
                this.$refs.base_test.clearAll(this.conf)
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.el-col {
    height: 34px;
    line-height: 34px;
    font-size: 12px;
    p {
      display: block;
      text-align: right;
      color: #5D6D7D;
    }
    span {
        font-size: 12px;
    }
}
.validRow {
    margin-bottom: 16px;
    .el-form-item {
        display: inline-block;
    }
}
.validRow_noMargin {
    .el-form-item {
        display: inline-block;
    }
}
.bottom_btn {
    div {
        margin: 10px 30px;
    }
    border-top: solid 1px #cccccc;
    overflow: hidden;
}
</style>
