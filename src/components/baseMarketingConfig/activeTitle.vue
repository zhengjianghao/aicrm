<template>
  <div>
    <el-form-item prop='active_remark'>
      <el-row :gutter="20">
        <el-col :span="3">
          <p>活动备注：</p>
        </el-col>
        <el-col :span="10">
          <el-tooltip class="item" effect="dark" :manual="true" :value="isSubState && active_remark_invalid === true ? true : false" :content="active_remark_message" placement="top">
            <el-input style="width: 100%" v-model="active_remark" placeholder="请输入备注内容"></el-input>
          </el-tooltip>
        </el-col>
        <el-col :span="11"></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span='3'>
        </el-col>
        <el-col :span="11">
          <span class="info">可为空，最多30个字，用于标注活动目的，宝贝页不显示</span>
        </el-col>
      </el-row>
    </el-form-item>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      active_remark: '',
      active_remark_invalid: false,
      active_remark_message: '',
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
    active_remark() {
      this.updataValue()
    },
    activeRemark() {
      this.active_remark = this.activeRemark
    },
    verificationData() {
      // 组件激活时才会进入
      if (this.isActived) {
        if (this.verificationData.hasOwnProperty('active_remark_invalid')) {
          this.active_remark_invalid = this.verificationData.active_remark_invalid
        }
        if (this.verificationData.hasOwnProperty('active_remark_message')) {
          this.active_remark_message = this.verificationData.active_remark_message
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
        active_remark: this.active_remark,
      })
      this.verification({
        active_remark: this.active_remark
      })
    }
  },
  props: [
    'activeRemark',
  ]
}
</script>
<style lang="scss">

</style>
