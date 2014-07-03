// just run `node --harmony generator.js`
const assert = require('assert');

function *fibonacciIterator () {
  var prev = 0,
      cur = 1,
      tmp;

  while (true) {
    yield cur;
    tmp = prev;
    prev = cur;
    cur = tmp + prev;
  }
}

var fibonacci = fibonacciIterator();

// you can use `next().value` to get more in fibonacci seq
assert.equal(fibonacci.next().value, 1); 
assert.equal(fibonacci.next().value, 1);

// more powerful is using in control flow
// more detail see: 
// https://github.com/visionmedia/co
// https://github.com/jmar777/suspend
// http://taskjs.org
// https://github.com/creationix/gen-run
function async (makeGen) {
  var gen = makeGen.apply(this, arguments);
  
  function handle (re) {
    if (re.done) {
      return ;
    }
    
    re.value(function (err, data) {
      if (err) {
        handle(gen.throw(err));
      } else {
        handle(gen.next(data));
      }
    });
  }

  try {
    handle(gen.next());
  } catch (ex) {
  }
}

var count = 0;

function asyncData () {
  return function (cb) {
    setTimeout(function () {
      count += 1;
      cb(null, {
        success: true,
        count: count
      });
    }, 1000);
  };
}

// so you can write asynchronous javascript in a sequential style, so lovely
async(function * () {
  var a = yield asyncData();
  var b = yield asyncData();
  
  assert.equal(a.count, 1);
  assert.equal(b.count, 2);
});

// delegated yield 
var delegatedIterator = (function *() {
  yield 2;
  yield 3;
})();

var delegatingIterator = (function *() {
  yield 1;
  yield* delegatedIterator;
  yield 4;
})();

var icount = 0;
// var value of generator
for (var value of delegatingIterator) {
  assert.equal(++icount, value);
}
