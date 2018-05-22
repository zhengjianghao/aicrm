export default {

    getTransform(data) {
        var conf = {}
        if (typeof (data) === 'string') {
            conf = JSON.parse(data)
        } else {
            conf = data
        }

        // 信息发送时间段
        // conf.send_time_label = conf.send_time.length === 0 ? '' : 'custom'
        // if (conf.send_time_label !== 'custom') {
        //     conf.send_time = '21:00'
        // }

        // 信息不发送时间段 默认不选中
        // if (conf.exclude_time.length === 0) {
        //     conf.exclude_time_label = false
        //     conf.exclued_time_start = '22:00'
        //     conf.exclued_time_end = '8:30'
        // } else {
        //     conf.exclued_time_start = conf.exclude_time[0]
        //     conf.exclued_time_end = conf.exclude_time[1]
        //     conf.exclude_time_label = true
        // }
        // 提前发送 默认不选中
        //conf.ahead_time_label = conf.ahead_time.length === 0 ? false : true
        // 将动态加入的属性 可以脏检查
        // conf.payment_start_invalid = false
        // conf.payment_start_invalid_msg = ''
        // conf.payment_end_invalid = false
        // conf.payment_end_invalid_msg = ''
        // conf.buys_start_invalid = false
        // conf.buys_start_invalid_msg = ''
        // conf.buys_end_invalid = false
        // conf.buys_end_invalid_msg = ''
        // conf.reminder.remind_phone_invalid = false
        // conf.reminder.remind_phone_invalid_msg = ''
        return conf
    },
    setTransform(data) {
        var conf = {}
        if (typeof (data) === 'string') {
            conf = JSON.parse(data)
        } else {
            conf = data
        }

        // 信息发送时间段
        // if (conf.send_time_label.length === 0) {
        //     conf.send_time = ''
        // } else if (conf.send_time_label === 'custom') {
        //     if (!conf.send_time) {
        //         conf.send_time = 'default'
        //     }
        // }
        // 信息不发送时间段 默认不选中
        //conf.exclude_time = conf.exclude_time_label ? [conf.exclued_time_start, conf.exclued_time_end] : []
        // 提前发送
        //conf.ahead_time = conf.ahead_time_label ? 'true' : ''
        return conf
    }

}
