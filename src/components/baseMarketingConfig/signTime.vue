<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <p>签收时间：</p>
      </el-col>
      <el-col :span="2">
        <el-radio label="" v-model="sign_time_label">不限制</el-radio>
      </el-col>
      <el-col :span="19">
        <el-radio label="custom" v-model="sign_time_label">每日</el-radio>
        <timer-picker ref='timers' :disabled="sign_time_label != 'custom'" :startTime="sign_time_start" :endTime="sign_time_end" @updateTime="updateTime">
        </timer-picker>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      sign_time_start: '0:00',
      sign_time_end: '0:00',
      sign_time_label: ''
    }
  },
  watch: {
    signTime() {
      this.sign_time_start = this.signTime[0] ? this.signTime[0] : this.sign_time_start
      this.sign_time_end = this.signTime[1] ? this.signTime[1] : this.sign_time_end
    },
    signTimeLabel() {
      this.sign_time_label = this.signTimeLabel
    },
    sign_time_label() {
      this.$refs.timers.init()
      this.updataValue()
    }
  },
  mounted() {
    this.sign_time_label = this.signTimeLabel
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig'
    ]),
    updateTime(obj) {
      this.sign_time_start = obj.startTime
      this.sign_time_end = obj.endTime
      this.updataValue()
    },
    updataValue() {
      // 更新营销配置基本量
      this.updataBaseMConfig({
        sign_time: [this.sign_time_start, this.sign_time_end],
        sign_time_label: this.sign_time_label
      })
      if (this.dataBind) {
        var sycnObj = {
          sign_time: [this.sign_time_start, this.sign_time_end],
          sign_time_label: this.sign_time_label
        }
        this.$emit('sycnMethod', sycnObj)
        // this.dataBind.sign_time = [this.sign_time_start, this.sign_time_end]
        // this.dataBind.sign_time_label = this.sign_time_label
      }
    }
  },
  props: [
    'signTime',
    'signTimeLabel',
    'dataBind'
  ]
}
</script>
<style lang="scss">

</style>
