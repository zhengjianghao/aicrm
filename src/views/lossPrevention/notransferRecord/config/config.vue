<template>
  <div class="sub_main_content">
    <base-marketing-config
    :service="service"
    :marketingType="g_const.marketTemplateType.NOTRANSFERRECORD_P4P_SYS"
    :updateSidebar="getLossPreventionSidebar">

      <template
      slot="baseConfig"
      scope="props"
      >
          <div class="subTitle">
            条件配置
          </div>
          <div class="form-control form_control" style="padding-bottom: 0px">
              <el-form-item>
                <el-row :gutter="20">
                  <el-col :span='3'><p>触发逻辑：</p></el-col>
                  <el-col :span='21'>有揽件记录后在缓冲时间内还没有流转记录时触发</el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <config-deadline
                  title="活动有效时间"
                  :deadlineLabel="props.conf.deadline_label"
                  :deadline="props.conf.deadline"
                  >
                </config-deadline>
              </el-form-item>
              <el-form-item>
                <config-buffer-time :bufferTime='props.conf.buffer_time'></config-buffer-time>
              </el-form-item>
              <config-sendtime
                changeName='全天'
                :pushTimeLabel="props.conf.send_time_label"
                :pushTime="props.conf.send_time"
                :behindTime="props.conf.send_time_behind"
              >
              </config-sendtime>
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
                <el-form-item  prop="items_range">
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
          </div>
          <div class="subTitle">
            结束提醒
          </div>
          <div class="form-control">
            <config-over-remind
              :reminderLabel="props.conf.reminder_label"
              :reminder="props.conf.reminder"
            >
            </config-over-remind>
          </div>
          <div class="subTitle">
            推送逻辑
          </div>
          <div class="form-control">
              <config-push-type
              :sendType="props.conf.send_type"
              :isAI='true'
              >
              </config-push-type>
          </div>
          <div class="subTitle">
            买家营销
          </div>
          <msg-edit-temp msgType='messageTemplate' 
          :msgContent="props.conf.message"
          :allLine='jurisdictionData.allShow ? allLine : allLine2'
          >
          </msg-edit-temp>
          <div class="subTitle">
            客服提醒
          </div>
          <div>
            <el-form-item>
              <!--<config-push-type-user
              :sendTypeUser='props.conf.send_type_user'>
              </config-push-type-user>-->
              <msg-edit-temp-t
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
  import service from '../notransferRecord.service'
  export default {
    data() {
      return {
       showMoreBlock: false,
        g_const: globalConstant,
        tooltipContent: '指在此时间对已经填写过发货单号的订单进行物流信息检测，是否已经被快递公司正常揽收发出',
        service: service,
        allLine: [
          '店铺短链',
          '订单主商品短名',
          '主商品短链',
          '买家ID',
          '收件人全名',
          '收件人地址',
          '订单编号',
          '会员等级',
          '待付款金额',
          '已付款金额',
          '优惠劵领取短链',
          '店铺会员卡领取短链'
        ],
        allLine2: [
          '店铺短链',
          '订单主商品短名',
          '主商品短链',
          '买家ID',
          '收件人全名',
          '收件人地址',
          '订单编号',
          '待付款金额',
          '已付款金额',
        ]
      }
    },
    computed: {
      ...mapGetters([
        'settingGlobal',
        'jurisdictionData'
        ])
    },
    mounted() {
    },
    watch: {
    },
    methods: {
      ...mapActions([
        'getLossPreventionSidebar',
        'updateOpenModal',
      ]),
      openGlobalSetting() {
        this.updateOpenModal({
            name: this.g_const.openModalCodes.systemConfig,
            param: {
                state: 'globalSetting'
            }
        })
      }
    }
}
</script>
<style lang="scss" scoped>
</style>
