<template>
  <div class="sub_main_content">
    <div>
        <el-row>
            <el-col :span="4" class="el_start"><p>会员ID：</p></el-col>
            <el-col :span="8"><span>{{settingGlobal.IS_HIDE_ID == 1 ? baseInfo.nick_change : baseInfo.nick}}</span></el-col>
            <el-col :span="4"><p>认证姓名：</p></el-col>
            <el-col :span="8" class="el_end"><span>{{settingGlobal.IS_HIDE_NAME == 1 ? baseInfo.real_name_change : baseInfo.real_name}}</span></el-col>

            <el-col :span="4" class="el_start"><p>性别：</p></el-col>
            <el-col :span="8"><span>{{baseInfo.sex}}</span></el-col>
            <el-col :span="4"><p>认证邮箱：</p></el-col>
            <el-col :span="8" class="el_end"><span>{{baseInfo.email}}</span></el-col>

            <el-col :span="4" class="el_start"><p>生日：</p></el-col>
            <el-col :span="8"><span>{{baseInfo.birthday}}</span></el-col>
            <el-col :span="4"><p>会员状态：</p></el-col>
            <el-col :span="8" class="el_end"><span>{{baseInfo.status}}</span></el-col>
        </el-row>
    </div>
    <div class="subTitle">
      会员分组
    </div>
    <el-row>
        <el-col :span="4" class="el_start"><p>CRM内会员等级：</p></el-col>
        <!--<el-col :span="8"><span>{{baseInfo.crm}}</span></el-col>-->
        <!--//隐藏会员等级-->
        <el-col :span="8"><span>/</span></el-col>
        <el-col :span="4"><p>店铺后台会员等级：</p></el-col>
        <el-col :span="8" class="el_end"><span>{{baseInfo.grade_crm}}</span></el-col>

        <el-col :span="4" class="el_start"><p>淘宝全网会员等级：</p></el-col>
        <el-col :span="8"><span>{{baseInfo.grade_taobao}}</span></el-col>
        <el-col :span="4"><p>天猫全网会员等级：</p></el-col>
        <el-col :span="8" class="el_end"><span>{{baseInfo.grade_tmall}}</span></el-col>

        <el-col :span="4" class="el_start"><p>AI智能分组：</p></el-col>
        <el-col :span="8"><span>{{baseInfo.ai_group}}</span></el-col>
        <el-col :span="4"><p>AI智能标签：</p></el-col>
        <el-col :span="8" class="el_end"><span>{{baseInfo.tag_group}}</span></el-col>

        <el-col :span="4" class="el_start"><p>自建营销标签：</p></el-col>
        <el-col :span="8"><span>{{baseInfo.custom_group}}</span></el-col>
        <el-col :span="4"><p>导入批次标签：</p></el-col>
        <el-col :span="8" class="el_end"><span>{{baseInfo.import_group}}</span></el-col>
    </el-row>
    <div class="subTitle">
      交易信息
    </div>
    <el-row>
        <el-col :span="4" class="el_start"><p>成功交易总金额：</p></el-col>
        <el-col :span="8"><span>{{baseInfo.trade_payment_sum}}</span></el-col>
        <el-col :span="4"><p>退款总订单数：</p></el-col>
        <el-col :span="8" class="el_end"><span>{{baseInfo.trade_refund_count}}</span></el-col>

        <el-col :span="4" class="el_start"><p>成功交易宝贝种类数：</p></el-col>
        <el-col :span="8"><span>{{baseInfo.trade_item_count}}</span></el-col>
        <el-col :span="4"><p>退款总金额：</p></el-col>
        <el-col :span="8" class="el_end"><span>{{baseInfo.trade_refund_payment_sum}}</span></el-col>

        <el-col :span="4" class="el_start"><p>成功交易总件数：</p></el-col>
        <el-col :span="8"><span>{{baseInfo.trade_item_sum}}</span></el-col>
        <el-col :span="4"><p>关闭总订单数：</p></el-col>
        <el-col :span="8" class="el_end"><span>{{baseInfo.trade_closed_count}}</span></el-col>

        <el-col :span="4" class="el_start"><p>成功购买次数：</p></el-col>
        <el-col :span="8"><span>{{baseInfo.trade_merged_count}}</span></el-col>
        <el-col :span="4"><p>关闭总金额：</p></el-col>
        <el-col :span="8" class="el_end"><span>{{baseInfo.trade_closed_payment_sum}}</span></el-col>

        <el-col :span="4" class="el_start"><p>成功交易订单数：</p></el-col>
        <el-col :span="8"><span>{{baseInfo.trade_count}}</span></el-col>
        <el-col :span="4"><p>优惠券使用总金额：</p></el-col>
        <el-col :span="8" class="el_end"><span>{{baseInfo.trade_promotion_payment_sum}}</span></el-col>

        <el-col :span='4'><p>折扣及优惠总金额：</p></el-col>
        <el-col :span='20'><span>{{baseInfo.trade_discount_payment_sum}}</span></el-col>

        <el-col :span="4" class="el_start"><p>最近一次成功交易时间：</p></el-col>
        <el-col :span="8"><span>{{baseInfo.last_trade_success_time}}</span></el-col>
        <el-col :span="4"><p>最近一次成功交易金额：</p></el-col>
        <el-col :span="8" class="el_end"><span>{{baseInfo.last_trade_success_payment}}</span></el-col>

        <el-col :span="4" class="el_start"><p>最后一次交易情况：</p></el-col>
        <el-col :span="8"><span>{{baseInfo.last_trade_status}}</span></el-col>
        <el-col :span="4"><p>最后一次交易时间：</p></el-col>
        <el-col :span="8" class="el_end"><span>{{baseInfo.last_trade_time}}</span></el-col>

        <el-col :span='4'><p>最后一次交易金额：</p></el-col>
        <el-col :span='20'><span>{{baseInfo.last_trade_payment}}</span></el-col>
    </el-row>
    <div class="subTitle">
      地址库信息
    </div>
    <div class="user_tablelist" style="margin:0">
      <el-table
        :data="baseInfo.receivers"
        max-height="565"
        border
        stripe
      >
        <el-table-column
        prop="created"
        align="center"
        min-width="100"
        label="购物时间">
        </el-table-column>
        <el-table-column
        :prop="settingGlobal.IS_HIDE_NAME == 1 ? 'name_show' : 'name'"
        align="center"
        min-width="140"
        label="收件人">
        </el-table-column>
        <el-table-column
        :prop="settingGlobal.IS_HIDE_PHONE == 1 ? 'mobile_show' : 'mobile'"
        align="center"
        min-width="140"
        label="手机">
        </el-table-column>
        <el-table-column
        :prop="settingGlobal.IS_HIDE_PHONE == 1 ? 'phone_show' : 'phone'"
        align="center"
        min-width="140"
        label="电话">
        </el-table-column>
        <el-table-column
        prop="address"
        align="center"
        min-width="140"
        label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import moment from 'moment'
  export default {
    computed: {
      ...mapGetters([
        'settingGlobal'
      ])
    },
    props: [
      'baseInfo'
    ]
}
</script>
<style lang="scss" scoped>
.el-col {
    font-size: 12px;
    border-top: solid 1px #ccc;
    border-right: solid 1px #ccc;
    height: 40px;
    line-height: 40px;
    p {
        text-align: right;
    }
    span {
      margin-left: 3px;
    }

}
.el-table {
    font-size: 12px;
}
</style>
