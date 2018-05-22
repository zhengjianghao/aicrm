<template>
  <div>
    <el-row :gutter='20' style="padding-left: 30px;">
      <el-col :span='3'>
        <el-checkbox v-model="open">开启二次催付</el-checkbox>
      </el-col>
      <el-col :span='8'>首次催付后
        <el-select v-model='unpay_time' :disabled='open == false'>
          <el-option v-for="item in g_const.urgeTimePayRemaind" :label='item.name' :value='item.value' :key="item.value">
          </el-option>
        </el-select> 仍未支付的买家
      </el-col>
      <el-col :span='5'>
        <el-checkbox :disabled='open == false' v-model="multi_order_pay">排除当日多笔订单已经有支付的买家</el-checkbox>
      </el-col>
      <el-col :span='8' v-show="jurisdictionData.allShow">
        <el-checkbox :disabled='open == false' v-model="unmod_remind_pay">不调整催付逻辑和内容</el-checkbox>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">
        <p>推送逻辑/推送方式：</p>
      </el-col>
      <el-col :span="2">
        <el-radio :disabled='open == false' v-model="send_type" label="sms">仅短信</el-radio>
      </el-col>
      <el-col :span="2" v-show="jurisdictionData.allShow">
        <el-radio :disabled='open == false' v-model="send_type" label="sms_qianniu">仅千牛</el-radio>
      </el-col>
      <el-col :span="3" v-show="jurisdictionData.allShow">
        <el-radio :disabled='open == false' v-model="send_type" label="all">短信+千牛同时</el-radio>
      </el-col>
      <!--<el-col :span="14" v-show="jurisdictionData.allShow"><el-radio v-model="send_type" label="AI"><AI></AI>智慧管理</el-radio></el-col>-->
      <el-col :span="14" v-show="jurisdictionData.allShow">
        <el-radio :disabled='open == false' v-model="send_type" label="AI">先短信
          <el-select v-model="sms_time" :disabled="send_type != 'AI'">
            <el-option v-for='item in test' :label='item.label' :value='item.value' :key="item.value">
            </el-option>
          </el-select>后未付款再千牛
        </el-radio>
      </el-col>
    </el-row>
    <div v-show="open == true">
      <msg-edit-temp :msgContent="sencodRemindPay" msgType='messageTemplateP' :type="'PAYED'" :allLine='allLine'>
      </msg-edit-temp>
    </div>
  
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import utils from '../../misc/utils'
export default {
  data() {
    return {
      g_const: globalConstant,
      utils: utils,
      open: false,
      unpay_time: '1380',
      multi_order_pay: false,
      unmod_remind_pay: false,
      msg_content: '',
      send_type: 'sms',
      sms_time: '',
      test: [{
        label: '魔方墙AI思维引擎 智慧管理',
        value: ''
      }, {
        label: '3分钟',
        value: '3'
      }, {
        label: '5分钟',
        value: '5'
      }, {
        label: '10分钟',
        value: '10'
      }, {
        label: '15分钟',
        value: '15'
      }, {
        label: '30分钟',
        value: '30'
      }, {
        label: '45分钟',
        value: '45'
      }, {
        label: '60分钟',
        value: '60'
      }]
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'verificationData',
      'userData',
      'jurisdictionData'
    ])
  },
  watch: {
    open() {
      this.updataValue()
      this.verification({
        second_open: this.open
      })
      this.multi_order_pay = this.open ? this.multi_order_pay : false
      if (this.open == false) {
        this.unpay_time = '1380'
      }
    },
    unpay_time() {
      this.updataValue()
      this.verification({
        second_unpay_time: this.unpay_time
      })
    },
    multi_order_pay() {
      this.updataValue()
      this.verification({
        second_multi_order_pay: this.multi_order_pay
      })
    },
    send_type() {
      this.updataValue()
      this.verification({
        second_send_type: this.send_type
      })
    },
    unmod_remind_pay() {
      this.updataValue()
      this.verification({
        second_unmod_remind_pay: this.unmod_remind_pay
      })
    },
    msg_content() {
      this.updataValue()
    },
    verificationData() {
      if (this.verificationData.hasOwnProperty('second_msg_content')) {
        this.msg_content = this.verificationData.second_msg_content
      }
    },
    sencodRemindPay() {
      if (this.sencodRemindPay.open == true) {
        this.open = true
      } else {
        this.open = false
      }
      //this.open = this.sencodRemindPay.open
      if (this.open == false) {
        this.unpay_time = '1380'
      } else {
        this.unpay_time = this.sencodRemindPay.unpay_time.toString()
      }
      this.multi_order_pay = this.sencodRemindPay.multi_order_pay
      this.unmod_remind_pay = this.sencodRemindPay.unmod_remind_pay
      this.msg_content = this.sencodRemindPay.msg_content
      this.send_type = this.sencodRemindPay.send_type
    },
  },
  mounted() {
    // this.init()
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig',
      'verification'
    ]),
    init() {
      // this.open=this.sencodRemindPay.open
      // this.unpay_time=this.sencodRemindPay.unpay_time
      // this.multi_order_pay=this.sencodRemindPay.multi_order_pay
      // this.unmod_remind_pay=this.sencodRemindPay.unmod_remind_pay
      // this.msg_content=this.sencodRemindPay.msg_content
      // this.send_type=this.sencodRemindPay.send_type
    },
    updataValue() {
      // 更新营销配置基本量
      this.updataBaseMConfig({
        sencod_remind_pay: {
          open: this.open,
          unpay_time: this.unpay_time,
          multi_order_pay: this.multi_order_pay,
          unmod_remind_pay: this.unmod_remind_pay,
          msg_content: this.msg_content,
          send_type: this.send_type
        }
      })
    }
  },
  props: [
    'sencodRemindPay',
    'allLine'
  ]
}
</script>
<style lang="scss">

</style>
