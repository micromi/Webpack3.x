var path = require('path');
var Webpack = require('webpack');
var glob = require('glob');
var globAll = require('glob-all'); // 处理多路径
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // 提取css插件
var PurifyCSSPlugin = require('purifycss-webpack'); // 去除多余css插件

// var extractLess = new ExtractTextWebpackPlugin({
//   filename: 'css/[name].min.css', // 提取后的css名称,上线要把css-loader中minimize设为true
//   allChunks: false, // 默认false，只会提取初始化的css(异步加载的css不提取), 给插件指定一个提取的范围， 为true会把import进来的css都会提取到一个文件中
// });


module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'), // 指定所有输出文件的目标路径
    publicPath: 'dist/', // 指定输出解析文件的目录，url 相对于 HTML 页面
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },

  module: {
    rules: [
      {
        // test: /\.css$/, // 【处理css文件】
        test: /\.less$/, // 【处理less文件】需要安装less less-loader
        // test: /\.scss$/, // 【处理sass文件】需要安装sass-loader node-loader
        use:  ExtractTextWebpackPlugin.extract({
          fallback: { // 不提取出一个文件用什么方式处理打包后的css加载到页面中 
            // 1. style-loader: 页面插入style标签(默认在head中)(如果引用多个样式，页面会插入多个style标签)
            loader: 'style-loader',
            options: {
              // insertInto: '#app', // style标签插入DOM位置
              singleton: true, // 是否只使用一个style标签
              transform: './css.transform.js' // 转化，在浏览器环境，插入页面前（路径：css变形的函数,文件里面具体操作）
            }
          },
          use: [ // 继续处理css的loader
            {
              loader: 'css-loader',
              options: {
                // minimize: true, // css是否压缩
                // modules: true, // 启用css-modules
                // localIdentName: '[path][name]__[local]--[hash:base64:5]' // 定义css-modules编码出来的样式名称
              }
            },
            
            // postcss-loader要在css-loader和预编译语言之间
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss', // 表明下面的插件是给postcss使用的
                plugins: [ // 对插件的调用
                  // require('autoprefixer')(), // 添加css浏览器前缀
                  require('postcss-cssnext')() // 使用未来css语法，里面包含了autoprefixer
                ]
              }
            },

            // 【处理less文件】使用必须在style-loader,css-loader之后
            {
              loader:'less-loader'
            },
            // 【处理sass文件】使用必须在style-loader,css-loader之后
            // {
            //   loader:'sass-loader'
            // },
          ]
        }),
      },

      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     publicPath: '../assets/imgs/', // 打包文件中引用文件的路径前缀
          //     outputPath: '', // 输出文件路径前缀
          //     useRelativePath: true, // 图片路径相对于css文件夹的
          //     name: '[name].[ext]', // 输出的文件名规则
          //   }
          // },
          {
            loader: 'url-loader',  // 把图片转成base64
            options: {
              limit: 8000, // 小于8kb的转base64
              publicPath: '../assets/imgs/',
              outputPath: '',
              useRelativePath: true,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].min.css', // 提取后的css名称,上线要把css-loader中minimize设为true
      allChunks: false, // 默认false，只会提取初始化的css(异步加载的css不提取), 给插件指定一个提取的范围， 为true会把import进来的css都会提取到一个文件中
    }),
    
    // 去除打包后没用到的css，必须放到ExtractTextWebpackPlugin后面，【跟css-loader中css-modules不能一起使用】
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      // paths: glob.sync(path.join(__dirname, './*.html')),
      // paths: glob.sync(path.join(__dirname, './src/*.js')),
      paths: globAll.sync([
        path.join(__dirname, './*.html'),
        path.join(__dirname, './src/*.js')
      ])
    }),

    new Webpack.optimize.UglifyJsPlugin()
  ]
}