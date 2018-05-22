<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <p>目标会员：</p>
      </el-col>
      <el-col :span='21' v-if="noNum != undefined">
        <AI></AI> 根据选定宝贝及选定人群智能框选会员
        <el-tooltip content='框选基于商家选定的人群并且购买了选定宝贝的会员' placement="top-start" popper-class='tool_notes' effect="dark">
          <i class="iconfont icon-help1 toolGanTanHao"></i>
        </el-tooltip>
      </el-col>
      <el-col :span='21' v-else v-show="jurisdictionData.allShow">
        您已选
        <span class="primary">{{ gradeNum }}</span>
        个会员
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3"></el-col>
      <el-col :span="2" v-if="showUnlimited === undefined ? true : showUnlimited">
        <el-radio v-model="group_label" label="">不限制</el-radio>
      </el-col>
      <!--<el-col :span="9">
        <el-radio v-model="group_label" label="AI"><AI></AI>智慧分组</el-radio>
        <el-popover @show="AIGroupShowHandle" @hide="AIGroupHideHandle" ref="AIGroup" placement="bottom" width="200" :disabled="group_label !== 'AI'" trigger="click">
          <el-tree v-if="isAIRenderTree" :data="memberGroupTreeData['AI引擎流转分组']" show-checkbox node-key="id" :default-checked-keys="group_ai_id" :accordion="true" :props="defaultProps" ref="treeAi">
          </el-tree>
        </el-popover>
        <el-tooltip class="item" effect="dark" :manual="true" :value="isSubState && group_ai_id && group_ai_id.length === 0 && group_label === 'AI' ? true : false" content="分组不能为空" placement="top">
          <el-input placeholder="请选择分组" v-popover:AIGroup class="linkInput" readonly v-model="AISelGroup" :disabled="group_label !== 'AI'">
            <template slot="append">
              <span class="iconfont icon-treeMenu"></span>
            </template>
          </el-input>
        </el-tooltip>
      </el-col>-->
      <el-col :span="6">
        <el-radio v-model="group_label" label="FLAG">智能标签</el-radio>
        <el-popover @show="AITagShowHandle" @hide="AITagHideHandle" ref="tagGroup" placement="bottom" width="200" :disabled="group_label !== 'FLAG'" trigger="click">
          <el-tree v-if="isAITagRenderTree" :data="memberGroupTreeData['智能标签']" show-checkbox node-key="id" :default-checked-keys="group_flag_id" :accordion="true" :props="defaultProps" ref="treeTag">
          </el-tree>
        </el-popover>
        <el-tooltip class="item" effect="dark" :manual="true" :value="isSubState && group_flag_id && group_flag_id.length === 0 && group_label === 'FLAG' ? true : false" content="分组不能为空" placement="top">
          <el-input placeholder="请选择分组" v-popover:tagGroup class="linkInput" readonly v-model="tagSelGroup" :disabled="group_label !== 'FLAG'">
            <template slot="append">
              <span class="iconfont icon-treeMenu"></span>
            </template>
          </el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="10">
        <el-radio v-model="group_label" label="VIP">导入会员分组</el-radio>
        <el-popover ref="VIPGroup" @show="VIPGroupShowHandle" @hide="VIPGroupHideHandle" placement="bottom" width="200" :disabled="group_label !== 'VIP'" trigger="click">
          <el-tree v-if="isVIPRenderTree" :data="memberGroupTreeData['导入会员批次']" show-checkbox node-key="id" :default-checked-keys="group_vip_id" :accordion="true" :props="defaultProps" ref="treeVip">
          </el-tree>
        </el-popover>
        <el-tooltip class="item" effect="dark" :manual="true" :value="isSubState && group_vip_id && group_vip_id.length === 0 && group_label === 'VIP' ? true : false" content="分组不能为空" placement="top">
          <el-input placeholder="请选择分组" v-popover:VIPGroup class="linkInput" readonly v-model="VIPSelGroup" :disabled="group_label !== 'VIP'">
            <template slot="append">
              <span class="iconfont icon-treeMenu"></span>
            </template>
          </el-input>
        </el-tooltip>
      </el-col>
    </el-row>
    <!--<el-row :gutter="20" style="margin-top:5px">
      <el-col :span="3"></el-col>
      <el-col :span="6" v-show="jurisdictionData.allShow">
        <el-radio v-model="group_label" label="GRADE">会员等级</el-radio>
        <el-popover @show="gradeShowHandle" @hide="gradeHideHandle" ref="gradeGroup" placement="bottom" width="200" :disabled="group_label !== 'GRADE'" trigger="click">
          <el-tree v-if="isGradeRenderTree" :data="memberGroupTreeData['会员等级分组']" show-checkbox node-key="id" :default-checked-keys="group_grade_id" :accordion="true" :props="defaultProps" ref="treeGrade">
          </el-tree>
        </el-popover>
        <el-tooltip class="item" effect="dark" :manual="true" :value="isSubState && group_grade_id && group_grade_id.length === 0 && group_label === 'GRADE' ? true : false" content="分组不能为空" placement="top">
          <el-input placeholder="请选择分组" v-popover:gradeGroup class="linkInput" readonly v-model="gradeSelGroup" :disabled="group_label !== 'GRADE'">
            <template slot="append">
              <span class="iconfont icon-treeMenu"></span>
            </template>
          </el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="9" v-show="jurisdictionData.allShow">
        <el-radio v-model="group_label" label="CUSTOM">自建营销分组</el-radio>
        <el-popover @show="customShowHandle" @hide="customHideHandle" ref="customGroup" placement="bottom" width="200" :disabled="group_label !== 'CUSTOM'" trigger="click">
          <el-tree v-if="isCustomRenderTree" :data="memberGroupTreeData['自建营销标签']" show-checkbox node-key="id" :default-checked-keys="group_custom_id" :accordion="true" :props="defaultProps" ref="treeCustom">
          </el-tree>
        </el-popover>
        <el-tooltip class="item" effect="dark" :manual="true" :value="isSubState && group_custom_id && group_custom_id.length === 0 && group_label === 'CUSTOM' ? true : false" content="分组不能为空" placement="top">
          <el-input placeholder="请选择分组" v-popover:customGroup class="linkInput" readonly v-model="customSelGroup" :disabled="group_label !== 'CUSTOM'">
            <template slot="append">
              <span class="iconfont icon-treeMenu"></span>
            </template>
          </el-input>
        </el-tooltip>
        &nbsp;
        <a class="link_underline" @click="doClick('createMarketGroup')">新建营销分组</a>
      </el-col>
    </el-row>-->
    <el-checkbox-group v-model="guest_price" v-show="guestPrice != undefined && jurisdictionData.secondShow">
      <el-row :gutter='20'>
        <el-col :span="3"></el-col>
        <el-col :span='5' v-for="guest in g_const.guestPrice" :key="guest.value">
          <el-checkbox :label="guest.value">
            {{guest.name}}
          </el-checkbox>
        </el-col>
      </el-row>
    </el-checkbox-group>
    <el-row :gutter="20" style="margin-top:5px">
      <el-col :span="3"></el-col>
      <el-col :span="5" v-show="isFirstLabel != undefined">
        <el-checkbox v-model="is_first_label" :disabled="group_label == ''">包含活动型会员第一次购物</el-checkbox>
        <el-tooltip content='活动型会员是指有聚划算、品牌团、双11、双12、淘抢购、其他自助添加大力度的促销活动引进的并且主要只购买活动商品的会员【特别注意是大力度促销的活动才算，小力度及会员专享活动不计算在内】' placement="top-start" popper-class='tool_notes' effect="dark">
          <i class="iconfont icon-help1 toolGanTanHao"></i>
        </el-tooltip>
      </el-col>
      <el-col :span="8" v-show="OnlyNew != undefined && jurisdictionData.secondShow">
        <el-checkbox v-model="only_new_label">仅限新品型标签会员</el-checkbox>
        <span style="color: #9a9a9a">【注释】最近两次购物中有≥30%是不同</span>
      </el-col>
      <el-col :span="13" v-show="isItemLabel != undefined">
        <el-checkbox :disabled="!isSelectGoods" v-model="is_item_label">
          <AI></AI>根据选定宝贝潜需智慧精确化</el-checkbox>
        <el-tooltip :content='tooltipContent' placement="top-start" popper-class='tool_notes' effect="dark">
          <i class="iconfont icon-help1 toolGanTanHao"></i>
        </el-tooltip>
        <span style="color: #9a9a9a">注释：选择新品相似宝贝后会增加潜需会员受众面</span>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import g_const from '../../misc/global.constant'
import utils from '../../misc/utils'
export default {
  data() {
    return {
      tooltipContent: '此处仅在选择单个和部分宝贝时有效，【注释】潜需会员范围仅限前面选择的目标范围内',
      isAIRenderTree: false,
      isVIPRenderTree: false,
      isAITagRenderTree: false,
      isGradeRenderTree: false,
      isCustomRenderTree: false,
      isFirstLoad: false,
      utils: utils,
      g_const: g_const,
      group_label: '',     // 会员分组类型
      gradeNum: 0,         // 会员数量
      group_ai_id: [],    // AI引擎流转分组id
      group_ai_name: [],     // 分组名称
      AISelGroup: '',
      group_flag_id: [],  // 智能标签
      group_flag_name: [],// 分组名称
      tagSelGroup: '',
      group_vip_id: [],   // 导入会员批次
      group_vip_name: [], // 分组名称
      VIPSelGroup: '',
      group_grade_id: [], // 会员等级
      group_grade_name: [], // 分组名称
      gradeSelGroup: '',
      group_custom_id: [], // 自建营销分组
      group_custom_name: [], // 分组名称
      customSelGroup: '',
      is_item_label: '',  //根据选定宝贝潜需智慧精确化
      is_first_label: '',  // 包含活动型会员第一次购物
      only_new_label: '', // 仅限新品
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      guest_price_label: false, //中高低客单价
      guest_price: [],
    }
  },
  computed: {
    ...mapGetters([
      'memberGroupTreeData', // 分组数据
      'jurisdictionData', // 权限
      'subState'
    ]),
    /**
     * 在配置页时
     */
    isSubState() {
      if (this.subState == 'resultData' || this.subState == 'resultDetail' || this.subState == 'pushRecord' || this.subState == 'unsubscribeRecord' || this.subState == 'qianniuTask') {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    isSelectGoods() {
      this.is_item_label = this.isSelectGoods ? true : false
    },
    group_label() {
      // 清空会员分组选中数据
      this.clearGroupIds()
      if (this.group_label == '') {
        this.is_first_label = false
      }
      this.updataValue()
    },
    group_flag_id() {
      // 更新营销配置基本量
      this.updataValue()
    },
    group_vip_id() {
      // 更新营销配置基本量
      this.updataValue()
    },
    is_item_label() {
      // 更新营销配置基本量
      this.updataValue()
    },
    is_first_label() {
      // 更新营销配置基本量
      this.updataValue()
    },
    groupLabel() {
      this.isFirstLoad = true
      // 会员分组类型
      this.group_label = this.groupLabel
    },
    curGroupIds() {
      this.group_flag_id = this.curGroupIds.group_flag_id ? this.curGroupIds.group_flag_id : []
      this.group_vip_id = this.curGroupIds.group_vip_id ? this.curGroupIds.group_vip_id : []
      this.init()
    },
    isItemLabel() {
      if (this.isSelectGoods) {
        this.is_item_label = this.isItemLabel
      }
    },
    isFirstLabel() {
      this.is_first_label = this.isFirstLabel
    },
    only_new_label() {
      // 更新营销配置基本量
      this.updataValue()
    },
    OnlyNew() {
      this.only_new_label = this.OnlyNew
    },
    guestPrice() {
      this.guest_price = this.guestPrice
    },
    guest_price() {
      // 更新营销配置基本量
      this.updataValue()
    }
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig',
      'updateOpenModal',
    ]),
    /**
     * 打开弹框页面
     */
    doClick(name) {
      this.updateOpenModal({
        name: name,
        param: {
          state: ''
        }
      })
    },
    /**
     * 页面初次加载的时候,显示选中的分组名称
     */
    init() {
      this.group_vip_name = utils.getGroupTextByIds(this.memberGroupTreeData['导入会员批次'], this.group_vip_id)
      // 更新导入分组选中个数
      this.updateVIPSelGroupText()
      this.group_flag_name = utils.getGroupTextByIds(this.memberGroupTreeData['智能标签'], this.group_flag_id)
      // 更新智能标签选中个数
      this.updateTagSelGroupText()
    },
    /**
     * 更新营销配置基本量
     */
    updataValue() {
      this.updataBaseMConfig({
        group_label: this.group_label,
        group_flag_id: this.group_flag_id,
        group_vip_id: this.group_vip_id,
        is_first_label: this.is_first_label,
        is_item_label: this.is_item_label,
        guest_price: this.guest_price,
        only_new_label: this.only_new_label
      })
    },
    /**
     * 选择导入会员分组弹框关闭事件
     * @return {Array}
     */
    VIPGroupHideHandle() {
      // 获取选中的id
      this.group_vip_id = this.$refs.treeVip.getCheckedKeys()
      // 获取选中的分组名称
      this.group_vip_name = this.$refs.treeVip.getCheckedNodes(true).map(k => {
        return k.label
      })
      // 更新导入分组选中个数
      this.updateVIPSelGroupText()
    },
    /**
     * 选择导入会员分组弹框打开事件
     */
    VIPGroupShowHandle() {
      // 开始渲染el-tree组件
      if(!this.isVIPRenderTree) {
          this.isVIPRenderTree = true
      }
    },
    /**
     * 选择智能标签会员分组弹框关闭事件
     * @return {Array}
     */
    AITagHideHandle() {
      // 获取选中的id
      this.group_flag_id = this.$refs.treeTag.getCheckedKeys()
      // 获取选中的分组名称
      this.group_flag_name = this.$refs.treeTag.getCheckedNodes(true).map(k => {
        return k.label
      })
      // 更新智能标签选中个数
      this.updateTagSelGroupText()
    },
    /**
     * 选择智能标签会员分组弹框打开事件
     */
    AITagShowHandle() {
      // 开始渲染el-tree组件
      if(!this.isAITagRenderTree) {
          this.isAITagRenderTree = true
      }
    },
    /**
     * 更新智能标签选中个数
     */
    updateTagSelGroupText() {
      if (this.group_flag_name.length >= 2) {
        this.tagSelGroup = this.group_flag_name[0] + ',' + this.group_flag_name[1]
      } else if (this.group_flag_name.length == 1) {
        this.tagSelGroup = this.group_flag_name[0]
      } else {
        this.tagSelGroup = '请选择分组'
      }
      if (this.tagSelGroup.length > 10) {
        this.tagSelGroup = this.tagSelGroup.substr(0, 10) + '...'
      } else if (this.group_flag_name.length > 2) {
        this.tagSelGroup = this.tagSelGroup + '...'
      }
      //this.tagSelGroup = '已选择' + this.group_flag_id.length + '个分组'
    },
    /**
     * 更新导入分组选中个数
     */
    updateVIPSelGroupText() {
      if (this.group_vip_name.length >= 2) {
        this.VIPSelGroup = this.group_vip_name[0] + ',' + this.group_vip_name[1]
      } else if (this.group_vip_name.length == 1) {
        this.VIPSelGroup = this.group_vip_name[0]
      } else {
        this.VIPSelGroup = '请选择分组'
      }
      if (this.VIPSelGroup.length > 10) {
        this.VIPSelGroup = this.VIPSelGroup.substr(0, 10) + '...'
      } else if (this.group_vip_name.length > 2) {
        this.VIPSelGroup = this.VIPSelGroup + '...'
      }
      //this.VIPSelGroup = '已选择' + this.group_vip_id.length + '个分组'
    },
    /**
     * 清空会员分组选中数据
     */
    clearGroupIds() {
      if(this.$refs.treeVip) {
        // 清空选中
        this.$refs.treeVip.setCheckedKeys([])
        // 选择导入会员分组弹框关闭事件
        this.VIPGroupHideHandle()
      }
      if(this.$refs.treeTag) {
        // 清空选中
        this.$refs.treeTag.setCheckedKeys([])
        // 选择智能标签会员分组弹框关闭事件
        this.AITagHideHandle()
      }
    }
  },
  props: [
    'groupLabel',
    'curGroupIds', // 会员分组id
    'isItemLabel',
    'isFirstLabel', // 活动型会员第一次购物
    'isSelectGoods', // 是否有选择宝贝
    'showUnlimited',
    'guestPrice',
    'noNum',
    'OnlyNew'
  ]
}
</script>
<style lang="scss">

</style>
