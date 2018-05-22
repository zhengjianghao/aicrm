<template>
<div class="set_content" >
    <el-form :model="settingsCenterForm" :rules="rules" ref="settingsCenterForm">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item>
              <p>超级管理员称呼：</p>
            </el-form-item>
          </el-col>
            <el-col :span="6">
              <el-form-item prop="superAdminName">
                <el-input v-model="settingsCenterForm.superAdminName"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span='5'>
            <el-form-item>
              <el-tooltip content='用于重要操作的验证' placement="top-start" popper-class='tool_notes' effect="dark">
                <p><i class="iconfont icon-help1 toolGanTanHao"></i>超级管理员手机：</p>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :required="true" prop="superAdminPhone">
              <el-input v-model="settingsCenterForm.superAdminPhone" @change="checkSuperAdminPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span='5'>
            <el-form-item>
            <p>管理员手机验证码：</p>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :required="true" prop="superAdminPhoneCode">
              <el-input style='width: 50%; padding-right: 24px' v-model="settingsCenterForm.superAdminPhoneCode"></el-input>
              <el-button type="primary" size="small" @click="sendSuperAdminCode" :disabled="btnSuperAdminDisable">{{btnSuperAdminText}}</el-button>
            </el-form-item>
          </el-col>
          <!--<el-col :span="4" class="text-right">
            <el-button type="primary" size="small" @click="sendSuperAdminCode" :disabled="btnSuperAdminDisable">{{btnSuperAdminText}}</el-button>
          </el-col>-->
        </el-row>
        <el-row :gutter='10'>
          <el-col :span='5'>
            <el-form-item>
              <el-tooltip content='用于各场景中任务结束等提示信息接收，当不填写时会自动发送到超级管理员手机' placement="top-start" popper-class='tool_notes' effect="dark">
                <p><i class="iconfont icon-help1 toolGanTanHao"></i>信息提醒手机：</p>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item prop="remindPhone">
              <el-input v-model="settingsCenterForm.remindPhone" @blur='isSamePhone' @change='remindPhoneOk'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter='10'>
          <el-col :span='5'>
            <el-form-item>
              <p>提醒手机验证码：</p>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item prop="remindPhoneCode">
              <el-input style='width: 50%; padding-right: 24px' v-model="settingsCenterForm.remindPhoneCode"></el-input>
              <el-button type="primary" size="small" @click="sendRemindCode" :disabled="settingsCenterForm.remindPhone == settingsCenterForm.superAdminPhone || btnRemindDisable">{{btnRemindText}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter='10'>
          <el-col :span='5'>
            <el-form-item>
              <p>联系QQ：</p>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="QQ">
              <el-input v-model="settingsCenterForm.QQ"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter='10'>
          <el-col :span='5'>
            <el-form-item>
              <p>联系旺旺：</p>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="wangwang">
              <el-input v-model="settingsCenterForm.wangwang"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter='10'>
          <el-col :span='5'>
            <el-form-item>
              <p>联系邮箱：</p>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item prop="email">
              <el-input v-model="settingsCenterForm.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter='10'>
          <el-col :span="7" :offset="5">
            <el-form-item>
              <el-button type="primary" @click="submitForm('settingsCenterForm')">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../misc/global.constant'
  import utils from '../../misc/utils'
  export default {
    data() {
      return {
        btnSuperAdminDisable: true,
        btnRemindDisable: true,
        btnSuperAdminText: '发送验证码',
        btnRemindText: '发送验证码',
        utils: utils,
        settingsCenterForm: {
          superAdminName: '',
          superAdminPhone: '',
          superAdminPhoneCode: '',
          remindPhone: '',
          remindPhoneCode: '',
          QQ: '',
          wangwang: '',
          email: ''
        },
        rules: {
          superAdminName: [
            { required: true, message: '超级管理员称呼不能为空', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          superAdminPhone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { validator: utils.checkPhone, trigger: 'blur' }
          ],
          superAdminPhoneCode: [
            { validator: this.checkPhoneCode, trigger: 'blur' }
          ],
          remindPhone: [
            { validator: utils.checkPhone, trigger: 'blur' },
            { validator: this.checkRemindPhone, trigger: 'blur' }
          ],
          remindPhoneCode: [
            { validator: this.checkRemindPhoneCode, trigger: 'blur' }
          ],
          QQ: [
            { validator: utils.checkQQ, trigger: 'blur' }
          ],
          wangwang: [
            { min: 0, max: 20, message: '字符过长', trigger: 'blur' }
          ],
          email: [
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
        ...mapGetters([
          'settingContact',
          'subState'
        ]),
    },
    mounted() {
      this.settingsCenterForm.superAdminName = this.settingContact.ADMIN_NAME
      this.settingsCenterForm.superAdminPhone = this.settingContact.ADMIN_MOBILE
      this.settingsCenterForm.remindPhone = this.settingContact.REMIND_MOBILE
      this.settingsCenterForm.QQ = this.settingContact.QQ
      this.settingsCenterForm.wangwang = this.settingContact.WANGWANG
      this.settingsCenterForm.email = this.settingContact.EMAIL
      this.checkSuperAdminPhone()
      this.remindPhoneOk()
    },
    watch: {
        settingContact() {
          this.init()
        },
        subState() {
          if(this.subState === 'settingsCenter') {
            this.init()
          }
        }
    },
    methods: {
      ...mapActions([
        'sendVerifyCode',
        'getSettingContact',
        'updateSettingContact',
        'updateOpenModal',
        'setCenterAlready'
      ]),
      init() {
        this.settingsCenterForm.superAdminName = this.settingContact.ADMIN_NAME
        this.settingsCenterForm.superAdminPhone = this.settingContact.ADMIN_MOBILE
        this.settingsCenterForm.remindPhone = this.settingContact.REMIND_MOBILE
        this.settingsCenterForm.QQ = this.settingContact.QQ
        this.settingsCenterForm.wangwang = this.settingContact.WANGWANG
        this.settingsCenterForm.email = this.settingContact.EMAIL
        this.settingsCenterForm.superAdminPhoneCode = ''
        this.settingsCenterForm.remindPhoneCode = ''
        this.$refs['settingsCenterForm'].validate()
        this.checkSuperAdminPhone()
        this.remindPhoneOk()
      },
      submitForm(formName) {
        if(this.settingsCenterForm.superAdminPhone == this.settingsCenterForm.remindPhone) {
          this.utils.showErrorMsg(this, '超级管理员与信息提醒手机号码一致的，仅需填写超级管理员手机即可')
        }else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.updateSettingContact(this.settingsCenterForm).then((res) => {
                this.updateOpenModal({
                  name: 'settingsCenter',
                  param: {
                    state: 'closeMe'
                  }
                })
                this.getSettingContact().then(o => {
                  this.setCenterAlready(true)
                })
              }, res => {
                if(res.status_code === 400) {
                  utils.showErrorMsg(this, res.message)
                }
              })
            } else {
              return false;
            }
          })
        }
      },
      checkSuperAdminPhone() {
        var that = this;
        if(this.$refs.settingsCenterForm) {
          this.$refs.settingsCenterForm.validateField('superAdminPhone', (valid) =>  {
            if(!valid) {
                if(that.btnSuperAdminText === '发送验证码') {
                  that.btnSuperAdminDisable = false
                }
            }else {
              that.btnSuperAdminDisable = true
            }
          })
        }
      },
      remindPhoneOk() {
        var that = this;
        this.$refs.settingsCenterForm.validateField('remindPhone', (valid) =>  {
          if(that.settingsCenterForm.remindPhone === '') {
            this.btnRemindDisable = true
          }else if(!valid) {
              if(that.btnRemindText === '发送验证码') {
                that.btnRemindDisable = false
              }
          }else {
              that.btnRemindDisable = true
          }
        })
      },
      //提示手机号是否相同
      isSamePhone() {
        if(this.settingsCenterForm.superAdminPhone == this.settingsCenterForm.remindPhone) {
          this.utils.showErrorMsg(this, '超级管理员与信息提醒手机号码一致的，仅需填写超级管理员手机即可')
        }
      },
      sendSuperAdminCode() {
        var that =this;
        this.sendVerifyCode(this.settingsCenterForm.superAdminPhone)
        this.btnSuperAdminDisable = true
        var s = 60
        var timer = setInterval(() => {
          s--
          if(s > 0) {
            that.btnSuperAdminText = s + "秒后重试"
          } else {
            that.btnSuperAdminText = '发送验证码'
            that.checkSuperAdminPhone()
            clearInterval(timer)
          }
        }, 1000)
      },
      sendRemindCode() {
        var that = this;
        if(this.settingsCenterForm.remindPhone) {
          this.$refs.settingsCenterForm.validateField('remindPhone', (valid) =>  {
            if(!valid) {
              that.btnRemindDisable = true
              var s = 60
              that.sendVerifyCode(that.settingsCenterForm.remindPhone)
              var timer = setInterval(() => {
                s--
                if(s > 0) {
                  that.btnRemindText = s + "秒后重试"
                } else {

                  that.btnRemindText = '发送验证码'
                  that.remindPhoneOk()
                  clearInterval(timer)
                }
              }, 1000);
            }
        })
        }
      },
      checkPhoneCode(rule, value, callback) {
        if(!value) {
          return callback(new Error('验证码不能为空'));
        } else if(!/^\d{6}$/.test(value)) {
          callback(new Error('验证码格式不正确'));
        } else {
          callback()
        }
      },
      checkRemindPhone(rule, value, callback) {
        if(value) {
          this.$refs.settingsCenterForm.validateField('remindPhoneCode')
        } else {
          if(this.settingsCenterForm.remindPhoneCode) {
            return callback(new Error('信息提醒手机不能为空'));
          } else {
            this.$refs.settingsCenterForm.validateField('remindPhoneCode')
          }
        }
        callback()
      },
      checkRemindPhoneCode(rule, value, callback) {
        if(value) {
          if(!/^\d{6}$/.test(value)) {
            return callback(new Error('验证码格式不正确'));
          }
        } else {
          if(this.settingsCenterForm.remindPhone) {
            return callback(new Error('验证码不能为空'));
          }
        }
        callback()
       }
    }
}
</script>
<style lang="scss" scoped>
  .set_content {
    font-size: 12px;
    margin: 18px;
    .el-form {
      margin-left: 10px;
    }
  }
  button:disabled {
    color: #9a9a9a;
  }
  .el-form-item {
    position: relative;
  }
  .el-col {
    p {
      text-align: right;
      font-size: 12px;
    }
  }

</style>
