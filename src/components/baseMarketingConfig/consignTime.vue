<template>
<div>
  <el-row :gutter="20">
    <el-col :span="3"><p>发货时间：</p></el-col>
    <el-col :span="2"><el-radio label="" v-model="consign_time_label">不限制</el-radio></el-col>
    <el-col :span="19">
      <el-radio label="custom" v-model="consign_time_label">每日</el-radio>
        <timer-picker
        ref='timers'
        :disabled="consign_time_label != 'custom'"
        :startTime="consign_time_start"
        :endTime="consign_time_end"
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
        consign_time_start: '0:00',
        consign_time_end: '0:00',
        consign_time_label: ''
      }
    },
    watch: {
      consignTime() {
        this.consign_time_start = this.consignTime[0] ? this.consignTime[0] : this.consign_time_start
        this.consign_time_end = this.consignTime[1] ? this.consignTime[1] : this.consign_time_end
      },
      consignTimeLabel() {
        this.consign_time_label = this.consignTimeLabel
      },
      consign_time_label() {
        this.$refs.timers.init()
        this.updataValue()
      }
    },
    mounted() {
      this.consign_time_label = this.consignTimeLabel
    },
    methods: {
      ...mapActions([
        'updataBaseMConfig'
      ]),
      updateTime(obj) {
        this.consign_time_start = obj.startTime
        this.consign_time_end = obj.endTime
        this.updataValue()
      },
      updataValue() {
        // 更新营销配置基本量
        this.updataBaseMConfig({
          consign_time: [this.consign_time_start, this.consign_time_end],
          consign_time_label: this.consign_time_label
        })
        if(this.dataBind) {
          var sycnObj = {
            consign_time: [this.consign_time_start, this.consign_time_end],
            consign_time_label: this.consign_time_label
          }
          this.$emit('sycnMethod', sycnObj)
          // this.dataBind.consign_time = [this.consign_time_start, this.consign_time_end]
          // this.dataBind.consign_time_label = this.consign_time_label
        }
      }
    },
    props: [
      'consignTime',
      'consignTimeLabel',
      'dataBind'
      ]
}
</script>
<style lang="scss">

</style>
