<template>
  <div>
    <!--<div class="homepage_chart_line" v-if="false">
        <el-tabs @tab-click="activeChart" v-model="activeName1">
          <el-tab-pane label="昨日一览" name="jinriyilan">
            <chart-jinriyilan></chart-jinriyilan>
          </el-tab-pane>
          <el-tab-pane label="差评" name="chaping">
            <chart-chaping></chart-chaping>
          </el-tab-pane>
          <el-tab-pane label="转化" name="zhuanhua">
            <chart-zhuanhua></chart-zhuanhua>
          </el-tab-pane>
          <el-tab-pane label="发货" name="fahuo">
            <chart-fahuo></chart-fahuo>
          </el-tab-pane>
          <el-tab-pane label="回款" name="huikuan">
            <chart-huikuan></chart-huikuan>
          </el-tab-pane>
        </el-tabs>
      </div>-->
    <div class="base_chart_wraper home_base_chart">
      <div class="chart_title">
        <i class="iconfont icon-xiaoguofencheng"></i>
        <span class="title_custom">按效果分成数据</span>
      </div>
      <el-tabs @tab-click="activeChart" v-model="activeName2">
        <el-tab-pane label="产出销售额" name="xse">
          <chart-xse></chart-xse>
        </el-tab-pane>
        <el-tab-pane label="服务费" name="fwf">
          <chart-fwf></chart-fwf>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class='home_img'>
      <img style="width: 100%;height: 100%" src="../../assets/images/Rectangle.jpg" />
      <img class="img_word" src="../../assets/images/Group.png" />
    </div>
    <!--双11短信折扣组件 暂时注释-->
    <!--<charge-homepage></charge-homepage>-->

  </div>
</template>
<script>
import chartXse from './chart-xse/chart-xse.vue'
import chartFwf from './chart-fwf/chart-fwf.vue'
import globalConstant from '../../misc/global.constant'
import config from '../../misc/config'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeName1: globalConstant.activeCode.jinriyilan,
      activeName2: globalConstant.activeCode.xse,
      g_const: globalConstant,
      dataUrl: '',
      loading: false,
      processText: '',
      processNum: 0,
      selMonthCount: '3',
      selCustomerType: 'all',
      config: config,
      tooltipContent: '采用视觉化抓取数据方式，点越密集说明此客单价区间买家越集中（亮度为点密集叠加后的效果，越亮越密集），用于观察店铺客单价格带分布情况，亦可作为店铺营销的重要依据，比如满减优惠等'
    }
  },
  mounted() {
    this.getActiveMenuCode(globalConstant.activeMenuCodes.home)
    this.updateSiderbarActiveNode({
      id: '',
      openName: ''
    })
    // 强制加载会员数据
    this.getMemberGroup()
  },
  computed: {
    ...mapGetters([
      'userData',
      'jurisdictionData'
    ]),
    // 返回当前用户id
    userIdCur() {
      return this.userData.user_id
    }
  },
  watch: {
    // 客单价页面被激活是触发
    dataUrl() {
      if (this.dataUrl) {
        this.iframeLoaded()
      }
    }
  },
  methods: {
    ...mapActions([
      'getSubCode',
      'getActiveMenuCode',
      'updateSiderbarActiveNode',
      'getMemberGroup'
    ]),
    // 发起页卡切换通知
    activeChart(tab) {
      this.getSubCode(tab.name)
    },
    // 获取当前用户token，用户传给服务端 node ssr
    // localStorage 获取
    tokenCur() {
      var tokenObj = JSON.parse(window.localStorage.getItem(this.userIdCur) || '[]')
      return tokenObj.data
    },
    // 客单价下拉框搜索，采用iframe方式加载
    chartSearch() {
      var iframe = document.getElementById("loadKdj")
      var _url = '/echarts?month=' + this.selMonthCount + '&type=' + this.selCustomerType + '&token=' + this.tokenCur()
      this.iframeLoaded()
      iframe.src = _url
    },
    // 监听iframe 加载事件，添加加载等待
    iframeLoaded() {
      var that = this
      that.loadingProcessText()
      var iframe = document.getElementById("loadKdj");
      if (iframe.attachEvent) {
        iframe.attachEvent("onload", function() {
          that.loadingProcessEndText()
        });
      } else {
        iframe.onload = function() {
          that.loadingProcessEndText()
        };
      }
    },
    // 模拟客单价加载加载进度
    loadingProcessText() {
      var that = this
      this.loading = true
      that.processNum = 50
      var t = setInterval(() => {
        that.processNum++
        that.processText = '数据量较大请耐心等待，加载完成' + that.processNum + '%'
        if (that.processNum > 98) {
          clearInterval(t)
        }
      })
    },
    // 客单价加载进度完成
    loadingProcessEndText() {
      var that = this
      that.processText = '数据量较大请耐心等待，加载完成98%'
      setTimeout(function() {
        that.processText = '加载完成100%'
        that.loading = false
      })
    }

  },
  components: {
    chartXse,
    chartFwf
  }
}
</script>
<style lang="scss" scoped>
.img_name {
  span {
    font-size: 12px;
    color: #999999;
    margin: 10px 30px;
  }
  padding-top: 10px;
  background: #2b323a;
}

.homepage_chart_line {
  height: 358px;
}

.disabled_hover {
  &:hover {
    color: #858585;
  }
}

.chartView {
  position: relative;
  .img_name {
    position: absolute;
    top: 16px;
    left: 40%;
    color: #5f646a;
    font-size: 14px;
  }
  .toolBox {
    position: absolute;
    top: 7px;
    right: 120px;
    .w_1 {
      width: 100px;
    }
    .w_2 {
      width: 130px;
    }
  }
}

.home_img {
  width: 100%;
  height: 308px;
  margin-top: 10px;
  position: relative;
  .img_word {
    width: 479px;
    margin: auto;
    position: absolute;
    top: 35%;
    left: 32%;
  }
}

.el-tabs__header {
  padding-left: 150px;
}

.chart_title {
  position: absolute;
  z-index: 300;
  font-size: 16px;
  color: #0bb8f8;
  height: 42px;
  line-height: 42px;
  padding-left: 15px;
  .title_custom {
    font-weight: bold;
  }
  .iconfont {
    font-size: 20px;
  }
}
</style>
