<template scope="props">
  <!--<div
    ref="taskForm"
    :model="taskForm">
    <msg-edit-temp-send
      :msgContent="message_data.message_text"
      :allLine='jurisdictionData.allshow ? allLine : allLine2'
    >
    </msg-edit-temp-send>
    <div>
      <el-row :gutter="20">
        <el-col :span="3">
          <p>发送时间：</p>
        </el-col>
        <el-col :span="7">
          <el-radio v-model="message_data.send_time_label" label="">即时</el-radio>
        </el-col>
        <el-col :span="14">
          <el-radio v-model="message_data.send_time_label" label="custom">
            定时发送
            <el-select v-model="message_data.send_time" @visible-change='changeTime' :disabled="message_data.send_time_label !== 'custom'" placeholder="请选择" class="el-input-normal">
              <el-option v-for="item in timersList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-radio>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3"><p>发送通道：</p></el-col>
        <el-col :span="7">
          <el-radio v-model="message_data.send_channel" label="LOW">普通短信通道</el-radio>
        </el-col>
        <el-col :span="14">
          <el-radio v-model="message_data.send_channel" label="HIGH">阿里优质短信通道</el-radio>
        </el-col>
      </el-row>
    </div>
    <div class="message_button">
      <el-button type="primary" @click="sendMessage()">发送</el-button>
      <el-button @click="cancelSend()">取消</el-button>
    </div>
  </div>-->
  <send-message-quick :noQuick='true'></send-message-quick>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from '../../misc/utils'
import globalConstant from '../../misc/global.constant'
import sendMessageQuick from './sendMessageQuick'
import moment from 'moment'
export default {
  data () {
    return {
      taskForm: {
        taskName: ''
      },
      utils: utils,
      timersList: [],
      step: 15,
      message_data: {
        phone: [],
        send_time: '',
        send_channel: 'LOW',
        message_text: '回TD退订',
        send_time_label: '',
      },
      k_word: globalConstant.keyword_danger, //非法字符
      allLine: [
        '店铺短链',
        '买家ID',
        '收件人全名',
        '收件人地址'
      ],
      allLine2: [
        '店铺短链',
        '买家ID',
        '收件人全名',
        '收件人地址'
      ]
    }
  },
  watch: {
    openModalState() {
      if(this.openModalState.name === 'maergeSendMessage' && this.openModalState.param && this.openModalState.param.phone) {
        this.message_data.phone = utils.commonArrayUnique(this.openModalState.param.phone)
        this.init()
      }
    },
    //将短信内容改变
    maergeMessage() {
      this.message_data.message_text = this.maergeMessage
    }
  },
  mounted() {
    //第一次点击watch不到openModalState
    this.message_data.phone = utils.commonArrayUnique(this.openModalState.param.phone)
    this.init()
  },
  computed: {
    ...mapGetters([
      'maergeMessage',
      // 'jurisdictionData',
      'openModalState'
    ])
  },
  methods: {
    ...mapActions([
      'closeModal',
      'getMaergeMessage'
    ]),
    init() {
      //初始化数据
      this.message_data.message_text = '回TD退订'
      this.message_data.send_time_label = ''
      this.message_data.send_time = ''
      this.message_data.send_channel = 'LOW'
      this.getMaergeMessage('【签名】回TD退订')
    },
    //验证发送时间
    checkSendTime() {
      // var _time = moment(moment().format('YYYY-MM-DD') + ' 19:45').valueOf()
      // console.log(_test)
      if (this.message_data.send_time_label == '') {
        return true
      } else if (this.message_data.send_time.indexOf(' 隔天') > 0) {
        return true
      } else if (this.message_data.send_time == '') {
        this.$message({
          type: 'warning',
          customClass: 'message_position',
          message: '定时发送时间不能为空'
        })
      } else if (moment(moment().format('YYYY-MM-DD') + ' ' + this.message_data.send_time).valueOf() < moment().valueOf()) {
        this.$message({
          type: 'warning',
          customClass: 'message_position',
          message: '定时发送时间已过请重新选择'
        })
        return false
      } else {
        return true
      }
    },
    //整理传给后端的值
    doChangeData() {
      this.message_data.send_time = this.message_data.send_time_label === '' ? '' : this.message_data.send_time
      this.message_data.message_text = this.message_data.message_text.replace(/回TD退订/g, "")
    },
    sendMessage() {
      // this.message_text = this.maergeMessage
      this.doChangeData()
      var _time = this.checkSendTime()
      if (this.utils.trim(this.message_data.message_text.replace('【签名】', '').replace('回TD退订', '')).length === 0) {
        this.utils.showErrorMsg(this, "请输入短信内容!")
        return
      }
      if(!_time) {
        return
      }
      let that = this
      // this.$confirm('确定发送？', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$message({
      //     type: 'info',
      //     customClass: 'message_position',
      //     message: '已成功发送'
      //   })
      //   console.log(that.message_data)
      //   that.this.closeModal('maergeSendMessage')
      //   that.message_data.message_text = '回TD退订'
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     customClass: 'message_position',
      //     message: '已取消发送'
      //   })
      // })
      this.$confirm('确定发送？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var isOKMessage = that.utils.hasKeywordDanger(that.message_data.message_text, that.k_word, that)
        if (!isOKMessage) {
          that.message_data.send_time = that.message_data.send_time.replace(' 隔天', '')
          // that.API_MESSAGE.sendQuick(that.message_data).then(() => {
            that.$message({
              type: 'success',
              customClass: 'message_position',
              message: '已成功发送'
            })
            // 下次发送需要等待1分钟
            // that.stopSendOneMoment()
            // 关闭弹窗
            that.cancelSend()
            that.message_text = '回TD退订'
          // })
        } else {
          that.$message({
            type: 'error',
            customClass: 'message_position',
            message: '短信内容有违反字符'
          })
        }
      }).catch(() => {
        that.$message({
          type: 'info',
          customClass: 'message_position',
          message: '已取消发送'
        })
      })
    },
    cancelSend() {
      this.closeModal('maergeSendMessage')
    },
    //隔天
    changeTime() {
      var start = moment().format('HH:mm')
      var h = parseInt(start.split(':')[0])
      var m = parseInt(start.split(':')[1])
      if (m >= 0 && m < 15) {
        m = 0
      } else if (m >= 15 && m < 30) {
        m = 15
      } else if (m >= 30 && m < 45) {
        m = 30
      } else if (m >= 45 && m <= 59) {
        m = 45
      }
      var _start = h * 60 + m
      // 一天有多少个15分钟
      this.allSteps = (60 / this.step) * 24
      // 已经过去了多少个15分钟
      var curSteps = _start / this.step
      var allOptions = []
      for (var i = curSteps + 1; i < this.allSteps; i++) {
        allOptions.push(this.timerFormat(i * this.step))
      }
      for (var j = 0; j < curSteps + 1; j++) {
        allOptions.push(this.timerFormat(j * this.step, true))
      }
      this.timersList = allOptions
    },
    /**
       * 格式化时间集合
       * mins 时间点 以30分为间隔
       */
    timerFormat(mins, isTomorrow) {
      // 小时数
      var h = parseInt(mins / 60)
      // 分钟数
      var m = mins % 60
      var str_h = ''
      var str_m = ''
      str_h = h
      // 大于等于1小时 小于10小时
      if (h < 10) {
        str_h = '0' + h
      }
      str_m = m
      // 不足10分钟
      if (m < 10) {
        str_m = '0' + m
      }
      return {
        label: str_h + ':' + str_m + (isTomorrow ? ' 隔天' : ''),
        value: str_h + ':' + str_m + (isTomorrow ? ' 隔天' : '')
      }
    }
  },
  components: {
    sendMessageQuick
  }
}
</script>

<style lang="scss" scoped>
.message_title {
  margin: 20px 0 0 20px;
  color: #ccc;
}
.el-dialog__body .form-control{
  margin-right: 30px;
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
}
.message_content {
  padding: 5px 20px 20px 20px;
  border-bottom: 1px solid #d1dee5;
}
.message_button {
  text-align: right;
  margin: 10px 20px;
}
</style>
