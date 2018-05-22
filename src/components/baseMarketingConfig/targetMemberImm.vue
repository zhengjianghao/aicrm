<template>
<div>
  <el-row :gutter="20">
    <el-col :span="3"><p>目标会员：</p></el-col>
    <el-col :span='21'><span>您已选{{ gradeNum }}个会员</span></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="3"></el-col>
    <el-col :span="2"><el-radio v-model="group_label" label="">全部会员</el-radio></el-col>
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
    <el-col :span="10"><el-radio v-model="group_label" label="CUSTOM">自建营销分组</el-radio>
        <el-popover
        ref="customGroup"
        placement="bottom"
        width="200"
        :disabled="group_label !== 'CUSTOM'"
        trigger="click">
        <el-tree
          :data="memberGroupTreeData['自建营销分组']"
          show-checkbox
          node-key="id"
          :default-checked-keys="group_custom_id"
          :accordion="true"
          :props="defaultProps"
          @check-change="customCheckGroupChange"
          >
        </el-tree>
      </el-popover>
      <el-tooltip class="item" effect="dark" :manual="true" :value="isSubState && group_custom_id && group_custom_id.length === 0 && group_label === 'CUSTOM' ? true : false" content="分组不能为空" placement="top">
        <el-input
          placeholder="请选择分组"
          v-popover:customGroup
          class="linkInput"
          readonly
          v-model="customSelGroup"
          :disabled="group_label !== 'CUSTOM'"
          >
          <template slot="append"><span class="iconfont icon-treeMenu"></span></template>
        </el-input>
      </el-tooltip>
      &nbsp;<a class="link_underline" @click="doClick('createMarketGroup')">新建营销分组</a>
    </el-col>

  </el-row>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import g_const from '../../misc/global.constant'
  export default {
    data() {
      return {
        g_const: g_const,
        group_label: '',     // 会员分组类型
        gradeNum: 0,         // 会员数量
        group_ai_id: [],    // AI引擎流转分组id
        AISelGroup: '',
        group_flag_id: [],  // 智能标签
        tagSelGroup: '',
        group_vip_id: [],   // 导入会员批次
        VIPSelGroup: '',
        group_grade_id: [], // 会员等级
        gradeSelGroup: '',
        group_custom_id: [], // 自建营销分组
        customSelGroup: '',
        is_item_label: '',  // 包含活动型会员第一次购物
        is_first_label: '',  //根据选定宝贝潜需智慧精确化
        defaultProps: {
          children: 'children',
          label: 'label'
        }

      }
    },
    computed: {
      ...mapGetters([
        'memberGroupTreeData',
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
      group_label() {
        this.updataValue()
      },
      group_ai_id() {
        this.updataValue()
      },
      group_flag_id() {
        this.updataValue()
      },
      group_vip_id() {
        this.updataValue()
      },
      group_grade_id() {
        this.updataValue()
      },
      group_custom_id() {
        this.updataValue()
      },
      is_item_label() {
        this.updataValue()
      },
      is_first_label() {
        this.updataValue()
      },
      groupLabel() {
        this.group_label = this.groupLabel
      },
      curGroupIds() {
        this.group_ai_id = this.curGroupIds.group_ai_id ? this.curGroupIds.group_ai_id : []
        this.group_flag_id = this.curGroupIds.group_flag_id ? this.curGroupIds.group_flag_id : []
        this.group_vip_id = this.curGroupIds.group_vip_id ? this.curGroupIds.group_vip_id : []
        this.group_grade_id = this.curGroupIds.group_grade_id ? this.curGroupIds.group_grade_id : []
        this.group_custom_id = this.curGroupIds.group_custom_id ? this.curGroupIds.group_custom_id : []
        this.init()
      },
      isItemLabel() {
        this.is_item_label = this.isItemLabel
      },
      isFirstLabel() {
        this.is_first_label = this.isFirstLabel
      }
    },
    methods: {
      ...mapActions([
        'updataBaseMConfig',
        'updateOpenModal',
        'updateSelectGoods'
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
        this.updateGradeSelGroupText()
        this.updateTagSelGroupText()
        this.updateVIPSelGroupText()
        this.updateCustomSelGroupText()
      },
      // 更新营销配置基本量
      updataValue() {
        this.updataBaseMConfig({
          group_label: this.group_label,
          group_ai_id: this.group_ai_id,
          group_flag_id: this.group_flag_id,
          group_vip_id: this.group_vip_id,
          group_grade_id: this.group_grade_id,
          group_custom_id: this.group_custom_id,
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
      // AI分组选择变化
      AICheckGroupChange(data, isChecked) {
          if(!data.id) return
          var groupIds = this.group_ai_id
          this.group_ai_id = this.commonCheckGroup(groupIds, data, isChecked)
          this.updatAISelGroupText()
      },
      // 更新AI分组选中个数
      updatAISelGroupText() {
          this.AISelGroup = '已选择' + this.group_ai_id.length + '个分组'
      },
      // 会员等级选择变化
      gradeCheckGroupChange(data, isChecked) {
          if(!data.id) return
          var groupIds = this.group_grade_id
          this.group_grade_id = this.commonCheckGroup(groupIds, data, isChecked)
          this.updateGradeSelGroupText()
      },
      // 更新会员等级选中个数
      updateGradeSelGroupText() {
          this.gradeSelGroup = '已选择' + this.group_grade_id.length + '个分组'
      },
      // 智能标签分组选择变化
      tagCheckGroupChange(data, isChecked) {
          if(!data.id) return
          var groupIds = this.group_flag_id
          this.group_flag_id = this.commonCheckGroup(groupIds, data, isChecked)
          this.updateTagSelGroupText()
      },
      // 更新智能标签选中个数
      updateTagSelGroupText() {
          this.tagSelGroup = '已选择' + this.group_flag_id.length + '个分组'
      },
      // 导入分组选择变化
      VIPCheckGroupChange(data, isChecked) {
          if(!data.id) return
          var groupIds = this.group_vip_id
          this.group_vip_id = this.commonCheckGroup(groupIds, data, isChecked)
          this.updateVIPSelGroupText()
      },
      // 更新导入分组选中个数
      updateVIPSelGroupText() {
          this.VIPSelGroup = '已选择' + this.group_vip_id.length + '个分组'
      },
      // 自建分组选择变化
      customCheckGroupChange(data, isChecked) {
          if(!data.id) return
          var groupIds = this.group_custom_id
          this.group_custom_id = this.commonCheckGroup(groupIds, data, isChecked)
          this.updateCustomSelGroupText()
      },
      // 更新自建分组选中个数
      updateCustomSelGroupText() {
          this.customSelGroup = '已选择' + this.group_custom_id.length + '个分组'
      }
    },
    props: [
      'groupLabel',
      'curGroupIds',
      'isItemLabel',
      'isFirstLabel'
      ]
}
</script>
<style lang="scss">

</style>
