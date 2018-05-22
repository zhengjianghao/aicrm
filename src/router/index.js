import Vue from 'vue'
import login from '../views/login/login.router.js'
import homepage from '../views/homepage/homepage.router.js'
import lossPrevention from '../views/lossPrevention/homepage.router.js'
import care from '../views/care/homepage.router.js'
import firstBuy from '../views/firstBuy/homepage.router.js'
import maintenance from '../views/maintenance/homepage.router.js'
import saveCustomer from '../views/saveCustomer/homepage.router.js'
import memberManage from '../views/memberManage/memberManage.router.js'
import message from '../views/message/message.router.js'
import SystemSettings from '../views/SystemSettings/SystemSettings.router.js'
import importOrder from '../views/importOrder/importOrder.router.js'
import tasklist from '../views/tasklist/tasklist.router.js'
import activateCustomer from '../views/activateCustomer/homepage.router.js'
import dataChart from '../views/dataChart/homepage.router.js'
import confirm_order from '../views/abnormalPage/confirm_order.router.js'
import serverCenter from '../views/serverCenter/serverCenter.router.js'
import VueRouter from 'vue-router'
import * as TYPE from '../vuex/type.constant'
import config from '../misc/config'
import store from '../vuex/store'
import utils from '../misc/utils'
import App from '../App.vue'
Vue.use(VueRouter)

// 路由汇总
const Router = {
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '',
          redirect: '/homepage'
        },
        homepage,
        lossPrevention,
        care,
        firstBuy,
        maintenance,
        saveCustomer,
        activateCustomer,
        message,
        SystemSettings,
        memberManage,
        importOrder,
        tasklist,
        dataChart,
        serverCenter
      ]
    },
    login,
    confirm_order
  ]
}
const router = new VueRouter({
  mode: 'history',
  routes: Router.routes
})

// 验证用户是否登录
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    var token = to.query.token
    // url上有token，则认为是从aicrm跳转过来
    if (token) {
      // 获取用户信息
      store.dispatch('getUser', token).then(user => {
        // 将token存入本地
        utils.setLocalStore(user.user_id, token)
        // 跳转到主页
        if (user.type !== 'p4p') {
          next({
            path: '/login',
            query: {
              message: '您未订购按成果分成版，如有问题请联系客服'
            }
          })
        } else {
          next({
            path: 'homepage',
            query: {
              // 在url上追加用户id，用于多用户登录身份识别
              tokenKey: user.user_id
            }
          })
        }
      })
    } else {
      // url上有tokenKey(用户id)，则认为用户已经登录
      // 获取上一个url，在url上追加用户id，用于多用户登录身份识别
      var from_tokenKey = from.query.tokenKey
      var to_tokenKey = to.query.tokenKey
      if (to_tokenKey) {
        next()
        return
      }
      // url上无用户id，继续
      if (!from_tokenKey) {
        next()
        return
      }
      // url上有用户id，则根据id获取对应用户token
      var tokenObj = JSON.parse(window.localStorage.getItem(from_tokenKey) || '[]')
      // URl上的参数
      var params = to.query
      // 本地token未过期
      if (tokenObj.data && tokenObj.data.length && !utils.getLocalStore(tokenObj).timeout) {
        // 将用户id追加到url上
        params['tokenKey'] = from_tokenKey
        // 继续跳转
        next({
          path: to.path,
          query: params
        })
        // 本地token过期
      } else if (tokenObj.data && tokenObj.data.length && utils.getLocalStore(tokenObj).timeout) {
        // token过期则刷新token
        store.dispatch('updateToken').then(() => {
          // 用户信息
          store.dispatch('getUser').then(user => {
            // 重新设置用户id，追加到url上
            params['tokenKey'] = user.user_id
            // 继续跳转
            next({
              path: to.path,
              query: params
            })
          })
        })
        // 本地没有token信息
      } else {
        next({ path: '/login' })
      }
    }
  } else {
    // 到登录页
    next()
  }
})

export default router
