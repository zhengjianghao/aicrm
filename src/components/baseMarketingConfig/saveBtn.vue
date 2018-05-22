<template>
  <el-button type="primary" size="large" :class="isOnlySave ? 'btn-onlySave' : 'btn-save'" :disabled='saveDisabled' @click="beforeCheck">
    <span class="iconfont icon-save margin_r_2"></span>{{ name }}
  </el-button>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import API_MARKET from '../../service/marketing.service'
import utils from '../../misc/utils'
import API_MESSAGE from '../../service/message.service'
import g_const from '../../misc/global.constant.js'
export default {
  data() {
    return {
      g_const: g_const,
      saveMsg: '',
      saveOpenMsg: '保存并自动开启成功',
      onlySaveMsg: '保存成功',
      saveDisabled: false,
    }
  },
  computed: {
    ...mapGetters([
      'baseMConfigData',
      'baseMCommonData',
      'isCopy',
      'isUpdateMesContent'
    ])
  },
  methods: {
    ...mapActions([
      'doMarketTask',
      'updataBaseMCommon',
      // 'repeatClick',
      'getMarketingJob',
      'updateMesContent'
    ]),
    //验证部分场景最上面的一些内容
    checkHead() {
      var that = this
      if (that.checkBuyAll) {
        var _temp = that.checkBuyAll()
        if (_temp == '请选择快消品宝贝' || _temp == '请选择聚划算宝贝' || _temp == '请选择触发因素' || _temp == '请设置优惠等级' || _temp == '请选择宝贝' || _temp == '请设置恶劣天气' || _temp == '请保存修改的宝贝') {
          utils.showErrorMsg(this, _temp)
        } else {
          if (_temp) {
            that.saveAndOpen()
          }
        }
      } else {
        that.saveAndOpen()
      }
    },
    //保存前的验证
    beforeCheck() {
      var _checkGroup = utils.checkGroup(this.baseMConfigData)
      var that = this
      if (_checkGroup) {
        that.checkHead()
      } else {
        utils.showErrorMsg(this, '请选择会员分组')
      }
    },
    saveAndOpen() {
      var that = this
      // 表单名
      var formName = 'conf'
      // 营销配置基本量
      var mergeConf = {}
      that.refs[formName].validate((valid) => {
        // 表单验证成功
        if (valid) {
          // 验证短信内是否包含非法字符， 如果没有才可以另存为
          // 买家短信内容验证
          if (utils.checkSendMsg(this.baseMConfigData, that)) {
            that.$emit('customSave', () => {
              // 禁止重复点击
              // that.repeatClick()
              that.saveDisabled = true
              // 提交
              that.submitForm()
              // setTimeout(function() {
              //   that.repeatClick()
              // }, 1500);
            })
          }
        } else {
          // utils.showErrorMsg(this, '亲，配置项的值出错咯，请往上检查看下吧！')
          return false
        }
      })
    },
    // 保存营销任务
    submitForm() {
      var cData = this.baseMCommonData
      this.saveMsg = this.isOnlySave ? this.onlySaveMsg : this.saveOpenMsg
      // 开启任务
      if (cData.status === this.g_const.marketingState.OPEN || this.isOnlySave) {
        this.justSave(cData)
      } else {
        this.doMarketTask([cData.id, 'open']).then(k => {
          this.justSave(cData)
        })
      }

    },

    // 仅保存
    justSave(cData) {
      API_MARKET.saveMerge(cData.id, cData, this.baseMConfigData, this.customConf, this.setTransform, this.getTransform).then(newData => {
        // 更新标题栏
        this.updataBaseMCommon(newData)
        this.getMarketingJob()
        this.$emit('refresh', newData)
        // 重新加载数据
        this.$router.push({
          path: this.$route.path,
          query: {
            id: cData.id,
            taskType: cData.type
          }
        })
        this.saveDisabled = false
        var that = this
        // 短信内容是否被更新过
        if (this.isUpdateMesContent) {
          this.updateMesContent(false)
          // 新建或引用模版
          that.createMessageTemplate(newData).then(() => {
            utils.showSuccessMsg(this, that.saveMsg, () => {
              //that.repeatClick()
            })
          })
        } else {
          utils.showSuccessMsg(this, that.saveMsg, () => {
            //that.repeatClick()
          })
        }

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
    'checkBuyAll',
    'isOnlySave',
  ]
}
</script>
<style lang="scss" scoped>
.margin_r_2 {
  font-size: 12px;
  margin-right: 4px;
}
</style>
