var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    vendor: [
      'vue/dist/vue.common.js', // vue
      'vuex', // vuex（状态管理）
      'vue-axios', // 在Vue原型上注册$http和axios
      'vue-router', // 路由
      'vuex-router-sync', // 将router加入vuex
      'vue-upload-component',
      'axios', // 基于 promise 的 HTTP 库
      'immutable', // Shared mutable state is the root of all evil（共享的可变状态是万恶之源）http://facebook.github.io/immutable-js/
      'moment', // 日期工具函数
      'echarts', // 百度图表库
      'babel-polyfill', // es6、es7垫片
      'xlsx', // js 解析excel
    ]
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].dll.[hash:7].js',
    library: '[name]_library'       // vendor.dll.js中暴露出的全局变量名
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: path.resolve(__dirname, '..'),
    })
  ]
}
