<template>
    <div class="chartWaper">
      <div id="chartFgzqId" class="wrap" v-loading="loading" element-loading-text="加载中"></div>
        <div class="img_name">
            复购周期分布密度图
            <el-tooltip :content='tooltipContent' placement="top" popper-class='tool_notes'>
                <i class="iconfont icon-help1 toolGanTanHaoW"></i>
            </el-tooltip>
        </div>
      <div class="toolBox">
        <el-select popper-class="chartSel" v-model="selMonthCount" @change="search()" class="w_1" placeholder="请选择">
        <el-option
          v-for="month in global.monthCounts"
          :label="month.label"
          :value="month.value"
          :key="month.value"
          >
        </el-option>
        </el-select>
        <el-select popper-class="chartSel" v-model="selRebuyNum" :loading="isLoaddingBuyCount" @change="search()" class="w_2" placeholder="请选择">
            <el-option
            v-for="data in rebuyNums"
            :label="data.label"
            :value="data.value"
            :key="data.value"
            >
            </el-option>
        </el-select>
      </div>
      <div class="noData" v-show="isEmpty">
          <span>暂无数据</span>
      </div>
       <div :style="tipStyle" v-html="tipText"></div>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
    import chartFgzq from './chart-fgzq.service'
    import chartHelper from '../../../misc/chartHelper'
    import globalConstant from '../../../misc/global.constant'
    import API_MARKETING from '../../../service/marketing.service'
    import moment from 'moment'
    import echarts from 'echarts'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        data() {
            return {
                chart: {},
                global: globalConstant,
                rebuyNums: [],
                selMonthCount: '3',
                selRebuyNum: '2',
                tipStyle: {},
                tipText: '',
                loading: false,
                isEmpty: false,
                chartFgzqSer: chartFgzq,
                fgzqData: '',
                tooltipContent: '采用视觉化抓取数据方式，点越密集说明此周期区间内买家复购越集中（亮度为点密集叠加后的效果，越亮越密集），用于观察店铺会员复购周期长短分布情况，亦可作为老客营销最佳周期重要依据'
            }
        },
        computed: {
            ...mapGetters(['subState','memberGroupTreeData']),
            // 购物次数数据 是否已经加载完成
            isLoaddingBuyCount() {
                var AI_TAG = this.global.member_group.AI_TAG
                return  this.memberGroupTreeData[AI_TAG] === undefined
            }
        },
        watch: {
          // 针对首页
          subState() {
              if (this.subState === this.global.activeCode.fgzq) {
                  this.doActiveChart()
              }
          },
          // 针对数据模块
          curChartName(val) {
              if (val === '复购周期') {
                // 未加载购物次数,重新加载
                if(this.isLoaddingBuyCount) {
                  this.getMemberGroup()
                } else {
                  // 渲染购物次数下拉框
                  this.numFGZQ()
                }
                // 渲染图表数据
                this.doActiveChart()
              }
          },
          // 会员数据
          memberGroupTreeData() {
            // 渲染购物次数下拉框
            this.numFGZQ()
          }
        },
        mounted() {
            this.chart = echarts.init(document.getElementById('chartFgzqId'))
            this.draw();
            this.tooltip();
        },
        methods: {
            ...mapActions([
              'getMemberGroup'
            ]),
            // 激活图表
            doActiveChart() {
              // 未有复购周期数据,则获取
              if(!this.fgzqData || this.fgzqData.length === 0) {
                  this.getchartdata()
                  this.chart.resize()
                  chartHelper.autoSize(this.chart);
              }
            },
            // 获取图表数据
            getchartdata () {
                var that = this
                this.loading = true
                API_MARKETING.getChartFgzqData(this.selMonthCount, this.selRebuyNum).then(data => {
                    that.fgzqData = data.data
                    that.loading = false
                    that.draw()
                    that.checkIsEmpty()
                })
            },
            // 检查图表数据是否为空
            checkIsEmpty() {
                if (this.fgzqData && this.fgzqData.length > 0) {
                    this.isEmpty = false
                } else {
                    this.isEmpty = true
                }
            },
            // 绘制散点图
            draw () {
                var opt = this.chartFgzqSer.createOption(this.fgzqData, this.selMonthCount)
                this.chart.setOption(opt)
            },
            search () {
                this.getchartdata()
            },
            // 渲染购物次数,到下拉框
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
            // 重写echarts的tooltip
            tooltip () {
              var that = this;
              var width = 0;
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
              };
              //鼠标滑过图表，显示相应的坐标值
              this.chart.getZr().on('mousemove', function (o) {
                if (that.isEmpty) return;
                if (that.chart.containPixel) {
                    if (that.chart.containPixel(
                    {seriesIndex: 0}, [o.offsetX, o.offsetY]
                    )) {
                        width = that.chart.getWidth();
                        var dataVal = that.chart.convertFromPixel({seriesIndex: 0}, [o.offsetX, o.offsetY])
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
              });
              that.chart.getZr().on('mouseout', function () {
                  that.tipStyle.display = 'none';
              });
            }
        },
        props: [
            'curChartName'
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
