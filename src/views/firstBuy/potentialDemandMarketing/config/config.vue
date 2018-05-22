<template>
    <div>
        <base-marketing-config :service="service" :marketingType="g_const.marketTemplateType.PON_P4P_SYS" :updateSidebar="getFirstBuySidebar" :hasCustomSave="true" @customSave="customSave">
            <template slot="baseConfig" scope="props">
                <div class="subTitle">
                    营销配置
                </div>
                <div class="form-control">
                    <el-form-item>
                        <config-deadline title="营销有效时间" :deadlineLabel="props.conf.deadline_label" :deadline="props.conf.deadline">
                        </config-deadline>
                    </el-form-item>
                    <el-form-item>
                        <config-interval title="营销间隔" customLabel="买家签收后" :intervalLabel="props.conf.interval_label" :intervalValue="props.conf.interval" :qianxu="'qianxu'">
                        </config-interval>
                    </el-form-item>
                    <el-form-item prop="items">
                        <config-pushitem title="营销宝贝" customLabel="指定宝贝" customAILabel="智慧分析买家潜需逐个ID管理" :isAi='true' :itemsLabel="props.conf.items_label" :itemsValue="props.conf.items">
                        </config-pushitem>
                    </el-form-item>
                </div>
                <div class="subTitle">
                    人群配置
                </div>
                <div class="form-control">
                    <el-form-item prop="group">
                        <config-target-member-pon :groupLabel="props.conf.group_label" :curGroupIds="props.conf.curGroupIds" :isItemLabel="props.conf.is_item_label" :isFirstLabel="props.conf.is_first_label" :isSelectGoods="baseMConfigData.items_label">
                        </config-target-member-pon>
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
                            <!--<select-city-code :curCityTextArray="props.conf.area_text_array" :marketDate="true">
                            </select-city-code>-->
                        </div>
                    </transition>
                </div>
                <div class="subTitle">
                    结束提醒
                </div>
                <div class="form-control">
                    <config-over-remind :reminderLabel="props.conf.reminder_label" :reminder="props.conf.reminder">
                    </config-over-remind>
                </div>
                <div class="subTitle">
                    推送配置
                </div>
                <div class="form-control">
                    <!--<el-form-item prop="send_time">
                        <el-row :gutter="20">
                            <el-col :span="3"><p>发送时间：</p></el-col>
                            <el-col :span="8">
                                <el-tooltip content='根据每个会员的近期购物习惯以及店铺历史数据，智能为每个会员制定具体推送时间' placement="top-start" popper-class='tool_notes' effect="dark">
                                    <el-radio v-model="props.conf.send_time_label" label=""><AI></AI>智慧逐个推算</el-radio>
                                </el-tooltip>
                            </el-col>
                            <el-col :span="13"><el-radio v-model="props.conf.send_time_label" label="custom">定时发送</el-radio>
                                <el-time-select
                                    :disabled="props.conf.send_time_label !== 'custom'"
                                    v-model="props.conf.send_time"
                                    :editable="false"
                                    placeholder="不限"
                                    :clearable="false"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:15',
                                    end: '24:00'
                                    }">
                                </el-time-select>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="3"></el-col>
                            <el-col :span="9">
                                <el-checkbox v-model="props.conf.exclude_time_label" :disabled="props.conf.send_time_label === 'custom'">信息不推送时间段 每日</el-checkbox>
                                <timer-picker
                                :disabled="!props.conf.exclude_time_label || props.conf.send_time_label === 'custom'"
                                :startTime="props.conf.exclued_time_start"
                                :endTime="props.conf.exclued_time_end"
                                @updateTime="updateTime"
                                >
                                </timer-picker>
                            </el-col>
                            <el-col :span="12"><el-checkbox v-model="props.conf.ahead_time_label" :disabled="props.conf.send_time_label === 'custom'">在不发送时间内的信息自动提前发送</el-checkbox></el-col>
                        </el-row>
                    </el-form-item>-->
                    <config-sendtime-N :sendTimeLabel='props.conf.send_time_label' :sendTime='props.conf.send_time' :excludeTimeLabel='props.conf.exclude_time_label' :elcludeTime="props.conf.exclude_time" :sendWord="''" :aheadTimeLabel="props.conf.ahead_time_label">
                    </config-sendtime-N>
                    <config-push-type :sendType="props.conf.send_type">
                    </config-push-type>
                </div>
                <div class="subTitle">
                    营销内容
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
import utils from '../../../../misc/utils'
import service from '../pon.service'
import configInterval from '../../../../components/baseMarketingConfig/interval'
import moment from 'moment'
export default {
    data() {
        return {
            showMoreBlock: false,
            g_const: globalConstant,
            utils: utils,
            payment_label: '',
            service: service,
            allLine: [
                '店铺短链',
                'AI推荐商品短名',
                'AI推荐商品短链',
                '买家ID',
                '收件人全名',
                '收件人地址',
                'CRM内会员级别',
                '订单编号',
                '待付款金额',
                '已付款金额',
                '待付款短链',
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
                '待付款短链',
            ]
        }
    },
    computed: {
        ...mapGetters([
            'baseMConfigData',
            'jurisdictionData'
        ]),
    },
    methods: {
        ...mapActions([
            'getFirstBuySidebar',
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
