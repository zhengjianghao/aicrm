/*
 * @Author: bayman
 * 效果数据service
 * @Date: 2017-01-20 19:04:43
 * @Last Modified by: baymax
 * @Last Modified time: 2017-10-08 11:07:54
 */
import chartHelper from '../../misc/chartHelper'
import utils from '../../misc/utils'
import echarts from 'echarts'
import moment from 'moment'
export default {
  createOption(data, splitNumber, obj, isShowAve, dateRange) {
    //x轴当前解析到的最大年份
    var maxYear = {
      value: 0
    };
    var maxMonth = {
      value: 0
    }
    data = data instanceof Array ? data : []
    // 测试数据
    /*data = [
      [1514131200000, 23],
      [1514217600000, 64],
      [1514304000000, 95]
    ]*/
    //平均值测试
    // console.log(dateRange)
    var _month = 3
    if (dateRange && dateRange.length == 2 && dateRange[0] != null) {
      if (moment(dateRange[0]).add(1, 'y').isBefore(moment(dateRange[1]))) {
        _month = 24
      }
    }
    var _dataAve = []
    if (!data.hasOwnProperty('payremind_first')) {
      _dataAve = isShowAve ? chartHelper.calAverage(data, _month) : []
    }
    return {
      backgroundColor: '#2B323A',
      grid: {
        x: 50,
        y: 50,
        left: 60,
        x2: 70,
        y2: 50
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (array) {
          var ave = ''
          var temp = ''
          var _aveTitle = ''
          var _len = array.length == 2
          _aveTitle = _len ? (obj.name + (_month == 3 ? '周平均值' : '月平均值') + array[1].data[2] + ': ') : ''
          if (obj.name === '复购用户占比' || obj.name === '加购用户占比' || obj.name === '流转异常时订单率' || obj.name === '无流转记录订单率' || obj.name === '营销复购率' || obj.name === '营销成功率' || obj.name === '态度不满用户占比' || obj.name === '挽回用户占比' || (obj.name && (obj.name.indexOf('用户占比')) > 0)) {
            temp = (array[0].data[1] * 100).toFixed(2) + '%'
            ave = _len ? (array[1].data[1] * 100).toFixed(2) + '%' : ''
          } else if (obj.name === '投入产出比ROI' || obj.name === '营销I/O投入产出比') {
            temp = parseFloat(array[0].data[1]).toFixed(2)
            ave = _len ? parseFloat(array[1].data[1]).toFixed(2) : ''
          } else if (obj.name === '服务费') {
            temp = parseFloat(array[0].data[1]).toFixed(3)
            ave = _len ? parseFloat(array[1].data[1]).toFixed(3) : ''
          } else {
            temp = array[0].data[1]
            ave = _len ? parseFloat(array[1].data[1]).toFixed(2) : ''
          }
          if (obj.name == '成果销售额' || obj.name === '服务费') {
            temp = temp + ' 元'
            if (_aveTitle != '') {
              ave = ave + ' 元'
            }
          }
          return moment(array[0].data[0]).format('MM/DD') + '号<br />' +
            obj.name + '：' + temp + '<br />' +
            _aveTitle + ave
        }
      },
      xAxis: {
        name: '周期',
        nameTextStyle: {
          color: '#aaa',
          fontSize: 12
        },
        type: 'time',
        scale: true,
        axisLabel: {
          formatter: function (param, index) {
            return chartHelper.formatDateForDayResultData(param, index, maxYear, maxMonth);
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
        }
      },
      yAxis: {
        name: '            ' + obj.name,
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
            var curLevel = param;
            if (obj.name === '复购用户占比' || obj.name === '加购用户占比' || obj.name === '流转异常时订单率' || obj.name === '无流转记录订单率' || obj.name === '营销复购率' || obj.name === '营销成功率' || obj.name === '态度不满用户占比' || obj.name === '挽回用户占比' || (obj.name && (obj.name.indexOf('用户占比')) > 0)) {
              curLevel = (parseFloat(curLevel) * 100).toFixed(2) + '%'
            }
            return curLevel;
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
      },
      series: [{
        type: 'line',
        symbolSize: 0.1,
        tooltip: {
          trigger: 'axis'
        },
        symbol: 'none',
        smooth: true,
        hoverAnimation: true,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(90, 213, 244)' // 0% 处的颜色
            }, {
              offset: 1,
              color: 'rgb(72, 89, 133)' // 100% 处的颜色
            }], false)
          }
        },
        itemStyle: {
          normal: {
            color: 'rgba(2, 197, 233, 0.2)',
            lineStyle: {
              color: 'rgba(23, 107, 203, 0)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(90, 213, 244)' // 0% 处的颜色
              }, {
                offset: 1,
                color: 'rgb(72, 89, 133)' // 100% 处的颜色
              }], false)
            }
          }
        },
        data: data
      }, {
        type: 'custom',
        name: 'Average',
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
        data: _dataAve
      }]
    }
  }
}
