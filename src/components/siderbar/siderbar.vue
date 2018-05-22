<template>
  <div class="siderbar">
    <div class="logo">
      <img class="config_bg" src="../../assets/images/gear_bg.jpg" />
      <div class="gearbox">
        <!--齿轮-->
        <div class="gear one">
          <div class="iconfont icon-chiluncogwheel23 icon-gear"></div>
        </div>
        <!--内弧-->
        <div class="gear arc-in"></div>
        <!--外弧-->
        <div class="gear arc-out"></div>
      </div>
      <img class="logo_bg" src="../../assets/images/logo.png" />
    </div>
    <div class="siderbar_main" v-if='showSider'>
      <el-collapse :value="activeMemuName" accordion>
        <template>
          <el-collapse-item v-for="item in getSiderbarData" :name="item.name" :key="item.name" v-if="isShowSiderbar(item.name)">
            <template slot="title">
              <span class="iconfont" :class="item.icon"></span>{{item.name}}
            </template>
            <template v-for="(value, key) in item.submenus">
              <!--v-if="key != '自建营销'" 隐藏未开发-->
              <!--(key != '自建营销' && key != '导入会员批次') 导入功能隐藏-->
              <div class="node disabled" v-if="item.isObj && ((key != '自建营销') ? true : jurisdictionData.secondShow)" :key="key">{{key}}</div>
              <template v-for="(subItem, index) in value">
                <!--(subItem.finishState == 2 && subItem.name != '点击导入') 导入功能隐藏-->
                <div v-if="(subItem.finishState == 2) ? true : getJurisdictionUser(subItem.finishState)" :key="subItem.name + index" @click="go(subItem)" :class="{active:subItem.id !='' ? subItem.id == siderbarActiveNode.id : subItem.name == siderbarActiveNode.name}">
                  <el-tooltip placement="left" :open-delay="1000" effect="light">
                    <div slot="content">{{subItem.name + (getfinishState[subItem.finishState] ? getfinishState[subItem.finishState] : '' ) }}</div>
                    <div class="linkColor sub_node">{{ subItem.name }}
                      <span :class="subItem.finishState == 1 ? 'finish_state_r' : subItem.finishState == 2 ? 'finish_state' : 'finish_state_n'">{{getfinishState[subItem.finishState] }}</span>
                    </div>
                  </el-tooltip>
                </div>
              </template>
            </template>
          </el-collapse-item>
        </template>
      </el-collapse>
    </div>
    <div class="siderbar_main" v-else>
      <div class="top_title">
        <p>按效果分成场景</p>
        <p>AI引擎自动运营</p>
      </div>
      <div v-for="item in getSiderbarData" :key='item.name'>
        <template v-for="(value, key) in item.submenus">
          <template v-for="(subItem, index) in value">
            <!--<div :key="subItem.name + index" @click="go(subItem)" :class="{active:subItem.id !='' ? subItem.id == siderbarActiveNode.id : subItem.name == siderbarActiveNode.name}">
                  <el-tooltip placement="left" :open-delay="1000" effect="light">
                    <div slot="content">{{subItem.name + (getfinishState[subItem.finishState] ? getfinishState[subItem.finishState] : '' ) }}</div>
                    <div class="linkColor sub_node home_sub">
                      {{ subItem.name }}
                    </div>
                  </el-tooltip>
                </div>-->
            <div :key="subItem.name + index" @click="go(subItem)" class="el-collapse-item">
              <div class="el-collapse-item__header">
                <i class="el-collapse-item__header__arrow el-icon-arrow-right"></i>
                <span class="iconfont" :class="subItem.icon"></span>{{subItem.name}}
              </div>
            </div>
          </template>
        </template>
      </div>
      <div class="category_sider top_title">
        <p>行业归属：</p>
        <p>
          <span>{{deductionRule.name ? deductionRule.name : '···'}}</span>
        </p>
        <p>服务费扣点：
          <span>{{deductionRule.rate ? utils.format_per(deductionRule.rate) : '···'}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import gConst from '../../misc/global.constant'
import utils from '../../misc/utils'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      activeMemuName: '',
      const_menuCode: gConst.activeMenuCodes,
      g_const: gConst,
      utils: utils,
      set_time: '',
      showSider: true
    }
  },
  computed: {
    ...mapGetters([
      'menuState',
      'homePageSidebarData',
      'lossPreventionSidebarData',
      'careSidebarData',
      'firstBuySidebarData',
      'maintenanceSidebarData',
      'saveCustomerSidebarData',
      'activateCustomerSidebarData',
      'memberGroupData',
      'siderbarActiveNode',
      'dataChartData',
      'userData',
      'jurisdictionData',
      'deductionRule'
    ]),
    getfinishState() {
      return this.g_const.finishState.map(o => {
        return o
      })
    },
    getSiderbarData() {
      var menuCode = this.menuState
      // 首页
      if (menuCode === this.const_menuCode.home || menuCode === this.const_menuCode.tasklist) {
        if (this.siderbarActiveNode.openName) {
          this.activeMemuName = this.siderbarActiveNode.openName
        } else {
          this.activeMemuName = '即时营销'
        }
        this.showSider = false
        return this.homePageSidebarData
        // 流失防御
      } else if (menuCode === this.const_menuCode.lossPrevention) {
        if (this.siderbarActiveNode.openName) {
          this.activeMemuName = this.siderbarActiveNode.openName
        } else {
          this.activeMemuName = ''
        }
        this.showSider = true
        return this.lossPreventionSidebarData
        // 关怀
      } else if (menuCode === this.const_menuCode.care) {
        if (this.siderbarActiveNode.openName) {
          this.activeMemuName = this.siderbarActiveNode.openName
        } else {
          this.activeMemuName = ''
        }
        this.showSider = true
        return this.careSidebarData
        // 处女购
      } else if (menuCode === this.const_menuCode.firstBuy) {
        if (this.siderbarActiveNode.openName) {
          this.activeMemuName = this.siderbarActiveNode.openName
        } else {
          this.activeMemuName = ''
        }
        this.showSider = true
        return this.firstBuySidebarData
        // 维护
      } else if (menuCode === this.const_menuCode.maintenance) {
        if (this.siderbarActiveNode.openName) {
          this.activeMemuName = this.siderbarActiveNode.openName
        } else {
          this.activeMemuName = ''
        }
        this.showSider = true
        return this.maintenanceSidebarData
        // 挽回
      } else if (menuCode === this.const_menuCode.saveCustomer) {
        if (this.siderbarActiveNode.openName) {
          this.activeMemuName = this.siderbarActiveNode.openName
        } else {
          this.activeMemuName = ''
        }
        this.showSider = true
        return this.saveCustomerSidebarData
        // 激活
      } else if (menuCode === this.const_menuCode.activateCustomer) {
        if (this.siderbarActiveNode.openName) {
          this.activeMemuName = this.siderbarActiveNode.openName
        } else {
          this.activeMemuName = ''
        }
        this.showSider = true
        return this.activateCustomerSidebarData
        // 会员管理
      } else if (menuCode === this.const_menuCode.member) {
        if (this.siderbarActiveNode.openName) {
          this.activeMemuName = this.siderbarActiveNode.openName
        } else {
          this.activeMemuName = 'AI引擎流转分组'
        }
        this.showSider = true
        return this.memberGroupData
        //数据
      } else if (menuCode === this.const_menuCode.dataChart) {
        if (this.siderbarActiveNode.openName) {
          this.activeMemuName = this.siderbarActiveNode.openName
        } else {
          this.activeMemuName = ''
        }
        this.showSider = true
        return this.dataChartData
      }
    },
    getActiveMemuNames() {

    },
  },
  watch: {
    menuState() {
      var menuCode = this.menuState
      // 首页
      if (menuCode === this.const_menuCode.home || menuCode === this.const_menuCode.tasklist) {
        // 未加载分组会员 则加载
        if (!this.homePageSidebarData || !this.homePageSidebarData.length) {
          this.getHomePageSidebar()
        }
        // 流失防御
      } else if (menuCode === this.const_menuCode.lossPrevention) {
        if (!this.lossPreventionSidebarData || !this.lossPreventionSidebarData.length) {
          this.getLossPreventionSidebar()
        }
        // 关怀
      } else if (menuCode === this.const_menuCode.care) {
        if (!this.careSidebarData || !this.careSidebarData.length) {
          this.getCareSidebar()
        }
        // 处女购
      } else if (menuCode === this.const_menuCode.firstBuy) {
        if (!this.firstBuySidebarData || !this.firstBuySidebarData.length) {
          this.getFirstBuySidebar()
        }
        // 维护
      } else if (menuCode === this.const_menuCode.maintenance) {
        if (!this.maintenanceSidebarData || !this.maintenanceSidebarData.length) {
          this.getMaintenanceSidebar()
        }
        // 挽回
      } else if (menuCode === this.const_menuCode.saveCustomer) {
        if (!this.saveCustomerSidebarData || !this.saveCustomerSidebarData.length) {
          this.getSaveCustomerSidebar()
        }
        // 激活
      } else if (menuCode === this.const_menuCode.activateCustomer) {
        if (!this.activateCustomerSidebarData || !this.activateCustomerSidebarData.length) {
          this.getActivateCustomerSidebar()
        }
        // 数据
      } else if (menuCode === this.const_menuCode.dataChart) {
        if (!this.dataChartData || !this.dataChartData.length) {
          this.getDataChartSidebar()
        }
        // 会员管理
      } else if (menuCode === this.const_menuCode.member) {
        // 未加载分组会员 则加载
        if (!this.memberGroupData || !this.memberGroupData.length) {
          this.getMemberGroup()
        }
      } else if (menuCode === this.const_menuCode.tasklist) {
        this.getHomePageSidebar()
      }
    }
  },
  methods: {
    ...mapActions([
      'getHomePageSidebar',
      'getLossPreventionSidebar',
      'getCareSidebar',
      'getFirstBuySidebar',
      'getMaintenanceSidebar',
      'getSaveCustomerSidebar',
      'getActivateCustomerSidebar',
      'getMemberGroup',
      'updateSiderbarActiveNode',
      'updateOpenModal',
      'getDataChartSidebar'
    ]),
    getJurisdictionUser(value) {
      //var isShow = this.g_const.user_jurisdiction.indexOf(this.userData.user_id) >= 0 ? true : this.g_const.user_jurisdiction_part.indexOf(this.userData.user_id) >= 0 ? 'part' : false
      // if(isShow == true || isShow == 'part') {
      //   return true
      // }else {
      //   return false
      // }
      if (((this.jurisdictionData.secondShow) && value == 1) || ((this.jurisdictionData.allShow) && value == 0)) {
        return true
      } else {
        return false
      }
      //return this.jurisdictionData.secondShow
      // return this.g_const.user_jurisdiction.indexOf(this.userData.user_id) >= 0
    },
    go(item) {
      var that = this
      that.go_test(item)
      // 暂时不用
      // 500ms内用户多次请求只发送最后一次
      // var _test = false
      // if(this.set_time == '') {
      //   that.set_time = setTimeout(function(e) {
      //     that.set_time = ''
      //     _test = true
      //     that.go_test(item)
      //   },500)
      // }else {
      //   // this.set_time.clearTimeout()
      //   clearTimeout(that.set_time)
      //   that.set_time = ''
      //   that.set_time = setTimeout(function(e) {
      //     that.set_time = ''
      //     _test = true
      //     that.go_test(item)
      //   },500)
      // }
      // this.go_test(item)
    },
    go_test(item) {
      if (item.openModalName) {
        this.updateOpenModal({
          name: item.openModalName,
          param: {
            state: ''
          }
        })
        return
      }
      this.updateSiderbarActiveNode({
        id: item.id,
        openName: item.group,
        name: item.name
      })
      this.$router.push({
        path: item.path,
        query: this.getParam(item)
      })
    },
    getParam(item) {
      var menuCode = this.menuState
      var paramObj = {
        id: item.id
      }
      // 在路径中加入营销类型字段，用于区分当前激活的营销任务
      if (item.type) {
        paramObj.taskType = item.type
      }
      if (menuCode === this.const_menuCode.member) {
        paramObj['name'] = item.name
        paramObj['group'] = item.group
      } else if (menuCode === this.const_menuCode.dataChart) {
        paramObj['name'] = item.name
        paramObj['group'] = item.group
      }
      return paramObj
    },
    //隐藏正常版本中的一些内容(其他地方也是用这个方法)
    isShowSiderbar(name) {
      var isJur = this.jurisdictionData.secondShow
      var _name = name === '上新营销' || name === '活动营销' || name === '折扣促销' || name === '标记活动类型' || name === '新人礼' || name === '店内大力度激活' || name === '分布相关'
      return _name ? isJur ? true : false : true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
// 齿轮动画
@import '../../style/gear.scss';

.siderbar {
  overflow: auto;
  height: 99%;
  div:not(.gearbox.gear) {
    height: auto;
  }
  .gearbox {
    width: 300px;
    height: 300px;
    position: absolute;
    top: -99px;
    left: -36px;
    border: none;
    transform: scale(0.15);
  }
  .logo {
    height: 120px;
    width: 180px;
    position: fixed;
    overflow: hidden;
    z-index: 100;
    img {
      width: 100%;
    }
    .config_bg {
      position: absolute;
      top: 0;
    }
  }
  .node {
    padding: 5px 5px;
  }
  .sub_node {
    padding: 7px 0 6px 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #ccc;
    font-size: 12px;
  }
  .sub_node.home_sub {
    padding: 5px 0 5px 30px;
  }
  .active {
    position: relative;
    .sub_node {
      color: $primary;
    }
    &:after {
      content: '';
      position: absolute;
      top: 7px;
      left: -15px;
      width: 3px;
      height: 15px;
      background-color: $primary;
      z-index: 10;
    }
  }
  .siderbar_main {
    margin-top: 120px;
  }
  .finish_state {
    color: #009933
  }
  .finish_state_n {
    margin-left: 3px;
    color: #858585;
  }
  .finish_state_r {
    margin-left: 3px;
    color: #0BB8F8;
  }
  .notAllowed {
    &:hover {
      cursor: not-allowed;
    }
  }
  .top_title {
    font-size: 16px;
    color: #ccc;
    text-align: center;
    background: #393f51;
    box-shadow: 0px 0px 6px 0px black;
    padding: 10px 0;
  }
  .category_sider {
    font-size: 14px;
    background: #42474c;
    opacity: 0.6;
  }
}
</style>
