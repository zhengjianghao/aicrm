<template>
  <div>
    <content-header name="会员管理">
    </content-header>
    <div class="sub_main_content">
      <el-row type="flex" class="align_center">
        <el-col :span="24" v-for="item in memberGroupData" v-if="item.name !== '全部会员'" :key="item.name">
          <div class="menu">
            <div class="header">
              <div class="line">
                <span class="iconfont icon-dengbiansanjiao"></span>
              </div>
              <!--<div class="icon_font"><span class="iconfont" :class="item.icon"></span></div>-->
              <div class="menu_name">
                <i class="iconfont icon_header" :class="item.icon"></i>{{item.name}}
              </div>
            </div>
            <div class="menu_body">
              <ul>
                <template v-for="(value, key) in item.submenus">
                  <template v-if="item.name == 'AI引擎流转分组'">
                    <li class="menu_bottom menu_bottom_head" :key="key" v-if="item.isObj">
                      <el-tooltip :content='toolContent[key]' placement="top" popper-class='tool_notes'>
                        <i class="iconfont icon-help1 toolGanTanHao"></i>
                      </el-tooltip>
                      {{key}}
                    </li>
                  </template>
                  <!--<template v-else>-->
                  <!--把未开发的隐藏-->
                  <!--双11导入功能隐藏-->
                  <!--<template v-else-if="(key === '自建营销' || key === '导入会员批次') ? jurisdictionData.secondShow : true">-->
                  <template v-else-if="(key === '自建营销') ? jurisdictionData.secondShow : true">
                    <li class="menu_bottom menu_bottom_head" :key="key" v-if="item.isObj">{{key}}</li>
                  </template>
                  <template v-for="(subItem, index) in value">
                    <!--v-if="subItem.name === '新建营销分组' ? jurisdictionData.secondShow : true" 隐藏未开发的-->
                    <!--v-if="(subItem.name === '新建营销分组' || subItem.name === '点击导入') ? 双11导入功能隐藏-->
                    <li v-if="(subItem.name === '新建营销分组') ? jurisdictionData.secondShow : true" class="menu_bottom" :key="subItem.name + index" :class="getJurisdictionUser(subItem.finishState) ? '' : 'noClick'" v-show="!subItem.more || index < 8 || openMore" @click="getJurisdictionUser(subItem.finishState) ? doClick(subItem) : doClick('')">
                      <template v-if="item.name == 'AI引擎流转分组' || item.name == '智能标签' || item.name == '会员等级分组'">
                        <el-tooltip v-if="item.name == 'AI引擎流转分组'" :content='toolContent[subItem.name]' placement="top-start" popper-class='tool_notes'>
                          <i class="iconfont icon-help1 toolGanTanHao"></i>
                        </el-tooltip>
                        <span :class="subItem.class">{{subItem.name}}</span>
                        <span :class="subItem.finishState == 0 ? 'finish_state_r' : subItem.finishState == 1 ? 'finish_state_n' : ''">{{subItem.finishState == 0 ? '(待开发)' : subItem.finishState == 1 ? '(测试中)' : ''}}</span>
                        <!--<span class='num_p'>{{subItem.percentage}}</span>
                          <span class='num_p'>{{subItem.num}}</span>
                          <i class="iconfont" :class="subItem.float == 'up' ? 'icon-shangsheng' : 'icon-xiajiang'"></i>-->
                      </template>
                      <template v-else>
                        <el-tooltip v-if="subItem.name == '灰名单' || subItem.name == '黑名单'" :content='toolContent[subItem.name]' placement="top-start" popper-class='tool_notes'>
                          <i class="iconfont icon-help1 toolGanTanHao"></i>
                        </el-tooltip>
                        <span :class="subItem.class">{{subItem.name}}</span>
                        <span :class="subItem.finishState == 0 ? 'finish_state_r' : subItem.finishState == 1 ? 'finish_state_n' : ''">{{subItem.finishState == 0 ? '(待开发)' : subItem.finishState == 1 ? '(测试中)' : ''}}</span>
                      </template>
                    </li>
                    <li class="menu_bottom" v-show="subItem.more && index >= 8 && index === value.length-1" @click="openMore = !openMore">
                      <span class="link primary">{{!openMore?'更多':'收起'}}</span>
                    </li>
                  </template>
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
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../../misc/global.constant'
export default {
  data() {
    return {
      g_const: globalConstant,
      openMore: false,
      toolContent: {
        平销: '日常销售引进的买家，包含老顾客专享促销的',
        活动: '通过外部活动引流进来的买家',
        潜在客户: '历史上只有拍下记录，从未有过成功付款记录的买家定义为【潜在客户】',
        潜在客户: '历史上只有拍下记录，从未有过成功付款记录的买家定义为【潜在客户】',
        处女购: '历史上仅有一次成功交易的且还在第二次购物周期内新买家定义为【处女购客户】',
        沉睡客户: '处女购客户未购物周期超过AI引擎分析购物周期容错值的流转到【沉睡客户】',
        活跃客户: '历史上有过两次及两次以上成功购物，并且购物周期始终在AI引擎分析购物周期容错值内的高度活跃买家流转为【活跃客户】',
        预流失客户: '活跃客户未购物周期超过AI引擎分析购物周期容错值的流转到【预流失客户】',
        流失客户: '预流失客户未购物周期超过AI引擎分析购物周期容错值的流转到【流失客户】',
        失败客户: '最近一次购物后又退款的导致交易失败的买家流转到【失败客户】',
        可转化活动型客户: '购买活动商品的同时又购买了非活动商品的买家定义为【可转化活动型客户】',
        聚划算活动客户: '购买商品主要为聚划算商品的买家定义为【聚划算活动客户】一般系统会自动检测到',
        品牌团活动客户: '购买商品主要为品牌团商品的买家定义为【品牌团活动客户】需要人工标记活动类型',
        淘抢购活动客户: '购买商品主要为淘抢购商品的买家定义为【淘抢购活动客户】一般系统会自动检测到',
        其他淘宝活动客户: '购买商品主要为其他淘宝活动（如618、上新等）商品的买家定义为【其他淘宝活动客户】需要人工标注活动类型',
        淘外大力度活动客户: '购买商品主要为淘外活动（如折800、卷皮等）商品的买家定义为【淘外大力度活动客户】需要人工标注活动类型',
        店内大力度活动客户: '购买商品主要为店内组织的大力度活动商品的买家定义为【淘外大力度活动客户】需要人工标注活动类型',
        双11活动客户: '历史上仅在双11当天购买过商品的买家定义为【双11活动客户】，系统自动计算',
        双12活动客户: '历史上仅在双12当天购买过商品的买家定义为【双12活动客户】，系统自动计算',
        灰名单: '加入本名单后仅仅指不再给客户推送任何短信（千牛不影响），但是会员营销等照常参加有效',
        黑名单: '列入黑名单后将不在参与本系统的任何营销及推送任务，包括折扣等'
      }
    }
  },
  mounted() {
    // 未加载会员列表 则加载
    if (!this.memberGroupData || !this.memberGroupData.length) {
      this.getMemberGroup()
    }
    // 充值左侧菜单选中项
    this.updateSiderbarActiveNode({
      id: this.$route.query.id,
      openName: ''
    })
    //获取会员数据
    if (!this.memberLevelData.groups) {
      this.getMemberLevel()
    }
  },
  computed: {
    ...mapGetters([
      'memberGroupData',
      'userData',
      'jurisdictionData',
      'memberLevelData'
    ])
  },
  methods: {
    ...mapActions([
      'updateSiderbarActiveNode',
      'getMemberGroup',
      'updateOpenModal',
      'getMemberLevel'
    ]),
    // getJurisdictionUser(value) {
    //   return this.g_const.user_jurisdiction.indexOf(this.userData.user_id) >= 0 ? true : value == 0 ? false : true
    // },
    getJurisdictionUser(value) {
      //var isShow = this.g_const.user_jurisdiction.indexOf(this.userData.user_id) >= 0 ? true : this.g_const.user_jurisdiction_part.indexOf(this.userData.user_id) >= 0 ? 'part' : false
      if (value == 2 || ((this.jurisdictionData.secondShow) && value == 1) || ((this.jurisdictionData.allShow) && value == 0)) {
        return true
      } else {
        return false
      }
    },
    doClick(item) {
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
        query: {
          id: item.id,
          name: item.name,
          type: item.group
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/variable.scss';

.icon_font {
  line-height: 14px;
  position: relative;
  top: 40px;
  span {
    font-size: 30px;
  }
}

.menu_name {
  position: relative;
  font-size: 14px;
  top: 45px;
}

.align_center {
  text-align: center;
  background: $white;
}

.header {
  background-color: #f7fbfc;
  border-bottom: 1px solid #dce1e4;
  text-align: center;
  font-size: 16px;
  padding-bottom: 20px;
  position: relative;
  height: 100px;
  color: #afb3bc;
}

.el-col {
  border-right: 1px solid #dce1e4;
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
  padding: 0px;
  &:hover {
    cursor: default;
    color: #afb3bc;
  }
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

li:hover {
  color: $primary;
  cursor: pointer;
}

.noClick:hover {
  cursor: not-allowed;
}

.el-col:hover {
  cursor: pointer;
  .line {
    background: $primary;
    span {
      color: $primary;
      margin: 0px 10px;
    }
  }
  .header {
    color: $primary;
  }
}

.icon_header {
  font-size: 22px;
  padding-right: 10px;
  vertical-align: middle;
}

.finish_state_r {
  color: #999999;
  margin-left: 5px;
}

.finish_state_n {
  color: #0BB8F8;
  margin-left: 5px;
}

.icon-shangsheng {
  font-size: 12px;
  color: #ff7900;
}

.icon-xiajiang {
  font-size: 12px;
  color: #009933;
}

.num_p {
  color: #0BB8F8;
}
</style>
