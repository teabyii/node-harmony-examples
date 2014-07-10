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

// WeakMap
// In native WeakMaps, references to key objects are held 'weakly'
// Means that if no other reference to the object, will not prevent garbage collection
// WeakMap keys are not enumerable
var weak = new WeakMap();

// the key-value pair will be gc immediately
weak.set({}, 'noop');
var empty = {}, node = { node: 'harmony' }, exchange;

weak.set(empty, 'hello');
assert.equal(weak.get(empty), 'hello');

exchange = empty;
empty = null;
assert.equal(weak.get(exchange), 'hello');

exchange = null;
assert.equal(weak.get({}), undefined);

weak.set(node, undefined);
assert.equal(weak.has(node), true);

weak.delete(node);
assert.equal(weak.get(node), undefined);






