// 1. 【style-loader: 页面插入style标签(如果引用多个样式，页面会插入多个style标签,可使用singleton配置)】
// 2. 【style-laoder/url: 页面插入link标签(不常用，如果引用多个样式，页面会插入多个link标签，请求多次资源)】
// import base from  "./css/base.css";
// import common from "./css/common.css";

// 使用less文件
// import base from  "./css/base.less";
// import common from "./css/common.less";

// 使用sass文件
import base from  "./css/base.scss";
import common from "./css/common.scss";


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
var app = document.getElementById('app');
app.innerHTML = '<div class="' + base.box + '"></div>';
