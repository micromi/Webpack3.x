// es6 module
import sum from './sum';

// commonjs
const minus  = require('./minus');

// amd
require(['./muti'], function(muti) {
    console.log('muti(2, 3)', muti(2, 3));
})

console.log('sum(23, 24)', sum(23, 24));
console.log('minus(17, 7)', minus(17, 7));
