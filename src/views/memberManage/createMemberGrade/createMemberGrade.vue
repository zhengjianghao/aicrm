<template>
<div>
  <content-header
    name="创建会员等级制度"
    notes='【注释】当买家同时满足下面多个等级条件时，取最尾端创建的等级为该买家的所在等级'
  >
  <template
    slot="toolBox"
  >
    <div class="headerTab">
      <el-radio-group v-model="activeName" @change="changeHandleApply">
      <el-tooltip :content='tooltipContent' placement="top-end"  effect="dark">
        <el-radio label="AI" class="tab" :class="activeName === 'AI' ? 'active' : ''">
          <span>
              AI思维引擎智慧推荐等级
          </span>
          </el-radio>
      </el-tooltip>
      <el-radio label="CUSTOMER" class="tab" :class="activeName === 'CUSTOMER' ? 'active' : ''">
        <span>
          自定义会员等级
        </span>
      </el-radio>
      </el-radio-group>
    </div>
  </template>
  </content-header>
  <component v-bind:is="currentView" ref="curLevel"></component>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../../misc/global.constant'
  import aiMemberLevel from './aiMemberLevel'
  import customerMemberLevel from './customerMemberLevel'
  export default {
    data() {
      return {
        activeName: '',
        currentView: 'aiMemberLevel',
        is_first: false,
        tooltipContent: 'AI系统基于店铺会员客单价分布状态进行智能管理，系统会根据买家购买行为自动升降级'
      }
    },
    computed: {
      ...mapGetters([
        'memberLevelData'
      ]),
    },
    watch: {
      memberLevelData() {
        this.init()
        this.getComponentName()
      }
    },
    mounted() {
      this.is_first = true
      if(!this.memberLevelData.groups) {
        this.getMemberLevel()
      } else {
        this.init()
        this.getComponentName()
      }
      // 清空全局组件状态值
      this.emptyBaseMConfig()
    },
    methods: {
      ...mapActions([
        'getSubCode',
        'getMemberLevel',
        'emptyBaseMConfig',
        'switchMemberLevel',
        'getMemberGroup'
      ]),
      changeHandle() {
        return this.changeHandleApply
      },
      changeHandleApply(value) {
        var that = this
        // 初次加载不执行
        if(this.is_first) {
          this.is_first = false
          return
        }
        if(!value) return
        this.activeName = value
        this.$confirm('是否保存修改的数据?', '提示', {
          confirmButtonText: '保存',
          cancelButtonText: '不保存',
          closeOnClickModal: false,
          showCancelButton: true,
          type: 'warning'
        }).then(() => {
          var cur_com = that.$refs['curLevel']
          if(cur_com.isValid()) {
            that.doSwitch(cur_com.processLevelData())
          } else {
            that.activeName = that.activeName === 'AI' ? 'CUSTOMER' : 'AI'
            that.is_first = true
            that.getComponentName()
          }
        }).catch((o) => {
          that.doSwitch()
        });
      },
      doSwitch(data) {
        this.switchMemberLevel([this.activeName, data]).then(o => {
          this.getMemberLevel()
          this.getMemberGroup()
          this.getComponentName()
        })
      },
      getComponentName() {
        if(this.activeName === 'AI') {
            this.currentView = 'aiMemberLevel'
        } else if(this.activeName === 'CUSTOMER') {
          this.currentView = 'customerMemberLevel'
        }
      },
      init() {
        this.activeName = this.memberLevelData.settings.filter(o => {
          return o.config_name === 'CRM_SWITCH'
        })[0].config_value
      }
    },
    components: {
      aiMemberLevel,
      customerMemberLevel
    }

}
</script>
<style lang="scss" scoped>
@import '../../../style/variable.scss';
  .headerTab {
    margin-top: 8px;
    .el-radio {
      margin: 0;
      color: $menuColor;
    }
    .tab {
      padding: 10px;
      width: 160px;
      color: #ffffff;
      background-color: #333;
    }
    .active {
      background-color: #ffffff;
      height: 22px;
    }
  }
</style>
