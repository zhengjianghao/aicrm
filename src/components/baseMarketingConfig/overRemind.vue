<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <p>
          <el-checkbox v-model="reminder_label">{{ reminderName ? reminderName : '开启提醒' }}</el-checkbox>
          <el-tooltip :content='tooltipContent' popper-class='tool_notes' placement="top-start" effect="dark">
            <i class="iconfont icon-help1 toolGanTanHao"></i>
          </el-tooltip>
        </p>
      </el-col>
      <el-col :span="5">
        活动结束前
        <el-select v-model="reminder_time" :disabled="!reminder_label" class="el-input-sm-sm">
          <el-option v-for="item in g_const.marketingInterval" :label="item.name" :value="item.value" :key="item.value">
          </el-option>
        </el-select>
        提醒
        
      </el-col>
      <el-col :span="16">
        提醒手机号： {{ mobile }}
        <a @click="goSettingCenter()" class="link">修改提醒手机号</a>
  
      </el-col>
      <!--<el-col :span="11" v-show="hideQianniu ? false : true">
            千牛：
              <el-select v-model="reminder_qianniu" :disabled="!reminder_label" class="el-input-sm-sm">
              <el-option
                  v-for="item in g_const.qianniuService"
                  :label="item.name"
                  :value="item.value">
              </el-option>
              </el-select>
  
        </el-col>-->
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import g_const from '../../misc/global.constant'
export default {
  data() {
    return {
      reminder_label: '',
      reminder_time: '',
      reminder_qianniu: '',
      g_const: g_const,
      tooltipContent: '设置了自定义执行时间才有效'
    }
  },
  watch: {
    reminder() {
      this.reminder_time = this.reminder.time
    },
    reminderLabel() {
      this.reminder_label = this.reminderLabel
    },
    reminder_time() {
      this.updataValue()
    },
    reminder_label() {
      this.updataValue()
    }
  },
  computed: {
    ...mapGetters([
      'settingContact'
    ]),
    mobile() {
      // 提醒手机号
      var r_mobile = this.settingContact.REMIND_MOBILE ? this.settingContact.REMIND_MOBILE : this.settingContact.ADMIN_MOBILE
      r_mobile = r_mobile ? r_mobile : ''
      return r_mobile
    }
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig',
      'updateOpenModal'
    ]),
    updataValue() {
      // 更新营销配置基本量
      this.updataBaseMConfig({
        reminder: {
          time: this.reminder_time
        },
        reminder_label: this.reminder_label
      })
    },
    // 提醒手机号修改
    goSettingCenter() {
      this.updateOpenModal({
        name: this.g_const.openModalCodes.settingsCenter,
        param: {
          state: 'close'
        }
      })
    }
  },
  props: [
    'reminderLabel',
    'reminder',
    'hideQianniu',
    'reminderName'
  ]
}
</script>
<style lang="scss">

</style>
