<template>
<div>
  <el-row :gutter="20" class="validRow">
      <el-col :span="3"><p>购物次数：</p></el-col>
      <el-col :span="2"><el-radio label="" v-model="purchase_label">不限制</el-radio></el-col>
      <el-col :span="19">
          <el-form-item prop="buy_count">
              <el-tooltip
                  class="item"
                  effect="dark"
                  :manual="true"
                  :value="isSubState && count_start_invalid"
                  :content="count_start_invalid_msg"
                  placement="top"
                  >
                  <el-radio label="custom" v-model="purchase_label">
                    <el-input v-model="buy_count[0]" placeholder="不限" style="width:100px" :disabled="purchase_label !== 'custom'">
                      <template slot="append">次</template>
                    </el-input>
                  </el-radio>
              </el-tooltip> 至
              <el-tooltip
                  class="item"
                  effect="dark"
                  :manual="true"
                  :value="isSubState && count_end_invalid"
                  :content="count_end_invalid_msg"
                  placement="top"
                  >
                  <el-input v-model="buy_count[1]" placeholder="不限" style="width:100px" :disabled="purchase_label !== 'custom'">
                    <template slot="append">次</template>
                  </el-input>
              </el-tooltip>
          </el-form-item>
      </el-col>
  </el-row>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data() {
      return {
        purchase_label: '',
        count_start_invalid: false,
        count_start_invalid_msg: '',
        count_end_invalid: false,
        count_end_invalid_msg: '',
        buy_count: ['',''],
        first_load: false
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
      purchase() {
        if(this.purchase.length == 0 && this.purchaseLabel == '') {
          this.purchase_label = this.purchaseLabel
        }
        this.buy_count = this.purchase
      },
      buy_count() {
        this.updataValue()
        this.verification({
          buy_count: this.buy_count
        })
      },
      purchase_label() {
        this.updataValue()
        this.verification({
          buy_count: this.buy_count
        })
      },
      purchaseLabel() {
        this.purchase_label = this.purchaseLabel
      },
      verificationData() {
        if(!this.dataBind) {
          if(this.verificationData.hasOwnProperty('count_start_invalid')) {
            this.count_start_invalid=this.verificationData.count_start_invalid
          }
          if(this.verificationData.hasOwnProperty('count_start_invalid_msg')) {
              this.count_start_invalid_msg=this.verificationData.count_start_invalid_msg
          }
          if(this.verificationData.hasOwnProperty('count_end_invalid')) {
              this.count_end_invalid=this.verificationData.count_end_invalid
          }
          if(this.verificationData.hasOwnProperty('count_end_invalid_msg')) {
              this.count_end_invalid_msg=this.verificationData.count_end_invalid_msg
          }
        }
      },
      dataBind() {
        if(this.dataBind.hasOwnProperty('count_start_invalid')) {
          this.count_start_invalid=this.dataBind.count_start_invalid
        }
        if(this.dataBind.hasOwnProperty('count_start_invalid_msg')) {
            this.count_start_invalid_msg=this.dataBind.count_start_invalid_msg
        }
        if(this.dataBind.hasOwnProperty('count_end_invalid')) {
            this.count_end_invalid=this.dataBind.count_end_invalid
        }
        if(this.dataBind.hasOwnProperty('count_end_invalid_msg')) {
            this.count_end_invalid_msg=this.dataBind.count_end_invalid_msg
        }
        this.updataValue()
      }
    },
    mounted() {
      this.first_load = true
      this.purchase_label = this.purchaseLabel ? this.purchaseLabel : ''
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
            purchase_times_label: this.purchase_label,
            buy_count: this.buy_count
          }
          // 将更改的数据同步（用于列表型表单修改）
          if(this.buy_count[0] && this.buy_count[1]) {
            sycnObj.purchase_times_more = this.buy_count
          }
          this.$emit('sycnMethod', sycnObj)
        }else {
          // 更新营销配置基本量
          this.updataBaseMConfig({
            purchase_times: this.buy_count,
            purchase_times_label: this.purchase_label
          })
        }
      }
    },
    props: [
      'purchase',
      'purchaseLabel',
      'dataBind'
      ]
}
</script>
<style lang="scss">

</style>
