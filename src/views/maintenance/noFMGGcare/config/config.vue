<template>
  <div class="sub_main_content">
    <base-marketing-config :service="service" :checkBuyAll="checkBuyAll" :marketingType="g_const.marketTemplateType.NOFMGGCARE_P4P_SYS" :updateSidebar="getMaintenanceSidebar">
      <template slot="baseConfig" scope="props">
        <setting-list ref="settingcheck"  :settingListData="props.conf.buying_cycel_items">
        </setting-list>
        <div class="subTitle">
          条件配置
        </div>
        <div class="form-control form_control" style="padding-bottom: 0px">
          <el-form-item prop="deadline">
            <config-deadline title="营销有效时间" :deadlineLabel="props.conf.deadline_label" :deadline="props.conf.deadline">
            </config-deadline>
          </el-form-item>
          <config-sendtime-N :sendTimeLabel='props.conf.send_time_label' :sendTime='props.conf.send_time' :excludeTimeLabel='props.conf.exclude_time_label' :elcludeTime="props.conf.exclude_time" :sendTimeDay='props.conf.send_time_day' :sendWord="'最近一次签收后'" :aheadTimeLabel="props.conf.ahead_time_label">
          </config-sendtime-N>
          <el-form-item>
            <config-target-member :groupLabel="props.conf.group_label" :noNum='true' :curGroupIds="props.conf.curGroupIds" :isFirstLabel="props.conf.is_first_label" :isSelectGoods="baseMConfigData.buying_cycel_items ? baseMConfigData.buying_cycel_items.length > 0 : false">
            </config-target-member>
          </el-form-item>
          <div class="subTitle title_align more" @click="showMoreBlock = !showMoreBlock">
            更多条件
            <span class="iconfont " :class="{'icon-shang': showMoreBlock, 'icon-xia': !showMoreBlock}"></span>
            <span class="history_remarks" v-show="showMoreBlock">注释：{{g_const.orderRemarks[0].label}}</span>
          </div>
          <transition name="slide-fade">
            <div class="form-control form_control more-content" v-show="showMoreBlock">
              <el-form-item prop="created">
                <config-order-time :orderTime="props.conf.created" :orderTimeLabel="props.conf.created_label">
                </config-order-time>
              </el-form-item>
              <el-form-item prop="trade_from">
                <config-order-from :tradeFrom="props.conf.trade_from">
                </config-order-from>
              </el-form-item>
              <el-form-item prop="activity_type">
                <config-order-types :checkedOrderType="props.conf.activity_type">
                </config-order-types>
              </el-form-item>
              <el-form-item>
                <config-order-payment :paymentLabel="props.conf.payment_label" :payment="props.conf.payment">
                </config-order-payment>
              </el-form-item>
              <el-form-item prop="buys">
                <config-goods-num :buys="props.conf.buys" :buysLabel="props.conf.buys_label">
                </config-goods-num>
              </el-form-item>
              <el-form-item props="items_range">
                <config-items-range :itemsValue="props.conf.items_range" :itemsLabel="props.conf.items_range_label">
                </config-items-range>
              </el-form-item>
              <el-form-item prop="pay_time">
                <config-pay-time :payTime="props.conf.pay_time" :payTimeLabel="props.conf.pay_time_label">
                </config-pay-time>
              </el-form-item>
              <el-form-item prop="consign_time">
                <config-consign-time :consignTime="props.conf.consign_time" :consignTimeLabel="props.conf.consign_time_label">
                </config-consign-time>
              </el-form-item>
              <el-form-item prop="sign_time">
                <config-sign-time :signTime="props.conf.sign_time" :signTimeLabel="props.conf.sign_time_label">
                </config-sign-time>
              </el-form-item>
              <el-form-item prop="end_time">
                <config-confirm-time :confirmTime="props.conf.end_time" :confirmTimeLabel="props.conf.end_time_label">
                </config-confirm-time>
              </el-form-item>
              <el-form-item prop="buyer_message">
                <config-buyer-message :buyerMessage="props.conf.buyer_message">
                </config-buyer-message>
              </el-form-item>
              <config-flags :checkedFlags="props.conf.seller_flag">
              </config-flags>
              <select-city-code :curCityTextArray="props.conf.area_text_array" :marketDate="true">
              </select-city-code>
            </div>
          </transition>
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
        </div>
        <div class="subTitle">
          买家营销
        </div>
        <msg-edit-temp msgType='messageTemplate'  :msgContent="props.conf.message" :allLine='jurisdictionData.allShow ? allLine : allLine2'>
        </msg-edit-temp>
      </template>
    </base-marketing-config>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../../../misc/global.constant'
import settingList from './settingList'
import service from '../noFMGGcare.service'
export default {
  data() {
    return {
      showMoreBlock: false,
      g_const: globalConstant,
      service: service,
      allLine: [
        '店铺短链',
        '买家购买非快消品宝贝关怀语',
        '买家购买非快消品短名',
        '买家购买非快消品短链',
        // '快消品购买时间',
        // '快消品价格',
        '买家ID',
        '收件人全名',
        '收件人地址',
        'CRM内会员级别',
      ],
      allLine2: [
        '店铺短链',
        '买家购买非快消品宝贝关怀语',
        '买家购买非快消品短名',
        '买家购买非快消品短链',
        // '快消品购买时间',
        // '快消品价格',
        '买家ID',
        '收件人全名',
        '收件人地址',
      ]
    }
  },
  computed: {
    ...mapGetters([
      'baseMConfigData',
      'jurisdictionData'
    ]),
    gbConst() {
      return globalConstant.openModalCodes
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    ...mapActions([
      'getMaintenanceSidebar'
    ]),
    checkBuyAll() {
      return this.$refs.settingcheck.checkBuyAll()
    }
  },
  components: {
    settingList
  }
}
</script>
<style lang="scss" scoped>
</style>
