import CommonHttpTransform from '../../../service/commonHttpTransform.service'
import API_MARKET from '../../../service/marketing.service'
export default {
  getTransform(data) {
    var conf = {}
    if (typeof (data) === 'string') {
        conf = JSON.parse(data)
    } else {
        conf = data
    }
    //状态检测节点
    if (conf.check_consign_node === 'default') {
        conf.check_consign_node = ''
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
    //状态检测节点
    if (!conf.check_consign_node) {
        conf.check_consign_node = 'default'
    }
    return conf
  }

}
