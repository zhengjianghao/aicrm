<template>
<div class="sub_main_content">
    <div class="user_toolbox">
        <div class="toolbox_control">
            <el-button-group >
                <el-button  :class="vm.activeTabName === 'end_time' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('end_time')">按快结束时间排序</el-button>
                <el-button   class="margin_left_tiny" :class="vm.activeTabName === 'activity_time' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('activity_time')">按快启用时间排序</el-button>
            </el-button-group>
        </div>
    </div>
    <div>
        <el-row type="flex">
             <!-- 遍历主菜单下的营销列表 -->
            <el-col :span="24" v-for="(item,index) in allHomeData" :key="item.name + index">
                <div class="menu">
                <div class="header">
                    <div class="line">
                    <div>
                        <span class="iconfont icon-dengbiansanjiao"></span>
                    </div>
                    </div>
                    <div class="header_name">
                        <!--输出主菜单中的营销类型和图标-->
                        <i class="iconfont icon_header" :class='item.icon'></i>{{item.name}}
                    </div>
                </div>
                <div  class="menu_body">
                    <ul>
                        <template v-for="value in item.mainData"  v-if="isShowSiderbar(value.name)">
                            <!--输出营销的类型标题 如物流异常，体验不佳等-->
                            <li class="menu_bottom menu_bottom_head">{{value.name}}</li>
                            <!--遍历指定营销类型下的营销任务-->
                            <template v-for="data in marketJobByParam">
                                <li>
                                    <!--进行权限检测  输出当前权限下可以操作的营销任务-->
                                    <div @mouseleave="mouseOut('')" @mouseenter="mouseOver(data.id)" class="menu_body_child" v-for="(markerT, index) in value.submenus" v-if="data.type.indexOf(markerT.types) == 0 && (markerT.finishState == 2 ? true : getJurisdictionUser(markerT.finishState))">
                                        <div class="vertical_line" :class="getStateClass(data.status, data.activity_status)"></div>
                                        <p v-show="data.id==markterId?!isHover:isHover"   class="task_name">{{data.title}}
                                            <span :class="markerT.finishState == 1 ? 'finish_state_r' : markerT.finishState == 2 ? 'finish_state' : 'finish_state_n'">{{getfinishState[markerT.finishState] }}</span>
                                        </p>
                                        <div v-show="data.id == markterId ? isHover : !isHover"   class="task_operation">
                                            <span v-if="value.name != '日常场景'">
                                                <i class="iconfont" :class="data.status === 'CLOSED' ? 'icon-runtask' : 'icon-stoptask'"></i>
                                                <a @click="doTask(data.id,data.status)">
                                                    <template v-if="data.status === 'CLOSED'">执行</template>
                                                    <template v-else>关闭</template>
                                                </a>
                                            </span>
                                            <i class="iconfont icon-zidingyi"></i><a @click="go(data,markerT.path)">编辑</a>
                                        </div>
                                    </div>
                                </li>
                            </template>
                            <!--进行权限检测  输出当前权限下不可以操作的营销任务-->
                            <!--<template v-for="(markerT, index) in value.submenus">
                                <li class="nocolor">
                                    <div class="menu_body_child" v-for="data in marketJobByParam" v-if="data.type.indexOf(markerT.types) == 0 && (getJurisdictionUser(markerT.finishState) ? false : ((markerT.finishState == 0 ? jurisdictionData.secondShow : false) || markerT.finishState == 1))">
                                        <div class="vertical_line" :class="data.status ==='CLOSED' ? data.status : data.activity_status"></div>
                                        <p class="task_name">
                                            {{data.title}}
                                            <span :class="markerT.finishState == 0 ? 'finish_state_n' : 'finish_state_r'">{{getfinishState[markerT.finishState] }}</span>
                                        </p>
                                    </div>
                                </li>
                            </template>-->
                        </template>
                    </ul>
                </div>
                </div>
            </el-col>
        </el-row>
    </div>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../misc/global.constant'
  import API_MARKET from '../../service/marketing.service'
  import moment from 'moment'
  export default {
    data() {
      return {
          isHover: true,
          timeout: {},
          markterId: '',
          g_const: globalConstant,
        vm: {
          activeTabName: 'end_time'
        },
        activeTabName: ''
      }
    },
    computed: {
      ...mapGetters([
        //   'subState',
          'marketJob',
          'marketJobByParam',
          'memberGroupData',
          'userData',
          'jurisdictionData',
          'allHomeData'
      ]),
      getfinishState() {
        return this.g_const.finishState.map(o => {
          return o
        })
      },
      homeDatas() {
        var _homeData = []
        for(var i in this.homeData) {
            var _list = API_MARKET.mergeMarketingData(this.homeData[i].mainData, this.marketJob)
            if(_list.length > 0) {
                _homeData.push({
                    name: this.homeData[i].name,
                    icon: this.homeData[i].icon,
                    isShow: this.homeData[i].isShow,
                    mainData: _list
                })
            }
        }
        return _homeData
      }
    },
    watch: {
        activeTabName() {
            if(this.marketJobByParam) {
                this.getMarketingJobByParam(this.activeTabName);
            }
        }
    },
    mounted() {
        this.getActiveMenuCode(this.menuCodes)
        if(!this.marketJob || !this.marketJob.length) {
            this.getMarketingJob()
        }
        // 未加载会员列表 则加载
        if(!this.memberGroupData || !this.memberGroupData.length) {
            this.getMemberGroup()
        }
        this.activeTabName = 'end_time'
    },
    methods: {
    ...mapActions([
        'getMarketingJob',
        'doMarketTask',
        'getMarketingJobByParam',
        'updateSiderbarActiveNode',
        'getActiveMenuCode',
        'getMemberGroup'
        ]),
        //返回是否有权限查看开发中的营销
        // value.finishData == 1 ? getJurisdictionUser() : true
        // getJurisdictionUser() ? false : value == 1
        getJurisdictionUser(value) {
            //var isShow = this.g_const.user_jurisdiction.indexOf(this.userData.user_id) >= 0 ? true : this.g_const.user_jurisdiction_part.indexOf(this.userData.user_id) >= 0 ? 'part' : false
            if(((this.jurisdictionData.secondShow) && value == 1) || ((this.jurisdictionData.allShow) && value == 0)) {
                return true
            }else {
                return false
            }
           // return this.g_const.user_jurisdiction.indexOf(this.userData.user_id) >= 0
        },
        switchTab(name) {
            this.vm.activeTabName = name;
            this.activeTabName = name
        },
        getStateClass(state, runState) {
            return state === 'OPEN' ? runState : 'CLOSED'
        },
        doTask(id,state) {
            if(state === 'OPEN') {
                state = 'close'
            }else if(state === 'CLOSED'){
                state = 'open'
            }
            this.doMarketTask([id,state]).then(() => {
                this.getMarketingJob()
            })
        },
        go(item,path) {
            var group
            if(item.type === 'PAYED_P4P_SYS') {
                group = '即时营销'
            }else if(item.type === 'POTENTIAL_P4P_SYS') {
                group = '复购营销'
            }else if(item.type === 'PAYED_P4P_CUSTOM' || 'POTENTIAL_P4P_CUSTOM') {
                group = '自定义'
            }
            this.updateSiderbarActiveNode({
            id: item.id,
            openName: group
            })
            this.$router.push({
            path: path,
            query : {
                id: item.id,
                type: item.type,
            }
            })
        },
        mouseOut(id) {
            // var that = this
            // this.timeout = setTimeout(function() {
            //     that.changeId(id)
            // }, 1);
            this.changeId(id)
        },
        mouseOver(id) {
            //clearTimeout(this.timeout)
            this.changeId(id)
        },
        changeId(id) {
            this.markterId = id
        },
        //隐藏正常版本中的一些内容(其他地方也是用这个方法)
        isShowSiderbar(name) {
            var isJur =  this.jurisdictionData.secondShow
            var _name = name === '上新营销' || name === '活动营销' || name === '折扣促销' || name === '标记活动类型' || name === '新人礼' || name === '店内大力度激活'
            return _name ? isJur ? true : false : true
            //  if( isJur && (name === '上新营销' || name === '活动营销' || name === '折扣促销' || name === '标记活动类型')) {
            //    return true
            //  }else {
            //    return false
            //  }
        }
    },
    props: [
        'homeData',
        'menuCodes'
    ]
}
</script>
<style lang="scss" scoped>
@import '../../style/variable.scss';
.header {
    background-color: #f7fbfc;
    border-bottom: 1px solid #dce1e4;
    border-top: 1px solid #dce1e4;
    text-align: center;
    font-size: 16px;
    position: relative;
    height: 100px;
    color: #afb3bc;
}
.align_center {
  text-align: center;
  background: $white;
}
.line {
    height: 5px;
    background-color: #f7fbfc;
    position: absolute;
    width: 100%;
    bottom: 0px;
    span {
      font-size: 10px;
      position: relative;
      top: -12px;
      color: #f7fbfc;
    }
}
.header_name {
    position: relative;
    font-size: 14px;
    top: 30px;
}
.el-col:hover {
  cursor: pointer;
  .line {
    background: $primary;
    span {
      color: $primary;
    }
  }
  .header_name {
      color: $primary;
  }

}
.menu_body_child {
    line-height: 50px;
    height: 50px;
    overflow: hidden;
    position: relative;
    font-size: 14px;
    border-bottom: 1px solid #dce1e4;
}
.vertical_line {
    width:0;
    height:0;
    border-width: 5px 7px;
    border-style:solid solid dashed dashed;
    position: absolute;
    right: 0px;
}
.task_name {
    text-align: center;
    font-size: 12px;
}
.task_operation {
    text-align: center;
    font-size: 12px;
    i {
        font-size: 12px;
        padding-left: 10px;
    }
    a {
        text-decoration: underline;
        padding: 0px 15px 0px 5px;
    }

}
.content {
    padding-top: 1px;
}
.user_toolbox {
    margin-bottom: 10px;
}
.el-col {
  border-right: 1px solid #dce1e4;
}
.icon-zidingyi {
    color: #929292;
}
.icon-stoptask {
    color: #e25050;
}
.icon-runtask {
    color: #579b45;
}
.ACTIVITY {
    border-color:#009933 #009933 transparent transparent;
}
.SLEEP {
    border-color:#ff9900 #ff9900 transparent transparent;

}
.CLOSED {
    border-color:#cccccc #cccccc transparent transparent;
}
.menu_bottom {
  padding: 15px 0px;
  border-bottom: 1px solid #dce1e4;
  font-size: 12px;
  color: #333;
}
.menu_bottom_head {
  color: #afb3bc;
  background: #f7f8f9;
  height: 24px;
  line-height: 24px;
  text-align: center;
  padding: 0px;
  &:hover {
    cursor: default;
    color: #afb3bc;
  }
}
.nocolor:hover {
    color: #333;
    cursor: not-allowed;
}
.icon_header {
    font-size: 22px;
    padding-right: 10px;
    vertical-align: middle;
}
.finish_state_n {
    color: #858585;
}
.finish_state_r {
    color: #0BB8F8;
}
.finish_state {
    color: #009933;
}
</style>
