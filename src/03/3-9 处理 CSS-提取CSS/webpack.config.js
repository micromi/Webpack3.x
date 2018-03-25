var path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // 提取css插件

module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'), // 指定所有输出文件的目标路径
    publicPath: './dist/', // 指定输出解析文件的目录，url 相对于 HTML 页面
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
                modules: true, // 启用css-modules
                localIdentName: '[path][name]__[local]--[hash:base64:5]' // 定义css-modules编码出来的样式名称
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

            // // 2. style-laoder/url: 页面插入link标签(不常用，如果引用多个样式，页面会插入多个link标签)
            // {
            //   loader: 'style-loader/url'
            // },
            // {
            //   loader: 'file-loader'
            // },

            // // 3. style-loader/useable:  能够在style-loader中控制样式插入或不插入页面中
            // {
            //   loader: 'style-loader/useable'
            // },
            // {
            //   loader: 'css-loader'
            // },
          ]
        }),
      }
    ]
  },

  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css', // 提取后的css名称,上线要把css-loader中minimize设为true
      allChunks: false, // 默认false，只会提取初始化的css(异步加载的css不提取), 给插件指定一个提取的范围， 为true会把import进来的css都会提取到一个文件中
    })
  ]
}