export default {
  getTransform(data) {
    var conf = {}
    if (typeof (data) === 'string') {
        conf = JSON.parse(data)
    } else {
        conf = data
    }
    if (conf.check_keywords.length<=0) {
        conf.check_keywords = []
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
    if (!conf.check_keywords) {
        conf.check_keywords = []
    }
    return conf
  }

}
