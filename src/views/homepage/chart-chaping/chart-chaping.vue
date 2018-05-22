<style lang="scss" scoped>
.chartWaper {
    height: 320px;
    position: relative;
    .warp {
        padding: 8px;
        .homepage_chartBlock {
            background-color: #F5F6FA;
            height: 300px;
            .pieChart {
                width: 100%;
                height: 300px;
            }
            .barChart {
                width: 100%;
                height: 300px;
            }
            .des {
                color: #999999;
            }
            .homepage_chart_title {
                font-size: 12px;
                color: #999999;
                padding: 32px 0 0 40px;
                span {
                    color: #0BB8F8;
                    font-size: 24px;
                    padding-right: 8px;
                }
                &.iconfont {
                    &:before {
                        margin-right: 2px;
                    }
                }
            }
        }
    }
    .img_name {
        position: absolute;
        top: 16px;
        left: 40%;
        color: #FFF;
        font-size: 14px;
    }
    .toolBox {
        position: absolute;
        top: 7px;
        right: 75px;
        .w_1 {
            width: 95px;
        }
        .w_2 {
            width: 130px;
        }
    }
    .noData {
        position: absolute;
        top: 200px;
        width: 100%;
        color: #ffffff;
        text-align: center;
    }
}
</style>

<template>
    <div class="chartWaper">
        <div id="chartChapingId" class="warp">
            <el-row :gutter="8">
                <el-col :span="10">
                    <div class="homepage_chartBlock">
                        <div>
                            <el-row :gutter="16">
                                <el-col :span="12">
                                    <div class="homepage_chart_title iconfont icon-adduser">新客户差评比例
                                        <br/>
                                        <span>282</span>人</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="homepage_chart_title iconfont icon-user-black">老客户差评比例
                                        <br/>
                                        <span>1,412</span>人</div>
                                </el-col>
                            </el-row>
                        </div>
                        <div>
                            <el-row>
                                <el-col :span="24">
                                    <div id="chaping-pieChart" class="pieChart"></div>
                                </el-col>
                            </el-row>
                            <div class="des">统计数据：从昨天凌晨0点到今天凌晨0点的所有用户</div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="14">
                    <div class="homepage_chartBlock">
                        <div id="chaping-barChart" class="barChart"></div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script type="text/ecmascript-6" scoped>

import chartHelper from '../../../misc/chartHelper'
import globalConstant from '../../../misc/global.constant'
import API_MARKETING from '../../../service/marketing.service'
import echarts from 'echarts'
import {
    mapGetters, mapActions
}
    from 'vuex'
export default {
    data() {
        return {
            barchart: {},
            pieChart: {},
            global: globalConstant,
            loading: false,
            isEmpty: false,
            barData: [110, 210, -73, 287, 365],
            pieChartOption: { //饼图配置
                color: ['#0076C5', '#0099FF', '#37AFFF'],
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [{
                    name: '昨日新客',
                    type: 'pie',
                    radius: ['40%', '50%'],
                    center: ['25%', '30%'],
                    data: [{
                        value: 135,
                        name: '差评'
                    }, {
                        value: 260,
                        name: '其他评价'
                    }],
                    itemStyle: {
                        normal: {
                            shadowBlur: 20,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.6)'
                        },
                        emphasis: {
                            shadowBlur: 20,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.6)'
                        }
                    },
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    }
                }, {
                    name: '昨日老客',
                    type: 'pie',
                    radius: ['40%', '50%'],
                    center: ['75%', '30%'],
                    data: [{
                        value: 5,
                        name: '差评'
                    }, {
                        value: 30,
                        name: '其他评价'
                    }],
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.6)'
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.6)'
                        }
                    },
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    }
                }]
            },
            barChartOption: { //柱状图配置
                title: {
                    text: '新老客有效评价情况对比',
                    textStyle: {
                        color: '#999999',
                        fontSize: 12,
                        fontWeight: 'normal'
                    },
                    top: 16,
                    left: 24
                },
                grid: {
                    y2: 32,
                    x2: 32
                },
                xAxis: {
                    data: ['失败会员', '沉睡会员', '流失会员', '活跃会员', '活动会员'],
                    silent: true,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    silent: true,
                    splitNumber: 5,
                    min: 'dataMin',
                    max: 'dataMax',
                    splitLine: {
                        lineStyle: {
                            color: '#eeeeee' // 使用深浅的间隔色
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999999'
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [{ // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0.05)'
                        }
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    barWidth: 42,
                    data: this.barChartShadow([110, 210, -73, 287, 365]), //将数据替换成数组对象，自动取最大值
                    animation: false
                }, {
                    type: 'bar',
                    data: [110, 210, -73, 287, 365], //第三个数据为流失会员，需要用负数表达。
                    barWidth: 42,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#37AFFF' // 最上面的颜色
                            }, {
                                offset: 1,
                                color: '#0076C5' // 100% 处的颜色
                            }], false)
                        }
                    },
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                }],
                animationEasing: 'elasticOut',
                animationDelayUpdate: function (idx) {
                    return idx * 5;
                }
            }


        }
    },
    computed: {
        ...mapGetters(['subState'])
    },
    watch: {
        subState() {
            if (this.subState === this.global.activeCode.chaping) {
                //if(!this.fgzqData || this.fgzqData.length === 0) {
                // this.getchartdata()
                this.pieChart.resize();
                this.barChart.resize();
                chartHelper.autoSize(this.pieChart);
                chartHelper.autoSize(this.barChart);
                //}
            }
        }
    },
    mounted() {
        this.pieChart = echarts.init(document.getElementById('chaping-pieChart'));
        //pieChart.setOption(this.pieChartOption);
        this.barChart = echarts.init(document.getElementById('chaping-barChart'));
        //barChart.setOption(this.barChartOption);
        this.draw()
    },
    methods: {
        barChartShadow(shadowMaxDataArr) { //返回最数据最大值给表格做shadow
            var _arr = [];
            var _shMax = 0; //正数的阴影
            var _shMin = 0; //负数的阴影
            for (var i = 0; i < shadowMaxDataArr.length; i++) {
                if (shadowMaxDataArr[i] > _shMax) {
                    _shMax = shadowMaxDataArr[i];
                } else if (shadowMaxDataArr[i] < _shMin) {
                    _shMin = shadowMaxDataArr[i];
                }
            }
            for (i = 0; i < shadowMaxDataArr.length; i++) {
                if (shadowMaxDataArr[i] < 0) {
                    _arr.push(_shMin);
                } else if (shadowMaxDataArr[i] > 0) {
                    _arr.push(_shMax);
                }
            }
            return _arr;
        },
        draw() {
            this.pieChart.setOption(this.pieChartOption);
            this.barChart.setOption(this.barChartOption);
        }
    }
}

</script>
