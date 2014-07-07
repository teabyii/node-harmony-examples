const assert = require('assert');

var objs = [
  { name: 'Emacs' },
  { name: 'Vim'},
  { name: 'Webstorm' }
];

// map is like a object, but can use object to be key.
var map = new Map();

objs.forEach(function (item, index) {
  map.set(item, index);
});

assert.equal(map.get(objs[1]), 1);

// console.log(Object.getOwnPropertyNames(Map.prototype));
// construtor, size, set, get, delete, has, clear

assert.equal(map.size, 3);
assert.equal(map.has(objs[2]), true);

var list = [1, 2, 3, 4, 1, 2];

var set = new Set();

list.forEach(function (item) {
  set.add(item);
});

// number in the set, not counting duplicates
assert.equal(set.size, 4);

// set iteration is not yet supported
