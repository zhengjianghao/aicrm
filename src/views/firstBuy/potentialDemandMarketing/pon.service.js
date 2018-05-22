export default {

    getTransform(data) {
        var conf = {}
        if (typeof (data) === 'string') {
            conf = JSON.parse(data)
        } else {
            conf = data
        }
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

        return conf
    }

}
