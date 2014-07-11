const assert = require('assert');

// you should use node 0.11.13 or later
var pro = new Promise(function (resolve, reject) {
  setTimeout(function () {
    // no error no reject
    resolve({ status: 'ok' });
  }, 1000);
});

pro.then(function (re) {
  assert.equal(re.status, 'ok');
}, function () {
  // nothing happen
  assert.equal(true, false);
});

// this requirement ensures that onFulfilled and onRejected execute asynchronously
// use `setTimeout` or `setImmediate` or `process.nextTick` to help
var another_pro = new Promise(function (resolve, reject) {
  var count = 1;
  setImmediate(function () {
    resolve(count);
  });
});

// and `then` chain can be made up before `resolve` or `reject` being called
another_pro.then(function (re) {
  assert.equal(re, 1);
});

// console.log(Object.getOwnPropertyNames(Promise));
// more static method:

// resolve
// return promise fulfilled with param as result
Promise
  .resolve({ status: 'ok' })
    .then(function (re) {
      assert.equal(re.status, 'ok');
    })
;
// also can be used like this:
// Promise.resolve(thenable).then(...);
// provide thenable object to return a promise, like jquery deferred

// reject
// return promise rejected with param as result
Promise
  .reject({ status: 'error' })
    .then(function (err) {
      assert.equal(err.status, 'ok');
    })
;

// all promise fulfilled in array to call onFulfilled
// only one promise rejected in array will call onRejected
Promise
  .all([pro, another_pro])
    .then(function (re) {
      assert.equal(re[0].status, 'ok');
      assert.equal(re[1], 1);
    })
;

// only one promise fulfilled in array to call onFulfilled
// and this promise's result passed to onFulfilled
// only one promise rejected in array will call onRejected
Promise
  .race([pro, another_pro])
    .then(function (re) {
      assert.equal(re.status, 'ok');
    })
;

// @#todo
// accept? defer?
