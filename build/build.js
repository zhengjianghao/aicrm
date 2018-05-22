require('./check-versions')()
process.env.NODE_ENV = 'production'
var ora = require('ora') // 漂亮的进度提示工具
var rm = require('rimraf') // 操作目录
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('开始构建......')
spinner.start()
// 先清空dist目录，再执行构建
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 开始构建
  webpack(webpackConfig, function (err, stats) {
    // 构建结束的回调
    if (err) {
      spinner.stop()
      throw err
    }
    // 打印构建后的文件列表
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    spinner.succeed('  构建完成')
    spinner.stop()
  })
})
