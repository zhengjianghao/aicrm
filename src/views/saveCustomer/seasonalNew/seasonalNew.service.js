export default {

    getTransform(data) {
        var conf = {}
        if (typeof (data) === 'string') {
            conf = JSON.parse(data)
        } else {
            conf = data
        }
        //活动宝贝
        // conf.high_items_label = conf.high_items.length == 0 ? false : true
        // conf.middle_items_label = conf.middle_items.length == 0 ? false : true
        // conf.low_items_label = conf.low_items.length == 0 ? false : true
        //限购策略
        // conf.purchase_buy_every_label = conf.purchase_buy_every > 0 ? true : false
        // conf.purchase_buy_all_label = conf.purchase_buy_all > 0 ? true : false
        //邮费策略
        // conf.free_shipping_label = conf.free_shipping[0] == 'all' ? 'all' : 'some'
        return conf
    },
    setTransform(data) {
        var conf = {}
        if (typeof (data) === 'string') {
            conf = JSON.parse(data)
        } else {
            conf = data
        }
        //限购策略
        // if (!conf.purchase_buy_all_label) {
        //     conf.purchase_buy_all = 0
        // }
        // if (!conf.purchase_buy_every_label) {
        //     conf.purchase_buy_every = 0
        // }
        //邮费策略
        // if (conf.free_shipping_label == 'all') {
        //     conf.free_shipping = 'all'
        // }
        return conf
    }

}
