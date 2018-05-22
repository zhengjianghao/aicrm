<template>
  <div class="sub_main_content">
    <el-form :model="conf" :rules="rules" :show-message="false" ref="conf" id="containerDiv" class="demo-ruleForm">
      <slot name="baseConfig" :conf="conf" :testRules='rules'>
      </slot>
      <div id="targetDiv" class="form-bottom" v-if="hideBtn ? false : true">
        <config-save-btn :setTransform="service.setTransform" :getTransform="service.getTransform" :customConf="conf" :refs='this.$refs' @refresh='refresh' @customSave="customSave" :checkBuyAll="checkBuyAll" name="保存" :isOnlySave="true">
        </config-save-btn>
        <config-save-btn :setTransform="service.setTransform" :getTransform="service.getTransform" :customConf="conf" :refs='this.$refs' @refresh='refresh' @customSave="customSave" :checkBuyAll="checkBuyAll" :isOnlySave="false" name="保存并自动开启">
        </config-save-btn>
        <config-save-as-btn :setTransform="service.setTransform" :getTransform="service.getTransform" :customConf="conf" :refs='this.$refs' :checkBuyAll="checkBuyAll" name="另存为自定义营销">
        </config-save-as-btn>
        <config-delete-btn v-if="!isSysMarketingjob" name="删除该条营销">
        </config-delete-btn>
      </div>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import utils from '../../misc/utils'
import API_MARKET from '../../service/marketing.service'
import moment from 'moment'
export default {
  data() {
    var that = this
    return {
      isActived: false, // 组件是否被激活
      g_const: globalConstant,
      g_utils: utils,
      curPath: '',
      disableValidate: true,
      commonMarket: {},
      conf: {
        items: [],
        items_range: { include: [], exclude: [] },
        reminder: {
          time: ''
        },
        activity_type: [],
        seller_flag: [],
        exclude_check: [],
        interval_invalid: true
      },
      commonMarket: {},  //存储营销任务除conf之外的数据，比如id
      // 表单验证规则（通用）
      rules: {
        interval: [{
          validator: utils.checkSendTimes(this.verification), trigger: 'change,blur'
        }],
        payment_value: [{
          validator: utils.checkMoney(this.verification), trigger: 'blur',
        }],
        send_mobile_user: [
          { validator: utils.checkMobilePhone(this.verification), trigger: 'blur' }
        ],
        buys_num: [{
          validator: utils.checkBuys(this.verification), trigger: 'blur'
        }],
        deadline_time: [{
          validator: utils.checkDeadline(this.verification), trigger: 'change'
        }],
        order_time: [{
          validator: utils.checkOrderTime(this.verification), trigger: 'change'
        }],
        send_time_day: [{
          validator: utils.checkDay(this.verification, that), trigger: 'change,blur'
        }],
        send_time: [{
          validator: utils.checkTime(this.verification, that), trigger: 'change,blur'
        }],
        active_remark: [{
          validator: utils.checkActiveTitle(this.verification), trigger: 'change,blur'
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'memberGroupData',
      'marketJob',
      'isSysMarketingjob',
      'baseMCommonData',
      'baseMConfigData',
      'verificationData'
    ])
  },
  // 实例被挂载到dom时调用
  mounted() {
    var that = this
    // 标记当前组件为激活状态
    this.isActived = true
    // 获取组件依赖数据(只有组件挂载时需要获取)
    this.getPreData().then(() => {
      that.doActive()
    })
  },
  // 组件被激活(keep-alive)
  activated() {
    if (!this.isActived) {
      // 标记当前组件为激活状态
      this.isActived = true
      this.doActive()
    }
  },
  // 组件转为非激活(keep-alive)
  deactivated() {
    this.isActived = false
    // 清空营销配置组件的验证信息
    this.emptyVerification()
    // 组件应用keep-alive
    // 问题场景：用户操作了界面但是未保存（dom绑定的数据和数据源不同步）
    // 临时存储同步之前的数据
    this.resetData()
  },
  watch: {
    // 同一个组件,只是id改变时执行此函数(此时activated/activated 不被触发)
    $route(val) {
      //只有当前激活的路由才进入
      if (this.isSameTask(val) && this.isActived) {
        this.resetData()
        this.doActive()
      }
    },
    // 营销列表改变，则更新左侧栏
    marketJob() {
      if (this.isActived) {
        if (this.marketJob) {
          // 营销任务左侧栏
          this.updateSidebar()
        }
      }
    },
    //同步配置项值的改变，用于表单验证
    verificationData() {
      if (this.isActived) {
        this.conf = Object.assign({}, this.conf, this.verificationData)
      }
    },
    baseMCommonData() {
      if (this.isActived) {
        //存储营销任务除conf之外的数据，比如id
        this.commonMarket = {
          id: this.baseMCommonData.id,
          title: this.baseMCommonData.title,
          status: this.baseMCommonData.status,
          start_time: this.baseMCommonData.start_time,
          end_time: this.baseMCommonData.end_time,
          activity_time: this.baseMCommonData.activity_time,
          is_system: this.baseMCommonData.is_system,
          is_shared: this.baseMCommonData.is_shared,
          type: this.baseMCommonData.type
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getMemberGroup',
      'updataBaseMCommon',
      'updataBaseMConfigOriginal',
      'emptyBaseMConfig',
      'verification',
      'emptyVerification',
      'updateIsCopy',
      'updateMesContent',
      'updataBaseMConfig',
      'updateMarketJson'
    ]),
    // 获取依赖数据（页面渲染时必须准备好）
    getPreData() {
      var that = this
      return new Promise((resolve, reject) => {
        if (!that.memberGroupData || !that.memberGroupData.length) {
          that.getMemberGroup().then(o => {
            resolve('')
          })
        } else {
          resolve('')
        }
      })
    },
    /**
     * 使data与view保持一致
     * 1.用户操作了界面但是未保存
     * 2.此时切换路由
     * 3.路由不会触发dom重新渲染
     */
    resetData() {
      var that = this
      // 保留初始数据
      var _conf = JSON.parse(JSON.stringify(this.conf))
      // 获取用户修改过的数据，渲染（只是修改了界面数据，未保存）
      this.conf = Object.assign({}, this.conf, this.baseMConfigData)
      // 获取初始数据，重新渲染
      setTimeout(o => {
        that.conf = _conf
      })
    },
    /**
     * 组件激活 执行一系列初始化行为
     */
    doActive() {
      // 清空营销配置组件的状态值
      this.emptyBaseMConfig()
      // 清空营销配置组件的验证信息
      this.emptyVerification()
      // 获取当前营销任务相关信息（必须先加载营销任务列表,在header加载时会主动获取）
      this.updateComponentData()
    },
    /**
     *  更新其它配置项组件状态
     **/
    updateComponentData() {
      // 更新当前使用短信模板为未被引用
      this.updateIsCopy(false)
      // 跟新当前使用短信模板为未被编辑过（编辑过则视为卖家分享的新短信模板）
      this.updateMesContent(false)
      // 获取营销配置数据，并渲染
      this.init()
    },
    /**
     * 判断是否为同一营销任务
     * @param {Object} _route 路由对象
     * @return {Boolean} 相同:true 不同:false
     */
    isSameTask(_route) {
      var _oldType = this.marketingType
      var _newType = _route.query.taskType ? _route.query.taskType : _route.query.type
      var oldType = _oldType ? _oldType.replace('_P4P_SYS', '').replace('_P4P_CUSTOM', '') : ''
      var newType = _newType ? _newType.replace('_P4P_SYS', '').replace('_P4P_CUSTOM', '') : ''
      return oldType === newType
    },
    /**
     * 获取路径上的任务id
     * @return {String} 营销任务id
     */
    getQueryConfigId() {
      return this.$route.query.id
    },
    /**
     *  获取营销配置数据，并渲染
     */
    init() {
      var that = this
      // 获取营销配置id
      var _id = that.getQueryConfigId()
      // 根据id获取营销配置
      API_MARKET.getMarketConfigMerge(_id, that.service.getTransform).then(data => {
        // 更新营销配置公共信息(filter_option之外的信息)
        that.updataBaseMCommon(data)
        // 更新营销配置信息（就是更新filter_option）
        that.updataBaseMConfigOriginal(data.filter_option)
        // 获取 营销配置数据
        var _temp = data.filter_option
        // 渲染 营销配置数据
        that.conf = Object.assign({}, that.conf, JSON.parse(JSON.stringify(_temp)))
        //把具体某个任务的json保存下来，(目前只是为了测试发送短信)
        that.updateMarketJson(that.conf)
      })
    },
    /**
     * 重新渲染营销配置数据
     * @param data {Object} 新的营销配置数据
     */
    refresh(data) {
      this.conf = data.filter_option
    },
    /**
     * 保存钩子函数，调用方可以再保存前先执行自己的逻辑
     * 如果hasCustomSave 为true 则执行父组件的保存函数，否则直径调用cb()
     * @param cb {Function} 子组件执行保存的函数
     */
    customSave(cb) {
      if (this.hasCustomSave) {
        this.$emit('customSave', cb)
      } else {
        cb()
      }
    },
  },
  props: [
    'service',
    'marketingType',
    'updateSidebar',
    'hasCustomSave',
    'checkBuyAll',
    'hideBtn'
  ]

}
</script>
<style lang="scss" scoped>
._align {
  margin-left: 76px;
}

.sub_main_content .title_align {
  padding-left: 94px;
}

.el-col {
  height: 34px;
  line-height: 34px;
  font-size: 12px;
  p {
    display: block;
    text-align: right;
    color: #5D6D7D;
  }
  span {
    font-size: 12px;
  }
}

.form_control {
  padding-top: 30px;
}

.validRow {
  .el-form-item {
    display: inline-block;
  }
}
</style>
