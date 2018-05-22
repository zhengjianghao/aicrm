<template scope="props">
  <div ref="taskForm" :model="taskForm" v-loading="isLoading" element-loading-text="拼命加载中">
    <el-row :gutter="20" v-if="!noQuick">
      <el-col :span='3'>
        <p>接收人：</p>
      </el-col>
      <el-col :span='7'>
        <el-radio v-model='message_data.receiver' label=''>自定义</el-radio>
        <span style='color: #b0b7bf'>&nbsp;多个手机号请使用回车键换行 最多100个号码</span>
      </el-col>
      <el-col :span='7'>
        <el-radio v-model='message_data.receiver' label='member'>选择会员组</el-radio>
      </el-col>
      <el-col :span='7'>
        <el-radio v-model='message_data.receiver' label='import'>表格导入</el-radio>
        <span style='color: #b0b7bf'>&nbsp;最多2万个号码，超出请分批</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" style='height: auto' v-if="!noQuick">
      <el-col :span='3'>
      </el-col>
      <el-col :span='7' style='min-height: 30px; height: auto'>
        <el-input type="textarea" resize='none' :autosize='{maxRows: 4 }' :disabled="message_data.receiver != ''" v-model='input_phone'>
        </el-input>
      </el-col>
      <el-col :span='7' style='height: auto'>
        目标会员
        <target-multiselect ref='multiselect' :isDisabled="message_data.receiver != 'member'" :isSendShow="openModalState.name == 'quickSendMessage'" :checkList="message_data.target_member" :isindex='Mindex' :changeMember='changeMember'></target-multiselect>
      </el-col>
      <el-col :span='7' style='height: auto'>
        <!--点击上传，显示按钮把input隐藏-->
        <div>
          <el-button class='btn_import' @click='importClick' :disabled="message_data.receiver != 'import'" type='primary'>上传</el-button>
          <input v-show="message_data.receiver === 'import'" class='hide_import' id='input_file' type="file" @change="importf" />
          <a href='http://www.mofangqiang.cn/storage/2017/速发短信上传模板.xlsx'>下载模板</a>
        </div>
      </el-col>
    </el-row>
    <!--上传后显示-->
    <div v-if="message_data.receiver === 'import'">
      <table-list
        ref="tableList"
        @getBaseList="searchRemote"
        @getFilterList="getFilterList"
        :configClass='true'
        id='sheetjs'
        :filterListData="filterData">
        <template slot="tableData" scope="props">
          <el-table border :data="props.data" style="width: 100%" max-height="350">
            <el-table-column prop="id" label="序号" align="center" min-width="50">
              <template scope="scope">
                {{ scope.$index + props.startIndexOnCurPage + 1}}
              </template>
            </el-table-column>
            <el-table-column prop="手机号" label="手机号" align="center" min-width="180">
              <template scope="scope">
                <div v-show="scope.row.isEdit">
                  <el-input v-model="scope.row['手机号']"></el-input>
                </div>
                <div v-show="!scope.row.isEdit" :class="scope.row.class ? scope.row.class : ''">
                  <span>{{scope.row['手机号']}}</span>
                  <el-tag style='position: absolute; right: 10px;' v-if="scope.row.tag">{{scope.row.tag}}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="200" align="center" label="操作">
              <template scope="scope">
                <div v-show="!scope.row.isEdit">
                  <a class="Edit link" @click="edit(parseInt(scope.row.id))">编辑</a>
                  <a class="Delet link" @click="del(parseInt(scope.row.id))">删除</a>
                </div>
                <div v-show="scope.row.isEdit">
                  <a class="Edit link" @click="save(scope.row['手机号'], parseInt(scope.row.id))">编辑完成</a>
                  <a class="cancel link" @click="cancel(parseInt(scope.row.id))">取消</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </table-list>
    </div>
    <el-row :gutter="20" v-if="!noQuick">
      <el-col :span='3'>
        <p>发送宝贝：</p>
      </el-col>
      <el-col :span='3'>
        <el-radio v-model='message_data.items_label' label=''>无选择</el-radio>
      </el-col>
      <el-col :span='18'>
        <span @click="openPushItem('pushGoods', message_data.items)">
          <el-radio label="custom" v-model="message_data.items_label">指定宝贝
            <span class="info">(已选中{{ message_data.items.length }}个宝贝)</span>
          </el-radio>
        </span>
      </el-col>
    </el-row>
    <msg-edit-temp
      :messageRoad='message_data.send_channel_label'
      :msgContent="message_data.message_text"
      msgType='messageTemplateSend'
      :allLine="message_data.receiver == 'member' ? allLine : allLine2">
      <template slot="remind_text">
        <div>
          提醒：1、链接前后须有空格分格，请勿删除前后空格，删除后会在手机端无法直接点击打开，影响顾客回顾
        </div>
        <div>
          <span class="lucency">提醒：</span>2、如果存在变量，为避免超出1条短信，请预留一部分字符
        </div>
        <div>
          <span class="lucency">提醒：</span>3、当选择多个宝贝并插入变量时，系统自动均分发送
        </div>
      </template>
    </msg-edit-temp>
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
        <el-col :span="3">
          <p>发送通道：</p>
        </el-col>
        <el-col :span="7">
          <el-radio v-model="message_data.send_channel_label" label="LOW">普通短信通道</el-radio>
        </el-col>
        <!--<el-col :span="14">
          <el-radio v-model="message_data.send_channel_label" label="HIGH">阿里优质短信通道</el-radio>
        </el-col>-->
      </el-row>
    </div>
    <div class="message_button">
      <el-button type="primary" @click="sendMessage()" :loading="sendDisabled">{{ sendDisabledText }}</el-button>
      <el-button @click="cancelSend()">取消</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import utils from '../../misc/utils'
import moment from 'moment'
import API_MESSAGE from '../../service/message.service.js'
//引入XLSX
import XLSX from 'xlsx'
export default {
  data() {
    return {
      taskForm: {
        taskName: ''
      },
      isLoading: false,
      sendDisabled: false, // 发送按钮是否可用
      sendDisabledText: '发送', // 发送按钮是否可用
      utils: utils,
      input_phone: '',
      API_MESSAGE: API_MESSAGE,
      step: 15,
      filterData: [],
      message_data: {
        items_label: '',
        items: [],
        message_text: '回TD退订',
        receiver: '',
        send_time_label: '',
        send_time: '',
        send_channel_label: 'LOW',
        target_member: [],
        phone: []
      },
      maerPhone: [], //合并订单的手机号
      timersList: [],
      k_word: globalConstant.keyword_danger, //非法字符
      excel_data: [], //excel 转化出的json
      g_const: globalConstant,
      Mindex: 1000000,
      phone: [],
      allLine: [
        '店铺短链',
        '买家ID',
        '收件人全名',
        '收件人地址',
        '宝贝短名',
        '宝贝短链'
      ],
      allLine2: [
        '店铺短链',
        '宝贝短名',
        '宝贝短链'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'maergeMessage',
      'jurisdictionData',
      'openModalState',
      'selectGoodsData',
      'subState'
    ])
  },
  watch: {
    /**
     * 打开速发短信弹框
     */
    openModalState() {
      if (this.openModalState.name === 'quickSendMessage' || this.openModalState.name === 'maergeSendMessage') {
        if (this.openModalState.param && this.openModalState.param.phone) {
          this.maerPhone = utils.commonArrayUnique(this.openModalState.param.phone)
        }
        this.init()
      }
    },
    // 监听选择宝贝的变化，将选择的宝贝ids赋给相应的属性
    selectGoodsData() {
      var selGoodsData = this.selectGoodsData
      if (selGoodsData.eleName === 'pushGoods') {
        this.message_data.items = selGoodsData.selectGoods
      }
    },
    //将短信内容改变
    maergeMessage() {
      this.message_data.message_text = this.maergeMessage
    }
  },
  mounted() {
    if (this.openModalState.param && this.openModalState.param.phone) {
      this.maerPhone = utils.commonArrayUnique(this.openModalState.param.phone)
    }
    this.init()
  },
  methods: {
    ...mapActions([
      'closeModal',
      'updateOpenModal',
      'updateSelectGoods',
      'getMaergeMessage'
    ]),
    init() {
      //初始化数据
      this.message_data.items = []
      this.message_data.items_label = ''
      this.message_data.message_text = '回TD退订'
      this.message_data.receiver = ''
      this.message_data.send_time_label = ''
      this.message_data.send_time = ''
      this.message_data.send_channel_label = 'LOW'
      this.message_data.target_member = []
      this.message_data.phone = []
      this.input_phone = ''
      this.excel_data = []
      this.filterData = []
      this.getMaergeMessage('【签名】回TD退订')
    },
    //整理传给后端的值
    doChangeData() {
      if (!this.noQuick) {
        //是速发短信
        if (this.message_data.receiver == '') {
          this.message_data.phone = this.doSplit(this.input_phone)
          this.message_data.target_member = []
        } else if (this.message_data.receiver == 'member') {
          this.message_data.phone = []
        } else if (this.message_data.receiver == 'import') {
          this.message_data.phone = []
          for (var i in this.excel_data) {
            this.message_data.phone.push(this.excel_data[i]['手机号'])
          }
          // this.message_data.phone = this.doSplit(this.input_phone)
          this.message_data.target_member = []
        }
        this.message_data.items = this.message_data.items_label ? this.message_data.items : []
      } else {
        this.message_data.phone = this.maerPhone
      }
      //发送短信和速发短信公共部分都有
      // this.message_data.items = this.message_data.items_label ? this.message_data.items : []
      this.message_data.send_time = this.message_data.send_time_label === '' ? '' : this.message_data.send_time
      this.message_data.send_channel = this.message_data.send_channel_label
      this.message_data.message_text = this.message_data.message_text.replace(/回TD退订/g, "")
    },
    //验证手机号
    checkPhone() {
      if (this.message_data.receiver == 'member' && this.message_data.target_member.length == 0) {
        this.utils.showErrorMsg(this, '请选择会员分组')
        return false
      } else if (this.message_data.receiver == '' && (this.message_data.phone.length == 0 || this.message_data.phone.length > 100)) {
        this.utils.showErrorMsg(this, '请输入1-100个手机号')
        return false
      } else if (this.message_data.receiver == 'import' && this.message_data.phone.length == 0) {
        this.utils.showErrorMsg(this, '请最少导入一个号码')
        return false
      }
      var ret = {}
      var _cf = []
      var result = this.message_data.phone.filter(o => {
        if (!ret[o]) {
          ret[o] = 1
          return true
        } else {
          _cf.push(o)
          return false
        }
      })
      if (_cf.length > 0) {
        this.utils.showErrorMsg(this, "有重复号码，请删除后发送")
        return false
      }
      for (var pho in this.message_data.phone) {
        if (!this.utils.phoneRexNoStrict.test(this.message_data.phone[pho])) {
          this.utils.showErrorMsg(this, '第' + (parseInt(pho) + 1) + "行手机号格式错误!")
          return false
        }
      }
      return true
    },
    //删除导入的手机号
    del(id) {
      var that = this
      this.$confirm('是否删除该条手机号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.delPhone(id)
        that.$refs.tableList.searchLocal()
        that.$message({
          type: 'success',
          message: '删除成功!',
          customClass: 'message_position',
        })
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除',
          customClass: 'message_position',
        })
      })
    },
    /**
     * 删除手机号
     */
    delPhone(id) {
      this.excel_data = this.excel_data.filter(o => {
        return o.id !== id
      })
    },
    //编辑手机号
    edit(id) {
      this.excel_data.forEach(o => {
        if (o.id === id) {
          this.$set(o, 'isEdit', true)
          o.oldPhone = o['手机号']
        }
      })
    },
    /**
     * 保存编辑好的手机号
     * @param phone {Number} 手机号
     * @param id 手机号索引
     */
    save(phone, id) {
      if (!phone) {
        utils.showErrorMsg(this, '手机号不能为空')
        return
      }
      if (!utils.phoneRexNoStrict.test(phone)) {
        utils.showErrorMsg(this, '手机号格式不正确')
        return
      }
      for (var i in this.excel_data) {
        if (phone == this.excel_data[i]['手机号'] && id != this.excel_data[i].id) {
          utils.showErrorMsg(this, '手机号已存在')
          return
        }
      }
      this.excel_data.forEach(o => {
        if (o.id === id) {
          o['手机号'] = phone
          o.class = ''
          o.tag = ''
          // 退出编辑状态
          this.$set(o, 'isEdit', false)
        }
      })
      utils.showSuccessMsg(this, '修改成功')
    },
    //取消
    cancel(id) {
      var curObj = this.excel_data.filter(o => {
        return o.id === id
      })[0]
      curObj['手机号'] = curObj.oldPhone
      this.$set(curObj, 'isEdit', false)
    },
    //验证发送时间
    checkSendTime() {
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
    /**
     * 发送短信
     */
    sendMessage() {
      this.doChangeData()
      var that = this
      var _cheP = this.noQuick ? true : this.checkPhone()
      var _time = this.checkSendTime()
      if (!_cheP || !_time) {
        return
      }
      if (this.utils.trim(this.message_data.message_text.replace('【签名】', '').replace('回TD退订', '')).length === 0) {
        this.utils.showErrorMsg(this, "请输入短信内容!")
        return
      }
      if (this.message_data.message_text.indexOf('<宝贝短链>') >= 0 || this.message_data.message_text.indexOf('<宝贝短名>') >= 0) {
        if(this.message_data.items.length == 0) {
          this.utils.showErrorMsg(this, "请选择需要发送的宝贝！")
          return
        }
      }
      var isOKMessage = that.utils.hasKeywordDanger(that.message_data.message_text, that.k_word, that)
      if (isOKMessage) {
        return
      }
      this.$confirm('确定发送？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          that.message_data.send_time = that.message_data.send_time.replace(' 隔天', '')
          that.isLoading = true
          that.API_MESSAGE.sendQuick(that.message_data).then(() => {
            that.isLoading = false
            that.$message({
              type: 'success',
              customClass: 'message_position',
              message: '已成功发送'
            })
            // 下次发送需要等待1分钟
            that.stopSendOneMoment()
            // 关闭弹窗
            that.cancelSend()
            that.message_data.message_text = '回TD退订'
          })
      }).catch(() => {
        that.$message({
          type: 'info',
          customClass: 'message_position',
          message: '已取消发送'
        })
      })
    },
    /**
     * 下次发送需要等待时间
     * @param seconds {Integer} 下次发送需等待时间
     */
    stopSendOneMoment() {
      var that = this;
      that.sendDisabled = true
      var s = 60
      var timer = setInterval(() => {
        s--
        if (s > 0) {
          that.sendDisabledText = s + "秒后可再次发送"
        } else {
          that.sendDisabled = false
          that.sendDisabledText = '发送'
          clearInterval(timer)
        }
      }, 1000)
    },
    //打开选择宝贝
    openPushItem(eleName, selGoods) {
      this.updateOpenModal({
        name: this.g_const.openModalCodes.chooseGoods,
        isOpen: true
      })
      this.updateSelectGoods({
        selectGoods: selGoods,
        eleName: eleName
      })
    },
    //关闭弹窗
    cancelSend() {
      this.init()
      if (this.noQuick) {
        this.closeModal('maergeSendMessage')
      } else {
        this.closeModal('quickSendMessage')
      }
      this.updateOpenModal({
        name: ''
      })
    },
    doSplit(value) {
      if (value != '') {
        return value.split(/\r?\n/)
      } else {
        return []
      }
    },
    //子组件调用选择会员
    changeMember(value) {
      this.message_data.target_member = value
    },
    importf(e) {
      var that = this
      var files = e.target.files
      var f = files[0]
      if (!f) {
        return
      }
      var reg = /^.*\.(?:xls|xlsx)$/i;//文件名可以带空格
      var input_file = document.getElementById('input_file')
      if (!reg.test(f.name)) {
        //校验不通过
        this.utils.showErrorMsg(that, "请上传excel格式的文件!")
        input_file.value = []
        return
      } else {
        var reader = new FileReader()
        reader.onload = function(e) {
          var data = e.target.result
          data = new Uint8Array(data);
          var workbook = XLSX.read(data, { type: 'array' })
          if (!workbook.Sheets.Sheet1) {
            that.utils.showErrorMsg(that, "表一名称应为：‘Sheet1’")
            input_file.value = []
            return
          }
          //四种数据输出格式
          var _excel_json = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1)
          /* DO SOMETHING WITH workbook HERE */
          var isTrue = that.checkJson(_excel_json)
          if (isTrue) {
            for (var i in _excel_json) {
              _excel_json[i].id = parseInt(i) + 1
            }
            //号码去重
            // that.excel_data = that.utils.arrayUnique(_excel_json, '手机号')
            //把重复的放在最上面
            that.excel_data = that.topData(_excel_json)
            that.$refs['tableList'].init()
            input_file.value = []
          } else {
            input_file.value = []
          }
        }
        reader.onerror = function(e) {
          that.utils.showErrorMsg(that, "文件内容格式错误!")
        }
        reader.readAsArrayBuffer(f);
      }
    },
    //把重复的和错误的显示在上面
    topData(value) {
      var varialbe = value;
      var ret = {}
      var _cf = []
      var result = value.filter(o => {
        if (!ret[o['手机号']]) {
          ret[o['手机号']] = 1
          return true
        } else {
          o.class = 'error_phone'
          o.tag = '重复'
          _cf.push(o)
          return false
        }
      })
      //重复排序
      _cf = _cf.sort((a, b) => {
        return a.id - b.id
      })
      result = _cf.concat(result)
      for (var pho in result) {
        if (!this.utils.phoneRexNoStrict.test(result[pho]['手机号'])) {
          // this.utils.showErrorMsg(this, '第' + (parseInt(pho) + 1) + "行手机号格式错误!")
          var _temp = result[pho]
          _temp.tag = '格式错误'
          _temp.class = 'error_phone'
          result.splice(pho, 1)
          result.unshift(_temp)
        }
      }
      return result
    },
    checkJson(value) {
      var that = this
      if (!value || value.length <= 0) {
        that.utils.showErrorMsg(that, "亲,请不要上传空文件哦!")
        return false
      }
      if (Object.getOwnPropertyNames(value[0]).length != 2) {
        that.utils.showErrorMsg(that, "文件内容格式错误!")
        return false
      } else if (value.length > 20000) {
        that.utils.showErrorMsg(that, "最多导入2万个号码，超出请分批!")
      } else if (value[0].hasOwnProperty('手机号')) {
        return true
      } else {
        that.utils.showErrorMsg(that, "文件内容格式错误!")
        return false
      }
    },
    importClick() {
      var input_file = document.getElementById('input_file')
      input_file.click()
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
    },
    // 获取远程数据
    searchRemote([pagination]) {
      this.filterData = pagination.doPage(this.excel_data)
    },
    // 处理本地数据
    getFilterList([pagination]) {
      this.filterData = pagination.doPage(this.excel_data)
    },
  },
  props: ['noQuick'],
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
.message_title {
  margin: 20px 0 0 20px;
  color: #ccc;
}

.el-dialog__body .form-control {
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

.el-table {
  .el-table__row {
    .cell {
      .error_phone {
        height: 29px;
        line-height: 29px;
        overflow: hidden;
        color: red;
      }
    }
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

.hide_import {
  display: none;
}

.Edit {
  text-decoration: underline;
  color: $primary;
  margin-right: 5px;
}

.Delet {
  text-decoration: underline;
  color: $warning;
}
</style>
