const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const webpack = require('webpack')

const ExtractPlugin = require('extract-text-webpack-plugin')

//借助 cross-env 判断是否是开发环境  ,启动脚本设置的环境变量都是存在process.env里面的
const isDev = process.env.NODE_ENV === 'development'
//html-webpack-plugin 插件设置html入口
const HTMLPlugin = require('html-webpack-plugin')

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'budle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader', //封装了fileloader,将小于limit大小的文件 转成base64
            options: {
              limit: 1024,
              name: '[name]-abc.[ext]' //webpack选项 定义文件名,扩展名
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    //编译过程中以及自己写js代码时,判断环境调用process.env.NODE_ENV,
    //vue  React 会根据不同环境区分打包.开发环境需要错误提醒这些,但是正式版本不需要
    //写在''引号里面是为了不被编译成一个未定义的development变量.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),

    new HTMLPlugin()
  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourcemap: true //sourcemap 生成下面还可以直接用 节约编译
        }
      },
      'stylus-loader'
      /**
       * stylus-loader 是将stylus文件编译成css
        css-loader 是处理css文件中的url()等
        style-loader 将css插入到页面的style标签顺便告诉你
       */
    ]
  })

  //在config 上面加 devSever的配置
  //sourcemap 映射方式代码映射 便于浏览器调试
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000, //启动服务监听的端口
    host: '0.0.0.0', //主机 通过localhost 和内网ip来访问(手机等其他设备也可以访问)
    overlay: {
      //webpack编译的过程中如果有任何错误都在网页中输出
      errors: true
    },
    open: true, //启动 dev-server时候 自动打开浏览器,看需求开启
    //historyApiFallback  功能
    hot: true // 热加载  修改后页面不刷新  ,需要依赖下面的插件HotModuleReplacementPlugin
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin() //减少不需要信息的展示
  )
} else {
  //正式环境
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue'] //框架代码是稳定的,需长期缓存在浏览器,单独打包 优化性能
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourcemap: true //sourcemap 生成下面还可以直接用 节约编译
          }
        },
        'stylus-loader'
      ]
    })
  })
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:'runtime'  //webpack 在app 中单独打包到一个文件,新文件插入 不用'hash重排' 长缓存
    })
  )
}

module.exports = config
