/*
 * @Author: baymax
 * 销售额options
 * @Date: 2017-03-05 12:36:09
 * @Last Modified by: baymax
 * @Last Modified time: 2017-06-28 15:54:34
 */
import chartHelper from '../../../misc/chartHelper'
import echarts from 'echarts'
import moment from 'moment'
import utils from '../../../misc/utils'
export default {
    createOption(data, splitNumber, isShowAve, allAverage) {
        var dataOldCustom = data || [];
        var dataOldAverage = isShowAve ? allAverage : []
        // x轴当前解析到的最大年份
        var maxYear = {
            value: 0
        };
        // 测试数据
        // dataOldCustom = [
        //     [1514131200000, 23],
        //     [1514217600000, 64],
        //     [1514304000000, 95]
        // ]
        return {
            backgroundColor: '#2B323A',
            grid: {
                x: 50,
                y: 50,
                x2: 70,
                y2: 50
            },
            // hoverLayerThreshold: 10000,
            tooltip: {
                trigger: 'axis',
                formatter: function (array) {
                    var oldp = [0, 0]
                    var aveOldP = []
                    var aveNewP = []
                    for (var tol in array) {
                        if (array[tol].seriesName == '销售额') {
                            oldp = array[tol].data
                        } else if (array[tol].seriesName == 'oldAverage') {
                            aveOldP = array[tol].data
                        }
                    }
                    var tempNameOldAve = ''
                    if (splitNumber == '3' || splitNumber == '6' || splitNumber == '12') {
                        tempNameOldAve = '销售额周平均值'
                    } else {
                        tempNameOldAve = '销售额月平均值'
                    }
                    var tempNameOld = '销售额'
                    var tempNumOld = 0
                    var tempNumAveOld = 0
                    tempNumOld = parseFloat(oldp[1]).toFixed(2)
                    tempNumAveOld = parseFloat(aveOldP[1]).toFixed(2)
                    return moment(parseInt(array[0].data[0])).format('YYYY/MM/DD') + '<br />' +
                        tempNameOld + ': ' + tempNumOld + '元<br/>' +
                        (aveOldP.length != 0 ? (tempNameOldAve + aveOldP[2] + '：' + tempNumAveOld + '元') : '');

                }
            },
            xAxis: [{
                name: '周期',
                nameTextStyle: {
                    color: '#aaa',
                    fontSize: 12
                },
                type: 'time',
                scale: true,
                axisLabel: {
                    formatter: function (param, index) {
                        return chartHelper.formatDate(param, index, maxYear, splitNumber);
                    },
                    textStyle: {
                        color: 'rgb(111, 115, 121)'
                    }
                },
                min: 'dataMin',
                max: 'dataMax',
                splitNumber: chartHelper.timeLineNum(splitNumber),
                axisLine: {
                    lineStyle: {
                        color: 'rgb(60, 67, 77)'
                    }
                },
                axisTick: {
                    inside: true
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgb(60, 67, 77)'
                    }
                },
            }],
            yAxis: [{
                name: '金额',
                type: 'value',
                nameGap: 20,
                nameTextStyle: {
                    color: '#aaa',
                    fontSize: 12
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgb(60, 67, 77)'
                    }
                },
                axisTick: {
                    inside: true,
                    lineStyle: {
                        color: 'rgb(60, 67, 77)'
                    }
                },
                axisLabel: {
                    formatter: function (param) {
                        var curPrice = param;
                        if (curPrice >= 10000) {
                            curPrice = (curPrice / 1000) + 'K';
                        }
                        return curPrice;
                    },
                    textStyle: {
                        color: 'rgb(111, 115, 121)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgb(60, 67, 77)'
                    }
                }
            }],
            series: [{
                name: '销售额',
                type: 'line',
                tooltip: {
                    trigger: 'axis'
                },
                symbol: 'none',
                smooth: true,
                hoverAnimation: true,
                itemStyle: {
                    normal: {
                        color: 'rgba(2, 197, 233, 0.2)',
                        lineStyle: {
                            color: 'rgba(23, 107, 203, 0)'
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(90, 213, 244)' // 最上面的颜色
                            }, {
                                offset: 1,
                                color: 'rgb(72, 89, 133)' // 100% 处的颜色
                            }], false)
                        }
                    }
                },
                connectNulls: true,
                data: dataOldCustom
            }, {
                type: 'custom',
                name: 'oldAverage',
                tooltip: {
                    trigger: 'axis'
                },
                renderItem: function renderAverageItem(param, api) {
                    return utils.renderAverageItem(param, api, '#fbc953')
                },
                encode: {
                    x: 0,
                    y: 1
                },
                data: dataOldAverage
            }]
        }
    }
}
