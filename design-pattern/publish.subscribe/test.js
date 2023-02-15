// 发布订阅模式-示例
const salesOffices = {}; // 定义售楼处
salesOffices.clientList = {}; // 缓存列表，存放订阅者的回调函数
salesOffices.listen = function (key, fn) {
  if (!this.clientList[key]) { // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn); // 订阅的消息添加进消息缓存列表
};
salesOffices.trigger = function () {
  const key = Array.prototype.shift.call(arguments), // 取出消息类型
    fns = this.clientList[key]; // 取出该消息对应的回调函数集合
  if (!fns || fns.length === 0) { // 如果没有订阅该消息，则返回
    return false;
  }
  for (let i = 0, fn; fn = fns[i++];) {
    fn.apply(this, arguments); // arguments 是发布消息时附送的参数
  }
};

salesOffices.listen('squareMeter88', function (price) { // 小明订阅88 平方米房子的消息
  console.log('价格=' + price);
  //console.log('squareMeter=' + squareMeter);
});

salesOffices.listen('squareMeter120', function (price) { // 小红订阅120 平方米房子的消息
  console.log('价格=' + price);
  //console.log('squareMeter=' + squareMeter);
});

salesOffices.trigger('squareMeter88', 2000000);  // 发布88 平方米房子的价格
salesOffices.trigger('squareMeter120', 3000000); // 发布120 平方米房子的价格
