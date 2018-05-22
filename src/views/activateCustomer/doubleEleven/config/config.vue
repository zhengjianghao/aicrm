<template>
  <div class="sub_main_content">
    <base-marketing-config :checkBuyAll="checkBuyAll" :service="service" :marketingType="g_const.marketTemplateType.DOUBLEELEVEN_P4P_SYS" :updateSidebar="getActivateCustomerSidebar">
      <template slot="baseConfig" scope="props">
        <setting-list ref="settingcheck" :settingListData="props.conf.items_data">
        </setting-list>
        <div class="subTitle">
          人群配置
        </div>
        <div class="form-control form_control" style="padding-bottom: 0px">
          <el-form-item>
            <config-target-member :groupLabel="props.conf.group_label" :curGroupIds="props.conf.curGroupIds" :isItemLabel="props.conf.is_item_label"  :isSelectGoods="getIsSelectGoods">
            </config-target-member>
          </el-form-item>
          <el-form-item>
            <config-member-change :memberChange='props.conf.member_change' :memberChangeLabel='props.conf.member_change_label'>
            </config-member-change>
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
          推送配置
        </div>
        <div class="form-control">
          <config-sendtime-N :sendDate='props.conf.send_date' :beforeWord="'双11开始日期提前'" :sendTimeLabel='props.conf.send_time_label' :sendTime='props.conf.send_time' :excludeTimeLabel='props.conf.exclude_time_label' :elcludeTime="props.conf.exclude_time" :sendWord="''" :aheadTimeLabel="props.conf.ahead_time_label">
          </config-sendtime-N>
          <config-push-type :sendType="props.conf.send_type">
          </config-push-type>
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
import settingList from './settingList'
import globalConstant from '../../../../misc/global.constant'
import service from '../doubleEleven.service'
export default {
  data() {
    return {
      showMoreBlock: false,
      g_const: globalConstant,
      service: service,
      allLine: [
        '店铺短链',
        '买家ID',
        '收件人全名',
        '收件人地址',
        'AI推荐双11商品短名',
        'AI推荐双11商品短链',
        'AI推荐双11商品价格',
        'AI推荐双11商品折扣',
        'AI推荐双11商品开始时间',
        'CRM内会员级别'
      ],
      allLine2: [
        '店铺短链',
        '买家ID',
        '收件人全名',
        '收件人地址',
        'AI推荐双11商品短名',
        'AI推荐双11商品短链',
        'AI推荐双11商品价格',
        'AI推荐双11商品开始时间',
      ]
    }
  },
  computed: {
    ...mapGetters([
      'baseMConfigData',
      'jurisdictionData'
    ]),
    getIsSelectGoods() {
      return this.baseMConfigData.items_data ? this.baseMConfigData.items_data.length > 0 : false
    }
  },
  methods: {
    ...mapActions([
      'getActivateCustomerSidebar'
    ]),
    checkBuyAll() {
      return this.$refs.settingcheck.checkBuyAll()
    },
  },
  components: {
    settingList
  }
}
</script>
<style lang="scss">
</style>
