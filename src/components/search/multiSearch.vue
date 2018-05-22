<template>
<div>
  <el-form :model="conf" :show-message="false" ref="conf">
      <div class="form-control form_control more-content dashedLine">
          <el-form-item prop="created">
              <config-order-time
              :orderTime="conf.created"
              :orderTimeLabel="conf.created_label"
              >
              </config-order-time>
          </el-form-item>
          <el-form-item prop="trade_from">
            <config-order-from
            :tradeFrom="conf.trade_from"
            >
            </config-order-from>
          </el-form-item>
          <el-form-item prop="activity_type">
            <config-order-types
            :checkedOrderType="conf.activity_type"
            >
            </config-order-types>
          </el-form-item>
          <el-form-item prop="payment_label">
              <config-order-payment
              :paymentLabel="conf.payment_label"
              :payment="conf.payment"
              >
              </config-order-payment>
          </el-form-item>
          <el-form-item prop="status">
             <config-order-state
             :orderState="conf.status"
             >
             </config-order-state>
          </el-form-item>
          <el-form-item prop="buys">
            <config-goods-num
            :buys="conf.buys"
            :buysLabel="conf.buys_label"
            >
            </config-goods-num>
          </el-form-item>
          <el-form-item prop="purchase_times">
              <config-buy-count
                :purchase="conf.purchase_times"
                :purchaseLabel="conf.purchase_times_label"
              >
              </config-buy-count>
          </el-form-item>
          <el-form-item prop="order_num">
              <config-goods-type
                :orderNum="conf.order_num"
                :orderNumLabel="conf.order_num_label"
              >
              </config-goods-type>
          </el-form-item>
          <el-form-item props="items_range">
            <config-items-range
            :itemsValue="conf.items_range"
            :itemsLabel="conf.items_range_label"
            >
            </config-items-range>
          </el-form-item>
          <el-form-item prop="pay_time">
            <config-pay-time
            :payTime="conf.pay_time"
            :payTimeLabel="conf.pay_time_label"
            >
            </config-pay-time>
          </el-form-item>
          <el-form-item prop="consign_time">
            <config-consign-time
            :consignTime="conf.consign_time"
            :consignTimeLabel="conf.consign_time_label"
            >
            </config-consign-time>
          </el-form-item>
          <el-form-item  prop="sign_time">
            <config-sign-time
            :signTime="conf.sign_time"
            :signTimeLabel="conf.sign_time_label"
            >
            </config-sign-time>
          </el-form-item>
          <el-form-item prop="end_time">
            <config-confirm-time
            :confirmTime="conf.end_time"
            :confirmTimeLabel="conf.end_time_label"
            >
            </config-confirm-time>
          </el-form-item>
         <el-form-item prop="buyer_message">
              <config-buyer-message
              :buyerMessage="conf.buyer_message"
              >
              </config-buyer-message>
          </el-form-item>
          <el-form-item>
            <config-flags
              :checkedFlags="conf.seller_flag"
              >
            </config-flags>
          </el-form-item>
          <el-form-item>
            <config-express
              :expressArraySel="conf.express"
            >
            </config-express>
          </el-form-item>
          <el-form-item>
              <config-select-city
                  :selCity="conf.city"
              >
              </config-select-city>
          </el-form-item>
      </div>
  </el-form>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data() {
      return {
        conf: {
            created: [],
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
            consign_time: [],
            sign_time: [],
            end_time: [],
            buyer_message: '',
            seller_flag: []
        }
      }
    },
    mounted() {
        this.conf = this.searchConf
    },
    watch: {
      searchConf() {
        this.conf = this.searchConf
      }
    },
    methods: {
      clearAllParam() {

      },
      sycnSearchWord() {

      }
    },
    props: [
      'searchConf'
    ]
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

</style>
