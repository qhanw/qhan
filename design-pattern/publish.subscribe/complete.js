// 发布订阅模式-完整示例

const Event = (function () {
  let global = this,
    Event,
    _default = 'default';
  Event = function () {
    let _listen,
      _trigger,
      _remove,
      _slice = Array.prototype.slice,
      _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      namespaceCache = {},
      _create,
      find,
      each = function (ary, fn) {
        let ret;
        for (let i = 0, l = ary.length; i < l; i++) {
          let n = ary[i];
          ret = fn.call(n, i, n);
        }
        return ret;
      };
    _listen = function (key, fn, cache) {
      if (!cache[key]) {
        cache[key] = [];
      }
      cache[key].push(fn);
    };
    _remove = function (key, cache, fn) {
      if (cache[key]) {
        if (fn) {
          for (let i = cache[key].length; i >= 0; i--) {
            if (cache[key][i] === fn) {
              cache[key].splice(i, 1);
            }
          }
        } else {
          cache[key] = [];
        }
      }
    };
    _trigger = function () {
      let cache = _shift.call(arguments),
        key = _shift.call(arguments),
        args = arguments,
        _self = this,
        ret,
        stack = cache[key];
      if (!stack || !stack.length) return;
      return each(stack, function () {
        return this.apply(_self, args);
      });
    };
    _create = function (namespace) {
      namespace = namespace || _default;
      let cache = {},
        offlineStack = [], // 离线事件
        ret = {
          listen: function (key, fn, last) {
            _listen(key, fn, cache);
            if (offlineStack === null) return;
            if (last === 'last') {
              offlineStack.length && offlineStack.pop()();
            } else {
              each(offlineStack, function () {
                this();
              });
            }
            offlineStack = null;
          },
          one: function (key, fn, last) {
            _remove(key, cache);
            this.listen(key, fn, last);
          },
          remove: function (key, fn) {
            _remove(key, cache, fn);
          },
          trigger: function () {
            let fn,
              args,
              _self = this;
            _unshift.call(arguments, cache);
            args = arguments;
            fn = function () {
              return _trigger.apply(_self, args);
            };
            if (offlineStack) return offlineStack.push(fn);
            return fn();
          }
        };
      return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret;
    };
    return {
      create: _create,
      one: function (key, fn, last) {
        const event = this.create();
        event.one(key, fn, last);
      },
      remove: function (key, fn) {
        const event = this.create();
        event.remove(key, fn);
      },
      listen: function (key, fn, last) {
        const event = this.create();
        event.listen(key, fn, last);
      },
      trigger: function () {
        const event = this.create();
        event.trigger.apply(this, arguments);
      }
    };
  }();
  return Event;
})();


/************** 先发布后订阅 ********************/
Event.trigger('click', 1);
Event.listen('click', a => console.log(a));

/************** 使用命名空间 ********************/
const namespace1 = Event.create('namespace1');
namespace1.listen('click', a => console.log(a));
namespace1.trigger('click', 2);
console.log(namespace1);

Event.create('namespace2').listen('click', a => console.log(a));
Event.create('namespace2').trigger('click', 3);
