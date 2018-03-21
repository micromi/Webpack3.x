module.exports = {
  entry: {
    app: './app.js',
  },
  output: {
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        // use: 'babel-loader', // 单独loader
        use: { // 对象形式
          loader: 'babel-loader',
          options: {
            //// 下面整段代码注释掉的原因是：在项目根目录下.babelrc文件中已经使用 babel-runtime 局部垫片的方式实现
            // presets: [ // 引入babel-preset-env 包，指定babel-loader打包的语法规范
            //   ['@babel/preset-env',{ // targets: 告诉babel，编译时根据指定的targets,选择哪些语法进行编译哪些不编译
            //     targets: {
            //       browsers: ['> 1%', 'last 2 versions']
            //       // chrome: '52'
            //     }
            //   }],
            // ],
            // // // 需要webpack安装到本地环境才支持本地plugins(避免webpack全局安装找不到本地插件路径)
            // // plugins: ['@babel/transform-runtime', 'transform-remove-console'] // 编译后的代码都会移除console.*
          }
        }
      }
    ]
  }
};
