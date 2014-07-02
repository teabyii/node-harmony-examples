// just run `node --harmony generator.js`
const assert = require('assert');

function *fibonacciIterator () {
  var prev = 0,
      cur = 1,
      tmp;

  while (true) {
    tmp = prev;
    prev = cur;
    yield cur = tmp + prev;
  }
}

var fibonacci = fibonacciIterator();

// you can use `next().value` to get more in fibonacci seq
assert.equal(fibonacci.next().value, 1); 
assert.equal(fibonacci.next().value, 2);

// more powerful is using in control flow
// more detail see: 
// https://github.com/visionmedia/co
// https://github.com/jmar777/suspend
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

async(function * () {
  var a = yield asyncData();
  var b = yield asyncData();
  
  assert.equal(a.count, 1);
  assert.equal(b.count, 2);
});

