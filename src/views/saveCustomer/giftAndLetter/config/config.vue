<template>
  <div class="sub_main_content">
    <base-marketing-config
    ref='reasonconfig'
    :service="service"
    :marketingType="g_const.marketTemplateType.GIFTANDLETTER_P4P_SYS"
    :updateSidebar="getSaveCustomerSidebar">

      <template
      slot="baseConfig"
      scope="props">
          <div class="subTitle">
            条件配置
          </div>
          <div class="form-control form_control">
            <el-form-item>
              <el-row :gutter="20">
                  <el-col :span="3"><p>触发因素：</p></el-col>
                  <el-col :span="21">
                  <el-checkbox-group v-model="props.conf.trigger_way">
                    <el-row :gutter='20'>
                      <el-col :span='reason.name.length <=6 ? 3 : 4' v-for="(reason, index) in g_const.reasons" v-if="index < 8"  :key="reason.value">
                          <el-checkbox :label="reason.value">
                              {{reason.name}}
                          </el-checkbox>
                      </el-col>
                    </el-row>
                  </el-checkbox-group>
                  </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="3"></el-col>
                  <el-col :span="21">
                  <el-checkbox-group v-model="props.conf.trigger_way">
                    <el-row :gutter='20'>
                      <el-col :span='reason.name.length <=6 ? 3 : 4' v-for="(reason, index) in g_const.reasons" v-if="index >= 8" :key="reason.value">
                          <el-checkbox :label="reason.value">
                              {{reason.name}}
                          </el-checkbox>
                      </el-col>
                    </el-row>
                  </el-checkbox-group>
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
          </div>
          <div class="subTitle">
            人群配置
          </div>
          <div class="form-control form_control" style="padding-bottom: 0px">
              <el-form-item>
                <config-target-member
                :groupLabel="props.conf.group_label"
                :curGroupIds="props.conf.curGroupIds"
                :isSelectGoods="baseMConfigData.items_label"
                :guestPrice='props.conf.guest_price'
                >
                </config-target-member>
              </el-form-item>
              <el-form-item>
              <config-member-change
                :memberChange='props.conf.member_change'
                :memberChangeLabel='props.conf.member_change_label'>
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
                        <config-order-time
                        :orderTime="props.conf.created"
                        :orderTimeLabel="props.conf.created_label"
                        >
                        </config-order-time>
                    </el-form-item>
                    <el-form-item prop="trade_from">
                    <config-order-from
                        :tradeFrom="props.conf.trade_from"
                        >
                        </config-order-from>
                    </el-form-item>
                    <el-form-item prop="activity_type">
                        <config-order-types
                        :checkedOrderType="props.conf.activity_type"
                        >
                        </config-order-types>
                    </el-form-item>
                    <el-form-item>
                        <config-order-payment
                        :paymentLabel="props.conf.payment_label"
                        :payment="props.conf.payment"
                        >
                        </config-order-payment>
                    </el-form-item>
                    <el-form-item prop="buys">
                        <config-goods-num
                        :buys="props.conf.buys"
                        :buysLabel="props.conf.buys_label"
                        >
                        </config-goods-num>
                    </el-form-item>
                    <el-form-item props="items_range">
                        <config-items-range
                        :itemsValue="props.conf.items_range"
                        :itemsLabel="props.conf.items_range_label"
                        >
                        </config-items-range>
                    </el-form-item>
                    <el-form-item prop="pay_time">
                        <config-pay-time
                        :payTime="props.conf.pay_time"
                        :payTimeLabel="props.conf.pay_time_label"
                        >
                        </config-pay-time>
                    </el-form-item>
                    <el-form-item prop="consign_time">
                        <config-consign-time
                        :consignTime="props.conf.consign_time"
                        :consignTimeLabel="props.conf.consign_time_label"
                        >
                        </config-consign-time>
                    </el-form-item>
                    <el-form-item  prop="sign_time">
                        <config-sign-time
                        :signTime="props.conf.sign_time"
                        :signTimeLabel="props.conf.sign_time_label"
                        >
                        </config-sign-time>
                    </el-form-item>
                    <el-form-item prop="end_time">
                        <config-confirm-time
                        :confirmTime="props.conf.end_time"
                        :confirmTimeLabel="props.conf.end_time_label"
                        >
                        </config-confirm-time>
                    </el-form-item>
                    <el-form-item prop="buyer_message">
                        <config-buyer-message
                        :buyerMessage="props.conf.buyer_message"
                        >
                        </config-buyer-message>
                    </el-form-item>
                    <config-flags
                    :checkedFlags="props.conf.seller_flag"
                    >
                    </config-flags>
                    <!--<select-city-code :curCityTextArray="props.conf.area_text_array" :marketDate="true">
                    </select-city-code>-->
                </div>
              </transition>
          </div>
          <div class="subTitle">
            结束提醒
          </div>
          <div class="form-control">
            <el-form-item>
              <config-over-remind
                :reminderLabel="props.conf.reminder_label"
                :reminder="props.conf.reminder"
              >
              </config-over-remind>
            </el-form-item>
          </div>
          <div class="subTitle">
            客服提醒
          </div>
          <div class="form-control">
            <el-form-item>
              <msg-edit-temp-t
              :isRemind="'noRemind'"
              :sendTypeUser='props.conf.send_type_user'
              :msgContent='props.conf.send_message_user'
              :sendMobile='props.conf.send_mobile_user'
              :allLine='jurisdictionData.allShow ? allLine : allLine2'
              ></msg-edit-temp-t>
            </el-form-item>
          </div>
        </template>
    </base-marketing-config>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../../../misc/global.constant'
  import configInterval from '../../../../components/baseMarketingConfig/interval'
  import service from '../giftAndLetter.service'
  export default {
    data() {
      return {
        showMoreBlock: false,
        g_const: globalConstant,
        service: service,
        allLine: [
          '店铺短链',
          '流失因素',
          '买家ID',
          '收件人全名',
          '收件人地址',
          '收件人电话',
          'CRM内会员级别'
        ],
        allLine2: [
          '店铺短链',
          '流失因素',
          '买家ID',
          '收件人全名',
          '收件人地址',
          '收件人电话',
        ],
      }
    },
    computed: {
      ...mapGetters([
        'goodsData',
        'baseMConfigData',
        'jurisdictionData'
        ]),
      gbConst() {
        return globalConstant.openModalCodes
      }
    },
    methods: {
      ...mapActions([
        'getSaveCustomerSidebar'
      ]),
      // checkReason() {
      //   if(this.$refs.reasonconfig.conf.trigger_way.length > 0) {
      //     return true
      //   }else {
      //     return '请选择触发因素'
      //   }
      // }
    },
    components: {
      configInterval
    }
}
</script>
<style lang="scss" scoped>
</style>
