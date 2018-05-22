<template>
  <div class="sub_main_content">
    <base-marketing-config :service="service" :checkBuyAll="checkBuyAll" :marketingType="g_const.marketTemplateType.BADWEATHER_P4P_SYS" :updateSidebar="getMaintenanceSidebar">
      <template slot="baseConfig" scope="props">
        <!-- 延迟渲染 提升页面跳转速度 -->
        <lazy-render time="1500" loadingTime="1500">
          <setting-list ref="settingcheck" :settingListAiData="g_const.bad_weather_list" :settingListCustomData="(!props.conf.bad_weather_custom || !props.conf.bad_weather_custom[0] || props.conf.bad_weather_custom[0].name === '') ? g_const.bad_weather_list : props.conf.bad_weather_custom " :badWeatherSetting="props.conf.bad_weather_set">
          </setting-list>
        </lazy-render>
        <div class="subTitle">
          条件配置
        </div>
        <lazy-render>
          <div class="form-control form_control" style="padding-bottom: 0px">
            <config-active-title :activeRemark='props.conf.active_remark'></config-active-title>
            <el-form-item prop="deadline">
              <config-deadline title="营销有效时间" :deadlineLabel="props.conf.deadline_label" :deadline="props.conf.deadline">
              </config-deadline>
            </el-form-item>
            <el-form-item>
              <config-sendtime-N :sendTimeLabel='props.conf.send_time_label' :excludeTimeLabel='props.conf.exclude_time_label' :elcludeTime="props.conf.exclude_time" isSendNow="true">
              </config-sendtime-N>
            </el-form-item>
            <el-form-item>
              <config-target-member :groupLabel="props.conf.group_label" :curGroupIds="props.conf.curGroupIds">
              </config-target-member>
            </el-form-item>
            <div class="subTitle title_align more" @click="showMoreBlock = !showMoreBlock">
              更多条件
              <span class="iconfont " :class="{'icon-shang': showMoreBlock, 'icon-xia': !showMoreBlock}"></span>
              <span class="history_remarks" v-show="showMoreBlock">注释：{{g_const.orderRemarks[0].label}}</span>
            </div>
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
              <!--<select-city-code :curCityTextArray="props.conf.area_text_array" :marketDate="true">
              </select-city-code>-->
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
          </div>
          <div class="subTitle">
            买家营销
          </div>
          <msg-edit-temp msgType='messageTemplate' :msgContent="props.conf.message" :allLine='jurisdictionData.allShow ? allLine : allLine2'>
          </msg-edit-temp>
        </lazy-render>
      </template>
    </base-marketing-config>

  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import globalConstant from '../../../../misc/global.constant'
import configInterval from '../../../../components/baseMarketingConfig/interval'
import service from '../badWeather.service'
import settingList from './settingList'
export default {
  data() {
    return {
      showMoreBlock: false,
      g_const: globalConstant,
      service: service,
      allLine: [
        '店铺短链',
        '恶劣天气名称',
        '恶劣天气级别',
        '恶劣天气时间',
        '恶劣天气关怀语',
        '买家ID',
        '收件人全名',
        '收件人地址',
        'CRM内会员级别'
      ],
      allLine2: [
        '店铺短链',
        '恶劣天气名称',
        '恶劣天气级别',
        '恶劣天气时间',
        '恶劣天气关怀语',
        '买家ID',
        '收件人全名',
        '收件人地址',
      ]
    }
  },
  computed: {
    ...mapGetters([
      'jurisdictionData'
    ]),
    gbConst() {
      return globalConstant.openModalCodes
    }
  },
  methods: {
    ...mapActions([
      'getMaintenanceSidebar',
      'updataBaseMConfig',
    ]),
    updateTime(obj) {
      this.exclued_time_start = obj.startTime
      this.exclued_time_end = obj.endTime
    },
    checkBuyAll() {
      return this.$refs.settingcheck.checkHolidayAll()
    }
  },
  components: {
    configInterval,
    settingList
  }
}
</script>
<style lang="scss" scoped>
</style>
