function randomData() {
  return Math.round(Math.random() * 1000);
}

var data = [{
  name: '北京',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '天津',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '上海',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '重庆',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '河北',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '河南',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '云南',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '辽宁',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '黑龙江',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '湖南',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '安徽',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '山东',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '新疆',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '江苏',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '浙江',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '江西',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '湖北',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '广西',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '甘肃',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '山西',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '内蒙古',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '陕西',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '吉林',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '福建',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '贵州',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '广东',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '青海',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '西藏',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '四川',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '宁夏',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '海南',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '台湾',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '香港',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '澳门',
  value1: randomData(),
  value2: randomData(),
}]

var resultdata0 = []
var rebuyDisMaxnum = 0
var dataBar = {
  name: [],
  value: [],
  rate: []
}
for (var i = 0; i < data.length; i++) {
  var d0 = {
    name: data[i].name,
    value: data[i].value1,
    rate: (data[i].value2 / 100) + '%'
  }
  resultdata0.push(d0)
}
resultdata0 = resultdata0.sort((a, b) => {
  return a.value - b.value
})
rebuyDisMaxnum = resultdata0[resultdata0.length - 1].value
resultdata0.forEach((o, index) => {
  dataBar.name.push(o.name)
  dataBar.value.push(o.value)
  dataBar.rate.push(o.rate)
})

// 24h下单分布
var data24h = [{
  name: '1H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '2H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '3H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '4H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '5H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '6H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '7H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '8H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '9H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '10H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '11H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '12H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '13H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '14H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '15H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '16H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '17H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '18H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '19H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '20H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '21H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '22H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '23H',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '24H',
  value1: randomData(),
  value2: randomData(),
}]

var dataPie24h = []
var dataBar24hMaxnum = 0
var dataBar24h = {
  name: [],
  value: [],
  rate: []
}
var d1 = {}
for (var k = 0; k < data24h.length; k++) {
  d1 = {
    name: data24h[k].name,
    value: data24h[k].value1,
    rate: (data24h[k].value2 / 100) + '%'
  }
  dataPie24h.push(d1)
}
var _dataPie24h = JSON.parse(JSON.stringify(dataPie24h))
_dataPie24h = _dataPie24h.reverse()
var temp_dataPie24h = _dataPie24h.sort((a, b) => {
  return b.value - a.value
})
dataBar24hMaxnum = temp_dataPie24h[0].value

JSON.parse(JSON.stringify(dataPie24h)).reverse().forEach((o, index) => {
  dataBar24h.name.push(o.name)
  dataBar24h.value.push(o.value)
  dataBar24h.rate.push(o.rate)
})

// 24h付款间隔分布
var data24hIntervalMaxnum = 0
var dataPie24hInterval = []
var dataBar24hInterval = {
  name: [],
  value: [],
  rate: []
}
var d2 = {}
for (var j = 0; j < data24h.length; j++) {
  d2 = {
    name: data24h[j].name,
    value: data24h[j].value1,
    rate: data24h[j].value2
  }
  dataPie24hInterval.push(d2)
}
var _dataPie24hInterval = JSON.parse(JSON.stringify(dataPie24hInterval))
_dataPie24hInterval = _dataPie24hInterval.reverse()
var temp_dataPie24hInterval = _dataPie24hInterval.sort((a, b) => {
  return b.value - a.value
})
data24hIntervalMaxnum = temp_dataPie24hInterval[0].value

JSON.parse(JSON.stringify(dataPie24hInterval)).reverse().forEach((o, index) => {
  dataBar24hInterval.name.push(o.name)
  dataBar24hInterval.value.push(o.value)
  dataBar24hInterval.rate.push(o.rate)
})

// 复购订单周期性分布
// 24h下单分布
var dataWeek = [{
  name: '周一',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '周二',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '周三',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '周四',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '周五',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '周六',
  value1: randomData(),
  value2: randomData(),
}, {
  name: '周日',
  value1: randomData(),
  value2: randomData(),
}]

var dataPieWeek = []
var dataWeekMaxnum = 0
var dataBarWeek = {
  name: [],
  value: [],
  rate: []
}
var d4 = {}
for (var s = 0; s < dataWeek.length; s++) {
  d4 = {
    name: dataWeek[s].name,
    value: dataWeek[s].value1,
    rate: (dataWeek[s].value2 / 100) + '%'
  }
  dataPieWeek.push(d4)
}
var _dataPieWeek = JSON.parse(JSON.stringify(dataPieWeek))
_dataPieWeek = _dataPieWeek.reverse()
var temp_dataWeek = _dataPieWeek.sort((a, b) => {
  return b.value - a.value
})
dataWeekMaxnum = temp_dataWeek[0].value

JSON.parse(JSON.stringify(dataPieWeek)).reverse().forEach((o, index) => {
  dataBarWeek.name.push(o.name)
  dataBarWeek.value.push(o.value)
  dataBarWeek.rate.push(o.rate)
})

export default {
  data1: {
    data: {
      data: resultdata0,
      maxNum: rebuyDisMaxnum
    },
    dataBar: {
      data: dataBar,
      maxNum: rebuyDisMaxnum
    },
    dataBar24h: {
      data: dataBar24h,
      maxNum: dataBar24hMaxnum
    },
    dataPie24h: {
      data: dataPie24h,
      maxNum: dataBar24hMaxnum
    },
    dataBar24hInterval: {
      data: dataBar24hInterval,
      maxNum: data24hIntervalMaxnum
    },
    dataPie24hInterval: {
      data: dataPie24hInterval,
      maxNum: data24hIntervalMaxnum
    },
    dataPieWeek: {
      data: dataPieWeek,
      maxNum: dataWeekMaxnum
    },
    dataBarWeek: {
      data: dataBarWeek,
      maxNum: dataWeekMaxnum
    }
  }
}

