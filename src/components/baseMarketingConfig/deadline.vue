<template>
<div>
  <el-row :gutter="20">
    <el-col :span="3"><p>
      <el-tooltip :content='tooltipContent' placement="top-start" popper-class='tool_notes'  effect="dark">
        <i class="iconfont icon-help1 toolGanTanHao"></i>
      </el-tooltip>
      <span>{{ title }}：</span>
    </p></el-col>
    <el-col :span="3"><el-radio v-model="deadline_label" label="">开启后一直运行</el-radio></el-col>
    <el-col :span="18">
      <el-form-item prop='deadline_time'>
        <el-tooltip
            class="item"
            effect="dark"
            :manual="true"
            :value="isSubState && deadline_start_invalid"
            :content="deadline_start_invalid_msg"
            :disabled="deadline_label !== 'custom'"
            placement="top"
            >
            <el-radio v-model="deadline_label" label="custom">自定义
              <el-date-picker v-model="deadline_time[0]" :disabled="deadline_label === 'custom' ? false : true" format="yyyy-MM-dd HH:mm" type="datetime" :editable="false" :clearable="false" placeholder="选择时间范围">
              </el-date-picker>
            </el-radio>
          </el-tooltip>至
          <el-tooltip class="item" effect="dark" :manual="true" :value="isSubState && deadline_end_invalid" :content="deadline_end_invalid_msg" :disabled="deadline_label !== 'custom'" placement="top">
            <el-date-picker v-model="deadline_time[1]" :disabled="deadline_label === 'custom' ? false : true" format="yyyy-MM-dd HH:mm" type="datetime" :editable="false" :picker-options="checkOver" placeholder="无期限">
            </el-date-picker>
          </el-tooltip>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import moment from 'moment'
export default {
  data() {
    var that = this
    return {
      checkOver: {
        disabledDate(time) {
          return time.getTime() < moment(that.deadline_time[0]).valueOf() - 8.64e7;
        }
      },
      deadline_label: '',
      deadline_start: '',
      deadline_end: '',
      deadline_time: [],
      deadline_start_invalid: false,
      deadline_start_invalid_msg: '',
      deadline_end_invalid: false,
      deadline_end_invalid_msg: '',
      tooltipContent: '此活动的有效期，超过期限自动停止'
    }
  },
  created() {
    this.updataValue();
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
    deadline_label() {
      this.updataValue()
      if (this.deadline_label == '') {
        this.deadline_time = [this.deadline[0] ? this.deadline[0] : moment().format('YYYY-MM-DD HH:mm'), '']
      }
    },
    deadline_time() {
      this.updataValue()
      this.verification({
        deadline_time: this.deadline_time
      })
    },
    deadlineLabel() {
      this.deadline_label = this.deadlineLabel
    },
    deadline() {
      this.deadline_time = [this.deadline[0] ? this.deadline[0] : moment().format('YYYY-MM-DD HH:mm'), this.deadline[1] ? this.deadline[1] : '']
    },
    verificationData() {

      if (this.verificationData.hasOwnProperty('deadline_start_invalid')) {
        this.deadline_start_invalid = this.verificationData.deadline_start_invalid
      }
      if (this.verificationData.hasOwnProperty('deadline_start_invalid_msg')) {
        this.deadline_start_invalid_msg = this.verificationData.deadline_start_invalid_msg
      }
      if (this.verificationData.hasOwnProperty('deadline_end_invalid')) {
        this.deadline_end_invalid = this.verificationData.deadline_end_invalid
      }
      if (this.verificationData.hasOwnProperty('deadline_end_invalid_msg')) {
        this.deadline_end_invalid_msg = this.verificationData.deadline_end_invalid_msg
      }

    },
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig',
      'verification'
    ]),
    updataValue() {
      // 更新营销配置基本量
      this.updataBaseMConfig({
        deadline_label: this.deadline_label,
        deadline: this.deadline_time
      })
    }
  },
  props: [
    'deadlineLabel',
    'deadline',
    'title'
  ]
}
</script>
<style lang="scss" scoped>
.el-tooltip__popper .is-dark {
  opacity: 0.2;
}
</style>
