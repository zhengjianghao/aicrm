<template>
<div>
  <el-row :gutter="20">
    <el-col :span="3"><p>付款时间：</p></el-col>
    <el-col :span="2"><el-radio label="" v-model="pay_time_label">不限制</el-radio></el-col>
    <el-col :span="19">
      <el-radio label="custom" v-model="pay_time_label">每日</el-radio>
        <timer-picker
        ref='timers'
        :disabled="pay_time_label != 'custom'"
        :startTime="pay_time_start"
        :endTime="pay_time_end"
        @updateTime="updateTime"
        >
        </timer-picker>
      </el-col>
  </el-row>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data() {
      return {
        pay_time_start: '0:00',
        pay_time_end: '0:00',
        pay_time_label: ''
      }
    },
    watch: {
      payTime() {
        this.pay_time_start = this.payTime[0] ? this.payTime[0] : this.pay_time_start
        this.pay_time_end = this.payTime[1] ? this.payTime[1] : this.pay_time_end
      },
      payTimeLabel() {
        this.pay_time_label = this.payTimeLabel
      },
      pay_time_label() {
        this.$refs.timers.init()
        this.updataValue()
      }
    },
    mounted() {
      this.pay_time_label = this.payTimeLabel
    },
    methods: {
      ...mapActions([
        'updataBaseMConfig'
      ]),
      updateTime(obj) {
        this.pay_time_start = obj.startTime
        this.pay_time_end = obj.endTime
        this.updataValue()
      },
      updataValue() {
        // 更新营销配置基本量
        this.updataBaseMConfig({
          pay_time: [this.pay_time_start, this.pay_time_end],
          pay_time_label: this.pay_time_label
        })
        if(this.dataBind) {
          var sycnObj = {
            pay_time: [this.pay_time_start, this.pay_time_end],
            pay_time_label: this.pay_time_label
          }
          this.$emit('sycnMethod', sycnObj)
          // this.dataBind.pay_time = [this.pay_time_start, this.pay_time_end]
          // this.dataBind.pay_time_label = this.pay_time_label
        }
      }
    },
    props: [
      'payTime',
      'payTimeLabel',
      'dataBind'
    ]
}
</script>
<style lang="scss">

</style>
