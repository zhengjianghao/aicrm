<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <p>
          <el-tooltip content='仅在选定的时间内推送信息' placement="top-start" popper-class='tool_notes' effect="dark">
            <i class="iconfont icon-help1 toolGanTanHao"></i>
          </el-tooltip>
          <span>信息发送时间段：</span>
        </p>
      </el-col>
      <el-col :span="5">
        <el-radio v-model="pushtime_label" v-click-trigger:radioClick="sendTimeRadioClick" label="">
          <span>
            <AI></AI> 智慧管理</span>
          <el-tooltip placement="top-start" popper-class='tool_notes'>
            <div slot="content">
              建议选择非立即触发时才启用，根据每个会员的近期购物习惯以及店铺历史数据，智能为每个会员制定具体推送时间
            </div>
            <i class="iconfont icon-help1 toolGanTanHao"></i>
          </el-tooltip>
        </el-radio>
      </el-col>
      <el-col :span="8">
        <el-radio v-model="pushtime_label" v-click-trigger:radioClick="sendTimeRadioClick" label="custom">每日</el-radio>
        <timer-picker :disabled="pushtime_label != 'custom'" :startTime="push_time_start" :endTime="push_time_end" @updateTime="updateTime">
        </timer-picker>
        <el-tooltip :content='tooltipContent' placement="top-start" popper-class='tool_notes' effect="dark">
          <i class="iconfont icon-help1 toolGanTanHao"></i>
        </el-tooltip>
      </el-col>
      <el-col :span="6">
        <el-checkbox :disabled="pushtime_label != 'custom'" v-model="behind_time" label='behind'>不在选定时间内的自动顺延发送</el-checkbox>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
export default {
  data() {
    return {
      pushtime_label: '',
      push_time_start: '',
      push_time_end: '',
      behind_time: '',
      tooltipContent: '可限制给买家推送信息的时间段，避免夜间打扰买家'
    }
  },
  watch: {
    behind_time() {
      this.updataValue()
    },
    pushTimeLabel() {
      this.pushtime_label = this.pushTimeLabel
    },
    pushTime() {
      if(this.pushTime === '请选择') {
        this.pushtime_label = ''
        this.updataValue()
        return
      }
      this.push_time_start = this.pushTime[0] ? this.pushTime[0] != 'now' ? this.pushTime[0] : '08:30' : '08:30'
      this.push_time_end = this.pushTime[1] ? this.pushTime[1] : '22:00'
    },
    behindTime() {
      //转换后端传值 能让CheckBox识别
      if (this.behindTime == 'true' || this.behindTime == true) {
        this.behind_time = true
      } else {
        this.behind_time = false
      }
    },
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig'
    ]),
    /**
     * 单选按钮click事件
     * 如果选择AI 则 val='' 选则自定义 则 val='custom'
     * 选中则更新vuex(保存)、vuex(验证)
     * @param val {String} 选中的值
     */
    sendTimeRadioClick(val) {
      this.updataValue()
      if (this.pushtime_label === 'custom') {
        this.behind_time = true
      } else {
        this.behind_time = false
      }
    },
    updateTime(obj) {
      this.push_time_start = obj.startTime
      this.push_time_end = obj.endTime
      this.updataValue()
    },
    updataValue() {
      // 更新营销配置基本量
      this.updataBaseMConfig({
        send_time_label: this.pushtime_label,
        send_time: [this.push_time_start, this.push_time_end],
        send_time_behind: this.behind_time,
        send_time_type: "isNow"
      })
    }
  },
  props: [
    'pushTimeLabel',
    'pushTime',
    'behindTime',
  ]
}
</script>
<style lang="scss">

</style>
