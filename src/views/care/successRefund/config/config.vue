<template>
  <div class="sub_main_content">
    <base-marketing-config :service="service" :marketingType="g_const.marketTemplateType.SUCCESSREFUND_P4P_SYS" :updateSidebar="getCareSidebar">

      <template slot="baseConfig" scope="props">
        <div class="subTitle">
          条件配置
        </div>
        <div class="form-control form_control" style="padding-bottom: 0px">
          <el-form-item>
            <el-row :gutter='20'>
              <el-col :span='3'>
                <p>订单状态：</p>
              </el-col>
              <el-col :span='21'>退款成功</el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="deadline">
            <config-deadline title="营销有效时间" :deadlineLabel="props.conf.deadline_label" :deadline="props.conf.deadline">
            </config-deadline>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="20">
              <el-col :span="3">
                <p>触发节点：</p>
              </el-col>
              <el-col :span="13">退款成功提醒后
                <el-select v-model="props.conf.trigger_node">
                  <el-option v-for="item in g_const.urgeTime2" :label="item.name" :value="item.value" :key="item.value">
                  </el-option>
                </el-select>
                发送
              </el-col>
            </el-row>
          </el-form-item>
          <div class="subTitle title_align more" @click="showMoreBlock = !showMoreBlock">
            更多条件
            <span class="iconfont " :class="{'icon-shang': showMoreBlock, 'icon-xia': !showMoreBlock}"></span>
            <span class="history_remarks" v-show="showMoreBlock">注释：{{g_const.orderRemarks[1].label}}</span>
          </div>
          <div class="form-control form_control more-content" v-show="showMoreBlock">
            <el-form-item>
              <config-order-from :tradeFrom="props.conf.trade_from">
              </config-order-from>
            </el-form-item>
            <el-form-item prop="interval">
              <config-send-times :sendTimes="props.conf.send_times">
              </config-send-times>
            </el-form-item>
            <el-form-item prop="activity_type">
              <config-order-types :checkedOrderType="props.conf.activity_type">
              </config-order-types>
            </el-form-item>
            <el-form-item props="items_range">
              <config-items-range :itemsValue="props.conf.items_range" :itemsLabel="props.conf.items_range_label">
              </config-items-range>
            </el-form-item>

            <el-form-item>
              <config-order-payment :paymentLabel="props.conf.payment_label" :payment="props.conf.payment">
              </config-order-payment>
            </el-form-item>
            <el-form-item>
              <config-order-time-intime :orderTime="props.conf.created" :orderTimeLabel="props.conf.created_label">
              </config-order-time-intime>
            </el-form-item>
            <el-form-item>
              <config-target-member :groupLabel="props.conf.group_label" :curGroupIds="props.conf.curGroupIds">
              </config-target-member>
            </el-form-item>
            <el-form-item>
              <config-buyer-message :buyerMessage="props.conf.buyer_message">
              </config-buyer-message>
            </el-form-item>
            <el-form-item>
              <config-flags :checkedFlags="props.conf.seller_flag">
              </config-flags>
            </el-form-item>
            <select-city-code :curCityTextArray="props.conf.area_text_array" :marketDate="true">
            </select-city-code>
          </div>
        </div>
        <div class="subTitle">
          结束提醒
        </div>
        <div class="form-control">
          <el-form-item>
            <config-over-remind :reminderLabel="props.conf.reminder_label" :reminder="props.conf.reminder">
            </config-over-remind>
          </el-form-item>
        </div>
        <div class="subTitle">
          推送逻辑
        </div>
        <div class="form-control">
          <el-form-item style="padding-top:20px">
            <config-push-type :sendType="props.conf.send_type" :isAI='true'>
            </config-push-type>
            <el-row :gutter='20' v-show="jurisdictionData.allShow">
              <el-col :span="3"></el-col>
              <el-col :span="21">
                <span style="color: #ccc;">注释：日订单超过200单的不建议“仅千牛”及“短信千牛同步”，千牛有限制，超过限制会被淘宝封子账号</span>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <config-sendtime-t :pushTimeLabel="props.conf.send_time_label" :pushTime="props.conf.send_time" :behindTime="props.conf.send_time_behind">
            </config-sendtime-t>
          </el-form-item>
        </div>
        <div class="subTitle">
          买家营销
        </div>
        <msg-edit-temp msgType='messageTemplate'  :msgContent="props.conf.message" :allLine='jurisdictionData.allShow ? allLine : allLine2'>
        </msg-edit-temp>
        <!--<div class="subTitle">
                  客服提醒
                </div>
                <div>
                  <el-form-item>

                    <msg-edit-temp-t
                    :sendTypeUser='props.conf.send_type_user'
                    :msgContent='props.conf.send_message_user'
                    :sendMobile='props.conf.send_mobile_user'
                    :allLine='jurisdictionData.allShow ? allLine : allLine2'
                    ></msg-edit-temp-t>
                  </el-form-item>
                </div>-->
      </template>
    </base-marketing-config>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../../../misc/global.constant'
import utils from '../../../../misc/utils'
import configInterval from '../../../../components/baseMarketingConfig/interval'
import service from '../successRefund.service'
export default {
  data() {
    return {
      showMoreBlock: false,
      g_const: globalConstant,
      service: service,
      utils: utils,
      allLine: [
        '退款商品短名',
        '退款商品短链',
        '店铺短链',
        '退款金额',
        '买家ID',
        '收件人全名',
        '收件人地址',
        '收件人电话',
        '订单编号',
        'CRM内会员级别'
      ],
      allLine2: [
        '退款商品短名',
        '退款商品短链',
        '店铺短链',
        '退款金额',
        '买家ID',
        '收件人全名',
        '收件人地址',
        '收件人电话',
        '订单编号',
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
      'getCareSidebar'
    ])
  },
  components: {
    configInterval
  }
}
</script>
<style lang="scss" scoped>

</style>
