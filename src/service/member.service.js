/* 会员管理
 * @Author: baymax
 * @Date: 2017-03-21 21:51:40
 * @Last Modified by: baymax
 * @Last Modified time: 2017-06-12 15:51:05
 */
import CommonHttpTransform from './commonHttpTransform.service'

export default {
    /**
   * @api {get} /item 宝贝列表
   * @apiVersion 2.0.0
   * @apiGroup member
   *
   * @apiDescription 宝贝列表
   *
   * @apiParam {String} token
   *
   * @apiSuccess {String}   seller_cids    类目id组
   * @apiSuccess {String}   pic_url    图片地址
   * @apiSuccess {Number}   num    库存
   * @apiSuccess {Number}   num_iid    商品编码
   * @apiSuccess {String}   price    商品价格
   * @apiSuccess {String}   title    标题
   * @apiSuccess {String}   sub_title    标题简称
   * @apiSuccess {String}   outer_id    商品外部编码
   * @apiSuccess {String}   approve_status    状态|出售中(onsale)|库存(instock)
   * @apiSuccess {Number}   sold_quantity    最近30天销量|总销量
   * @apiSuccess {Number}   is_subtitle_edited    短名是否被编辑过（0未编辑，1已编辑）*
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   * [
   *  {
   *    seller_cids: 1233456,
   *    pic_url: "https://img.alicdn.com/bao/uploaded/i1/11451913/TB2CiVCgSFjpuFjSspbXXXagVXa_!!11451913.jpg",
   *    num: 326,
   *    numiid: 2156,
   *    price: '200',
   *    title: 'xxxx',
   *    sub_title: '简称',
   *    outer_id: '',
   *    approve_status: 'onsale',
   *    sold_quantity: 12,
   *    is_subtitle_edited: 0
   *  }
   * ]
   *
   *
   * @apiUse errorMessage
   */
    // 本组会员分组
    getCustomerGroup() {
        return new Promise((resolve, reject) => {
            CommonHttpTransform.get('/customer/customer_group')
                .then(function (data) {
                    resolve(data.data);
                })
        })
    },
    // 本组会员分类
    getCustomerCategory() {
        return new Promise((resolve, reject) => {
            CommonHttpTransform.get('/customer/customer_category')
                .then(function (data) {
                    resolve(data.data);
                })
        })
    },
    // 获取一个组的会员列表
    getCustomerList(id, pagination, search_word) {
        return new Promise((resolve, reject) => {
            var pageParam = 'page=' + pagination.pageIndex + '&per_page=' + pagination.pageSize
            var searchParam = 'search=' + search_word
            var param = id === 'all' ? '?' + pageParam + '&' + searchParam : '?group_id=' + id + '&' + pageParam + '&' + searchParam
            var url = '/customer/customer' + param
            CommonHttpTransform.get(url
            ).then(function (data) {
                pagination.totalNum = data.meta.pagination.total
                pagination.pageSize = data.meta.pagination.per_page
                pagination.pageIndex = data.meta.pagination.current_page
                resolve(data.data);
            })
        })
    },
    // 获取一个组的会员列表 高级搜索
    getCustomerListMultiSearch(id, pagination, searchParam) {
        return new Promise((resolve, reject) => {
            var pageParam = '?page=' + pagination.pageIndex + '&per_page=' + pagination.pageSize
            var url = '/customer/search' + pageParam
            var postParam = {}
            if (id === 'all') {
                postParam = {
                    search: searchParam
                }
            } else {
                postParam = {
                    search: searchParam,
                    group_id: id
                }
            }
            CommonHttpTransform.post(url, postParam).then(function (data) {
                pagination.totalNum = data.meta.pagination.total
                pagination.pageSize = data.meta.pagination.per_page
                pagination.pageIndex = data.meta.pagination.current_page
                resolve(data.data);
            })
        })
    },
    // 本组创建会员分组
    addCustomeGroup(obj) {
        return CommonHttpTransform.post('/customer/customer_group', obj);
    },
    // 本组会员详情
    getCustomerDetail(id) {
        return new Promise((resolve, reject) => {
            CommonHttpTransform.get('/customer/detail/' + id
            ).then(function (data) {
                resolve(data.data);
            })
        })
    },
    /**
     * 获取本组会员列表 要排除的灰/黑名单
     * @param {Object} pagination 分页对象
     * @param {Boolean} type 要排除的灰/黑名单（0灰名单／1黑名单）.
     * @param {String} search_word 搜索关键字
     * @returns Promise
     */
    getOutOfBGList(pagination, type, search_word) {
        return new Promise((resolve, reject) => {
            var pageParam = 'page=' + pagination.pageIndex + '&per_page=' + pagination.pageSize
            var searchParam = 'search=' + search_word
            var param = '?' + pageParam + '&' + searchParam + '&type=' + type
            var url = '/customer/black_list' + param
            CommonHttpTransform.get(url
            ).then(function (data) {
                pagination.totalNum = data.meta.pagination.total
                pagination.pageSize = data.meta.pagination.per_page
                pagination.pageIndex = data.meta.pagination.current_page
                resolve(data.data);
            })
        })
    },
    /**
     * 添加黑名单
     * @param {Array} [Number] ids 被添加的会员id数组.
     * @returns Promise
     */
    addBlackList(ids) {
        return CommonHttpTransform.post('/customer/addblack', {
            ids: ids,
            type: 1
        })
    },
    /**
     * 添加灰名单
     * @param {Array} [Number] ids 被添加的会员id数组.
     * @returns Promise
     */
    addGreyList(ids) {
        return CommonHttpTransform.post('/customer/addblack', {
            ids: ids,
            type: 0
        })
    },
    /**
     * 移除黑名单
     * @param {Array} [Number] ids 被添加的会员id数组.
     * @returns Promise
     */
    removeBlackList(ids) {
        return CommonHttpTransform.post('/customer/removeblack', {
            ids: ids,
            type: 1
        })
    },
    /**
     * 移除灰名单
     * @param {Array} [Number] ids 被添加的会员id数组.
     * @returns Promise
     */
    removeGreyList(ids) {
        return CommonHttpTransform.post('/customer/removeblack', {
            ids: ids,
            type: 0
        })
    },
    /**
     * 获取会员等级制度
     * @returns Promise
     */
    getMemberLevel() {
        return new Promise((resolve, reject) => {
            CommonHttpTransform.get('/customer/group_crm')
                .then(function (data) {
                    resolve(data.data);
                })
        })
    },
    /**
     * 保存会员等级制度
     * @returns Promise
     */
    saveMemberLevel(data) {
        return CommonHttpTransform.post('/customer/group_crm', data)
    }

}
