<template>
<div>
  <result-data
  :marketingTypes="marketingTypes"
  :curUserTypeValue="curUserTypeValue"
  @getResultData="getResultData"
  :useCustomerGetResultMethod="true"
  :getResultOptions="getResultOptions"
  :tooltipContent='tooltipContent'
  :taskId="taskId"
  ></result-data>
</div>
</template>
<script type="text/ecmascript-6" scoped>
    import API_MARKETING from '../../../../service/marketing.service'
    import resultData from '../../../../components/resultData/resultData'
    import g_const from '../../../../misc/global.constant'
    import * as TYPE from '../../../../vuex/type.constant'
    import echarts from 'echarts'
    import chartHelper from '../../../../misc/chartHelper'
    import utils from '../../../../misc/utils'
    import store from '../../../../vuex/store'
    import moment from 'moment'
    export default {
      data() {
        return {
          marketingTypes: g_const.marketingTypesPayRemind,
          curUserTypeValue: g_const.marketingTypesPayRemind[0].name,
          tooltipContent: {
              PAYREMIND_SAVE_MONEY: '公式=推送信息成功后，所有催付买家付款总金额（没有发送成功的买家不计入，如果付款时间不在下单当日的，按照付款时间日计入）注意时间段选择',
              PAYREMIND_SAVE_ORDER_NUM: '公式=推送信息成功后，所有催付成功买家付款总订单笔数（没有发送成功的买家不计入，如果付款时间不在下单当日的，按照付款时间日计入）注意时间段选择',
              PAYREMIND_SAVE_ORDER_RATE: '公式=推送信息成功后，所有催付成功买家付款总订单笔数/当日总订单数（含关闭订单）（没有发送成功的买家不计入，如果付款时间不在下单当日的，以下单时间日统计。注意时间段选择。特别注意订单自行关闭会在拍下订单后3天才会关闭，所以此数据4天前的数据即大前天数据才是准确值）',
              PAYREMIND_ORDER_CLOSED_RATE: '公式：关闭订单数/拍下总订单数（订单时期计算以订单拍下时间为准，并不以关闭时间计算，特别注意订单自行关闭会在拍下订单后3天才会关闭，所以此数据4天前的数据即大前天数据才是准确值）注意时间段选择'
          },
          taskId: ''
        }
      },
      mounted() {
        this.taskId = this.$route.query.id
      },
      methods: {
        getResultOptions(data, splitNumber, obj, isShowAve, dateRange) {
          // data.payremind_first =
          // [
          //   [1498665600000,10],[1498752000000,13],[1498838400000,30],[1498924800000,12],[1499011200000,70],[1499097600000,33],[1499184000000,55],[1499270400000,77],[1499356800000,66],[1499443200000,12],[1499529600000,34],[1499616000000,12],[1499702400000,45],[1499788800000,122],[1499875200000,33]
          // ]
          // data.payremind_second =
          // [
          //   [1498665600000,2],[1498752000000,66],[1498838400000,78],[1498924800000,9],[1499011200000,70],[1499097600000,33],[1499184000000,87],[1499270400000,90],[1499356800000,31],[1499443200000,54],[1499529600000,34],[1499616000000,12],[1499702400000,45],[1499788800000,2],[1499875200000,15]
          // ]
          // data.payremind_closed =
          // [
          //   [1498665600000,6],[1498752000000,88],[1498838400000,9],[1498924800000,73],[1499011200000,24],[1499097600000,6],[1499184000000,78],[1499270400000,44],[1499356800000,22],[1499443200000,9],[1499529600000,34],[1499616000000,162],[1499702400000,45],[1499788800000,23],[1499875200000,11]
          // ]
          var _month = 3
          if (dateRange && dateRange.length == 2 && dateRange[0] != null) {
            if (moment(dateRange[0]).add(1, 'y').isBefore(moment(dateRange[1]))) {
                _month = 24
            }
          }
          var payremind_first = data.payremind_first || []
          var payremind_second = data.payremind_second || []
          var payremind_closed = data.payremind_closed || []
          var _payremind_first = isShowAve ? chartHelper.calAverage(payremind_first, _month) : []
          var _payremind_second = isShowAve ? chartHelper.calAverage(payremind_second, _month) : []
          var _payremind_closed = isShowAve ? chartHelper.calAverage(payremind_closed, _month) : []
          // x轴当前解析到的最大年份
          var maxYear = {
              value: 0
          };
          return {
              grid: {
                left: 60,
              },
              tooltip: {
                  trigger: 'axis',
                  formatter: function (array) {
                      var first = ''
                      var first_num = 0
                      var second = ''
                      var second_num = 0
                      var close = ''
                      var close_num = ''
                      //平均值
                      var _first = ''
                      var _second = ''
                      var _close = ''
                      var _title = _month == 3 ? '周' : '月'
                      if(obj.name === '挽回金额') {
                        if(array.length === 3 || isShowAve) {
                          first = array[0].seriesName
                          first_num = parseFloat(array[0].data[1]).toFixed(2) + '元'
                          second = array[1].seriesName
                          second_num = parseFloat(array[1].data[1]).toFixed(2) + '元'
                          close = array[2].seriesName
                          close_num = parseFloat(array[2].data[1]).toFixed(2) + '元'
                          if(isShowAve) {
                              _first = '（黄色）' + array[3].seriesName.replace('周', _title) + array[3].data[2] + '：' + parseFloat(array[3].data[1]).toFixed(2) + '元'
                              _second = '（绿色）' + array[4].seriesName.replace('周', _title) + array[4].data[2] + '：' + parseFloat(array[4].data[1]).toFixed(2) + '元'
                              _close = '（红色）' + array[5].seriesName.replace('周', _title) + array[5].data[2] + '：' + parseFloat(array[5].data[1]).toFixed(2) + '元'
                          }
                        }
                      } else if(obj.name === '挽回订单量' ) {
                        if(array.length === 3 || isShowAve) {
                          first = array[0].seriesName
                          first_num = array[0].data[1]
                          second = array[1].seriesName
                          second_num = array[1].data[1]
                          close = array[2].seriesName
                          close_num = array[2].data[1]
                          if(isShowAve) {
                              _first = '（黄色）' + array[3].seriesName.replace('周', _title) + array[3].data[2] + '：' + parseFloat(array[3].data[1]).toFixed(2)
                              _second = '（绿色）' + array[4].seriesName.replace('周', _title) + array[4].data[2] + '：' + parseFloat(array[4].data[1]).toFixed(2)
                              _close = '（红色）' + array[5].seriesName.replace('周', _title) + array[5].data[2] + '：' + parseFloat(array[5].data[1]).toFixed(2)
                          }
                        }
                      } else if(obj.name === '挽回订单率' ) {
                        if(array.length === 3 || isShowAve) {
                          first = array[0].seriesName
                          first_num = (array[0].data[1] * 100).toFixed(2) + '%'
                          second = array[1].seriesName
                          second_num = (array[1].data[1] * 100).toFixed(2) + '%'
                          close = array[2].seriesName
                          close_num = (array[2].data[1] * 100).toFixed(2) + '%'
                          if(isShowAve) {
                              _first = '（黄色）' + array[3].seriesName.replace('周', _title) + array[3].data[2] + '：' + (array[3].data[1] * 100).toFixed(2) + '%'
                              _second = '（绿色）' + array[4].seriesName.replace('周', _title) + array[4].data[2] + '：' + (array[4].data[1] * 100).toFixed(2) + '%'
                              _close = '（红色）' + array[5].seriesName.replace('周', _title) + array[5].data[2] + '：' + (array[5].data[1] * 100).toFixed(2) + '%'
                          }
                        }
                      } else if(obj.name === '订单关闭率' ) {
                          if(isShowAve) {
                              _first = '订单关闭率'+ _title +'平均值：' + (array[1].data[1] * 100).toFixed(2) + '%'
                          }
                        return moment(array[0].data[0]).format('MM/DD') + '号<br />' +
                          '订单关闭率' + ': ' +  (array[0].data[1] * 100).toFixed(2) + '%' +'<br />' +
                          _first
                      }
                      return moment(array[0].data[0]).format('MM/DD') + '号<br />' +
                          first + ': ' + first_num + '<br/>' +
                          second + ': ' + second_num + '<br/>' +
                          close + ': ' + close_num + '<br/>' +
                          _first + '<br/>' +
                          _second + '<br/>' +
                          _close
                  }
              },
              yAxis: {
                  axisLabel: {
                      formatter: function (param) {
                        if(obj.name === '挽回订单率' || obj.name === '订单关闭率') {
                          return (parseFloat(param) * 100).toFixed(2)  + '%'
                        }
                        return param
                      }
                  }
              },
              series: [{
                  name: '首次催付',
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
                                  color: 'rgb(90, 213, 244)' // 0% 处的颜色
                              }, {
                                  offset: 1,
                                  color: 'rgb(72, 89, 133)' // 100% 处的颜色
                              }], false)
                          }
                      }
                  },
                  connectNulls: true,
                  data: payremind_first
              }, {
                  name: '二次催付',
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
                  data: payremind_second
              }, {
                  name: '关闭前催付',
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
                                  color: 'rgba(76, 135, 142, 0.9)' // 0% 处颜色
                              }, {
                                  offset: 1,
                                  color: 'rgba(74, 191, 204, 0.64)' // 100% 处的颜色
                              }], false)
                          }
                      }
                  },
                  connectNulls: true,
                  data: payremind_closed
              }, {
                    type: 'custom',
                    name: '首次催付周平均值',
                    tooltip: {
                        trigger: 'axis'
                    },
                    renderItem: function renderAverageItem(param, api) {
                        return utils.renderAverageItem(param, api, '#fbc953') //黄色
                    },
                    encode: {
                        x: 0,
                        y: 1
                    },
                    data: _payremind_first
                }, {
                    type: 'custom',
                    name: '二次催付周平均值',
                    tooltip: {
                        trigger: 'axis'
                    },
                    renderItem: function renderAverageItem(param, api) {
                        return utils.renderAverageItem(param, api, '#009933') //绿色
                    },
                    encode: {
                        x: 0,
                        y: 1
                    },
                    data: _payremind_second
                }, {
                    type: 'custom',
                    name: '关闭前催付周平均值',
                    tooltip: {
                        trigger: 'axis'
                    },
                    renderItem: function renderAverageItem(param, api) {
                        return utils.renderAverageItem(param, api, 'red') //红色
                    },
                    encode: {
                        x: 0,
                        y: 1
                    },
                    data: _payremind_closed
                }]
            }
        },
        getResultData([taskId, dayCount, startDate, endDate, marketingType]) {
          var _data = {}
          var _store = store
          if(marketingType === this.marketingTypes[3].name) {
            API_MARKETING.getMarketingResultData(taskId, dayCount, startDate, endDate, marketingType).then(data => {
              _data.payremind_first = data.data
              _data.length = _data.payremind_first.length
              _store.commit(TYPE.RESULT_DATA_FOR_USER, _data)
            })
          } else {
            API_MARKETING.getMarketingResultData(taskId, dayCount, startDate, endDate, marketingType, 1).then(dataFirst => {
              _data.payremind_first = dataFirst.data
              API_MARKETING.getMarketingResultData(taskId, dayCount, startDate, endDate, marketingType, 2).then(dataSecond => {
                _data.payremind_second = dataSecond.data
                API_MARKETING.getMarketingResultData(taskId, dayCount, startDate, endDate, marketingType, 3).then(dataClosed => {
                  _data.payremind_closed = dataClosed.data
                  if(_data.payremind_first.length && _data.payremind_second.length && _data.payremind_closed.length) {
                    _data.length = 1
                  }
                  _store.commit(TYPE.RESULT_DATA_FOR_USER, _data)
                })
              })
            })
          }
        }
      },
      components: {
        resultData
      }
    }
</script>
<style lang="scss" scoped>

</style>
