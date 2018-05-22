<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <p>{{tid}}推送方式：</p>
      </el-col>
      <el-col :span="2" v-if="noPush != undefined">
        <el-radio v-model="send_type" label="">不推送</el-radio>
      </el-col>
      <el-col :span="2">
        <el-radio v-model="send_type" label="sms">仅短信</el-radio>
      </el-col>
      <el-col :span="2" v-show="jurisdictionData.allShow">
        <el-radio v-model="send_type" label="qianniu">仅千牛</el-radio>
      </el-col>
      <el-col :span="3" v-show="jurisdictionData.allShow">
        <el-radio v-model="send_type" label="all">短信+千牛同时</el-radio>
      </el-col>
      <el-col v-if="isAI" :span="12" v-show="jurisdictionData.allShow">
        <el-radio v-model="send_type" label="AI"><AI></AI>智慧管理</el-radio>
        <el-tooltip :content='tooltipContent' placement="top-start" popper-class='tool_notes' effect="dark">
          <i class="iconfont icon-help1 toolGanTanHao"></i>
        </el-tooltip>
      </el-col>
      <el-col v-if='isPay' :span="12" v-show="jurisdictionData.allShow">
        <el-radio v-model="send_type" label="AI">先短信
          <el-select v-model="sms_time">
            <el-option v-for='item in test' :label='item.label' :value='item.value' :key="item.value">
            </el-option>
          </el-select>后未付款再千牛
        </el-radio>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from '../../misc/utils'
export default {
  data() {
    return {
      send_type: '',
      tooltipContent: '魔方墙会检测当前拍下买家是否在线，优先推送给有沟通的客服，如无合适客服或者买家不在线转为短信推送',
      utils: utils,
      sms_time: '',
      test: [{
        label: '魔方墙AI思维引擎 智慧管理',
        value: ''
      }, {
        label: '3分钟',
        value: '3'
      }, {
        label: '5分钟',
        value: '5'
      }, {
        label: '10分钟',
        value: '10'
      }, {
        label: '15分钟',
        value: '15'
      }, {
        label: '30分钟',
        value: '30'
      }, {
        label: '45分钟',
        value: '45'
      }, {
        label: '60分钟',
        value: '60'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'jurisdictionData'
    ])
  },
  watch: {
    send_type() {
      this.updataValue()
    },
    sendType() {
      this.send_type = this.sendType
    }
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig'
    ]),
    updataValue() {
      // 更新营销配置基本量
      this.updataBaseMConfig({
        send_type: this.send_type
      })
    }
  },
  props: [
    'sendType',
    'isAI',
    'tid',
    'isPay',
    'noPush'
  ]
}
</script>
<style lang="scss">

</style>
