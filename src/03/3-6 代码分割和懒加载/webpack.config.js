const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    'pageA': './src/pageA',
    // 'pageB': './src/pageB',
    // 'vendor': ['lodash'] // 第三方代码：业务代码和第三方代码区分开，单独打包
  },

  output:{
    path: path.resolve(__dirname, './dist'), // 指定所有输出文件的目标路径
    publicPath: './dist/',  // 指定输出解析文件的目录，url 相对于 HTML 页面
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },

  // plugins: [
  //   // // 【注意】提取公共代码，一定是多entry的，即：多入口才行,单页面仅会将webpack生成的代码(打包单独文件)和业务相关代码含第三方依赖(打包单独文件)分离
  //   // // 情况4.将webpack生成的代码和几个入口公用的代码及第三方依赖单独打包：在情况3基础上new 第三个实例（dist-4文件夹情况）
  //   // new webpack.optimize.CommonsChunkPlugin({
  //   //   name: 'common',
  //   //   minChunks: 2,
  //   //    // 指定范围提取entry公共代码, 不然会打包报一个一下错误
  //   //    // （ERROR in CommonsChunkPlugin: While running in normal mode it's not allowed to use a non-entry chunk (vendor)）
  //   //   chunks: ['pageA', 'pageB']
  //   // }),

  //   // // new webpack.optimize.CommonsChunkPlugin({
  //   // //   // 情况1.将webpack生成的代码和几个入口公用的代码打包到common.bundle.js一起（dist-1文件夹情况）
  //   // //   // name: 'common',
  //   // //   // minChunks: 2  // 为数字--提取公共代码出现的次数最小值

  //   // //   // 情况2.将webpack生成的代码和第三方依赖的代码打包到vendor.bundle.js一起,模块公共代码不提取[minChunks: Infinity]（dist-2文件夹情况）
  //   // //   name: 'vendor', // 【此时entry中含有第三方依赖的入口，此处name就是上面第三方入口的entry名称】
  //   // //   minChunks: Infinity  // 为 Infinity--不会打包任何模块的代码, 为数字会提取公共代码到vendor中
  //   // // }),

  //   // // // 情况3.将webpack生成的代码和第三方依赖的代码区分开,模块公共代码不提取：在情况2基础上new 第二个实例（dist-3文件夹情况）
  //   // // new webpack.optimize.CommonsChunkPlugin({
  //   // //   name: 'manifest', //【此名称取entry没有的名字即可，用来放webpack生成的代码】
  //   // //   minChunks: Infinity
  //   // // }),

  //   // // 合并names：情况3下，new出来是实例配置跟情况2只有name不同，可以合并成names数组的写法，但顺序不能变（打包后同dist-3或dist-4文件夹情况）
  //   // new webpack.optimize.CommonsChunkPlugin({
  //   //   names: ['vendor', 'manifest'], // (数组格式)根据数组的每一项新建插件的实例多少次,这里是2次，同上面同时存在情况2和情况32个实例
  //   //   minChunks: Infinity
  //   // })
    

  //   // 【简化】
  //   // 【注意】提取公共代码，一定是多entry的，即：多入口才行,单页面仅会将webpack生成的代码(打包单独文件)和业务相关代码含第三方依赖(打包单独文件)分离
  //   // 情况1
  //   // new webpack.optimize.CommonsChunkPlugin({
  //   //   name: 'common',
  //   //   minChunks: 2
  //   // }),
  //   // 情况2
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor', //【此时entry中含有第三方依赖的入口，此处name就是上面第三方入口的entry名称】
  //     minChunks: Infinity
  //   }),
  //   // 情况3
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'manifest', //【此名称取entry没有的名字即可，用来放webpack生成的代码】
  //     minChunks: Infinity
  //   }),
  //   // 情况4
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'common', //【此名称取entry和上面实例中没有的名字即可，用来放chunks中生成的公共的代码】
  //     minChunks: 2,
  //     chunks: ['pageA', 'pageB']
  //   })
  // ]
}