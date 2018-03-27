import base from './css/base.less';
// 异步加载样式
import(/* webpackChunkName: 'a' */ './css/a.less').then(function(a){
    console.log('css-loader启用css-modules才会显示', a);
})

// 提取实际用到的css
const app = document.getElementById('app');
var divEl = document.createElement('div');
divEl.className = 'bigBox';
app.appendChild(divEl);

// 提取实际用到的js
import { a } from './common/util';
console.log(a());