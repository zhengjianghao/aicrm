
<template>
<div>
  <el-row :gutter="20">
    <el-col :span="3"><p>下单时间：</p></el-col>
    <el-col :span="2"><el-radio v-model="order_time_label" label="">不限制</el-radio></el-col>
    <el-col :span="19">
      <el-radio v-model="order_time_label" label="custom" >每日</el-radio>
      <timer-picker
      :disabled="order_time_label != 'custom'"
      :startTime="order_time_start"
      :endTime="order_time_end"
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
        order_time_start: '8:30',
        order_time_end: '22:00',
        order_time_label: ''
      }
    },
    watch: {
      orderTime() {
        this.order_time_start = this.orderTime[0] ? this.orderTime[0] : this.order_time_start
        this.order_time_end = this.orderTime[1] ? this.orderTime[1] : this.order_time_end
      },
      orderTimeLabel() {
        this.order_time_label = this.orderTimeLabel
      },
      order_time_label() {
        this.updataValue()
      }
    },
    methods: {
      ...mapActions([
        'updataBaseMConfig'
      ]),
      updateTime(obj) {
        this.order_time_start = obj.startTime
        this.order_time_end = obj.endTime
        this.updataValue()
      },
      updataValue() {
        // 更新营销配置基本量
        this.updataBaseMConfig({
          created: [this.order_time_start, this.order_time_end],
          created_label: this.order_time_label
        })
      }
    },
    props: [
      'orderTime',
      'orderTimeLabel'
      ]
}
</script>
<style lang="scss">

</style>
