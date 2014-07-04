const assert = require('assert');

// 
var one = Proxy.create({
  get: function () {
    return 1;
  },
  set: function (receiver, index, value) {
    assert.equal(index, 'value');
    assert.equal(value, 1);
  }
});
one.value = 1;

assert.equal(one.age, 1);
assert.equal(one.count, 1);

// we can use proxy to create magic method
// just an example
function Data(obj) {
  var _data = obj;
  
  return Proxy.create({
    get: function (receiver, index) {
      var re = index.match(/^((?:get)|(?:set))(.+)$/), key;
      if (re) {
        key = re[2].replace(/^./, function (a) { return a.toLowerCase(); });
        return {
          get: function () {
            return _data[key];
          },
          set: function (value) {
            // avoid to add object key 
            if (key in _data) {
              return _data[key] = value;
            } else {
              return false;
            }
          }
        }[re[1]];
      } else {
        return undefined;
      }
    },
    set: function () {
      // if no `set` function, `obj.prop = value` will throw error
    }
  });
}

var record = Data({
  name: 'Boom',
  age: '20',
  job: 'developer'
});

assert.equal(record.name, undefined);
assert.equal(record.getName(), 'Boom');
record.id = 1;
assert.equal(record.id, undefined);
assert.equal(record.setId(1), false);
assert.equal(record.getId(), undefined);
assert.equal(record.setAge(21), 21);
assert.equal(record.getAge(), 21);
