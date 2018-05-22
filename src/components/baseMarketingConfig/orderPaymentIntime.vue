<template>
  <el-row :gutter="20">
    <el-col :span="3"><p>订单金额：</p></el-col>
    <el-col :span="19">
        <el-form-item prop="payment_value">
            <el-tooltip
                class="item"
                effect="dark"
                :manual="true"
                :value='isSubState && payment_start_invalid'
                :content="payment_start_invalid_msg"
                placement="top"
                >
                <el-input
                v-model="payment_value[0]"
                style="width:100px"
                >
                 <template slot="append">元</template>
                </el-input>

            </el-tooltip>
            至
            <!--</el-form-item>
            <el-form-item prop="payment_end">-->
                <el-tooltip
                class="item"
                effect="dark"
                :manual="true"
                :value="isSubState && payment_end_invalid"
                :content="payment_end_invalid_msg"
                placement="top"
                >
                <el-input
                v-model="payment_value[1]"
                style="width:100px">
                <template slot="append">元</template>
                </el-input>
            </el-tooltip>
            发送
        </el-form-item>
    </el-col>
</el-row>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../misc/global.constant'
  export default {
    data() {
      return {
        payment_end: '',
        payment_start: '',
        payment_start_invalid: false,
        payment_start_invalid_msg: '',
        payment_end_invalid: false,
        payment_end_invalid_msg: '',
        payment_value: ['','']
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
      payment_value() {
        this.updataValue()
        this.verification({
          payment_value: this.payment_value
        })
      },
      payment() {
        // this.payment_start = this.payment[0] ? this.payment[0] : ''
        // this.payment_end = this.payment[1] ? this.payment[1] : ''
          this.payment_value=this.payment
      },
      verificationData() {
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
    methods: {
      ...mapActions([
        'updataBaseMConfig',
        'verification'
        ]),
      updataValue() {
        // 更新营销配置基本量
        this.updataBaseMConfig({
           payment: this.payment_value
        })
      }
    },
    props: [
      'payment'
    ]
}
</script>
<style lang="scss">

</style>
