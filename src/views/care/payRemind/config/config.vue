<template>
  <div class="sub_main_content">
    <base-marketing-config
    :service="service"
    :marketingType="g_const.marketTemplateType.CREATEDREMIND_P4P_SYS"
    :updateSidebar="getCareSidebar">

      <template
      slot="baseConfig"
      scope="props">
            <div class="subTitle">
              条件配置
            </div>
            <div class="form-control form_control" style="padding-bottom: 0px">
                <el-form-item  prop="status">
                  <el-row :gutter="20">
                    <el-col :span="3"><p>订单状态：</p></el-col>
                    <el-col :span="21">
                      <span>拍下未付款</span>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item  prop="deadline">
                  <config-deadline
                    title="营销有效时间"
                    :deadlineLabel="props.conf.deadline_label"
                    :deadline="props.conf.deadline"
                    >
                  </config-deadline>
                </el-form-item>
                <el-form-item>
                  <el-row :gutter="20">
                      <el-col :span="3"><p>触发节点：</p></el-col>
                      <el-col :span="5">
                        <el-radio v-model="props.conf.trigger_node_label" label=""><AI></AI> 智慧管理</el-radio>
                        <el-tooltip popper-class='tool_notes' content='魔方墙AI引擎基于最近时间的买家付款的行为分析，为不同时间段下单的每个买家匹配独立营销间隔时间，并动态跟随店铺发展变化' placement="top-start">
                          <i class="iconfont icon-help1 toolGanTanHao"></i>
                        </el-tooltip>
                      </el-col>
                      <el-col :span="13"><el-radio v-model="props.conf.trigger_node_label" label='custom'>买家下单后</el-radio>
                        <el-select
                        v-model="props.conf.trigger_node"
                        class="el-input-sm-sm"
                        :disabled="props.conf.trigger_node_label != 'custom'">
                          <el-option
                          v-for="item in g_const.urgeTimePayRemaind"
                          :label="item.name"
                          :value="item.value"
                          :key="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-col>
                  </el-row>
                  <el-row :gutter='20' style="display:none;">
                    <el-col :span="3"></el-col>
                    <el-col :span="21"><span style="color: #ccc;">魔方墙AI引擎基于上月买家付款的行为分析获得，并按照每天8个时间段动态匹配，每月更新动态更随店铺发展</span></el-col>
                  </el-row>
                </el-form-item>
                <el-form-item>
                  <config-sendtime
                    changeName='AI'
                    :pushTimeLabel="props.conf.send_time_label"
                    :pushTime="props.conf.send_time"
                    :behindTime="props.conf.send_time_behind"
                  >
                  </config-sendtime>
                </el-form-item>
                <el-form-item>
                  <el-row :gutter="20">
                      <el-col :span="3"><p>排除：</p></el-col>
                      <el-col :span="5"><el-checkbox v-model="props.conf.exclude_check[0]">排除当日内多笔订单中有支付的买家</el-checkbox></el-col>
                      <el-col :span="16"><el-checkbox v-model="props.conf.exclude_check[1]">排除当日内有退款的买家</el-checkbox></el-col>
                  </el-row>
                </el-form-item>
                <div class="subTitle title_align more" @click="showMoreBlock = !showMoreBlock">
                  更多条件
                  <span class="iconfont " :class="{'icon-shang': showMoreBlock, 'icon-xia': !showMoreBlock}"></span>
                  <span class="history_remarks" v-show="showMoreBlock">注释：{{g_const.orderRemarks[1].label}}</span>
                </div>
                <div class="form-control form_control more-content" v-show="showMoreBlock">
                  <el-form-item>
                    <config-order-from
                      :tradeFrom="props.conf.trade_from"
                    >
                    </config-order-from>
                  </el-form-item>
                  <el-form-item prop="interval">
                    <config-send-times
                    :sendTimes="props.conf.send_times"
                    >
                    </config-send-times>
                  </el-form-item>
                  <el-form-item prop="activity_type">
                    <config-order-types
                    :checkedOrderType="props.conf.activity_type"
                    >
                    </config-order-types>
                  </el-form-item>
                  <el-form-item  props="items_range">
                    <config-items-range
                    :itemsValue="props.conf.items_range"
                    :itemsLabel="props.conf.items_range_label"
                    >
                    </config-items-range>
                  </el-form-item>
                  <el-form-item>
                    <config-order-payment
                    :paymentLabel="props.conf.payment_label"
                    :payment="props.conf.payment"
                    >
                    </config-order-payment>
                  </el-form-item>
                  <el-form-item>
                    <config-order-time-intime
                      :orderTime="props.conf.created"
                      :orderTimeLabel="props.conf.created_label"
                    >
                    </config-order-time-intime>
                  </el-form-item>
                  <el-form-item>
                    <config-target-member
                    :groupLabel="props.conf.group_label"
                    :curGroupIds="props.conf.curGroupIds"
                    >
                    </config-target-member>
                  </el-form-item>
                  <el-form-item>
                    <config-buyer-message
                    :buyerMessage="props.conf.buyer_message"
                    >
                    </config-buyer-message>
                  </el-form-item>
                  <el-form-item>
                      <config-flags
                        :checkedFlags="props.conf.seller_flag"
                        >
                      </config-flags>
                  </el-form-item>
                  <!--<select-city-code :curCityTextArray="props.conf.area_text_array" :marketDate="true">
                  </select-city-code>-->
                </div>
            </div>
            <div class="subTitle">
              结束提醒
            </div>
            <div class="form-control">
              <el-form-item>
                  <config-over-remind
                    :reminderLabel="props.conf.reminder_label"
                    :reminder="props.conf.reminder"
                    reminderName="开启结束前提醒"
                  >
                  </config-over-remind>
              </el-form-item>
            </div>
            <!--<div class="subTitle">
              推送逻辑
            </div>-->
            <!--<div class="form-control">
              <el-form-item style="padding-top:20px">
                <config-push-type
                :sendType="props.conf.send_type"
                >
                </config-push-type>
                <el-row :gutter='20'>
                  <el-col :span="3"></el-col>
                  <el-col :span="21"><span style="color: #ccc;">注释：日订单超过200单的不建议“仅千牛”及“短信千牛同步”，千牛有限制，超过限制会被淘宝封子账号</span></el-col>
                </el-row>
              </el-form-item>
            </div>-->
            <div class="subTitle">
              一次催付
            </div>
            <div class="form-control">
              <el-form-item>
                <config-push-type
                :sendType="props.conf.send_type"
                :isPay='true'
                :tid="'推送逻辑/'"
                >
                </config-push-type>
                <el-row :gutter='20' v-show="jurisdictionData.allShow">
                  <el-col :span="3"></el-col>
                  <el-col :span="21"><span style="color: #ccc;">注释：日订单超过200单的不建议“仅千牛”及“短信千牛同步”，千牛有限制，超过限制会被淘宝封子账号</span></el-col>
                </el-row>
              </el-form-item>
              <msg-edit-temp
                  :allLine='jurisdictionData.allShow ? allLine : allLine2'
                  msgType='messageTemplate'
                  :msgContent="props.conf.message">
              </msg-edit-temp>
            </div>

            <div class="subTitle">
              二次催付
            </div>
            <div class="form-control">
              <el-form-item>
                <config-second-pay-remind
                  :allLine='jurisdictionData.allShow ? allLine : allLine2'
                  :sencodRemindPay='props.conf.sencod_remind_pay'>
                </config-second-pay-remind>
              </el-form-item>
            </div>
            <div class="subTitle">
              临近关闭催付
            </div>
            <div class="form-control">
              <el-form-item>
                <config-near-close-remind
                  :allLine='jurisdictionData.allShow ? allLine : allLine2'
                  :nearCloseReminder='props.conf.near_close_reminder'>
                </config-near-close-remind>
              </el-form-item>
            </div>
        </template>
    </base-marketing-config>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../../../misc/global.constant'
  import utils from '../../../../misc/utils'
  import configInterval from '../../../../components/baseMarketingConfig/interval'
  import service from '../payRemind.service'
  export default {
    data() {
      return {
        showMoreBlock: false,
        g_const: globalConstant,
        service: service,
        utils: utils,
        allLine: [
          '店铺短链',
          '催付商品短名',
          '催付商品短链',
          '待付款金额',
          '待付款-付款短链',
          '买家ID',
          '收件人全名',
          '收件人地址',
          '订单编号',
          '会员等级',
          '已付款金额',
          '优惠劵领取短链',
          '店铺会员卡领取短链',
        ],
        allLine2: [
          '店铺短链',
          '催付商品短名',
          '催付商品短链',
          '待付款金额',
          '待付款-付款短链',
          '买家ID',
          '收件人全名',
          '收件人地址',
          '订单编号',
          '已付款金额',
        ]
      }
    },
    computed: {
      ...mapGetters([
        'userData',
        'jurisdictionData'
        ])
    },
    methods: {
      ...mapActions([
        'getCareSidebar',
      ]),
      isJurisdiction() {
        if(this.jurisdictionData == true) {
          return true
        }else {
          return false
        }
      }
    },
    components: {
      configInterval
    }
}
</script>
<style lang="scss" scoped>
</style>
