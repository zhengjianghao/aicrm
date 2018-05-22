/*
 * http 统一处理
 * @Author: baymax
 * @Date: 2017-03-21 21:52:50
 * @Last Modified by: xiamu
 * @Last Modified time: 2018-04-18 17:09:57
 */
import axios from 'axios'
import config from '../misc/config'
import store from 'vuex/store'
import * as TYPE from '../vuex/type.constant'
import router from '../router/index'
import utils from '../misc/utils'

// 添加头部标识
axios.defaults.headers.common['Accept'] = 'application/vnd.aicrm.v2+json' //区别与正式版本需要修改 v1 -> v2
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 添加请求拦截器
axios.interceptors.request.use(req => {
  var userId = store.state.userData.user_id
  var r = router.currentRoute
  // 存储url上的token
  var _token = ''
  var token = ''
  if (!userId) {
    userId = r.query['tokenKey']
  }
  //  从url来获取token
  _token = r.query['token']
  if (_token) { // url上有token
    token = _token
    if (userId) {
      // 将token存入本地
      utils.setLocalStore(userId, token)
    }
  } else {     // url上无token
    var tokenObj = JSON.parse(window.localStorage.getItem(userId) || '[]')
    if (tokenObj.length === 0) {
      // 要改成用store.state
      token = store.state.tokenState
    } else {
      token = tokenObj.data
    }
  }

  // 将token放入header
  if (token && token.length > 0) {
    req.headers.common['Authorization'] = 'Bearer ' + token
  }
  return req;
},
  error => {
    return Promise.reject(error)
  })
// 添加响应拦截器
axios.interceptors.response.use(res => {
  return res;
}, error => {
  if (error.response.data && error.response.data.status_code) {
    var userId = store.state.userData.user_id
    if (!userId) {
      var r = router.currentRoute
      userId = r.query['tokenKey']
    }
    var res = error.response.data
    switch (res.status_code) {
      case 401:
        window.localStorage.removeItem(userId)
        router.replace({
          path: '/login',
          query: { message: '您淘宝授权登录失败，请重新授权，如有问题请联系客服' }
        })
        break;
    }
  }
  return Promise.reject(error);
});
export default {
  /**
   * 处理get请求
   * @param {String} -path 路径
   * @returns {Promise.<Object>}
   */
  get(path) {
    return new Promise(function (resolve, reject) {
      axios.get(config.API_URL + path)
        .then(function (res) {
          resolve(res.data);
        })
        .catch(function (error) {
          console.error(error);
          reject(error);
        });
    });
  },
  /**
   * 处理post请求
   * @param {String} - path 路径
   * @param {Object} - reqBody 请求体
   * @returns {Promise.<Object>}
   */
  post(path, reqBody) {
    return new Promise(function (resolve, reject) {
      axios.post(config.API_URL + path, reqBody)
        .then(function (res) {
          resolve(res.data);
        })
        .catch(function (error) {
          reject(error.response.data);
        });
    })
  },
  postUpload(path, reqBody) {
    return new Promise(function (resolve, reject) {
      axios.post(config.API_URL + path, reqBody, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(function (res) {
          resolve(res.data);
        })
        .catch(function (error) {
          console.error(error);
          reject(error);
        });
    })
  },

  put(path, reqBody) {
    return new Promise(function (resolve, reject) {
      if (!reqBody) reqBody = {}
      reqBody._method = 'PUT'
      axios.put(config.API_URL + path, reqBody)
        .then(function (res) {
          resolve(res.data);
        })
        .catch(function (error) {
          console.error(error);
          reject(error);
        });
    })

  },
  delete(path, reqBody) {
    return new Promise(function (resolve, reject) {
      axios.delete(config.API_URL + path, reqBody)
        .then(function (res) {
          resolve(res.data);
        })
        .catch(function (error) {
          console.error(error);
          reject(error);
        });
    })
  }
}
