<template>
<div>
  <el-row :gutter="20" class="validRow">
      <el-col :span="3"><p>{{memberSearch ? memberSearch : '商品件数：'}}</p></el-col>
      <el-col :span="2"><el-radio label="" v-model="buys_label">不限制</el-radio></el-col>
      <el-col :span="19">
          <el-form-item prop="buys_num">
              <el-tooltip
                  class="item"
                  effect="dark"
                  :manual="true"
                  :value="isSubState && buys_start_invalid"
                  :content="buys_start_invalid_msg"
                  placement="top"
                  >
                  <el-radio label="custom" v-model="buys_label">
                    数量在
                    <el-input v-model="buys_num[0]" placeholder="不限" style="width:100px" :disabled="buys_label !== 'custom'">
                      <template slot="append">件</template>
                    </el-input>
                  </el-radio>
              </el-tooltip> 至
              <el-tooltip
                  class="item"
                  effect="dark"
                  :manual="true"
                  :value="isSubState && buys_end_invalid"
                  :content="buys_end_invalid_msg"
                  placement="top"
                  >
                  <el-input v-model="buys_num[1]" placeholder="不限" style="width:100px" :disabled="buys_label !== 'custom'">
                    <template slot="append">件</template>
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
        buys_label: '',
        buys_start_invalid: false,
        buys_start_invalid_msg: '',
        buys_end_invalid: false,
        buys_end_invalid_msg: '',
        buys_num: [],
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
      buys() {
        if(this.buys.length == 0 && this.buysLabel == '') {
          this.buys_label = this.buysLabel
        }
        this.buys_num = this.buys.length ? this.buys : [1,2]
      },
      buys_num() {
        this.updataValue()
        this.verification({
          buys_num: this.buys_num
        })
      },
      buys_label() {
        this.updataValue()
        this.verification({
          buys_num: this.buys_num
        })
      },
      buysLabel() {
        this.buys_label = this.buysLabel
      },
      verificationData() {
        if(!this.dataBind) {
          if(this.verificationData.hasOwnProperty('buys_start_invalid')) {
            this.buys_start_invalid=this.verificationData.buys_start_invalid
          }
          if(this.verificationData.hasOwnProperty('buys_start_invalid_msg')) {
              this.buys_start_invalid_msg=this.verificationData.buys_start_invalid_msg
          }
          if(this.verificationData.hasOwnProperty('buys_end_invalid')) {
              this.buys_end_invalid=this.verificationData.buys_end_invalid
          }
          if(this.verificationData.hasOwnProperty('buys_end_invalid_msg')) {
              this.buys_end_invalid_msg=this.verificationData.buys_end_invalid_msg
          }
        }
      },
      dataBind() {
        if(this.dataBind.hasOwnProperty('buys_start_invalid')) {
          this.buys_start_invalid=this.dataBind.buys_start_invalid
        }
        if(this.dataBind.hasOwnProperty('buys_start_invalid_msg')) {
            this.buys_start_invalid_msg=this.dataBind.buys_start_invalid_msg
        }
        if(this.dataBind.hasOwnProperty('buys_end_invalid')) {
            this.buys_end_invalid=this.dataBind.buys_end_invalid
        }
        if(this.dataBind.hasOwnProperty('buys_end_invalid_msg')) {
            this.buys_end_invalid_msg=this.dataBind.buys_end_invalid_msg
        }
        this.updataValue()
      }
    },
    mounted() {
      this.first_load = true
      this.buys_label = this.buysLabel ? this.buysLabel : ''
    },
    methods: {
      ...mapActions([
        'updataBaseMConfig',
        'verification'
      ]),
      updataValue() {

        if(this.dataBind) {
          if(this.first_load) {
            this.first_load = false
            return
          }
          var sycnObj = {
            buys_label: this.buys_label,
            buys_num: this.buys_num
          }
          // 将更改的数据同步（用于列表型表单修改）
          if(this.buys_num[0] && this.buys_num[1]) {
            sycnObj.buys = this.buys_num
          }
          this.$emit('sycnMethod', sycnObj)
        } else {
          // 更新营销配置基本量
          this.updataBaseMConfig({
            buys: this.buys_num,
            buys_label: this.buys_label
          })
        }
      }
    },
    props: [
      'buys',
      'buysLabel',
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
