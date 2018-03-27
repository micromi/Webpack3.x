// 1. 【style-loader: 页面插入style标签(如果引用多个样式，页面会插入多个style标签,可使用singleton配置)】
// 2. 【style-laoder/url: 页面插入link标签(不常用，如果引用多个样式，页面会插入多个link标签，请求多次资源)】
// import base from  "./css/base.css";
// import common from "./css/common.css";

// 使用less文件
import base from  "./css/base.less";
import common from "./css/common.less";

// 使用sass文件
// import base from  "./css/base.scss";
// import common from "./css/common.scss";

// 异步加载css, 在ExtractTextWebpackPlugin插件配置allChunks
// allChunks为false只会提取初始化的css(异步加载的css不提取)，为true会把import进来的css都会提取到一个文件中
import(/* webpackChunkName: 'a' */ './css/components/a.less').then(function(a){
    console.log(a);
})


// 3. 【style-loader/useable:  能够在style-loader中控制样式插入或不插入页面中】
// import base from  "./css/base.css";
// import common from "./css/common.css";

// let flag = false;
// setInterval(function() {
//   if (flag) {
//     base.unuse(); // 控制style消失
//   } else {
//     base.use(); // 控制style显示
//   }
//   flag = !flag;
// }, 500);


// css-module
// var app = document.getElementById('app');
// app.innerHTML = '<div class="' + base.box + '"></div>';


// 提取实际用到的js
import { a } from './common/util';
console.log(a());


// 提取实际用到的css
const app = document.getElementById('app');
var divEl = document.createElement('div');
divEl.className = 'box';
app.appendChild(divEl);
