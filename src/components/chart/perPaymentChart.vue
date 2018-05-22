<template>
  <div
    class="chartView"
    v-loading="loading"
    :element-loading-text="processText">
    <div class="img_name" v-show="!loading">
      客单价分布密度图
      <el-tooltip popper-class='tool_notes' :content='tooltipContent' placement="top">
          <i class="iconfont icon-help1 toolGanTanHaoW"></i>
      </el-tooltip>
    </div>
    <div class="toolBox" v-show="!loading">
    <el-select popper-class="chartSel" v-model="selMonthCount" @change="chartSearch()" class="w_1" placeholder="请选择">
    <el-option
      v-for="month in g_const.monthCounts"
      :label="month.label"
      :value="month.value"
      :key="month.value"
      >
    </el-option>
    </el-select>
    <el-select popper-class="chartSel" v-model="selCustomerType" @change="chartSearch()" class="w_2" placeholder="请选择">
    <el-option
      v-for="mtype in g_const.customerTypes"
      :label="mtype.label"
      :value="mtype.value"
      :key="mtype.value"
      >
    </el-option>
    </el-select>
  </div>
    <iframe
      id="loadKdj"
      style="width:100%;height:450px;border:0;"
      :src="dataUrl = (!dataUrl && curChartName === '客单价分布') || dataUrl ? getUrl() : ''">
    </iframe>
  </div>
</template>
<script>
    import globalConstant from '../../misc/global.constant'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        data() {
            return {
                g_const: globalConstant,
                dataUrl: '',
                loading: false,
                processText: '',
                processNum: 0,
                selMonthCount: '3',
                selCustomerType: 'all',
                tooltipContent: '采用视觉化抓取数据方式，点越密集说明此客单价区间买家越集中（亮度为点密集叠加后的效果，越亮越密集），用于观察店铺客单价格带分布情况，亦可作为店铺营销的重要依据，比如满减优惠等'
            }
        },
        mounted() {

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
            if(this.dataUrl) {
              this.iframeLoaded()
            }
          }
        },
        methods: {
            ...mapActions([
            ]),
            // 获取当前用户token，用户传给服务端 node ssr
            // localStorage 获取
            tokenCur() {
              var tokenObj = JSON.parse(window.localStorage.getItem(this.userIdCur) || '[]')
              return tokenObj.data
            },
            // 客单价下拉框搜索，采用iframe方式加载
            chartSearch() {
              var iframe = document.getElementById("loadKdj")
              var _url = this.getUrl()
              this.iframeLoaded()
              iframe.src = _url
            },
            getUrl() {
              return '/echarts?month=' + this.selMonthCount + '&type=' + this.selCustomerType + '&token=' + this.tokenCur()
            },
            // 监听iframe 加载事件，添加加载等待
            iframeLoaded() {
              var that = this
              that.loadingProcessText()
              var iframe = document.getElementById("loadKdj");
              if (iframe.attachEvent){
                iframe.attachEvent("onload", function(){
                  that.loadingProcessEndText()
                });
              } else {
                iframe.onload = function(){
                  that.loadingProcessEndText()
                };
              }
            },
            // 模拟客单价加载加载进度
            loadingProcessText() {
              var that = this
              this.loading = true
              that.processNum  = 50
              var t = setInterval(() => {
                  that.processNum ++
                  that.processText = '数据量较大请耐心等待，加载完成' + that.processNum + '%'
                  if(that.processNum  > 98 ) {
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
        props: [
          'curChartName'
        ]
    }
</script>
<style lang="scss" scoped>
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

</style>
