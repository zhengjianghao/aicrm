/*
 * @Author: bayman
 * 客单价图表options
 * @Date: 2017-01-16 15:25:55
 * @Last Modified by: baymax
 * @Last Modified time: 2017-05-07 16:06:49
 */
import chartHelper from '../../../misc/chartHelper'
import echarts from 'echarts'
import moment from 'moment'
export default {
  createOption(data, splitNumber) {
    var series = {}
    var dataMax = 0
    var dataMin = 0
    var symbolSize = 2.5
    // 数据非空则合并，对空数据适当处理
    if (data && data.length > 0) {
      series = chartHelper.dataFilterLevels_color(data, splitNumber)
      // series = chartHelper.dataFilterLevels(data, splitNumber)
    } else {
      series = []
    }
    if (splitNumber > 12) {
      symbolSize = 1.5
    } else if (splitNumber < 12) {
      symbolSize = 3.5
    } else if (splitNumber === 'all') {
      symbolSize = 1.5
    }

    if (series.length <= 50) {
      symbolSize = 4
    }
    //x轴当前解析到的最大年份
    var maxYear = { value: 0 };
    return {
      backgroundColor: '#2B323A',
      grid: {
        x: 50,
        y: 50,
        x2: 70,
        y2: 50
      },
      animation: false, //取消点放大的动画（防止放大后鼠标移动到具体某个点上图表重新渲染）
      tooltip: {
        trigger: 'axis',
        show: false,
        showDelay: 0,
        axisPointer: {
          type: 'cross',
          lineStyle: {
            type: 'dashed',
            width: 1
          },
          crossStyle: {
            color: '#aaaaaa',
            textStyle: {
              fontSize: '15'
            }
          }
        },
        formatter: function (params) {
          var curPrice = params.value[1];
          curPrice = curPrice + '元';
          return moment(parseInt(params.value[0])).format('YYYY-MM-DD HH:mm') + '， ' +
            curPrice;
        }
      },
      xAxis: [{
        name: '周期',
        nameTextStyle: {
          color: '#aaaaaa',
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
          show: false,
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
        name: '每单价',
        nameGap: 20,
        min: 'dataMin',
        max: 'dataMax',
        nameTextStyle: {
          color: '#cccccc',
          fontSize: 12
        },
        axisTick: {
          show: false,
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
          data: series,
          itemStyle: {
            normal: {
              color: 'rgba(29, 140, 224, 0.9)'
            },
            emphasis: {
              borderColor: '#D0648A',
              borderWidth: 2,
              opacity: 0.75
            }
          }

        }
      ],
      blendMode: series.length > 50 ? 'lighter' : ''
    }
  }
}
