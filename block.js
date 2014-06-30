// you should run this script by:
// `node --harmony --use-strict block.js
const assert = require('assert');

var value = 'hello let';

// inside an anonymous block
{
  let value = 'hello world';
}
assert.equal(value, 'hello let');

// es6 version fibonacci
function fibonacci (n) {
  let prev = 0,
      cur = 1;
  
  for (let i = 0; i < n; i++) {
  // you can use tmp just in this block
    let tmp = prev;
    prev = cur;
    cur = tmp + prev;
  }
  
  return cur;
}
assert.equal(fibonacci(7), 21);

// nested loop
function count (n) {
  for (let i = 0; i < 3; i++) {
    for (let i = 0; i < 3; i++) {
      n++;
    }
  }
  return n;
}
assert.equal(count(0), 9);

function clo () {
  var arr = [];

  for (let i = 0; i < 5; i++) {
    arr[i] = function () {
      return i;
    };
  }
  
  return arr;
}
let func = clo()[1];
assert(func(), 1);

// for diff `var` and `let`
function cloes5 () {
  var arr = [];
  for (var i = 0; i < 5; i++) {
    arr[i] = function () {
      return i;
    };
  }
  return arr;
}
var func2 = cloes5()[1];
assert(func2(), 4);
