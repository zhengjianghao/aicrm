/* 导入
 * @Author: baymax
 * @Date: 2017-03-21 21:51:40
 * @Last Modified by: baymax
 * @Last Modified time: 2017-03-31 17:31:26
 */
import CommonHttpTransform from './commonHttpTransform.service'

export default {
    // 上传 文件
    importUpload(obj) {
      return new Promise((resolve,reject) => {
        CommonHttpTransform.postUpload('/import_upload', {
          file: obj.file,
          import_result_id: obj.import_result_id,
          file_type: obj.file_type
        }).then(o => {
          resolve(o.data)
        })
      })
    },
    // 创建 导入历史记录
    addImportOrder(customerGroup) {
      return new Promise((resolve,reject) => {
        CommonHttpTransform.post('/import_order', {
          customer_group: customerGroup
        }).then(o => {
          resolve(o.data)
        })
      })
    },
    // 创建 导入历史记录
    getImportOrder() {
      return new Promise((resolve,reject) => {
        CommonHttpTransform.get('/import_order').then(data => {
          resolve(data.data)
        })
      })
    },
    // 发送 用户最后一个文件上传完成的消息
    uploadComplete(id) {
      return CommonHttpTransform.put('/import_order/' + id)
    },
    // 更新 用户导入引导功能的状态
    updateImportGuide() {
        return CommonHttpTransform.post('/account/tips')
    }

}
