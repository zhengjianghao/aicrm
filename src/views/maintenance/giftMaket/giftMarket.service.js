export default {

    getTransform(data) {
        var conf = {}
        if (typeof (data) === 'string') {
            conf = JSON.parse(data)
        } else {
            conf = data
        }
        //活动备注



        // 信息发送时间段
        // conf.timed_send_label = conf.timed_send.length == 0 ? '' : 'custom'
        // if (conf.timed_send_label !== 'custom') {
        //     conf.timed_send = '3'
        // }
        // conf.send_time_label = conf.send_time.length === 0 ? false : true
        // if (conf.send_time_label) {
        //     conf.send_time_start = '8:30'
        //     conf.send_time_end = '22:00'
        // }
        // conf.send_time_behind_label = conf.send_time_behind == 1 ? true : false
        //send_time_behind
        // 提前发送 默认不选中

        return conf
    },
    setTransform(data) {
        var conf = {}
        if (typeof (data) === 'string') {
            conf = JSON.parse(data)
        } else {
            conf = data
        }
        //活动备注

        // 信息发送时间段
        // if (conf.send_time_label.length === 0) {
        //     conf.send_time = []
        // } else if (conf.send_time_label === 'custom') {
        //     conf.send_time = [conf.send_time_start, conf.send_time_end]
        // }
        // if (conf.send_time_behind_label) {
        //     conf.send_time_behind = 1
        // } else {
        //     conf.send_time_behind = 0
        // }
        return conf
    }

}
