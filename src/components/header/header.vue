<template>
  <div class="allTop">
    <!-- 顶部工具栏 -->
    <div class="topTool">
      <div class="over_hidden" @click="showBouncedBox()">
        <span class="iconfont icon-message primary"></span>
        <el-tooltip :content='update_data.title.topTitle' placement="bottom-start" :open-delay="1000" effect="light">
          <span>{{ update_data.title.topTitle }}</span>
        </el-tooltip>
        <span class="primary link hide">了解详情</span>
      </div>
      <ul class="list-menu over_header" style="padding-right: 10px;">
        <li>
          <a target="_blank" href="http://amos.alicdn.com/getcid.aw?v=2&uid=%E6%9D%AD%E5%B7%9E%E8%81%9A%E6%95%88%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&site=cntaobao&s=2&groupid=0&charset=utf-8"><img style="margin-top:8px;" border="0" src="http://amos.alicdn.com/online.aw?v=2&uid=%E6%9D%AD%E5%B7%9E%E8%81%9A%E6%95%88%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&site=cntaobao&s=2&charset=utf-8" alt="魔方墙AI CRM智慧引擎" title="" /></a>
        </li>
        <li>
          <span class="iconfont icon-synch"></span>
          <span>{{ sycnTime }}</span> 按效果分成预付费：
          <span class="num" @click="openModal(gbConst.msgConfig)">{{parseFloat(user.money_remain).toFixed(3)}}元</span>
          扩展场景自用短信：
          <span class="num" @click="openModal(gbConst.msgConfig)">{{user.ordinary_sms_remain}}条</span>
          <!--<span class="num">{{ user.ali_sms_remain }}条</span>(阿里)-->
        </li>
        <li>
          <span class="smallbtn link" @click="openModal(gbConst.msgConfig)">充值</span>
        </li>
        <img src="../../assets/images/config_bg.jpg" style="display: none; with: 0px; height: 0px" />
        <!--<li>
                                        还有
                                        <span class="num"> {{user.expired_date }}天</span>过期
                                      </li>
                                      <li>
                                        <a class="smallbtn link" href="https://fuwu.taobao.com/ser/detail.htm?spm=0.0.0.0.p5FypM&service_code=FW_GOODS-1000327190" target="view_window">续费</a>
                                      </li>-->
        <li class="primary link" style="margin: 0 8px;" @click="openModal(gbConst.systemConfig)">
          <span class="iconfont icon-custom">
          </span>
          设置
        </li>
        <li>
          <span class="smallbtn link" @click='openModal(gbConst.quickSendMessage)'>速发短信</span>
        </li>
        <li class="link">
          <span class="iconfont icon-userSet">
          </span>
          欢迎&nbsp;
          <el-dropdown trigger="click" @command="otherSettingClick">
            <span class="el-dropdown-link user">
              <span class="num">{{ user.user_nick === 'sky507ct' ? 's******t' : user.user_nick === 'coffee711' ? 'c*******1' : user.user_nick }}</span>
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix dropList" command="serviceCenter">
                客服中心
              </el-dropdown-item>
              <el-dropdown-item class="clearfix dropList" command="userLogout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <!-- 主菜单 -->
    <div class="headerMenu">
      <ul class="list-menu">
        <el-row type="flex" justify="center">
          <template v-for="(item,index) in headerConstant">
            <el-col :span='24' :key="item.name + index">
              <li v-if="item.finishState !== 0 && item.finishState !== 1" :class="{active: menuActiveCode === item.state}" @click="doClick(item.state)">
                <span class="iconfont" :class="[item.icon, item.class]"></span>
                {{item.name}}
              </li>
              <li v-else-if="item.finishState === 0" class="disabeldMenu">
                <span class="iconfont" :class="[item.icon, item.class]"></span>
                <span style="display:inline-block;">{{item.name}}</span>
                <span class="undev" style="display:inline-block;">{{getfinishState[item.finishState] }}</span>
              </li>
            </el-col>
          </template>
        </el-row>
      </ul>
    </div>
    <!--重要信息提示-->
    <div class="important_information_box">
      <div class="important_content" @click="jumpToForSigleInfo(important_msg_obj)" v-if="importantMessage.length > 0" :class="{link: importantMessage.length > 2 || importantMessage.length == 1 }">
        <i style="color: #e6a23c;font-size:32px;float:left;" class="el-alert__icon el-icon-warning is-big"></i>
        <div class="important_scroll_box">
          <div class="important_scroll" id="important_scroll" v-if="importantMessage.length <= 2">
            <v-template v-for="(data, index) in importantMessage" :key="data.type" @click="jumpTo(data)">
              <span>{{String.fromCharCode((65 + index)) + '. ' + data.value}}</span>&nbsp;&nbsp;
            </v-template>
          </div>
          <div class="important_scroll" id="important_scroll" v-else-if="importantMessage.length > 2">
            <transition name="el-fade-in">
              <span v-show="importantMessageShow" @click="jumpTo(important_msg_obj)">{{important_msg_obj.value}}</span>
            </transition>
          </div>
        </div>
      </div>
      <div class="initialization_box" v-if="progressData.is_show">
        <el-row>
          <el-col :span="3">
            <div class="initialization_box_left">
              <i class="iconfont icon-jindutiao progress_icon"></i>
              <span>初始化进度</span>
            </div>
          </el-col>
          <el-col :span="21">
            <el-steps :space="'22%'" :active="progressData.actived" finish-status="success" :center="true" :align-center="true">
              <el-step v-for="(data, index) in progressData.progress_info" :key="index" :status="data.state">
                <template slot="title">
                  <div>
                    <span>{{data.text}}</span>
                    <span style="font-size: 12px; font-weight: 400">{{data.finish_time}}</span>
                  </div>
                </template>
              </el-step>
            </el-steps>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 同步数据提醒 -->
    <div class="fixedHint" v-if="synchronousData">
      <el-alert title="同步提醒" type="warning" description="最近3个月数据同步中、AI思维引擎分析处理中，预计24小时内完成 ^_^" show-icon>
      </el-alert>
    </div>
    <!-- 版本更新通知(弹窗) -->
    <div class="versionUpdate" v-if="versionUpdate">
      <bounced-box :updateData="update_data"></bounced-box>
    </div>
  </div>
</template>
<script>
import g_const from '../../misc/global.constant'
import update_data from './versionUpdate'
import moment from 'moment'
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      // headerData: headerConstant,
      g_const: g_const,
      update_data: update_data,
      isFirst: true,
      top: 0,
      show1: true,
      show2: false,
      important_msg_obj: {},
      importantMessageShow: true

    }
  },
  mounted() {
    var that = this
    if (this.userData.length === 0) {
      that.getUser()
    }
    // 店铺扣费规则
    this.getDeductionRule()
    this.getSettingContact()
    this.getSettingGlobal()
    this.getMessageChargeList()
    this.getMarketingJob('true')
    this.getMemberLevel()
    // 获取头部重要信息
    this.getImportantMessage()
    // 定时请求初始化进度
    this.getProgress()
    this.getProgressTimer()
  },
  computed: {
    ...mapGetters([
      'menuState',
      'userData',
      'synchronousData',
      'versionUpdate',
      'jurisdictionData',
      'headerConstant',
      'marketJob',
      'importantMessage',
      'progressData'
    ]),
    getfinishState() {
      return this.g_const.finishState.map(o => {
        return o
      })
    },
    menuActiveCode() {
      return this.menuState
    },
    gbConst() {
      return g_const.openModalCodes
    },
    user() {
      return this.userData
    },
    notice() {
      return '暂无'
    },
    showImportNotice() {
      return this.userData.tips < 3
    },
    sycnTime() {
      var syTime = this.userData.modified
      var noneSycn = '数据尚未同步'
      if (syTime) {
        syTime = moment(syTime).format('M-D H:mm')
        if (syTime === 'Invalid date') {
          syTime = noneSycn
        } else {
          syTime = '同步 ' + syTime
        }
      } else {
        syTime = noneSycn
      }
      return syTime
    }
  },
  watch: {
    importantMessage() {
      this.tranformInfo()
      this.getDom()
    },
    progressData() {
      this.tranformInfo()
    }
  },
  methods: {
    ...mapActions([
      'updateOpenModal',
      'logout',
      'getSettingContact',
      'getSettingGlobal',
      'getMessageChargeList',
      'getUser',
      'getMarketingJob',
      'jurisdictionVerification',
      'getMemberLevel',
      'showVersionUpdate',
      'getImportantMessage',
      'getDeductionRule',
      'getProgress',
      'getActiveMenuCode'
    ]),
    // 延迟执行 毫秒
    sleep(time) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve();
        }, time);
      })
    },
    // 获取高度
    tranformInfo() {
      var _tip = document.getElementsByClassName('important_information_box')[0]
      var header_box = document.getElementsByClassName('header_wraper')[0]
      var _height = 122 // head默认高度
      var _animation = 0 // 有动画的head高度
      if (_tip && this.importantMessage.length > 0) {
        // 因为设置了css动画，消息框会平滑过渡到指定高度
        _animation = _animation + 46
        _height = _height + 46
        // 因为设置了css动画，头部会平滑过渡到指定高度
        // header_box.style.height = '165px'
      }
      if (_tip && this.progressData.is_show) {
        _height = _height + 85
        _animation = _animation + 85
      }
      _tip.style.height = _animation + 'px'
      header_box.style.height = _height + 'px'
      // 图标改为loading 还需要修改
      // if(this.progressData.is_show) {
      //   let _step = document.getElementsByClassName('el-steps')[0]
      //   if(_step) {
      //     // _step.children[this.progressData.actived].children[0].children[1].
      //     let _s = _step.children[this.progressData.actived]
      //     let _t = _s.getElementsByClassName('el-step__icon')
      //     // let _n = _t[0].getElementsByTagName('i')
      //     let _i = document.createElement('i')
      //     _i.className = 'el-icon-loading'
      //     _t[0].innerHTML = ''
      //     _t[0].appendChild(_i)
      //     console.log(_t[0])
      //   }
      // }
    },
    // 退出登录
    otherSettingClick(code) {
      if (code === 'userLogout') {
        this.logout()
      } else if (code === 'serviceCenter') {
        this.getActiveMenuCode('/homepage')
        this.$router.push('/serverCenter')
      } else {
        this.openModal(code)
      }
    },
    // 头部整个消息框的点击回调函数，当消息小于3条是不可用
    jumpToForSigleInfo(value) {
      if (this.importantMessage.length > 2) {
        this.jumpTo(value)
      } else if (this.importantMessage.length == 1) {
        this.jumpTo(this.importantMessage[0])
      }
    },
    // 头部消息框里文字的点击回调函数
    jumpTo(value) {
      if (value.openModel) {
        this.openModal(value.openModel[0], value.openModel[1])
      } else if (value.path) {
        this.go(value.type + '_P4P_SYS', value.path)
        // this.$router.push(value.path)
      }
    },
    // 跳转场景函数
    go(curType, curPath) {
      let that = this
      for (let i = 0; i < that.marketJob.length; i++) {
        if (that.marketJob[i].type === curType) {
          let item = {
            id: that.marketJob[i].id,
            path: curPath,
            type: that.marketJob[i].type
          }
          that.goto(item)
          break
        }
      }
    },
    goto(item) {
      this.$router.push({
        path: item.path,
        query: this.getParam(item)
      })
    },
    getParam(item) {
      // var menuCode = this.menuState
      var paramObj = {
        id: item.id
      }
      if (item.type) {
        paramObj.taskType = item.type
      }
      return paramObj
    },
    //

    openModal(code, name) {
      this.updateOpenModal({
        name: code,
        param: {
          state: name ? name : ''
        }
      })
    },
    doClick(state) {
      if (state == 'buyMarketingJob') {
        this.openModal('buyMarketingJob')
      } else {
        if (state != '/memberManage/home') {
          this.getMarketingJob()
        }
        this.$router.push(state);
      }
    },
    showBouncedBox() {
      this.showVersionUpdate(1)
    },
    // 头部提示轮播动画
    getDom() {
      var that = this
      var timer = 0
      if (this.importantMessage.length > 2) {
        var i = 0
        that.importantMessageShow = true
        that.important_msg_obj = that.importantMessage[i]
        timer = setInterval(async function() {
          i++
          that.importantMessageShow = false
          if (i > that.importantMessage.length - 1) i = 0
          await that.sleep(250)
          that.importantMessageShow = true
          that.important_msg_obj = that.importantMessage[i]
        }, 1000 * 5)
      } else {
        clearInterval(timer)
        that.important_msg_obj = {}
      }
    },
    // 定时请求初始化进度
    getProgressTimer() {
      var that = this
      var _timer = setInterval(() => {
        that.getProgress().then(o => {
          if (!o.is_show || o.progress_info[4].state === 'success') {
            // that.tranformInfo()
            clearInterval(_timer)
          }
        })
      }, 1000 * 60 * 10)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';

.allTop {
  /*头部背景色*/
  background-color: $yin;
  font-size: $menuFontSize;
  .new_item {
    margin-top: -1px;
  }
  /*顶部工具栏*/
  .topTool {
    color: #585858;
    line-height: 30px;
    height: 30px;
    margin: 0 6px;
    padding-left: $moduleMargin;
    position: relative;
    .num {
      &:hover {
        cursor: pointer;
      }
      color: #ff7900;
    }
    .iconfont {
      font-size: 13px;
    }
    li {
      padding: 0 4px;
    }
  }
  .headerMenu {
    border-top: 1px solid $line-color;
    border-bottom: 1px solid $line-color;
    height: 90px;
    padding-left: ($moduleMargin + 16);
    color: $menuColor;
    .iconfont {
      height: 40px;
      font-size: 30px;
    }
    li {
      margin: 15px 25px;
      span {
        display: block;
      }
      &:hover {
        cursor: pointer;
        color: $primary;
      }
      a {
        &:hover {
          color: $primary;
        }
      }
    }
    .disabeldMenu {
      &:hover {
        color: $menuColor;
        cursor: default;
      }
    }
  }
}








/*用户设置下拉框*/

.el-dropdown-menu {
  background-color: $yin;
}

.user {
  color: $warning;
  i {
    font-size: $menuFontSize;
    color: $menuColor;
  }
}

.dropList {
  font-size: 13px;
  text-align: center;
}

.over_hidden {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap; // width: 32%;
  padding-right: 890px;
  cursor: pointer;
}

.over_header {
  position: absolute;
  right: 0px;
  top: 0px
}

.el-row {
  width: 100%;
}

.important_information_box {
  height: 0;
  /* 消息容器尺寸变化会触发动画 */
  transition: 1s 1s ease;
  margin: 3px 10px 0 10px;
  overflow: hidden;
  .important_content {
    overflow: hidden;
    background-color: #fdf6ec; // border: 1px solid rgba(255, 181, 70, 0.29);
    color: #e6a23c;
    padding: 6px;
    text-align: center;
    span {
      font-size: 14px;
    }
  }
  .important_scroll_box {
    float: left;
    height: 20px;
    overflow: hidden;
    margin: 6px 0 0 12px;
  }
  .important_scroll {
    position: relative;
    line-height: 20px;
    span {
      font-size: 15px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}

.initialization_box {
  // border: 1px solid rgba(11, 184, 248, 0.29);
  margin-top: 4px;
  padding-top: 8px;
  background: #f1f1f1;
}

.initialization_box_left {
  position: relative;
  left: 6px;
  top: 12px;
  overflow: hidden;
  .progress_icon {
    background: #0BB8F8;
    width: 32px;
    border-radius: 54%;
    height: 32px;
    line-height: 32px;
    display: inline-block;
    color: white;
    float: left;
  }
  span {
    height: 32px;
    line-height: 32px;
    margin-left: 8px;
    font-size: 14px;
    color: #0BB8F8;
  }
}
</style>
