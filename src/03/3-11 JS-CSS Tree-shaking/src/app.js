import base from  "./css/base.less";

// css-module
var app = document.getElementById('app');
// app.innerHTML = '<div class="' + base.box + '"></div>';
var div = document.createElement('div');
div.className = 'smallBox';
app.appendChild(div);

import { a } from './common/util';
console.log(a()); // 如果不Tree-shaking会将util里面所有代码都打包进来，报考没使用到的

// import { chunk } from 'lodash'; // Tree-shaking后 73kb
import { chunk } from 'lodash-es'; // Tree-shaking后 139kb,使用babel-plugin-lodash插件仅有8.36kb(仅仅打包了chunk一个方法)
console.log(chunk([1, 2, 3, 4], 2));
