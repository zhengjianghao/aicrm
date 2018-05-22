export default {

    getTransform(data) {
        var conf = {}
        if (typeof (data) === 'string') {
            conf = JSON.parse(data)
        } else {
            conf = data
        }
        //发送日期
        // if (!conf.send_data && conf.send_data != '0') {
        //     conf.send_data = '1'
        // }

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
