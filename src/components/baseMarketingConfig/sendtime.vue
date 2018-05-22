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
    <el-col :span="changeName=='AI' ? 5:2"><el-radio v-model="pushtime_label" v-click-trigger:radioClick="sendTimeRadioClick" label="">
      <template v-if="changeName=='AI'">
        <span><AI></AI> 智慧管理</span>
        <el-tooltip placement="top-start" popper-class='tool_notes'>
          <div slot="content">
            ①当催付时长间隔&lt;20分钟内时，不限制发送时间实时发送，<br/>
            ②当催付时长间隔&gt;20分钟内时，在早9-晚23点之间实时发送，不在时间内的顺延到早9-晚23点之间发送
          </div>
          <i class="iconfont icon-help1 toolGanTanHao"></i>
        </el-tooltip>
      </template>
      <template v-else>{{changeName}}</template>
    </el-radio></el-col>
    <el-col :span="8">
      <el-radio v-model="pushtime_label" v-click-trigger:radioClick="sendTimeRadioClick" label="custom">每日</el-radio>
      <timer-picker
        :disabled="pushtime_label != 'custom'"
        :startTime="push_time_start"
        :endTime="push_time_end"
        @updateTime="updateTime">
      </timer-picker>
      <el-tooltip :content='tooltipContent' placement="top-start" popper-class='tool_notes' effect="dark">
        <i class="iconfont icon-help1 toolGanTanHao"></i>
      </el-tooltip>
    </el-col>
    <!--isAI 没用到-->
    <!--<template v-if="isAI">
      <el-col :span="5"><el-checkbox :disabled="pushtime_label != 'custom'" v-model="behind_time" label='behind'>不在选定时间内的自动顺延发送</el-checkbox></el-col>
      <el-col :span="7">
        <el-radio v-model="pushtime_label" label="AI"><AI></AI> 逐个ID推算</el-radio>
        <el-tooltip content='建议选择非立即触发时才启用，根据每个会员的近期购物习惯以及店铺历史数据，智能为每个会员制定具体推送时间' placement="top-start" popper-class='tool_notes' effect="dark">
          <i class="iconfont icon-help1 toolGanTanHao"></i>
        </el-tooltip>
      </el-col>
    </template>-->
    <el-col :span="changeName=='AI' ? 8:11"><el-checkbox :disabled="pushtime_label != 'custom'" v-model="behind_time" label='behind'>不在选定时间内的自动顺延发送</el-checkbox></el-col>
  </el-row>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  // import globalConstant from '../../misc/global.constant'
  export default {
    data() {
      return {
        pushtime_label: '',
        push_time_start: '',
        push_time_end: '',
        behind_time: '',
        push_time: [],
        tooltipContent: '可限制给买家推送信息的时间段，避免夜间打扰买家',
      }
    },
    watch: {
      behind_time() {
        this.updataValue('send_time_behind', this.behind_time)
      },
      pushTimeLabel() {
        this.pushtime_label = this.pushTimeLabel
      },
      pushTime() {
        if(this.pushtime_label === 'custom') {
          this.push_time_start = this.pushTime[0] ? this.pushTime[0] : '8:30'
          this.push_time_end = this.pushTime[1] ? this.pushTime[1] : '22:00'
        } else {
          this.push_time_start = '8:30'
          this.push_time_end = '22:00'
        }
        this.push_time = [this.push_time_start, this.push_time_end]
      },
      push_time () {
        this.updataValue('send_time', this.push_time)
      },
      behindTime() {
        //转换后端传值 能让CheckBox识别
        if(this.behindTime == 'true' || this.behindTime == true) {
          this.behind_time = true
        }else {
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
        if(this.pushtime_label === 'custom') {
          this.behind_time = true
        } else {
          this.behind_time = false
        }
        this.updataValue('send_time_label', this.pushtime_label)
      },
      updateTime(obj) {
        this.push_time_start = obj.startTime
        this.push_time_end = obj.endTime
        this.push_time = [this.push_time_start, this.push_time_end]
        // this.updataValue('send_time', [this.push_time_start, this.push_time_end])
      },
      /**
       * 更新数据
       * @param {string} key 更新的那个数据名
       * @param {any} value 更新的具体值
      */
      updataValue(key, value) {
        // 更新营销配置基本量
        var _temp = {
          send_time_type: "isArray"
        }
        _temp[key] = value
        this.updataBaseMConfig(_temp)
      }
    },
    props: [
      'pushTimeLabel',
      'pushTime',
      'behindTime',
      'changeName',
      // 'isAI'
      ]
}
</script>
<style lang="scss">

</style>
