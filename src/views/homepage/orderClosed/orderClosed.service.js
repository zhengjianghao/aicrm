export default {

    getTransform(data) {
        var conf = {}
        if (typeof (data) === 'string') {
            conf = JSON.parse(data)
        } else {
            conf = data
        }
        // if(conf.exclude_buy) {
        //     conf.exclude_buy_label = true
        // }else {
        //     conf.exclude_buy_label = false
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
