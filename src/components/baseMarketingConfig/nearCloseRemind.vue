<template>
  <div>
    <el-row :gutter='20' style="padding-left: 30px;">
      <el-col :span='3'><el-checkbox v-model="open">开启临近关闭催付</el-checkbox></el-col>
      <el-col :span='9'>订单关闭时间点前
        <el-select v-model='unpay_time' :disabled='open == false'>
          <el-option
          v-for="item in g_const.urgeTimePayRemaind"
          :label='item.name'
          :value='item.value'
          :key="item.value"
          >
          </el-option>
        </el-select> 仍未支付的买家
      </el-col>
      <el-col :span='5'><el-checkbox :disabled='open == false' v-model="multi_order_pay">排除当日多笔订单已经有支付的买家</el-checkbox></el-col>
      <el-col :span='7' v-show="jurisdictionData.allShow"><el-checkbox :disabled='open == false' v-model="unmod_remind_pay">不调整催付逻辑和内容</el-checkbox></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3"><p>推送逻辑/推送方式：</p></el-col>
      <el-col :span="2"><el-radio :disabled='open == false' v-model="send_type" label="sms">仅短信</el-radio></el-col>
      <el-col :span="2" v-show="jurisdictionData.allShow"><el-radio :disabled='open == false' v-model="send_type" label="sms_qianniu">仅千牛</el-radio></el-col>
      <el-col :span="3" v-show="jurisdictionData.allShow"><el-radio :disabled='open == false' v-model="send_type" label="all">短信+千牛同时</el-radio></el-col>
      <!--<el-col :span="14" v-show="utils.checkJurisdiction(userData.user_id)"><el-radio v-model="send_type" label="AI"><AI></AI>智慧管理</el-radio></el-col>-->
      <el-col :span="14" v-show="jurisdictionData.allShow"><el-radio :disabled='open == false' v-model="send_type" label="AI">先短信
        <el-select v-model="sms_time" :disabled = "send_type != 'AI'">
          <el-option
          v-for='item in test'
          :label='item.label'
          :value='item.value'
          :key="item.value"
          >
          </el-option>
        </el-select>后未付款再千牛
      </el-radio></el-col>
    </el-row>
    <div v-show="open == true">
      <msg-edit-temp
        :msgContent="nearCloseReminder"
        :allLine='allLine'
        msgType='messageTemplateN'
        >
      </msg-edit-temp>
    </div>

  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../misc/global.constant'
  import utils from '../../misc/utils'
  export default {
    data() {
      return {
        g_const: globalConstant,
        utils: utils,
        open: false,
        unpay_time: '60',
        multi_order_pay: false,
        unmod_remind_pay: false,
        send_content: '',
        send_type: 'sms',
        sms_time: '',
        test: [{
            label: '魔方墙AI思维引擎 智慧管理',
            value: ''
          },{
            label: '3分钟',
            value: '3'
          },{
            label: '5分钟',
            value: '5'
          },{
            label: '10分钟',
            value: '10'
          },{
            label: '15分钟',
            value: '15'
          },{
            label: '30分钟',
            value: '30'
          },{
            label: '45分钟',
            value: '45'
          },{
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
          near_open: this.open
        })
        this.multi_order_pay = this.open ? this.multi_order_pay : false
        if(this.open == false) {
          this.unpay_time = '60'
        }
      },
      unpay_time() {
        this.updataValue()
        this.verification({
          near_unpay_time: this.unpay_time
        })
      },
      multi_order_pay() {
        this.updataValue()
        this.verification({
          near_multi_order_pay: this.multi_order_pay
        })
      },
      send_type() {
        this.updataValue()
        this.verification({
          near_send_type: this.send_type
        })
      },
      verificationData() {
          if(this.verificationData.hasOwnProperty('near_send_content')) {
            this.send_content=this.verificationData.near_send_content
        }
      },
      unmod_remind_pay() {
        this.updataValue()
        this.verification({
          near_unmod_remind_pay: this.unmod_remind_pay
        })
      },
      nearCloseReminder() {
        if(this.nearCloseReminder.open == true) {
          this.open = true
        }else {
          this.open = false
        }
        //this.open = this.nearCloseReminder.open
        if(this.open == false) {
          this.unpay_time = '60'
        }else {
          this.unpay_time = this.nearCloseReminder.unpay_time.toString()
        }
       // this.unpay_time = this.nearCloseReminder.unpay_time.toString()
        this.multi_order_pay = this.nearCloseReminder.multi_order_pay
        this.unmod_remind_pay = this.nearCloseReminder.unmod_remind_pay
        this.send_content = this.nearCloseReminder.send_content
        this.send_type = this.nearCloseReminder.send_type
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
      // init() {
      //   this.open=this.nearCloseReminder.open
      //   this.unpay_time=this.nearCloseReminder.unpay_time
      //   this.multi_order_pay=this.nearCloseReminder.multi_order_pay
      //   this.unmod_remind_pay=this.sencodRemindPay.unmod_remind_pay
      //   this.send_content=this.nearCloseReminder.send_content
      //   this.send_type=this.nearCloseReminder.send_type
      // },
      updataValue() {
        // 更新营销配置基本量
        this.updataBaseMConfig({
          near_close_reminder: {
            open: this.open,
            unpay_time: this.unpay_time,
            multi_order_pay: this.multi_order_pay,
            unmod_remind_pay: this.unmod_remind_pay,
            send_content: this.send_content,
            send_type: this.send_type
          }
        })
      }
    },
    props: [
      'nearCloseReminder',
      'allLine'
    ]
}
</script>
<style lang="scss">

</style>
