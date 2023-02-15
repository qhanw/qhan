// 示例-代理模式-计算乘积（缓存代理）
const mult = function () {
  console.log('开始计算乘积！');
  let a = 1;
  for (let i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i]
  }
  return a;
};
console.log(mult(2, 3));
console.log(mult(2, 3, 4));

const proxyMult = (function () {
  const cache = {};
  return function () {
    const args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }

    return cache[args] = mult.apply(this, arguments);
  }
})();

console.log(proxyMult(1, 2, 3, 4));
console.log(proxyMult(1, 2, 3, 4));
