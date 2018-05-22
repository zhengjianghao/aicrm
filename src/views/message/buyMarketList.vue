<template>
  <div style="padding-bottom: 20px;">
    <div class="of_c nice_scroll message-road">
        <el-collapse v-model="activeNames">
          <!--短信通道设置（针对各营销任务）start-->
          <!--遍历父级菜单-->
          <el-collapse-item v-for="(item, index) in buyMarketListFor" :name="index" :id="'mark' + index" :key="index">
            <template slot="title">
              <!--父菜单名称-->
              {{item.name}}
            </template>
            <el-collapse v-model="activeCNames">
              <!--遍历子级菜单-->
              <el-collapse-item v-for="value in item.mainData" :name="value.name" :key="value.name">
                <template slot="title">
                  <!--子菜单名称-->
                  {{value.name}}
                </template>
                <template v-if="value.name == '体验不佳'">
                  <el-row class="road_position_choose" style="line-height: 32px">
                    <el-col :span="4">
                      <div v-for="(markerTs, index) in value.submenus" :key="markerTs.name + index">
                        {{markerTs.name}}
                      </div>
                    </el-col>
                    <el-col :span="4" style="height: 256px; line-height: 256px">
                      <div class="brackets_box">
                        <div class="brackets_top_r"></div>
                        <div class="brackets_top_l"></div>
                        <div class="brackets_gt"></div>
                        <div class="brackets_bottom_l"></div>
                        <div class="brackets_bottom_r"></div>
                      </div>
                      <span class="past">{{value.submenus[0].pastDate ? (moment(value.submenus[0].pastDate).format('YYYY-MM-DD HH:mm') + '过期') : ''}}</span>
                    </el-col>
                    <el-col :span="16" style="height: 256px; line-height: 256px">
                      <a 
                        @click="toBuyMarket(buys, '8个场景', value.name, item.name)" 
                        class="buy_market_link" 
                        target="_blank" 
                        href="javascript:void(0);" 
                        v-for="(buys, index) in value.submenus[0].buys" :key='index'>
                        <span>{{buys.name}}</span>
                      </a>
                    </el-col>
                  </el-row>
                </template>
                <!--遍历子菜单下的营销任务-->
                <template v-else>
                  <template v-for="(markerTs, index) in value.submenus">
                    <!--输出营销任务名称，开发状态（后端未添加初始值则不显示‘markerTs.type.indexOf(marketT.type) == 0’）-->
                    <el-row class="road_select road_position_choose" :key="markerTs.name + index" v-if="markerTs.finishState == 2">
                      <el-col :span='4'>
                        <span>{{markerTs.name}}</span>
                      </el-col>
                      <el-col :span='4' style="height: 32px; line-height: 32px">
                        <span class="past">{{markerTs.pastDate ? (moment(markerTs.pastDate).format('YYYY-MM-DD HH:mm') + '过期') : ''}}</span>
                      </el-col>
                      <el-col :span='16'>
                        <a 
                          @click="toBuyMarket(buys, markerTs.name, value.name, item.name)" 
                          class="buy_market_link" 
                          target="_blank" 
                          href="javascript:void(0);" 
                          v-for="(buys, index) in markerTs.buys" :key='index'>
                          <span>{{buys.name}}</span>
                        </a>
                      </el-col>
                    </el-row>
                  </template>
                </template>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
          <!--短信通道设置 end-->
        </el-collapse>
    </div>
    <div class="position_quick link">
      <a href="#mark0">
        <span class="el-icon-caret-top">
        </span>
        回到顶部
      </a>
      <div class="position_icon">
        <span class="iconfont icon-link"></span>快速定位</div>
      <div class="position_ul">
        <ul>
          <template v-for="(mark,index) in allData" v-if="mark.name != '效果分成'">
            <li :key="index" :class="vm.activeLineName === mark.name ? 'li_checked' : ''" @click="positionQuick(mark.name)">
              <a :href="'#mark'+index">{{mark.name}}</a>
            </li>
          </template>
        </ul>
      </div>
      <div class="last_disc">
      </div>
    </div>
    <!--<+-->

  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import MESSAGE from '../../service/message.service'
import moment from 'moment'
export default {
  data() {
    return {
      vm: {
        activeTabName: 'HIGH',
        activeLineName: '流失防御',
        state: '开启',
      },
      moment: moment,
      showPay: false,
      activeNames: [0,1], //外层折叠打开
      activeCNames: this.activeChild, // 内层折叠打开
      allData: globalConstant.allMarket,
    }
  },
  watch: {
    activeChild() {
      this.activeCNames = this.activeChild
    }
  },
  mounted() {
    this.getBuyMarketList()
  },
  computed: {
    ...mapGetters([
      'buyMarketList',
      'userData',
      'openModalState'
    ]),
    buyMarketListFor() {
      return this.buyMarketList.filter(o => {
        return o.name != '效果分成'
      })
    }
  },
  methods: {
    ...mapActions([
      'updateOpenModal',
      'getMarketingJob',
      'getBuyMarketList',
      'getPayOrderData'
    ]),
    positionQuick(name) {
      this.vm.activeLineName = name
    },
    /**
     * 配置付款信息
     * @param buy {Object} 购买信息
     * @param buy_name {String} 购买场景名称
     * @param scene_name {String} 购买场景上级场景名称
     * @param f_scene_name {String} 购买场景最上级场景名称
     */
    toBuyMarket(buy, buy_name, scene_name, f_scene_name) {
      // 配置付款信息
      let payData = {}
      let orderC = 0
      var that = this
      payData.service = f_scene_name + '-' + scene_name + '-' + buy_name + '购买' + buy.name
      payData.cycle = buy.name.split('/')[1]
      payData.amount = parseFloat(buy.name.split('元/')[0])
      payData.order_url = buy.order_url
      payData.item_code = buy.item_code
      if (payData.cycle === '季') {
        orderC = 3
      } else if (payData.cycle === '半年') {
        orderC = 6
      } else if (payData.cycle === '年') {
        orderC = 12
      } else {
        orderC = 0
      }
      // 验证能否购买
      MESSAGE.isCanBuy(this.userData.user_id, orderC, buy.item_code).then(o => {
        if(o) {
          // 保存付费信息
          that.getPayOrderData(payData)
          that.openModal('payOrder')
        } else {
          let newWin = window.open()
          newWin.location.href = '/confirm_order'
        }
      })
      // 打开付费弹框
      // this.openModal('payOrder')
    },
    // 打开弹框
    openModal(code) {
      this.updateOpenModal({
        name: code,
        param: {
          state: ''
        }
      })
    },
    payReady() {
      this.showPay = false
    }
  },
  props: ['activeChild']
}
</script>
<style lang="scss" scoped>
.road_position_choose {
  margin: 10px 0 0 40px;
}
.past {
  color: #ff7900;
}
.position_quick {
  position: fixed;
  right: 90px;
  bottom: 60px;
  font-size: 12px;
  .position_icon {
    margin-top: 20px;
    .icon-link {
      font-size: 16px;
      margin: 0px 10px;
    }
  }
}

.position_ul {
  border-left: solid 1px #9a9a9a;
  padding-bottom: 20px;
  position: relative;
  left: 16px;
  ul {
    list-style: disc;
    color: #9a9a9a;
    position: relative;
    li {
      margin-left: 17px;
      font-size: 24px;
      height: 28px;
      line-height: 28px;
      a {
        display: inline-block;
        font-size: 12px;
        color: #9a9a9a;
      }
    }
    li.li_checked {
      color: #00BBFF;
      a {
        color: #00BBFF;
      }
    }
  }
}

.last_disc {
  border: solid 2px #9a9a9a;
  border-radius: 6px;
  width: 6px;
  height: 6px;
  position: relative;
  left: 12px;
}

.el-icon-caret-top {
  font-size: 8px;
  display: inline-block;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  color: #ffffff;
  background: #cccccc;
  border-radius: 5px;
  margin: 0px 10px 0px 8px;
}

.user_toolbox {
  .toolbox_control {
    padding-top: 8px;
  }
}

.otherRoad {
  margin-top: 5px;
}

.switch_box {
  padding-top: 8px;
  padding-right: 20px;
  overflow: hidden;
  p {
    clear: both;
    margin-top: 5px;
  }
  .switch_small {
    .switch-out {
      height: 30px;
      line-height: 30px;
    }
  }
}

.of_c {
  max-height: 410px;
  min-height: 410px;
  overflow: auto;
  padding-bottom: 20px;
}

.road_select {
  height: 30px;
  line-height: 32px;
}

.buy_market_link {
  display: inline-block;
  width: 80px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
}

.toPay {
  width: 460px;
}
.brackets_box {
  position: relative;
  left: -156px;
  top: 10px;
  color: #00BBFF;
  .brackets_top_r {
    width: 14px;
    height: 14px;
    border: solid 1px #00BBFF;
    border-radius: 14px 0px 0px 0px;
    border-left: white;
    border-right: white;
    border-bottom: white;
    position: absolute;
    transform: rotate(85deg);
    left: 120px;
    top: 3px;
  }
  .brackets_top_l {
    width: 1px;
    position: absolute;
    height: 94px;
    top: 16px;
    left: 133px;
    border-right: solid 1px #00BBFF;
  }
  .brackets_gt {
    width: 8px;
    height: 8px;
    border: solid 1px;
    position: absolute;
    left: 129px;
    top: 111px;
    border-color: #00BBFF #00BBFF white white;
    transform: rotate(45deg);
  }
  .brackets_bottom_l {
    width: 1px;
    position: absolute;
    height: 96px;
    top: 122px;
    left: 133px;
    border-right: solid 1px #00BBFF;
  }
  .brackets_bottom_r {
    width: 14px;
    height: 14px;
    border: solid 1px #00BBFF;
    border-radius: 0px 0px 0px 14px;
    border-left: white;
    border-right: white;
    border-top: white;
    transform: rotate(275deg);
    position: absolute;
    top: 217px;
    left: 120px;
  }
}


</style>
