<template>
  <div class="globalSettings">
    <div class="sub_main_content">
      <div class="subTitle">
        <el-tooltip :content='tooltipContent1' placement="top-start" popper-class='tool_notes' effect="dark">
          <i class="iconfont icon-help1 toolGanTanHao"></i>
        </el-tooltip>
        <span>同一ID发送短信限制</span>
      </div>
      <div class="form-control">
        <div class="form-group">
          <div class="title-content">
            <label>
              新购物后7天内：
            </label>
          </div>
          <div class="elment_content">
            <el-select class="el-input-sm" v-model="settingData.newSevenDay">
              <el-option v-for="data in options" :label="data.label" :value="data.value" :key="data.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form-group">
          <div class="title-content">
            <label>
              新购物后8-30天内：
            </label>
          </div>
          <div class="elment_content">
            <el-select class="el-input-sm" v-model="settingData.newEight">
              <el-option v-for="data in options" :label="data.label" :value="data.value" :key="data.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form-group">
          <div class="title-content">
            <label>
              最近30天内无购物用户：
            </label>
          </div>
          <div class="elment_content">
            <el-select class="el-input-sm" v-model="settingData.nobuy">
              <el-option v-for="data in options" :label="data.label" :value="data.value" :key="data.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="subTitle">
        <el-tooltip :content='tooltipContent2' placement="top-start" popper-class='tool_notes' effect="dark">
          <i class="iconfont icon-help1 toolGanTanHao"></i>
        </el-tooltip>
        <span>同一ID相邻订单合并规则</span>
      </div>
      <div class="form-control">
        <div class="form-group">
          <div class="elment_content _align">
            同ID相邻
            <el-select v-model="settingData.time" class="el-input-sm">
              <el-option v-for="item in vm.sel_times" :label="item.label" :value="item.value" :key="item.value">
              </el-option>
            </el-select>
            内的订单CRM默认合并成一个订单进行计算
            <el-checkbox v-show="jurisdictionData.allShow" class="_align" true-label="1" false-label="0" v-model="settingData.isCover">
              覆盖之前合并数据
            </el-checkbox>
          </div>
        </div>
      </div>
      <div class="subTitle">
        店铺相关设置
      </div>
      <div>
        <div class="form-group">
          <el-form :model="vm" :rules="rules" ref="vm" label-width="120px" style="padding-top: 20px">
            <el-form-item label="店铺签名：" label-width='160px' prop="signName">
              <!--临时修改要录视频-->
              <el-col :span="16" v-if='jurisdictionData.secondShow'>
                <el-input v-model='vm.signName_change' style="width: 180px;" disabled></el-input>
              </el-col>
              <el-col :span="16" v-else>
                <el-input v-model="vm.signName" style="width: 180px;" disabled></el-input>
              </el-col>

            </el-form-item>
          <!--</el-form>
          <el-form :model="vm" :rules="rules" ref="vm" label-width="120px">-->
            <el-form-item label="店铺发货节点：" label-width='160px' prop="deliveNode">
              <el-col :span="16" style="font-size: 12px;">
                每天
                <el-time-select style="width: 85px;" v-model="settingData.deliveNode" :picker-options="{
                          start: '00:00',
                          step: '00:15',
                          end: '24:00'
                        }" placeholder="选择时间">
                </el-time-select>
                之前付款的订单当天发出
              </el-col>
            </el-form-item>
            <el-form-item v-if="false" label="会员流转初始化：" label-width='160px' prop="isInitialization">
              <el-col :span="24" style="font-size: 12px;">
                <!--双11会员流转功能关闭-->
                <!--<el-tooltip :value='isToolShow'  content='暂未开放' placement="top" popper-class='tool_notes' effect="dark">
                  <el-checkbox v-model="settingData.isInitialization" @mouseleave="isToolShow = false" @mouseenter="isToolShow = true" @change='checkChoose()' true-label="1" false-label="0" :disabled="true" >会员数据全量运算一次</el-checkbox>
                </el-tooltip>-->
                <el-checkbox v-model="settingData.isInitialization" @change='checkChoose()' true-label="1" false-label="0" :disabled="settingGlobal.IS_INITIALIZATION === 'true' ? true : settingGlobal.IS_INITIALIZATION === '1' ? true : false">会员数据全量运算一次</el-checkbox>
                <span class="note" style="margin-left: 18px;">注释：历史订单全部导入后再运行，每个店铺仅限运算1次，24小时内生效</span>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="subTitle">
        隐私设置
      </div>
      <div class="form-control">
        <div class="form-group">
          <div class="elment_content _setHid">
            <div>
              <el-checkbox v-model="settingData.hidID" true-label="1" false-label="0">在CRM内隐藏淘宝会员ID</el-checkbox>
            </div>
            <div>
              <el-checkbox v-model="settingData.hidPhone" true-label="1" false-label="0">在CRM内隐藏手机号</el-checkbox>
            </div>
            <div>
              <el-checkbox v-model="settingData.hidName" true-label="1" false-label="0">在CRM内隐藏姓名</el-checkbox>
            </div>
            <p>隐藏示例：原淘宝名“abcdefg”，隐藏后“a*****g”</p>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog_footer">
      <el-button @click="close()">关闭</el-button>
      <el-button type="primary" @click="save('vm')">保存</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import userService from '../../service/user.service'
import utils from '../../misc/utils'
export default {
  data() {
    return {
      isToolShow: false,
      utils: utils,
      tooltipContent1: '指同一个买家，系统推送信息的最高值，当发送条数超过限制后的信息皆不发送，防止骚扰到用户。',
      tooltipContent2: '更改合并时间后，之前的历史数据不会变更，仅对后续订单有效。',
      vm: {
        signName: '',
        signName_change: '',
        activeTabName: '全局设置',
        deliveNode: '',
        initialization: false,
        sel_times: [{
          value: '0',
          label: '0小时-不合并'
        }, {
          value: '2',
          label: '2小时'
        }, {
          value: '6',
          label: '6小时'
        }, {
          value: '12',
          label: '12小时'
        }, {
          value: '24',
          label: '24小时'
        }, {
          value: '48',
          label: '48小时'
        }, {
          value: '72',
          label: '72小时'
        }]
      },
      hidID: false,
      hidName: false,
      hidPhone: false,
      options: [{ label: "1条/天", value: "1" }, { label: "2条/天", value: "2" }, { label: "3条/天", value: "3" }, { label: "4条/天", value: "4" }],
      settingData: {
        newEight: '',
        newSevenDay: '',
        nobuy: '',
        time: '',
        isCover: '',
        hidID: '',
        hidName: '',
        hidPhone: '',
        deliveNode: '',
        isInitialization: "0"
      },
      rules: {
        signName: [
          { required: true, message: '店铺签名不能为空', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'settingGlobal',
      'subState',
      'userData',
      'jurisdictionData'
    ])
  },
  watch: {
    settingGlobal() {
      this.settingData.newEight = this.settingGlobal.PAYED_IN_MONTH
      this.settingData.newSevenDay = this.settingGlobal.PAYED_IN_WEEK
      this.settingData.nobuy = this.settingGlobal.NOPAYED_IN_MONTH
      this.settingData.time = this.settingGlobal.MERGED_TRADE_INTERVAL
      this.settingData.isCover = this.settingGlobal.MERGED_TRADE_ISCOVER
      this.settingData.hidID = this.settingGlobal.IS_HIDE_ID
      this.settingData.hidName = this.settingGlobal.IS_HIDE_NAME
      this.settingData.hidPhone = this.settingGlobal.IS_HIDE_PHONE
      this.settingData.deliveNode = this.settingGlobal.CONSIGN_NODE
      // this.settingData.isInitialization = this.settingGlobal.IS_INITIALIZATION === 'true' ? true : false
      this.settingData.isInitialization = this.settingGlobal.IS_INITIALIZATION === 'true' ? '1' : this.settingGlobal.IS_INITIALIZATION === 'false' ? '0' : this.settingGlobal.IS_INITIALIZATION
    },
    subState() {
      if (this.subState === 'globalSetting') {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions([
      'updateOpenModal',
      'getSettingGlobal',
      'updateSettingGlobal',
      'getUser'
    ]),
    init() {
      this.settingData.newEight = this.settingGlobal.PAYED_IN_MONTH
      this.settingData.newSevenDay = this.settingGlobal.PAYED_IN_WEEK
      this.settingData.nobuy = this.settingGlobal.NOPAYED_IN_MONTH
      this.settingData.time = this.settingGlobal.MERGED_TRADE_INTERVAL
      this.settingData.isCover = this.settingGlobal.MERGED_TRADE_ISCOVER
      this.settingData.hidID = this.settingGlobal.IS_HIDE_ID
      this.settingData.hidName = this.settingGlobal.IS_HIDE_NAME
      this.settingData.hidPhone = this.settingGlobal.IS_HIDE_PHONE
      this.settingData.deliveNode = this.settingGlobal.CONSIGN_NODE
      // this.settingData.isInitialization = this.settingGlobal.IS_INITIALIZATION === 'true' ? true : false
      this.settingData.isInitialization = this.settingGlobal.IS_INITIALIZATION === 'true' ? '1' : this.settingGlobal.IS_INITIALIZATION === 'false' ? '0' : this.settingGlobal.IS_INITIALIZATION
      this.vm.signName = this.userData.sign
      this.vm.signName_change = this.userData.sign.substr(0, 1) + this.userData.sign.substr(0, this.userData.sign.length - 2).replace(/./g, '*') + this.userData.sign.substr(-1)
    },
    checkChoose () {
      var that = this
      if(this.settingGlobal.IS_INITIALIZATION === 'false' || this.settingGlobal.IS_INITIALIZATION === '0') {
        if(this.settingData.isInitialization === 'true' || this.settingData.isInitialization === '1') {
          that.$confirm('会员流转初始化-每个店铺仅限运行1次，并且全量流转需要24小时完成，在此期间运行任务可能会受到影响，请亲谨慎选择^_^', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '放弃',
          closeOnPressEscape: false,
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
        }).catch(() => {
          this.settingData.isInitialization = '0'
          });
        }
      }
    },
    close() {
      this.updateOpenModal({
        name: 'systemConfig',
        param: {
          state: 'close'
        }
      })
    },
    save(formName) {
      var that = this
      // 验证短信签名长度，现在不能修改先注释
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
          this.updateSettingGlobal(this.settingData).then(() => {
            // 店铺签名目前不能被修改
            // userService.updataSignName(this.vm.signName).then(() => {
              utils.showSuccessMsg(this, '保存成功', () => {
                that.getSettingGlobal()
              })
              // this.getUser()
            // })
          })
      //   }
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.globalSettings {
  position: relative;
  .g_title {
    width: 1.5px;
    border: 1px solid #0BB8F8;
    margin-right: 8px;
  }
  .form-control {
    .form-group {
      .title-content {
        display: inline-block;
        text-align: right;
        width: 160px;
        margin-right: 5px;
        color: #333;
      }
      margin: 10px 0 10px 0;
    }
  }
  ._align {
    margin-left: 29px;
  }
  .sel_width {
    .el-input {
      width: 150px;
    }
  }
}

.dialog_footer {
  position: relative;
  margin-top: 90px;
  border-top: solid 1px #ccc;
  .el-button {
    float: right;
    margin: 10px 10px 10px 0px;
  }
}

._setHid {
  margin-left: 80px;
  p {
    color: #afb3bc;
  }
}
</style>
