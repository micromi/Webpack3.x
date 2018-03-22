// import './subPageA';
// import './subPageB';
import * as _ from 'lodash'; // 同步加载进来

// 代码分割方法一：1.【require.ensure (4个参数，依次是依赖，回调函数，错误回调-可省略，指定chunk名称)】
//   依赖加载(异步加载)进来并不会执行，在callback中reqiure依赖才会去执行
var page = 'subPageB';

// 代码分割方法二：1.【通过ES2015 Loader定义的Loader规范动态Import ,依赖加载(异步加载)进来会执行】
//  可以通过注释指定chunk名称和模式：例如 /* webpackChunkName: 'subPageA' */ /* webpackMode: 'lazy' *
if (page === 'subPageA') {
  import(/* webpackChunkName: 'subPageA' */'./subPageA').then(function(subPageA) {
    console.log(subPageA)
  })
} else if (page === 'subPageB') {
  import(/* webpackChunkName: 'subPageB' */'./subPageB').then(function(subPageB) {
    console.log(subPageB)
  })
}

export default 'pageB';
