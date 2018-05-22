<template>
<div>
  <el-row :gutter="20" class="validRow">
      <el-col :span="3"><p>{{memberSearch ? memberSearch : '订单金额：'}}</p></el-col>
      <el-col :span="2"><el-radio label="" v-model="payment_label">不限制</el-radio></el-col>
      <el-col :span="19">
          <el-form-item prop="payment_value">
              <el-tooltip
                  class="item"
                  effect="dark"
                  :manual="true"
                  :value="isSubState && payment_start_invalid"
                  :content="payment_start_invalid_msg"
                  :disabled="payment_label !== 'custom'"
                  placement="top"
                  >
                  <el-radio label="custom" v-model="payment_label">
                    价格在
                    <el-input v-model="payment_value[0]" placeholder="不能为空" style="width:110px" :disabled="payment_label !== 'custom'">
                      <template slot="append">元</template>
                    </el-input>
                  </el-radio>
              </el-tooltip> 至
              <el-tooltip
                  class="item"
                  effect="dark"
                  :manual="true"
                  :value="isSubState && payment_end_invalid"
                  :content="payment_end_invalid_msg"
                  :disabled="payment_label !== 'custom'"
                  placement="top"
                  >
                  <el-input v-model="payment_value[1]" placeholder="不能为空" style="width:110px" :disabled="payment_label !== 'custom'">
                    <template slot="append">元</template>
                  </el-input>
              </el-tooltip>
          </el-form-item>
      </el-col>
  </el-row>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../misc/global.constant'
  export default {
    name: 'orderPayment',
    data() {
      return {
        payment_label: '',
        payment_start: '',
        payment_end: '',
        payment_start_invalid: false,
        payment_start_invalid_msg: '',
        payment_end_invalid: false,
        payment_end_invalid_msg: '',
        payment_value: ['',''],
        first_load: false,
        isActived: false // 组件是否被激活
      }
    },
    computed: {
      ...mapGetters([
          'verificationData',
          'subState'
          ]),
      isSubState() {
        if(this.subState == 'resultData' || this.subState == 'resultDetail' || this.subState == 'pushRecord' || this.subState == 'unsubscribeRecord' || this.subState == 'qianniuTask') {
          return false
        }else {
          return true
        }
      }
    },
    watch: {
      payment_label() {
        this.updataValue()
        if(this.payment_label == '') {
          this.payment_value = []
        }else if(this.payment_value.length == 0){
          this.payment_value = ['','']
        }
        this.verification({
          payment_label: this.payment_label
        })
      },
      payment_value() {
        this.updataValue()
        this.verification({
          payment_value: this.payment_value
        })
      },
      paymentLabel() {
        this.payment_label = this.paymentLabel
      },
      payment() {
        if(this.payment.length == 0 && this.paymentLabel == '') {
          this.payment_label = this.paymentLabel
        }
        this.payment_value = this.payment
      },
      verificationData() {
        // 组件激活时才会进入
        if(!this.dataBind && this.isActived) {
            if(this.verificationData.hasOwnProperty('payment_start_invalid')) {
            this.payment_start_invalid=this.verificationData.payment_start_invalid
            }
            if(this.verificationData.hasOwnProperty('payment_start_invalid_msg')) {
                this.payment_start_invalid_msg=this.verificationData.payment_start_invalid_msg
            }
            if(this.verificationData.hasOwnProperty('payment_end_invalid')) {
                this.payment_end_invalid=this.verificationData.payment_end_invalid
            }
            if(this.verificationData.hasOwnProperty('payment_end_invalid_msg')) {
                this.payment_end_invalid_msg=this.verificationData.payment_end_invalid_msg
            }
        }
      },
      dataBind() {
        if(this.dataBind.hasOwnProperty('payment_start_invalid')) {
            this.payment_start_invalid = this.dataBind.payment_start_invalid ? true : false
        }
        if(this.dataBind.hasOwnProperty('payment_start_invalid_msg')) {
            this.payment_start_invalid_msg=this.dataBind.payment_start_invalid_msg
        }
        if(this.dataBind.hasOwnProperty('payment_end_invalid')) {
            this.payment_end_invalid=this.dataBind.payment_end_invalid ? true : false
        }
        if(this.dataBind.hasOwnProperty('payment_end_invalid_msg')) {
            this.payment_end_invalid_msg=this.dataBind.payment_end_invalid_msg
        }
        this.updataValue()
      }
    },
    // 组件被激活
    activated() {
      this.isActived = true
    },
    // 组件转为非激活状态
    deactivated() {
      this.isActived = false
    },
    mounted() {
      this.isActived = true
      this.first_load = true
      this.payment_label = this.paymentLabel ? this.paymentLabel : ''
    },
    methods: {
      ...mapActions([
        'updataBaseMConfig',
        'verification'
        ]),
      updataValue() {
        if(this.first_load) {
          this.first_load = false
          return
        }
        if(this.dataBind) {
          var sycnObj = {
            payment_label: this.payment_label,
            payment_value: this.payment_value,
          }
          // 将更改的数据同步（用于列表型表单修改）
          if(this.payment_value[0] && this.payment_value[1]) {
            sycnObj.payment_more = this.payment_value
          }
          this.$emit('sycnMethod', sycnObj)
        } else {
          // 更新营销配置基本量
          this.updataBaseMConfig({
            payment_label: this.payment_label,
            payment: this.payment_value,
          })
        }
      }
    },
    props: [
      'paymentLabel',
      'payment',
      'dataBind',
      'memberSearch'
      ]
}
</script>
<style lang="scss" scoped>
.validRow {
  .el-form-item {
    display: inline-block;
  }
}
</style>
