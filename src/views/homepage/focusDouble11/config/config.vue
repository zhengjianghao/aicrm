<template>
  <div>
    <base-marketing-config :service="service" :marketingType="g_const.marketTemplateType.FOCUSDOUBLE11_P4P_SYS" :updateSidebar="getHomePageSidebar" :checkBuyAll="checkAll" ref='baseMarketConf'>
      <template slot="baseConfig" scope="props">
        <calendar-date :calData='props.conf.cal_num'></calendar-date>
        <div>
          <el-row type='flex' style="text-align: center; padding: 18px 0px;">
            <el-col :span="24" class="predictAll">预计发送总人数：
              <span>{{props.conf.predict_send && parseInt(props.conf.predict_send) != 0 ? parseInt(props.conf.predict_send) + '人' : "24小时内完成运算后再显示，请亲耐心等待"}}</span>
            </el-col>
            <el-col :span="24" class="predictAll">预计使用普通通道总费用：
              <span>{{props.conf.predict_ordinary && parseInt(props.conf.predict_ordinary) != 0 ? parseInt(props.conf.predict_ordinary) + '元' : "暂无"}}</span>
            </el-col>
            <el-col :span="24" class="predictAll">预计使用优质通道总费用：
              <span>{{props.conf.predict_grade && parseInt(props.conf.predict_grade) != 0 ? parseInt(props.conf.predict_grade) + '元' : "暂无"}}</span>
            </el-col>
          </el-row>
        </div>
        <div class="subTitle">
          条件配置
          <el-button type="primary" @click="addStair()" class="addStair">增加一个阶梯</el-button>
        </div>
        <lazy-render time="1500" minHeight="110px" loadingTime="1500">
          <add-stair12 doubleName='双11'ref="addStair" :stairDate='props.conf.stairs'></add-stair12>
        </lazy-render>
        <div class="subTitle">
          推送配置
        </div>
        <div class="form-control">
          <config-sendtime-N :sendTimeLabel='props.conf.send_time_label' :sendTime='props.conf.send_time' :excludeTimeLabel='props.conf.exclude_time_label' :elcludeTime="props.conf.exclude_time" :aheadTimeLabel="props.conf.ahead_time_label">
          </config-sendtime-N>
        </div>
        <setting-list-double ref="settingcheck" doubleName='双11' :double11Import='importDouble11' :settingListData="props.conf.double_items"></setting-list-double>
        <div class="subTitle">
          结束提醒
        </div>
        <div class="form-control">
          <config-over-remind :reminderLabel="props.conf.reminder_label" :reminder="props.conf.reminder" hideQianniu="true">
          </config-over-remind>
        </div>
        <div class="subTitle">
          推送逻辑
        </div>
        <div class="form-control">
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
import globalConstant from '../../../../misc/global.constant'
import utils from '../../../../misc/utils'
import service from '../focusDouble11.service'
import moment from 'moment'
export default {
  data() {
    return {
      g_const: globalConstant,
      utils: utils,
      service: service,
      allLine: [
        '店铺短链',
        '专享营销语',
        '买家ID',
        '收件人全名',
        '收件人地址',
        '收件人电话',
        '订单编号',
        'AI推荐双11商品短名',
        'AI推荐双11商品短链',
        'AI推荐双11商品折扣',
        'AI推荐双11商品价格',
        'CRM内会员级别'
      ],
      allLine2: [
        '店铺短链',
        '专享营销语',
        '买家ID',
        '收件人全名',
        '收件人地址',
        '收件人电话',
        '订单编号',
        'AI推荐双11商品短名',
        'AI推荐双11商品短链',
        'AI推荐双11商品折扣',
        'AI推荐双11商品价格',
        'CRM内会员级别'
      ],
    }
  },
  computed: {
    ...mapGetters([
      'userData',
      'jurisdictionData',
    ]),
  },
  methods: {
    ...mapActions([
      'getHomePageSidebar',
    ]),
    addStair() {
      this.$refs['addStair'].addStair()
    },
    checkAll() {
      return this.$refs.settingcheck.checkBuyAll() && this.$refs.addStair.checkStairAll()
    },
    //把导入后的值更新到tabel中
    importDouble11(value) {
      this.$refs['baseMarketConf'].conf.double_items = this.utils.arrayUnique(value, 'num_iid')
    }
  }
}
</script>
<style lang="scss">
</style>
