/*
 * @Author: baymax
 * @Date: 2017-02-25 17:16:41
 * @Last Modified by: baymax
 * @Last Modified time: 2018-04-27 18:17:16
 * webpack 基础配置
 */
var path = require('path')
var chalk = require('chalk')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var HappyPack = require('happypack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); // 采用多进程，进程数由CPU核数决定

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var cssLoader = ExtractTextPlugin.extract({
  use: [
    'happypack/loader?id=happy-css'
  ]
})

// inject happypack accelerate packing for vue-loader
Object.assign(vueLoaderConfig.loaders, {
  js: 'happypack/loader?id=happy-babel-vue',
  css: cssLoader
})

function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    // make happy more verbose with HAPPY_VERBOSE=1 判断是否输出日志
    verbose: process.env.HAPPY_VERBOSE === '1'
  })
}

module.exports = {
  // 入口文件
  entry: {
    app: './src/main.js'
  },
  // 打包后输入目录
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 其它配置项
  resolve: {
    // 匹配文件顺序
    extensions: ['.js', '.vue', '.json'],
    // 指定匹配目录
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    // 文件映射
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'style': resolve('src/style')
    }
  },
  // 加载器匹配
  module: {
    noParse: /node_modules\/(element-ui\.js)/,
    rules: [
      // 语法校验
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        exclude: /node_modules|vendor\.dll\.js|env.js/,
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true,
          quiet: true
        }
      },
      //编译vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [resolve('src')],
        exclude: /node_modules/,
        options: vueLoaderConfig
      },
      // 编译es6
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happy-babel-js',
        include: [resolve('src'), resolve('test')],
        exclude: /node_modules|vendor\.dll\.js/
      },
      //base64
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      //base64
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // 添加DllReferencePlugin插件
  plugins: [
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.blue.bold(':percent') + ' (:elapsed seconds)'
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require('./vendor-manifest.json')
    }),
    createHappyPlugin('happy-babel-js', ['babel-loader?cacheDirectory=true']),
    createHappyPlugin('happy-babel-vue', ['babel-loader?cacheDirectory=true']),
    createHappyPlugin('happy-css', ['css-loader', 'vue-style-loader']),
    // https://github.com/amireh/happypack/pull/131
    new HappyPack({
      loaders: [{
        path: 'vue-loader',
        query: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      }]
    })
  ]
}
