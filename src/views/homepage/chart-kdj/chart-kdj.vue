<template>
    <div class="chartWaper">
      <div id="chartKdjId" v-loading="loading"  :element-loading-text="processText" class="wrap"></div>
      <div class="img_name"><span>客单价分布密度图</span></div>
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
        <el-select popper-class="chartSel" v-model="selCustomerType" @change="search()" class="w_2" placeholder="请选择">
        <el-option
          v-for="type in global.customerTypes"
          :label="type.label"
          :value="type.value"
          :key="type.value"
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
    import chartKdj from './chart-kdj.service'
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
                selMonthCount: '3',
                selCustomerType: 'all',
                kdjData: '',
                tipStyle: {},
                tipText: '',
                loading: false,
                isEmpty: false,
                chartKdjSer: chartKdj,
                processNum: 0,
                processText: ''
            }
        },
        computed: {
            ...mapGetters(['subState'])
        },
        watch: {
            subState() {
                if (this.subState === this.global.activeCode.kdj) {
                    if(!this.kdjData || this.kdjData.length === 0) {
                        this.getchartdata()
                        this.chart.resize();
                        chartHelper.autoSize(this.chart);
                    }
                }
            }
        },
        mounted() {
            this.chart = echarts.init(document.getElementById('chartKdjId'))
            this.draw(this.chart)
            this.tooltip();
        },
        methods: {
            getchartdata() {
                var that = this
                this.loading = true
                that.processNum  = 0
                var t = setInterval(() => {
                    that.processNum ++
                    that.processText = '数据量较大请耐心等待，加载完成' + that.processNum + '%'
                    if(that.processNum  > 98 ) {
                       clearInterval(t)
                    }
                }, 1)
                API_MARKETING.getChartKdjData(this.selMonthCount, this.selCustomerType).then(data => {
                    that.kdjData = data.data
                    that.processText = '数据量较大请耐心等待，加载完成98%'
                    setTimeout(function() {
                        that.processText = '加载完成100%'
                        that.loading = false
                        that.draw()
                    });
                    that.checkIsEmpty()
                })
            },
            checkIsEmpty() {
                if (this.kdjData && this.kdjData.length > 0) {
                    this.isEmpty = false
                } else {
                    this.isEmpty = true
                }
            },
            draw() {
                var opt = this.chartKdjSer.createOption(this.kdjData, this.selMonthCount, this.selCustomerType)
                this.chart.setOption(opt)
            },
            search () {
                this.getchartdata()
            },
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
                        that.tipText = moment(parseInt(dataVal[0])).format('YYYY/MM/DD') + ' <br/>每单价：￥' + dataVal[1].toFixed(2);
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
        }
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
        .process {
            position: absolute;
            top: 200px;
            width:100%;
            color: #ffffff;
            text-align: center;
        }
    }
</style>
