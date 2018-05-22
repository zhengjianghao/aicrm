<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <p>发送频率：</p>
      </el-col>
      <el-col :span="21">同一ID
        <span class="primary">1</span>天只发&nbsp;
        <el-tooltip class="item" effect="dark" :manual="true" :value="isSubState && intervalInvalid === true ? true : false" :content="inter_message" placement="top">
          <el-input style="width: 50px" v-model="send_times"></el-input>
        </el-tooltip>
        &nbsp;次</el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      send_times: '',
      intervalInvalid: false,
      inter_message: '',
      isActived: false // 组件是否被激活
    }
  },
  mounted() {
    this.isActived = true
  },
  // 组件被激活
  activated() {
    this.isActived = true
  },
  // 组件转为非激活状态
  deactivated() {
    this.isActived = false
  },
  watch: {
    send_times() {
      this.updataValue()
    },
    sendTimes() {
      this.send_times = this.sendTimes
    },
    // 表单验证
    verificationData() {
      // 组件激活时才会进入
      if (this.isActived) {
        if (this.verificationData.hasOwnProperty('intervalInvalid')) {
          this.intervalInvalid = this.verificationData.intervalInvalid
        }
        if (this.verificationData.hasOwnProperty('inter_message')) {
          this.inter_message = this.verificationData.inter_message
        }
      }
    }
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
  methods: {
    ...mapActions([
      'updataBaseMConfig',
      'verification',
    ]),
    updataValue() {
      // 更新营销配置基本量
      this.updataBaseMConfig({
        interval: this.send_times,
        send_times: this.send_times
      })
      this.verification({
        interval: this.send_times
      })
    }
  },
  props: [
    'sendTimes',
  ]
}
</script>
<style lang="scss">

</style>
