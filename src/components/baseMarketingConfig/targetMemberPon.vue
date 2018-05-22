<template>
<div>
  <el-row :gutter="20">
    <el-col :span="3"><p>目标会员：</p></el-col>
    <el-col :span='21' v-show="jurisdictionData.allShow"><span>您已选{{ gradeNum }}个会员</span></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="3"></el-col>
    <el-col :span="9"><el-radio v-model="group_label" label="AI"><AI></AI>智慧分组</el-radio>
      <el-popover
        ref="AIGroup"
        placement="bottom"
        width="200"
        :disabled="group_label !== 'AI'"
        trigger="click">
        <el-tree
          :data="memberGroupTreeData['AI引擎流转分组']"
          show-checkbox
          node-key="id"
          :default-checked-keys="group_ai_id"
          :accordion="true"
          :props="defaultProps"
          @check-change="AICheckGroupChange"
          ref="treeAi"
          >
        </el-tree>
      </el-popover>
      <el-tooltip class="item" effect="dark" :manual="true" :value="isSubState && group_ai_id && group_ai_id.length === 0 && group_label === 'AI' ? true : false" content="分组不能为空" placement="top">
      <el-input
        placeholder="请选择分组"
        v-popover:AIGroup
        class="linkInput"
        readonly
        v-model="AISelGroup"
        :disabled="group_label !== 'AI'"
        >
        <template slot="append"><span class="iconfont icon-treeMenu"></span></template>
      </el-input>
      </el-tooltip>
    </el-col>
  </el-row>
  <el-row :gutter="20" style="margin-top:5px">
    <el-col :span="3"></el-col>
    <el-col :span="5">
      <el-checkbox v-model="is_first_label">包含活动型会员第一次购物</el-checkbox>
      <el-tooltip content='活动型会员是指有聚划算、品牌团、双11、双12、淘抢购、其他自助添加大力度的促销活动引进的并且主要只购买活动商品的会员【特别注意是大力度促销的活动才算，小力度及会员专享活动不计算在内】' placement="top-start" popper-class='tool_notes' effect="dark">
        <i class="iconfont icon-help1 toolGanTanHao"></i>
      </el-tooltip>
    </el-col>
    <el-col :span="16">
      <el-checkbox :disabled="!isSelectGoods" v-model="is_item_label"><AI></AI>根据选定宝贝潜需智慧精确化</el-checkbox>
      <el-tooltip :content='tooltipContent' placement="top-start" popper-class='tool_notes' effect="dark">
        <i class="iconfont icon-help1 toolGanTanHao"></i>
      </el-tooltip>
      <span style="color: #9a9a9a">注释：选择新品相似宝贝后会增加潜需会员受众面</span>
    </el-col>
  </el-row>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import g_const from '../../misc/global.constant'
  import utils from '../../misc/utils'
  export default {
    data() {
      return {
        tooltipContent: '此处仅在选择单个和部分宝贝时有效，【注释】潜需会员范围仅限前面选择的目标范围内',
        isFirstLoad: false,
        utils: utils,
        g_const: g_const,
        group_label: '',     // 会员分组类型
        gradeNum: 0,         // 会员数量
        group_ai_id: [],    // AI引擎流转分组id
        group_ai_name: [],     // 分组名称
        AISelGroup: '',
        group_flag_id: [],  // 智能标签
        group_flag_name: [],//分组名称
        tagSelGroup: '',
        group_vip_id: [],   // 导入会员批次
        group_vip_name: [], //分组名称
        VIPSelGroup: '',
        group_grade_id: [], // 会员等级
        group_grade_name: [], //分组名称
        gradeSelGroup: '',
        group_custom_id: [], // 自建营销分组
        group_custom_name: [], //分组名称
        customSelGroup: '',
        is_item_label: '',  //根据选定宝贝潜需智慧精确化
        is_first_label: '',  // 包含活动型会员第一次购物
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    computed: {
      ...mapGetters([
        'memberGroupTreeData',
        'userData',
        'jurisdictionData',
        'subState'
      ]),
      isSubState() {
        if(this.subState == 'resultData' || this.subState == 'resultDetail' || this.subState == 'pushRecord' || this.subState == 'unsubscribeRecord' || this.subState == 'qianniuTask') {
          return false
        }else {
          return true
        }
      }
    },
    watch: {
      isSelectGoods() {
        this.is_item_label = this.isSelectGoods ? true : false
      },
      group_ai_id() {
        this.updataValue()
      },
      is_item_label() {
        this.updataValue()
      },
      is_first_label() {
        this.updataValue()
      },
      groupLabel() {
        this.isFirstLoad = true
        this.group_label = this.groupLabel
      },
      curGroupIds() {
        this.group_ai_id = this.curGroupIds.group_ai_id ? this.curGroupIds.group_ai_id : []
        this.$refs.treeAi.setCheckedKeys(this.group_ai_id)
        this.init()
      },
      isItemLabel() {
        this.is_item_label = this.isItemLabel
        if(this.isSelectGoods) {
          this.is_item_label = this.isItemLabel
        }
      },
      isFirstLabel() {
        this.is_first_label = this.isFirstLabel
      }
    },
    methods: {
      ...mapActions([
        'updataBaseMConfig',
        'updateOpenModal'
      ]),
      doClick(name) {
        this.updateOpenModal({
          name: name,
          param: {
            state:''
          }
        })
      },
      init() {
        this.updatAISelGroupText()
      },
      // 更新营销配置基本量
      updataValue() {
        this.updataBaseMConfig({
          group_label: this.group_label,
          group_ai_id: this.group_ai_id,
          is_first_label: this.is_first_label,
          is_item_label: this.is_item_label
        })
      },
      // 目标会员获取
      commonCheckGroup(groupIds, data, isChecked) {
          var temp = groupIds
          if(isChecked) {
          var len = temp.length
          var same = false
          for(var i = 0; i < len; i++) {
            if(data.id === temp[i]) {
            same = true
            break
            }
          }
          if(!same) {
            temp.push(data.id)
          }
          } else {
          temp = temp.filter(o => {
            return data.id !== o
          })
          }
          return temp
      },
      //目标会员分组情况获取
      groupCheck(groupIds, data, isChecked) {
          var temp = groupIds
          if(isChecked) {
          var len = temp.length
          var same = false
          for(var i = 0; i < len; i++) {
            if(data.label === temp[i]) {
            same = true
            break
            }
          }
          if(!same) {
            temp.push(data.label)
          }
          } else {
          temp = temp.filter(o => {
            return data.label !== o
          })
          }
          return temp
      },
      // AI分组选择变化
      AICheckGroupChange(data, isChecked) {
          if(!data.id) return
          var groupIds = this.group_ai_id
          this.group_ai_id = this.commonCheckGroup(groupIds, data, isChecked)
          var groupNames = this.group_ai_name
          this.group_ai_name = this.groupCheck(groupNames, data, isChecked)
          this.updatAISelGroupText()
      },
      // 更新AI分组选中个数
      updatAISelGroupText() {
          if(this.group_ai_name.length >= 2) {
            this.AISelGroup = this.group_ai_name[0] + ',' + this.group_ai_name[1]
          }else if(this.group_ai_name.length == 1){
            this.AISelGroup = this.group_ai_name[0]
          }else {
            this.AISelGroup = '请选择'
          }

          if(this.AISelGroup.length > 10) {
             this.AISelGroup = this.AISelGroup.substr(0, 10) + '...'
          }else if(this.group_ai_name.length > 2) {
             this.AISelGroup = this.AISelGroup + '...'
          }
          //this.AISelGroup = '已选择' + this.group_ai_id.length + '个分组'
      },
    },
    props: [
      'groupLabel',
      'curGroupIds',
      'isItemLabel',
      'isFirstLabel',
      'isSelectGoods',
      'showUnlimited'
      ]
}
</script>
<style lang="scss">

</style>
