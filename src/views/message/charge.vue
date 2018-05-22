<template>
  <div class="charge_box">
    <el-row>
      <el-col :span="12">
        <div class="betterRoad">
          <div class="title_count">
            <p class="message_surplus ali_color">按效果分成预付费余额</p>
            <p class="message_num ali_color">
              <span>{{user.money_remain | formarPriceFloat}}</span>
              <span class="strip strip_color">元</span>
            </p>
            <p class="charge_package strip_color">充值套餐</p>
          </div>
          <div class="package_box">
            <div class="package_num link" v-for="(item, index) in msgList" :key="index" v-if="item.sms_channel === 'P4PMONEY'" @click="charge(item)">
              <!--<div class="charge_money">充值{{item.item_price | formatMoney}}</div>-->
              <div class="package_content">
                  <div style="font-size: 17px; font-weight: bold;">预付费账号</div>
                </div>
                <div class="message_price"><span>&nbsp;</span></div>
                <div class="btn_charge"><p>充值 <span class="ali_color"><span class="num">{{item.item_price | formatPrice}}</span>元</span></p></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="normalRoad Line">
          <div class="title_count">
            <p class="message_surplus ordinary_color">扩展场景自用短信 剩余</p>
            <p class="message_num ordinary_color">
              <span>{{user.ordinary_sms_remain | formatPrice}}</span>
              <span class="strip strip_color">条</span>
            </p>
            <p class="charge_package strip_color">充值套餐</p>
          </div>
          <div class="package_box">
            <div class="package_num link" v-for="(item, index) in msgList" v-if="item.sms_channel === 'LOW'" @click="charge(item)" :key="index">
              <div class="package_content">
                <div>{{item.sms_count | formatPrice}}
                  <span>条</span>
                </div>
              </div>
              <div class="message_price">¥
                <span>{{item.sms_unit_price}}</span>/条</div>
              <div class="btn_charge">
                <p>充值
                  <span class="ordinary_color">
                    <span class="num">{{item.item_price | formatPrice}}</span>元</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
export default {
  data() {
    return {
      msgList: [],
    }
  },
  computed: {
    ...mapGetters(['chargeMessagelistData', 'userData']),
    user() {
      return this.userData
    }
  },
  mounted() {
    this.getMessageChargeList()
  },
  watch: {
    chargeMessagelistData() {
      this.msgList = this.chargeMessagelistData
    }
  },
  methods: {
    ...mapActions([
      'updateOpenModal',
      'getMessageChargeList',
      'getPayOrderData'
    ]),
    /**
     * 充值
     * @param item {Object} 付款信息
     */
    charge(item) {
      // 配置付款信息
      let payData = {}
      if (item.id && item.sms_channel && item.item_price) {
        if (item.sms_channel === 'P4PMONEY') {
          payData.service = '按效果付费预充值' + item.item_price + '元'
        } else {
          payData.service = '扩展场景自用短信充值' + item.sms_count + '条' + item.item_price + '元'
        }
      }
      payData.cycle = 0
      payData.amount = item.item_price
      payData.order_url = item.order_url
      payData.item_code = item.item_code
      // 保存付费信息
      this.getPayOrderData(payData)
      // 打开付费弹框
      this.openModal('payOrder')
    },
    // 打开弹框
    openModal(code) {
      this.updateOpenModal({
        name: code,
        param: {
          state: ''
        }
      })
    },
    toQuartile(num) {
      return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
    toQuartileFloat(num) {
      return (parseFloat(num).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    }
  },
  filters: {
    formatPrice: function(value) {
      if (!value) return 0
      var _value = value == parseInt(value) ? parseInt(value) : value
      return (_value + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    },
    formarPriceFloat: function(value) {
      if (!value) return 0
      var _value = parseFloat(value).toFixed(3)
      return (_value + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    },
    formatMoney: function(value) {
      if (!value) return 0
      if(value < 10000) {
        return value
      } else if (value == 15000) {
        return 1.5 + '万'
      } else {
        return value/10000 + '万'
      }
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../../style/variable.scss';
$m_border_color: #e1e1e1;
.charge_box {
  background-color: $modal-bg;
  .betterRoad,
  .normalRoad {
    background-color: $white;
    border: solid 1px $m_border_color;
    margin: 4px 2px 4px 4px;
    padding-bottom: 4px;
  }
  .betterRoad {
    .package_num {
      &:hover {
        border: 1px solid #ff710f;
      }
    }
  }
  .normalRoad {
    .package_num {
      &:hover {
        border: 1px solid $primary;
      }
    }
  }
  .normalRoad {
    margin: 4px 4px 4px 2px;
  }
  .title_count {
    padding-left: 42px;
    border-bottom: 1px solid $m_border_color;
  }
  .message_surplus {
    font-size: 14px;
    margin-top: 18px;
  }
  .message_num {
    font-size: 34px;
    margin: 21px 0px 0px 30px;
    .strip {
      font-size: 14px;
      margin: 0px 8px;
    }
  }
  .charge_package {
    font-size: 12px;
    margin: 24px 0px 6px;
  }
  .package_box {
    overflow: hidden;
  }
  .package_num {
    border: solid 1px $m_border_color;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    width: 192px;
    height: 104px;
    float: left;
    position: relative;
    font-size: 12px;
    text-align: center;
    margin: 8px 0 8px 4px;
    border-radius: 3px;
  }
  .package_content {
    float: left;
    font-size: 24px;
    overflow: hidden;
    display: inline-block;
    margin: 11px 0 0 15px;
    color: #333333;
    div {
      display: inline-block;
      span {
        margin-left: 3px;
        font-size: 12px;
        color: #999999;
      }
    }
  }
  .message_price {
    position: absolute;
    right: 5px;
    bottom: 40px;
    color: #999999;
    span {
      color: #333333;
    }
  }
  .btn_charge {
    position: absolute;
    width: 100%;
    bottom: 0px;
    background: #f1f2f3;
    background-image: linear-gradient(-180deg, #ffffff 0%, #f1f2f3 100%);
    border-top: 1px solid #e1e1e1;
    line-height: 30px;
    span {
      .num {
        font-size: 24px;
        line-height: 32px;
      }
    }
    p {
      height: 30px;
    }
  }
  .ali_color {
    color: #ff710f;
  }
  .ordinary_color {
    color: #0bb8f8;
  }
  .strip_color {
    color: #999999;
  }
  .charge_money {
    text-align: center;
    font-size: 22px;
    color: #333;
    line-height: 80px;
    height: 80px;
  }
}
</style>
