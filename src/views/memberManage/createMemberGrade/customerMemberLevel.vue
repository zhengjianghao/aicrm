<template>
  <div class="grade_custom">
    <div class="header_word remind">亲爱的用户，您可以自己根据条件设定会员等级</div>
    <div class="form_head">
      <el-row>
        <el-col :span='1'></el-col>
        <el-col :span="4">
          等级名称
          <el-tooltip content='【注释】可修改' placement="top-start" popper-class='tool_notes' effect="dark">
            <i class="iconfont icon-help1 toolGanTanHao"></i>
          </el-tooltip>
        </el-col>
        <el-col :span="3">会员等级</el-col>
        <el-col :span="10">满足条件</el-col>
        <el-col :span="4" v-if="jurisdictionData.allShow">
          会员权益-折上折
          <el-tooltip content='【注释】基于当前全网会员最低价基础上再进行的折扣，并非直接原价折扣，此折扣不会与CRM 设置的会员专享价冲突，不会在CRM 内部再次产生折上折请特别注意' placement="top-start" popper-class='tool_notes' effect="dark">
            <i class="iconfont icon-help1 toolGanTanHao"></i>
          </el-tooltip>
        </el-col>
        <el-col :span="2">
          <a class="link link_underline" @click="addGrade">添加新等级</a>
        </el-col>
      </el-row>
    </div>
    <div v-for="(item, index) in customerData" :key="index" :class="{ user_toolbox: item.filter_option.showMoreCondition }" style="margin: 7px;">
      <el-row style="margin:10px 0;">
        <el-col :span='1'></el-col>
        <el-col :span="4">
          <el-tooltip class="item" effect="dark" :manual="true" :value='titleId.indexOf(index)>=0' :content="titleId.indexOf(index)>=0 ? titleContent[titleId.indexOf(index)] : ''" placement="top">
            <el-input v-model="item.title" placeholder="例如：黄金会员" class="input_s hasIcon" @change='checkTitle(item.title, index, customerData)'>
            </el-input>
          </el-tooltip>
        </el-col>
        <el-col :span="3">
          <el-tooltip class="item" effect="dark" :manual="true" :value='descId.indexOf(index)>=0' :content="descId.indexOf(index)>=0 ? descContent[descId.indexOf(index)] : ''" placement="top">
            <el-input v-model="item.desc" placeholder="例如：V1" class="normal" @change='checkDesc(item.desc,index)'></el-input>
          </el-tooltip>
        </el-col>
        <el-col :span="10">
          <el-tooltip content='按照合并相邻时间订单后购物行为次数计算，并非按照订单数计算' placement="top-start" popper-class='tool_notes' effect="dark">
            <i class="iconfont icon-help1 toolGanTanHao"></i>
          </el-tooltip>
          <span>购物次数：</span>
          <el-tooltip class="item" effect="dark" :manual="true" :value='levelId.indexOf(index)>=0' :disabled="item.filter_option.applyMoreCondition" :content="levelId.indexOf(index)>=0 ? content[levelId.indexOf(index)] : ''" placement="top">
            <span class="input_s_s r">
              <el-input :disabled="item.filter_option.applyMoreCondition" v-model="item.filter_option.purchase_times_normal" @change='checkNum(item.filter_option.purchase_times_normal,index)'>
              </el-input>
            </span>
          </el-tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-tooltip content='交易成功后总金额，扣除退款' placement="top-start" popper-class='tool_notes' effect="dark">
            <i class="iconfont icon-help1 toolGanTanHao"></i>
          </el-tooltip>
          <span>购物金额：</span>
          <el-tooltip class="item" effect="dark" :manual="true" :value='paymentId.indexOf(index)>=0' :disabled="item.filter_option.applyMoreCondition" :content="paymentId.indexOf(index)>=0 ? payContent[paymentId.indexOf(index)] : ''" placement="top">
            <span class="input_s r">
              <el-input :disabled="item.filter_option.applyMoreCondition" v-model="item.filter_option.payment_normal" @change='checkPayment(item.filter_option.payment_normal,index)'>
                <template slot="append">元</template>
              </el-input>
            </span>
          </el-tooltip>
          <el-checkbox v-model="item.filter_option.applyMoreCondition" @change="item.filter_option.showMoreCondition = item.filter_option.applyMoreCondition">
            高级选项
          </el-checkbox>
          <a class="link link_underline" v-show="!item.filter_option.showMoreCondition && item.filter_option.applyMoreCondition" @click="item.filter_option.showMoreCondition = !item.filter_option.showMoreCondition">
            展开
          </a>
          <a class="link link_underline" v-show="item.filter_option.showMoreCondition" @click="item.filter_option.showMoreCondition = !item.filter_option.showMoreCondition">
            收起
          </a>
        </el-col>
        <el-col :span="6" v-if="jurisdictionData.allShow">
          <el-tooltip class="item" effect="dark" :manual="true" :value='discountId.indexOf(index)>=0' :content="discountId.indexOf(index)>=0 ? disContent[discountId.indexOf(index)] : ''" placement="top">
            <span class="input_s r">
              <el-input v-model="item.filter_option.discount" placeholder="例如：8.5" @change='checkDiscount(item.filter_option.discount,index)'>
                <template slot="append">折</template>
              </el-input>
            </span>
          </el-tooltip>
          <!--<span class="link link_underline primary" v-show="index !== 0" @click="remove(item.filter_option.index)">删除</span>-->
        </el-col>
      </el-row>

      <div>
        <base-VIP-config ref="base_test" :baseData='item' @updateConf='updateFilterOption'>
          <template slot="baseConfig" scope='props'>
            <div class="form-control form_control more-content dashedLine" v-show="item.filter_option.showMoreCondition">
              <el-form-item prop="created">
                <config-order-time :orderTime="props.conf.created" :orderTimeLabel="props.conf.created_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-order-time>
              </el-form-item>
              <el-form-item prop="trade_from">
                <config-order-from :tradeFrom="props.conf.trade_from" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-order-from>
              </el-form-item>
              <el-form-item prop="activity_type">
                <config-order-types :checkedOrderType="props.conf.activity_type" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-order-types>
              </el-form-item>
              <el-form-item>
                <config-order-payment :paymentLabel="props.conf.payment_label" :payment="props.conf.payment_more" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-order-payment>
              </el-form-item>
              <el-form-item prop="status">
                <config-order-state :orderState="props.conf.status" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-order-state>
              </el-form-item>
              <el-form-item prop="buys">
                <config-goods-num :buys="props.conf.buys" :buysLabel="props.conf.buys_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-goods-num>
              </el-form-item>
              <el-form-item>
                <config-buy-count :purchase="props.conf.purchase_times_more" :purchaseLabel="props.conf.purchase_times_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-buy-count>
              </el-form-item>
              <el-form-item prop="order_num">
                <config-goods-type :orderNum="props.conf.order_num" :orderNumLabel="props.conf.order_num_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-goods-type>
              </el-form-item>
              <el-form-item props="items_range">
                <config-items-range :itemsValue="props.conf.items_range" :itemsLabel="props.conf.items_range_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-items-range>
              </el-form-item>
              <el-form-item prop="pay_time">
                <config-pay-time :payTime="props.conf.pay_time" :payTimeLabel="props.conf.pay_time_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-pay-time>
              </el-form-item>
              <el-form-item prop="consign_time">
                <config-consign-time :consignTime="props.conf.consign_time" :consignTimeLabel="props.conf.consign_time_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-consign-time>
              </el-form-item>
              <el-form-item prop="sign_time">
                <config-sign-time :signTime="props.conf.sign_time" :signTimeLabel="props.conf.sign_time_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-sign-time>
              </el-form-item>
              <el-form-item prop="end_time">
                <config-confirm-time :confirmTime="props.conf.end_time" :confirmTimeLabel="props.conf.end_time_label" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-confirm-time>
              </el-form-item>
              <el-form-item prop="buyer_message">
                <config-buyer-message :buyerMessage="props.conf.buyer_message" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-buyer-message>
              </el-form-item>
              <el-form-item>
                <config-flags :checkedFlags="props.conf.seller_flag" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-flags>
              </el-form-item>
              <el-form-item>
                <config-express :expressArraySel="props.conf.express" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-express>
              </el-form-item>
              <el-form-item>
                <config-select-city :selCity="props.conf.city" :dataBind="props.conf" @sycnMethod="props.sycnMethod">
                </config-select-city>
              </el-form-item>
            </div>
          </template>
        </base-VIP-config>
      </div>

    </div>
    <div class="form-bottom">
      <el-button type="primary" class="btn-save middle" @click="save">
        <span class="iconfont icon-save"></span>&nbsp;保存
      </el-button>
      <el-button type="primary" class="btn-saveAs middle" @click="reset">重置
      </el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../../misc/global.constant'
import API_MARKET from '../../../service/marketing.service'
import utils from '../../../misc/utils'
export default {
  data() {

    return {
      customerData: [], // 存储会员等级制度数据，用于页面数据展现
      customerDataMod: [], // 记录修改的会员等级制度数据(高级选项部分)，用于保存
      levelId: [],
      content: [],
      paymentId: [],
      payContent: [],
      disContent: [],
      discountId: [],
      titleContent: [],
      titleId: [],
      descId: [],
      descContent: [],
      hidden: false,
      refs: [],
      checkAll: []
    }
  },
  computed: {
    ...mapGetters([
      'memberLevelData',
      'memberLevelAiData',
      'memberLevelCustomData',
      'verificationData',
      'jurisdictionData'
    ])
  },
  watch: {
    // 监听自定义数据，有变化则加载
    memberLevelCustomData() {
      this.init()
    }
  },
  mounted() {
    // 没有数据则加载
    if (!this.memberLevelData.groups) {
      this.getMemberLevel()
    } else {
      // 有数据则加载
      this.init()
    }
  },
  methods: {
    ...mapActions([
      'getMemberLevel',
      'saveMemberLevel',
      'addInitData',
      'getMemberGroup',
      'verification'
    ]),
    init() {
      // 克隆自定义数据到新的变量
      if (this.memberLevelData.groups) {
        this.customerData = JSON.parse(JSON.stringify(this.memberLevelCustomData))
        this.customerDataMod = JSON.parse(JSON.stringify(this.memberLevelCustomData))
      }
    },
    // 用户修改数据 调用回调进行更新
    // 因为是列表数据，所以根据id定位跟新对象
    // data 回传被修改的对象（即每行对应的数据对象）
    updateFilterOption(data) {
      this.customerDataMod = this.customerDataMod.map(o => {
        if (o.id === data.id || !o.id) {
          o = data
        }
        return o
      })
    },
    // 保存
    save() {
      var that = this
      // 表单验证是否通过
      if (this.isValid()) {
        this.getSavePromise().then(o => {
          that.$router.push('/memberManage/home')
          that.getMemberLevel()
          that.getMemberGroup()
          utils.showSuccessMsg(that, '保存成功')
        })
      }
    },
    // 返回保存接口的 promise
    getSavePromise() {
      // 保存前加工数据格式
      return this.saveMemberLevel(this.processLevelData())
    },
    // 表单是否通过验证
    isValid() {
      var that = this
      that.checkAll = 0;
      for (var i in this.$refs.base_test) {
        if (that.customerDataMod[i].filter_option.applyMoreCondition) {
          that.$refs.base_test[i].$refs.conf.validate((valid) => {
            if (valid) {
              that.checkAll++
            } else {
              that.checkAll--
              // if(!that.customerData[i].filter_option.showMoreCondition) {
              //   that.customerData[i].filter_option.showMoreCondition=!that.customerData[i].filter_option.showMoreCondition
              // }

              return false
            }
          })
        } else {
          that.checkAll++
        }
      }
      for (var k in this.customerData) {
        if (!that.customerData[k].filter_option.applyMoreCondition) {
          that.checkNum(that.customerData[k].filter_option.purchase_times_normal, parseInt(k))
          that.checkPayment(that.customerData[k].filter_option.payment_normal, parseInt(k))
        }else {
          that.content.splice(that.levelId.indexOf(parseInt(k)), 1)
          that.levelId.splice(that.levelId.indexOf(parseInt(k)), 1)
          that.payContent.splice(that.paymentId.indexOf(parseInt(k)), 1)
          that.paymentId.splice(that.paymentId.indexOf(parseInt(k)), 1)
        }
        this.checkDiscount(this.customerData[k].filter_option.discount, parseInt(k))
        this.checkTitle(this.customerData[k].title, parseInt(k))
        this.checkDesc(this.customerData[k].desc, parseInt(k))
      }
      return this.checkAll == this.customerData.length
        && this.levelId.length == 0
        && this.paymentId.length == 0
        && this.discountId.length == 0
        && this.titleId.length == 0
        && this.descId.length == 0
    },
    remove(index) {
      this.customerDataMod = this.customerDataMod.filter(o => {
        return o.filter_option.index !== index
      })
      this.customerData = this.customerData.filter(o => {
        return o.filter_option.index !== index
      })
    },
    reset() {
      this.levelId = []
      this.content = []
      this.paymentId = []
      this.payContent = []
      this.disContent = []
      this.discountId = []
      this.titleContent = []
      this.titleId = []
      this.descId = []
      this.descContent = []
      this.init()
    },
    processLevelData() {
      this.customerData.forEach(o => {
        this.customerDataMod.forEach(data => {
          if (o.id === data.id) {
            data.title = o.title
            data.title = o.title
            data.desc = o.desc
            data.filter_option.purchase_times_normal = o.filter_option.purchase_times_normal
            data.filter_option.purchase_times_normal = o.filter_option.purchase_times_normal
            data.filter_option.payment_normal = o.filter_option.payment_normal
            data.filter_option.applyMoreCondition = o.filter_option.applyMoreCondition
            data.filter_option.discount = o.filter_option.discount
            data.filter_option.showMoreCondition = o.filter_option.showMoreCondition
          }
        })
      })
      return {
        groups: this.memberLevelAiData.concat(this.customerDataMod),
        settings: this.memberLevelData.settings
      }
    },
    addGrade() {
      var newGrade = {}
      this.addInitData(this.customerDataMod[this.customerDataMod.length - 1]).then(data => {
        newGrade = data
        newGrade.id = this.customerDataMod.length + '_temp'
        newGrade.title = ''
        newGrade.desc = ''
        newGrade.filter_option.purchase_times_normal++
        newGrade.filter_option.index = this.customerDataMod.length
        newGrade.filter_option.payment = 0.00
        this.customerDataMod.push(newGrade)
        this.customerData.push(newGrade)
      })
    },
    //验证是否重复名称
    isRepeat(name, id) {
      var _tempData = this.customerDataMod
      for(var i in _tempData) {
        if(_tempData[i].title == name && i != id) {
          return true
        }
      }
      return false
    },
    checkTitle(value, id) {
      var that = this;
      if (value == '') {
        if (that.titleId.indexOf(id) < 0) {
          that.titleId.push(id)
          that.titleContent.push('不能为空')
        } else {
          that.titleContent.splice(that.titleId.indexOf(id), 1)
          that.titleId.splice(that.titleId.indexOf(id), 1)
          that.titleId.push(id)
          that.titleContent.push('不能为空')
        }
      }else if(this.isRepeat(value, id)) {
        if (that.titleId.indexOf(id) < 0) {
          that.titleId.push(id)
          that.titleContent.push('名称不能相同')
        } else {
          that.titleContent.splice(that.titleId.indexOf(id), 1)
          that.titleId.splice(that.titleId.indexOf(id), 1)
          that.titleId.push(id)
          that.titleContent.push('名称不能相同')
        }
      } else {
        if (that.titleId.indexOf(id) >= 0) {
          that.titleContent.splice(that.titleId.indexOf(id), 1)
          that.titleId.splice(that.titleId.indexOf(id), 1)
        }
      }
    },
    checkDesc(value, id) {
      var that = this;
      if (value == '') {
        if (that.descId.indexOf(id) < 0) {
          that.descId.push(id)
          that.descContent.push('不能为空')
        } else {
          that.descContent.splice(that.descId.indexOf(id), 1)
          that.descId.splice(that.descId.indexOf(id), 1)
          that.descId.push(id)
          that.descContent.push('不能为空')
        }
      } else {
        if (that.descId.indexOf(id) >= 0) {
          that.descContent.splice(that.descId.indexOf(id), 1)
          that.descId.splice(that.descId.indexOf(id), 1)
        }
      }
    },
    checkNum(value, id) {
      var reg = /^\+?[0-9]\d*$/g;
      var that = this;
      if (value == '') {
        if (that.levelId.indexOf(id) < 0) {
          that.levelId.push(id)
          that.content.push('不能为空')
        } else {
          that.content.splice(that.levelId.indexOf(id), 1)
          that.levelId.splice(that.levelId.indexOf(id), 1)
          that.levelId.push(id)
          that.content.push('不能为空')
        }

      } else if (!reg.test(value)) {
        if (that.levelId.indexOf(id) < 0) {
          that.levelId.push(id)
          that.content.push('请输入整数')
        } else {
          that.content.splice(that.levelId.indexOf(id), 1)
          that.levelId.splice(that.levelId.indexOf(id), 1)
          that.levelId.push(id)
          that.content.push('请输入整数')
        }

      } else {
        if (that.levelId.indexOf(id) >= 0) {
          that.content.splice(that.levelId.indexOf(id), 1)
          that.levelId.splice(that.levelId.indexOf(id), 1)
        }
      }
    },
    checkPayment(value, id) {
      var reg = /^[0-9]+(.[0-9]{1,2})?$/g;
      var that = this;
      if (value === '') {
        if (that.paymentId.indexOf(id) < 0) {
          that.paymentId.push(id)
          that.payContent.push('不能为空')
        } else {
          that.payContent.splice(that.paymentId.indexOf(id), 1)
          that.paymentId.splice(that.paymentId.indexOf(id), 1)
          that.paymentId.push(id)
          that.payContent.push('不能为空')
        }
      } else if (!reg.test(value)) {
        if (that.paymentId.indexOf(id) < 0) {
          that.paymentId.push(id)
          that.payContent.push('请输入一个数字(小数点后最多有二位)')
        } else {
          that.payContent.splice(that.paymentId.indexOf(id), 1)
          that.paymentId.splice(that.paymentId.indexOf(id), 1)
          that.paymentId.push(id)
          that.payContent.push('请输入一个数字(小数点后最多有二位)')
        }
      } else {
        if (that.paymentId.indexOf(id) >= 0) {
          that.payContent.splice(that.paymentId.indexOf(id), 1)
          that.paymentId.splice(that.paymentId.indexOf(id), 1)
        }
      }
    },
    checkDiscount(value, id) {
      // var reg = /^[1-9]([.]{1}[1-9])?$/
      var reg = /^[0-9]([.][1-9]{1,2})?$/
      var that = this
      if(value === 10 || value === '10') {
        if (that.discountId.indexOf(id) >= 0) {
          that.disContent.splice(that.discountId.indexOf(id), 1)
          that.discountId.splice(that.discountId.indexOf(id), 1)
        }
      }else if (value == '') {
        if (that.discountId.indexOf(id) < 0) {
          that.discountId.push(id)
          that.disContent.push('请输入折扣')
        } else {
          that.disContent.splice(that.discountId.indexOf(id), 1)
          that.discountId.splice(that.discountId.indexOf(id), 1)
          that.discountId.push(id)
          that.disContent.push('请输入折扣')
        }
      } else if (!reg.test(value)) {
        if (that.discountId.indexOf(id) < 0) {
          that.discountId.push(id)
          that.disContent.push('折扣格式输入错误')
        } else {
          that.disContent.splice(that.discountId.indexOf(id), 1)
          that.discountId.splice(that.discountId.indexOf(id), 1)
          that.discountId.push(id)
          that.disContent.push('折扣格式输入错误')
        }
      } else {
        if (that.discountId.indexOf(id) >= 0) {
          that.disContent.splice(that.discountId.indexOf(id), 1)
          that.discountId.splice(that.discountId.indexOf(id), 1)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/variable.scss';
.grade_custom {
  position: relative;
  font-size: 12px;
  .header_word {
    margin: 20px 0px 5px 10px;
  }
  .form_head {
    height: 35px;
    margin: 0;
    padding: 0px 5px;
    border-top: 1px solid rgb(223, 232, 236);
    border-bottom: 1px solid rgb(223, 232, 236);
    background-image:linear-gradient(-180deg, #ffffff 0%, $modal-bg 100%);
    background-color: initial;
    .el-row .el-col {
      line-height: 35px;
      color: $coffe;
      font-size: $menuFontSize;
      font-weight: bold;
    }
  }
  .header {
    .el-row {
      margin: 10px 0px;
    }
  }
}


.el-col {
  height: 30px;
  line-height: 30px;
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

.validRow {
  margin-bottom: 16px;
  .el-form-item {
    display: inline-block;
  }
}

.validRow_noMargin {
  .el-form-item {
    display: inline-block;
  }
}
</style>
