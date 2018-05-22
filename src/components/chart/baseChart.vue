<template>
    <div class="chartWaper">
      <div :id="baseChartId ? baseChartId : defaultChartId" class="wrap" v-loading="isLoading" element-loading-text="加载中"></div>
        <div class="img_name">
          <slot name="title" :title="option.title">
            {{ option.title.text }}
            <el-tooltip :content='option.title.tooltipContent' placement="top" popper-class='tool_notes'>
                <i class="iconfont icon-help1 toolGanTanHaoW"></i>
            </el-tooltip>
           </slot>
        </div>
      <div class="toolBox">
        <slot name="toolBox" :toolBox="option.toolBox">
          <el-select popper-class="chartSel" v-model="mergeOption.toolBox.select1.curSelVal" @visible-change="changeSelHandle(mergeOption.toolBox.select1.curSelVal, $event)" class="w_1" placeholder="请选择">
            <el-option
              v-for="sel1Obj in mergeOption.toolBox.select1.data"
              :label="sel1Obj.label"
              :value="sel1Obj.value"
              :key="sel1Obj.value"
              >
            </el-option>
          </el-select>
          <el-select popper-class="chartSel" v-model="mergeOption.toolBox.select2.curSelVal" @visible-change="changeSelHandle(mergeOption.toolBox.select2.curSelVal, $event)" class="w_2" placeholder="请选择">
            <el-option
            v-for="sel2Obj in mergeOption.toolBox.select2.data"
            :label="sel2Obj.label"
            :value="sel2Obj.value"
            :key="sel2Obj.value"
            >
            </el-option>
          </el-select>
        </slot>
      </div>
      <div class="noData" v-show="isEmpty">
          <span>暂无数据</span>
      </div>
       <div :style="tipStyle" v-html="tipText"></div>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
  import baseChartService from './baseChart.service'
  import chartHelper from '../../misc/chartHelper'
  import globalConstant from '../../misc/global.constant'
  import moment from 'moment'
  import Immutable from 'immutable'
  import echarts from 'echarts'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data() {
        return {
          // 默认图表id(主要用于同一个页面多个图表的情况)
          defaultChartId: 'chartId',
          // 默认图表周边配置
          baseOption: {
            // 工具栏(业务)
            toolBox: {
              select2: {
                curSelVal: 'all',
                oldSelVal: '',
                data: globalConstant.customerTypes
              }
            }
          },
          // 合并后的图表周边配置
          mergeOption: {
            // 工具栏(业务)
            toolBox: {
              select1: {
                curSelVal: '3',
                data: global.monthCounts
              },
              select2: {
                curSelVal: '2',
                data: []
              }
            }
          },
          isGetTip: false, // 是否已经重写tip
          chart: {},
          global: globalConstant,
          isLoading: false,
          rebuyNums: [],
          selMonthCount: '3',
          selRebuyNum: '2',
          tipStyle: {},
          tipText: '',
          isEmpty: false,
          baseChartService: baseChartService,
          fgzqData: '',
          tooltipContent: '采用视觉化抓取数据方式，点越密集说明此周期区间内买家复购越集中（亮度为点密集叠加后的效果，越亮越密集），用于观察店铺会员复购周期长短分布情况，亦可作为老客营销最佳周期重要依据'
        }
    },
    computed: {
        ...mapGetters([
        ])
    },
    watch: {
      // 只要数据变化则重新绘制
      data(data) {
        this.checkIsEmpty()
        this.draw(data, this.mergeOption.toolBox.select1.curSelVal)
      }
    },
    mounted() {
      this.init()
    },
    methods: {
        ...mapActions([
        ]),
        // 页面初始化项
        init() {
          // 合并option
          this.initMergeOption()
        },
        /**
         *  合并option
         */
        initMergeOption() {
          var mapOptsF = Immutable.fromJS(this.option ? this.option : {})
          var mapOptsT = Immutable.fromJS(this.baseOption)
          this.mergeOption = mapOptsT.mergeDeep(mapOptsF).toJS()
        },
        /**
         * 用户关闭下拉框即触发(重复点击也会触发)
         */
        changeSelHandle(val, e) {
          if(e === false) {
            this.search()
          }
        },
        /**
         * 搜索图表数据
         */
        search() {
          // 过滤重复请求
          if(this.mergeOption.toolBox.select1.oldSelVal !== this.mergeOption.toolBox.select1.curSelVal || this.mergeOption.toolBox.select2.oldSelVal !== this.mergeOption.toolBox.select2.curSelVal) {
            this.showLoading()
            // 通知父组件
            this.$emit('getData', this.mergeOption.toolBox.select1.curSelVal, this.mergeOption.toolBox.select2.curSelVal)
            this.mergeOption.toolBox.select1.oldSelVal = this.mergeOption.toolBox.select1.curSelVal
            this.mergeOption.toolBox.select2.oldSelVal = this.mergeOption.toolBox.select2.curSelVal
          }
        },
        /**
         *  检查图表数据是否为空
         */
        checkIsEmpty() {
            if (this.data && this.data.length > 0) {
                this.isEmpty = false
            } else {
                this.isEmpty = true
            }
        },
        /**
         * @param data 图表数据
         * @param val x轴多少个月(或划分多少块)
         * return undefined
         */
        draw(data, val) {
          var $chartImg = document.getElementById(this.baseChartId)
          var _baseChart = echarts.getInstanceByDom($chartImg)
          if (!_baseChart) {
            _baseChart = echarts.init($chartImg)
          }
           // 是否启用重写tooltip方法 此方法只执行一次
          if(this.isRewriteTooltip && !this.isGetTip) {
            this.tooltip(_baseChart)
            this.isGetTip = true
          }
          var _opt = this.baseChartService.createOption(data, val)
          var mapOptsF = Immutable.fromJS(this.getChartOption ? this.getChartOption(data, val) : {})
          var mapOptsT = Immutable.fromJS(_opt)
          var opts = mapOptsT.mergeDeep(mapOptsF).toJS()
          _baseChart.setOption(opts)
          this.hideLoading()
          return _baseChart
        },
        /**
         * 显示加载等待
         */
        showLoading() {
          this.isLoading = true
        },
        /**
         * 隐藏加载等待
         */
        hideLoading() {
          this.isLoading = false
        },
        /**
         * 加工下拉框数据
         */
        numFGZQ() {
            var mList = this.memberGroupTreeData
            var AI_TAG = this.global.member_group.AI_TAG
            var BUY_NUMS = this.global.member_type.BUY_NUMS
            var add = {}
            var num = []
            if(mList[AI_TAG]) {
                var buyNumList =  mList[AI_TAG].filter(_list => {
                    return _list.label === BUY_NUMS
                })
                if(buyNumList.length > 0) {
                    buyNumList[0].children.forEach((buyTimes, index) => {
                        add={
                            label: '第'+ (index + 1) + '-' + (index + 2) +'次购物',
                            value: (index + 2) + ''
                        }
                        num.push(add)
                    })
                } else {
                    num = [{
                        label: '暂无数据',
                        value: '2'
                    }]
                }
            }
            this.rebuyNums = num
        },
        /**
         * 重写echarts的tooltip
         */
        tooltip(base_chart) {
          var that = this
          var width = 0
          //tip自定义样式
          this.tipStyle = {
            position: 'absolute',
            padding: '3px 8px 3px 8px',
            backgroundColor: 'rgba(50,50,50,0.7)',
            borderColor: '#333',
            color: '#fff',
            borderRadius: '4px',
            fontSize: '14px',
            borderWidth: 0,
            width: '150px',
            display: 'none'
          }
          //鼠标滑过图表，显示相应的坐标值
          base_chart.getZr().on('mousemove', function (o) {
            if (that.isEmpty) return;
            if (base_chart.containPixel) {
                if (base_chart.containPixel(
                {seriesIndex: 0}, [o.offsetX, o.offsetY]
                )) {
                    width = base_chart.getWidth();
                    var dataVal = base_chart.convertFromPixel({seriesIndex: 0}, [o.offsetX, o.offsetY])
                    var tempLeft = 0;
                    if (o.offsetX + 150 > width - 10) {
                        tempLeft = -15 - 150;
                    } else {
                        tempLeft = 15;
                    }
                    that.tipStyle.top = o.offsetY + 15 + 'px';
                    that.tipStyle.left = o.offsetX + tempLeft + 'px';
                    that.tipText = moment(parseInt(dataVal[0])).format('YYYY/MM/DD') + ' <br/>间隔天数：' + parseInt(dataVal[1]);
                    that.tipStyle.display = '';
                } else {
                    that.tipStyle.display = 'none';
                }
            }
          })
          base_chart.getZr().on('mouseout', function () {
              that.tipStyle.display = 'none';
          })
        }
    },
    props: [
      'baseChartId',
      'option',
      'data',
      'getChartOption',
      'isRewriteTooltip'
    ]
  }
</script>
<style lang="scss" scoped>
    .chartWaper {
        height: 450px;
        position: relative;
        .wrap {
          height: 100%;
        }
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
        .noData {
            position: absolute;
            top: 200px;
            width:100%;
            color: #ffffff;
            text-align: center;
        }
    }
</style>
