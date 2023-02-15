// 示例-代理模式-计算乘积（缓存代理）
  // 计算乘积
  const mult = function () {
    console.log('开始计算乘积！');
    let a = 1;
    for (let i = 0, l = arguments.length; i < l; i++) {
      a = a * arguments[i]
    }
    return a;
  };

  //  计算加和
  const plus = function () {
    console.log('开始计算加和！');
    let a = 0;
    for (let i = 0, l = arguments.length; i < l; i++) {
      a = a + arguments[i];
    }
    return a;
  };

  // 创建缓存代理工厂
  const createProxyFactory = function (fn) {
    const cache = {};
    return function () {
      const args = Array.prototype.join.call(arguments, ',');
      if (args in cache) return cache[args];
      return cache[args] = fn.apply(this, arguments);
    }
  };

  const proxyMult = createProxyFactory(mult), proxyPlus = createProxyFactory(plus);


  console.log(proxyMult(1, 2, 3, 4)); // 输出：24
  console.log(proxyMult(1, 2, 3, 4)); // 输出：24
  console.log(proxyPlus(1, 2, 3, 4)); // 输出：10
  console.log(proxyPlus(1, 2, 3, 4)); // 输出：10
