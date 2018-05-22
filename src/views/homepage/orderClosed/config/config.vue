<template>
  <div>
  <base-marketing-config
    :service="service"
    :marketingType="g_const.marketTemplateType.ORDERCLOSED_P4P_SYS"
    :updateSidebar="getHomePageSidebar"
  >
    <template
      slot="baseConfig"
      scope="props"
    >
      <div class="subTitle">
        条件配置
      </div>
      <div class="form-control form_control more_condition">
          <el-form-item  prop="status">
            <el-row :gutter="20">
              <el-col :span="3"><p>订单状态：</p></el-col>
              <el-col :span="3">
                <el-radio v-model="orderState" label="">拍下订单关闭</el-radio>
              </el-col>
              <!--<el-col :span="5">
                <el-checkbox v-model="props.conf.exclude_saler" label="">排除商家关闭的订单</el-checkbox>
              </el-col>-->
              <el-col :span="13">
                <el-checkbox v-model="props.conf.exclude_buy" label="">排除买家当天内已有支付的订单ID</el-checkbox>
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
                <el-col :span="3"><p>发送节点：</p></el-col>
                <el-col :span="21"><span>订单关闭后 实时发送</span></el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <config-sendtime
              changeName='全天'
              :pushTimeLabel="props.conf.send_time_label"
              :pushTime="props.conf.send_time"
              :behindTime="props.conf.send_time_behind"
            >
            </config-sendtime>
          </el-form-item>
          <el-form-item prop="items">
            <config-pushitem
              title="最可能后续需求"
              customLabel="指定宝贝"
              customAILabel="智慧推荐"
              :isAi='true'
              :itemsLabel="props.conf.items_label"
              :itemsValue="props.conf.items"
            >
            </config-pushitem>
          </el-form-item>
          <div class="subTitle title_align more" @click="showMoreBlock = !showMoreBlock">
            更多条件
            <span class="iconfont " :class="{'icon-shang': showMoreBlock, 'icon-xia': !showMoreBlock}"></span>
            <span class="history_remarks" v-show="showMoreBlock">注释：{{g_const.orderRemarks[1].label}}</span>
          </div>
          <transition name="slide-fade">

          <div class="form-control form_control more-content" v-show="showMoreBlock">
            <el-form-item>
              <config-order-from
                :tradeFrom="props.conf.trade_from"
                >
              </config-order-from>
            </el-form-item>
            <el-form-item props="items_range">
              <config-items-range
              :itemsValue="props.conf.items_range"
              :itemsLabel="props.conf.items_range_label"
              >
              </config-items-range>
            </el-form-item>
            <el-form-item prop="interval">
              <config-send-times
              :sendTimes="props.conf.interval"
              >
              </config-send-times>
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
            <el-form-item>
              <config-order-time-intime
              :orderTime="props.conf.created"
              :orderTimeLabel="props.conf.created_label"
              >
              </config-order-time-intime>
            </el-form-item>
            <el-form-item prop="group">
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
            <select-city-code :curCityTextArray="props.conf.area_text_array" :marketDate="true">
            </select-city-code>
          </div>
          </transition>
      </div>
      <div class="subTitle">
        结束提醒
      </div>
      <div class="form-control">
        <config-over-remind
          :reminderLabel="props.conf.reminder_label"
          :reminder="props.conf.reminder"
          hideQianniu="true"
        >
        </config-over-remind>
      </div>
      <div class="subTitle">
        推送逻辑
      </div>
      <div class="form-control">
          <config-push-type
          :sendType="props.conf.send_type"
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
    </template>
  </base-marketing-config>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../../../misc/global.constant'
  import utils from '../../../../misc/utils'
  import service from '../orderClosed.service'
  export default {
    data() {
      return {
        showMoreBlock: false,
        g_const: globalConstant,
        utils: utils,
        service: service,
        orderState: '',
        exclude_saler: true,
        exclude_buy: true,
        allLine: [
          '店铺短链',
          'AI推荐商品短名',
          'AI推荐商品短链',
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
          'AI推荐商品短名',
          'AI推荐商品短链',
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
        'userData',
        'jurisdictionData'
        ])
    },
    mounted() {
    },
    methods: {
      ...mapActions([
        'getHomePageSidebar'
      ])
    },
    components: {
    }
}
</script>
<style lang="scss">
</style>
