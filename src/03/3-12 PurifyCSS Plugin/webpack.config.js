const path = require('path');
const Webpack = require('webpack');
const glob = require('glob');
const globAll = require('glob-all'); // 处理多路径
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          // fallback: 不提取出一个文件用什么方式处理打包后的css加载到页面中(主要针对异步加载的css)
          fallback: {
            loader: 'style-loader',
            options: {
              // insertInto: '#app',
              singleton: true
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                // minimize: true
                // modules: true, // 启用css-modules
                // localIdentName: '[path][name]__[local]--[hash:base64:5]' // 定义css-modules编码出来的样式名称
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  // require('autoprefixer')(),
                  require('postcss-cssnext')()
                ]
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css',
      allChunks: false
    }),

    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      // paths: glob.sync(path.join(__dirname, './*.html')),
      // paths: glob.sync(path.join(__dirname, './src/*.js')),
      paths: globAll.sync([
        path.join(__dirname, './*.html'),
        path.join(__dirname, './src/*.js')
      ])
    }),

    // new Webpack.optimize.UglifyJsPlugin()
  ]
};
