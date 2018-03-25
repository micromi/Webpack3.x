module.exports = function(css) {
  // 运行环境：浏览器环境，在style-loader把样式插入到html中后才执行，可以拿到浏览器相关的参数
  console.log('css', css);
  console.log('window innerWith', window.innerWidth);
  
  if (window.innerWidth >= 768) {
    return css.replace('red', 'green');
  } else {
    return css.replace('red', 'orange');
  }

  return css; // 输出形变后的css
}