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
        // conf.send_time_label = ''
        // // 信息不发送时间段 默认不选中
        // if (conf.exclude_time.length === 0) {
        //     conf.exclude_time_label = false
        //     conf.exclued_time_start = '22:00'
        //     conf.exclued_time_end = '8:30'
        // } else {
        //     conf.exclued_time_start = conf.exclude_time[0]
        //     conf.exclued_time_end = conf.exclude_time[1]
        //     conf.exclude_time_label = true
        // }


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
        // conf.send_time = ''
        // conf.exclude_time = conf.exclude_time_label ? [conf.exclued_time_start, conf.exclued_time_end] : []
        return conf
    }

}
