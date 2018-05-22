export default {
  getTransform(data) {
    var conf = {}
    if (typeof (data) === 'string') {
        conf = JSON.parse(data)
    } else {
        conf = data
    }
    //触发节点
    if (conf.trigger_node <= 0) {
        conf.trigger_node = '0'
    }
    return conf
  },
  setTransform(data) {
    var conf = {}
    if (typeof (data) === 'string') {
        conf = JSON.parse(data)
    } else {
        conf = data
    }
    //触发节点
    if (!conf.trigger_node) {
        conf.trigger_node = '0'
    }
    return conf
  }
}
