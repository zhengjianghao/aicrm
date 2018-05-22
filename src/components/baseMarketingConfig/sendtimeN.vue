<template>
  <div>
    <el-form-item>
      <!--所有部分都根据传值判断是否显示-->
      <!--聚划算挽回相似中 有发送日期的-->
      <el-row :gutter='20' v-if="sendDate != undefined">
        <el-col :span='3'>
          <p>发送日期：</p>
        </el-col>
        <el-col :span='21'>{{beforeWord}}
          <el-select v-model="send_date" placeholder="请选择">
            <el-option v-for="item in g_const.sendData" :label="item.name" :value="item.value" :key="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter='20' v-if="sendDate != undefined">
        <el-col :span='3'>
        </el-col>
        <el-col :span='21'>
          <span class="info">如果选择当天，强制改为定时发送，否则会导致部分用户无法正常推送</span>
        </el-col>
      </el-row>
      <!--正常发送时间-->
      <el-row :gutter="20">
        <el-col :span="3">
          <p>发送时间：</p>
        </el-col>
        <!--是否是立即发送还是AI-->
        <el-col :span="8" v-if='isSendNow != undefined'>
          <el-radio v-model="send_time_label" label="">立即发送</el-radio>
        </el-col>
        <el-col :span="8" v-else>
          <el-radio v-model="send_time_label" v-click-trigger:radioClick="sendTimeRadioClick" :disabled="send_date == '0'" label="">
            <AI></AI>智慧逐个推算</el-radio>
          <el-tooltip content='根据每个会员的近期购物习惯以及店铺历史数据，智能为每个会员制定具体推送时间' placement="top-start" popper-class='tool_notes' effect="dark">
            <i class="iconfont icon-help1 toolGanTanHao"></i>
          </el-tooltip>
        </el-col>
        <!--定时发送是否包含天-->
        <el-col :span="13" v-if="sendTime != undefined">
          <el-radio v-model="send_time_label" label="custom" v-click-trigger:radioClick="sendTimeRadioClick">定时发送 {{sendWord}}</el-radio>
          <el-form-item prop="send_time_day" style="display: inline-block" v-if="sendTimeDay != undefined">
            <el-tooltip class="item" effect="dark" :manual="true" :value="send_day_invalid && send_time_label == 'custom' && sendTimeDay != undefined" :content="send_day_invalid_msg" placement="top">

              <el-input v-model="send_time_day" placeholder="不能为空" style="width:110px" :disabled="send_time_label !== 'custom'">
                <template slot="append">天</template>
              </el-input>

            </el-tooltip>
          </el-form-item>
          <el-form-item prop='send_time' style="display: inline-block">
            <el-tooltip class="item" effect="dark" :manual="true" :value="send_time_invalid && send_time_label == 'custom'" content="不能为空" placement="top">
              <el-time-select :disabled="send_time_label !== 'custom'" v-model="send_time" :editable="false" placeholder="请选择" :clearable="false" :picker-options="{
                              start: '00:00',
                              step: '00:15',
                              end: '24:00'
                              }">
              </el-time-select>
            </el-tooltip>
            发送
          </el-form-item>
        </el-col>
      </el-row>
      <!--根据传值判断是否显示复选框-->
      <el-row :gutter="20" v-show="elcludeTime != undefined">
        <el-col :span="3"></el-col>
        <el-col :span="9">
          <el-checkbox v-model="exclude_time_label" :disabled="send_time_label === 'custom'">{{sendTypeWord ? sendTypeWord : '信息不推送时间段'}} 每日</el-checkbox>
          <timer-picker :disabled="!exclude_time_label || send_time_label === 'custom'" :startTime="exclued_time_start" :endTime="exclued_time_end" @updateTime="updateTime">
          </timer-picker>
        </el-col>
        <el-col :span="12" v-show="aheadTimeLabel != undefined">
          <el-checkbox v-model="ahead_time_label" :disabled="send_time_label === 'custom'">在不发送时间内的信息自动提前发送</el-checkbox>
        </el-col>
      </el-row>
    </el-form-item>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
export default {
  data() {
    return {
      send_time_label: '',
      send_time: '',
      exclude_time_label: '',
      exclued_time_start: '',
      exclued_time_end: '',
      ahead_time_label: '',
      send_time_day: '',
      send_date: '',
      g_const: globalConstant,
      send_day_invalid: false,
      send_day_invalid_msg: '',
      send_time_invalid: false,
      exclude_time: [],
      isActived: false // 组件是否被激活
    }
  },
  computed: {
    ...mapGetters([
      'verificationData',
    ]),
  },
  mounted() {
    this.isActived = true
  },
  // 组件被激活
  activated() {
    if (!this.isActived) {
      this.isActived = true
    }
  },
  // 组件转为非激活状态
  deactivated() {
    this.isActived = false
  },
  watch: {
    // 定时还是ai（props监听）
    sendTimeLabel() {
      this.send_time_label = this.sendTimeLabel
    },
    // 签收后几天（props监听）
    sendDate() {
      this.send_date = this.sendDate ? this.sendDate : ''
    },
    // 签收后几天（组件内监听）
    send_date() {
      if (this.send_date == '0') {
        this.send_time_label = 'custom'
      }
      this.updataValue('send_date', this.send_date)
    },
    // 签收后几天（props监听）当sendDate===undefined
    sendTimeDay() {
      this.send_time_day = this.send_time_label == '' ? '' : this.sendTimeDay
    },
    // 签收后几天（组件内监听）当sendDate===undefined
    send_time_day() {
      this.updataValue('send_time_day', this.send_time_day)
      this.verification({
        send_time_day: this.send_time_day
      })
    },
    // 签收后几点（props监听）
    sendTime() {
      this.send_time = this.send_time_label == '' ? '' : this.sendTime
    },
    // 签收后几点（组件内监听）
    send_time() {
      this.updataValue('send_time', this.send_time)
      this.verification({
        send_time: this.send_time
      })
    },
    //信息不发送时间段是否选中（props监听）
    excludeTimeLabel() {
      this.exclude_time_label = this.excludeTimeLabel
    },
    //信息不发送时间段是否选中（组件内监听）
    exclude_time_label() {
      if (this.aheadTimeLabel != undefined && !this.exclude_time_label) {
        this.ahead_time_label = false
      }
      this.updataValue('exclude_time_label', this.exclude_time_label)
    },
    //信息不发送时间段（props监听）
    elcludeTime() {
      this.exclued_time_start = this.elcludeTime[0] ? this.elcludeTime[0] : '22:00'
      this.exclued_time_end = this.elcludeTime[1] ? this.elcludeTime[1] : '8:30'
      this.exclude_time = [this.exclued_time_start, this.exclued_time_end]
    },
    //信息不发送时间段（组件内监听）
    exclude_time() {
      this.updataValue('exclude_time', [this.exclued_time_start, this.exclued_time_end])
    },
    // 是否提前发送（props监听）
    aheadTimeLabel() {
      this.ahead_time_label = this.aheadTimeLabel
    },
    // 是否提前发送（组件内监听）
    ahead_time_label() {
      if (this.excludeTimeLabel != undefined && this.ahead_time_label) {
        this.exclude_time_label = true
      }
      this.updataValue('ahead_time_label', this.ahead_time_label)
    },
    verificationData() {
      // 组件激活时才会进入
      if (this.isActived) {
        if (this.verificationData.hasOwnProperty('send_day_invalid')) {
          this.send_day_invalid = this.verificationData.send_day_invalid
        }
        if (this.verificationData.hasOwnProperty('send_day_invalid_msg')) {
          this.send_day_invalid_msg = this.verificationData.send_day_invalid_msg
        }
        if (this.verificationData.hasOwnProperty('send_time_invalid')) {
          this.send_time_invalid = this.verificationData.send_time_invalid
        }
      }
    },
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig',
      'verification'
    ]),
    /**
     * 单选按钮click事件
     * 如果选择AI 则 val='' 选则自定义 则 val='custom'
     * 选中则更新vuex(保存)、vuex(验证)
     * @param val {String} 选中的值
     */
    sendTimeRadioClick(val) {
      if (this.send_time_label == '') {
        this.send_time = '请选择'
        this.send_time_day = ''
        this.exclude_time_label = true
        this.ahead_time_label = true
      } else if (this.send_time_label == 'custom') {
        this.exclude_time_label = false
        this.ahead_time_label = false
      }
      this.updataValue('send_time_label', this.send_time_label)
    },
    updateTime(obj) {
      this.exclued_time_start = obj.startTime
      this.exclued_time_end = obj.endTime
      this.exclude_time = [this.exclued_time_start, this.exclued_time_end]
    },
    /**
     * 更新数据
     * @param {string} key 更新的那个数据名
     * @param {any} value 更新的具体值
    */
    updataValue(key, value) {
      // 更新营销配置基本量
      var _temp = {
        send_time_type: "isString"
      }
      _temp[key] = value
      this.updataBaseMConfig(_temp)
    }
  },
  props: [
    'sendTimeLabel',
    'sendTime',
    'excludeTimeLabel',
    'elcludeTime',
    'aheadTimeLabel',
    'sendTimeDay',
    'sendWord',
    'sendDate',
    'sendTypeWord',
    'beforeWord',
    'isSendNow'
  ]
}
</script>
<style lang="scss">

</style>
