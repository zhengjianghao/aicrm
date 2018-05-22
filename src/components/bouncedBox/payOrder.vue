<template>
  <div>
    <div>
      <span class="orderTitle">确认订单</span>
      <el-table :data="orderData" class="tableClass" border>
        <el-table-column
          prop="service"
          label="服务"
          align="center"
          min-width="250">
          <template scope="scope">
            <p>{{format_service(scope.row.service)[0]}}</p>
            <p>{{format_service(scope.row.service)[1]}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="cycle"
          label="周期"
          align="center">
          <template scope="scope">
            <p>{{scope.row.cycle ? scope.row.cycle : '/'}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额"
          align="center"
          min-width="130">
          <template scope="scope">
            <p>{{scope.row.amount.toFixed(2)}} 元</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <span class="orderTitle">支付方式</span>
      <div class="pay_container leftCont">
        <div class="payBox payLeft" @click="normal_pay">
          <img src="../../assets/images/serverMarket_pay.png">
          <span class="payDesc">仅支持主账号付款</span>
        </div>
        <span class="payBut" @click="normal_pay">去服务市场付款</span>
      </div>
      <!--<el-tooltip class="item" effect="dark" content="测试中，请耐心等待！" :disabled="jurisdictionData.allShow" placement="top">
        <div class="pay_container rightCont" :class="jurisdictionData.allShow ? '' : 'no_click'">
          <div class="payBox payRight" @click="jurisdictionData.allShow ? alipay_pay() : ''">
            <img src="../../assets/images/alipay_pay.jpg">
            <span class="payDesc">支持任何支付宝扫码付款</span>
          </div>
          <span class="payBut" @click="jurisdictionData.allShow ? alipay_pay() : ''">去支付宝扫码付款</span>
        </div>
      </el-tooltip>-->
      <div class="pay_container rightCont">
        <div class="payBox payRight" @click="alipay_pay">
          <img src="../../assets/images/alipay_pay.jpg">
          <span class="payDesc">支持任何支付宝扫码付款</span>
        </div>
        <span class="payBut" @click="alipay_pay">去支付宝扫码付款</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import router from 'src/router/index'
export default {
  data() {
    return {
      orderData: []
    }
  },
  computed: {
    ...mapGetters([
      'payOrderData',
      'jurisdictionData'
    ])
  },
  mounted () {
    this.orderData = [this.payOrderData]
  },
  watch: {
    payOrderData() {
      this.orderData = [this.payOrderData]
    }
  },
  methods: {
    ...mapActions([
      'getUser',
      'closeModal',
      'getMarketingJob',
      'getBuyMarketList',
      'chargeByAli'
    ]),
    // 处理确认订单服务信息
    format_service(val) {
      if (val.includes('充值')) {
        let name_list = val.split('充值')
        name_list[0] = name_list[0] + '充值'
        return name_list
      } else if (val.includes('购买')) {
        let name_list = val.split('购买')
        name_list[0] = name_list[0] + '购买'
        return name_list
      } else {
        return [val]
      }
    },
    // 服务市场付款
    normal_pay() {
      window.open(this.payOrderData.order_url, "_blank")
      // 确认弹框
      this.payCofirm()
    },
    // 支付宝付款
    alipay_pay() {
      let nowDate = new Date()
      let alipayData = {}
      // 生成商户订单号
      alipayData.out_trade_no = nowDate.getFullYear().toString() + (nowDate.getMonth() + 1).toString() + nowDate.getDate().toString() + nowDate.getHours().toString() + nowDate.getMinutes().toString() + nowDate.getSeconds().toString() + nowDate.getMilliseconds().toString()
      // 订单名称
      alipayData.subject = this.payOrderData.service
      // 订单总金额
      alipayData.total_amount = this.payOrderData.amount.toFixed(2)
      // 商品描述
      alipayData.body = this.payOrderData.item_code
      // 购买周期
      if (this.payOrderData.cycle === '季') {
        alipayData.orderCycle = 3
      } else if (this.payOrderData.cycle === '半年') {
        alipayData.orderCycle = 6
      } else if (this.payOrderData.cycle === '年') {
        alipayData.orderCycle = 12
      } else {
        alipayData.orderCycle = 0
      }
      // 支付宝充值
      let newWin = window.open()
      this.chargeByAli(alipayData).then(data => {
        if (data) {
          newWin.location.href = data
        } else {
          newWin.location.href = '/confirm_order'
          this.closeModal('payOrder')
        }
      })
      // 确认弹框
      this.payCofirm()
    },
    // 确认弹框
    payCofirm() {
      var that = this
      this.$confirm('请您在新打开的页面进行支付，支付完成前请不要关闭该窗口。', '充值', {
        confirmButtonText: '支付遇到问题',
        cancelButtonText: '已完成支付',
        type: 'warning',
        closeOnPressEscape: false,
        closeOnClickModal: false
      }).then(() => {
        window.open('http://amos.alicdn.com/getcid.aw?v=2&uid=%E6%9D%AD%E5%B7%9E%E8%81%9A%E6%95%88%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&site=cntaobao&s=2&groupid=0&charset=utf-8')
      }).catch(() => {
        if (that.payOrderData.cycle === 0) {  // 充值短信
          // 获取充值后的短信信息
          that.getUser()
          // 关闭弹框
          that.closeModal('payOrder')
          that.$nextTick(() => {
            that.closeModal('importModal')
          })
        } else {  // 购买场景
          // 获取营销任务列表
          that.getMarketingJob('true')
          // 获取购买列表
          that.getBuyMarketList()
          // 关闭弹框
          that.closeModal('payOrder')
          that.$nextTick(() => {
            that.closeModal('buyMarketingJob')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.orderTitle {
  display: block;
  top: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  &:nth-child(1) {
    margin-top: 10px;
  }
}
.tableClass {
  width: 80%;
  margin: 0 auto;
}

.pay_container {
  width: 180px;
  height: 150px;
  position: relative;
  &.leftCont {
    float: left;
    margin: 0 0 5% 13%;
  }
  &.rightCont {
    float: right;
    margin: 0 13% 5% 0;
  }
  .payBox {
    width: 100%;
    height: 110px;
    border: 1px solid #ff7900;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    &.payLeft {
      img {
        width: 110%;
      }
    }
    &.payRight {
      img {
        position: relative;
        width: 160%;
        top: -12px;
        left: -50px;
      }
    }
    .payDesc {
      display: block;
      position: absolute;
      bottom: 6px;
      width: 100%;
      text-align: center;
      color: #ccc;
    }
  }
  .payBut {
    display: block;
    position: absolute;
    bottom: -7px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ff7900;
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    background: #ff7900;
    cursor: pointer;
  }
}
.pay_container.no_click {
  .payBox, .payBut {
    &:hover {
      cursor: not-allowed;
    }
  }
}
</style>
