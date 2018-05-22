/*
 * @Author: bayman
 * 基础图表配置 默认为密度图配置
 * @Date: 2017-01-16 15:25:55
 * @Last Modified by: baymax
 * @Last Modified time: 2017-09-20 13:47:00
 */
import chartHelper from '../../misc/chartHelper'
import echarts from 'echarts'
import moment from 'moment'
export default {

  /**
   * 传入数据 和 x 轴分割数
   * 返回echarts配置部分
   * @param {Object} data
   * @param {Integer} splitNumber
   * @returns Object
   */
  createOption(data, splitNumber) {
    var series = {}
    var symbolSize = 2.5
    // 数据非空则合并，对空数据适当处理
    if (data && data.length > 0) {
      series = chartHelper.dataFilterLevels_color(data, splitNumber)
    } else {
      series = []
    }
    if (data.length >= 5000) {
      if (splitNumber > 12) {
        symbolSize = 1.5
      } else if (splitNumber < 12) {
        symbolSize = 3.5
      } else if (splitNumber === 'all') {
        symbolSize = 1.5
      }
    }
    if (series.length <= 50) {
      symbolSize = 4
    }
    //x轴当前解析到的最大年份
    var maxYear = {
      value: 0
    };
    return {
      backgroundColor: '#2B323A',
      grid: {
        x: 50,
        y: 50,
        x2: 70,
        y2: 50
      },
      tooltip: {
        trigger: 'axis',
        show: false,
        showDelay: 0,
        axisPointer: {
          show: true,
          type: 'cross',
          lineStyle: {
            type: 'dashed',
            width: 1
          }
        },
        formatter: function (params) {
          return moment(params.value[0]).format('YYYY-MM-DD') + '， ' + params.value[1] + '天';
        }
      },
      xAxis: [{
        name: '周期',
        nameTextStyle: {
          color: '#aaa',
          fontSize: 14
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
        }
      }],
      yAxis: [{
        type: 'value',
        name: '复购间隔天数',
        nameGap: 20,
        min: 'dataMin',
        max: 'dataMax',
        nameTextStyle: {
          color: '#aaa',
          fontSize: 12
        },
        axisTick: {
          inside: true,
          lineStyle: {
            color: 'rgb(60, 67, 77)'
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgb(60, 67, 77)'
          }
        },
        axisLabel: {
          formatter: function (param) {
            var curPrice = param;
            if (curPrice >= 1000) {
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
      toolbox: {
        iconStyle: {
          normal: {
            borderColor: '#fff'
          }
        },
        feature: {
          dataZoom: {
            title: {
              back: '上一次缩放',
              zoom: '选定区域缩放'
            }
          },
          restore: {

          }
        },
        right: 15,
        top: 8
      },
      series: [
        {
          name: '',
          type: 'scatter',
          // hoverAnimation: false,
          symbolSize: symbolSize,
          data: series
        }
      ],
      blendMode: series.length > 50 ? 'lighter' : ''
    };
  }
}
