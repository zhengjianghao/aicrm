<template>
<div>
  <el-row :gutter="20">
      <el-col :span="3"><p>下单时间：</p></el-col>
      <el-col :span="2"><el-radio v-model="order_time_label" label="">不限制</el-radio></el-col>
      <el-col :span="2"><el-radio v-model="order_time_label" label="1month">最近一个月</el-radio></el-col>
      <el-col :span="2"><el-radio v-model="order_time_label" label="3month">最近三个月</el-radio></el-col>
      <el-col :span="15">
        <el-form-item prop='order_time'>
          <el-tooltip
            class="item"
            effect="dark"
            :manual="true"
            :value="isSubState && ordertime_start_invalid"
            :content="ordertime_start_invalid_msg"
            :disabled="order_time_label !== 'custom'"
            placement="top"
            >
            <el-radio v-model="order_time_label" label="custom">自定义
              <el-date-picker
                v-model="order_time[0]"
                :disabled="order_time_label === 'custom' ? false : true"
                format="yyyy-MM-dd HH:mm"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围">
              </el-date-picker>
            </el-radio>
          </el-tooltip>至
          <el-tooltip 
            class="item"
            effect="dark"
            :manual="true"
            :value="isSubState && ordertime_end_invalid"
            :content="ordertime_end_invalid_msg"
            :disabled="order_time_label !== 'custom'"
            placement="top">
              <el-date-picker
              v-model="order_time[1]"
              :disabled="order_time_label === 'custom' ? false : true"
              format="yyyy-MM-dd HH:mm"
              type="datetime"
              :editable="false"
              :picker-options="checkOver"
              placeholder="无期限">
            </el-date-picker>
          </el-tooltip>
        </el-form-item>
      </el-col>
  </el-row>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import moment from 'moment'
  export default {
    data() {
      var that = this
      return {
        checkOver: {
          disabledDate(time) {
            return time.getTime() < moment(that.order_time[0]).valueOf() - 8.64e7;
          }
        },
        order_time_label: '',
        order_time: ['',''],
        ordertime_start_invalid: false,
        ordertime_start_invalid_msg: '',
        ordertime_end_invalid: false,
        ordertime_end_invalid_msg: '',
      }
    },
    mounted() {
      // this.order_time_label = 'test'
      this.order_time = [this.orderTime ? this.orderTime[0] ? this.orderTime[0] : moment().format('YYYY-MM-DD HH:mm') : moment().format('YYYY-MM-DD HH:mm'), this.orderTime ? this.orderTime[1] ? this.orderTime[1] : '' : '']
    },
    computed: {
      ...mapGetters([
        'verificationData',
        'subState'
      ]),
      isSubState() {
        if (this.subState == 'resultData' || this.subState == 'resultDetail' || this.subState == 'pushRecord' || this.subState == 'unsubscribeRecord' || this.subState == 'qianniuTask') {
          return false
        } else {
          return true
        }
      }
    },
    watch: {
      orderTime() {
        // this.order_time = [this.orderTime ? moment().format('YYYY-MM-DD HH:mm') : this.orderTime[0] ? this.orderTime[0] : moment().format('YYYY-MM-DD HH:mm'), '']
        // this.order_time = this.orderTime ? this.orderTime : [moment().format('YYYY-MM-DD HH:mm'), '']
        if(this.orderTime.length == 0) {
          this.order_time = [moment().format('YYYY-MM-DD HH:mm'), '']
        }else {
          this.order_time = this.orderTime
          // this.order_time = [this.orderTime[0] ? this.orderTime[0] : moment().format('YYYY-MM-DD HH:mm'), this.orderTime[1] ? this.orderTime[1] : '']
        }
        // this.order_time = [this.orderTime ? this.orderTime[0] ? this.orderTime[0] : moment().format('YYYY-MM-DD HH:mm') : moment().format('YYYY-MM-DD HH:mm'), this.orderTime ? this.orderTime[1] ? this.orderTime[1] : '' : '']
        // this.order_time = this.orderTime
      },
      orderTimeLabel() {
        this.order_time_label = this.orderTimeLabel
      },
      order_time() {
        this.updataValue()
        this.verification({
          order_time: this.order_time
        })
      },
      order_time_label() {
        if(this.order_time_label != 'custom') {
          // this.order_time = [this.orderTime ? moment().format('YYYY-MM-DD HH:mm') : this.orderTime[0] ? this.orderTime[0] : moment().format('YYYY-MM-DD HH:mm'), '']
          this.order_time = [this.orderTime ? this.orderTime[0] ? this.orderTime[0] : moment().format('YYYY-MM-DD HH:mm') : moment().format('YYYY-MM-DD HH:mm'), this.orderTime ? this.orderTime[1] ? this.orderTime[1] : '' : '']
          // this.order_time = this.orderTime ? this.orderTime : [moment().format('YYYY-MM-DD HH:mm'), '']
        }
        this.updataValue()
      },
      verificationData() {
        if (this.verificationData.hasOwnProperty('ordertime_start_invalid')) {
          this.ordertime_start_invalid = this.verificationData.ordertime_start_invalid
        }
        if (this.verificationData.hasOwnProperty('ordertime_start_invalid_msg')) {
          this.ordertime_start_invalid_msg = this.verificationData.ordertime_start_invalid_msg
        }
        if (this.verificationData.hasOwnProperty('ordertime_end_invalid')) {
          this.ordertime_end_invalid = this.verificationData.ordertime_end_invalid
        }
        if (this.verificationData.hasOwnProperty('ordertime_end_invalid_msg')) {
          this.ordertime_end_invalid_msg = this.verificationData.ordertime_end_invalid_msg
        }
      },
      dataBind() {
        if(this.dataBind.hasOwnProperty('ordertime_start_invalid')) {
          this.ordertime_start_invalid=this.dataBind.ordertime_start_invalid
        }
        if(this.dataBind.hasOwnProperty('ordertime_start_invalid_msg')) {
            this.ordertime_start_invalid_msg=this.dataBind.ordertime_start_invalid_msg
        }
        if(this.dataBind.hasOwnProperty('ordertime_end_invalid')) {
            this.ordertime_end_invalid=this.dataBind.ordertime_end_invalid
        }
        if(this.dataBind.hasOwnProperty('ordertime_end_invalid_msg')) {
            this.ordertime_end_invalid_msg=this.dataBind.ordertime_end_invalid_msg
        }
        this.updataValue()
      }
    },
    methods: {
      ...mapActions([
        'updataBaseMConfig',
        'verification'
      ]),
      updataValue() {
        // 将更改的数据同步（用于列表型表单修改）
        if(this.dataBind) {
          var sycnObj = {
            created_label: this.order_time_label,
            order_time: this.order_time
          }
          // 将更改的数据同步（用于列表型表单修改）
          if(this.order_time[0] && this.order_time[1]) {
            sycnObj.created = this.order_time
          }
          this.$emit('sycnMethod', sycnObj)
        } else {
          // 更新营销配置基本量
          this.updataBaseMConfig({
            created: this.order_time,
            created_label: this.order_time_label
          })
        }
      }

    },
    props: [
      'orderTime',
      'orderTimeLabel',
      'dataBind'
      ]
}
</script>
<style lang="scss">

</style>
