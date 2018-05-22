import echarts from 'echarts'

const visualMapColors = ['#c05050', '#e5cf0d', '#eeeeee']
export default {
  /**
 * 中国地图
 * @param {any} data 数据
 * @param {any} title 标题
 * @returns Object echarts配置项
 */
  createOptionMap(data, title, seriesNameArray, maxNum) {
    var _data = data
    return {
      title: {
        text: title,
        left: 'left'
      },
      backgroundColor: '#ffffff',
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        min: 0,
        max: maxNum,
        left: 'right',
        bottom: 10,
        text: ['高', '低'],
        calculable: true,
        colorLightness: [0.2, 100],
        color: visualMapColors,
        dimension: 0,
        itemHeight: 110,
        formatter: function (value) {
          return seriesNameArray[0] + parseInt(value)
        }
      },
      series: [{
        z: 1,
        name: '复购地域',
        type: 'map',
        map: 'china',
        zoom: 1.2,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        //roam: true,
        data: _data,
        tooltip: {
          formatter(obj) {
            return obj.name + '<br/>' +
              seriesNameArray[0] + ':' + obj.value + '<br/>' +
              seriesNameArray[1] + ':' + obj.data.rate
          }
        }
      }
      ]
    }

  },

  /**
   * 柱状图（横向）
   * @param {any} data 数据
   * @param {any} title 标题
   * @returns Object echarts配置项
   */
  createOptionList(data, title, seriesNameArray, maxNum) {
    var _dataBar = data
    return {
      title: {
        text: title,
        left: 20
      },
      backgroundColor: '#ffffff',
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        min: 0,
        max: maxNum,
        left: 'right',
        bottom: 10,
        text: ['高', '低'],
        calculable: true,
        colorLightness: [0.2, 100],
        color: visualMapColors,
        dimension: 0,
        itemHeight: 110,
        formatter: function (value) {
          return seriesNameArray[0] + parseInt(value)
        }
      },
      grid: {
        left: 60,
        height: 650
      },
      xAxis: [{
        show: false,
        boundaryGap: [0, 0.01]
      }],
      yAxis: [{
        type: 'category',
        data: _dataBar.name,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      }],
      series: [{
        barWidth: 13,
        z: 1,
        type: 'bar',
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true,
          }
        },
        itemStyle: {
          emphasis: {
            color: "rgb(254,153,78)"
          }
        },
        data: _dataBar.value,
        tooltip: {
          formatter(obj) {
            return obj.name + '<br/>' +
              seriesNameArray[0] + ':' + obj.value + '<br/>' +
              seriesNameArray[1] + ':' + _dataBar.rate[obj.dataIndex]
          }
        }
      }
      ]
    }

  },

  /**
   * 饼图
   * @param {any} data 数据
   * @param {any} title 标题
   * @returns Object echarts配置项
   */
  createOptionPie(data, title, seriesNameArray, maxNum) {
    var _dataPie = data
    var outsideData = []
    _dataPie.forEach(o => {
      outsideData.push({
        name: o.name,
        value: maxNum
      })
    })
    return {
      title: {
        text: title,
        left: 20
      },
      backgroundColor: '#ffffff',
      tooltip: {
        trigger: 'item'
      },
      color: '#ffffff',
      visualMap: {
        min: 0,
        max: maxNum,
        left: 'right',
        bottom: 10,
        text: ['高 ', '低'],
        calculable: true,
        colorLightness: [0.2, 100],
        color: visualMapColors,
        dimension: 0,
        itemHeight: 110,
        formatter: function (value) {
          return seriesNameArray[0] + parseInt(value)
        }
      },
      series: [{
        type: 'pie',
        radius: ['5%', '70%'],
        roseType: 'area',
        labelLine: {
          normal: {
            show: false
          }
        },
        label: {
          normal: {
            show: false
          }
        },
        data: _dataPie,
        tooltip: {
          formatter(obj) {
            return obj.name + '<br/>' +
              seriesNameArray[0] + ':' + obj.value + '<br/>' +
              seriesNameArray[1] + ':' + _dataPie[obj.dataIndex].rate
          }
        }
      },
      {
        name: '',
        type: 'gauge',
        min: 0,
        max: 24,
        startAngle: 90,
        endAngle: 449.9,
        radius: '81%',
        splitNumber: 24,
        clockwise: false,
        animation: false,
        detail: {
          formatter: '{value}'
        },
        detail: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: [
              [1, '#ffffff']
            ],
            width: 1,
            opacity: 0.8
          }
        },
        splitLine: {
          show: true,
          length: '92%',
          lineStyle: {
            color: 'rgb(209, 222, 229)',
            width: '1'
          }
        },
        axisLabel: {
          color: '#ffffff'
        }
      },
      {
        name: '',
        type: 'gauge',
        min: 0,
        max: 24,
        startAngle: 97.5,
        endAngle: 457.4,
        radius: '92%',
        splitNumber: 24,
        clockwise: false,
        animation: false,
        detail: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: [
              [1, 'rgb(209, 222, 229)']
            ],
            width: 0
          }
        },
        splitLine: {
          length: 5,
          lineStyle: {
            color: '#E8E8E8',
            width: 2
          }
        },
        axisLabel: {
          formatter: function (v) {
            return v ? v + 'H' : '';
          }
        }
      }
      ]
    }

  }

}





