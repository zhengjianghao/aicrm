/*
 * @Author: baymax 
 * @Date: 2017-02-25 16:01:18 
 * @Last Modified by: baymax
 * @Last Modified time: 2017-02-25 17:17:59
 * 打包、编译样式文件
 * 
 */
var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    // 做css浏览器兼容的前缀
    require('autoprefixer')({
      browsers: ['last 2 versions']
    })
  ]
}
