<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <p>确认时间：</p>
      </el-col>
      <el-col :span="2">
        <el-radio label="" v-model="confirm_time_label">不限制</el-radio>
      </el-col>
      <el-col :span="19">
        <el-radio label="custom" v-model="confirm_time_label">每日</el-radio>
        <timer-picker ref='timers' :disabled="confirm_time_label != 'custom'" :startTime="confirm_time_start" :endTime="confirm_time_end" @updateTime="updateTime">
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
      confirm_time_start: '0:00',
      confirm_time_end: '0:00',
      confirm_time_label: ''
    }
  },
  watch: {
    confirmTime() {
      this.confirm_time_start = this.confirmTime[0] ? this.confirmTime[0] : this.confirm_time_start
      this.confirm_time_end = this.confirmTime[1] ? this.confirmTime[1] : this.confirm_time_end
    },
    confirmTimeLabel() {
      this.confirm_time_label = this.confirmTimeLabel
    },
    confirm_time_label() {
      this.$refs.timers.init()
      this.updataValue()
    }
  },
  mounted() {
    this.confirm_time_label = this.confirmTimeLabel
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig'
    ]),
    updateTime(obj) {
      this.confirm_time_start = obj.startTime
      this.confirm_time_end = obj.endTime
      this.updataValue()
    },
    updataValue() {
      // 更新营销配置基本量
      this.updataBaseMConfig({
        end_time: [this.confirm_time_start, this.confirm_time_end],
        end_time_label: this.confirm_time_label
      })
      if (this.dataBind) {
        var sycnObj = {
          end_time: [this.confirm_time_start, this.confirm_time_end],
          end_time_label: this.confirm_time_label
        }
        this.$emit('sycnMethod', sycnObj)
      }
    }
  },
  props: [
    'confirmTime',
    'confirmTimeLabel',
    'dataBind'
  ]
}
</script>
<style lang="scss">

</style>
