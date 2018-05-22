<template>
  <div v-if="showTop">
    <div class="grade_header">
      <el-radio v-model="active" label='NO_PRICE'>不区分客单价高低</el-radio>
    </div>
    <div class="grade_table" v-show="active === 'NO_PRICE'">
      <el-table :data="noPrice" style="width: 100%">
        <el-table-column prop="title" :render-header="utils.appendTip(toolContent1)" min-width="90px" label="等级名称">
          <template scope='scope'>
            <el-input v-model="scope.row.title"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="desc" min-width="90px" label="会员等级">
        </el-table-column>
        <el-table-column min-width="200px" label="满足条件">
          <template scope="scope">
            <el-tooltip content='按照合并相邻时间订单后购物行为次数计算，并非按照订单数计算' placement="top-start" popper-class='tool_notes' effect="dark">
              <i class="iconfont icon-help1 toolGanTanHao"></i>
            </el-tooltip>
            <span>购物次数：</span>
            <el-tooltip class="item" effect="dark" :manual="true" :value='levelId.indexOf(scope.row.id)>=0' :content="levelId.indexOf(scope.row.id)>=0 ? content[levelId.indexOf(scope.row.id)] : ''" placement="top">
              <span class="input_s_s r">
                <el-input v-model="scope.row.filter_option.purchase_times" @change='checkNum(scope.row.filter_option.purchase_times,scope.row.id)'></el-input>
              </span>
            </el-tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-tooltip content='交易成功后总金额，扣除退款' placement="top-start" popper-class='tool_notes' effect="dark">
              <i class="iconfont icon-help1 toolGanTanHao"></i>
            </el-tooltip>
            <span>购物金额：</span>
            <el-tooltip class="item" effect="dark" :manual="true" :value='paymentId.indexOf(scope.row.id)>=0' :content="paymentId.indexOf(scope.row.id)>=0 ? payContent[paymentId.indexOf(scope.row.id)] : ''" placement="top">
              <span class="input_s r">
                <el-input v-model="scope.row.filter_option.payment" @change='checkPayment(scope.row.filter_option.payment,scope.row.id)'>
                  <template slot="append">元</template>
                </el-input>
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column min-width="200px" :render-header="utils.appendTip(toolContent2)" v-if="jurisdictionData.allShow" label="会员权益-折上折">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" :manual="true" :value='discountId.indexOf(scope.row.id)>=0' :content="discountId.indexOf(scope.row.id)>=0 ? disContent[discountId.indexOf(scope.row.id)] : ''" placement="top">
              <span class="input_s r">
                <el-input v-model="scope.row.filter_option.discount" @change='checkDiscount(scope.row.filter_option.discount,scope.row.id)'>
                  <template slot="append">折</template>
                </el-input>
              </span>
            </el-tooltip>
            <!--<el-tooltip content='基于当前全网会员最低价基础上再进行的折扣，并非直接原价折扣，此折扣不会与CRM 设置的会员专享价冲突，不会在CRM 内部再次产生折上折请特别注意' placement="top-start" popper-class='tool_notes' effect="dark">
              <i class="iconfont icon-help1 toolGanTanHao"></i>
            </el-tooltip>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="grade_header">
      <el-radio v-model="active" label='HAS_PRICE'>区分客单价高低</el-radio>
      <el-tooltip content='AI引擎基于最近一年用户的购买客单价均值计算高中低端' placement="top-start" popper-class='tool_notes' effect="dark">
        <i class="iconfont icon-help1 toolGanTanHao"></i>
      </el-tooltip>
    </div>
    <div class="grade_table" v-show="active === 'HAS_PRICE'">
      <el-table :data="hasPrice" style="width: 100%">
        <el-table-column prop="title" :render-header="utils.appendTip(toolContent1)" min-width="90px" label="等级名称">
          <template scope='scope'>
            <el-input v-model="scope.row.title"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="desc" min-width="90px" label="会员等级">
        </el-table-column>
        <el-table-column min-width="90px" :render-header="utils.appendTip(toolContent3)" prop="filter_option.title" label="客单价">
          <template scope='scope'>
            {{scope.row.filter_option.title}}
          </template>
        </el-table-column>
        <el-table-column min-width="200px" :render-header="utils.appendTip(toolContent4)" label="满足条件">
          <template scope="scope">
            <el-tooltip content='按照合并相邻时间订单后购物行为次数计算，并非按照订单数计算' placement="top-start" popper-class='tool_notes' effect="dark">
              <i class="iconfont icon-help1 toolGanTanHao"></i>
            </el-tooltip>
            <span>购物次数：</span>
            <el-tooltip class="item" effect="dark" :manual="true" :value='levelId.indexOf(scope.row.id)>=0' :content="levelId.indexOf(scope.row.id)>=0 ? content[levelId.indexOf(scope.row.id)] : ''" placement="top">
              <span class="input_s_s r">
                <el-input v-model="scope.row.filter_option.purchase_times" @change='checkNum(scope.row.filter_option.purchase_times,scope.row.id)'></el-input>
              </span>
            </el-tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-tooltip content='交易成功后总金额，扣除退款' placement="top-start" popper-class='tool_notes' effect="dark">
              <i class="iconfont icon-help1 toolGanTanHao"></i>
            </el-tooltip>
            <span>购物金额：</span>
            <el-tooltip class="item" effect="dark" :manual="true" :value='paymentId.indexOf(scope.row.id)>=0' :content="paymentId.indexOf(scope.row.id)>=0 ? payContent[paymentId.indexOf(scope.row.id)] : ''" placement="top">
              <span class="input_s r">
                <el-input v-model="scope.row.filter_option.payment" @change='checkPayment(scope.row.filter_option.payment,scope.row.id)'>
                  <template slot="append">元</template>
                </el-input>
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column min-width="200px" :render-header="utils.appendTip(toolContent2)" v-if="jurisdictionData.allShow" label="会员权益-折上折">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" :manual="true" :value='discountId.indexOf(scope.row.id)>=0' :content="discountId.indexOf(scope.row.id)>=0 ? disContent[discountId.indexOf(scope.row.id)] : ''" placement="top">
              <span class="input_s r">
                <el-input v-model="scope.row.filter_option.discount" @change='checkDiscount(scope.row.filter_option.discount,scope.row.id)'>
                  <template slot="append">折</template>
                </el-input>
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="form-bottom">
      <el-button type="primary" class="btn-save middle" @click="save">
        <span class="iconfont icon-save"></span>保存
      </el-button>
      <el-button type="primary" class="btn-saveAs middle" @click="reset">重置
      </el-button>
    </div>
  </div>
  <div v-else>
    <div class="grade_header">
      <el-radio v-model="active" label='HAS_PRICE'>区分客单价高低</el-radio>
      <el-tooltip content='AI引擎基于最近一年用户的购买客单价均值计算高中低端' placement="top-start" popper-class='tool_notes' effect="dark">
        <i class="iconfont icon-help1 toolGanTanHao"></i>
      </el-tooltip>
    </div>
    <div class="grade_table" v-show="active === 'HAS_PRICE'">
      <el-table :data="hasPrice" style="width: 100%">
        <el-table-column prop="title" :render-header="utils.appendTip(toolContent1)" min-width="90px" label="等级名称">
          <template scope='scope'>
            <el-input v-model="scope.row.title"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="desc" min-width="90px" label="会员等级">
        </el-table-column>
        <el-table-column min-width="90px" :render-header="utils.appendTip(toolContent3)" prop="filter_option.title" label="客单价">
          <template scope='scope'>
            {{scope.row.filter_option.title}}
          </template>
        </el-table-column>
        <el-table-column min-width="200px" :render-header="utils.appendTip(toolContent4)" label="满足条件">
          <template scope="scope">
            <el-tooltip content='按照合并相邻时间订单后购物行为次数计算，并非按照订单数计算' placement="top-start" popper-class='tool_notes' effect="dark">
              <i class="iconfont icon-help1 toolGanTanHao"></i>
            </el-tooltip>
            <span>购物次数：</span>
            <el-tooltip class="item" effect="dark" :manual="true" :value='levelId.indexOf(scope.row.id)>=0' :content="levelId.indexOf(scope.row.id)>=0 ? content[levelId.indexOf(scope.row.id)] : ''" placement="top">
              <span class="input_s_s r">
                <el-input v-model="scope.row.filter_option.purchase_times" @change='checkNum(scope.row.filter_option.purchase_times,scope.row.id)'></el-input>
              </span>
            </el-tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-tooltip content='交易成功后总金额，扣除退款' placement="top-start" popper-class='tool_notes' effect="dark">
              <i class="iconfont icon-help1 toolGanTanHao"></i>
            </el-tooltip>
            <span>购物金额：</span>
            <el-tooltip class="item" effect="dark" :manual="true" :value='paymentId.indexOf(scope.row.id)>=0' :content="paymentId.indexOf(scope.row.id)>=0 ? payContent[paymentId.indexOf(scope.row.id)] : ''" placement="top">
              <span class="input_s r">
                <el-input v-model="scope.row.filter_option.payment" @change='checkPayment(scope.row.filter_option.payment,scope.row.id)'>
                  <template slot="append">元</template>
                </el-input>
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column min-width="200px" :render-header="utils.appendTip(toolContent2)" v-if="jurisdictionData.allShow" label="会员权益-折上折">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" :manual="true" :value='discountId.indexOf(scope.row.id)>=0' :content="discountId.indexOf(scope.row.id)>=0 ? disContent[discountId.indexOf(scope.row.id)] : ''" placement="top">
              <span class="input_s r">
                <el-input v-model="scope.row.filter_option.discount" @change='checkDiscount(scope.row.filter_option.discount,scope.row.id)'>
                  <template slot="append">折</template>
                </el-input>
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="grade_header">
      <el-radio v-model="active" label='NO_PRICE'>不区分客单价高低</el-radio>
    </div>
    <div class="grade_table" v-show="active === 'NO_PRICE'">
      <el-table :data="noPrice" style="width: 100%">
        <el-table-column prop="title" :render-header="utils.appendTip(toolContent1)" min-width="90px" label="等级名称">
          <template scope='scope'>
            <el-input v-model="scope.row.title"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="desc" min-width="90px" label="会员等级">
        </el-table-column>
        <el-table-column min-width="200px" label="满足条件">
          <template scope="scope">
            <el-tooltip content='按照合并相邻时间订单后购物行为次数计算，并非按照订单数计算' placement="top-start" popper-class='tool_notes' effect="dark">
              <i class="iconfont icon-help1 toolGanTanHao"></i>
            </el-tooltip>
            <span>购物次数：</span>
            <el-tooltip class="item" effect="dark" :manual="true" :value='levelId.indexOf(scope.row.id)>=0' :content="levelId.indexOf(scope.row.id)>=0 ? content[levelId.indexOf(scope.row.id)] : ''" placement="top">
              <span class="input_s_s r">
                <el-input v-model="scope.row.filter_option.purchase_times" @change='checkNum(scope.row.filter_option.purchase_times,scope.row.id)'></el-input>
              </span>
            </el-tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-tooltip content='交易成功后总金额，扣除退款' placement="top-start" popper-class='tool_notes' effect="dark">
              <i class="iconfont icon-help1 toolGanTanHao"></i>
            </el-tooltip>
            <span>购物金额：</span>
            <el-tooltip class="item" effect="dark" :manual="true" :value='paymentId.indexOf(scope.row.id)>=0' :content="paymentId.indexOf(scope.row.id)>=0 ? payContent[paymentId.indexOf(scope.row.id)] : ''" placement="top">
              <span class="input_s r">
                <el-input v-model="scope.row.filter_option.payment" @change='checkPayment(scope.row.filter_option.payment,scope.row.id)'>
                  <template slot="append">元</template>
                </el-input>
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column min-width="200px" :render-header="utils.appendTip(toolContent2)" v-if="jurisdictionData.allShow" label="会员权益-折上折">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" :manual="true" :value='discountId.indexOf(scope.row.id)>=0' :content="discountId.indexOf(scope.row.id)>=0 ? disContent[discountId.indexOf(scope.row.id)] : ''" placement="top">
              <span class="input_s r">
                <el-input v-model="scope.row.filter_option.discount" @change='checkDiscount(scope.row.filter_option.discount,scope.row.id)'>
                  <template slot="append">折</template>
                </el-input>
              </span>
            </el-tooltip>
            <!--<el-tooltip content='基于当前全网会员最低价基础上再进行的折扣，并非直接原价折扣，此折扣不会与CRM 设置的会员专享价冲突，不会在CRM 内部再次产生折上折请特别注意' placement="top-start" popper-class='tool_notes' effect="dark">
              <i class="iconfont icon-help1 toolGanTanHao"></i>
            </el-tooltip>-->
          </template>
        </el-table-column>
      </el-table>
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
import utils from '../../../misc/utils'
export default {
  data() {
    return {
      aiData: {},
      active: '',
      active_old: '',
      utils: utils,
      hasPrice: [],
      content: [],
      levelId: [],
      noPrice: [],
      paymentId: [],
      payContent: [],
      discountId: [],
      disContent: [],
      showTop: true,
      toolContent1: '【注释】可修改',
      toolContent2: '【注释】基于当前全网会员最低价基础上再进行的折扣，并非直接原价折扣，此折扣不会与CRM 设置的会员专享价冲突，不会在CRM 内部再次产生折上折请特别注意',
      toolContent3: '【注释】AI根据客单价自动管理，人为不能干预',
      toolContent4: '【注释】数值为大于等于'
    }
  },
  computed: {
    ...mapGetters([
      'memberLevelData',
      'memberLevelAiData',
      'memberLevelCustomData',
      'jurisdictionData',
    ])
  },
  mounted() {
    if (!this.memberLevelData.groups) {
      this.getMemberLevel()
    } else {
      this.init()
    }
  },
  watch: {
    memberLevelAiData() {
      this.init()
    }
  },
  beforeMount() {
    if(this.memberLevelData.settings[0].config_value === "HAS_PRICE") {
        this.showTop = false
      }else {
        this.showTop = true
      }
  },
  // beforeCreate() {
  //   this.getMemberLevel()
  // },
  created() {
    this.getMemberLevel()
      if(this.memberLevelData.settings[0].config_value === "HAS_PRICE") {
        this.showTop = false
      }else {
        this.showTop = true
      }
  },
  methods: {
    ...mapActions([
      'getMemberLevel',
      'saveMemberLevel',
      'getMemberGroup',
      // 'getComponentName'
    ]),
    init() {
      if (this.memberLevelData.settings) {
        this.aiData = JSON.parse(JSON.stringify(this.memberLevelAiData))
        this.active = this.getActive()
        this.active_old = this.active
        this.hasPrice = this.getHasPrice(this.aiData)
        this.noPrice = this.getNoPrice(this.aiData)
      }
    },
    save() {
      var that = this;
      if (this.isValid()) {
        this.getSavePromise().then(o => {
          utils.showSuccessMsg(that, '保存成功')
          that.$router.push('/memberManage/home')
          that.getMemberLevel()
          that.getMemberGroup()
          // that.getComponentName()
        })
      }
    },
    // 返回保存接口的 promise
    getSavePromise() {
      return this.saveMemberLevel(this.processLevelData())
    },
    // 表单是否通过验证
    isValid() {
      this.levelId = []
      this.paymentId = []
      this.discountId = []
      this.content = []
      this.payContent = []
      this.disContent = []
      if(this.active === 'NO_PRICE') {
        for (var i in this.noPrice) {
          this.checkNum(this.noPrice[i].filter_option.purchase_times, this.noPrice[i].id)
          this.checkPayment(this.noPrice[i].filter_option.payment, this.noPrice[i].id)
          this.checkDiscount(this.noPrice[i].filter_option.discount, this.noPrice[i].id)
        }
      }else {
        for (var j in this.hasPrice) {
          this.checkNum(this.hasPrice[j].filter_option.purchase_times, this.hasPrice[j].id)
          this.checkPayment(this.hasPrice[j].filter_option.payment, this.hasPrice[j].id)
          this.checkDiscount(this.hasPrice[j].filter_option.discount, this.hasPrice[j].id)
        }
      }
      return this.levelId.length == 0 && this.paymentId.length == 0 && this.discountId.length == 0
    },
    reset() {
      this.init()
    },
    processLevelData() {
      var _settings = this.memberLevelData.settings.map(o => {
        if (o.config_name === 'CRM_AI') {
          o.config_value = this.active
        }
        return o
      })
      return {
        groups: this.memberLevelCustomData.concat(this.noPrice.concat(this.hasPrice)),
        settings: _settings
      }
    },
    getActive() {
      return this.memberLevelData.settings.filter(o => {
        return o.config_name === 'CRM_AI'
      })[0].config_value
    },
    getNoPrice(list) {
      if (!list) return []
      var _list = list.filter(o => {
        return o.is_system &&
          (o.title === '铸铁会员'
            || o.title === '青铜会员'
            || o.title === '白银会员'
            || o.title === '黄金会员'
            || o.title === '钛金会员')
      })
      return _list
    },
    getHasPrice(list) {
      if (!list) return []
      var ret = this.active_old === 'NO_PRICE'
      var _list = list.filter(o => {
        return o.is_system &&
          (o.title !== '铸铁会员'
            && o.title !== '青铜会员'
            && o.title !== '白银会员'
            && o.title !== '黄金会员'
            && o.title !== '钛金会员')
      })
      return _list
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
      if (value == '') {
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
.grade_header {
  height: 40px;
  line-height: 40px;
  border-bottom: solid 1px #dfe8ec;
  .el-radio {
    margin-left: 30px;
    color: #0099ff;
    font-weight: bold;
  }
}

.el-row {
  margin: 10px 0px;
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

.borderRed {
  border-color: red;
}
</style>
