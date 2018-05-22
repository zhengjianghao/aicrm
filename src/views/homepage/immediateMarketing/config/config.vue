<template>
  <div>
    <base-marketing-config ref="baseConf" :hideBtn='true' :service="service" :marketingType="g_const.marketTemplateType.PAYED_P4P_SYS" :updateSidebar="getHomePageSidebar">
      <template slot="baseConfig" scope="props">
        <div class="config_loading">
          <div class="change_marketing">
            <!--<el-button-group>
                <el-button :class="market_type === 'PAYED' ? 'toolbox_active' : 'toolbox_default'" @click="saveChangeType('PAYED')">拍下就营销</el-button>
                <el-button  class="margin_left_tiny" :class="market_type === 'PAYMENT' ? 'toolbox_active' : 'toolbox_default'" @click="saveChangeType('PAYMENT')">付款再营销</el-button>
            </el-button-group>-->
            <switch-big :initValue="initValue" onText="拍下就营销" offText="付款再营销" @change="saveChangeType"></switch-big>
          </div>
          <loading-gear :isStop="deductionRule.name ? baseMCommonData.status == 'OPEN' ? false : true : true" class="config_loading_gear"></loading-gear>
          <el-dialog
            :visible.sync="isShowchangeMarket"
            title="切换确认"
            custom-class="changeMarket"
            :show-close="false"
            :close-on-press-escape="false"
            :close-on-click-modal="false">
            <div class="change_market_c">
              <p>{{message[market_type]}}</p>
              <p style="color: #ff7900;" v-if="initValue.state">特别提醒：切换至【付款再营销】后，加购效果相对【拍下就营销】会有30%-50%的下降，请谨慎切换</p>
            </div>
            <div class="change_market_f">
              <el-button type="primary" @click="doChange">确 定</el-button>
              <el-button @click="noChange">取 消</el-button>
            </div>
          </el-dialog>
        </div>
      </template>
    </base-marketing-config>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import service from '../imm.service'
import loadingGear from 'components/loadingGear/loadingGear'
import globalConstant from '../../../../misc/global.constant'
import API_MARKET from '../../../../service/marketing.service'
export default {
  data() {
    return {
      service: service,
      g_const: globalConstant,
      market_type: 'PAYED',
      initValue: {
        type: 'change_market',
        state: true
      },
      isShowchangeMarket: false,
      message: {
        PAYED: '将从【拍下就营销】切换至【付款再营销】-买家拍下付款后再推送营销信息。',
        PAYMENT: '将从【付款再营销】切换至【拍下就营销】-买家拍下后就推送营销信息。'
      }
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'baseMCommonData',
      'deductionRule',
      'baseMConfigOriginalData'
    ])
  },
  watch: {
    baseMConfigOriginalData() {
      this.market_type = this.baseMConfigOriginalData.edit_instant_marketing_way ? this.baseMConfigOriginalData.edit_instant_marketing_way : 'PAYED'
      this.initValue = {
        type: 'change_market',
        state: this.baseMConfigOriginalData.edit_instant_marketing_way === 'PAYED'
      }
    }
  },
  methods: {
    ...mapActions([
      'getHomePageSidebar',
    ]),
    saveChangeType(initValue) {
      // var that = this
      // this.market_type = initValue.state ? 'PAYED' : 'PAYMENT'
      // var _conf = Object.assign({}, this.baseMConfigOriginalData, { edit_instant_marketing_way: this.market_type })
      // var cData = this.baseMCommonData
      // API_MARKET.save(cData.id, {
      //   title: cData.title,
      //   start_time: cData.start_time,
      //   end_time: cData.end_time,
      //   filter_option: _conf
      // }).then(o => {
      //   that.$message({
      //     message: '切换成功！',
      //     type: 'success',
      //     customClass: 'message_position'
      //   })
      // })
      this.isShowchangeMarket = true
    },
    doChange() {
      var that = this
      this.market_type = !that.initValue.state ? 'PAYED' : 'PAYMENT'
      var _conf = Object.assign({}, this.baseMConfigOriginalData, { edit_instant_marketing_way: this.market_type })
      var cData = this.baseMCommonData
      API_MARKET.save(cData.id, {
        title: cData.title,
        start_time: cData.start_time,
        end_time: cData.end_time,
        filter_option: _conf
      }).then(o => {
        that.isShowchangeMarket = false
        that.initValue.state = !that.initValue.state
        that.$message({
          message: '切换成功！',
          type: 'success',
          customClass: 'message_position'
        })
      })
    },
    noChange() {
      this.isShowchangeMarket = false
    }
  },
  components: {
    loadingGear
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../style/mixin.scss';
.config_loading {
  background: url('../../../../assets/images/config_bg.jpg') no-repeat;
  background-size: auto 100%;
  height: 620px;
  margin-top: 5px;
  background-color: #2663a1;
  .config_loading_gear {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
}
.change_market_c {
  padding: 15px 10px 15px 10px;
}
.change_market_f {
  padding: 20px;
  .el-button {
    width: 35%;
    margin: 0px 40px;
  }
}
</style>
