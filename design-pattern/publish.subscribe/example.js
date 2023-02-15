// 发布订阅模式-示例
const event = {
  clientList: [],
  listen: function (key, fn) {
    if (!this.clientList[key]) this.clientList[key] = [];
    this.clientList[key].push(fn);
  },
  trigger: function () {
    const key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key];

    // 如果没有绑定对应消息
    if (!fns || fns.length === 0) return false;

    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  },
  remove: function (key, fn) {
    const fns = this.clientList[key];
    if (!fns) return false; // 如果key 对应的消息没有被人订阅，则直接返回
    if (!fn) { // 如果没有传入具体的回调函数，表示需要取消key 对应消息的所有订阅
      fns && (fns.length = 0);
    } else {
      for (let l = fns.length - 1; l >= 0; l--) { // 反向遍历订阅的回调函数列表
        const _fn = fns[l];
        if (_fn === fn) fns.splice(l, 1); // 删除订阅者的回调函数
      }
    }
  }
};

const installEvent = function (obj) {
  for (let i in event) {
    obj[i] = event[i];
  }
};

const salesOffices = {};
installEvent(salesOffices);

// 订阅
salesOffices.listen('squareMeter88', fn1 = price => console.log('价格=' + price));
salesOffices.listen('squareMeter120', fn2 = price => console.log('价格=' + price));

// 发布
salesOffices.trigger('squareMeter88', 2000000);
salesOffices.trigger('squareMeter120', 3000000);

console.log('---------------------------------------');
// 删除小明订阅
salesOffices.remove('squareMeter88', fn1);
salesOffices.trigger('squareMeter88', 2000000);
salesOffices.trigger('squareMeter120', 3000000);
