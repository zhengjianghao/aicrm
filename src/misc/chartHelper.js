import moment from 'moment'
var that = this;
var timer = null;
export default {
    /**
     * @param {string} - chartId 代表一个图标的唯一标识
     * 用于重绘表格，表格实例会在各自的指令里赋值给当前服务
     */
    resize(chartId) {
        var chartInstance = that[chartId];
        // 如果图标宽度大于500，说明已经是正常的了，不需要resize
        if (chartInstance.getWidth() > 150) {
            return;
        }
        setTimeout(function () {
            chartInstance.resize();
            // 调用自身验证是否绘制正确
            that.resize(chartId);
        });
    },

    /**
     * @param {Object} - chartInstance 图表实例，调用init方法生成的
     * @param {Object} - option 图表的配置对象
     * 图表统一的绘制方法
     */
    draw(chartInstance, option) {
        setTimeout(function () {
            chartInstance.setOption(option);
            if (chartInstance.getWidth() < 150) {
                chartInstance.resize();
            }
        });
    },
    getDataKey(time, len, splitNumber) {
        if (len < 2000) {
            time = moment(time).format('YYYYMMDD') + '' + moment(time).get('hour')
        } else if (len >= 2000) {
            time = moment(time).format('YYYYMMDD') + ''
        }
        return time
    },
    getSize(num) {
        var size = 1
        var density = 1
        var op = 0.5
        if (num <= 5) {
            size = 4
            density = op + (num - 1) * 0.2
        } else if (num > 5 && num <= 10) {
            size = 6
            density = op + (num - 6) * 0.2
        } else if (num > 10 && num <= 15) {
            size = 7
            density = op + (num - 11) * 0.2
        } else if (num > 15 && num <= 20) {
            size = 8
            density = op + (num - 16) * 0.2
        } else if (num > 20 && num <= 25) {
            size = 9
            density = op + (num - 21) * 0.2
        } else {
            size = 10 + (num - 25) * 0.1
            density = op + (num - 25) * 0.02
        }

        return [size, density]
    },
    getColor(num) {
        var color = ''
        var density = 1
        var op = 0.7
        // color = '#20a0ff'
        color = 'rgba(37, 140, 249, 0.8)'
        var normal = {}
        normal = {
            color: 'rgba(29, 140, 224, 0.9)'
        }
        // if(num <= 5) {
        //     // density = op + (num - 1) * 0.2
        //     // name = '1-5'
        //     normal = {
        //         color: 'rgba(29, 140, 224, 0.6)'
        //     }
        // } else if(num > 5 && num <= 10) {
        //     // density = op + (num - 6) * 0.2
        //     // name = '6-10'
        //     normal = {
        //         color: 'rgba(29, 140, 224, 0.7)'
        //     }
        // } else if(num > 10 && num <= 15) {
        //     // density = op + (num - 11) * 0.2
        //     // name = '11-15'
        //     normal = {
        //         color: 'rgba(29, 140, 224, 0.8'
        //     }
        // } else if(num > 15 && num <= 20){
        //     // color = '#9df6ff'
        //     // density = op + (num - 16) * 0.2
        //     // name = '16-20'
        //     normal = {
        //         color: 'rgba(88, 183, 255, 0.9)'
        //     }
        // }else if(num > 20 && num <= 25){
        //    normal = {
        //         color: 'rgba(88, 183, 255, 0.95)'
        //     }
        // } else {
        //     // name = '26+'
        //     // density = op + (num - 25) * 0.02
        //     normal = {
        //         color: 'rgba(88, 183, 255, 1)'
        //     }
        // }
        return normal
    },
    dataFilterLevels_color(data, splitNumber) {
        var len = data.length;
        var list = {};
        var series = []
        var cur_series = {}
        //剔除头尾数据依据的百分比
        var rates = [0.01, 0.01];
        var min = 1000
        var ret = []
        if (len > min) {
            //去重相同时间点且相同价格的数据
            for (var i = 0; i < len; i++) {
                var p = parseInt(data[i][1]);
                var time = parseInt(data[i][0]);
                time = this.getDataKey(time, len, splitNumber)
                var key = time + '' + p;
                if (!list[key] && p >= 0) {
                    list[key] = {
                        num: 1,
                    }
                    ret.push({
                        value: data[i],
                        itemStyle: {
                            normal: {
                                color: 'rgba(29, 140, 224, 0.9)'
                            },
                            emphasis: {
                                borderColor: '#D0648A',
                                borderWidth: 2,
                                opacity: 0.9
                            }
                        }
                    })
                } else {
                    list[key].num++
                    if (list[key].num % 20 === 0) {
                        ret.push({
                            value: data[i],
                            itemStyle: {
                                normal: {
                                    shadowBlur: 1,
                                    shadowColor: 'rgba(37, 140, 249, 0.8)',
                                    color: 'rgba(29, 140, 224, 0.9)'
                                },
                                emphasis: {
                                    borderColor: '#D0648A',
                                    borderWidth: 2,
                                    opacity: 0.9
                                }
                            }
                        })
                    }
                }
            }
            series = ret
            // for(var key in list) {
            //     if (list.hasOwnProperty(key)) {
            //         var _num = list[key].num
            //         series.push({
            //             value: list[key].value,
            //             itemStyle: {
            //                 normal: this.getColor(_num),
            //                 emphasis: {
            //                     borderColor: '#D0648A',
            //                     borderWidth: 2,
            //                     opacity: 0.9
            //                 }
            //             }
            //         })
            //     }
            // }
        } else {
            for (var j = 0; j < len; j++) {
                series.push({
                    value: data[j],
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
                })
            }
        }
        //剔除头尾零散数据
        var _len = series.length;
        var nodeNum = 0;
        if (_len > min && splitNumber === '3') {
            nodeNum = parseInt(_len * rates[0]);
        } else if (_len > min && splitNumber === '6') {
            nodeNum = parseInt(_len * rates[0]);
        } else if (_len > min && splitNumber === '12') {
            nodeNum = parseInt(_len * rates[0]);
        } else if (_len > min && splitNumber === '24') {
            nodeNum = parseInt(_len * rates[1]);
        } else if (_len > min && splitNumber === '36') {
            nodeNum = parseInt(_len * rates[1]);
        } else if (_len > min && splitNumber === 'all') {
            nodeNum = parseInt(_len * rates[1]);
        }
        if (_len > min) {
            series = series.slice(30, _len - nodeNum * 7)
        } else {
            // series = series.slice(10, _len - nodeNum * 7)
        }
        return series;
    },
    dataFilterLevels(data, splitNumber) {
        var len = data.length;
        var list = {};
        var series = []
        var cur_series = {}
        //剔除头尾数据依据的百分比
        var rates = [0.01, 0.01];
        var min = 1000
        if (len > min) {
            //去重相同时间点且相同价格的数据
            for (var i = 0; i < len; i++) {
                var p = parseInt(data[i][1]);
                var time = parseInt(data[i][0]);
                time = this.getDataKey(time, len, splitNumber)
                var key = time + '' + p;
                if (!list[key] && p >= 0) {
                    list[key] = {
                        num: 1,
                        value: data[i]
                    }
                } else {
                    list[key].num++
                }
            }
            for (var listKey in list) {
                if (list.hasOwnProperty(listKey)) {
                    var _num = list[listKey].num
                    series.push({
                        value: list[listKey].value,
                        itemStyle: {
                            normal: {
                                opacity: this.getSize(_num)[1],
                                color: 'rgb(91, 180, 248)'
                            },
                            emphasis: {
                                borderColor: '#D0648A',
                                borderWidth: 2,
                                opacity: 0.75
                            }
                        },
                        symbolSize: this.getSize(_num)[0]
                    })
                }
            }
        } else {
            for (var k = 0; k < len; k++) {
                series.push({
                    value: data[k],
                    itemStyle: {
                        normal: {
                            opacity: 0.5,
                            color: 'rgb(91, 180, 248)'
                        },
                        emphasis: {
                            borderColor: '#D0648A',
                            borderWidth: 2,
                            opacity: 0.75
                        }
                    }
                })
            }
        }
        //剔除头尾零散数据
        var _len = series.length;
        var nodeNum = 0;
        if (_len > min && splitNumber === '3') {
            nodeNum = parseInt(_len * rates[0]);
        } else if (_len > min && splitNumber === '6') {
            nodeNum = parseInt(_len * rates[0]);
        } else if (_len > min && splitNumber === '12') {
            nodeNum = parseInt(_len * rates[0]);
        } else if (_len > min && splitNumber === '24') {
            nodeNum = parseInt(_len * rates[1]);
        } else if (_len > min && splitNumber === '36') {
            nodeNum = parseInt(_len * rates[1]);
        } else if (_len > min && splitNumber === 'all') {
            nodeNum = parseInt(_len * rates[1]);
        }
        if (_len > min) {
            series = series.slice(30, _len - nodeNum * 7)
        } else {
            // series = series.slice(10, _len - nodeNum * 7)
        }

        return series;
    },
    dataFilter(data, splitNumber) {
        var len = data.length;
        var list = {};
        var ret = [];
        //剔除头尾数据依据的百分比
        var rates = [0.01, 0.01];
        var min = 1000
        if (len > min) {
            //去重相同时间点且相同价格的数据
            for (var i = 0; i < len; i++) {
                var p = parseInt(data[i][1]);
                var time = parseInt(data[i][0]);
                if (splitNumber === '3') {
                    time = moment(time).format('YYYYMMDD') + '' + moment(time).get('hour');
                } else if (splitNumber === '6') {
                    time = moment(time).format('YYYYMMDD') + '' + moment(time).get('hour');
                } else if (splitNumber === '12') {
                    time = moment(time).format('YYYYMMDD') + '' + moment(time).get('hour');
                } else if (splitNumber === '24') {
                    time = moment(time).format('YYYYMMDD') + '' + moment(time).get('hour');
                } else if (splitNumber === '36') {
                    time = moment(time).format('YYYYMMDD') + '' + moment(time).get('hour');
                } else if (splitNumber === 'all') {
                    time = moment(time).format('YYYYMMDD') + '' + moment(time).get('hour');
                }
                var key = time + '' + p;
                if (!list[key] && p >= 0) {
                    list[key] = 1;
                    ret.push(data[i]);
                }
            }
        } else {
            ret = data
        }
        //剔除头尾零散数据
        var _len = ret.length;
        var nodeNum = 0;
        if (_len > min && splitNumber === '3') {
            nodeNum = parseInt(_len * rates[0]);
        } else if (_len > min && splitNumber === '6') {
            nodeNum = parseInt(_len * rates[0]);
        } else if (_len > min && splitNumber === '12') {
            nodeNum = parseInt(_len * rates[0]);
        } else if (_len > min && splitNumber === '24') {
            nodeNum = parseInt(_len * rates[1]);
        } else if (_len > min && splitNumber === '36') {
            nodeNum = parseInt(_len * rates[1]);
        } else if (_len > min && splitNumber === 'all') {
            nodeNum = parseInt(_len * rates[1]);
        }
        if (_len > min) {
            ret = ret.slice(30, _len - nodeNum * 7)
        } else {
            // ret = ret.slice(10, _len - nodeNum * 7)
        }

        return ret;
    },
    /**
     * 格式化时间戳,只有在年改变时才显示年份，否则只显示月跟日
     * @param {Integer} val 时间戳
     * @param {Integer} index 索引
     * @param {Integer} maxYear 记录当前最大年份 例如 2015
     * @returns 格式化后的日期 例如 2015/12
     */
    formatDate(val, index, maxYear, splitNumber) {
        var showDate = '';
        var formatString = splitNumber === 'all' ? 'MM-YYYY' : 'MM/DD-YYYY'
        if (index === 0) {
            maxYear.value = moment(val).year();
            showDate = moment(val).format(formatString).replace('-', '\n');
        } else {
            var tempYear = moment(val).year();
            if (tempYear > maxYear.value) {
                maxYear.value = tempYear;
                showDate = moment(val).format(formatString).replace('-', '\n');
            } else {
                showDate = splitNumber === 'all' ? moment(val).format(formatString).replace('-', '\n') : moment(val).format('MM/DD');
            }
        }
        return showDate;
    },
    /**
     * 格式化时间戳,只有在年和月改变时才显示年份，否则只显示日
     * @param {Integer} val 时间戳
     * @param {Integer} index 索引
     * @param {Integer} maxYear 记录当前最大年份 例如 2015
     * @param {Integer} maxMonth 记录当前最大月份
     * @returns 格式化后的日期 例如 12
     */
    formatDateForDay(val, index, maxYear, maxMonth) {
        var showDate = '';
        if (index === 0) {
            maxYear.value = moment(val).year();
            maxMonth.value = moment(val).month();
            showDate = moment(val).format('DD');
        } else {
            var tempYear = moment(val).year();
            var tempMonth = moment(val).month();
            if (tempYear > maxYear.value) {
                maxYear.value = tempYear;
                showDate = moment(val).format('MM-DD-YYYY').replace('-', '\n').replace('-', '\n');
            } else if (tempMonth > maxMonth.value) {
                maxMonth.value = moment(val).month();
                showDate = moment(val).format('MM-DD').replace('-', '\n');
            } else {
                showDate = moment(val).format('DD');
            }
        }
        return showDate;
    },
    /**
     * 格式化时间戳,只有在年和月改变时才显示年份，否则只显示日
     * @param {Integer} val 时间戳
     * @param {Integer} index 索引
     * @param {Integer} maxYear 记录当前最大年份 例如 2015
     * @param {Integer} maxMonth 记录当前最大月份
     * @returns 格式化后的日期 例如 12
     */
    formatDateForDayResultData(val, index, maxYear, maxMonth) {
        var showDate = '';
        if (index === 0) {
            maxYear.value = moment(val).year();
            maxMonth.value = moment(val).month();
            showDate = moment(val).format('DD');
        } else {
            var tempYear = moment(val).year();
            var tempMonth = moment(val).month();
            if (tempYear > maxYear.value) {
                maxYear.value = tempYear;
                showDate = moment(val).format('MM-DD-YYYY').replace('-', '\n').replace('-', '\n');
            } else if (tempMonth > maxMonth.value) {
                maxMonth.value = moment(val).month();
                showDate = moment(val).format('DD-MM').replace('-', '\n');
            } else {
                showDate = moment(val).format('DD');
            }
        }
        return showDate;
    },

    /**
     * 当浏览器改变宽度 chart自适应浏览器宽度
     * @param {any} chartInstance
     * @returns
     */
    autoSize(chartInstance) {
        if (!chartInstance) return;
        window.onresize = function (e) {
            if (timer === null) {
                timer = setTimeout(() => {
                    chartInstance.resize();
                    timer = null;
                }, 500);
            }
        }
    },
    // 时间轴刻度分布
    timeLineNum(month) {
        var splitNum = 24
        switch (month) {
            case '3':
                splitNum = 13
                break
            case '6':
                splitNum = 25
                break
            case '12':
                splitNum = 13
                break
            case '24':
                splitNum = 25
                break
            case '36':
                splitNum = 13
                break
            case 'all':
                splitNum = 25
                break
            default:
                splitNum = 25
                break
        }
        return '' + splitNum
    },
    /**
     * 计算平均值
     * @param {array} oldDate 老客户的值
     * @param {array} newDate 新客户的值
     * @param {string} month 选择几个月
     * @returns 平均值 {old: [], new: []}
     */
    getAverage(oldDate, newDate, month) {
        var _allData = {
            old: [],
            new: []
        }
        var _oldAve = []
        var _newDate = []
        if (oldDate.length <= 0) {
            _allData.old = _oldAve
        } else {
            //计算平均值
            _allData.old = this.calAverage(oldDate, month)
        }
        if (newDate.length <= 0) {
            _allData.new = _newDate
        } else {
            //计算平均值
            _allData.new = this.calAverage(newDate, month)
        }
        return _allData
        // if (oldDate.length <= 0 && newDate.length <= 0) {
        //     _allData.old = _oldAve
        //     _allData.new = _newDate
        //     // return _allData
        // } else {
        //     var week = moment(oldDate[0][0]).format('w') //第一天今年的第几个星期
        //     var week_day = moment(oldDate[0][0]).format('d') //礼拜几
        //     // var startT = moment(oldDate[0][0]).format('YYYY-MM-DD') //开始时间
        //     var startT = oldDate[0][0]
        //     var endT = '' //结束时间
        //     var ave_value = 0 //平均值
        //     var _week = 0 //当天是第几个星期
        //     var _date = []
        //     var temp_date = oldDate.length == 0 ? newDate : oldDate
        //     if (month == '3' || month == '6' || month == '12') {
        //         for (var i in temp_date) {
        //             _week = moment(temp_date[i][0]).format('w')
        //             if (week == _week) {
        //                 ave_value = ave_value + (oldDate[i] ? parseFloat(oldDate[i][1]) : 0) + (newDate[i] ? parseFloat(newDate[i][1]) : 0)
        //                 if (i == temp_date.length - 1) {
        //                     _date.push([
        //                         startT,
        //                         ave_value / (7 - parseInt(moment(startT).format('d'))),
        //                         moment(startT).format('YYYY-MM-DD') + '至' + moment(temp_date[i][0]).subtract(1, 'days').format('YYYY-MM-DD')
        //                     ])
        //                 }
        //             } else {
        //                 _date.push([
        //                     startT,
        //                     ave_value / (7 - parseInt(moment(startT).format('d'))),
        //                     moment(startT).format('YYYY-MM-DD') + '至' + moment(temp_date[i][0]).subtract(1, 'days').format('YYYY-MM-DD')
        //                 ])
        //                 // startT = moment(oldDate[i][0]).format('YYYY-MM-DD')
        //                 startT = temp_date[i][0]
        //                 ave_value = 0
        //                 week = moment(temp_date[i][0]).format('w')
        //             }
        //             // return
        //         }
        //     } else {
        //         for (var j in temp_date) {
        //             if (moment(startT).isSame(temp_date[j][0], 'month')) {
        //                 // ave_value = ave_value + parseFloat(oldDate[j][1]) + parseFloat(newDate[j][1])
        //                 ave_value = ave_value + (oldDate[j] ? parseFloat(oldDate[j][1]) : 0) + (newDate[j] ? parseFloat(newDate[j][1]) : 0)
        //                 if (j == temp_date.length - 1) {
        //                     _date.push([
        //                         startT,
        //                         ave_value / (moment(startT).daysInMonth() - parseInt(moment(startT).format('D'))),
        //                         moment(startT).format('YYYY-MM-DD') + '至' + moment(temp_date[j][0]).subtract(1, 'days').format('YYYY-MM-DD')
        //                     ])
        //                 }
        //             } else {
        //                 _date.push([
        //                     startT,
        //                     ave_value / (moment(startT).daysInMonth() - parseInt(moment(startT).format('D'))),
        //                     moment(startT).format('YYYY-MM-DD') + '至' + moment(temp_date[j][0]).subtract(1, 'days').format('YYYY-MM-DD')
        //                 ])
        //                 // startT = moment(oldDate[j][0]).format('YYYY-MM-DD')
        //                 startT = temp_date[j][0]
        //                 ave_value = 0
        //             }
        //         }
        //     }
        //     var _add_date = []
        //     //生成相同数量的点
        //     if (month == '3' || month == '6' || month == '12') {
        //         for (var _ad in _date) {
        //             for (var _n in temp_date) {
        //                 if (moment(temp_date[_n][0]).format('w') == moment(_date[_ad][0]).format('w') && moment(temp_date[_n][0]).isSame(_date[_ad][0], 'year')) {
        //                     _add_date.push([temp_date[_n][0], _date[_ad][1], _date[_ad][2]])
        //                 }
        //             }
        //         }
        //     } else {
        //         for (var _ad_m in _date) {
        //             for (var _n_m in temp_date) {
        //                 if (moment(temp_date[_n_m][0]).isSame(_date[_ad_m][0], 'month')) {
        //                     _add_date.push([temp_date[_n_m][0], _date[_ad_m][1], _date[_ad_m][2]])
        //                 }
        //             }
        //         }
        //     }
        //     return _add_date
        // }
    },
    /**
     * 具体的计算过程
     * @param {array} temp_date 用户的具体值
     * @param {*} month 选择几个月
     * @returns 计算出的平均值
     */
    calAverage(temp_date, month) {
        if (temp_date.length == 0) {
            return []
        }
        // var week = moment(temp_date[0][0]).format('w') //第一天今年的第几个星期
        var week_day = moment(temp_date[0][0]).format('d') //礼拜几
        // var startT = moment(oldDate[0][0]).format('YYYY-MM-DD') //开始时间
        var startT = temp_date[0][0]
        var endT = '' //结束时间
        var ave_value = 0 //平均值
        // var _week = 0 //当天是第几个星期
        var _date = []
        // var temp_date = oldDate.length == 0 ? newDate : oldDate
        //判断按星期分还是按年分
        if (month == '3' || month == '6' || month == '12') {
            for (var i in temp_date) {
                // _week = moment(temp_date[i][0]).format('w')
                //判断是否在同一个星期，把同一个星期的加起来
                if (moment(startT).isSame(temp_date[i][0], 'w')) {
                    ave_value = ave_value + (temp_date[i] ? parseFloat(temp_date[i][1]) : 0)
                    //最后一个点
                    if (i == temp_date.length - 1) {
                        _date.push([
                            startT,
                            ave_value / (7 - parseInt(moment(startT).format('d'))),
                            // moment(startT).format('YYYY-MM-DD') + '至' + moment(temp_date[i][0]).subtract(1, 'days').format('YYYY-MM-DD')
                            moment(startT).format('YYYY-MM-DD') + '至' + moment(startT).add(7, 'days').format('YYYY-MM-DD')
                        ])
                    }
                } else {
                    _date.push([
                        startT,
                        ave_value / (7 - parseInt(moment(startT).format('d'))),
                        moment(startT).format('YYYY-MM-DD') + '至' + moment(temp_date[i][0]).subtract(1, 'days').format('YYYY-MM-DD')
                    ])
                    // startT = moment(oldDate[i][0]).format('YYYY-MM-DD')
                    startT = temp_date[i][0]
                    ave_value = temp_date[i] ? parseFloat(temp_date[i][1]) : 0
                    // week = moment(temp_date[i][0]).format('w')
                    //最后一个点
                    if (i == temp_date.length - 1) {
                        _date.push([
                            startT,
                            ave_value / (7 - parseInt(moment(startT).format('d'))),
                            moment(startT).format('YYYY-MM-DD') + '至' + moment(startT).add(7, 'days').format('YYYY-MM-DD')
                        ])
                    }
                }
                // return
            }
        } else {
            for (var j in temp_date) {
                //判断是否在同一个月，把同一个月的加起来
                if (moment(startT).isSame(temp_date[j][0], 'month')) {
                    // ave_value = ave_value + parseFloat(oldDate[j][1]) + parseFloat(newDate[j][1])
                    ave_value = ave_value + (temp_date[j] ? parseFloat(temp_date[j][1]) : 0)
                    //最后一个点
                    if (j == temp_date.length - 1) {
                        _date.push([
                            startT,
                            ave_value / (moment(startT).daysInMonth() - parseInt(moment(startT).format('D'))),
                            moment(startT).format('YYYY-MM-DD') + '至' + moment(startT).add(7, 'days').format('YYYY-MM-DD')
                        ])
                    }
                } else {
                    _date.push([
                        startT,
                        ave_value / (moment(startT).daysInMonth() - parseInt(moment(startT).format('D'))),
                        moment(startT).format('YYYY-MM-DD') + '至' + moment(temp_date[j][0]).subtract(1, 'days').format('YYYY-MM-DD')
                    ])
                    // startT = moment(oldDate[j][0]).format('YYYY-MM-DD')
                    startT = temp_date[j][0]
                    ave_value = temp_date[j] ? parseFloat(temp_date[j][1]) : 0
                    //最后一个点
                    if (j == temp_date.length - 1) {
                        _date.push([
                            startT,
                            ave_value / (moment(startT).daysInMonth() - parseInt(moment(startT).format('D'))),
                            moment(startT).format('YYYY-MM-DD') + '至' + moment(startT).add(7, 'days').format('YYYY-MM-DD')
                        ])
                    }
                }
            }
        }
        var _add_date = []
        //生成相同数量的点
        if (month == '3' || month == '6' || month == '12') {
            for (var _n in temp_date) {
                for (var _ad in _date) {
                    // 判断是否在同一个星期，把同一个星期的放在一起，显示一条直线，不同年分的不会相等
                    if (moment(temp_date[_n][0]).isSame(_date[_ad][0], 'w')) {
                        _add_date.push([temp_date[_n][0], _date[_ad][1], _date[_ad][2]])
                        break
                    }
                }
            }
        } else {
            for (var _n_m in temp_date) {
                for (var _ad_m in _date) {
                    // 判断是否在同一个月，把同一个月的放在一起，显示一条直线
                    if (moment(temp_date[_n_m][0]).isSame(_date[_ad_m][0], 'month')) {
                        _add_date.push([temp_date[_n_m][0], _date[_ad_m][1], _date[_ad_m][2]])
                        break
                    }
                }
            }
        }
        return _add_date
    }
}
