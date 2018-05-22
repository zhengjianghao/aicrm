/* 店铺宝贝处理
 * @Author: baymax
 * @Date: 2017-03-21 21:50:37
 * @Last Modified by: baymax
 * @Last Modified time: 2017-09-01 14:22:23
 */
import CommonHttpTransform from './commonHttpTransform.service'
export default {
  goodsCategory() {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/item_category')
        .then(function (data) {
          resolve(data.data)
        })
    })
  },
  getGoods() {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/item')
        .then(function (data) {
          resolve(data.data)
        })
    })
  },
  getGoodsLevel(activeItems, groupId) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/item/find?active_items=' + activeItems + '&group_id=' + groupId)
        .then(function (data) {
          resolve(data.data)
        })
    })
  },
  updateSubTitle(id, subTitle) {
    return CommonHttpTransform.post('/item/' + id, {
      sub_title: subTitle,
      _method: 'PUT'
    })
  }
}
