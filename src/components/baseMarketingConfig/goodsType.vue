<template>
<div>
  <el-row :gutter="20" class="validRow">
      <el-col :span="3"><p>{{memberSearch ? memberSearch : '商品种类：'}}</p></el-col>
      <el-col :span="2"><el-radio label="" v-model="order_num_label">不限制</el-radio></el-col>
      <el-col :span="19">
          <el-form-item prop="order_types">
              <el-tooltip
                  class="item"
                  effect="dark"
                  :manual="true"
                  :value="isSubState && order_start_invalid"
                  :content="order_start_invalid_msg"
                  placement="top"
                  >
                  <el-radio label="custom" v-model="order_num_label">
                    <el-input v-model="order_types[0]" placeholder="不限" style="width:100px" :disabled="order_num_label !== 'custom'">
                      <template slot="append">种</template>
                    </el-input>
                  </el-radio>
              </el-tooltip> 至
              <el-tooltip
                  class="item"
                  effect="dark"
                  :manual="true"
                  :value="isSubState && order_end_invalid"
                  :content="order_end_invalid_msg"
                  placement="top"
                  >
                  <el-input v-model="order_types[1]" placeholder="不限" style="width:100px" :disabled="order_num_label !== 'custom'">
                    <template slot="append">种</template>
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
        order_num_label: '',
        order_types: ['',''],
        order_start_invalid: false,
        order_start_invalid_msg: '',
        order_end_invalid: false,
        order_end_invalid_msg: '',
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
      orderNum() {
        if(this.orderNum.length == 0 && this.orderNumLabel == '') {
          this.order_num_label = this.orderNumLabel
        }
        this.order_types = this.orderNum
      },
      order_types() {
        this.updataValue()
        this.verification({
          order_types: this.order_types
        })
      },
      orderNumLabel() {
        this.order_num_label = this.orderNumLabel
      },
      order_num_label() {
        this.updataValue()
      },
      verificationData() {
        if(!this.dataBind) {
          if(this.verificationData.hasOwnProperty('order_start_invalid')) {
            this.order_start_invalid=this.verificationData.order_start_invalid
          }
          if(this.verificationData.hasOwnProperty('order_start_invalid_msg')) {
              this.order_start_invalid_msg=this.verificationData.order_start_invalid_msg
          }
          if(this.verificationData.hasOwnProperty('order_end_invalid')) {
              this.order_end_invalid=this.verificationData.order_end_invalid
          }
          if(this.verificationData.hasOwnProperty('order_end_invalid_msg')) {
              this.order_end_invalid_msg=this.verificationData.order_end_invalid_msg
          }
        }
      },
      dataBind() {
        if(this.dataBind.hasOwnProperty('order_start_invalid')) {
          this.order_start_invalid=this.dataBind.order_start_invalid
        }
        if(this.dataBind.hasOwnProperty('order_start_invalid_msg')) {
            this.order_start_invalid_msg=this.dataBind.order_start_invalid_msg
        }
        if(this.dataBind.hasOwnProperty('order_end_invalid')) {
            this.order_end_invalid=this.dataBind.order_end_invalid
        }
        if(this.dataBind.hasOwnProperty('order_end_invalid_msg')) {
            this.order_end_invalid_msg=this.dataBind.order_end_invalid_msg
        }
        this.updataValue()
      }
    },
    mounted() {
      this.first_load = true
      this.order_num_label = this.orderNumLabel ? this.orderNumLabel : ''
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
            order_num_label: this.order_num_label,
            order_types: this.order_types
          }
          // 将更改的数据同步（用于列表型表单修改）
          if(this.order_types[0] && this.order_types[1]) {
            sycnObj.order_num = this.order_types
          }
          this.$emit('sycnMethod', sycnObj)
        } else {
          // 更新营销配置基本量
          this.updataBaseMConfig({
            order_num: this.order_types,
            order_num_label: this.order_num_label,
          })
        }
      }
    },
    props: [
      'orderNum',
      'orderNumLabel',
      'dataBind',
      'memberSearch'
    ]
}
</script>
<style lang="scss">

</style>
