/*
 * @Author: baymax
 * @Date: 2017-02-25 17:18:57
 * @Last Modified by: baymax
 * @Last Modified time: 2017-09-02 16:07:45
 * 开发环境配置，继承基础配置
 * 1.热加载
 * 2.js sourceMap
 * 3.友好的错误提示
 */
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
// 设置热加载的文件
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 合并基础配置
module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 自动生成html文件，并引入打包好的静态资源
    new HtmlWebpackPlugin({
      filename: 'index.html',  //生成的html名城
      template: 'index.html',  //模版文件名
      inject: true,            //文件注入
      env: 'development'
    }),
    new FriendlyErrorsPlugin()
  ]
})
