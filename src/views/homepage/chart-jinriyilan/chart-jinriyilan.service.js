/*
 * @Author: baymax
 * 销售额options
 * @Date: 2017-03-05 12:36:09
 * @Last Modified by: baymax
 * @Last Modified time: 2017-04-11 13:59:23
 */
import chartHelper from '../../../misc/chartHelper'
import echarts from 'echarts'
import moment from 'moment'
export default {
    createOption(data, splitNumber, customerType) {
        var dataOldCustom = data.old_customer || [];
        var dataNewCustom = data.new_customer || [];
        // x轴当前解析到的最大年份
        var maxYear = {
            value: 0
        };
        return {}
    }
}
