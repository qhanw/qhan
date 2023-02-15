// 示例-代理模式-送花
const Flower = function () {
};

// 发起者
const tom = {
  sendFlower: function (target) {
    const flower = new Flower();
    target.receiveFlower(flower)
  }
};

// 代理者
const B = {
  receiveFlower: function (flower) {
    A.listenGoodMood(function () {
      A.receiveFlower(flower)
    })
  }
};

// 接收者
const A = {
  receiveFlower: function (flower) {
    console.log('收到花 ' + flower);
  },
  listenGoodMood: function (fn) {
    setTimeout(function () {
      fn();
    }, 3000)
  }
};

tom.sendFlower(B);
