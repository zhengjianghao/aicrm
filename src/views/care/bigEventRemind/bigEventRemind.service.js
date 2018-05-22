export default {
  getTransform(data) {
    var conf = {}
    if (typeof (data) === 'string') {
        conf = JSON.parse(data)
    } else {
        conf = data
    }
    if (conf.trigger_node == '') {
        conf.trigger_node_label = ''
        conf.trigger_node = '5'
    } else {
        conf.trigger_node_label='custom'
    }
    conf.exclude_check=[conf.exclude[0] != '', conf.exclude[1] != '']
    return conf
  },
  setTransform(data) {
    var conf = {}
    if (typeof (data) === 'string') {
        conf = JSON.parse(data)
    } else {
        conf = data
    }
    if (conf.trigger_node_label=='') {
        conf.trigger_node = ''
    }
    conf.exclude[0]=conf.exclude_check[0] == '' ? '':'multi_order_pay'
    conf.exclude[1]=conf.exclude_check[1] == '' ? '':'refund'
    return conf
  }
}
