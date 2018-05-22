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
            conf.trigger_node = '12'
        } else {
            conf.trigger_node_label = 'custom'
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
        if (conf.trigger_node_label == '') {
            conf.trigger_node = ''
        }

        return conf
    }
}
