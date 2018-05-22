<template>
<el-tooltip :disabled="jurisdictionData.secondShow" :value='toolShow'  content='暂未开放' placement="top" popper-class='tool_notes' effect="dark">
  <el-button type="primary" size="large" @mouseleave="hidTool" @mouseenter="showTool" :class="jurisdictionData.secondShow ? 'btn-saveAs' : 'btn-saveAs-disable'" @click="jurisdictionData.secondShow ? beforeCheck() : ''">
    {{ name }}
  </el-button>
</el-tooltip>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import API_MARKET from '../../service/marketing.service'
import g_const from '../../misc/global.constant'
import API_MESSAGE from '../../service/message.service'
import utils from '../../misc/utils'
import moment from 'moment'
export default {
  data() {
    return {
      deadline_label: '',
      activeTime: '',
      toolShow: true,
      isActived: false
    }
  },
  watch: {
    // 用户确定要另为模板
    saveAsData() {
      if(this.isActived) {
        // 获取配置数据
        this.doSaveAs()
      }
    }
  },
  // 实例挂载到dom上
  mounted() {
    // 标记当前组件为激活状态
    this.isActived = true
  },
  // 组件被激活(keep-alive)
  activated() {
    // 标记当前组件为激活状态
    this.isActived = true
  },
  // 组件转为非激活(keep-alive)
  deactivated() {
    this.isActived = false
  },
  computed: {
    ...mapGetters([
      'baseMConfigData',
      'baseMCommonData',
      'saveAsData',
      'isCopy',
      'jurisdictionData'
    ])
  },
  methods: {
    ...mapActions([
      'updateOpenModal',
      'getMarketingJob',
      'doMarketTask',
      'getMarketingSysTitle'
    ]),
    showTool() {
      this.toolShow = false
    },
    hidTool() {
      this.toolShow = true
    },
    //验证部分场景最上面的一些内容
    checkHead() {
      var that = this
      if (that.checkBuyAll) {
        var _temp = this.checkBuyAll()
        if (_temp == '请选择快消品宝贝' || _temp == '请选择聚划算宝贝' || _temp == '请选择触发因素' || _temp == '请设置优惠等级' || _temp == '请选择宝贝' || _temp == '请设置恶劣天气' || _temp == '请保存修改的宝贝') {
          utils.showErrorMsg(this, _temp)
        } else {
          if (_temp) {
            that.openSaveAs()
          }
        }
      } else {
        that.openSaveAs()
      }
    },
    //保存前的验证
    beforeCheck() {
      var _checkGroup = utils.checkGroup(this.baseMConfigData)
      var that = this
      if(_checkGroup) {
        that.checkHead()
      }else {
        utils.showErrorMsg(this, '请选择会员分组')
      }
    },
    // 点击另存为
    openSaveAs() {
      // 表单名
      var formName = 'conf'
      // eslint-disable-next-line
      var that = this
      that.refs[formName].validate((valid) => {
        // 表单验证成功
        if (valid) {
          // 验证短信内是否包含非法字符， 如果没有才可以另存为
          // 买家短信内容验证
          if (utils.checkSendMsg(that.baseMConfigData, that)) {
            var _taskType = that.baseMCommonData.type
            // 获取系统模板title（根据当前营销类型）
            that.getMarketingSysTitle(_taskType).then(sysTitle => {
              that.updateOpenModal({
                name: g_const.openModalCodes.marketSaveAs,
                param: {
                  taskName: moment().format('YYYY-MM-DD HH:mm') + sysTitle
                }
              })
            })
          }
        } else {
          // utils.showErrorMsg(this, '亲，配置项的值出错咯，请往上检查看下吧！')
          return false
        }
      })
    },
    // 确定要另存为
    doSaveAs() {
      var that = this
      var cData = this.baseMCommonData
      cData.title = this.saveAsData.name
      cData.states = this.saveAsData.open
      // 另存为
      API_MARKET.saveAsMerge(cData.id, cData, this.baseMConfigData, this.customConf, this.setTransform, this.getTransform).then(o => {
        // 更新任务开关
        this.doMarketTask([o.id, cData.states ? 'open' : 'close']).then(k => {
          this.$router.push({
            path: this.$route.path,
            query: {
              id: o.id,
              taskType: o.type
            }
          })
          // 刷新营销列表
          that.getMarketingJob()
          that.createMessageTemplate(o).then(() => {
            utils.showSuccessMsg(this, '模板另存为成功')
          })
        })
      })
    },
    // 新建或引用模版
    createMessageTemplate(newData) {
      var opt = newData.filter_option
      var t = this.isCopy ? 1 : 0
      return API_MESSAGE.createMessageTemplate(
        t,
        opt.message,
        Math.ceil((opt.message.length + 4) / 70),
        newData.type.replace('_P4P_CUSTOM', '').replace('_P4P_SYS', ''),
        newData.is_shared
      )
    }
  },
  props: [
    'setTransform',
    'getTransform',
    'customConf',
    'name',
    'refs',
    'checkBuyAll'
  ]
}
</script>
<style lang="scss">

</style>
