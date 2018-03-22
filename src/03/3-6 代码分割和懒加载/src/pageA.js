// import './subPageA';
// import './subPageB';
// import * as _ from 'lodash';

// 【【使用webpack方法实现代码分割功能s】】
// 2.【reuquire.include (1个参数)依赖加载进来并不会执行】
// 用处：当2个子模块依赖第三方模块，可以把第三方模块放到父模块中，动态加载子模块不会再加载第三方的模块
//   此处是subPageA,subPageB都依赖moduleA,而被pageA依赖，即可以把moduleA放到pageA中加载, （dist-2文件夹情况）
//   不然仅仅靠require.ensure无法将ensure依赖的模块中的共同依赖分离 （dist-1文件夹情况，注释掉下行代码）
require.include('./moduleA');


// 代码分割方法一：1.【require.ensure (4个参数，依次是依赖，回调函数，错误回调-可省略，指定chunk名称)】
//   依赖加载(异步加载)进来并不会执行，在callback中reqiure依赖才会去执行
var page = 'subPageA';
// if (page === 'subPageA') {
//   require.ensure(['./subPageA'], function() { // 如果第一个参数依赖为空数组，第二个参数require进来的依赖仍然是异步加载进来的
//     var subPageA = require('./subPageA'); // 此处如果不重新require，依赖会打包分割，程序运行时会加载但不会执行
//   }, 'subPageA');
// } else if (page === 'subPageB') {
//   require.ensure(['./subPageB'], function() {
//     var subPageB = require('./subPageB');
//   }, 'subPageB');
// }


// 代码分割方法二：1.【通过ES2015 Loader定义的Loader规范动态Import ,依赖加载(异步加载)进来会执行】
//  可以通过注释指定chunk名称和模式：例如 /* webpackChunkName: 'subPageA' */ /* webpackMode: 'lazy' *
if (page === 'subPageA') {
  import(/* webpackChunkName: 'subPageA' */'./subPageA').then(function(subPageA) {
    console.log(subPageA)
  })
} else if (page === 'subPageB') {
  import(/* webpackChunkName: 'subPageA' */'./subPageB').then(function(subPageB) {
    console.log(subPageB)
  })
}


require.ensure(
  ['lodash'],
  function() {
    var _ = require('lodash');
    _.join(['1', '2'], '3');
  },
  'vendor'
);

export default 'pageA';
