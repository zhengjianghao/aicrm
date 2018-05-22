<template>
  <div>
      <base-marketing-config
        :service="service"
        :marketingType="g_const.marketTemplateType.POTENTIAL_P4P_SYS"
        :updateSidebar="getMaintenanceSidebar"
        :hasCustomSave="true"
        @customSave="customSave"
      >
        <template
            slot="baseConfig"
            scope="props"
        >
            <div class="subTitle">
            营销配置
            </div>
            <lazy-render loadingTime="200">
                <div class="form-control">
                    <config-deadline
                    title="营销有效时间"
                    :deadlineLabel="props.conf.deadline_label"
                    :deadline="props.conf.deadline"
                    >
                    </config-deadline>
                    <el-form-item>
                        <config-interval
                        title="营销间隔"
                        customLabel="买家签收后"
                        :intervalLabel="props.conf.interval_label"
                        :intervalValue="props.conf.interval"
                        :qianxu="'qianxu'"
                        >
                        </config-interval>
                    </el-form-item>
                    <el-form-item prop="items">
                        <config-pushitem
                        title="营销宝贝"
                        customLabel="指定宝贝"
                        customAILabel="智慧分析买家潜需逐个ID管理"
                        :isAi='true'
                        :itemsLabel="props.conf.items_label"
                        :itemsValue="props.conf.items"
                        >
                        </config-pushitem>
                    </el-form-item>
                </div>
                <div class="subTitle">
                    人群配置
                </div>
                <div class="form-control form_control" style="padding-bottom: 0px">
                    <el-form-item prop="group">
                        <config-target-member
                        :groupLabel="props.conf.group_label"
                        :curGroupIds="props.conf.curGroupIds"
                        :isItemLabel="props.conf.is_item_label"
                        :isFirstLabel="props.conf.is_first_label"
                        :isSelectGoods="baseMConfigData.items_label"
                        :showUnlimited="false"
                        >
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
                        <config-over-remind
                        :reminderLabel="props.conf.reminder_label"
                        :reminder="props.conf.reminder"
                        >
                        </config-over-remind>
                    </div>
                    <div class="subTitle">
                        推送配置
                    </div>
                    <div class="form-control">
                        <config-sendtime-N :sendTimeLabel='props.conf.send_time_label' :sendTime='props.conf.send_time' :excludeTimeLabel='props.conf.exclude_time_label' :elcludeTime="props.conf.exclude_time"  :sendWord="''" :aheadTimeLabel="props.conf.ahead_time_label">
                        </config-sendtime-N>
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
                    tip="注释：如果选择了多个宝贝建议在无线端建立专门活动页，直接给客户发送活动页短链"
                >
                </msg-edit-temp>
            </lazy-render>
        </template>
    </base-marketing-config>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../../../misc/global.constant'
  import utils from '../../../../misc/utils'
  import configInterval from '../../../../components/baseMarketingConfig/interval'
  import service from '../pon.service'
  export default {
    data() {
      return {
        showMoreBlock: false,
        g_const: globalConstant,
        utils: utils,
        service: service,
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
          'baseMConfigData',
          'jurisdictionData'
      ])
    },
    mounted() {
    },
    watch: {
    },
    methods: {
        ...mapActions([
            'getMaintenanceSidebar',
            'updataBaseMConfig'
        ]),
        updateTime(obj) {
            this.updataBaseMConfig({
                exclued_time_start: obj.startTime,
                exclued_time_end: obj.endTime
            })
        },
        customSave(cb) {
             this.$confirm('修改后的配置将在24小时后生效, 是否继续?', '提示', {
              confirmButtonText: '继续保存',
              cancelButtonText: '放弃保存',
              type: 'warning'
            }).then(() => {
                cb()
            }).catch(() => {
              this.$message({
                type: 'info',
                customClass: 'message_position',
                message: '已取消保存'
              });
            })
        }
    },
    components: {
        configInterval
    }
}
</script>
<style lang="scss" scoped>

</style>
