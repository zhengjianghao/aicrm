/*
 * @Author: bayman
 * 效果数据service
 * @Date: 2017-01-20 19:04:43
 * @Last Modified by: baymax
 * @Last Modified time: 2017-09-11 19:27:03
 */
import chartHelper from '../../misc/chartHelper'
import echarts from 'echarts'
import moment from 'moment'
import utils from '../../misc/utils'
export default {
  createOption(data, splitNumber, name, unit, title) {
    var rebuy = data.rebuy || []
    var first_buy = data.first_buy || []
    var category = data.date_range || []
    var legend = data.legend || []
    //x轴当前解析到的最大年份
    var maxYear = {
      value: 0
    };
    var maxMonth = {
      value: 0
    }
    return {
      title: {
        text: title,
        left: 'center'
      },
      backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgb(255, 255, 255)'
      }, {
        offset: 1,
        color: 'rgba(241, 242, 243, 0.1)'
      }]),
      legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: legend,
        right: '4%',
        y: '30px'
      },
      grid: {
        left: 60,
        right: '4%',
        top: 55
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (array) {
          var rebuy = array[0]
          var first_buy = array[1]
          var week = ''
          var date = ''
          var tip = ''
          if (rebuy && first_buy) {
            week = rebuy.name.split('-')[0]
            date = rebuy.name.replace(week + '-', '')
            tip = week + '(' + date + ')' + '</br>' + utils.getLegendHtml(rebuy.color) + rebuy.seriesName + ':' + rebuy.value + unit + '</br>' + utils.getLegendHtml(first_buy.color) + first_buy.seriesName + ':' + first_buy.value + unit
          } else if (rebuy && !first_buy) {
            week = rebuy.name.split('-')[0]
            date = rebuy.name.replace(week + '-', '')
            tip = week + '(' + date + ')' + '</br>' + utils.getLegendHtml(rebuy.color) + rebuy.seriesName + ':' + rebuy.value + unit
          } else if (!rebuy && first_buy) {
            week = first_buy.name.split('-')[1]
            date = first_buy.name.replace(week + '-', '')
            tip = week + '(' + date + ')' + '</br>' + utils.getLegendHtml(first_buy.color) + first_buy.seriesName + ':' + first_buy.value + unit
          }
          return tip
        }
      },
      xAxis: {
        name: '周期',
        data: category,
        boundaryGap: false, // 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
        type: 'category',
        axisLabel: {
          formatter(param, index) {
            var week = param.split(" ")[0]
            var date = param.split(" ")[1]
            var startY = date.split("-")[0] ? moment(date.split("-")[0]).format('YYYY') : ''
            var startMD = date.split("-")[0] ? moment(date.split("-")[0]).format('MM.DD') : ''
            var endY = date.split("-")[1] ? moment(date.split("-")[1]).format('YYYY') : ''
            var endMD = date.split("-")[1] ? moment(date.split("-")[1]).format('MM.DD') : ''
            if (index === 0) {
              if (startY === endY && endY !== '') {
                return week + '\n' + startY + '(' + startMD + '-' + endMD + ')'
              } else if (endY === '') {
                return week + '\n' + startY + '.' + startMD
              } else {
                return week + '\n' + startY + '.' + startMD + '-' + endY + '.' + endMD
              }
            } else {
              return week + '\n' + startMD + (endMD ? '-' + endMD : '')
            }
          }
        }
      },
      yAxis: {
        min: 'dataMin',
        max: 'dataMax',
        name: name,
        type: 'value',
        boundaryGap: [0, '100%'],
        axisLabel: {
          formatter: function (param) {
            return parseInt(param)
          }
        },
      },
      series: [{
        name: '复购',
        type: 'line',
        tooltip: {
          trigger: 'axis'
        },
        lineStyle: {
          normal: {
            width: 0.5
          }
        },
        symbol: 'none',
        smooth: true,
        itemStyle: {
          normal: {
            color: 'rgb(0, 153, 255)'
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(0, 153, 255)'
            }, {
              offset: 1,
              color: 'rgba(0, 153, 255, 0.1)'
            }])
          }
        },
        data: rebuy
      }, {
        name: '处女购',
        type: 'line',
        tooltip: {
          trigger: 'axis'
        },
        lineStyle: {
          normal: {
            width: 0.5
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(114, 245, 161)'
          }
        },
        symbol: 'none',
        smooth: true,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(114, 245, 161)'
            }, {
              offset: 1,
              color: 'rgba(114, 245, 161, 0.1)'
            }])
          }
        },
        data: first_buy
      }]
    }
  }
}

